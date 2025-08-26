import connectToDB from "@/lib/database";
import {Blog} from '@/models/blog.js';
import { NextResponse} from 'next/server';
import generateBlogPost from "@/helper/openai";
import RedisClient from '@/lib/redis';

export async function POST(req) {
    try {
        const { topic, tone, length } = await req.json();
       await connectToDB();

        const respo = await generateBlogPost(topic, tone, length);
         let blogData;
        try {
            blogData = JSON.parse(respo);
        } catch (error) {
            return NextResponse.json({ error: "Invalid blog data format" }, { status: 400 });
        }

        await Blog.create({
            slug: blogData.slug,
            title: blogData.title,
            content: blogData.content
        });
        

        return NextResponse.json({ slug: blogData.slug }, { status: 201 });
    } catch (error) {
        console.error("Error creating blog:", error);
        return NextResponse.json({ error: "Failed to create blog" }, { status: 500 });
    }
}


export async function GET(req){
    try{
        const redis = await RedisClient();
       const blogs = await redis.get('blogs');
        if(blogs != null) {
            return NextResponse.json({ blogs: JSON.parse(blogs)})
        }else{
            await connectToDB();
            const blogs = await Blog.find().sort({ createdAt: -1 }).select('title slug createdAt');
            await redis.setEx('blogs', 3600, JSON.stringify(blogs));
            return NextResponse.json({blogs: blogs })
        }

    }catch(error){
        console.log(error);
    }
}
