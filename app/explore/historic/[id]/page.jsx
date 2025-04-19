import Image from "next/image";

export default async function ProductInfo({ params }) {
  const { id } = params;

  // ✅ جلب بيانات المنتج بناءً على الـ ID
  const productReq = await fetch(`https://egyptos.runasp.net/api/Historical/GetAll`);
  const products = await productReq.json();
  const product = products.find((item) => item.id == id);

  if (!product) {
    return <p className="text-center text-red-500">Product not found</p>;
  }

  // ✅ جلب الصور المرتبطة بنفس `historicalId`
  const imagesReq = await fetch("https://egyptos.runasp.net/api/HistoricalImage/GetAll");
  const allImages = await imagesReq.json();
  const relatedImages = allImages.filter((img) => img.historicalId == product.id);

  return (
    <div className="min-h-screen ">
          {/* Image and Title */}
          <div className="relative w-full h-[60vh] text-white flex items-center justify-center">
        <Image
                src={`https://egyptos.runasp.net/${product.imageUrl}`}
                alt={product.title}
          fill
          unoptimized
          className="w-full h-full"
        />
        <h1 className="absolute top-[10%] left-[5%] text-[5vw] sm:text-[4vw] md:text-[64px] font-bold">
          {product.title}
        </h1>
      </div>
{/* Product Details */}
<div className="mx-auto shadow-lg flex flex-col md:flex-row items-center justify-between p-6 sm:p-8 md:p-10 bg-gradient-to-r from-[#f0e68c] via-[#f5f5f5] to-[#AA8E5C]">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold w-full md:w-[360px] text-center md:text-left mb-4 sm:mb-6 md:mb-0">
          Discover the {product.title}
        </h2>
        <p className="text-lg sm:text-xl w-full md:w-[870px] text-center md:text-left">
          {product.description.slice(0,300)}
        </p>
      </div>
           {/* Art and Artifacts Section */}
           <div className="flex flex-col p-6 sm:p-8 md:p-10">
        <h1 className="font-bold text-lg sm:text-xl">
          Art and Artifacts of {product.title} Egypt
        </h1>
        <h6 className="mt-2 text-gray-500 text-xs sm:text-sm">
          Explore the artistic expressions of ancient Egyptians.
        </h6>
      </div>
      {/* ✅ عرض 3 صور بجانب بعض */}
      <div className="container mx-auto px-6 sm:px-8 md:px-10 mt-1">
        <div className="grid grid-cols-3 gap-4">
          {relatedImages.slice(0, 3).map((img) => (
            <div key={img.id} className="w-full h-64 relative">
              <Image
                src={`https://egyptos.runasp.net/${img.imageUrl}`}
                alt={`Image ${img.id}`}
                fill
                unoptimized
                className="object-cover rounded-lg"
              />
            </div>
          ))}
        </div>
      </div>

      {/* ✅ آخر سكشن: الصورة على اليمين - العنوان والوصف على اليسار */}
      {relatedImages[3] && (
        <div className="container mb-8 mx-auto px-6 sm:px-8 md:px-10 mt-16 flex flex-col md:flex-row items-center md:items-start">
          {/* ✅ القسم الأيسر: العنوان + الوصف */}
          <div className="w-full md:w-1/2">
            <h2 className="text-3xl font-bold">Exploring The Life Cycle Of The{product.title}</h2>
            <p className="mt-4 text-lg">{product.description}</p>
          </div>

          {/* ✅ القسم الأيمن: الصورة الرابعة */}
          <div className="w-full md:w-1/2 flex justify-end">
            <div className="w-full md:w-2/3 h-96 relative">
              <Image
                src={`https://egyptos.runasp.net/${relatedImages[3].imageUrl}`}
                alt={`Image ${relatedImages[3].id}`}
                fill
                unoptimized
                className="object-cover rounded-lg "
              />
            </div>
          </div>
        </div>
      )}
      <p className="container mx-auto mb-20  sm:mt-28 leading-7 px-6 sm:px-8 md:px-10">
      {product.description}
    </p>
    </div>
  );
}
