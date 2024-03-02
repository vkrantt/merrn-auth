import { useForm } from "react-hook-form";
import FormContainer from "../components/FormContainer";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout, setCredentials } from "../redux-store/slices/authslice";
import {
  useLogoutMutation,
  useUpdateProfileMutation,
} from "../redux-store/slices/auth-user-slice/userSlice";
import Loader from "../components/Loader";
import { toast } from "react-toastify";
import { useState } from "react";

const Home = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [updateProfileLoading, setUpdateProfileLoading] = useState(false);

  const userDetail = useSelector((state) => {
    return state.auth.userDetail;
  });

  const { register, setValue, handleSubmit } = useForm();

  useEffect(() => {
    setValue("fullName", userDetail.fullName);
    setValue("email", userDetail.email);
  }, []);

  const [apiLogout, { isLoading }] = useLogoutMutation();

  const handleLogout = async () => {
    await apiLogout().unwrap();
    dispatch(logout());
    navigate("/login");
  };

  const [updateProfile] = useUpdateProfileMutation();

  const onSubmit = async (data) => {
    try {
      setUpdateProfileLoading(true);
      const response = await updateProfile(data).unwrap();
      setUpdateProfileLoading(false);
      toast.success("User profile updated");
      if (data.password) {
        handleLogout();
      } else {
        dispatch(setCredentials(response));
      }
    } catch (error) {
      toast.error(error.data.message);
    }
  };

  return (
    <div className="h-screen">
      <FormContainer>
        <div className="text-2xl text-sky-600 text-center"> MERRN-AUTH </div>
        <div className="text-md font-bold text-center text-slate-500 mb-3">
          PROFILE
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label
            className={`shadow mb-3 input flex border-2 items-center gap-2`}
          >
            <input
              type="text"
              className="grow"
              placeholder="Full Name"
              {...register("fullName")}
            />
          </label>

          <label
            className={`shadow mb-3 input flex border-2 items-center gap-2`}
          >
            <input
              type="email"
              className="grow"
              placeholder="Email Address"
              {...register("email")}
            />
          </label>

          <label
            className={`shadow mb-3 input flex border-2 items-center gap-2`}
          >
            <input
              type={showPassword ? "text" : "password"}
              className="grow"
              placeholder="Password"
              {...register("password")}
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              type="button"
              className="btn btn-sm"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </label>

          <button type="submit" className="btn w-full btn-neutral">
            {updateProfileLoading ? <Loader /> : " UPDATE PROFILE"}
          </button>

          <div className="flex mt-4 justify-center items-center">
            <button
              type="button"
              onClick={handleLogout}
              className="btn btn-sm btn-error"
            >
              {isLoading ? <Loader /> : "Logout"}
            </button>
          </div>
        </form>
      </FormContainer>
    </div>
  );
};

export default Home;
