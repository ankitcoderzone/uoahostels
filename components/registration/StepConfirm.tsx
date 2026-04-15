"use client";

type Props = {
  agree: boolean;
  setAgree: (val: boolean) => void;
};

export default function StepConfirm({ agree, setAgree }: Props) {
  return (
    <div className="max-w-2xl mx-auto text-black space-y-4">

      <h3 className="text-lg font-semibold text-center">
        Declaration & Confirmation
      </h3>

      <p className="text-sm">
        Before submitting the application form, candidates must ensure all details are correct.
        No modification/refund after submission. False information will cancel application.
      </p>

      <div className="flex items-start gap-2">
        <input
          type="checkbox"
          checked={agree}
          onChange={(e) => setAgree(e.target.checked)}
        />
        <span className="text-sm">
          Yes, I agree to the declaration
        </span>
      </div>

    </div>
  );
}