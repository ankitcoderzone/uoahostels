"use client";

import { UseFormWatch } from "react-hook-form";
import { z } from "zod";
import { hostelregistrationSchema } from "@/lib/validation/hostelregistrationSchema";

/* ✅ TYPE */
type FormData = z.infer<typeof hostelregistrationSchema>;

type Props = {
  watch: UseFormWatch<FormData>;
};

export default function StepFormPreview({ watch }: Props) {
  const form = watch() as FormData;

  const preview = (file: File) => URL.createObjectURL(file);

  const fieldBox =
    "border border-gray-400 rounded-md px-3 py-2 bg-white text-black";

  const sectionTitle =
    "bg-blue-700 text-white text-center py-2 rounded-md font-semibold";

  return (
    <div className="space-y-8 text-black">

      {/* 🔵 HOSTEL INFO */}
      <div className="bg-blue-100 p-4 rounded-md space-y-6">
        <h2 className={sectionTitle}>Hostel Registration</h2>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label>Hostel Category</label>
            <div className={fieldBox}>{form.hostelCategory}</div>
          </div>

          <div>
            <label>Selected Hostel</label>
            <div className={fieldBox}>{form.hostel}</div>
          </div>
        </div>
      </div>

      {/* 🔵 PERSONAL INFO */}
      <div className="bg-blue-100 p-4 rounded-md space-y-6">
        <h2 className={sectionTitle}>Personal Information</h2>

        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label>Student Name</label>
            <div className={fieldBox}>{form.name}</div>
          </div>

          <div>
            <label>Father Name</label>
            <div className={fieldBox}>{form.father}</div>
          </div>

          <div>
            <label>Mother Name</label>
            <div className={fieldBox}>{form.mother}</div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label>Roll No</label>
            <div className={fieldBox}>{form.roll}</div>
          </div>

          <div>
            <label>Aadhaar</label>
            <div className={fieldBox}>{form.aadhaar}</div>
          </div>

          <div>
            <label>Date of Birth</label>
            <div className={fieldBox}>{form.dob}</div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label>Gender</label>
            <div className={fieldBox}>{form.gender}</div>
          </div>

          <div>
            <label>Nationality</label>
            <div className={fieldBox}>{form.nationality}</div>
          </div>

          <div>
            <label>Religion</label>
            <div className={fieldBox}>{form.religion}</div>
          </div>
        </div>
      </div>

      {/* 🔵 ADDRESS */}
      <div className="bg-blue-100 p-4 rounded-md space-y-6">
        <h2 className={sectionTitle}>Address</h2>

        <div className="grid md:grid-cols-2 gap-6">

          {/* Correspondence */}
          <div>
            <h3 className="font-semibold mb-2">Correspondence</h3>

            {Object.entries(form.correspondence || {}).map(([key, value]) => (
              <div key={key} className="mb-2">
                <label className="capitalize">
                  {key.replace(/([A-Z])/g, " $1")}
                </label>
                <div className={fieldBox}>{String(value)}</div>
              </div>
            ))}
          </div>

          {/* Permanent */}
          <div>
            <h3 className="font-semibold mb-2">Permanent</h3>

            {Object.entries(form.permanent || {}).map(([key, value]) => (
              <div key={key} className="mb-2">
                <label className="capitalize">
                  {key.replace(/([A-Z])/g, " $1")}
                </label>
                <div className={fieldBox}>{String(value)}</div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* 🔵 ACADEMIC */}
      <div className="bg-blue-100 p-4 rounded-md space-y-6">
        <h2 className={sectionTitle}>Academic Qualification</h2>

        {/* 10TH */}
        <div>
          <h3 className="font-semibold mb-3">10th Details</h3>

          <div className="grid md:grid-cols-4 gap-4">
            <div><label>Board</label><div className={fieldBox}>{form.tenthBoard}</div></div>
            <div><label>School</label><div className={fieldBox}>{form.tenthSchool}</div></div>
            <div><label>Roll</label><div className={fieldBox}>{form.tenthRoll}</div></div>
            <div><label>Year</label><div className={fieldBox}>{form.tenthYear}</div></div>
          </div>
        </div>

        {/* 12TH */}
        <div>
          <h3 className="font-semibold mb-3">12th Details</h3>

          <div className="grid md:grid-cols-4 gap-4">
            <div><label>Board</label><div className={fieldBox}>{form.twelfthBoard}</div></div>
            <div><label>School</label><div className={fieldBox}>{form.twelfthSchool}</div></div>
            <div><label>Roll</label><div className={fieldBox}>{form.twelfthRoll}</div></div>
            <div><label>Year</label><div className={fieldBox}>{form.twelfthYear}</div></div>
          </div>
        </div>
      </div>

      {/* 🔵 DOCUMENTS */}
      <div className="bg-blue-100 p-4 rounded-md space-y-6">
        <h2 className={sectionTitle}>Documents</h2>

        <div className="grid md:grid-cols-3 gap-4">
          {Object.entries(form.documents || {}).map(([key, file]) => {
            if (!file) return null;

            return (
              <div key={key} className="border p-2 rounded bg-white">
                <p className="text-xs mb-2 capitalize">{key}</p>

                {file.type?.startsWith("image") ? (
                  <img
                    src={preview(file)}
                    className="h-24 object-cover"
                  />
                ) : (
                  <p className="text-xs">{file.name}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}