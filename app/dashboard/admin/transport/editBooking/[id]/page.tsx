import EditBooking from "../../_components/bookingTransport/EditBooking";

export default async function EditPage({ params }) {
  const tokens="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJlNGIyZjkxZC05ZTEyLTRmNGEtYjNkYi0xYjU4ZmNhMTVlNjYiLCJlbWFpbCI6ImFkbWluQGVneXB0b3MuY29tIiwiZ2l2ZW5fbmFtZSI6IkFkbWluIiwiZmFtaWx5X25hbWUiOiJBZG1pbiIsImp0aSI6IjAxOTU5MGEzLTBjMTAtNzAxMS04YjY4LTliYzFiZjBiZDVjYiIsInJvbGVzIjpbIkFkbWluIl0sImV4cCI6MTc3MzQyNDM1OSwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo1MTcwIiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDo1MTcwIn0.bUlzZPE554JixkDZpz4cBmP_lyzDJeJ016tnStcR8zI"
  const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJmMGNlOTZlMC0wMjA5LTQ5YWMtOWI2My1lYjc1YTUwYTFlMmIiLCJlbWFpbCI6InlvdXNlZi5tMjAwMjIwMDJAZ21haWwuY29tIiwiZ2l2ZW5fbmFtZSI6InlvdXNlZiIsImZhbWlseV9uYW1lIjoibW9oYW1lZCIsImp0aSI6IjAxOTY0NGQ4LTFlOTItNzZmNC04OTQwLTliYmM5OTQ0YjdkMSIsInJvbGVzIjpbIlVzZXIiXSwiZXhwIjoxNzc2NDQ3NzM2LCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjUxNzAiLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjUxNzAifQ.qOXW1ybf6TNBhb26YMkhZzNEged61dQD2n7AOjy1x0Q"
  const res = await fetch(`https://egyptos.runasp.net/api/BookingPrivateTransports/GetById/${params.id}`,{
      headers:{
        Authorization: `Bearer ${tokens}`,
      }
    }
  );
  const item = await res.json();

  return <EditBooking item={item} token={token} />;
}
