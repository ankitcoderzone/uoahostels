"use client";

import React, { useState } from "react";
import Image from "next/image";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { hostelregistrationSchema } from "@/lib/validation/hostelregistrationSchema";

// COMPONENTS
import StepPersonalInformation from "@/components/registration/StepPersonalInformation";
import StepAddressContact from "@/components/registration/StepAddress&Contact";
import StepAcademicQualification from "@/components/registration/StepAcademicQualification";
import StepUploadDocuments from "@/components/registration/StepUploadDocuments";
import StepFormPreview from "@/components/registration/StepFormPreview";
import StepConfirm from "@/components/registration/StepConfirm";

const steps = [
  "Personal Information",
  "Address & Contact",
  "Academic Qualification",
  "Upload Documents",
  "Form Preview",
  "Confirm",
];

export default function RegistrationPage() {
  const [step, setStep] = useState(0);

  // ✅ NEW STATES
  const [agree, setAgree] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(hostelregistrationSchema),
    defaultValues: {
      documents: {},
    },
  });

  /* ✅ STEP VALIDATION */
  const validateStep = async () => {
    let fields: any = [];

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
        "sportsQuota",
      ];
    }

    if (step === 1) {
      fields = [
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
      ];
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
      ];
    }

    const result = await trigger(fields);
    return result;
  };

  /* ✅ SUBMIT */
  const onSubmit = (data: any) => {
    if (!agree) return;

    console.log("FINAL DATA:", data);

    // 🔥 SUCCESS POPUP
    setShowSuccess(true);
  };

  /* ✅ STEP COMPONENTS */
  const stepComponents = [
    <StepPersonalInformation register={register} errors={errors} setValue={setValue} />,
    <StepAddressContact register={register} errors={errors} setValue={setValue} watch={watch} />,
    <StepAcademicQualification register={register} errors={errors} />,
    <StepUploadDocuments setValue={setValue} watch={watch} />,
    <StepFormPreview watch={watch} />,
    <StepConfirm agree={agree} setAgree={setAgree} />,
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
              className={`w-6 h-6 rounded-full flex items-center justify-center ${
                i === step ? "bg-[#c20c27] text-white" : "bg-gray-400"
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

        {/* STEP */}
        {stepComponents[step]}

        {/* NAVIGATION */}
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
                const valid = await validateStep();
                if (valid) setStep(step + 1);
              }}
              className="ml-auto bg-[#c20c27] text-white px-5 py-2 rounded"
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              disabled={!agree}
              className={`ml-auto px-5 py-2 rounded text-white ${
                agree
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              Submit
            </button>
          )}
        </div>

      </form>

      {/* ✅ SUCCESS POPUP */}
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