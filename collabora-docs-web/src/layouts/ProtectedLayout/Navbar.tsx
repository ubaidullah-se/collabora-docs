import { useDispatch } from "react-redux";
import { Logo } from "../../components";
import { FaUserCircle } from "react-icons/fa";
import { logoutUser } from "../../redux/slices/user-slice";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  return (
    <div className="container m-auto flex justify-between items-center h-navbar max-w-[1000px] px-10 relative">
      <Logo className="!text-theme-blue-900 min-w-[182px]" />
      <FaUserCircle className="text-3xl cursor-pointer peer" />
      <ul className="hidden hover:block absolute peer-hover:block top-[50px] right-[40px] bg-white px-1 w-[150px] shadow-md border rounded">
        <li
          onClick={logout}
          className="px-1 py-3 cursor-pointer text-red-400 text-sm"
        >
          Logout
        </li>
      </ul>
    </div>
  );
}
