import { CurrencyDollarIcon } from "@heroicons/react/20/solid"
import Link from "next/link"

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="text-center">
          <CurrencyDollarIcon aria-hidden="true" className="inline size-12 text-indigo-500" />
          <h3 className="mt-2 text-sm font-semibold text-gray-900">Welcome</h3>
          <p className="mt-1 text-sm text-gray-500">Get started by managing your transactions.</p>
          <div className="mt-6">
            <Link
              href="/dashboard"
              className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Manage Transactions
            </Link>
          </div>
      </div>

      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <p className="text-sm text-gray-500"> Example App, built by Mario.</p>
      </footer>
    </div>
  );
}
