import OrdersView from "@/components/OrdersView";

export const metadata = {
  title: "My orders",
  description: "Track ScentTrail orders, view order details and start a return.",
};

export default function OrdersPage() {
  return <OrdersView />;
}
