import { Socket } from "socket.io";

export class Player {
    private player_id: Socket;
    private player_name: string;
    private player_points: number;

    constructor(socket: Socket, player_name: string) {
        this.player_id = socket;
        this.player_name = player_name;
        this.player_points = 0;
    }

    setPlayerPoints = (points: number) => {
        this.player_points = points;
    }

    getPlayerPoints = () => {
        return this.player_points;
    }

    getPlayerId = () => {
        return this.player_id;
    }

    getPlayerName = () => {
        return this.player_name;
    }

    increasePlayerPoints = () => {
        this.player_points++;
    }
}