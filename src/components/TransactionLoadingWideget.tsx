import mikusNotFound from "../assets/mikusNotFound.png";

export default function TransactionsLoadingWidget() {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-w-full min-h-full py-10 px-8">
        <img
          src={mikusNotFound}
          alt="sticker here"
          className="w-25 h-25 mb-4"
          loading="lazy"
        />
        <p className="text-white/60 text-center">
          Loading transactions...
        </p>
      </div>
    </>
  );
}
