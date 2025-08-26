import Navbar from "@/components/navbar";
import BlogList from "@/components/blogList";

export const metadata = {
  title: 'Create AI-Generated Blog Posts',
  description: 'Generate high-quality blog content in seconds with our AI-powered blog generator. Customize tone, length, and topic to your needs.',
  openGraph: {
    title: 'Create AI-Generated Blog Posts',
    description: 'Generate high-quality blog content in seconds with our AI-powered blog generator.',
  }
};

export default async function Home() {

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-200">
     <Navbar />
     <BlogList />
    </main>
  );
}



