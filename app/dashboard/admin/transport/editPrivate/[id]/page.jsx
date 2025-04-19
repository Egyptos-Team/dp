import EditTransportForm from "../../_components/privateTransport/EditTransportForm";

export default async function EditPage({ params }) {
  const res = await fetch(`https://egyptos.runasp.net/api/PrivateTransports/Get/${params.id}`);
  const item = await res.json();

  return <EditTransportForm item={item} />;
}
