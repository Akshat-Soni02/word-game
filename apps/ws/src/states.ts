enum RoomState {
    GAME_WAITING = "game_waiting",
    GAME_ONGOING = "game_ongoing",
    GAME_END = "game_end"
}

enum SocketMessages {
    CREATE_ROOM = "create_room",
    ROOM_CREATED = "room_created",
    JOIN_ROOM = "join_room",
    ROOM_JOINED = "room_joined",
    SOMEONE_JOINED = "someone_joined",
    START_GAME = "start_game",
    GAME_STARTED = "game_started",
    TIMER_END = "timer_end",
    TIMER_ENDED = "timer_ended",
    WORD_HIT = "word_hit",
    NO_CORRECT_LETTER = "no_correct_letter",
    CORRECT_LETTERS = "correct_letters",
    CORRECT_WORD_GUESS = "correct_word_guess",
    CORRECT_WORD = "correct_word",
    CORRECT_WORD_GUESS_GAME_END = "correct_word_guess_game_end",
    CORRECT_WORD_GAME_END = "correct_word_game_end",
    INVALID_REQUEST = "invalid_request"
}

enum SocketChannels {
    DEFAULT_CHANNEL = "message"
}