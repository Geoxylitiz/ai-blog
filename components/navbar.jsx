import Link from 'next/link'

export default function Navbar() {
    return (
      <nav className="sticky top-0 z-20 border-b border-[color:var(--color-rule)] bg-[color:var(--color-panel)]/95 backdrop-blur">
        <div className="page-wrap flex min-h-16 items-center justify-between gap-4 py-3">
        <Link
          className="font-[family-name:var(--font-display)] text-xl font-black tracking-tight text-[color:var(--color-ink)]"
          href="/"
        >Blogify</Link>
        
       <Link
          href="/create"
          className="action-button px-4"
        >
          New draft
        </Link>
        </div>
      </nav>
    )
}
