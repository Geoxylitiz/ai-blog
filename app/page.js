import Navbar from "@/components/navbar";
import BlogList from "@/components/blogList";

export const metadata = {
  title: 'Blogify',
  description: 'Generate high-quality blog content in seconds with our AI-powered blog generator. Customize tone, length, and topic to your needs.',
  openGraph: {
    title: 'Blogify',
    description: 'Generate high-quality blog content in seconds with our AI-powered blog generator.',
  }
};

export default async function Home() {

  return (
    <main className="app-shell">
     <Navbar />
     <section className="page-wrap py-10 sm:py-14">
       <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-end">
        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-[color:var(--color-accent-strong)]">Draft desk</p>
          <h1 className="max-w-3xl font-[family-name:var(--font-display)] text-[length:var(--text-display)] font-black leading-[0.95] text-[color:var(--color-ink)] [overflow-wrap:anywhere]">
            Turn prompts into publishable drafts.
          </h1>
        </div>
        <p className="max-w-xl text-lg leading-8 text-[color:var(--color-ink-soft)]">
          Blogify keeps the generation workflow simple: start with a topic, choose the editorial shape, then review every saved draft from one calm workspace.
        </p>
       </div>
     </section>
     <BlogList />
    </main>
  );
}



