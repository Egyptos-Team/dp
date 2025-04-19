"use client"
import React, { useState, useEffect } from 'react';

const Allcustoer = () => {
  const [bookingData, setBookingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiURL = 'https://egyptos.runasp.net/api/BookingTourGuide/BookedByUser'; // الرابط الصحيح

  useEffect(() => {
    // جلب الـ token من الـ localStorage
    const storedToken = localStorage.getItem('User') 
      ? JSON.parse(localStorage.getItem('User')).tokens 
      : null;

    if (!storedToken) {
      setError('لم يتم العثور على الـ token');
      setLoading(false);
      return;
    }

    // جلب البيانات من الـ API
    const fetchBookingData = async () => {
      try {
        const response = await fetch(apiURL, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${storedToken}`, // إضافة الـ token في الـ headers
          },
        });

        if (!response.ok) {
          throw new Error('فشل في جلب البيانات');
        }

        const data = await response.json();
        setBookingData(data); // حفظ البيانات في الـ state
        setLoading(false); // إيقاف التحميل بعد ما البيانات تجيب
      } catch (error) {
        setError(error.message); // حفظ الخطأ في الـ state
        setLoading(false);
      }
    };

    fetchBookingData();
  }, []); // بيتم تشغيله عند تحميل المكون فقط

  if (loading) {
    return <div className="text-center p-5">جاري تحميل البيانات...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">حدث خطأ: {error}</div>;
  }

  return (
    <div className="booking-details container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4 text-center">تفاصيل الحجز</h2>
      <table className="min-w-full table-auto border-separate border-spacing-0">
        <thead>
          <tr className="bg-blue-500 text-white text-sm">
            <th className="py-2 px-4 text-center">معرف الحجز</th>
            <th className="py-2 px-4 text-center">معرف المرشد السياحي</th>
            <th className="py-2 px-4 text-center">اسم المرشد السياحي</th>
            <th className="py-2 px-4 text-center">معرف المستخدم</th>
            <th className="py-2 px-4 text-center">إجمالي السعر</th>
            <th className="py-2 px-4 text-center">تاريخ الدفع</th>
            <th className="py-2 px-4 text-center">تاريخ البداية</th>
            <th className="py-2 px-4 text-center">تاريخ النهاية</th>
          </tr>
        </thead>
        <tbody>
          {bookingData.map((booking) => (
            <tr key={booking.id} className="hover:bg-gray-100">
              <td className="py-2 px-4 text-center border-t">{booking.id}</td>
              <td className="py-2 px-4 text-center border-t">{booking.tourGuideId}</td>
              <td className="py-2 px-4 text-center border-t">{booking.tourGuideFirstName || 'غير متوفر'} {booking.tourGuideLastName || 'غير متوفر'}</td>
              <td className="py-2 px-4 text-center border-t">{booking.userId}</td>
              <td className="py-2 px-4 text-center border-t">{booking.totalPrice}</td>
              <td className="py-2 px-4 text-center border-t">{booking.paymentDate ? booking.paymentDate : 'لم يتم الدفع بعد'}</td>
              <td className="py-2 px-4 text-center border-t">{booking.startBooking}</td>
              <td className="py-2 px-4 text-center border-t">{booking.endBooking}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Allcustoer;
