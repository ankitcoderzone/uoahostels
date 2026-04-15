"use client";

import {
  UseFormRegister,
  FieldErrors,
  FieldPath,
} from "react-hook-form";
import { z } from "zod";
import { hostelregistrationSchema } from "@/lib/validation/hostelregistrationSchema";

/* ✅ TYPE */
type FormData = z.infer<typeof hostelregistrationSchema>;

type Props = {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
};

export default function StepAcademicQualification({
  register,
  errors,
}: Props) {

  const inputStyle =
    "peer w-full border border-gray-400 rounded-md px-3 pt-5 pb-2 text-black bg-white focus:border-[#c20c27] focus:outline-none";

  const labelStyle =
    "absolute left-3 top-2 text-xs text-gray-700 bg-white px-1 transition-all " +
    "peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 " +
    "peer-focus:top-2 peer-focus:text-xs peer-focus:text-[#c20c27]";

  return (
    <div className="space-y-10">

      {/* 🔵 10TH SECTION */}
      <div>
        <h2 className="text-lg font-semibold text-center mb-6">
          Matriculation Exam Details
        </h2>

        <div className="grid md:grid-cols-4 gap-4">

          <div className="relative">
            <input
              value="10th - High School"
              readOnly
              className={inputStyle}
            />
            <label className={labelStyle}>Exam Passed</label>
          </div>

          <div className="relative">
            <input
              {...register("tenthBoard")}
              placeholder=" "
              className={inputStyle}
            />
            <label className={labelStyle}>Board *</label>
          </div>

          <div className="relative">
            <input
              {...register("tenthSchool")}
              placeholder=" "
              className={inputStyle}
            />
            <label className={labelStyle}>School Name *</label>
          </div>

          <div className="relative">
            <input
              {...register("tenthRoll")}
              placeholder=" "
              className={inputStyle}
            />
            <label className={labelStyle}>Roll No *</label>
          </div>

        </div>

        {/* MARKS ROW */}
        <div className="grid md:grid-cols-5 gap-4 mt-4">

          <div className="relative">
            <input
              {...register("tenthYear")}
              placeholder=" "
              className={inputStyle}
            />
            <label className={labelStyle}>Passing Year *</label>
            {errors.tenthYear && (
              <p className="text-red-500 text-xs mt-1">
                {errors.tenthYear.message as string}
              </p>
            )}
          </div>

          <div className="relative">
            <input
              {...register("tenthMax")}
              placeholder=" "
              className={inputStyle}
            />
            <label className={labelStyle}>Max Marks</label>
          </div>

          <div className="relative">
            <input
              {...register("tenthObtained")}
              placeholder=" "
              className={inputStyle}
            />
            <label className={labelStyle}>Obtained Marks</label>
          </div>

          <div className="relative">
            <input
              {...register("tenthPercent")}
              placeholder=" "
              className={inputStyle}
            />
            <label className={labelStyle}>Percentage</label>
          </div>

          <div className="relative">
            <select
              {...register("tenthDivision")}
              className={inputStyle}
            >
              <option value=""></option>
              <option>First</option>
              <option>Second</option>
              <option>Third</option>
            </select>
            <label className={labelStyle}>Division</label>
          </div>

        </div>
      </div>

      {/* 🔵 12TH SECTION */}
      <div>
        <h2 className="text-lg font-semibold text-center mb-6">
          Intermediate / Equivalent Exam Details
        </h2>

        <div className="grid md:grid-cols-4 gap-4">

          <div className="relative">
            <input
              value="12th - Intermediate"
              readOnly
              className={inputStyle}
            />
            <label className={labelStyle}>Exam Passed</label>
          </div>

          <div className="relative">
            <input
              {...register("twelfthBoard")}
              placeholder=" "
              className={inputStyle}
            />
            <label className={labelStyle}>Board *</label>
          </div>

          <div className="relative">
            <input
              {...register("twelfthSchool")}
              placeholder=" "
              className={inputStyle}
            />
            <label className={labelStyle}>School/College *</label>
          </div>

          <div className="relative">
            <input
              {...register("twelfthRoll")}
              placeholder=" "
              className={inputStyle}
            />
            <label className={labelStyle}>Roll No *</label>
          </div>

        </div>

        {/* MARKS */}
        <div className="grid md:grid-cols-5 gap-4 mt-4">

          <div className="relative">
            <input
              {...register("twelfthYear")}
              placeholder=" "
              className={inputStyle}
            />
            <label className={labelStyle}>Passing Year *</label>
            {errors.twelfthYear && (
              <p className="text-red-500 text-xs mt-1">
                {errors.twelfthYear.message as string}
              </p>
            )}
          </div>

          <div className="relative">
            <input
              {...register("twelfthMax")}
              placeholder=" "
              className={inputStyle}
            />
            <label className={labelStyle}>Max Marks</label>
          </div>

          <div className="relative">
            <input
              {...register("twelfthObtained")}
              placeholder=" "
              className={inputStyle}
            />
            <label className={labelStyle}>Obtained Marks</label>
          </div>

          <div className="relative">
            <input
              {...register("twelfthPercent")}
              placeholder=" "
              className={inputStyle}
            />
            <label className={labelStyle}>Percentage</label>
          </div>

          <div className="relative">
            <select
              {...register("twelfthDivision")}
              className={inputStyle}
            >
              <option value=""></option>
              <option>First</option>
              <option>Second</option>
              <option>Third</option>
            </select>
            <label className={labelStyle}>Division</label>
          </div>

        </div>
      </div>

    </div>
  );
}