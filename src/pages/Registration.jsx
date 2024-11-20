import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRegisterLibrarianMutation } from "../store/slices/api/authApi";

const registrationSchema = yup.object().shape({
  username: yup
    .string()
    .required("Username is required")
    .min(4, "Minimum 4 characters"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Minimum 6 characters"),
  name: yup.string().required("Name is required"),
  surname: yup.string().required("Surname is required"),
  experience: yup
    .number()
    .typeError("Experience must be a number")
    .positive("Experience must be positive")
    .required("Experience is required"),
  schedule: yup
    .array()
    .of(yup.string())
    .min(1, "At least one working day must be selected")
    .required("Schedule is required"),
  section: yup.string().required("Section must be selected"),
});

const RegistrationPage = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registrationSchema),
    defaultValues: {
      username: "",
      password: "",
      name: "",
      surname: "",
      experience: "",
      schedule: [],
      section: "",
    },
    mode: "onChange",
  });

  const [registerLibrarian, { isLoading }] = useRegisterLibrarianMutation();

  const onSubmit = async (data) => {
    try {
      await registerLibrarian(data).unwrap();
      alert("Registration successful!");
    } catch (error) {
      alert(error.data?.message || "Registration failed.");
    }
  };

  const workingDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const sections = ["Fiction", "Science", "History", "Technology", "Art"];

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-6 max-w-md mx-auto space-y-4"
    >
      <h1 className="text-2xl font-bold">Register Librarian</h1>

      <a href="/login">Already a member?</a>
      <div>
        <label className="block text-sm font-medium">Username</label>
        <input
          {...register("username")}
          className="w-full p-2 border rounded"
          placeholder="Enter username"
        />
        <p className="text-red-500 text-sm">{errors.username?.message}</p>
      </div>

      <div>
        <label className="block text-sm font-medium">Password</label>
        <input
          type="password"
          {...register("password")}
          className="w-full p-2 border rounded"
          placeholder="Enter password"
        />
        <p className="text-red-500 text-sm">{errors.password?.message}</p>
      </div>

      <div>
        <label className="block text-sm font-medium">Name</label>
        <input
          {...register("name")}
          className="w-full p-2 border rounded"
          placeholder="Enter name"
        />
        <p className="text-red-500 text-sm">{errors.name?.message}</p>
      </div>

      <div>
        <label className="block text-sm font-medium">Surname</label>
        <input
          {...register("surname")}
          className="w-full p-2 border rounded"
          placeholder="Enter surname"
        />
        <p className="text-red-500 text-sm">{errors.surname?.message}</p>
      </div>

      <div>
        <label className="block text-sm font-medium">Experience</label>
        <input
          type="number"
          {...register("experience")}
          className="w-full p-2 border rounded"
          placeholder="Enter years of experience"
        />
        <p className="text-red-500 text-sm">{errors.experience?.message}</p>
      </div>

      <div>
        <label className="block text-sm font-medium">Working Days</label>
        {workingDays.map((day) => (
          <label key={day} className="block">
            <input
              type="checkbox"
              value={day}
              {...register("schedule")}
              className="mr-2"
            />
            {day}
          </label>
        ))}
        <p className="text-red-500 text-sm">{errors.schedule?.message}</p>
      </div>

      <div>
        <label className="block text-sm font-medium">Section</label>
        <div className="grid grid-cols-3 gap-2">
          {sections.map((section) => (
            <button
              key={section}
              type="button"
              className={`p-2 border rounded ${
                watch("section") === section
                  ? "bg-blue-500 text-white"
                  : "bg-white"
              }`}
              onClick={() => setValue("section", section)}
            >
              {section}
            </button>
          ))}
        </div>
        <p className="text-red-500 text-sm">{errors.section?.message}</p>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-green-600 text-white py-2 px-4 rounded"
      >
        {isLoading ? "Registering..." : "Register"}
      </button>
    </form>
  );
};

export default RegistrationPage;
