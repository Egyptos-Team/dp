'use client';

import { useRouter } from 'next/navigation';

export default function DeleteButton({ id, token }) {
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this item?')) return;

    const res = await fetch(
      `https://egyptos.runasp.net/api/PrivateTransports/Delete/${id}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.ok) {
      alert('Deleted successfully');
      router.refresh();
    } else {
     alert('Failed to delete');
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs"
    >
      Delete
    </button>
  );
}
