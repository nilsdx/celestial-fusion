import Link from "next/link";

export default function NotFound() {
  return (
    <div className="w-full h-full">
      <h1 className="text-4xl font-bold mb-4">404 - Not found</h1>
      <p className="">
        This page either doesn't exist, or the page related to it was deleted.
      </p>
      <Link 
        href="/" 
        className="underline"
      >
        Back to main page
      </Link>
    </div>
  );
}