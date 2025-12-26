import { RedirectionButton } from "../components/RedirectionButton";

export default function Home() {
    return (
        <div className="min-h-screen w-full flex items-center justify-center p-4">
            <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-4 gap-6 items-stretch bank-shell">

                {/* Left: portrait aside with image */}
                <aside className="hidden md:flex md:col-span-2 portrait-aside" aria-hidden="false">
                    <div className="w-full h-96 md:h-[40rem]">
                        <img
                            // src=""
                            src="https://i.redd.it/s763f2wtp3if1.gif"
                            alt="Portrait"
                            className="object-cover w-full h-full"
                        />
                    </div>
                </aside>

                {/* Right: main control panel (wider) */}
                <main className="md:col-span-2 text-contrast flex flex-col gap-4 h-full">
                    <section className="bank-card" aria-labelledby="balance-heading">
                        <h2 id="balance-heading" className="text-sm uppercase opacity-80">Balance</h2>
                        <div className="text-3xl font-bold mt-2" aria-live="polite">$0.00</div>
                        <hr className="my-3 border-teal-100/20" />
                        <div className="opacity-90">Miku - Jose Jose De La Cruz</div>
                        <div className="text-sm font-semibold mt-1">Public code: MK-23456789</div>
                    </section>

                    <div className="flex flex-col gap-3">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <div>
                                <RedirectionButton buttonName="Deposit" buttonLink="/request" buttonColor="primary" className="skeu-button w-full" />
                            </div>
                            <div>
                                <RedirectionButton buttonName="Send" buttonLink="/send" buttonColor="primary" className="skeu-button w-full accent" />
                            </div>
                            <div>
                                <RedirectionButton buttonName="Withdraw" buttonLink="/withdraw" buttonColor="primary" className="skeu-button w-full" />
                            </div>
                        </div>
                    </div>

                    <section id="transactions" className="mt-4 flex flex-col flex-1 min-h-0">
                        <h3 className="text-lg font-bold mb-2">Your last transaction</h3>
                        <div id="component-list-transactions" className="transactions-list flex items-center justify-center py-5 px-3 mb-2 flex-fill" role="region" aria-live="polite">
                            There's nothing here yet.
                        </div>
                        <a href="/transactions" className="block w-full text-center skeu-button accent" aria-label="See more transactions">See more...</a>
                    </section>
                </main>

            </div>
        </div>
    );
}