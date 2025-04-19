import "../../globals.css";
import Slider from './__components/Slider';

export default function DashboardLayout({ children }) {
  return (
    <div className="flex flex-row-reverse justify-end ">
      {children}
      <Slider />
    </div>
  );
}
