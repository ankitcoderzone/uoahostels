"use client";

import { useState } from "react";
import {
  UseFormRegister,
  FieldErrors,
  UseFormWatch,
  UseFormSetValue,
  FieldPath,
} from "react-hook-form";
import { z } from "zod";
import { hostelregistrationSchema } from "@/lib/validation/hostelregistrationSchema";

/* ✅ TYPE FROM ZOD */
type FormData = z.infer<typeof hostelregistrationSchema>;

/* ✅ PROPS */
type Props = {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
  watch: UseFormWatch<FormData>;
  setValue: UseFormSetValue<FormData>;
};

export default function StepAddressContact({
  register,
  errors,
  watch,
  setValue,
}: Props) {
  const [sameAddress, setSameAddress] = useState(false);

  const inputStyle =
    "peer w-full border border-gray-400 rounded-md px-3 pt-5 pb-2 text-black bg-white focus:border-[#c20c27] focus:outline-none";

  const labelStyle =
    "absolute left-3 top-2 text-xs text-gray-700 bg-white px-1 transition-all " +
    "peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 " +
    "peer-focus:top-2 peer-focus:text-xs peer-focus:text-[#c20c27]";

  /* ✅ TYPE-SAFE PATHS */
  const correspondenceFields: FieldPath<FormData>[] = [
    "correspondence.house",
    "correspondence.village",
    "correspondence.post",
    "correspondence.tehsil",
    "correspondence.police",
    "correspondence.state",
  ];

  const permanentFields: FieldPath<FormData>[] = [
    "permanent.house",
    "permanent.village",
    "permanent.post",
    "permanent.tehsil",
    "permanent.police",
    "permanent.state",
  ];

  /* ✅ COPY ADDRESS */
  const copyAddress = () => {
    correspondenceFields.forEach((field, index) => {
      const value = watch(field);
      setValue(permanentFields[index], value);
    });
  };

  return (
    <div className="space-y-6">

      {/* 🔵 CONTACT */}
      <div className="grid md:grid-cols-3 gap-4">
        {[
          ["mobile", "Student Mobile *"],
          ["guardianMobile", "Guardian Mobile *"],
          ["email", "Student Email *"],
        ].map(([field, label]) => (
          <div key={field} className="relative">
            <input
              {...register(field as FieldPath<FormData>)}
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

      {/* ✅ CHECKBOX */}
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={sameAddress}
          onChange={(e) => {
            setSameAddress(e.target.checked);
            if (e.target.checked) copyAddress();
          }}
        />
        <span className="text-sm">
          Permanent is same as Correspondence
        </span>
      </div>

      {/* 🏠 ADDRESS */}
      <div className="grid md:grid-cols-2 gap-6">

        {/* LEFT */}
        <div>
          <h3 className="font-semibold mb-3">Correspondence Address</h3>

          {[
            ["house", "House No."],
            ["village", "Village"],
            ["post", "Post"],
            ["tehsil", "Tehsil"],
            ["police", "Police Station"],
            ["state", "State"],
          ].map(([field, label]) => (
            <div key={field} className="relative mb-3">
              <input
                {...register(`correspondence.${field}` as FieldPath<FormData>)}
                placeholder=" "
                className={inputStyle}
              />
              <label className={labelStyle}>{label}</label>

              {errors?.correspondence?.[
                field as keyof FormData["correspondence"]
              ] && (
                <p className="text-red-500 text-xs mt-1">
                  {
                    errors.correspondence?.[
                      field as keyof FormData["correspondence"]
                    ]?.message as string
                  }
                </p>
              )}
            </div>
          ))}
        </div>

        {/* RIGHT */}
        <div>
          <h3 className="font-semibold mb-3">Permanent Address</h3>

          {[
            ["house", "House No."],
            ["village", "Village"],
            ["post", "Post"],
            ["tehsil", "Tehsil"],
            ["police", "Police Station"],
            ["state", "State"],
          ].map(([field, label]) => (
            <div key={field} className="relative mb-3">
              <input
                {...register(`permanent.${field}` as FieldPath<FormData>)}
                placeholder=" "
                className={inputStyle}
                disabled={sameAddress}
              />
              <label className={labelStyle}>{label}</label>

              {errors?.permanent?.[
                field as keyof FormData["permanent"]
              ] && (
                <p className="text-red-500 text-xs mt-1">
                  {
                    errors.permanent?.[
                      field as keyof FormData["permanent"]
                    ]?.message as string
                  }
                </p>
              )}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}