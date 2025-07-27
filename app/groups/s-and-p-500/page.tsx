import { SP500Table } from "./sp500-table";
import { GroupsNavbar } from "../components/groups-navbar";

export default function SP500Page() {
  return (
    <>
      <GroupsNavbar />
      <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-6 space-y-4 sm:space-y-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold">S&P 500 Stock Information</h1>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            แสดงข้อมูลราคาปัจจุบัน ราคาสูงสุด 52 สัปดาห์ และเปอร์เซ็นต์เปรียบเทียบราคาปัจจุบันกับราคาสูงสุด 52 สัปดาห์ของหุ้น S&P 500 ในรูปแบบ Heatmap Table โดยดึงข้อมูลแบบไดนามิกจาก Yahoo Finance
          </p>
        </div>
        <SP500Table />
      </div>
    </>
  );
} 