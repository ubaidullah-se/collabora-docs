import { Logo } from "../../components";

export default function Navbar() {
  return (
    <div className="container m-auto pl-6 flex justify-between items-center h-navbar max-w-[1000px]">
      <Logo className="!text-theme-blue-900 min-w-[182px]" />
    </div>
  );
}
