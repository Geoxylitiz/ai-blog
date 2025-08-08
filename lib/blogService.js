import { Blog } from '@/models/blog';
import connectToDB from '@/lib/database';

export async function getBlogBySlug(slug) {
  await connectToDB();
  return Blog.findOne({ slug: slug }).lean();
}