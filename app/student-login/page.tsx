"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function StudentLoginPage() {

  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");



  const handleLogin = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    setLoading(true);
    setError("");

    try {

      const res = await fetch(
        "https://hms-wyso.onrender.com/hms/accounts/auth/login/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            username,
            password
          })
        }
      );

      const data =
        await res.json();


      if (!res.ok) {

        setError(
          data.detail ||
          data.error ||
          "Invalid credentials"
        );

        return;
      }


      /* JWT TOKENS SAVE */
      localStorage.setItem(
        "access",
        data.tokens.access
      );

      localStorage.setItem(
        "refresh",
        data.tokens.refresh
      );

      localStorage.setItem(
        "studentAuth",
        "true"
      );


      /* optional */
      localStorage.setItem(
        "studentUsername",
        username
      );


      router.push(
        "/student-dashboard"
      );


    } catch (err) {

      console.error(err);

      setError(
        "Server error. Try again."
      );

    }
    finally {

      setLoading(false);

    }

  };



  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">

      {/* LEFT */}
      <section className="w-full md:w-1/2 flex flex-col items-center justify-center px-6 py-12 md:px-12 bg-white text-center">

        <img
          src="/images.jpeg"
          alt="University of Allahabad"
          className="w-24 h-24 md:w-36 md:h-36 mb-6"
        />

        <h1 className="text-3xl md:text-4xl font-bold text-[#8B1D2C] leading-tight">
          UoA Hostel Management System
        </h1>

        <p className="mt-4 text-sm md:text-base text-gray-600 max-w-sm md:max-w-md leading-relaxed">
          <span className="font-semibold text-gray-900">
            University of Allahabad
          </span>{" "}
          Hostel Management System
        </p>

        <div className="mt-6 h-1 w-24 bg-[#C9A24D] rounded-full" />

      </section>


      {/* RIGHT */}
      <section className="w-full md:w-1/2 flex items-center justify-center px-4 py-10">

        <div className="
w-full
max-w-lg
bg-white
border
border-gray-300
rounded
shadow
p-6
md:p-8
">

          <h2 className="
text-xl
md:text-2xl
font-semibold
text-gray-800
mb-4
">
            Student Login
          </h2>

          <div className="
text-sm
text-gray-700
mb-6
space-y-1
">
            <p>
              • Enter your username and password to login.
            </p>

            <p>
              • You will be redirected to your dashboard after login.
            </p>
          </div>



          <form
            onSubmit={handleLogin}
            className="space-y-5"
          >


            {/* Username */}
            <div className="
flex
flex-col
md:flex-row
md:items-center
gap-2
">

              <label className="
md:w-1/3
font-medium
text-gray-700
">
                Roll Number
                <span className="text-red-500">*</span>
              </label>


              <input
                type="text"
                placeholder="Enter roll number"
                value={username}
                onChange={(e) =>
                  setUsername(
                    e.target.value
                  )
                }
                className="
md:w-2/3
border
text-gray-900
border-gray-300
rounded
px-3
py-2
focus:outline-none
focus:ring-2
focus:ring-[#8B1D2C]
"
              />

            </div>



            {/* Password */}
            <div className="
flex
flex-col
md:flex-row
md:items-center
gap-2
">

              <label className="
md:w-1/3
font-medium
text-gray-700
">
                Password
                <span className="text-red-500">*</span>
              </label>


              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) =>
                  setPassword(
                    e.target.value
                  )
                }
                className="
md:w-2/3
border
text-gray-900
border-gray-300
rounded
px-3
py-2
focus:outline-none
focus:ring-2
focus:ring-[#8B1D2C]
"
              />

            </div>



            {error && (
              <p className="
text-red-500
text-sm
md:ml-[33%]
">
                {error}
              </p>
            )}



            <div className="
flex
items-start
gap-2
md:ml-[33%]
">

              <input
                type="checkbox"
                className="mt-1"
              />

              <p className="
text-sm
text-gray-700
">
                I agree to{" "}
                <span className="
text-blue-600
cursor-pointer
">
                  Hostel Rules & Regulations
                </span>
              </p>

            </div>



            <div className="
flex
items-center
gap-4
md:ml-[33%]
flex-wrap
">

              <button
                type="submit"
                disabled={loading}
                className="
bg-[#8B1D2C]
text-white
px-6
py-2
rounded
font-semibold
hover:bg-[#6F1622]
disabled:opacity-50
"
              >
                {
                  loading
                    ?
                    "Logging in..."
                    :
                    "LOG IN"
                }
              </button>



              <button
                type="button"
                className="
text-blue-600
hover:underline
text-sm
"
              >
                Forgot Password?
              </button>


            </div>



            <div className="
md:ml-[33%]
pt-4
text-sm
text-gray-700
">

              Don’t have an account?{" "}

              <span
                onClick={() =>
                  router.push(
                    "/student-register"
                  )
                }
                className="
text-blue-600
cursor-pointer
hover:underline
font-medium
"
              >
                Register here
              </span>

            </div>


          </form>

        </div>

      </section>

    </div>
  );

}