'use client';

export default function ErrorPage({ error }: { error: Error }) {
  return (
    <div className="container mx-auto px-4 py-40 text-center">
      <h1 className="text-5xl font-bold text-white">Uh oh.</h1>
      <p className="mt-4 text-gray-400">Something went wrong while loading the page.</p>
      <pre className="mt-6 rounded-2xl bg-white/5 p-4 text-left text-sm text-red-300">{error.message}</pre>
    </div>
  );
}
