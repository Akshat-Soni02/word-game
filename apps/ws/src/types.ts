import { SocketMessages } from "./states";

export type SocketMessage =
  | { type: SocketMessages.CREATE_ROOM; payload: CreateRoomRequest }
  | { type: SocketMessages.JOIN_ROOM; payload: JoinRoomRequest }
  | { type: SocketMessages.EXIT_ROOM; payload: ExitRoomRequest }
  | { type: SocketMessages.START_GAME; payload: InitGameRequest }
  | { type: SocketMessages.TIMER_END; payload: TimerEndRequest }
  | { type: SocketMessages.WORD_HIT; payload: WordHitRequest };


export type CreateRoomRequest = {
    player_name: string;
}

export type JoinRoomRequest = {
    player_name: string;
    room_id: string;
}

export type ExitRoomRequest = {
    room_id: string;
    player_name: string;
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