import { Nasdaq100Table } from "./nasdaq50-table";

export default function Nasdaq100Page() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold">NASDAQ 100 Stock Information</h1>
        <p className="text-gray-600">
          แสดงราคาปัจจุบัน ราคาสูงสุด 52 สัปดาห์ และเปอร์เซ็นต์เปรียบเทียบราคาปัจจุบันกับราคาสูงสุด 52 สัปดาห์ของหุ้น NASDAQ 100 (แสดง 10 รายการต่อหน้า)
        </p>
      </div>
      <Nasdaq100Table />
    </div>
  );
} 