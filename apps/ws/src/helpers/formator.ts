import { Socket } from "socket.io";
import { Player } from "../Player";

export const formatPlayers = (players: Array<Player>, creator: Socket) => {
    const formatted_players = [];

    for(const player of players) {
        const player_id = player.getPlayerId().id;
        const player_name = player.getPlayerName();
        const player_points = player.getPlayerPoints();
        const host = player.getPlayerId() === creator;
        formatted_players.push({ player_id, player_name , player_points, host});
    }

    return formatted_players;
}