import { Player } from "../Player";

export const formatPlayers = (players: Array<Player>) => {
    const formatted_players = [];

    for(const player of players) {
        const player_name = player.getPlayerName();
        const player_points = player.getPlayerPoints();
        formatted_players.push({ player_name , player_points});
    }

    return formatted_players;
}