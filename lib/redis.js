import { createClient } from 'redis';
import { env } from './env'
export default async function RedisClient(){

    let exist;

    try{
        if(exist){
            return exist;
        } 
                const client = createClient({
            username: 'default',
            password: env.REDIS_PASSWORD,
            socket: {
                host: env.REDIS_HOST,
                port: env.REDIS_PORT
            }
        });

            client.on('error', err => console.log('Redis Client Error', err));

            await client.connect();
            exist = client;
            return client;

    }catch(error) {
        console.log(error);
    }
}
  

// await client.set('foo', 'bar');
// const result = await client.get('foo');
// console.log(result)  // >>> bar

