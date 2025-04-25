import Hotel from "./_components/home/Hotel";
import Mu from "./_components/museum/Slider"
import Historical from "./_components/home/Historical";
import EventHome from "./_components/home/EventHome";
import MainSlider from "./_components/home/MainSlider";
import Slider from "./_components/home/Slider";
export default async function Home() {
  
  return (
    
    // <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        
    // <h1 className="text-center font-bold text-green-700 text-2xl">Home</h1>
      
    // </div>
    <div>
      <MainSlider/>
      <Historical/>
      <Slider/>
      <Hotel />
      <EventHome/>
    </div>
  );
}