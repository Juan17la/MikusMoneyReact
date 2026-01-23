import mikusNotFound from "../assets/mikusNotFound.png";

export default function TransactionsNotFoundWidget() {
  return (
    <>
      <div className="flex flex-col items-center justify-center w-full h-full">
        <img
          src={mikusNotFound}
          alt="sticker here"
          className="w-25 h-25 mb-4 opacity-80"
          loading="lazy"
        />
        <h2>No Transactions Found</h2>
      </div>
    </>
  );
}
