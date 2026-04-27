"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

import {
  useForm,
  FieldPath,
  SubmitHandler
} from "react-hook-form";

import type {
  UseFormHandleSubmit
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { hostelregistrationSchema } from "@/lib/validation/hostelregistrationSchema";

// COMPONENTS
import StepPersonalInformation from "@/components/registration/StepPersonalInformation";
import StepAddressContact from "@/components/registration/StepAddress&Contact";
import StepAcademicQualification from "@/components/registration/StepAcademicQualification";
import StepUploadDocuments from "@/components/registration/StepUploadDocuments";
import StepFormPreview from "@/components/registration/StepFormPreview";
import StepConfirm from "@/components/registration/StepConfirm";

/* ✅ TYPE FROM ZOD */
type FormData = z.infer<
  typeof hostelregistrationSchema
>;



const steps = [
  "Personal Information",
  "Address & Contact",
  "Academic Qualification",
  "Upload Documents",
  "Form Preview",
  "Confirm",
];

export default function RegistrationPage() {
  const [step, setStep] = useState<number>(0);

  const [agree, setAgree] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    trigger,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(
      hostelregistrationSchema
    ),
    defaultValues: {
      hostelCategory: "",
      hostel: "",
      name: "",
      father: "",
      mother: "",
      roll: "",
      aadhaar: "",
      dob: "",
      gender: "",
      nationality: "",
      state: "",
      religion: "",
      fatherOccupation: "",
      income: "",
      sportsQuota: "",
      mobile: "",
      guardianMobile: "",
      email: "",

      correspondence: {
        house: "",
        village: "",
        post: "",
        tehsil: "",
        police: "",
        state: "",
      },

      permanent: {
        house: "",
        village: "",
        post: "",
        tehsil: "",
        police: "",
        state: "",
      },

      tenthBoard: "",
      tenthSchool: "",
      tenthRoll: "",
      tenthYear: "",

      twelfthBoard: "",
      twelfthSchool: "",
      twelfthRoll: "",
      twelfthYear: "",

      documents: {
        photo: undefined,
        signature: undefined,
        aadhaar: undefined,
        tenthMarksheet: undefined,
        twelfthMarksheet: undefined
      }

    }
  });




  /* ✅ STEP VALIDATION (FIXED) */
  const validateStep = async () => {
    let fields: FieldPath<FormData>[] = [];

    if (step === 0) {
      fields = [
        "hostelCategory",
        "hostel",
        "name",
        "father",
        "mother",
        "roll",
        "aadhaar",
        "dob",
        "gender",
        "nationality",
        "state",
        "religion",
        "fatherOccupation",
        "income",
        "mobile", 
        "sportsQuota",
      ];
    }

    if (step === 1) {
      fields = [
                      // ✅ ADD THIS
        "guardianMobile",
        "email",

        "correspondence.house",
        "correspondence.village",
        "correspondence.post",
        "correspondence.tehsil",
        "correspondence.police",
        "correspondence.state",

        "permanent.house",
        "permanent.village",
        "permanent.post",
        "permanent.tehsil",
        "permanent.police",
        "permanent.state",
      ] as FieldPath<FormData>[];
    }

    if (step === 2) {
      fields = [
        "tenthBoard",
        "tenthSchool",
        "tenthRoll",
        "tenthYear",
        "twelfthBoard",
        "twelfthSchool",
        "twelfthRoll",
        "twelfthYear",
      ];
    }

    if (step === 3) {
      fields = [
        "documents.photo",
        "documents.signature",
        "documents.aadhaar",
      ] as FieldPath<FormData>[]; // ✅ safe cast
    }

    return await trigger(fields);
  };

  /* ✅ SUBMIT */
  const onSubmit: SubmitHandler<FormData> =
    async (data) => {

      if (!agree) return;

      try {

        const formData = new FormData();

        formData.append(
          "hostel",
          String(data.hostel)
        );

        formData.append("name", data.name);
        formData.append("father", data.father);
        formData.append("mother", data.mother);
        formData.append("roll", data.roll);
        formData.append("aadhaar", data.aadhaar);
        formData.append("dob", data.dob);

        formData.append("gender", data.gender);
        formData.append("nationality", data.nationality);
        formData.append("state", data.state);
        formData.append("religion", data.religion);

        formData.append(
          "fatherOccupation",
          data.fatherOccupation
        );

        formData.append(
          "income",
          data.income
        );

        formData.append(
          "sportsQuota",
          data.sportsQuota
        );

        formData.append(
          "mobile",
          data.mobile
        );

        formData.append(
          "guardianMobile",
          data.guardianMobile
        );

        formData.append(
          "email",
          data.email
        );

        formData.append(
          "correspondence_house",
          data.correspondence.house
        );

        formData.append(
          "correspondence_village",
          data.correspondence.village
        );

        formData.append(
          "correspondence_post",
          data.correspondence.post
        );

        formData.append(
          "correspondence_tehsil",
          data.correspondence.tehsil
        );

        formData.append(
          "correspondence_police",
          data.correspondence.police
        );

        formData.append(
          "correspondence_state",
          data.correspondence.state
        );

        formData.append(
          "permanent_house",
          data.permanent.house
        );

        formData.append(
          "permanent_village",
          data.permanent.village
        );

        formData.append(
          "permanent_post",
          data.permanent.post
        );

        formData.append(
          "permanent_tehsil",
          data.permanent.tehsil
        );

        formData.append(
          "permanent_police",
          data.permanent.police
        );

        formData.append(
          "permanent_state",
          data.permanent.state
        );

        formData.append(
          "tenthBoard",
          data.tenthBoard
        );

        formData.append(
          "tenthSchool",
          data.tenthSchool
        );

        formData.append(
          "tenthRoll",
          data.tenthRoll
        );

        formData.append(
          "tenthYear",
          data.tenthYear
        );

        formData.append(
          "twelfthBoard",
          data.twelfthBoard
        );

        formData.append(
          "twelfthSchool",
          data.twelfthSchool
        );

        formData.append(
          "twelfthRoll",
          data.twelfthRoll
        );

        formData.append(
          "twelfthYear",
          data.twelfthYear
        );

        formData.append(
          "photo",
          data.documents.photo
        );

        formData.append(
          "signature",
          data.documents.signature
        );

        formData.append(
          "aadhaar_file",
          data.documents.aadhaar
        );

        if (data.documents.tenthMarksheet) {
          formData.append(
            "tenthMarksheet",
            data.documents.tenthMarksheet
          );
        }

        if (data.documents.twelfthMarksheet) {
          formData.append(
            "twelfthMarksheet",
            data.documents.twelfthMarksheet
          );
        }

        const res = await fetch(
          "https://hms-wyso.onrender.com/hms/applications/apply/",
          {
            method: "POST",
            body: formData
          }
        );

        const result = await res.json();

        if (!res.ok) {
          console.error(result);
          alert("Submission failed");
          return;
        }

        setShowSuccess(true);

      } catch (err) {
        console.error(err);
        alert("Server error");
      }

    };

  /* ✅ STEP COMPONENTS */
  const stepComponents: React.ReactNode[] = [
    <StepPersonalInformation key="step-0" register={register} errors={errors} setValue={setValue} watch={watch} />,
    <StepAddressContact key="step-1" register={register} errors={errors} setValue={setValue} watch={watch} />,
    <StepAcademicQualification key="step-2" register={register} errors={errors} />,
    <StepUploadDocuments key="step-3" setValue={setValue} watch={watch} />,
    <StepFormPreview key="step-4" watch={watch} />,
    <StepConfirm key="step-5" agree={agree} setAgree={setAgree} />,
  ];

  return (
    <div className="min-h-screen bg-gray-100 text-black">

      {/* HEADER */}
      <div className="bg-[#c20c27] text-white py-3 flex justify-center gap-3">
        <Image src="/images.jpeg" alt="Logo" width={40} height={40} />
        <div>
          <p className="font-semibold">University of Allahabad</p>
          <p className="text-sm">Hostel Management System</p>
        </div>
      </div>

      {/* STEPPER */}
      <div className="bg-[#d6c484] flex justify-between p-2">
        {steps.map((s, i) => (
          <div key={i} className="flex flex-col items-center flex-1">
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center ${i === step ? "bg-[#c20c27] text-white" : "bg-gray-400"
                }`}
            >
              {i + 1}
            </div>
            <span className="text-xs text-center">{s}</span>
          </div>
        ))}
      </div>

      {/* FORM */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-5xl mx-auto p-4 bg-[#97c5cc] mt-4 rounded space-y-5"
      >
        {stepComponents[step]}

        <div className="flex justify-between pt-4">
          {step > 0 && (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Back
            </button>
          )}

          {step < steps.length - 1 ? (
            <button
              type="button"
              onClick={async () => {

                const valid =
                  await validateStep();

                if (!valid) {
                  alert(
                    "Please fill all required fields"
                  );
                  return;
                }

                setStep(step + 1);

              }}
              className="ml-auto bg-[#c20c27] text-white px-5 py-2 rounded"
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              disabled={!agree}
              className={`ml-auto px-5 py-2 rounded text-white ${agree
                ? "bg-green-600 hover:bg-green-700"
                : "bg-gray-400 cursor-not-allowed"
                }`}
            >
              Submit
            </button>
          )}
        </div>
      </form>

      {/* SUCCESS POPUP */}
      {showSuccess && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white p-6 rounded-md text-center space-y-4 max-w-md">
            <h2 className="text-xl font-semibold text-green-600">
              Form Submitted Successfully
            </h2>
            <p className="text-sm">
              You will receive your login credentials within 48 hours.
            </p>
            <button
              onClick={() => setShowSuccess(false)}
              className="bg-[#c20c27] text-white px-4 py-2 rounded"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}