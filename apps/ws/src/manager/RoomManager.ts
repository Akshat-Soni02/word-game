import { Socket } from "socket.io";
import { Room } from "../Room";

export class RoomManager {
    private rooms: Array<Room>;
    
    constructor() {
        this.rooms = [];
    }

    getRoomById = (room_id: string) => {
        const room = this.rooms.find((room) => room.getRoomId() === room_id);
        return room;
    }

    createRoom = (socket: Socket, player_name: string) => {
        const new_room = new Room(socket, player_name);
        this.rooms.push(new_room);
        return new_room;
    }

    joinRoom = (room_id: string, socket: Socket, player_name: string) => {
        const existing_room = this.rooms.find((room) => room.getRoomId() === room_id);
        existing_room?.addPlayer(socket, player_name);
        return existing_room;
    }

    initRoomGame = (room_id: string) => {
        const existing_room = this.rooms.find((room) => room.getRoomId() === room_id);
        existing_room?.changeRoomState(RoomState.GAME_ONGOING);
        return existing_room;
    }

    endRoomGame = (room_id: string) => {
        const existing_room = this.rooms.find((room) => room.getRoomId() === room_id);
        existing_room?.changeRoomState(RoomState.GAME_END);
        setTimeout(() => {
            this.rooms = this.rooms.filter((room) => room.getRoomId() === room_id);
        }, 2*60*100);
        return existing_room;
    }

    correctRoomGuess = (socket: Socket, room_id: string) => {
        const active_room = this.rooms.find((room) => room.getRoomId() === room_id);
        active_room?.registerPlayerCorrectGuess(socket);
    }

    disconnectPlayer = (socket: Socket) => {
        //we can let others know here that someone left
        const active_room = this.rooms.find((room) => {
            room.getRoomPlayers().some((player) => player.getPlayerId() === socket)
        });
        active_room?.removePlayer(socket);
    }
}