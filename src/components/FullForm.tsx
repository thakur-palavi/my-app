"use client";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import MultiSelect from "./MultiSelect";

const options = [
  { value: "JavaScript", label: "JavaScript" },
  { value: "React", label: "React" },
  { value: "Next.js", label: "Next.js" },
  { value: "Node.js", label: "Node.js" },
];

export const FullForm = () => {
  const [rangeValue, setRangeValue] = useState(50);
  const [file, setFile] = useState<File | null>(null);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      age: "",
      radioGroup: "",
      technologyCheck: [] as string[],
      countrySelect: "",
      password: "",
      confirmPassword: "",
      range: 50,
      multiSelect: [],
      // file: null,
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("First name is required"),
      email: Yup.string()
        .email("Enter a valid email")
        .required("Email is required"),
      phone: Yup.string()
        .matches(/^[0-9]{10}$/, "Enter a valid phone number")
        .required("Phone is required"),
      password: Yup.string()
        .required("Password is required")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*])[A-Za-z\d@#$%^&*]{8,}$/,
          "Password must contain uppercase, lowercase, number, and special character"
        ),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Confirm password is required"),
      age: Yup.number().typeError("Age must be a number").required(),
      countrySelect: Yup.string().required("Select a country"),
      range: Yup.number().min(10).max(100).required("Select a range"),
      multiSelect: Yup.array()
        .min(1, "Select at least one technology")
        .required("Required"),
      // file: Yup.mixed()
      //   .test("fileType", "Only PDF files are allowed", (value: any) =>
      //     value ? value.type === "application/pdf" : false
      //   )
    }),
    onSubmit: (values) => {
      console.log("Form Submitted:", values);
      alert(JSON.stringify(values, null, 2));
    },
  });

  // const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   debugger;
  //   if (event.target.files && event.target.files[0]) {
  //     debugger;
  //     const uploadedFile = event.target.files[0];

  //     if (uploadedFile.type === "application/pdf") {
  //       setFile(uploadedFile);
  //       formik.setFieldValue("file", uploadedFile.type);
  //     } else {
  //       alert("Only PDF files are allowed.");
  //     }
  //   }
  // };

  return (
    <div className="max-w-xl mx-auto p-6 bg-[#2E2E34] shadow-md rounded-lg mt-6 text-[#e6e6e6]">
      <form onSubmit={formik.handleSubmit} noValidate className="space-y-4">
        <div className="flex gap-4">
          <div className="w-1/2">
            <label htmlFor="firstName">First Name:</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              className="w-full p-1.5 border border-[#404046] rounded-md bg-[#2A2A30]"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.firstName && formik.errors.firstName && (
              <p className="text-red-500 text-xs">{formik.errors.firstName}</p>
            )}
          </div>
          <div className="w-1/2">
            <label htmlFor="lastName" className="block font-medium">
              Last Name:
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              className="w-full p-1.5 border border-[#404046] rounded-md bg-[#2A2A30]"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
        </div>

        <div className="flex gap-4">
          <div className="w-1/2">
            <label htmlFor="email" className="block font-medium">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full p-1.5 border border-[#404046] rounded-md bg-[#2A2A30]"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-xs">{formik.errors.email}</p>
            )}
          </div>
          <div className="w-1/2">
            <label htmlFor="phone" className="block font-medium">
              Phone:
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className="w-full p-1.5 border border-[#404046] rounded-md bg-[#2A2A30]"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              maxLength={10}
            />
            {formik.touched.phone && formik.errors.phone && (
              <p className="text-red-500 text-xs">{formik.errors.phone}</p>
            )}
          </div>
        </div>

        <div className="flex gap-4">
          <div className="w-1/2">
            <label htmlFor="age" className="block font-medium">
              Age:
            </label>
            <input
              type="number"
              id="age"
              name="age"
              className="w-full p-1.5 border border-[#404046] rounded-md bg-[#2A2A30]"
              value={formik.values.age}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.age && formik.errors.age && (
              <p className="text-red-500 text-xs">{formik.errors.age}</p>
            )}
          </div>
          <div className="w-1/2">
            <label className="block font-medium">Select Gender:</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="radioGroup"
                  value="Male"
                  onChange={formik.handleChange}
                  checked={formik.values.radioGroup === "Male"}
                />
                Male
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="radioGroup"
                  value="Female"
                  onChange={formik.handleChange}
                  checked={formik.values.radioGroup === "Female"}
                />
                Female
              </label>
            </div>
            {formik.errors.radioGroup && (
              <p className="text-red-500 text-xs">{formik.errors.radioGroup}</p>
            )}
          </div>
        </div>

        <div className="flex gap-4">
          <div className="w-1/2">
            <label htmlFor="password"> Password : </label>
            <input
              id="password"
              type="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full p-1.5 border border-[#404046] rounded-md bg-[#2A2A30]"
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 text-xs">{formik.errors.password} </p>
            )}
          </div>
          <div className="w-1/2">
            <label htmlFor="confirmpassword"> Confirm Password : </label>
            <input
              id="confirmpassword"
              type="password"
              name="confirmPassword"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full p-1.5 border border-[#404046] rounded-md bg-[#2A2A30]"
            />
            {formik.touched.confirmPassword &&
              formik.errors.confirmPassword && (
                <p className="text-red-500 text-xs">
                  {" "}
                  {formik.errors.confirmPassword}{" "}
                </p>
              )}
          </div>
        </div>

        <div>
          <label className="block font-medium">Technology:</label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="technologyCheck"
                value="JavaScript"
                onChange={formik.handleChange}
                checked={formik.values.technologyCheck.includes("JavaScript")}
              />
              JavaScript
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="technologyCheck"
                value="React"
                onChange={formik.handleChange}
                checked={formik.values.technologyCheck.includes("React")}
              />
              React
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="technologyCheck"
                value="NextJs"
                onChange={formik.handleChange}
                checked={formik.values.technologyCheck.includes("NextJs")}
              />
              Next.js
            </label>
          </div>
          {formik.errors.technologyCheck && (
            <p className="text-red-500 text-xs">
              {formik.errors.technologyCheck}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="select">Select Country : </label>
          <select
            id="country"
            name="countrySelect"
            className="w-full p-1.5 border border-[#404046] rounded-md bg-[#2A2A30]"
            value={formik.values.countrySelect}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <option value="" label="Select a country" />
            <option value="USA" label="United States" />
            <option value="UK" label="United Kingdom" />
            <option value="India" label="India" />
            <option value="Canada" label="Canada" />
          </select>
          {formik.touched.countrySelect && formik.errors.countrySelect && (
            <p className="text-red-500 text-xs">
              {formik.errors.countrySelect}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="range"> Select Range : {rangeValue}</label>
          <input
            type="range"
            id="range"
            name="range"
            min="10"
            max="100"
            value={formik.values.range}
            onChange={(e) => {
              const newValue = Number(e.target.value);
              setRangeValue(newValue);
              formik.setFieldValue("range", newValue);
            }}
            onBlur={formik.handleBlur}
          />
          {formik.touched.range && formik.errors.range && (
            <p className="text-red-500 text-xs">{formik.errors.range}</p>
          )}
        </div>

        {/* <div>
          <label htmlFor="multiSelect" className="block font-medium">
            Select Technologies:
          </label>
          <MultiSelect formik={formik} options={options} />

          {formik.touched.multiSelect && formik.errors.multiSelect && (
            <p className="text-red-500 text-xs">{formik.errors.multiSelect}</p>
          )}
        </div> */}

        {/* <div>
          <label htmlFor="file" className="block text-sm font-medium mb-1">
            Document Upload:
          </label>
          <input
            type="file"
            id="file"
            name="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className=" text-white w-full p-1 border border-[#404046] rounded-md bg-[#2A2A30]"
          />
          {formik.touched.file && formik.errors.file && (
            <p className="text-red-500 text-xs">{formik.errors.file}</p>
          )}
        </div> */}

        {/* ✅ Fixed Submit Button */}
        <button
          type="submit"
          className="w-3/12 p-1.5 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
          onClick={() => console.log("Submit button clicked")}
        >
          Submit
        </button>
      </form>
    </div>
  );
};
