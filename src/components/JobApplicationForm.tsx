"use client";
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Select from "react-select";

type OptionType = {
  value: string;
  label: string;
};

const skillOptions: OptionType[] = [
  { value: "JavaScript", label: "JavaScript" },
  { value: "React", label: "React" },
  { value: "Node.js", label: "Node.js" },
  { value: "TypeScript", label: "TypeScript" },
];

const JobApplicationForm = () => {
  const [step, setStep] = useState(1);

  const validationSchemas = [
    Yup.object({
      fullName: Yup.string().min(3, "Too short!").required("Required"),
      email: Yup.string().email("Invalid email").required("Required"),
      phone: Yup.string()
        .matches(/^\d{10}$/, "Must be 10 digits")
        .required("Required"),
    }),
    Yup.object({
      resume: Yup.mixed().required("Resume is required"),
      linkedin: Yup.string().url("Invalid URL"),
      experience: Yup.number()
        .min(0, "Cannot be negative")
        .max(26, "Too much experience!")
        .required("Required"),
    }),
    Yup.object({
      skills: Yup.array().min(1, "Select at least one skill").required(),
      location: Yup.string().required("Required"),
      salary: Yup.number().positive("Must be positive").required("Required"),
    }),
    Yup.object({}),
  ];

  const initialValues = {
    fullName: "",
    email: "",
    phone: "",
    resume: null,
    linkedin: "",
    experience: "",
    skills: [] as { value: string; label: string }[],
    location: "",
    salary: "",
    agree: false,
  };

  const handleNext = (validateForm, errors, setTouched) => {
    validateForm().then((validationErrors) => {
      if (Object.keys(validationErrors).length === 0) {
        setStep((step) => step + 1);
      } else {
        setTouched(errors);
      }
    });
  };

  const handlePrev = () => {
    setStep((step) => step - 1);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchemas[step - 1]}
      onSubmit={(values) => alert(JSON.stringify(values, null, 2))}
    >
      {({ values, setFieldValue, validateForm, errors, setTouched }) => (
        <Form className="form-container max-w-md mx-auto mt-10 p-6 bg-gray-900 text-white shadow-lg rounded-lg">
          {step === 1 && (
            <div className="flex flex-col gap-2">
              <h2>Step 1: Personal Information</h2>
              <div>
                <label>Full Name:</label>
                <Field
                  name="fullName"
                  className="w-full p-1 border rounded bg-gray-800"
                />
                <ErrorMessage
                  name="fullName"
                  component="div"
                  className="error text-xs text-red-600"
                />
              </div>
              <div>
                <label>Email:</label>
                <Field
                  name="email"
                  type="email"
                  className="w-full p-1 border rounded bg-gray-800"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="error text-xs text-red-600"
                />
              </div>
              <div>
                <label>Phone:</label>
                <Field
                  name="phone"
                  className="w-full p-1 border rounded bg-gray-800"
                />
                <ErrorMessage
                  name="phone"
                  component="div"
                  className="error text-xs text-red-600"
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2>Step 2: Professional Details</h2>
              <div>
                <label>Resume Upload:</label>
                <input
                  type="file"
                  onChange={(event) => {
                    const file = event.currentTarget.files?.[0] || null;
                    setFieldValue("resume", file);
                  }}
                />
                {errors.resume && (
                  <div className="error text-xs text-red-600">
                    {errors.resume}
                  </div>
                )}
              </div>
              <div>
                <label>LinkedIn Profile:</label>
                <Field
                  name="linkedin"
                  className="w-full p-1 border rounded bg-gray-800"
                />
                <ErrorMessage
                  name="linkedin"
                  component="div"
                  className="error text-xs text-red-600"
                />
              </div>
              <div>
                <label>Experience (Years):</label>
                <Field
                  name="experience"
                  type="number"
                  className="w-full p-1 border rounded bg-gray-800"
                />
                <ErrorMessage
                  name="experience"
                  component="div"
                  className="error text-xs text-red-600"
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2>Step 3: Skills & Preferences</h2>
              <div>
                <label>Skills:</label>
                <Select
                  options={skillOptions}
                  isMulti
                  name="skills"
                  value={skillOptions.filter((option) =>
                    values.skills?.includes(option.value)
                  )}
                  onChange={(selectedOptions) => {
                    const selectedValues = (selectedOptions ?? []).map(
                      (option) => option.value
                    );
                    setFieldValue("skills", selectedValues);
                  }}
                />

                <ErrorMessage
                  name="skills"
                  component="div"
                  className="error text-xs text-red-600"
                />
              </div>
              <div>
                <label>Preferred Location:</label>
                <Field
                  name="location"
                  className="w-full p-1 border rounded bg-gray-800"
                />
                <ErrorMessage
                  name="location"
                  component="div"
                  className="error text-xs text-red-600"
                />
              </div>
              <div>
                <label>Expected Salary:</label>
                <Field
                  name="salary"
                  type="number"
                  className="w-full p-1 border rounded bg-gray-800"
                />
                <ErrorMessage
                  name="salary"
                  component="div"
                  className="error text-xs text-red-600"
                />
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <h2>Step 4: Review & Submit</h2>
              <pre>{JSON.stringify(values, null, 2)}</pre>
              <label className="flex gap-1">
                <Field
                  type="checkbox"
                  name="agree"
                  className="w-fit p-1 border rounded bg-gray-800 "
                />
                I agree to terms and conditions
                <ErrorMessage
                  name="agree"
                  component="div"
                  className="error text-xs text-red-600"
                />
              </label>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="mt-2 flex justify-between">
            {step > 1 && (
              <button
                type="button"
                onClick={handlePrev}
                className="bg-gray-600 p-1.5 rounded-md text-black"
              >
                Back
              </button>
            )}
            {step < 4 ? (
              <button
                type="button"
                className="bg-gray-400 p-1.5 rounded-md text-black"
                onClick={() => handleNext(validateForm, errors, setTouched)}
              >
                Next
              </button>
            ) : (
              <button type="submit" className="p-1.5 bg-green-700 rounded-md">
                Submit
              </button>
            )}
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default JobApplicationForm;
