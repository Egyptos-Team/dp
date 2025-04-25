import EditTransportForm from "../../_components/transportTypes/EditTransportForm";
export default async function EditPage({ params }) {
  const res = await fetch(
    `https://egyptos.runasp.net/api/TransportTypes/Get/${params.id}`
  );
  const item = await res.json();

  return (
    <div className="w-full bg-black">
      <EditTransportForm item={item} />
    </div>
  );
}