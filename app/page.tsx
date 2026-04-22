import Image from "next/image";
import Link from "next/link";
import ProductCard from "./components/ProductCard/ProductCard";

export default function Home() {
  return (
    <main>
      <h1 className="text-3xl text-amber-50 pb-2 pt-2">Hello world </h1>
      <Link
        href="/users"
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
      >
        Users
      </Link>
      <ProductCard />
    </main>
  );
}
