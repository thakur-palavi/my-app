"use client";
import { useFormik } from "formik";
import { useState } from "react";
import * as yup from "yup";

export default function CheckoutForm() {
  const [step, setStep] = useState<number>(1);

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      address: "",
      phonenumber: "",
      cardNumber: "",
      cvv: "",
      expiryDate: "",
    },
    validationSchema: yup.object({
      fullName: yup.string().required("Full name is required"),
      email: yup.string().email("Invalid email").required("Email is required"),
      address: yup.string().required("Address is required"),
      phonenumber: yup
        .string()
        .required("Phone number is required")
        .matches(/^\d{10}$/, "Enter a valid phone number"),

      cardNumber: yup
        .string()
        .matches(/^\d{16}$/, "Card number must be 16 digits")
        .required("Card number is required"),
      expiryDate: yup
        .string()
        .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, "Expiry date must be MM/YY")
        .required("Expiry date is required"),
      cvv: yup
        .string()
        .matches(/^\d{3}$/, "CVV must be 3 digits")
        .required("CVV is required"),
    }),
    onSubmit: (values) => {
      console.log("submit", values);
      alert(JSON.stringify(values, null, 2));
    },
  });

  const handleNext = async () => {
    if (step === 1) {
      const errors = await formik.validateForm();
      formik.setTouched({
        fullName: true,
        email: true,
        address: true,
        phonenumber: true,
      });
      setTimeout(() => {
        if (Object.keys(errors).length === 0) {
          setStep(2);
        }
      }, 0);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-gray-900 text-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold mb-4">Checkout</h2>
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        {step === 1 && (
          <>
            <div>
              <label htmlFor="fullname"> Full Name :</label>
              <input
                id="fullname"
                type="text"
                className="w-full p-1 border rounded bg-gray-800"
                {...formik.getFieldProps("fullName")}
              />
              {formik.touched.fullName && formik.errors.fullName && (
                <p className="text-red-600 text-xs">{formik.errors.fullName}</p>
              )}
            </div>
            <div>
              <label htmlFor="email"> Email:</label>
              <input
                id="email"
                type="email"
                className="w-full p-1 border rounded bg-gray-800"
                {...formik.getFieldProps("email")}
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-600 text-xs">{formik.errors.email}</p>
              )}
            </div>
            <div>
              <label htmlFor="address"> Address:</label>
              <input
                id="address"
                type="text"
                className="w-full p-1 border rounded bg-gray-800"
                {...formik.getFieldProps("address")}
              />
              {formik.touched.address && formik.errors.address && (
                <p className="text-red-600 text-xs">{formik.errors.address}</p>
              )}
            </div>
            <div>
              <label htmlFor="phone"> Phone Number:</label>
              <input
                id="phone"
                type="tel"
                maxLength={10}
                className="w-full p-1 border rounded bg-gray-800"
                {...formik.getFieldProps("phonenumber")}
              />
              {formik.touched.phonenumber && formik.errors.phonenumber && (
                <p className="text-red-600 text-xs">
                  {formik.errors.phonenumber}
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={handleNext}
              className="w-full p-1 bg-blue-500 text-white rounded hover:bg-blue-700 transition"
            >
              Next : Payment
            </button>
          </>
        )}
        {step === 2 && (
          <>
            <div>
              <label htmlFor="cardNumber"> Card Number:</label>
              <input
                id="cardNumber"
                type="text"
                className="w-full p-1 border rounded bg-gray-800"
                {...formik.getFieldProps("cardNumber")}
              />
              {formik.touched.cardNumber && formik.errors.cardNumber && (
                <p className="text-red-600 text-xs">
                  {formik.errors.cardNumber}
                </p>
              )}
            </div>

            <div className="flex space-x-2">
              <div>
                <label htmlFor="expiryDate"> Expiry Date (MM/YY):</label>
                <input
                  id="expiryDate"
                  type="text"
                  className="w-full p-1 border rounded bg-gray-800"
                  {...formik.getFieldProps("expiryDate")}
                />
                {formik.touched.expiryDate && formik.errors.expiryDate && (
                  <p className="text-red-600 text-xs">
                    {formik.errors.expiryDate}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="cvv"> CVV:</label>
                <input
                  id="cvv"
                  type="text"
                  maxLength={10}
                  className="w-full p-1 border rounded bg-gray-800"
                  {...formik.getFieldProps("cvv")}
                />
                {formik.touched.cvv && formik.errors.cvv && (
                  <p className="text-red-600 text-xs">{formik.errors.cvv}</p>
                )}
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                className="w-full p-1 bg-gray-600 text-white rounded hover:bg-gray-700 transition"
                type="button"
                onClick={() => setStep(1)}
              >
                Back to Billing
              </button>

              <button
                className="w-full p-1 bg-green-600 text-white rounded hover:bg-green-700 transition"
                type="submit"
              >
                Submit
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}
