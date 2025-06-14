import { SocketMessages } from "./states";

type players = Array<{player_name: string, player_points: string}>;

export type SocketMessage =
  | { type: SocketMessages.ROOM_JOINED; payload: JoinRoomRequest }
  | { type: SocketMessages.GAME_STARTED; payload: InitGameRequest }
  | { type: SocketMessages.TIMER_ENDED; payload: TimerEndRequest }
  | { type: SocketMessages.CORRECT_WORD; payload: WordHitRequest }
  | { type: SocketMessages.CORRECT_WORD_GAME_END; payload: WordHitRequest }
  | { type: SocketMessages.CORRECT_WORD_GUESS; payload: WordHitRequest }
  | { type: SocketMessages.CORRECT_WORD_GUESS_GAME_END; payload: WordHitRequest };


export type CreatedRoomMessage = { type: SocketMessages.ROOM_CREATED; payload: { players: players, room_id: string }};
export type JoinedRoomMessage = { type: SocketMessages.ROOM_JOINED; payload: { players: players }};
export type SomeoneJoinedRoomMessage = { type: SocketMessages.SOMEONE_JOINED; payload: { players: players, player_name: string}};

export type JoinRoomRequest = {
    player_name: string;
    room_id: string;
}

export type InitGameRequest = {
    room_id: string;
}

export type TimerEndRequest = {
    room_id: string;
}

export type WordHitRequest = {
    word: string;
    room_id: string;
}