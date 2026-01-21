import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { saveSavingPigs, getSavingsPigs } from "../api/savingsPigService";
import { Eye, EyeOff } from "lucide-react";
import mikusMoney from "../assets/mikusMoney.png";

interface SavingsPig {
  id: number;
  savedMoney: number;
  broken: boolean;
  brokenAt: string | null;
  createdAt: string;
  mikuId: number;
  goal: number;
  goalName: string;
}

export default function DepositSavingsForm() {
  const [step, setStep] = useState<1 | 2>(1);

  const [savingPig, setSavingPig] = useState<SavingsPig | null>(null);
  const [amount, setAmount] = useState(0.0);
  const [pin, setPin] = useState("");
  const [showPin, setShowPin] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingPig, setIsLoadingPig] = useState(true);

  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  // Load the specific savings pig from URL parameter
  useEffect(() => {
    const loadSavingsPig = async () => {
      if (!id) {
        setError("No savings pig ID provided");
        setIsLoadingPig(false);
        return;
      }

      try {
        const data = await getSavingsPigs();
        const pig = data.find((p: SavingsPig) => p.id === parseInt(id));
        
        if (!pig) {
          setError("Savings pig not found");
        } else if (pig.broken) {
          setError("This savings pig is broken and cannot receive deposits");
        } else {
          setSavingPig(pig);
        }
      } catch (err) {
        setError("Failed to load savings pig");
      } finally {
        setIsLoadingPig(false);
      }
    };

    loadSavingsPig();
  }, [id]);

  const handleNext = () => {
    if (amount <= 0) {
      setError("Please enter a valid amount");
      return;
    }
    setError("");
    setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isSubmitting || !savingPig) return;

    setIsSubmitting(true);
    setError("");

    try {
      await saveSavingPigs(amount, pin, savingPig.id);
      navigate("/savings");
    } catch (err: any) {
      const backendMessage = err?.response?.data?.message;

      setError(backendMessage || "Failed to deposit to savings pig");
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
              Deposit to Savings
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

            {isLoadingPig ? (
              <div className="text-center py-8">
                <p className="text-accent opacity-70">Loading savings pig...</p>
              </div>
            ) : !savingPig ? (
              <div className="text-center py-8">
                <p className="text-accent opacity-70 mb-4">{error || "Savings pig not found"}</p>
                <a
                  href="/savings"
                  className="text-center py-3 px-6 rounded-xl text-sm font-semibold inline-flex items-center justify-center gap-2 transition-all duration-200 bg-linear-to-b from-accent-weak/80 to-accent/70 text-dark shadow-button-accent border border-dark-border hover:from-accent-weak hover:to-accent/80 cursor-pointer"
                >
                  Go to Savings
                </a>
              </div>
            ) : (
              <form
                onSubmit={step === 2 ? handleSubmit : (e) => e.preventDefault()}
                className="w-full flex flex-col gap-4"
              >
                {step === 1 ? (
                  <>
                    <div className="bg-black-20/30 rounded-xl p-4 mb-2 border border-white-8/30">
                      <p className="text-contrast/70 text-xs mb-2">Depositing to</p>
                      <p className="text-lg font-bold text-accent">
                        {savingPig.goalName}
                      </p>
                      <p className="text-xs text-contrast/40 mt-2">
                        Current: ${savingPig.savedMoney.toFixed(2)} / ${savingPig.goal.toFixed(2)}
                      </p>
                    </div>

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
                          step="1.00"
                          min="0"
                          max="10000"
                          placeholder="0.00"
                          value={amount || ""}
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
                      <p className="text-contrast/70 text-xs mb-2">Savings Pig</p>
                      <p className="text-lg font-bold text-accent mb-4">
                        {savingPig.goalName}
                      </p>
                      <p className="text-contrast/70 text-xs mb-2">Deposit Amount</p>
                      <p className="text-2xl font-bold text-accent">
                        ${amount.toFixed(2)}
                      </p>
                      <p className="text-xs text-contrast/40 mt-3">
                        New total: $
                        {(savingPig.savedMoney + amount).toFixed(2)} / $
                        {savingPig.goal.toFixed(2)}
                      </p>
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
                          className="absolute right-4 text-contrast/60 hover:text-contrast transition-colors"
                          onClick={() => setShowPin(!showPin)}
                        >
                          {showPin ? <Eye size={20} /> : <EyeOff size={20} />}
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
                        href="/savings"
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
            )}
          </div>
        </div>
      </div>
    </>
  );
}
