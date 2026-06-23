import Navbar from '@/components/navbar';

export default function BlogLayout({ children }) {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="page-wrap py-8 sm:py-12">
        {children}
      </main>
      <footer className="border-t border-[color:var(--color-rule)] bg-[color:var(--color-panel)] py-6">
        <div className="page-wrap text-sm text-[color:var(--color-ink-muted)]">
          <p>Copyright {new Date().getFullYear()} Blogify. Drafts stay editable.</p>
        </div>
      </footer>
    </div>
  );
}
