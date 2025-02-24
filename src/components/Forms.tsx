"use client";
import { useFormik } from "formik";
import * as yup from "yup";
import MultiSelect from "./MultiSelect";

const options = [
  { value: "JavaScript", label: "JavaScript" },
  { value: "React", label: "React" },
  { value: "Next.js", label: "Next.js" },
  { value: "Node.js", label: "Node.js" },
];

interface FormValues {
  email: string;
  password: string;
  multiSelect: string[];
  file: File | null;
}
export default function Forms() {
  const formik = useFormik<FormValues>({
    initialValues: {
      email: "",
      password: "",
      multiSelect: [],
      file: null,
    },
    validationSchema: yup.object({
      email: yup.string().required("Email is required").email(),
      password: yup
        .string()
        .required("Password is required")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*])[A-Za-z\d@#$%^&*]{8,}$/,
          "Password must contain uppercase, lowercase, number, and special character"
        ),
      multiSelect: yup
        .array()
        .min(1, "Select at least one technology")
        .required("Required"),

      file: yup
        .mixed<File>()
        .required("File is required")
        .test("fileformat", "Only in .png , .jpg , .jpeg allowed", (value) => {
          return (
            value &&
            ["image/png", "image/jpg", "image/jpeg"].includes(value.type)
          );
        }),
    }),
    onSubmit: (values) => {
      console.log("Submit....", values);
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <div className="max-w-xl mx-auto p-6 bg-[#2E2E34] shadow-md rounded-lg mt-6 text-[#e6e6e6]">
      <form onSubmit={formik.handleSubmit} noValidate className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="email">Email:</label>
          <input
            type="text"
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
        <div className="flex flex-col">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            className="w-full p-1.5 border border-[#404046] rounded-md bg-[#2A2A30]"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.password && formik.errors.password && (
            <p className="text-red-500 text-xs">{formik.errors.password}</p>
          )}
        </div>
        <div className=" flex flex-col">
          <label htmlFor="technology"> Select Technology : </label>
          <MultiSelect formik={formik} options={options} />
          {formik.touched.multiSelect && formik.errors.multiSelect && (
            <p className="text-red-500 text-xs">{formik.errors.multiSelect}</p>
          )}
        </div>
        <div className="flex flex-col">
          <label htmlFor="file">Upload File:</label>
          <input
            type="file"
            id="file"
            name="file"
            onChange={(event) => {
              const file = event.currentTarget.files?.[0];
              if (file) {
                formik.setFieldValue("file", file);
              }
            }}
          />
          {formik.touched.file && formik.errors.file && (
            <p className="text-red-500 text-xs">{formik.errors.file}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-3/12 p-1.5 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
