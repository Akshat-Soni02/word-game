import { Socket } from "socket.io";
import { GameManager } from "./GameManager";

export class SocketManager {
    private game_manager: GameManager;

    constructor() {
        this.game_manager = new GameManager();
    }

    handleMessageChannel = (socket: Socket) => {
        socket.on('message', (data, callback) => {

            let message: SocketMessage = JSON.parse(data.toString());

            switch (message.type) {
                case SocketMessages.CREATE_ROOM:
                    this.game_manager.newRoom(socket, message.payload);
                    break;
                    
                case SocketMessages.JOIN_ROOM:
                    this.game_manager.joinExistingRoom(socket, message.payload);
                    break;

                case SocketMessages.START_GAME:
                    this.game_manager.initGame(socket, message.payload);
                    break;

                case SocketMessages.WORD_HIT:
                    this.game_manager.wordHit(socket, message.payload);
                    break;

                case SocketMessages.TIMER_END:
                    this.game_manager.timerEnd(socket, message.payload);
                    break;
            
                default:
                    console.log(`Unknown event received`);
                    break;
            }
        });
    }

    handleDisconnect = (socket: Socket) => {
        this.game_manager.removePlayerFromGame(socket);
        console.log(`player disconnected ${socket.id}`);
    }
}