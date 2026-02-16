import Link from "next/link";

export default function NotFound() {
  return (
    <div className="text-center">
      <h1 className="mb-4 text-2xl font-bold">Movie not found</h1>
      <Link href="/" className="text-amber-400 hover:underline">
        ← Back to Top Movies
      </Link>
    </div>
  );
}
