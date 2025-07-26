import { Nasdaq100Table } from "./nasdaq100-table";

export default function Nasdaq100Page() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold">Stock Market Information</h1>
        <p className="text-gray-600">
          แสดงข้อมูลราคาปัจจุบัน ราคาสูงสุด 52 สัปดาห์ และเปอร์เซ็นต์เปรียบเทียบราคาปัจจุบันกับราคาสูงสุด 52 สัปดาห์ของหุ้นยอดนิยม ในรูปแบบ Heatmap โดยดึงข้อมูลแบบไดนามิกจาก Yahoo Finance (แสดงทั้งหมดโดยไม่มีการแบ่งหน้า)
        </p>
      </div>
      <Nasdaq100Table />
    </div>
  );
} 