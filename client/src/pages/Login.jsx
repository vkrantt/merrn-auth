import { Link, useNavigate } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import { useForm } from "react-hook-form";
import Loader from "../components/Loader";
import { MdAlternateEmail, MdPassword } from "react-icons/md";
import { useLoginMutation } from "../redux-store/slices/auth-user-slice/userSlice";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setCredentials } from "../redux-store/slices/authslice";
import { useState } from "react";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    if (Object.keys(errors).length > 0) return;
    try {
      const response = await login(data).unwrap();
      dispatch(setCredentials(response));
      navigate("/");
    } catch (error) {
      toast.error(error.data.message);
    }
  };

  return (
    <FormContainer>
      <div className="text-2xl text-sky-600 text-center"> MERRN-AUTH </div>
      <div className="text-md font-bold text-center text-slate-500 mb-3">
        Log In
      </div>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <label
          className={`shadow mb-3 input flex border-2 items-center gap-2 ${
            errors.email && "input-error"
          }`}
        >
          <MdAlternateEmail className="text-slate-400" />

          <input
            type="email"
            className="grow"
            placeholder="Email Address"
            {...register("email", {
              pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              required: true,
            })}
          />
        </label>

        <label
          className={`shadow mb-3 input flex border-2 items-center gap-2 ${
            errors.password ? "input-error " : ""
          }`}
        >
          <MdPassword className="text-slate-400" />
          <input
            type={showPassword ? "text" : "password"}
            className="grow"
            placeholder="Password"
            {...register("password", { required: true })}
          />
          <button
            onClick={() => setShowPassword(!showPassword)}
            type="button"
            className="btn btn-sm"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </label>

        <button
          disabled={isLoading}
          type="submit"
          className="btn w-full btn-neutral"
        >
          {isLoading ? <Loader /> : "LOGIN"}
        </button>
      </form>

      {errors.password && (
        <div className="text-sm mt-4 text-center text-red-500">
          Please fill all the required fields.
        </div>
      )}

      {errors.email && !errors.password && (
        <div className="text-sm mt-4 text-center text-red-500">
          Please enter a valid email address.
        </div>
      )}

      <div className="flex mt-4">
        <div>Create an account?</div>
        <Link to="/register" className="text-sky-600">
          Register
        </Link>
      </div>
    </FormContainer>
  );
};

export default Login;
