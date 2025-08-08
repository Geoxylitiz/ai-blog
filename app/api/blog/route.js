import connectToDB from "@/lib/database";
import {Blog} from '@/models/blog.js';
import { NextResponse} from 'next/server';
import generateBlogPost from "@/helper/openai";

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

