import { Socket } from "socket.io";
import { RoomManager } from "./RoomManager";
import { compareWords } from "../helpers/word";
import { SocketMessages, SocketChannels } from "../states";
import { CreateRoomRequest, JoinRoomRequest, InitGameRequest, TimerEndRequest, WordHitRequest } from "../types";
import { formatPlayers } from "../helpers/formator";

export class GameManager {
    private room_manager: RoomManager;

    constructor() {
        this.room_manager = new RoomManager();
    }

    newRoom = (socket: Socket, data: CreateRoomRequest) => {
        const new_room = this.room_manager.createRoom(socket, data.player_name);

        /**
         * sending only to player who created room
         */
        socket.emit(SocketChannels.DEFAULT_CHANNEL, JSON.stringify({
            type: SocketMessages.ROOM_CREATED,
            payload: { room_id: new_room.getRoomId(), players: formatPlayers(new_room.getRoomPlayers())}
        }));
    }

    joinExistingRoom = (socket: Socket, data: JoinRoomRequest) => {
        const existing_room = this.room_manager.joinRoom(data.room_id, socket, data.player_name);

        if(!existing_room) {
            socket.emit(SocketChannels.DEFAULT_CHANNEL, JSON.stringify({
                type: SocketMessages.INVALID_REQUEST
            }));
            return;
        }

        /**
         * sending to player who joined
         */
        socket.emit(SocketChannels.DEFAULT_CHANNEL, JSON.stringify({
            type: SocketMessages.ROOM_JOINED,
            payload: { players: formatPlayers(existing_room.getRoomPlayers())}
        }));

        const players_without_joinee = existing_room.getRoomPlayers().filter((player) => player.getPlayerId() !== socket);

        /**
         * sending to other players
         */
        for (const other_player of players_without_joinee) {
            other_player.getPlayerId().emit(SocketChannels.DEFAULT_CHANNEL, JSON.stringify({
                type: SocketMessages.SOMEONE_JOINED,
                payload: { players: formatPlayers(existing_room.getRoomPlayers()), player_name: data.player_name }
            }));
        }
    }

    initGame = (socket: Socket, data: InitGameRequest) => {
        const activated_room = this.room_manager.initRoomGame(data.room_id);

        if(!activated_room) {
            socket.emit(SocketChannels.DEFAULT_CHANNEL, JSON.stringify({
                type: SocketMessages.INVALID_REQUEST
            }));
            return;
        }

        /**
         * sending everyone about 
         * the game start
         */
        for (const player of activated_room.getRoomPlayers()) {
            player.getPlayerId().emit(SocketChannels.DEFAULT_CHANNEL, JSON.stringify({
                type: SocketMessages.GAME_STARTED,
                payload: { room_id: activated_room.getRoomId() }
            }));
        }
    }

    timerEnd = (socket: Socket, data: TimerEndRequest) => {
        const ended_room = this.room_manager.endRoomGame(data.room_id);

        if(!ended_room) {
            socket.emit(SocketChannels.DEFAULT_CHANNEL, JSON.stringify({
                type: SocketMessages.INVALID_REQUEST
            }));
            return;
        }

        /**
         * sending timer end 
         * message to everyone
         */
        for(const player of ended_room.getRoomPlayers()) {
            player.getPlayerId().emit(SocketChannels.DEFAULT_CHANNEL, JSON.stringify({
                type: SocketMessages.TIMER_ENDED,
                payload: { players: formatPlayers(ended_room.getRoomPlayers()) }
            }));
        }
    }


    wordHit = (socket: Socket, data: WordHitRequest) => {
        //no letters correct
        //letters correct
        //word correct
        //word correct and game end

        const running_room = this.room_manager.getRoomById(data.room_id);

        if(!running_room || !running_room.isValidPlayingState()) {
            socket.emit(SocketChannels.DEFAULT_CHANNEL, JSON.stringify({
                type: SocketMessages.INVALID_REQUEST
            }));
            return;
        }

        const client_word = data.word;
        const actual_word = running_room.getActiveWord();

        const compare_result = compareWords(client_word, actual_word);
        switch (compare_result.message) {
            case 'word_match':
                /**
                 * high chances of concurrency
                 * problem
                 */
                if(running_room.isLastWord()) {
                    this.room_manager.correctRoomGuess(socket, data.room_id);
                    /**
                     * sending active player message about correct
                     * guess and game end
                     */
                    socket.emit(SocketChannels.DEFAULT_CHANNEL, JSON.stringify({
                        type: SocketMessages.CORRECT_WORD_GUESS_GAME_END,
                        payload: { players: formatPlayers(running_room.getRoomPlayers()) }
                    }));

                    const active_player = running_room.getRoomPlayers().find((player) => player.getPlayerId() === socket);
                    const other_players = running_room.getRoomPlayers().filter((player) => player.getPlayerId() !== socket);

                    /**
                     * sending other players message about correct 
                     * guess of someone along with game end
                     */
                    for (const player of other_players) {
                        player.getPlayerId().emit(SocketChannels.DEFAULT_CHANNEL, JSON.stringify({
                            type: SocketMessages.CORRECT_WORD_GAME_END,
                            payload: { player_name: active_player?.getPlayerName(), correct_word: compare_result.word, players: formatPlayers(running_room.getRoomPlayers())}
                        }));
                    }

                    this.room_manager.endRoomGame(data.room_id);
                } else {
                    this.room_manager.correctRoomGuess(socket, data.room_id);

                    /**
                     * sending active player message about correct
                     * guess
                     */
                    socket.emit(SocketChannels.DEFAULT_CHANNEL, JSON.stringify({
                        type: SocketMessages.CORRECT_WORD_GUESS
                    }));

                    const active_player = running_room.getRoomPlayers().find((player) => player.getPlayerId() === socket);
                    const other_players = running_room.getRoomPlayers().filter((player) => player.getPlayerId() !== socket);

                    /**
                     * sending other players message about correct 
                     * guess of someone
                     */
                    for (const player of other_players) {
                        player.getPlayerId().emit(SocketChannels.DEFAULT_CHANNEL, JSON.stringify({
                            type: SocketMessages.CORRECT_WORD,
                            payload: { player_name: active_player?.getPlayerName(), correct_word: compare_result.word }
                        }));
                    }
                }
                break;

            case 'letter_match':
                const all_players = running_room.getRoomPlayers();

                for( const player of all_players) {
                    player.getPlayerId().emit(SocketChannels.DEFAULT_CHANNEL, JSON.stringify({
                        type: SocketMessages.CORRECT_LETTERS,
                        payload: { matches: compare_result.matches }
                    }));
                }
                break;


            case 'no_match':
                socket.emit(SocketChannels.DEFAULT_CHANNEL, JSON.stringify({
                    type: SocketMessages.NO_CORRECT_LETTER
                }));
                break;
        

            default:
                console.log(`Invalid request of compare result in word hit ${compare_result.message}`);
                socket.emit(SocketChannels.DEFAULT_CHANNEL, JSON.stringify({
                    type: SocketMessages.INVALID_REQUEST
                }));
                break;
        }
    }

    removePlayerFromGame = (socket: Socket) => {
        this.room_manager.disconnectPlayer(socket);
    }
}