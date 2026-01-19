import { useState } from "react";
import { useNavigate } from "react-router";
import { createSavingsPig } from "../api/savingsPigService";
import mikusMoney from "../assets/mikusMoney.png";

export default function SavingsCreateForm() {
  const [name, setName] = useState("");
  const [goal, setGoal] = useState(0.0);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isSubmitting) return;

    if (!name.trim()) {
      setError("Please enter a name for your savings pig");
      return;
    }
    if (goal <= 0) {
      setError("Please enter a valid goal amount");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      await createSavingsPig(name, goal);
      navigate("/savings");
    } catch (err: any) {
      const backendMessage = err?.response?.data?.message;

      setError(backendMessage || "Failed to create savings pig");
      setIsSubmitting(false);
    }
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
              Create Savings Pig
            </h1>
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
              onSubmit={handleSubmit}
              className="w-full flex flex-col gap-4"
            >
              <div className="space-y-2">
                <label
                  htmlFor="input-name"
                  className="text-contrast font-semibold text-sm block"
                >
                  Savings Pig Name
                </label>
                <input
                  className="w-full px-4 py-3 rounded-xl bg-linear-to-b from-black-30 to-black-15 text-contrast font-[inherit] text-base border border-white-8 shadow-inner transition-all duration-200 outline-none focus:border-accent focus:shadow-focus focus:bg-linear-to-b focus:from-black-35 focus:to-black-20 placeholder:text-contrast/40 placeholder:italic"
                  type="text"
                  name="input-name"
                  id="input-name"
                  placeholder="e.g., Vacation Fund"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="input-goal"
                  className="text-contrast font-semibold text-sm block"
                >
                  Goal Amount
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-accent font-bold text-lg">
                    $
                  </span>
                  <input
                    className="w-full px-4 py-3 pl-8 rounded-xl bg-linear-to-b from-black-30 to-black-15 text-contrast font-[inherit] text-base border border-white-8 shadow-inner transition-all duration-200 outline-none focus:border-accent focus:shadow-focus focus:bg-linear-to-b focus:from-black-35 focus:to-black-20 placeholder:text-contrast/40 placeholder:italic"
                    type="number"
                    name="input-goal"
                    id="input-goal"
                    step="1.00"
                    min="0"
                    max="100000"
                    placeholder="0.00"
                    value={goal || ""}
                    onChange={(e) =>
                      setGoal(parseFloat(e.target.value) || 0)
                    }
                    required
                  />
                </div>
                <p className="text-xs text-contrast/40 mt-1">
                  Maximum goal: $100,000
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-6 pt-4 border-t border-white-8/20">
                <a
                  href="/savings"
                  className="flex-1 text-center py-3 rounded-xl text-sm font-semibold inline-flex items-center justify-center gap-2 transition-all duration-200 bg-linear-to-b from-red-700/80 to-red-600/70 text-contrast shadow-button border border-dark-border hover:from-red-600/90 hover:to-red-600/80 cursor-pointer focus:outline-3 focus:outline-red-500 focus:outline-offset-2"
                >
                  Cancel
                </a>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`flex-1 text-center py-3 rounded-xl text-sm font-semibold inline-flex items-center justify-center gap-2 transition-all duration-200 ${
                    isSubmitting
                      ? "bg-gray-500/40 text-gray-400 cursor-not-allowed opacity-60"
                      : "bg-linear-to-b from-accent-weak/80 to-accent/70 text-dark shadow-button-accent border border-dark-border hover:from-accent-weak hover:to-accent/80 cursor-pointer focus:outline-3 focus:outline-accent-20 focus:outline-offset-2"
                  }`}
                >
                  {isSubmitting ? "Creating..." : "Create Savings Pig"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
