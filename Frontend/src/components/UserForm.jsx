import React from "react";
import { useForm } from "react-hook-form";
import FormField from "../common/FormField";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

export default function UserForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/user-register`,
        data
      );
      console.log("Form Submitted:", data);
      toast.success("User added successfully!");
      reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Error adding user. Please try again.");
    }
  };
  return (
    <div
      className="max-w-5xl mx-auto mt-10 p-6  rounded-lg shadow-lg "
      style={{
        background: "linear-gradient(135deg, #f29f67, #e6e1ff)",
      }}
    >
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Add User</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* First Row: Name and Email */}
        <div className="grid grid-cols-2 gap-6">
          <FormField
            label="Name"
            name="name"
            {...register("name", { required: "Name is required" })}
            error={errors.name}
          />
          <FormField
            label="Email"
            name="email"
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
            })}
            error={errors.email}
          />
        </div>

        {/* Second Row: Password and Phone */}
        <div className="grid grid-cols-2 gap-6">
          <FormField
            label="Password"
            name="password"
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: { value: 6, message: "Min 6 characters required" },
            })}
            error={errors.password}
          />
          <FormField
            label="Phone"
            name="phone"
            type="number"
            min="0"
            {...register("phone", {
              required: "Phone is required",
              minLength: { value: 10, message: "Must be 10 digits" },
            })}
            error={errors.phone}
          />
        </div>

        {/* Third Row: Photo URL and Role */}
        <div className="grid grid-cols-2 gap-6">
          <FormField
            label="Photo URL"
            name="photo"
            type="url"
            {...register("photo")}
            error={errors.photo}
          />
          <FormField
            label="Role"
            name="role"
            type="select"
            options={[
              { value: "Admin", label: "Admin" },
              { value: "TeamMember", label: "TeamMember" },
              { value: "ProjectManager", label: "ProjectManager" },
              { value: "Client", label: "Client" },
            ]}
            {...register("role", { required: "Role is required" })}
            error={errors.role}
          />
        </div>

        {/* Fourth Row: Status */}
        <FormField
          label="Status"
          name="status"
          type="select"
          options={[
            { value: "active", label: "Active" },
            { value: "inactive", label: "Inactive" },
          ]}
          {...register("status", { required: "Status is required" })}
          error={errors.status}
        />

        <button
          type="submit"
          className="px-10 ml-4 ml-auto block mt-10 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-full transition-transform transform-gpu hover:-translate-y-1 hover:shadow-lg"
        >
          Submit
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}
