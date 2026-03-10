import Link from "next/link";

export default function NotFound() {
  return (
    <div className="m-6">
      <h1 className="text-4xl mb-4">404 - Not found</h1>
      <p className="">
        This page either doesn't exist, or the page related to it was deleted.
      </p>
      <Link 
        href="/" 
        className="underline"
        scroll={true}
      >
        Back to main page
      </Link>
    </div>
  );
}