import { Link, useNavigate } from "react-router-dom";
import { Button, Input } from "../../components";
import { useFormik } from "formik";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { updateAccessToken } from "../../redux/slices/access-token-slice";
import { ReduxStoreState } from "../../redux/store";
import { startLoading, stopLoading } from "../../redux/slices/loading-slice";
import { updateUser } from "../../redux/slices/user-slice";
import apiService from "../../services/api-service";
import * as Yup from "yup";

export default function Register() {
  const accessToken = useSelector(
    (state: ReduxStoreState) => state.accessToken.value
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (values: RegisterUserRequest) => {
    dispatch(startLoading());
    const response = await apiService.registerUser(values);

    dispatch(stopLoading());

    if (response.ok) {
      const { accessToken, user } = response.data;
      dispatch(updateAccessToken(accessToken));
      dispatch(updateUser(user));

      navigate("/dashboard", { replace: true });
    } else if (response.status == 400) {
      dispatch(stopLoading());
      formik.setErrors(response.message);
    }
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("invalid email").required("can't be empty"),
    firstName: Yup.string().required("can't be empty"),
    lastName: Yup.string().required("can't be empty"),
    password: Yup.string().required("can't be empty"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
    },
    onSubmit: handleSubmit,
    validationSchema,
  });

  useEffect(() => {
    if (accessToken) {
      apiService.getUserDetails().then((res) => {
        dispatch(stopLoading());
        if (res.data.email) {
          dispatch(updateUser(res.data));
        }
      });
    }
  }, [navigate]);

  return (
    <div>
      <Helmet>
        <title>Register | TheJuan</title>
      </Helmet>

      <div className="flex flex-col-reverse md:flex-row items-center justify-center w-screen h-navbar-screen">
        <div className="w-full md:w-1/2 flex justify-center">
          <form
            onSubmit={formik.handleSubmit}
            className="bg-white shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] w-full md:max-w-[500px] py-8 md:px-8 rounded-t-xl rounded-b-none md:rounded-xl flex-1"
          >
            <h4 className="font-bold text-[30px] mb-10 text-center">
              Register
            </h4>

            <div className="flex justify-between">
              <Input
                value={formik.values.firstName}
                errors={formik.errors}
                touched={formik.touched}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="firstName"
                label="First Name"
                type="text"
                wrapperClassName="mx-2"
                errorClassName="right-0"
              />
              <Input
                value={formik.values.lastName}
                errors={formik.errors}
                touched={formik.touched}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="lastName"
                label="Last Name"
                type="text"
                wrapperClassName="mx-2"
                errorClassName="right-0"
              />
            </div>

            <Input
              value={formik.values.email}
              errors={formik.errors}
              touched={formik.touched}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="email"
              label="Email"
              type="email"
              wrapperClassName="mx-2 !mb-[20px]"
              errorClassName="right-0"
            />

            <Input
              value={formik.values.password}
              errors={formik.errors}
              touched={formik.touched}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="password"
              label="Password"
              type="password"
              wrapperClassName="m-2"
              errorClassName="right-0"
            />

            <div className="flex justify-between mx-2 my-10">
              <div className="flex gap-x-2 mt-2 px-2">
                <span className="font-jaldi underline text-sm ">
                  <Link to="/auth/login">Already have account? Login.</Link>
                </span>
              </div>

              <Button label="Register" type="submit" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
