"use client";
import { useRouter } from "next/navigation";

export default function DeleteButton({ id, token }) {
  const router = useRouter();

  const handleDelete = async () => {
    const confirmed = confirm("هل أنت متأكد من الحذف؟");
    if (!confirmed) return;

    try {
      const res = await fetch(
        `https://egyptos.runasp.net/api/BookingPrivateTransports/CancelBooking/${id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.ok) {
        router.refresh(); // أو ممكن تستخدم window.location.reload()
      } else {
        const errText = await res.text();
        alert("فشل في الحذف: " + errText);
      }
    } catch (error) {
      alert("حدث خطأ أثناء الحذف");
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="bg-[#C62828] text-white px-3 hover:bg-red-300 text-[13px] py-2 rounded"
    >
      Delete
    </button>
  );
}
