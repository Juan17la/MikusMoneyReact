import mikusNotFound from "../assets/mikusNotFound.png";

export default function Error404() {
  return (
    <>
      <div className="w-full min-h-screen grid items-center justify-center">
        <div className="bg-linear-to-b from-white-2 to-black-8 rounded-2xl shadow-outer border border-accent-alpha w-full max-w-xl p-8 flex flex-col items-center justify-center">
          <img
            src={mikusNotFound}
            alt="Not Found"
            className="w-35 h-35 mb-4"
            loading="lazy"
          />
          <h1 className="text-4xl font-bold mb-8 text-contrast">
            404 - Page Not Found
          </h1>
          <p className="text-contrast mb-8 text-center">
            Sorry, the page you are looking for does not exist or has been
            moved.
          </p>
          <a
            href="/account"
            className="underline text-accent hover:text-accent/40 transition-colors duration-200"
          >
            Go Home
          </a>
        </div>
      </div>
    </>
  );
}
