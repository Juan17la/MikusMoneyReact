import { useNavigate } from "react-router";
import { ArrowRight, TrendingUp, PiggyBank, Send } from "lucide-react";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full flex flex-col bg-gradient-to-b from-bg-deep via-bg to-bg-deep">
      {/* Hero Section */}
      <section className="w-full px-4 py-12 md:py-20 flex flex-col items-center justify-center text-center">
        <div className="max-w-4xl">
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

      {/* Features Section */}
      <section className="w-full px-4 py-12 md:py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-contrast text-center mb-12">
            Key Features
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1: Account Management */}
            <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-linear-to-b from-white-2 to-black-8 border border-accent-alpha hover:border-accent transition-all duration-200">
              <div className="w-16 h-16 bg-linear-to-r from-accent-weak to-accent rounded-full flex items-center justify-center mb-4">
                <TrendingUp size={32} className="text-bg" />
              </div>
              <h3 className="text-xl font-bold text-contrast mb-3">Account Management</h3>
              <p className="text-accent-weak">
                Keep track of all your accounts in one place. Monitor balances, view account details, and manage multiple accounts effortlessly.
              </p>
            </div>

            {/* Feature 2: Savings Goals */}
            <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-linear-to-b from-white-2 to-black-8 border border-accent-alpha hover:border-accent transition-all duration-200">
              <div className="w-16 h-16 bg-linear-to-r from-accent-weak to-accent rounded-full flex items-center justify-center mb-4">
                <PiggyBank size={32} className="text-bg" />
              </div>
              <h3 className="text-xl font-bold text-contrast mb-3">Savings Piggy Bank</h3>
              <p className="text-accent-weak">
                Create custom savings goals and watch them grow. Deposit money into your piggy banks and track your progress toward your financial dreams.
              </p>
            </div>

            {/* Feature 3: Transaction Tracking */}
            <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-linear-to-b from-white-2 to-black-8 border border-accent-alpha hover:border-accent transition-all duration-200">
              <div className="w-16 h-16 bg-linear-to-r from-accent-weak to-accent rounded-full flex items-center justify-center mb-4">
                <Send size={32} className="text-bg" />
              </div>
              <h3 className="text-xl font-bold text-contrast mb-3">Transaction History</h3>
              <p className="text-accent-weak">
                Track every deposit, withdrawal, and transfer. View your complete transaction history and understand where your money goes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="w-full px-4 py-12 md:py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-contrast text-center mb-12">
            How It Works
          </h2>

          <div className="space-y-6">
            {/* Step 1 */}
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 rounded-full bg-linear-to-r from-accent to-accent-weak flex items-center justify-center flex-shrink-0">
                <span className="text-bg font-bold text-lg">1</span>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-contrast mb-2">Create Your Account</h3>
                <p className="text-accent-weak">
                  Sign up with your email and create a secure account. It takes just a few minutes to get started.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 rounded-full bg-linear-to-r from-accent to-accent-weak flex items-center justify-center flex-shrink-0">
                <span className="text-bg font-bold text-lg">2</span>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-contrast mb-2">Add Your Accounts</h3>
                <p className="text-accent-weak">
                  Create accounts to organize your money. You can have as many accounts as you need for different purposes.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 rounded-full bg-linear-to-r from-accent to-accent-weak flex items-center justify-center flex-shrink-0">
                <span className="text-bg font-bold text-lg">3</span>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-contrast mb-2">Start Managing Transactions</h3>
                <p className="text-accent-weak">
                  Deposit, withdraw, and transfer money between accounts. Track all your movements in real-time.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 rounded-full bg-linear-to-r from-accent to-accent-weak flex items-center justify-center flex-shrink-0">
                <span className="text-bg font-bold text-lg">4</span>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-contrast mb-2">Set Savings Goals</h3>
                <p className="text-accent-weak">
                  Create piggy banks for different savings goals. Stay motivated by watching your progress grow.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full px-4 py-12 md:py-16">
        <div className="max-w-2xl mx-auto text-center p-8 rounded-2xl bg-linear-to-r from-accent-30 to-accent-15 border border-accent-alpha">
          <h2 className="text-2xl md:text-3xl font-bold text-contrast mb-4">
            Ready to Take Control of Your Finances?
          </h2>
          <p className="text-accent-weak mb-6">
            Join today and start your financial journey with Mikus Money. It's free and easy!
          </p>
          <button
            onClick={() => navigate("/register")}
            className="px-8 py-3 bg-linear-to-r from-accent to-accent-weak text-bg font-bold rounded-lg hover:shadow-lg transition-all duration-200"
          >
            Create Account Now
          </button>
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
            <p className="text-accent-weak text-xs mb-2">
              ⚠️ Disclaimer: This is a learning project and should not be used for real financial management.
            </p>
            <p className="text-muted text-xs">
              © 2026 Mikus Money. This is a fan project. All character rights belong to their respective owners.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
