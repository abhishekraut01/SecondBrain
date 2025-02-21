import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

const AuthPage = ({ type }: { type: "signup" | "signin" }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const [showPassword, setShowPassword] = useState(false);

  interface FormData {
    username?: string;
    email: string;
    password: string;
  }

  const onSubmit = (data: FormData) => {
    console.log(`${type} data:`, data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-center mb-4">
          {type === "signup" ? "Sign Up" : "Sign In"}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {type === "signup" && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                {...register("username", { required: "username is required" })}
                className="w-full p-2 border rounded-md"
              />
              {errors.username && (
                <p className="text-red-500 text-sm">{errors.username.message}</p>
              )}
            </div>
          )}

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full p-2 border rounded-md"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div className="mb-4 relative">
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              {...register("password", { required: "Password is required" })}
              className="w-full p-2 border rounded-md"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-gray-600"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 text-white p-2 rounded-md hover:bg-purple-700"
          >
            {type === "signup" ? "Sign Up" : "Sign In"}
          </button>
        </form>
        <p className="text-center flex items-center justify-center text-sm text-gray-600 mt-4">
          {type === "signup"
            ? "Already have an account?"
            : "Don't have an account?"}
          <p className="text-purple-500 ml-1">
            {type === "signup" ? (
              <Link to="/signin">signin</Link>
            ) : (
              <Link to="/signup">signup</Link>
            )}
          </p>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
