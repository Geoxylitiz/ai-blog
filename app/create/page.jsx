import BlogPostForm from "@/components/form";
import Navbar from "@/components/navbar";

export default function CreatePage() {  
    return (
        <main className="app-shell">
        <Navbar />
        <BlogPostForm />
        </main>
    )
}
