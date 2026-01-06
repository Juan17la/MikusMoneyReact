import { useState } from "react";
import { useNavigate } from "react-router";
import { deposit } from "../api/transactionsService";
import mikusMoney from "../assets/mikusMoney.png";

export default function DepositForm() {
  const [step, setStep] = useState<1 | 2>(1);

  const [amount, setAmount] = useState(0.0);
  const [pin, setPin] = useState("");
  const [showPin, setShowPin] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const handleNext = () => {
    setError("");
    setStep(2);
  };

  const handleSumit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);
    setError("");

    try {
      const response = await deposit(amount, pin);
      navigate("/account");
    } catch (err: any) {
      const backendMessage = err?.response?.data?.message;

      setError(backendMessage);
      setIsSubmitting(false);
      console.error("Deposit failed:", err);
    }
  };

  const goBackToStep1 = () => {
    setStep(1);
    setError("");
    setIsSubmitting(false);
  };

  return (
    <>
      <div className="w-full min-h-screen grid items-start mx-auto sm:place-items-center p-4 sm:p-6 md:p-8">
        <div className="bg-linear-to-b from-white-2 to-black-8 rounded-2xl shadow-outer border border-accent-alpha w-full max-w-1/3 max-h-md p-4 mt-8 sm:p-6 flex flex-col items-center relative overflow-visible">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold my-4 text-contrast text-center">
            Deposit Funds!
          </h1>
          <img
            src={mikusMoney}
            alt="sticker"
            className="w-24 sm:w-40 md:w-45 object-contain absolute -top-12 -right-6 sm:-top-20 sm:-right-16 md:-top-25 md:-right-20"
            loading="lazy"
          />
          <div className="text-sm text-contrast/60 mb-4">Step {step} of 2</div>
          <span className="text-12 text-red-400">{error}</span>
          <div className="w-full h-full flex flex-col gap-2 sm:gap-4 p-4 sm:p-6 md:p-8">
            <form
              onSubmit={step === 2 ? handleSumit : (e) => e.preventDefault()}
              className="w-full flex flex-col gap-4"
            >
              {step === 1 ? (
                <>
                  <div
                    className="w-full gap-2 flex flex-col mb-4"
                    id="form-group"
                  >
                    <label
                      htmlFor="input-amount"
                      className="text-contrast font-semibold text-sm sm:text-base"
                    >
                      Amount:
                    </label>
                    <input
                      className="w-full px-3.5 py-2.5 rounded-sm bg-linear-to-b from-black-30 to-black-15 text-contrast font-[inherit] text-sm border border-white-8 shadow-inner transition-all duration-200 outline-none focus:border-accent focus:shadow-focus focus:bg-linear-to-b focus:from-black-35 focus:to-black-20 placeholder:text-contrast/40 placeholder:italic sm:text-base"
                      type="number"
                      name="input-amount"
                      id="input-amount"
                      step="10.00"
                      min="0"
                      max="10000"
                      placeholder="$0.00"
                      value={amount}
                      onChange={(e) =>
                        setAmount(parseFloat(e.target.value) || 0)
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleNext();
                        }
                      }}
                      required
                    />
                  </div>
                </>
              ) : (
                <>
                  <div
                    className="w-full gap-2 flex flex-col mb-4 md:col-span-2"
                    id="form-group"
                  >
                    <label
                      htmlFor="input-pin"
                      className="text-contrast font-semibold text-sm sm:text-base"
                    >
                      Pin Code:
                    </label>
                    <div className="relative flex items-center">
                      <input
                        className="w-full px-3.5 py-2.5 rounded-sm bg-linear-to-b from-black-30 to-black-15 text-contrast font-[inherit] text-sm border border-white-8 shadow-inner transition-all duration-200 outline-none focus:border-accent focus:shadow-focus focus:bg-linear-to-b focus:from-black-35 focus:to-black-20 placeholder:text-contrast/40 placeholder:italic sm:text-base pr-10"
                        type={showPin ? "text" : "password"}
                        name="input-pin"
                        id="input-pin"
                        placeholder="Pin Code"
                        value={pin}
                        onChange={(e) => setPin(e.target.value)}
                        required
                      />
                      <button
                        type="button"
                        className="absolute right-3 text-contrast/60 hover:text-contrast transition-colors"
                        onClick={() => setShowPin(!showPin)}
                      >
                        {showPin ? "O" : "X"}
                      </button>
                    </div>
                  </div>
                </>
              )}
              <div className="flex flex-col gap-2 text-sm sm:text-base md:flex-row">
                {/* STEP 1 */}
                {step === 1 && (
                  <>
                    <a
                      href="/account"
                      className="w-full text-center sm:py-3 rounded-xs my-4 text-sm inline-flex items-center justify-center gap-2 px-3.5 py-2.5 transition-all duration-200 bg-linear-to-b from-red-700/80 to-red-600/70 text-contrast font-bold shadow-red-500 border border-dark-border hover:from-red-600 cursor-pointer focus:outline-3 focus:outline-red-500 focus:outline-offset-2"
                    >
                      Cancel
                    </a>
                    <button
                      type="button"
                      onClick={handleNext}
                      className="w-full text-center font-semibold sm:py-3 rounded-xs my-4 text-sm inline-flex items-center justify-center gap-2 px-3.5 py-2.5 transition-all duration-200 focus:outline-3 bg-linear-to-b from-accent-weak/80 to-accent/70 text-dark shadow-button-accent border border-dark-border hover:from-accent cursor-pointer"
                    >
                      Next
                    </button>
                  </>
                )}

                {/* STEP  */}
                {step === 2 && (
                  <>
                    <button
                      type="button"
                      className="w-full text-center font-semibold sm:py-3 rounded-xs my-4 text-sm inline-flex items-center justify-center gap-2 px-3.5 py-2.5 transition-all duration-200 focus:outline-3 bg-linear-to-b from-accent-weak/80 to-accent/70 text-dark shadow-button-accent border border-dark-border hover:from-accent cursor-pointer"
                      onClick={goBackToStep1}
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={step === 2 && isSubmitting}
                      className={`w-full text-center font-semibold sm:py-3 rounded-xs my-4 text-sm inline-flex items-center justify-center gap-2 px-3.5 py-2.5 transition-all duration-200 ${
                        step === 2 && isSubmitting
                          ? "bg-gray-400 text-gray-600 cursor-not-allowed opacity-60"
                          : "bg-linear-to-b from-accent-weak/80 to-accent/70 text-dark shadow-button-accent border border-dark-border hover:from-accent cursor-pointer focus:outline-3 focus:outline-accent-20 focus:outline-offset-2"
                      }`}
                    >
                      {isSubmitting ? "Processing..." : "Confirm Deposit"}
                    </button>
                  </>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
