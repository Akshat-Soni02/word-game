import { nanoid } from 'nanoid'
import { generate } from "random-words";

export const generateRoomId = () : string => {
    const len = Number(process.env.ROOM_ID_LENGTH) || 8;
    return nanoid(len);
}

export const generateWordSequence = () : Array<string> => {
    const seq_len = Number(process.env.SEQ_LENGTH) || 10;
    const generated_seq = generate({ exactly: seq_len, minLength: Number(process.env.MIN_WORD_LENGTH) || 5, maxLength: Number(process.env.MAX_WORD_LENGTH) || 5});
    return typeof generated_seq === 'string' ? [generated_seq] : generated_seq;
}