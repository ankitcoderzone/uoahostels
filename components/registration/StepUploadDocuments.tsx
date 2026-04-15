"use client";

import { useState } from "react";
import { UseFormSetValue, UseFormWatch } from "react-hook-form";
import { z } from "zod";
import { hostelregistrationSchema } from "@/lib/validation/hostelregistrationSchema";

/* ✅ TYPE */
type FormData = z.infer<typeof hostelregistrationSchema>;
type DocumentKey = keyof FormData["documents"];

type Props = {
  setValue: UseFormSetValue<FormData>;
  watch: UseFormWatch<FormData>;
};

export default function StepUploadDocuments({
  setValue,
  watch,
}: Props) {
  const form = watch();

  const [errors, setErrors] = useState<Record<string, string>>({});

  const preview = (file: File) => URL.createObjectURL(file);

  const uploadBox =
    "border border-gray-400 rounded-md px-4 py-3 bg-white text-black cursor-pointer hover:border-[#c20c27]";

  /* ✅ VALIDATION RULES */
  const rules: Record<DocumentKey, { size: number; types: string[] }> = {
    photo: { size: 50 * 1024, types: ["image/jpeg", "image/jpg"] },
    signature: { size: 50 * 1024, types: ["image/jpeg", "image/jpg"] },
    aadhaar: {
      size: 1 * 1024 * 1024,
      types: ["image/jpeg", "image/png", "application/pdf"],
    },
    tenthMarksheet: {
      size: 1 * 1024 * 1024,
      types: ["image/jpeg", "image/png", "application/pdf"],
    },
    twelfthMarksheet: {
      size: 1 * 1024 * 1024,
      types: ["image/jpeg", "image/png", "application/pdf"],
    },
  };

  /* ✅ HANDLE FILE */
  const handleFile = (key: DocumentKey, file?: File) => {
    if (!file) return;

    const rule = rules[key];

    // size check
    if (file.size > rule.size) {
      setErrors((prev) => ({
        ...prev,
        [key]: `File must be under ${rule.size / 1024}KB`,
      }));
      return;
    }

    // type check
    if (!rule.types.includes(file.type)) {
      setErrors((prev) => ({
        ...prev,
        [key]: "Invalid file type",
      }));
      return;
    }

    // clear error
    setErrors((prev) => ({ ...prev, [key]: "" }));

    // set value
    setValue(`documents.${key}`, file, {
      shouldValidate: true,
    });
  };

  return (
    <div className="space-y-8">

      <h2 className="text-center text-lg font-semibold">
        Upload Documents
      </h2>

      {/* 📂 UPLOAD GRID */}
      <div className="grid md:grid-cols-3 gap-6">

        {[
          ["photo", "Upload Passport Size Photograph"],
          ["aadhaar", "Upload Aadhaar Card"],
          ["signature", "Upload Signature"],
          ["tenthMarksheet", "Upload (10th) Marksheet"],
          ["twelfthMarksheet", "Upload (12th) Marksheet"],
        ].map(([key, label]) => {
          const typedKey = key as DocumentKey;

          return (
            <div key={key} className="flex flex-col gap-1">

              <label className="flex items-center gap-3">
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) =>
                    handleFile(
                      typedKey,
                      e.target.files?.[0]
                    )
                  }
                />

                <div className={uploadBox}>{label}</div>
              </label>

              {/* ❗ ERROR */}
              {errors[typedKey] && (
                <p className="text-red-500 text-xs">
                  {errors[typedKey]}
                </p>
              )}

              {/* ✅ PREVIEW */}
              {form?.documents?.[typedKey] && (
                <div className="border p-2 rounded bg-white mt-2">
                  {form.documents[typedKey].type?.startsWith("image") ? (
                    <img
                      src={preview(form.documents[typedKey])}
                      className="h-24 object-cover"
                    />
                  ) : (
                    <p className="text-xs">
                      {form.documents[typedKey].name}
                    </p>
                  )}
                </div>
              )}

            </div>
          );
        })}
      </div>

      {/* 📝 NOTES */}
      <div className="bg-white border rounded-md p-4 text-sm space-y-2">
        <h4 className="font-semibold">Important</h4>

        <p>
          1. Photograph & Signature must be JPEG and under 50KB.
        </p>

        <p>
          2. Aadhaar & Marksheet must be JPG, PNG or PDF under 1MB.
        </p>
      </div>

    </div>
  );
}