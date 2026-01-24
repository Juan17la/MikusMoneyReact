import MainLayout from "../layouts/MainLayout";
import { RedirectionButton } from "../components/RedirectionButton";
import { useQuery } from "@tanstack/react-query";
import { getSavingsPigs, breakSavingPigs } from "../api/savingsPigService";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { PiggyBank, Music, Music2, Music4 } from "lucide-react";

import portraitImage from "../assets/portrait.jpg";

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

export default function Savings() {
  const navigate = useNavigate();
  
  const {
    data: dataSavings,
    isLoading: isLoadingSavings,
    error: errorSavings,
    refetch: refetchSavings,
  } = useQuery({
    queryKey: ["savingsPigs"],
    queryFn: getSavingsPigs,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  const [selectedPigId, setSelectedPigId] = useState<number | null>(null);
  const [selectedPig, setSelectedPig] = useState<SavingsPig | null>(null);
  const [showBreakModal, setShowBreakModal] = useState(false);
  const [pin, setPin] = useState("");
  const [showPin, setShowPin] = useState(false);
  const [breakError, setBreakError] = useState("");
  const [isBreaking, setIsBreaking] = useState(false);

  useEffect(() => {
    if (dataSavings && dataSavings.length > 0 && selectedPigId === null) {
      setSelectedPigId(dataSavings[0].id);
    }
  }, [dataSavings, selectedPigId]);

  useEffect(() => {
    if (dataSavings && selectedPigId !== null) {
      const pig = dataSavings.find((p: SavingsPig) => p.id === selectedPigId);
      setSelectedPig(pig || null);
    }
  }, [selectedPigId, dataSavings]);

  const handlePigChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const pigId = parseInt(e.target.value);
    setSelectedPigId(pigId);
  };

  const progressPercentage = selectedPig
    ? Math.round((selectedPig.savedMoney / selectedPig.goal) * 100)
    : 0;

  const remainingAmount = selectedPig
    ? selectedPig.goal - selectedPig.savedMoney
    : 0;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleBreakPig = () => {
    if (!selectedPig || selectedPig.broken) {
      return;
    }
    setShowBreakModal(true);
    setBreakError("");
    setPin("");
  };

  const handleConfirmBreak = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedPig || isBreaking) return;

    setIsBreaking(true);
    setBreakError("");

    try {
      // Break the pig with the full saved amount
      await breakSavingPigs(selectedPig.savedMoney, pin, selectedPig.id);
      setShowBreakModal(false);
      setPin("");
      refetchSavings();
      navigate("/account");
    } catch (err: any) {
      const backendMessage = err?.response?.data?.message;
      setBreakError(backendMessage || "Failed to break savings pig");
      setIsBreaking(false);
    }
  };

  const handleCancelBreak = () => {
    setShowBreakModal(false);
    setBreakError("");
    setPin("");
    setShowPin(false);
  };

  return (
    <MainLayout>
      {/* Left: Visual representation */}
      <aside
        className="md:flex md:col-span-2 bg-linear-to-br from-white-2 to-black-8 border-2 border-accent-alpha flex items-center justify-center rounded-sm h-96 md:h-auto w-full"
        aria-hidden="false"
      >
        <div className="w-full h-full flex items-center justify-center flex-col gap-4">
          <img
            src="https://i.pinimg.com/1200x/32/81/10/328110d05ad4260ed494358880657d5a.jpg"
            alt="Portrait"
            className="object-cover w-full h-full rounded-xs opacity-65"
            loading="lazy"
          />
        </div>
      </aside>

      {/* Right: main control panel (wider) */}
      <main className="md:col-span-2 flex flex-col gap-4 max-w-full">
        {/* Pig Selector */}
        <section className="flex flex-col gap-2">
          <label
            htmlFor="pigs"
            className="text-sm text-accent uppercase opacity-90 font-semibold"
          >
            Select Pig
          </label>
          <select
            name="pigs-options"
            id="pigs"
            className="w-full px-4 py-3 bg-black-8 border border-accent-alpha rounded-lg text-white focus:outline-none focus:border-accent transition-colors"
            value={selectedPigId || ""}
            onChange={handlePigChange}
            disabled={isLoadingSavings}
          >
            <option value="">-- Choose a piggy bank --</option>
            {dataSavings?.map((pig: SavingsPig) => (
              <option key={pig.id} value={pig.id}>
                {pig.goalName}
              </option>
            ))}
          </select>
        </section>

        {/* Main Savings Display Card */}
        <section
          className="relative overflow-hidden bg-linear-to-b from-white-2 to-black-12 rounded-xl shadow-card border border-white-3 p-6 text-contrast flex flex-col justify-between group"
          aria-labelledby="pig-name-heading"
        >
          {/* Background Decorations */}
          <div className="absolute -top-12.5 -right-12.5 w-64 h-64 bg-accent/5 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-5 -left-5 w-40 h-40 bg-accent-weak/5 rounded-full blur-2xl pointer-events-none"></div>
          
          <svg className="absolute top-0 right-0 w-full h-full opacity-[0.03] pointer-events-none" xmlns="http://www.w3.org/2000/svg">
            <pattern id="circuit-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M0 20h40M20 0v40" stroke="currentColor" strokeWidth="1" />
              <circle cx="20" cy="20" r="2" fill="currentColor" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#circuit-pattern)" />
          </svg>

          {isLoadingSavings ? (
            <div className="text-center py-8">
              <p className="text-accent opacity-70">Loading...</p>
            </div>
          ) : errorSavings ? (
            <div className="text-center py-8">
              <p className="text-red-500">Error loading savings data</p>
            </div>
          ) : selectedPig ? (
            <>
              <div className="mb-6">
                <h2 id="pig-name-heading" className="text-lg font-semibold">
                  {selectedPig.goalName}
                </h2>
                <p className="text-xs opacity-70 mt-1">
                  Created: {formatDate(selectedPig.createdAt)}
                </p>
                {selectedPig.broken && (
                  <p className="text-xs text-red-500 mt-1">
                    Broken {selectedPig.brokenAt ? `on ${formatDate(selectedPig.brokenAt)}` : ""}
                  </p>
                )}
              </div>

              {/* Savings Amount */}
              <div className="mb-6 border-b border-white-3/20">
                <p className="text-sm uppercase opacity-80 mb-2">Current Savings</p>
                <div
                  className="text-5xl font-bold text-accent mb-2"
                  aria-live="polite"
                >
                  ${selectedPig.savedMoney.toFixed(2)}
                </div>
                <p className="text-xs opacity-70">Target: ${selectedPig.goal.toFixed(2)}</p>
              </div>
              
              {/* Savings pig svg decoration */}
              <div className="w-full mb-6 flex justify-center relative z-10 py-10 h-48 items-center overflow-hidden shadow-card border border-accent/40 rounded-md bg-linear-to-b from-black/30 to-black/50">
                {/* Floating Zzz - Only show when goal is NOT reached */}
                {progressPercentage < 100 && (
                  <div className="absolute inset-0 pointer-events-none">
                    {[...Array(3)].map((_, i) => (
                      <div 
                        key={i}
                        className="absolute text-accent/20 font-bold animate-fall"
                        style={{
                          left: `${20 + Math.random() * 60}%`,
                          animationDuration: `${4 + Math.random() * 3}s`,
                          animationDelay: `${Math.random() * 4}s`,
                          fontSize: `${16 + i * 4}px`
                        }}
                      >
                        Zzz
                      </div>
                    ))}
                  </div>
                )}

                {/* Falling Music Notes & Dollar Signs - Only show when goal is reached (100%) */}
                {progressPercentage >= 100 && (
                  <div className="absolute inset-0 pointer-events-none">
                    {[...Array(5)].map((_, i) => {
                      const Icon = [Music, Music2, Music4][i % 3];
                      return (
                        <div 
                          key={`music-${i}`}
                          className="absolute text-accent/30 animate-fall"
                          style={{
                            left: `${5 + Math.random() * 90}%`,
                            animationDuration: `${2.5 + Math.random() * 3.5}s`,
                            animationDelay: `${Math.random() * 5}s`,
                            fontSize: `${12 + Math.random() * 18}px`
                          }}
                        >
                          <Icon size={18 + Math.random() * 14} />
                        </div>
                      );
                    })}
                    {/* Dollar signs falling */}
                    {[...Array(8)].map((_, i) => (
                      <div 
                        key={`dollar-${i}`}
                        className="absolute text-accent-weak/40 font-bold animate-fall"
                        style={{
                          left: `${10 + Math.random() * 80}%`,
                          animationDuration: `${3 + Math.random() * 4}s`,
                          animationDelay: `${Math.random() * 5}s`,
                          fontSize: `${14 + Math.random() * 20}px`
                        }}
                      >
                        $
                      </div>
                    ))}
                  </div>
                )}

                {/* Pig Icon - Animated when goal reached, static otherwise */}
                <div className={`relative z-20 text-accent drop-shadow-[0_0_15px_rgba(57,230,216,0.5)] ${
                  progressPercentage >= 100 ? 'animate-float' : ''
                }`}>
                  {progressPercentage >= 100 && (
                    <div className="absolute inset-0 blur-2xl bg-accent/20 rounded-full animate-pulse"></div>
                  )}
                  <PiggyBank size={120} strokeWidth={1.5} />
                  
                  {/* Small decorative elements around pig - Only when goal reached */}
                  {progressPercentage >= 100 && (
                    <>
                      <div className="absolute -top-4 -right-2 text-accent-weak animate-[bounce_3s_infinite]">
                        <Music size={24} />
                      </div>
                      <div className="absolute -bottom-2 -left-3 text-accent-weak animate-[bounce_3.5s_infinite_0.5s]">
                        <Music2 size={20} />
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Progress Visualization */}
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center">
                  <p className="text-xs uppercase opacity-80">Progress</p>
                  <p className="text-sm font-semibold">{progressPercentage}%</p>
                </div>
                <progress
                  id="goal"
                  value={progressPercentage}
                  max="100"
                  className="w-full h-3 bg-black-12 border border-accent/30 rounded-lg"
                ></progress>
                <p className="text-xs opacity-70 text-right">
                  ${remainingAmount.toFixed(2)} remaining
                </p>
              </div>
            </>
          ) : (
            <div className="text-center py-8">
              <p className="text-accent opacity-70">No piggy bank selected</p>
            </div>
          )}
        </section>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <RedirectionButton
              buttonName="Create"
              buttonLink="/savings/create"
              buttonColor="primary"
              className="w-full text-center"
            />
            <RedirectionButton
              buttonName="Deposit"
              buttonLink={`/savings/${selectedPig?.id}/deposit`}
              buttonColor="primary"
              className="w-full text-center"
            />
            <button
              onClick={handleBreakPig}
              disabled={!selectedPig || selectedPig?.broken}
              className={`w-full text-center py-3 rounded-xl text-sm font-semibold inline-flex items-center justify-center gap-2 transition-all duration-200 ${
                !selectedPig || selectedPig?.broken
                  ? "bg-gray-500/40 text-gray-400 cursor-not-allowed opacity-60"
                  : "bg-linear-to-b from-red-700/80 to-red-600/70 text-contrast shadow-button border border-dark-border hover:from-red-600/90 hover:to-red-600/80 cursor-pointer focus:outline-3 focus:outline-red-500 focus:outline-offset-2"
              }`}
            >
              Break Pig
            </button>
          </div>
        </div>
      </main>

      {/* Break Confirmation Modal */}
      {showBreakModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-md bg-linear-to-b from-white-2 to-black-8 rounded-3xl shadow-outer border border-accent-alpha overflow-hidden">
            {/* Modal Header */}
            <div className="relative pt-6 pb-4 px-6 text-center border-b border-white-8/20">
              <h2 className="text-2xl sm:text-3xl font-bold text-contrast mb-2">
                Break Savings Pig?
              </h2>
              <p className="text-xs sm:text-sm text-contrast/50 font-medium">
                This action cannot be undone
              </p>
            </div>

            {/* Modal Content */}
            <div className="px-6 py-6 flex flex-col gap-4">
              {/* Error message */}
              {breakError && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3 text-red-300 text-xs sm:text-sm text-center font-medium">
                  {breakError}
                </div>
              )}

              {/* Warning message */}
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-center">
                <p className="text-contrast/90 text-sm mb-2">
                  Are you sure you want to break{" "}
                  <span className="font-bold text-accent">
                    {selectedPig?.goalName}
                  </span>
                  ?
                </p>
                <p className="text-contrast/70 text-xs">
                  You will receive{" "}
                  <span className="font-bold text-accent">
                    ${selectedPig?.savedMoney.toFixed(2)}
                  </span>{" "}
                  back to your main account.
                </p>
              </div>

              <form onSubmit={handleConfirmBreak} className="w-full flex flex-col gap-4">
                <div className="space-y-2">
                  <label
                    htmlFor="break-pin"
                    className="text-contrast font-semibold text-sm block"
                  >
                    Confirm PIN Code
                  </label>
                  <div className="relative flex items-center">
                    <input
                      className="w-full px-4 py-3 rounded-xl bg-linear-to-b from-black-30 to-black-15 text-contrast font-[inherit] text-base border border-white-8 shadow-inner transition-all duration-200 outline-none focus:border-accent focus:shadow-focus focus:bg-linear-to-b focus:from-black-35 focus:to-black-20 placeholder:text-contrast/40 placeholder:italic"
                      type={showPin ? "text" : "password"}
                      name="break-pin"
                      id="break-pin"
                      placeholder="••••"
                      value={pin}
                      onChange={(e) => setPin(e.target.value)}
                      required
                      autoFocus
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

                {/* Action Buttons */}
                <div className="flex gap-3 mt-2 pt-4 border-t border-white-8/20">
                  <button
                    type="button"
                    onClick={handleCancelBreak}
                    disabled={isBreaking}
                    className="flex-1 text-center py-3 rounded-xl text-sm font-semibold inline-flex items-center justify-center gap-2 transition-all duration-200 bg-linear-to-b from-accent-weak/80 to-accent/70 text-dark shadow-button-accent border border-dark-border hover:from-accent-weak hover:to-accent/80 cursor-pointer focus:outline-3"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isBreaking}
                    className={`flex-1 text-center py-3 rounded-xl text-sm font-semibold inline-flex items-center justify-center gap-2 transition-all duration-200 ${
                      isBreaking
                        ? "bg-gray-500/40 text-gray-400 cursor-not-allowed opacity-60"
                        : "bg-linear-to-b from-red-700/80 to-red-600/70 text-contrast shadow-button border border-dark-border hover:from-red-600/90 hover:to-red-600/80 cursor-pointer focus:outline-3 focus:outline-red-500 focus:outline-offset-2"
                    }`}
                  >
                    {isBreaking ? "Breaking..." : "Confirm Break"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
}
