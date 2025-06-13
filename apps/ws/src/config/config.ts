import dotenv from 'dotenv'
// import { createClient } from 'redis'

dotenv.config();

//redis config
// export const client = createClient({
//     url: process.env.REDIS_URL,
// });

// client.on('error', (err) => console.log('Redis Client Error', err));
// client.connect();

export default {
    port: process.env.PORT || 3000
}