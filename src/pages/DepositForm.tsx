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
      await deposit(amount, pin);
      navigate("/account");
    } catch (err: any) {
      const backendMessage = err?.response?.data?.message;

      setError(backendMessage);
      setIsSubmitting(false);
    }
  };

  const goBackToStep1 = () => {
    setStep(1);
    setError("");
    setIsSubmitting(false);
  };

  return (
    <>
      <div className="w-full h-screen flex items-center justify-center p-4 sm:p-6 md:p-8">
        <div className="w-full max-w-md bg-linear-to-b from-white-2 to-black-8 rounded-3xl shadow-outer border border-accent-alpha overflow-hidden">
          {/* Header with decoration */}
          <div className="relative pt-8 pb-6 px-6 text-center">
            <div className="absolute -top-1 right-4 opacity-40">
              <div className="w-24 h-24 rounded-full bg-accent/5 blur-3xl"></div>
            </div>
            <img
              src={mikusMoney}
              alt="sticker"
              className="w-30 h-30 object-contain mx-auto mb-4 drop-shadow-lg"
              loading="lazy"
            />
            <h1 className="text-3xl sm:text-4xl font-bold text-contrast mb-2">
              Deposit Funds
            </h1>
            <p className="text-xs sm:text-sm text-contrast/50 font-medium">
              Step <span className="text-accent font-bold">{step}</span> of 2
            </p>
          </div>

          {/* Content */}
          <div className="px-6 pb-6 flex flex-col gap-4">
            {/* Error message */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3 text-red-300 text-xs sm:text-sm text-center font-medium">
                {error}
              </div>
            )}

            <form
              onSubmit={step === 2 ? handleSumit : (e) => e.preventDefault()}
              className="w-full flex flex-col gap-4"
            >
              {step === 1 ? (
                <>
                  <div className="space-y-2">
                    <label
                      htmlFor="input-amount"
                      className="text-contrast font-semibold text-sm block"
                    >
                      Deposit Amount
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-accent font-bold text-lg">
                        $
                      </span>
                      <input
                        className="w-full px-4 py-3 pl-8 rounded-xl bg-linear-to-b from-black-30 to-black-15 text-contrast font-[inherit] text-base border border-white-8 shadow-inner transition-all duration-200 outline-none focus:border-accent focus:shadow-focus focus:bg-linear-to-b focus:from-black-35 focus:to-black-20 placeholder:text-contrast/40 placeholder:italic"
                        type="number"
                        name="input-amount"
                        id="input-amount"
                        step="10.00"
                        min="0"
                        max="10000"
                        placeholder="0.00"
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
                    <p className="text-xs text-contrast/40 mt-1">
                      Maximum deposit: $10,000
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="bg-black-20/30 rounded-xl p-4 mb-2 border border-white-8/30">
                    <p className="text-contrast/70 text-xs mb-2">Deposit Amount</p>
                    <p className="text-2xl font-bold text-accent">${amount.toFixed(2)}</p>
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="input-pin"
                      className="text-contrast font-semibold text-sm block"
                    >
                      Confirm PIN Code
                    </label>
                    <div className="relative flex items-center">
                      <input
                        className="w-full px-4 py-3 rounded-xl bg-linear-to-b from-black-30 to-black-15 text-contrast font-[inherit] text-base border border-white-8 shadow-inner transition-all duration-200 outline-none focus:border-accent focus:shadow-focus focus:bg-linear-to-b focus:from-black-35 focus:to-black-20 placeholder:text-contrast/40 placeholder:italic"
                        type={showPin ? "text" : "password"}
                        name="input-pin"
                        id="input-pin"
                        placeholder="••••"
                        value={pin}
                        onChange={(e) => setPin(e.target.value)}
                        required
                      />
                      <button
                        type="button"
                        className="absolute right-4 text-contrast/60 hover:text-contrast transition-colors text-sm font-bold"
                        onClick={() => setShowPin(!showPin)}
                      >
                        {showPin ? "HIDE" : "SHOW"}
                      </button>
                    </div>
                  </div>
                </>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 mt-6 pt-4 border-t border-white-8/20">
                {step === 1 ? (
                  <>
                    <a
                      href="/account"
                      className="flex-1 text-center py-3 rounded-xl text-sm font-semibold inline-flex items-center justify-center gap-2 transition-all duration-200 bg-linear-to-b from-red-700/80 to-red-600/70 text-contrast shadow-button border border-dark-border hover:from-red-600/90 hover:to-red-600/80 cursor-pointer focus:outline-3 focus:outline-red-500 focus:outline-offset-2"
                    >
                      Cancel
                    </a>
                    <button
                      type="button"
                      onClick={handleNext}
                      className="flex-1 text-center py-3 rounded-xl text-sm font-semibold inline-flex items-center justify-center gap-2 transition-all duration-200 focus:outline-3 bg-linear-to-b from-accent-weak/80 to-accent/70 text-dark shadow-button-accent border border-dark-border hover:from-accent-weak hover:to-accent/80 cursor-pointer"
                    >
                      Next
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      className="flex-1 text-center py-3 rounded-xl text-sm font-semibold inline-flex items-center justify-center gap-2 transition-all duration-200 focus:outline-3 bg-linear-to-b from-accent-weak/80 to-accent/70 text-dark shadow-button-accent border border-dark-border hover:from-accent-weak hover:to-accent/80 cursor-pointer"
                      onClick={goBackToStep1}
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={step === 2 && isSubmitting}
                      className={`flex-1 text-center py-3 rounded-xl text-sm font-semibold inline-flex items-center justify-center gap-2 transition-all duration-200 ${
                        step === 2 && isSubmitting
                          ? "bg-gray-500/40 text-gray-400 cursor-not-allowed opacity-60"
                          : "bg-linear-to-b from-accent-weak/80 to-accent/70 text-dark shadow-button-accent border border-dark-border hover:from-accent-weak hover:to-accent/80 cursor-pointer focus:outline-3 focus:outline-accent-20 focus:outline-offset-2"
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
