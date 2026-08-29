import Header from "./Header";
import Footer from "./Footer";

/**
 * Standard page shell with header + footer + a constrained content column.
 * @param {Object} props
 * @param {import('react').ReactNode} props.children
 * @param {string} [props.className]
 */
export default function PageShell({ children, className = "" }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className={`flex-1 ${className}`}>
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
}
