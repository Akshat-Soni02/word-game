type SocketMessage =
  | { type: SocketMessages.CREATE_ROOM; payload: CreateRoomRequest }
  | { type: SocketMessages.JOIN_ROOM; payload: JoinRoomRequest }
  | { type: SocketMessages.START_GAME; payload: InitGameRequest }
  | { type: SocketMessages.TIMER_END; payload: TimerEndRequest }
  | { type: SocketMessages.WORD_HIT; payload: WordHitRequest };


type CreateRoomRequest = {
    player_name: string;
}

type JoinRoomRequest = {
    player_name: string;
    room_id: string;
}

type InitGameRequest = {
    room_id: string;
}

type TimerEndRequest = {
    room_id: string;
}

type WordHitRequest = {
    word: string;
    room_id: string;
}