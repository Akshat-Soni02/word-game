import { RedisClientType } from 'redis'
import { Room } from '../Room';


export class RoomRepository {
    constructor(private redisClient: RedisClientType) {}


    saveRoom = async (room_id: string, room: Room) => {
        await this.redisClient.set(`room:${room_id}`, JSON.stringify(room));
    }

    // getRoom = async (room_id: string, socket) => {
    //     const room_data = await this.redisClient.get(`room:${room_id}`);
    //     return room_data ? Object.assign(new Room())
    // }

    deleteRoom = async (room_id: string) => {
        await this.redisClient.del(`room:${room_id}`);
    }
}