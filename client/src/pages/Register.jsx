import { Link, useNavigate } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import { useForm } from "react-hook-form";
import Loader from "../components/Loader";
import { useCreateUserMutation } from "../redux-store/slices/auth-user-slice/userSlice";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setCredentials } from "../redux-store/slices/authslice";
import { useState } from "react";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [createUser, { isLoading }] = useCreateUserMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (Object.keys(errors).length > 0) return;
    if (data.password !== data.confirmPassword) {
      toast.error("Passwords are not same");
      return;
    }

    try {
      const response = await createUser({
        fullName: data.fullName,
        email: data.email,
        password: data.password,
      }).unwrap();

      dispatch(setCredentials(response));
      navigate("/");
    } catch (error) {
      toast.error(error.data.message);
    }
  };

  return (
    <FormContainer>
      <div className="text-2xl text-sky-600 text-center">MERRN-AUTH </div>
      <div className="text-md font-bold text-center text-slate-500 mb-3">
        Register
      </div>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <label
          className={`mb-3 input shadow border-2 flex items-center gap-2 ${
            errors.fullName && "input-error"
          }`}
        >
          <input
            type="text"
            className="grow"
            placeholder="Full name"
            required
            {...register("fullName", { required: true })}
          />
        </label>

        <label
          className={`mb-3 input shadow border-2 flex items-center gap-2 ${
            errors.email && "input-error"
          }`}
        >
          <input
            type="email"
            className="grow"
            placeholder="Email Address"
            required
            {...register("email", {
              required: true,
              pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            })}
          />
        </label>

        <label
          className={`mb-3 input shadow border-2 flex items-center gap-2 ${
            errors.password && "input-error"
          }`}
        >
          <input
            type={showPassword ? "text" : "password"}
            className="grow"
            placeholder="Password"
            required
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

        <label
          className={`mb-3 input shadow border-2 flex items-center gap-2 ${
            errors.confirmPassword && "input-error"
          }`}
        >
          <input
            type="password"
            className="grow"
            placeholder="Confirm Password"
            required
            {...register("confirmPassword", { required: true })}
          />
        </label>

        <button
          disabled={isLoading}
          type="submit"
          className="btn w-full btn-active btn-neutral"
        >
          {isLoading ? <Loader /> : "REGISTER"}
        </button>
      </form>

      {errors.password && (
        <div className="text-sm mt-4 text-center text-red-500">
          Please fill all the required fields.
        </div>
      )}

      {errors.email &&
        !errors.password &&
        !errors.fullName &&
        !errors.confirmPassword && (
          <div className="text-sm mt-4 text-center text-red-500">
            Please enter a valid email address.
          </div>
        )}

      <div className="flex mt-4">
        <div>Already have an account?</div>
        <Link to="/login" className=" text-sky-600">
          Login
        </Link>
      </div>
    </FormContainer>
  );
};

export default Register;
