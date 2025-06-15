import { SocketMessages } from "./states";

export type Players = Array<{player_id: string, player_name: string, player_points: string, host: boolean}>;

export type CreatedRoomMessage = { type: SocketMessages.ROOM_CREATED; payload: { players: Players, room_id: string }};
export type JoinedRoomMessage = { type: SocketMessages.ROOM_JOINED; payload: { players: Players }};
export type ExitedRoomMessage = { type: SocketMessages.ROOM_EXITED };
export type SomeoneJoinedRoomMessage = { type: SocketMessages.SOMEONE_JOINED; payload: { players: Players, player_name: string}};
export type SomeoneExitedRoomMessage = { type: SocketMessages.SOMEONE_EXITED; payload: { players: Players, player_name: string}};
export type GameStartedMessage = { type: SocketMessages.GAME_STARTED; payload: { room_id: string }};
export type NoCorrectLetterMessage = { type: SocketMessages.NO_CORRECT_LETTER };
export type SomeCorrectLettersMessage = { type: SocketMessages.CORRECT_LETTERS; payload: { matches: Array<{ letter: string, index: number}> }}
export type GuessedCorrectWordMessage = { type: SocketMessages.CORRECT_WORD_GUESS };
export type SomeoneGuessedCorrectWordMessage = { type: SocketMessages.CORRECT_WORD; payload: { player_name: string, correct_word: string }};
export type GuessedCorrectWordAndGameEndMessage = { type: SocketMessages.CORRECT_WORD_GUESS_GAME_END; payload: { players: Players }};
export type SomeoneGuessedCorrectWordAndGameEndMessage = { type: SocketMessages.CORRECT_WORD_GAME_END; payload: { player_name: string, correct_word: string, players: Players}};
export type TimerEndMessage = { type: SocketMessages.TIMER_ENDED; payload: { players: Players, correct_word: string }}