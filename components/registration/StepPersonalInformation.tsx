"use client";

import { useState, useEffect } from "react";
import {
  UseFormRegister,
  FieldErrors,
  UseFormSetValue,
  UseFormWatch
} from "react-hook-form";

import { z } from "zod";
import { hostelregistrationSchema }
  from "@/lib/validation/hostelregistrationSchema";

type FormData = z.infer<
  typeof hostelregistrationSchema
>;

type Hostel = {
  id: number;
  name: string;
  category: "boys" | "girls";
};

type Props = {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
  setValue: UseFormSetValue<FormData>;
  watch: UseFormWatch<FormData>;
};

export default function StepPersonalInformation({
  register,
  errors,
  setValue,
  watch
}: Props) {

  const [hostels, setHostels] =
    useState<Hostel[]>([]);

  const [loadingHostels, setLoadingHostels] =
    useState(true);

  const selectedCategory =
    watch("hostelCategory");

  useEffect(() => {

    const fetchHostels = async () => {
      try {

        const res = await fetch(
          "https://hms-wyso.onrender.com/hms/hostels/"
        );

        const data = await res.json();

        setHostels(data);

      } catch (err) {
        console.error(err);
      } finally {
        setLoadingHostels(false);
      }
    };

    fetchHostels();

  }, []);

  const filteredHostels =
    hostels.filter(
      h => h.category === selectedCategory
    );

  const inputStyle =
    "peer w-full border border-gray-400 rounded-md px-3 pt-5 pb-2 text-black bg-white";

  const labelStyle =
    "absolute left-3 top-2 text-xs text-gray-700 bg-white px-1";

  return (
    <div className="space-y-6">

      {/* HOSTEL */}
      <div className="grid md:grid-cols-2 gap-4">

        <div className="relative">
          <select
            {...register("hostelCategory")}
            onChange={(e) => {

              setValue(
                "hostelCategory",
                e.target.value as "boys" | "girls"
              );

              // reset hostel
              setValue(
                "hostel",
                ""
              );

            }}
            className={inputStyle}
          >
            <option value=""></option>

            <option value="boys">
              Boys Hostel
            </option>

            <option value="girls">
              Girls Hostel
            </option>

          </select>

          <label className={labelStyle}>
            Registration For *
          </label>

        </div>


        {selectedCategory && (
          <div className="relative">

            <select
              {...register("hostel")}
              className={inputStyle}
            >
              <option value="">
                {
                  loadingHostels
                    ? "Loading..."
                    : "Select Hostel"
                }
              </option>

              {
                filteredHostels.map(
                  hostel => (
                    <option
                      key={hostel.id}
                      value={hostel.id}
                    >
                      {hostel.name}
                    </option>
                  ))
              }

            </select>

            <label className={labelStyle}>
              Select Hostel *
            </label>

          </div>
        )}

      </div>


      {/* NAMES */}
      <div className="grid md:grid-cols-3 gap-4">

        {[
          ["name", "Student Name *"],
          ["father", "Father Name *"],
          ["mother", "Mother Name *"]
        ].map(([field, label]) => (
          <div
            key={field}
            className="relative"
          >

            <input
              {...register(
                field as keyof FormData
              )}
              placeholder=" "
              className={inputStyle}
            />

            <label className={labelStyle}>
              {label}
            </label>

          </div>
        ))}

      </div>


      {/* DETAILS */}
      <div className="grid md:grid-cols-3 gap-4">

        <div className="relative">
          <input
            {...register("roll")}
            placeholder=" "
            className={inputStyle}
          />
          <label className={labelStyle}>
            Roll Number *
          </label>
        </div>


        <div className="relative">
          <input
            {...register("aadhaar")}
            placeholder=" "
            className={inputStyle}
          />
          <label className={labelStyle}>
            Aadhaar *
          </label>
        </div>


        <div className="relative">
          <input
            type="date"
            {...register("dob")}
            className={inputStyle}
          />

          <label className={labelStyle}>
            Date of Birth *
          </label>
        </div>

      </div>


      {/* OTHER DETAILS */}
      <div className="grid md:grid-cols-3 gap-4">

        <div className="relative">
          <select
            {...register("gender")}
            className={inputStyle}
          >
            <option value=""></option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>

          <label className={labelStyle}>
            Gender *
          </label>
        </div>


        <div className="relative">
          <input
            {...register("nationality")}
            placeholder=" "
            className={inputStyle}
          />

          <label className={labelStyle}>
            Nationality *
          </label>
        </div>


        <div className="relative">
          <input
            {...register("state")}
            placeholder=" "
            className={inputStyle}
          />

          <label className={labelStyle}>
            State *
          </label>
        </div>


        {/* ADDED BACK */}
        <div className="relative">
          <input
            {...register("religion")}
            placeholder=" "
            className={inputStyle}
          />

          <label className={labelStyle}>
            Religion *
          </label>
        </div>


        <div className="relative">
          <input
            {...register("fatherOccupation")}
            placeholder=" "
            className={inputStyle}
          />

          <label className={labelStyle}>
            Father Occupation *
          </label>
        </div>


        <div className="relative">
          <select
            {...register("income")}
            className={inputStyle}
          >
            <option value=""></option>
            <option>Below 1 Lakh</option>
            <option>1-3 Lakh</option>
            <option>3-5 Lakh</option>
            <option>5+ Lakh</option>

          </select>

          <label className={labelStyle}>
            Income *
          </label>

        </div>

      </div>


      {/* MOBILE ADDED BACK */}
      <div className="grid md:grid-cols-2 gap-4">

        <div className="relative">
          <input
            {...register("mobile")}
            placeholder=" "
            className={inputStyle}
          />

          <label className={labelStyle}>
            Mobile Number *
          </label>
        </div>

      </div>


      {/* SPORTS */}
      <div>

        <span className="font-medium">
          Sports Quota *
        </span>

        <div className="flex gap-4 mt-2">

          <label>
            <input
              type="radio"
              value="yes"
              {...register("sportsQuota")}
            />
            Yes
          </label>

          <label>
            <input
              type="radio"
              value="no"
              {...register("sportsQuota")}
            />
            No
          </label>

        </div>

      </div>

    </div>
  );

}