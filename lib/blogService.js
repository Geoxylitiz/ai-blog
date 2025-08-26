import { Blog } from '@/models/blog';
import connectToDB from '@/lib/database';
import RedisClient from '@/lib/redis';

export async function getBlogBySlug(slug) {

  const redis = await RedisClient();
  const slugz = await redis.get(slug);
  if(slugz != null){
    console.log("returned cached")
     return JSON.parse(slugz);
  }else{
    await connectToDB();
    const res = await Blog.findOne({ slug: slug }).lean();
    redis.setEx(slug, 3600, JSON.stringify(res));
    console.log("returned from DB")
  return res;
  }




  
}