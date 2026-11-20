import OrderDetailView from "@/components/OrderDetailView";

export async function generateMetadata({ params }) {
  const { id } = await params;
  return {
    title: `Order ${id}`,
    description: "Order details, status and timeline for your ScentTrail order.",
  };
}

export default async function OrderDetailPage({ params, searchParams }) {
  const { id } = await params;
  const search = await searchParams;
  return <OrderDetailView orderId={id} isNew={search?.new === "1"} />;
}
