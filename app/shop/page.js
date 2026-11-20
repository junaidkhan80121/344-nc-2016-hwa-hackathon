import ShopView from "./ShopView";

export const metadata = {
  title: "Shop all trails",
  description:
    "Shop ScentTrail diffusers, compostable refill pods, starter sets and bundles. Filter by scent family, category and price.",
};

export default async function ShopPage({ searchParams }) {
  const params = await searchParams;
  return (
    <ShopView
      initialCategory={typeof params?.category === "string" ? params.category : "all"}
      initialFamily={typeof params?.family === "string" ? params.family : "all"}
      initialQuery={typeof params?.search === "string" ? params.search : ""}
    />
  );
}
