import { RedirectionButton } from "../components/RedirectionButton";
import { Navbar } from "../components/Navbar";


export default function Home() {
    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center p-4">

            <Navbar />

            <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-4 gap-6 items-stretch bg-linear-to-b from-white-2 to-black-8 rounded-2xl shadow-outer border border-accent-alpha p-4">

                {/* Left: portrait aside with image */}
                <aside className="md:flex md:col-span-2 bg-linear-to-br from-white-2 to-black-8 border-2 border-accent-alpha flex items-center justify-center rounded-sm" aria-hidden="false">
                    <div className="w-full h-96 md:h-160">
                        <img
                            // src=""
                            src="https://i.redd.it/s763f2wtp3if1.gif"
                            alt="Portrait"
                            className="object-cover w-full h-full rounded-sm"
                        />
                    </div>
                </aside>

                {/* Right: main control panel (wider) */}
                <main className="md:col-span-2 flex flex-col gap-4 h-full">
                    <section className="bg-linear-to-b from-white-2 to-black-12 rounded-xl shadow-card border border-white-3 p-4 text-contrast" aria-labelledby="balance-heading">
                        <h2 id="balance-heading" className="text-sm uppercase opacity-80">Balance</h2>
                        <div className="text-3xl font-bold mt-2" aria-live="polite">$0.00</div>
                        <hr className="my-3 border-teal-100/20" />
                        <div className="opacity-90">Miku - Jose Jose De La Cruz</div>
                        <div className="text-sm font-semibold mt-1">Public code: MK-23456789</div>
                    </section>

                    <div className="flex flex-col gap-3">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <div>
                                <RedirectionButton buttonName="Deposit" buttonLink="/request" buttonColor="primary" className="w-full"/>
                            </div>
                            <div>
                                <RedirectionButton buttonName="Send" buttonLink="/send" buttonColor="primary" className="w-full"/>
                            </div>
                            <div>
                                <RedirectionButton buttonName="Withdraw" buttonLink="/withdraw" buttonColor="primary" className="w-full"/>
                            </div>
                        </div>
                    </div>

                    <section id="transactions" className="mt-4 flex flex-col flex-1 min-h-0">
                        <h3 className="text-lg text-white font-bold mb-2">Your last transaction</h3>
                        <div id="component-list-transactions" className="bg-linear-to-b from-white-1 to-black-8 rounded-sm p-3 border border-white-3 min-h-23 flex items-center justify-center py-5 px-3 mb-2 flex-1 text-white/45" role="region" aria-live="polite">
                            <div className="flex flex-col items-center justify-center w-full h-full">
                                <img src="" alt="sticker here" className="w-25 h-25 mb-4" />
                                There's nothing here yet.
                            </div>
                        </div>
                        <RedirectionButton buttonName="See more..." buttonLink="/transactions" buttonColor="primary"/>
                    </section>
                </main>

            </div>
        </div>
    );
}