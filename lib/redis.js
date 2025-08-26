import { createClient } from 'redis';

export default async function RedisClient(){

    let exist;

    try{
        if(exist){
            return exist;
        } 
                const client = createClient({
            username: 'default',
            password: '5R5dzCAS8Oi6TpPSU9WMp6P0zWsm3qpW',
            socket: {
                host: 'redis-19815.crce178.ap-east-1-1.ec2.redns.redis-cloud.com',
                port: 19815
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

