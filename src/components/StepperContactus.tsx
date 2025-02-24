"use client";
import { useState, useRef } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function StepperContactus() {
  const [step, setStep] = useState(1);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      radioGroup: "",
      address: "",
      city: "",
      zip: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(8, "Must be at least 8 characters")
        .max(20, "Must be less than 20 characters")
        .required("Username is required")
        .matches(/^[a-zA-Z]+$/, "No special characters or spaces"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      phone: Yup.string()
        .matches(/^[0-9]{10}$/, "Must be exactly 10 digits")
        .required("Phone number is required"),
      radioGroup: Yup.string().required("Required"),
      address: Yup.string().when("$step", {
        is: 2,
        then: (schema) => schema.required("Address is required"),
        otherwise: (schema) => schema,
      }),
      city: Yup.string().when("$step", {
        is: 2,
        then: (schema) => schema.required("City is required"),
        otherwise: (schema) => schema,
      }),
      zip: Yup.string().when("$step", {
        is: 2,
        then: (schema) =>
          schema
            .matches(/^\d{5}$/, "Invalid ZIP code")
            .required("ZIP code is required"),
        otherwise: (schema) => schema,
      }),
    }),
    onSubmit: (values) => {
      console.log("Form Submitted:", values);
      alert("Form Submitted Successfully!");
    },
    validateOnChange: false, // Prevent validation triggering on every keystroke
    validateOnBlur: false,
  });

  const nextStep = async () => {
    await formik.validateForm();

    // Check if there are any errors for Step 1 before proceeding
    if (step === 1) {
      if (
        !formik.errors.name &&
        !formik.errors.email &&
        !formik.errors.phone &&
        !formik.errors.radioGroup
      ) {
        setStep(2);
        formik.setTouched({}); // Reset touched fields when navigating
      }
    }
  };

  const prevStep = () => {
    setStep(1);
    formik.setTouched({}); // Reset touched fields when navigating back
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold text-center mb-4">Multi-Step Form</h2>

      <form onSubmit={formik.handleSubmit} className="space-y-4">
        {step === 1 && (
          <>
            <div>
              <label htmlFor="name">Name:</label>
              <input
                id="name"
                type="text"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full px-4 py-1.5 border rounded-md focus:ring-2 focus:ring-blue-400"
              />
              {formik.errors.name && (
                <p className="text-red-500 text-sm">{formik.errors.name}</p>
              )}
            </div>

            <div>
              <label htmlFor="email">Email:</label>
              <input
                id="email"
                type="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
              />
              {formik.errors.email && (
                <p className="text-red-500 text-sm">{formik.errors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="phone">Phone:</label>
              <input
                id="phone"
                type="text"   
                name="phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
              />
              {formik.errors.phone && (
                <p className="text-red-500 text-sm">{formik.errors.phone}</p>
              )}
            </div>

            <div>
              <label>Select Gender:</label>
              <div className="flex gap-4">
                <label>
                  <input
                    type="radio"
                    name="radioGroup"
                    value="Male"
                    onChange={formik.handleChange}
                    checked={formik.values.radioGroup === "Male"}
                  />
                  Male
                </label>
                <label>
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
                <p className="text-red-500 text-sm">
                  {formik.errors.radioGroup}
                </p>
              )}
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <div>
              <label htmlFor="password">Password : </label>
              <input type="text" />
            </div>
            <div>
              <label htmlFor="password"> Confirm Password : </label>
            </div>

            <div>
              <label htmlFor="address">Address:</label>
              <input
                id="address"
                type="text"
                name="address"
                value={formik.values.address}
                onChange={formik.handleChange}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
              />
              {formik.errors.address && (
                <p className="text-red-500 text-sm">{formik.errors.address}</p>
              )}
            </div>

            <div>
              <label htmlFor="city">City:</label>
              <input
                id="city"
                type="text"
                name="city"
                value={formik.values.city}
                onChange={formik.handleChange}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
              />
              {formik.errors.city && (
                <p className="text-red-500 text-sm">{formik.errors.city}</p>
              )}
            </div>

            <div>
              <label htmlFor="zip">ZIP Code:</label>
              <input
                id="zip"
                type="text"
                name="zip"
                value={formik.values.zip}
                onChange={formik.handleChange}
                className="w-full px-4 py-1 border rounded-md focus:ring-2 focus:ring-blue-400"
              />
              {formik.errors.zip && (
                <p className="text-red-500 text-sm">{formik.errors.zip}</p>
              )}
            </div>
          </>
        )}

        <div className="flex justify-between mt-4">
          {step > 1 && (
            <button
              type="button"
              onClick={prevStep}
              className="bg-gray-500 text-white px-4 py-2 rounded-md"
            >
              Back
            </button>
          )}

          {step < 2 ? (
            <button
              type="button"
              onClick={nextStep}
              className="bg-blue-500 text-white px-4 py-2 rounded-md ml-auto"
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded-md ml-auto"
            >
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
