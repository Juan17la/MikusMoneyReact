import { useQuery } from "@tanstack/react-query";

import { RedirectionButton } from "../components/RedirectionButton";
import TransactionsNotFoundWidget from "../components/TransactionsNotFoundWidget";
import TransactionsWidget from "../components/TransactionsWidget";
import TransactionsLoadingWidget from "../components/TransactionLoadingWideget";
import MainLayout from "../layouts/MainLayout";

import portraitImage from "../assets/portrait.jpg";

import { getAccount } from "../api/accountService";
import { getTransactionHistory } from "../api/transactionsService";
import type { Transaction } from "../interface/transaction";

export default function Home() {
  const {
    data: dataAccount,
    isLoading: isLoadingAccount,
    error: errorAccount,
  } = useQuery({
    queryKey: ["account"],
    queryFn: getAccount,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

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

  return (
    <MainLayout>
      {/* Left: portrait aside with image */}
      <aside
        className="md:flex md:col-span-2 bg-linear-to-br from-white-2 to-black-8 border-2 border-accent-alpha flex items-center justify-center rounded-sm h-96 md:h-auto"
        aria-hidden="false"
      >
        <div className="w-full h-full aspect-square">
          <img
            src={portraitImage}
            alt="Portrait"
            className="object-cover w-full h-full rounded-xs"
            loading="lazy"
          />
        </div>
      </aside>

      {/* Right: main control panel (wider) */}
      <main className="md:col-span-2 flex flex-col gap-4">
        <section
          className="bg-linear-to-b from-white-2 to-black-12 rounded-xl shadow-card border border-white-3 p-4 text-contrast"
          aria-labelledby="balance-heading"
        >
          <h2 id="balance-heading" className="text-sm uppercase opacity-80">
            Balance
          </h2>
          <div className="text-3xl font-bold mt-2" aria-live="polite">
            $
            {isLoadingAccount
              ? "0.00"
              : errorAccount
              ? "Error"
              : dataAccount?.totalMoney.toFixed(2)}
          </div>
          <hr className="my-3 border-teal-100/20" />
          <div className="opacity-90">
            {isLoadingAccount
              ? "Anonymous"
              : errorAccount
              ? "Error"
              : dataAccount?.fullName}
          </div>
          <div className="text-sm font-semibold mt-1">
            Public code:{" "}
            {isLoadingAccount
              ? "..."
              : errorAccount
              ? "Error"
              : dataAccount?.publicCode}
          </div>
        </section>

        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <RedirectionButton
                buttonName="Deposit"
                buttonLink="/transactions/deposit"
                buttonColor="primary"
                className="w-full"
              />
            </div>
            <div>
              <RedirectionButton
                buttonName="Withdraw"
                buttonLink="/transactions/withdraw"
                buttonColor="primary"
                className="w-full"
              />
            </div>
            <div>
              <RedirectionButton
                buttonName="Transfer"
                buttonLink="/transactions/transfer"
                buttonColor="primary"
                className="w-full"
              />
            </div>
          </div>
        </div>

        <section id="transactions" className="mt-4 flex flex-col shrink-0">
          <h3 className="text-lg text-white font-bold mb-2">
            Your last transaction
          </h3>
          <div
            id="component-list-transactions"
            className="bg-linear-to-b from-white-1 to-black-8 rounded-sm p-3 border border-white-3 min-h-88 max-h-88 flex flex-col justify-start mb-2 text-white/45 overflow-y-auto gap-3 relative shadow-inset-y"
            role="region"
            aria-live="polite"
          >
            {isLoadingTransactions ? (
              <TransactionsLoadingWidget />
            ) : errorTransactions ? (
              "Error loading transactions."
            ) : dataTransactions?.content?.length === 0 ? (
              <TransactionsNotFoundWidget />
            ) : (
              dataTransactions?.content
                ?.slice(0, 8)
                .map((transaction: Transaction) => (
                  <TransactionsWidget
                    key={transaction.id}
                    transaction={transaction}
                  />
                ))
            )}
          </div>
          <RedirectionButton
            buttonName="See more..."
            buttonLink="/transactions"
            buttonColor="primary"
          />
        </section>
      </main>
    </MainLayout>
  );
}
