import { createClient } from 'redis';
import { env } from './env'

let client;
let connecting;

export default async function RedisClient(){
    try{
        if(client?.isOpen){
            return client;
        }

        if(connecting){
            return connecting;
        }

        connecting = (async () => {
            const redisClient = createClient({
            username: 'default',
            password: env.REDIS_PASSWORD,
            socket: {
                host: env.REDIS_HOST,
                port: env.REDIS_PORT
            }
        });

            redisClient.on('error', err => console.log('Redis Client Error', err));

            await redisClient.connect();
            client = redisClient;
            return redisClient;
        })();

        return await connecting;

    }catch(error) {
        console.log(error);
        connecting = null;
        throw error;
    }
}
  

// await client.set('foo', 'bar');
// const result = await client.get('foo');
// console.log(result)  // >>> bar

