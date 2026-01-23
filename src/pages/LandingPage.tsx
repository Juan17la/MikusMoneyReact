import { useNavigate } from "react-router";
import { ArrowRight, TrendingUp, PiggyBank, Globe, Code, Github } from "lucide-react";
import mikusLoginSticker from "../assets/mikusLoginSticker.png";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full flex flex-col bg-linear-to-b from-bg-deep via-bg to-bg-deep">
      {/* Hero Section */}
      <section className="w-full px-4 py-12 md:py-20 flex flex-col items-center justify-center text-center">
        <div className="max-w-4xl">
          <div className="w-full mb-8 flex justify-center">
            <img src={mikusLoginSticker} alt="Mikus Login Sticker" className="w-65"/>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-contrast mb-4 drop-shadow-lg">
            Welcome to Mikus Money
          </h1>
          <p className="text-lg md:text-xl text-accent-weak mb-8 max-w-2xl mx-auto">
            A fun and interactive way to manage your finances with a Miku-inspired twist. Track accounts, save money, and monitor transactions all in one place.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate("/auth/register")}
              className="px-8 py-3 bg-linear-to-r from-accent to-accent-weak text-bg font-bold rounded-lg hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
            >
              Get Started <ArrowRight size={20} />
            </button>
            <button
              onClick={() => navigate("/auth/login")}
              className="px-8 py-3 border-2 border-accent text-accent font-bold rounded-lg hover:bg-accent-10 transition-all duration-200"
            >
              Sign In
            </button>
          </div>
        </div>
      </section>

      {/* The Miku Universe */}
      <section className="w-full px-4 py-16 bg-bg text-center">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center mb-4">
            <Globe className="w-12 h-12 text-accent" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-contrast mb-6">The Miku Universe</h2>
          <p className="text-lg md:text-xl text-accent-weak leading-relaxed max-w-3xl mx-auto">
            In this universe, every user is a <strong className="text-accent">Miku</strong>! But each Miku is unique.
            You'll get a generated name like <em className="text-contrast">"Miku Fernando 'The Goat' Alonso"</em> and a unique
            public code (e.g., <span className="font-mono bg-accent-10 px-2 py-1 rounded text-accent">125364789</span>) 
            to identify yourself. Use this code to make transactions and interact with other Mikus in the network.
          </p>
        </div>
      </section>

      {/* What You Can Do */}
      <section className="w-full px-4 py-16 bg-bg-deep">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-contrast text-center mb-12">What You Can Do</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-bg p-8 rounded-xl shadow-lg border border-accent-alpha hover:border-accent transition-all duration-300 hover:-translate-y-1">
              <div className="bg-accent-10 w-fit p-4 rounded-full mb-6 text-accent">
                <ArrowRight className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-contrast mb-3">Transact & Transfer</h3>
              <p className="text-accent-weak">
                Send money instantly to other Mikus using their unique public code. Safe, fast, and stylish transfers across the universe.
              </p>
            </div>
            {/* Feature 2 */}
            <div className="bg-bg p-8 rounded-xl shadow-lg border border-accent-alpha hover:border-accent transition-all duration-300 hover:-translate-y-1">
              <div className="bg-accent-10 w-fit p-4 rounded-full mb-6 text-accent">
                <TrendingUp className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-contrast mb-3">Deposit & Withdraw</h3>
              <p className="text-accent-weak">
                Manage your funds with ease. Add money to your account or withdraw whenever you need to seamlessly control your flow.
              </p>
            </div>
            {/* Feature 3 */}
            <div className="bg-bg p-8 rounded-xl shadow-lg border border-accent-alpha hover:border-accent transition-all duration-300 hover:-translate-y-1">
              <div className="bg-accent-10 w-fit p-4 rounded-full mb-6 text-accent">
                <PiggyBank className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-contrast mb-3">Savings Pig</h3>
              <p className="text-accent-weak">
                Create custom savings goals! Put money aside in your personal "Savings Pig" and watch it grow for your next big purchase.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Origin Story */}
      <section className="w-full px-4 pt-16 pb-20 bg-bg">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <Code className="w-12 h-12 text-accent" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-contrast mb-8">How This Came To Be</h2>
          <div className="space-y-6 text-lg text-accent-weak text-left md:text-center leading-relaxed">
            <p>
              This project was born from a desire to practice both backend and frontend skills.
              While my main focus is on the backend, I put a huge effort into creating an
              attention-grabbing frontend featuring Miku-inspired fanart and design.
            </p>
            <p>
              Why Miku? I was bored. I didn't want to make just another plain, boring clone of
              standard banking apps like CashApp or Nequi. So, I decided to inject some personality,
              creating a universe about Miku!
            </p>
          </div>
        </div>
      </section>

      {/* Promotion */}
      <section className="w-full px-4 py-20 bg-linear-to-tr from-accent/65 to-accent-weak/25 text-bg text-center relative overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white drop-shadow-md">Check Out The Code</h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto text-white/90 font-medium">
            Interested in how I made this? Check out the repositories, give them a star (if you want to), and feel free to collaborate!
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 px-8 py-4 bg-white text-black font-bold text-lg rounded-xl hover:shadow-2xl hover:scale-101 transition-all duration-200"
            >
              <Github size={24} /> Frontend Repo
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 px-8 py-4 bg-black/20 text-white border-2 border-white/50 font-bold text-lg rounded-xl hover:bg-black/30 hover:shadow-xl hover:scale-101 transition-all duration-200"
            >
              <Github size={24} /> Backend Repo
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full px-4 py-8 md:py-12 mt-12 border-t border-accent-alpha bg-linear-to-b from-black-8 to-bg-deep">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* About */}
            <div>
              <h4 className="text-lg font-bold text-contrast mb-3">About Mikus Money</h4>
              <p className="text-accent-weak text-sm">
                Mikus Money is an educational project created for learning and personal development purposes. It demonstrates modern web development practices and financial tracking concepts.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-bold text-contrast mb-3">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="/auth/login" className="text-accent-weak hover:text-accent transition-colors">
                    Login
                  </a>
                </li>
                <li>
                  <a href="/auth/register" className="text-accent-weak hover:text-accent transition-colors">
                    Register
                  </a>
                </li>
                <li>
                  <a href="#" className="text-accent-weak hover:text-accent transition-colors">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>

            {/* Attribution */}
            <div>
              <h4 className="text-lg font-bold text-contrast mb-3">Attribution</h4>
              <p className="text-accent-weak text-sm">
                Miku Hatsune is a character owned by Crypton Future Media. The Miku Hatsune artwork, design, and intellectual property rights belong to their respective creators. This project is created by a fan and is purely for educational purposes.
              </p>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="border-t border-accent-alpha pt-6 text-center">
            <p className="text-muted text-xs">
              © 2026 Mikus Money. This is a fan project. All character rights belong to their respective owners.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
