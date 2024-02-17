import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function PublicLayout() {
  return (
    <div className="flex flex-col bg-white">
      <Navbar />
      <Outlet />
    </div>
  );
}
