import { z } from "zod";

export const hostelregistrationSchema = z.object({

  /* =========================
     HOSTEL
  ========================= */

  hostelCategory: z.string().min(
 1,
 "Select hostel category"
),

  // dynamic dropdown returns hostel id
  hostel: z.string().min(
 1,
 "Select hostel"
),


  /* =========================
     PERSONAL INFO
  ========================= */

  name: z.string()
    .min(1,"Name is required"),

  father: z.string()
    .min(1,"Father name required"),

  mother: z.string()
    .min(1,"Mother name required"),

  roll: z.string()
    .min(1,"Roll number required"),

  aadhaar: z.string()
    .regex(
      /^\d{12}$/,
      "Aadhaar must be 12 digits"
    ),

  dob: z.string()
    .min(1,"Date of birth required"),

  gender: z.string()
    .min(1,"Select gender"),

  nationality: z.string()
    .min(1,"Nationality required"),

  state: z.string()
    .min(1,"State required"),

  religion: z.string()
    .min(1,"Religion required"),

  fatherOccupation: z.string()
    .min(1,"Required"),

  income: z.string()
    .min(1,"Select income range"),

  sportsQuota: z.string()
    .min(1,"Select option"),

  mobile: z.string()
    .regex(
      /^\d{10}$/,
      "Mobile must be 10 digits"
    ),


  /* =========================
      CONTACT
  ========================= */

  guardianMobile: z.string()
    .regex(
      /^\d{10}$/,
      "Guardian mobile must be 10 digits"
    ),

  email: z.string()
    .email("Enter valid email"),


  /* =========================
      ADDRESS
  ========================= */

  correspondence: z.object({

    house: z.string()
      .min(1,"House No. required"),

    village: z.string()
      .min(1,"Village required"),

    post: z.string()
      .min(1,"Post required"),

    tehsil: z.string()
      .min(1,"Tehsil required"),

    police: z.string()
      .min(1,"Police station required"),

    state: z.string()
      .min(1,"State required"),
  }),

  permanent: z.object({

    house: z.string()
      .min(1,"House No. required"),

    village: z.string()
      .min(1,"Village required"),

    post: z.string()
      .min(1,"Post required"),

    tehsil: z.string()
      .min(1,"Tehsil required"),

    police: z.string()
      .min(1,"Police station required"),

    state: z.string()
      .min(1,"State required"),
  }),


  /* =========================
      ACADEMIC
  ========================= */

  tenthBoard: z.string()
    .min(1,"Board required"),

  tenthSchool: z.string()
    .min(1,"School required"),

  tenthRoll: z.string()
    .min(1,"Roll required"),

  tenthYear: z.string()
    .min(1,"Year required"),

  tenthMax: z.string().optional(),
  tenthObtained: z.string().optional(),
  tenthPercent: z.string().optional(),
  tenthDivision: z.string().optional(),

  twelfthBoard: z.string()
    .min(1,"Board required"),

  twelfthSchool: z.string()
    .min(1,"School required"),

  twelfthRoll: z.string()
    .min(1,"Roll required"),

  twelfthYear: z.string()
    .min(1,"Year required"),

  twelfthMax: z.string().optional(),
  twelfthObtained: z.string().optional(),
  twelfthPercent: z.string().optional(),
  twelfthDivision: z.string().optional(),


  /* =========================
      DOCUMENTS
  ========================= */

  documents: z.object({

    photo: z.any()
      .refine(
        file => !!file,
        "Photo required"
      )
      .refine(
        file =>
          !file ||
          file.size <= 50 * 1024,
        "Max 50KB allowed"
      )
      .refine(
        file =>
          !file ||
          ["image/jpeg","image/jpg"]
            .includes(file.type),
        "Only JPG/JPEG allowed"
      ),


    signature: z.any()
      .refine(
        file => !!file,
        "Signature required"
      )
      .refine(
        file =>
          !file ||
          file.size <= 50 * 1024,
        "Max 50KB allowed"
      )
      .refine(
        file =>
          !file ||
          ["image/jpeg","image/jpg"]
            .includes(file.type),
        "Only JPG/JPEG allowed"
      ),


    aadhaar: z.any()
      .refine(
        file => !!file,
        "Aadhaar required"
      )
      .refine(
        file =>
          !file ||
          file.size <= 1024 * 1024,
        "Max 1MB allowed"
      )
      .refine(
        file =>
          !file ||
          [
            "image/jpeg",
            "image/png",
            "application/pdf"
          ].includes(file.type),
        "Only JPG PNG PDF allowed"
      ),

    tenthMarksheet: z.any()
      .optional()
      .refine(
        file =>
          !file ||
          file.size <= 1024 * 1024,
        "Max 1MB allowed"
      ),

    twelfthMarksheet: z.any()
      .optional()
      .refine(
        file =>
          !file ||
          file.size <= 1024 * 1024,
        "Max 1MB allowed"
      ),

  })

});