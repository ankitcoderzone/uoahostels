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

  const [
    hostels,
    setHostels
  ] = useState<Hostel[]>([]);

  const [
    loadingHostels,
    setLoadingHostels
  ] = useState(true);

  const selectedCategory =
    watch("hostelCategory");



  useEffect(() => {

    const fetchHostels = async () => {

      try {

        const res = await fetch(
          "https://hms-wyso.onrender.com/hms/hostels/"
        );

        const data =
          await res.json();

        setHostels(data);

      }
      catch (err) {
        console.error(err);
      }
      finally {
        setLoadingHostels(false);
      }

    };

    fetchHostels();

  }, []);



  const filteredHostels =
    hostels.filter(
      h => h.category === selectedCategory
    );



  const inputStyle = (
    hasError?: boolean
  ) =>
    `peer w-full rounded-md px-3 pt-5 pb-2 text-black bg-white
border ${hasError
      ? "border-red-500 ring-2 ring-red-100"
      : "border-gray-400"
    }`;


  const labelStyle =
    "absolute left-3 top-2 text-xs text-gray-700 bg-white px-1";



  return (

    <div className="space-y-8">

      {/* HOSTEL */}
      <div className="
grid
md:grid-cols-2
gap-4
">

        <div>

          <div className="relative">

            <select
              {...register(
                "hostelCategory"
              )}
              onChange={(e) => {

                setValue(
                  "hostelCategory",
                  e.target.value as
                  "boys" | "girls"
                );

                setValue(
                  "hostel",
                  ""
                );

              }}
              className={inputStyle(
                !!errors.hostelCategory
              )}
            >

              <option value="">
              </option>

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

          {errors.hostelCategory && (
            <p className="
mt-1
text-sm
font-medium
text-red-600
">
              {errors.hostelCategory.message}
            </p>
          )}

        </div>



        {selectedCategory && (

          <div>

            <div className="relative">

              <select
                {...register(
                  "hostel"
                )}
                className={inputStyle(
                  !!errors.hostel
                )}
              >

                <option value="">
                  {
                    loadingHostels
                      ?
                      "Loading..."
                      :
                      "Select Hostel"
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
                    )
                  )
                }

              </select>

              <label className={labelStyle}>
                Select Hostel *
              </label>

            </div>

            {errors.hostel && (
              <p className="
mt-1
text-sm
text-red-600
font-medium
">
                {errors.hostel.message}
              </p>
            )}

          </div>

        )}

      </div>




      {/* NAMES */}
      <div className="
grid
md:grid-cols-3
gap-4
">

        {[
          ["name", "Student Name *"],
          ["father", "Father Name *"],
          ["mother", "Mother Name *"]
        ].map(([field, label]) => (

          <div
            key={field}
          >

            <div className="relative">

              <input
                {...register(
                  field as keyof FormData
                )}
                placeholder=" "
                className={inputStyle(
                  !!errors[
                  field as keyof FormData
                  ]
                )}
              />

              <label className={labelStyle}>
                {label}
              </label>

            </div>

            {errors[
              field as keyof FormData
            ] && (
                <p className="
mt-1
text-sm
font-medium
text-red-600
">
                  {
                    String(
                      errors[
                        field as keyof FormData
                      ]?.message || ""
                    )
                  }
                </p>
              )}

          </div>

        ))}

      </div>




      {/* DETAILS */}
      <div className="
grid
md:grid-cols-3
gap-4
">

        <Field
          name="roll"
          label="Roll Number *"
          register={register}
          errors={errors}
        />

        <Field
          name="aadhaar"
          label="Aadhaar *"
          register={register}
          errors={errors}
        />


        <div>

          <div className="relative">

            <input
              type="date"
              {...register("dob")}
              className={inputStyle(
                !!errors.dob
              )}
            />

            <label className={labelStyle}>
              Date of Birth *
            </label>

          </div>

          {errors.dob && (
            <p className="
mt-1
text-sm
text-red-600
font-medium
">
              {errors.dob.message}
            </p>
          )}

        </div>

      </div>




      {/* OTHER */}
      <div className="
grid
md:grid-cols-3
gap-4
">

        <div>

          <div className="relative">
            <select
              {...register(
                "gender"
              )}
              className={inputStyle(
                !!errors.gender
              )}
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

          {errors.gender && (
            <p className="
mt-1
text-red-600
text-sm
">
              {errors.gender.message}
            </p>
          )}

        </div>


        <Field
          name="nationality"
          label="Nationality *"
          register={register}
          errors={errors}
        />

        <Field
          name="state"
          label="State *"
          register={register}
          errors={errors}
        />

        <Field
          name="religion"
          label="Religion *"
          register={register}
          errors={errors}
        />

        <Field
          name="fatherOccupation"
          label="Father Occupation *"
          register={register}
          errors={errors}
        />



        <div>

          <div className="relative">

            <select
              {...register(
                "income"
              )}
              className={inputStyle(
                !!errors.income
              )}
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

          {errors.income && (
            <p className="
mt-1
text-red-600
text-sm
">
              {errors.income.message}
            </p>
          )}

        </div>

      </div>




      {/* MOBILE */}
      <div className="
grid
md:grid-cols-2
gap-4
">

        <Field
          name="mobile"
          label="Mobile Number *"
          register={register}
          errors={errors}
        />

      </div>




      {/* SPORTS */}
      <div>

        <span className="
font-semibold
text-gray-800
">
          Sports Quota *
        </span>

        <div className="
flex
gap-8
mt-3
">

          <label className="
flex
items-center
gap-2
">
            <input
              type="radio"
              value="yes"
              {...register(
                "sportsQuota"
              )}
            />
            Yes
          </label>


          <label className="
flex
items-center
gap-2
">
            <input
              type="radio"
              value="no"
              {...register(
                "sportsQuota"
              )}
            />
            No
          </label>

        </div>

        {errors.sportsQuota && (
          <p className="
mt-2
text-red-600
text-sm
">
            {errors.sportsQuota.message}
          </p>
        )}

      </div>

    </div>

  )

}




function Field({
  name,
  label,
  register,
  errors
}: any) {

  const inputStyle = (
    hasError?: boolean
  ) =>
    `peer w-full rounded-md px-3 pt-5 pb-2 text-black bg-white
border ${hasError
      ? "border-red-500 ring-2 ring-red-100"
      : "border-gray-400"
    }`;


  const labelStyle =
    "absolute left-3 top-2 text-xs text-gray-700 bg-white px-1";

  return (

    <div>

      <div className="relative">

        <input
          {...register(name)}
          placeholder=" "
          className={inputStyle(
            !!errors[name]
          )}
        />

        <label className={labelStyle}>
          {label}
        </label>

      </div>

      {errors[name] && (
        <p className="
mt-1
text-sm
font-medium
text-red-600
">
          {errors[name]?.message}
        </p>
      )}

    </div>

  )

}