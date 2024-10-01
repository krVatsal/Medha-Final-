"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import axios from 'axios'; // Import axios for API calls
import { useRouter } from 'next/navigation'; 

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showRetypePassword, setShowRetypePassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    mode: "onBlur",
  });
  const router = useRouter();
  // Watch the password field for validation
  const password = watch("password");

  // Modify onSubmit to exclude retypePassword field
  const onSubmit = async (data:any) => {
    try {
      // Call your login API
      const response = await axios.post('http://localhost:5217/api/v1/client/register', {
        email: data.email,
        password: data.password,
        name: data.name
      });

      // If login is successful, navigate to dashboard or any secure page
      if (response.status === 200) {
        // Set token in localStorage or cookies if needed
        localStorage.setItem('accessToken', response.data.accessToken);
        localStorage.setItem('refreshToken', response.data.refreshToken);

        // Navigate to the dashboard
        router.push('/');
      }
    } catch (error) {
      console.error("Login failed", error);
      // Handle login errors like invalid credentials
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="pr-32 flex flex-col justify-center items-center min-h-screen bg-white">
      <div className="text-lg flex gap-3 font-normal items-center mb-8">
        <Image src="./Codepen.svg" width={32} height={32} alt="Logo" />
        <span className="text-[26px]">Medha</span>
      </div>
      <div className="text-left flex gap-2 text-sm">
        <span className="text-left text-[#696969]">Already a member?</span>
        <a href="/login" className="font-bold text-[#354AB0]">
          Sign in
        </a>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-sm text-center relative"
      >
        <h2 className="text-left text-[44px] font-semibold mb-2">Sign Up</h2>
        <p className="text-left text-[#696969] text-[15px] mb-8">
          Teach using the Power of Generative AI
        </p>

        {/* Name Input */}
        <div className="relative mb-4">
          <Image
            src="./User.svg"
            width={24} height={24} alt="User Icon"
            className="absolute left-2 top-[15px] transform -translate-y-1/2"
          />
          <input
            id="name"
            type="text"
            placeholder="Name"
            {...register("name", {
              required: "Name is required",
            })}
            className={`border-b-2 border-black w-full pl-10 py-2 pr-8 text-gray-700 focus:outline-none ${
              errors.name ? "border-red-500" : ""
            }`}
          />
          {errors.name && typeof errors.name.message === 'string' && (
            <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Email Input */}
        <div className="relative mb-4">
          <Image
            src="./Mail.svg"
            width={24} height={24} alt="Email Icon"
            className="absolute left-2 top-[15px] transform -translate-y-1/2"
          />
          <input
            id="email"
            type="email"
            placeholder="Email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email address",
              },
            })}
            className={`border-b-2 border-black w-full pl-10 py-2 pr-8 text-gray-700 focus:outline-none ${
              errors.email ? "border-red-500" : ""
            }`}
          />
          {isValid && !errors.email && (
            <Image
              src="./Check circle.svg"
              width={20} height={20} alt="Checkmark Icon"
              className="absolute right-2 top-1/2 transform -translate-y-1/2"
            />
          )}
          {errors.email && typeof errors.email.message === 'string' && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Password Input */}
        <div className="relative mb-6">
          <Image
            src="./Key.svg"
            width={24} height={24} alt="Lock Icon"
            className="absolute left-2 top-[15px] transform -translate-y-1/2"
          />
          <input
            id="password"
            type={showPassword ? "text" : "password"} // Toggle input type based on state
            placeholder="Password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters long",
              },
            })}
            className={`border-b-2 border-black w-full pl-10 py-2 pr-8 text-gray-700 focus:outline-none ${
              errors.password ? "border-red-500" : ""
            }`}
          />
          <Image
            src="./Eye off.svg" // Add your eye icon here
            width={20} height={20} alt="Toggle Password Visibility"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          />
          {isValid && !errors.password && (
            <Image
              src="./Check circle.svg"
              width={20} height={20} alt="Checkmark Icon"
              className="absolute right-8 top-1/2 transform -translate-y-1/2"
            />
          )}
          {errors.password && typeof errors.password.message === 'string' && (
            <p className="text-red-500 text-xs mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Re-type Password Input */}
        <div className="relative mb-6">
          <Image
            src="./Key.svg"
            width={24} height={24} alt="Lock Icon"
            className="absolute left-2 top-[15px] transform -translate-y-1/2"
          />
          <input
            id="retypePassword"
            type={showRetypePassword ? "text" : "password"} // Toggle input type based on state
            placeholder="Re-type Password"
            {...register("retypePassword", {
              required: "Please re-type your password",
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
            className={`border-b-2 border-black w-full pl-10 py-2 pr-8 text-gray-700 focus:outline-none  ${
              errors.retypePassword ? "border-red-500" : ""
            }`}
          />
          <Image
            src="./Eye off.svg" // Add your eye icon here
            width={20} height={20} alt="Toggle Password Visibility"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
            onClick={() => setShowRetypePassword(!showRetypePassword)}
          />
          {isValid && !errors.retypePassword && (
            <Image
              src="./Check circle.svg"
              width={20} height={20} alt="Checkmark Icon"
              className="absolute right-8 top-1/2 transform -translate-y-1/2"
            />
          )}
          {errors.retypePassword && typeof errors.retypePassword.message === 'string' && (
            <p className="text-red-500 text-xs mt-1">
              {errors.retypePassword.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="text-left flex items-center pt-6 gap-4 mb-6">
          <button
            type="submit"
            className="bg-[#2C2C2C] text-white font-light text-[16px] py-2 px-6 rounded-md focus:outline-none focus:shadow-outline"
          >
            Sign up
          </button>
          <span className="text-[#A1A1A1]">or</span>
          <Image
            src="/Screenshot_2024-08-22_at_3.00.58_AM-removebg-preview 4.png"
            width={32} height={32} alt="Alternate Sign In"
            className="cursor-pointer"
          />
        </div>
      </form>
    </div>
  );
};

export default SignUpPage;
