import { useQuery } from "@tanstack/react-query";
import MainLayout from "../layouts/MainLayout";
import DetailedTransactionWidget from "../components/DetailedTransactionWidget";
import TransactionsLoadingWidget from "../components/TransactionLoadingWideget";
import TransactionsNotFoundWidget from "../components/TransactionsNotFoundWidget";
import { getTransactionHistory } from "../api/transactionsService";
import type { Transaction } from "../interface/transaction";
import { Filter, TrendingUp, TrendingDown, ArrowLeftRight } from "lucide-react";
import { useState } from "react";

export default function Transactions() {
  const [filterType, setFilterType] = useState<string>("ALL");

  const {
    data: dataTransactions,
    isLoading: isLoadingTransactions,
    error: errorTransactions,
  } = useQuery({
    queryKey: ["transactionsHistory"],
    queryFn: getTransactionHistory,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  const filteredTransactions = dataTransactions?.content?.filter(
    (transaction: Transaction) => {
      if (filterType === "ALL") return true;
      return transaction.transactionType === filterType;
    }
  );

  const stats = {
    total: dataTransactions?.content?.length || 0,
    deposits: dataTransactions?.content?.filter((t: Transaction) => t.transactionType === "DEPOSIT").length || 0,
    withdrawals: dataTransactions?.content?.filter((t: Transaction) => t.transactionType === "WITHDRAW").length || 0,
    transfers: dataTransactions?.content?.filter((t: Transaction) => t.transactionType === "TRANSFER").length || 0,
  };

  return (
    <MainLayout>
      {/* Left: Statistics aside */}
      <aside className="md:flex md:col-span-1 flex-col gap-4 md:h-[calc(100vh-12rem)] md:max-h-200">
        <section
          className="bg-linear-to-br from-white-2 to-black-8 border-2 border-accent-alpha rounded-xl shadow-card p-6 h-full flex flex-col"
          aria-labelledby="stats-heading"
        >
          <h2 id="stats-heading" className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Statistics
          </h2>
          <div className="space-y-4">
            <div className="bg-black-8/50 rounded-lg p-4 border border-white-3">
              <p className="text-sm text-white/60">Total Transactions</p>
              <p className="text-2xl font-bold text-white mt-1">{stats.total}</p>
            </div>
            <div className="bg-green-500/10 rounded-lg p-4 border border-green-500/30">
              <p className="text-sm text-green-400/80 flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                Deposits
              </p>
              <p className="text-2xl font-bold text-green-400 mt-1">{stats.deposits}</p>
            </div>
            <div className="bg-red-500/10 rounded-lg p-4 border border-red-500/30">
              <p className="text-sm text-red-400/80 flex items-center gap-1">
                <TrendingDown className="w-4 h-4" />
                Withdrawals
              </p>
              <p className="text-2xl font-bold text-red-400 mt-1">{stats.withdrawals}</p>
            </div>
            <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-500/30">
              <p className="text-sm text-blue-400/80 flex items-center gap-1">
                <ArrowLeftRight className="w-4 h-4" />
                Transfers
              </p>
              <p className="text-2xl font-bold text-blue-400 mt-1">{stats.transfers}</p>
            </div>
          </div>
        </section>
      </aside>

      {/* Right: main transaction list */}
      <main className="md:col-span-3 flex flex-col gap-4 md:h-[calc(100vh-12rem)] md:max-h-[800px]">
        <section
          className="bg-linear-to-b from-white-2 to-black-12 rounded-xl shadow-card border border-white-3 p-6 text-contrast shrink-0"
          aria-labelledby="transactions-heading"
        >
          <div className="flex items-center justify-between mb-4 gap-2">
            <h1 id="transactions-heading" className="text-2xl font-bold text-white">
              Transactions History
            </h1>
            <div className="flex gap-2">
              <button
                onClick={() => setFilterType("ALL")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  filterType === "ALL"
                    ? "bg-accent text-white"
                    : "bg-black-8/50 text-white/60 hover:bg-black-8 hover:text-white"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilterType("DEPOSIT")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  filterType === "DEPOSIT"
                    ? "bg-green-500 text-white"
                    : "bg-black-8/50 text-white/60 hover:bg-black-8 hover:text-white"
                }`}
              >
                Deposits
              </button>
              <button
                onClick={() => setFilterType("WITHDRAW")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  filterType === "WITHDRAW"
                    ? "bg-red-500 text-white"
                    : "bg-black-8/50 text-white/60 hover:bg-black-8 hover:text-white"
                }`}
              >
                Withdrawals
              </button>
              <button
                onClick={() => setFilterType("TRANSFER")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  filterType === "TRANSFER"
                    ? "bg-blue-500 text-white"
                    : "bg-black-8/50 text-white/60 hover:bg-black-8 hover:text-white"
                }`}
              >
                Transfers
              </button>
            </div>
          </div>
        </section>

        <section
          id="transactions-list"
          className="bg-linear-to-b from-white-1 to-black-8 rounded-xl p-4 border border-white-3 flex-1 min-h-96 flex flex-col justify-start text-white/45 overflow-y-auto gap-4 shadow-inset-y"
          role="region"
          aria-live="polite"
        >
          {isLoadingTransactions ? (
            <TransactionsLoadingWidget />
          ) : errorTransactions ? (
            <div className="text-center text-red-400 py-8">
              Error loading transactions. Please try again.
            </div>
          ) : filteredTransactions?.length === 0 ? (
            <TransactionsNotFoundWidget />
          ) : (
            filteredTransactions?.map((transaction: Transaction) => (
              <DetailedTransactionWidget
                key={transaction.id}
                transaction={transaction}
              />
            ))
          )}
        </section>
      </main>
    </MainLayout>
  );
}
