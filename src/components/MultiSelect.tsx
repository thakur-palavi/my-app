"use client";
import { useState, useEffect } from "react";
import Select, { StylesConfig } from "react-select";

type OptionType = {
  value: string;
  label: string;
};

const customStyles: StylesConfig<OptionType, true> = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: "#2A2A30",
    borderColor: state.isFocused ? "#6366F1" : "#404046",
    color: "#E5E7EB",
    borderRadius: "0.375rem",
    boxShadow: state.isFocused ? "0 0 0 2px rgba(99, 102, 241, 0.5)" : "none",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? "#6366F1"
      : state.isFocused
      ? "#374151"
      : "#1F2937",
    color: "#F9FAFB",
  }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: "#374151",
    borderRadius: "4px",
    padding: "2px 6px",
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: "#F9FAFB",
  }),
  multiValueRemove: (provided) => ({
    ...provided,
    color: "#F9FAFB",
    ":hover": {
      backgroundColor: "#EF4444",
      color: "white",
    },
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: "#1F2937",
    borderRadius: "0.375rem",
  }),
};

interface MultiSelectProps {
  formik: any;
  options: OptionType[];
}

function MultiSelect({ formik, options }: MultiSelectProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;
  return (
    <Select
      id="technology"
      name="multiSelect"
      isMulti
      options={options}
      className="w-full"
      styles={customStyles}
      value={options.filter((option) =>
        formik.values.multiSelect.includes(option.value)
      )}
      onChange={(selectedOptions) =>
        formik.setFieldValue(
          "multiSelect",
          selectedOptions ? selectedOptions.map((option) => option.value) : []
        )
      }
      onBlur={formik.handleBlur}
    />
  );
}

export default MultiSelect;
