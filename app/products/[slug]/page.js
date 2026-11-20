import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProductView from "@/components/ProductView";
import ProductCard from "@/components/ProductCard";
import { PRODUCTS, getProduct } from "@/lib/products";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Product not found" };
  return {
    title: product.name,
    description: product.tagline,
    openGraph: {
      title: `${product.name} · ScentTrail Pods`,
      description: product.tagline,
      images: ["/with.png"],
    },
  };
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = PRODUCTS.filter(
    (entry) => entry.id !== product.id && (entry.family === product.family || entry.featured)
  ).slice(0, 3);

  return (
    <>
      <ProductView product={product} />

      <section className="section container">
        <div className="section-head">
          <div>
            <span className="eyebrow">Keep wandering</span>
            <h2>Pairs well with</h2>
          </div>
          <Link href="/shop" className="text-link">
            Shop all trails <ArrowRight size={14} />
          </Link>
        </div>
        <div className="bento">
          {related.map((entry) => (
            <ProductCard key={entry.id} product={entry} span={4} />
          ))}
        </div>
      </section>
    </>
  );
}
