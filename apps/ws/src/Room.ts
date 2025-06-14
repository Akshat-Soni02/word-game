import { Socket } from "socket.io";
import { generateRoomId, generateWordSequence } from "./helpers/generator";
import { Player } from "./Player";
import { RoomState } from "./states";

export class Room {
    private room_id: string;
    private players: Array<Player>;
    private word_sequence: Array<string>;
    private active_word_index: number;
    private room_state: RoomState;
    private room_creator: Socket;

    constructor (socket: Socket, player_name: string) {
        this.room_id = generateRoomId();
        this.players = [];
        this.word_sequence = generateWordSequence();
        this.active_word_index = 0;
        this.room_state = RoomState.GAME_WAITING;
        this.room_creator = socket;

        this.addPlayer(socket, player_name);
    }

    getRoomId = () => {
        return this.room_id;
    }

    getRoomCreator = () => {
        return this.room_creator;
    }

    getRoomPlayers = () => {
        return this.players;
    }

    getActiveWord = () => {
        return this.word_sequence[this.active_word_index];
    }

    getRoomState = () => {
        return this.room_state;
    }

    isValidWord = () => {
        return this.word_sequence.length - 1 >= this.active_word_index;
    }

    isValidPlayingState = () => {
        return this.isValidWord() && this.room_state === RoomState.GAME_ONGOING;
    }

    isLastWord = () => {
        return this.word_sequence.length - 1 === this.active_word_index;
    }

    addPlayer = (socket: Socket, player_name: string) => {
        const new_player = new Player(socket, player_name);
        this.players.push(new_player);
        return new_player;
    }

    removePlayer = (socket: Socket) => {
        this.players = this.players.filter((player) => player.getPlayerId() !== socket);
    }

    changeRoomState = (new_state: RoomState) => {
        this.room_state = new_state;
    }

    registerPlayerCorrectGuess = (socket: Socket) => {
        const round_win_player = this.players.find((player) => player.getPlayerId() === socket);
        round_win_player?.setPlayerPoints(round_win_player.getPlayerPoints() + 1);
        this.active_word_index++;
    }
}