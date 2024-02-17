import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { startLoading, stopLoading } from "../../redux/slices/loading-slice";
import { updateUser } from "../../redux/slices/user-slice";
import { ReduxStoreState } from "../../redux/store";
import apiService from "../../services/api-service";
import Navbar from "./Navbar";

type Props = {
  redirectPath?: string;
};

export default function ProtectedLayout({
  redirectPath = "/auth/login",
}: Props) {
  const accessToken = useSelector(
    (state: ReduxStoreState) => state.accessToken.value
  );
  const user = useSelector((state: ReduxStoreState) => state.user.value);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(startLoading());
    if (accessToken) {
      if (!user.id) {
        apiService.getUserDetails().then((res) => {
          dispatch(stopLoading());
          if (res.status == 401) {
            navigate(redirectPath, { replace: true });
          } else {
            dispatch(updateUser(res.data));
          }
        });
      }
    } else {
      setTimeout(() => {
        dispatch(stopLoading());
      }, 3000);

      navigate(redirectPath, { replace: true });
    }
  }, [accessToken]);

  return user.id ? (
    <div className="flex flex-col bg-white">
      <Navbar />
      <Outlet />
    </div>
  ) : (
    <></>
  );
}
