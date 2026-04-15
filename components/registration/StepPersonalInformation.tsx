"use client";

import { useState } from "react";
import {
  UseFormRegister,
  FieldErrors,
  UseFormSetValue,
} from "react-hook-form";
import { z } from "zod";
import { hostelregistrationSchema } from "@/lib/validation/hostelregistrationSchema";

/* ✅ TYPE FROM ZOD */
type FormData = z.infer<typeof hostelregistrationSchema>;

/* ✅ TYPE-SAFE HOSTELS */
const HOSTELS = {
  boys: ["GN Jha Hostel", "Holland Hall", "PC Banerjee"],
  girls: ["Ishwar Saran Girls Hostel", "Mahadevi Hostel"],
} as const;

type HostelCategory = keyof typeof HOSTELS;

/* ✅ PROPS */
type Props = {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
  setValue: UseFormSetValue<FormData>;
};

export default function StepPersonal({
  register,
  errors,
  setValue,
}: Props) {
  const [category, setCategory] = useState<HostelCategory | "">("");

  const inputStyle =
    "peer w-full border border-gray-400 rounded-md px-3 pt-5 pb-2 text-black bg-white focus:border-[#c20c27] focus:outline-none";

  const labelStyle =
    "absolute left-3 top-2 text-xs text-gray-700 bg-white px-1 transition-all " +
    "peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 " +
    "peer-focus:top-2 peer-focus:text-xs peer-focus:text-[#c20c27]";

  return (
    <div className="space-y-6">

      {/* 🏨 HOSTEL */}
      <div className="grid md:grid-cols-2 gap-4">

        <div className="relative">
          <select
            className={inputStyle}
            onChange={(e) => {
              const value = e.target.value as HostelCategory;
              setCategory(value);
              setValue("hostelCategory", value);
            }}
          >
            <option value=""></option>
            <option value="boys">Boys Hostel</option>
            <option value="girls">Girls Hostel</option>
          </select>
          <label className={labelStyle}>Registration For *</label>
        </div>

        {category && (
          <div className="relative">
            <select {...register("hostel")} className={inputStyle}>
              <option value=""></option>
              {HOSTELS[category].map((h) => (
                <option key={h}>{h}</option>
              ))}
            </select>
            <label className={labelStyle}>Select Hostel *</label>

            {errors.hostel && (
              <p className="text-red-500 text-xs mt-1">
                {errors.hostel.message}
              </p>
            )}
          </div>
        )}
      </div>

      {/* 👤 NAMES */}
      <div className="grid md:grid-cols-3 gap-4">
        {[
          ["name", "Student Name *"],
          ["father", "Father Name *"],
          ["mother", "Mother Name *"],
        ].map(([field, label]) => (
          <div key={field} className="relative">
            <input
              {...register(field as keyof FormData)}
              placeholder=" "
              className={inputStyle}
            />
            <label className={labelStyle}>{label}</label>

            {errors[field as keyof FormData] && (
              <p className="text-red-500 text-xs mt-1">
                {errors[field as keyof FormData]?.message as string}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* 📄 DETAILS */}
      <div className="grid md:grid-cols-3 gap-4">

        <div className="relative">
          <input {...register("roll")} placeholder=" " className={inputStyle} />
          <label className={labelStyle}>Roll Number *</label>
          {errors.roll && (
            <p className="text-red-500 text-xs mt-1">{errors.roll.message}</p>
          )}
        </div>

        <div className="relative">
          <input {...register("aadhaar")} placeholder=" " className={inputStyle} />
          <label className={labelStyle}>Aadhaar Number *</label>
          {errors.aadhaar && (
            <p className="text-red-500 text-xs mt-1">{errors.aadhaar.message}</p>
          )}
        </div>

        <div className="relative">
          <input type="date" {...register("dob")} className={inputStyle} />
          <label className={labelStyle}>Date of Birth *</label>
          {errors.dob && (
            <p className="text-red-500 text-xs mt-1">{errors.dob.message}</p>
          )}
        </div>

      </div>

      {/* 🌍 OTHER DETAILS */}
      <div className="grid md:grid-cols-3 gap-4">

        <div className="relative">
          <select {...register("gender")} className={inputStyle}>
            <option value=""></option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
          <label className={labelStyle}>Gender *</label>
        </div>

        <div className="relative">
          <input {...register("nationality")} placeholder=" " className={inputStyle} />
          <label className={labelStyle}>Nationality *</label>
        </div>

        <div className="relative">
          <input {...register("state")} placeholder=" " className={inputStyle} />
          <label className={labelStyle}>State *</label>
        </div>

        <div className="relative">
          <input {...register("religion")} placeholder=" " className={inputStyle} />
          <label className={labelStyle}>Religion *</label>
        </div>

        <div className="relative">
          <input {...register("fatherOccupation")} placeholder=" " className={inputStyle} />
          <label className={labelStyle}>Father Occupation *</label>
        </div>

        <div className="relative">
          <select {...register("income")} className={inputStyle}>
            <option value=""></option>
            <option>Below 1 Lakh</option>
            <option>1–3 Lakh</option>
            <option>3–5 Lakh</option>
            <option>5–10 Lakh</option>
          </select>
          <label className={labelStyle}>Family Income *</label>
        </div>

      </div>

      {/* 🏆 SPORTS QUOTA */}
      <div>
        <span className="font-medium">Sports Quota *</span>

        <div className="flex gap-4 mt-2">
          <label>
            <input type="radio" value="yes" {...register("sportsQuota")} /> Yes
          </label>
          <label>
            <input type="radio" value="no" {...register("sportsQuota")} /> No
          </label>
        </div>

        {errors.sportsQuota && (
          <p className="text-red-500 text-xs mt-1">
            {errors.sportsQuota.message}
          </p>
        )}
      </div>

    </div>
  );
}