import { Nasdaq100Table } from "./nasdaq100-table";

export default function Nasdaq100Page() {
  return (
    <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-6 space-y-4 sm:space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold">Stock Market Information</h1>
        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
          แสดงข้อมูลราคาปัจจุบัน ราคาสูงสุด 52 สัปดาห์ และเปอร์เซ็นต์เปรียบเทียบราคาปัจจุบันกับราคาสูงสุด 52 สัปดาห์ของหุ้นยอดนิยม ในรูปแบบ Heatmap โดยดึงข้อมูลแบบไดนามิกจาก Yahoo Finance (แสดงทั้งหมดโดยไม่มีการแบ่งหน้า)
        </p>
      </div>
      <Nasdaq100Table />
    </div>
  );
} 