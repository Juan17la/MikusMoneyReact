import { useState } from "react";
import { login } from "../api/authenticationService";

import mikusLoginSticker from "../assets/mikusLoginSticker.png";

export default function Login() {

  const [email, setEmail] = useState("");
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");

  const handleSumit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await login(email, pin);
      window.location.reload();
    } catch (err : any) {
      setError(err.message || 'An unexpected error occurred.');      
      console.error('Login failed:', err);
    }
  }

  return (
    <>
      <div className="w-full min-h-screen grid items-start mx-auto sm:place-items-center p-4 sm:p-6 md:p-8">
        <div className="bg-linear-to-b from-white-2 to-black-8 rounded-2xl shadow-outer border border-accent-alpha w-full max-w-md p-4 mt-8 sm:p-6 flex flex-col items-center relative overflow-visible">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold my-4 text-contrast text-center">
            Miku's Login
          </h1>
          <img
            src={mikusLoginSticker}
            alt="sticker"
            className="w-24 sm:w-40 md:w-45 object-contain absolute -top-12 -right-6 sm:-top-20 sm:-right-16 md:-top-25 md:-right-20"
          />
          <span className="text-12 text-red-400">{error}</span>
          <div className="w-full h-full flex flex-col gap-2 sm:gap-4 p-4 sm:p-6 md:p-8">
            <form onSubmit={handleSumit} className="w-full">
              <div
                className="w-full gap-2 flex flex-col mb-4"
                id="form-group"
              >
                <label
                  htmlFor="input-email"
                  className="text-contrast font-semibold text-sm sm:text-base"
                >
                  Email:
                </label>
                <input
                  className="w-full px-3.5 py-2.5 rounded-sm bg-linear-to-b from-black-30 to-black-15 text-contrast font-[inherit] text-sm border border-white-8 shadow-inner transition-all duration-200 outline-none focus:border-accent focus:shadow-focus focus:bg-linear-to-b focus:from-black-35 focus:to-black-20 placeholder:text-contrast/40 placeholder:italic sm:text-base"
                  type="email"
                  name="input-email"
                  id="input-email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div
                className="w-full gap-2 flex flex-col mb-4"
                id="form-group"
              >
                <label
                  htmlFor="input-password"
                  className="text-contrast font-semibold text-sm sm:text-base"
                >
                  Pin Code:
                </label>
                <input
                  className="w-full px-3.5 py-2.5 rounded-sm bg-linear-to-b from-black-30 to-black-15 text-contrast font-[inherit] text-sm border border-white-8 shadow-inner transition-all duration-200 outline-none focus:border-accent focus:shadow-focus focus:bg-linear-to-b focus:from-black-35 focus:to-black-20 placeholder:text-contrast/40 placeholder:italic sm:text-base"
                  type="password"
                  name="input-pin"
                  id="input-pin"
                  placeholder="Pin Code"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2 mb-4 text-sm sm:text-base">
                <a href="/" className="underline hover:text-accent transition-colors">
                  Forgot your password?
                </a>
                <a href="/" className="underline hover:text-accent transition-colors">
                  Create an account
                </a>
              </div>
              <button
                type="submit"
                className="w-full text-center font-semibold sm:py-3 rounded-lg my-4 text-sm sm:text-base inline-flex items-center justify-center gap-2 px-2.5 py-3.5 transition-all duration-200 bg-linear-to-b from-accent-weak/40 to-accent/70 text-dark shadow-button-accent border border-dark-border focus:outline-3 focus:outline-accent-20 focus:outline-offset-2 hover:from-accent hover:to-accent-strong hover:shadow-button-accent-hover active:from-accent-active active:to-accent-strong-active active:shadow-button-accent-active"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}


