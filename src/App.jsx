import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const GOLD_BASE_PRICE = 75.33;

const priceHistoryData = {
  "24h": [74.5, 75.1, 75.33, 75.2, 74.9],
  "7d": [73.2, 74.0, 75.33, 74.8, 75.1, 75.5, 75.3],
  "30d": Array.from({ length: 30 }, (_, i) =>
    (70 + i * 0.2 + Math.sin(i / 5) * 0.8).toFixed(2)
  ),
};

function formatUSD(value) {
  return `$${parseFloat(value).toFixed(2)}`;
}

function formatGold(value) {
  return `${parseFloat(value).toFixed(4)} g`;
}

export default function GoldTokenPro() {
  const [step, setStep] = useState(0);
  const [usdInput, setUsdInput] = useState("");
  const [gramsToBuy, setGramsToBuy] = useState(0);
  const [gramsToSell, setGramsToSell] = useState("");
  const [usdFromSell, setUsdFromSell] = useState(0);
  const [priceRange, setPriceRange] = useState("7d");
  const [showWallet, setShowWallet] = useState(false);
  const [activeTab, setActiveTab] = useState("buy");
  const [showQR, setShowQR] = useState(false);
  const [livePrice, setLivePrice] = useState(GOLD_BASE_PRICE);
  const [walletBalance, setWalletBalance] = useState(3.27);

  // Simulate live price updates every 5s with smooth transition
  useEffect(() => {
    const interval = setInterval(() => {
      setLivePrice((prev) => {
        let change = (Math.random() - 0.5) * 0.3;
        let next = prev + change;
        if (next < 70) next = 70;
        if (next > 80) next = 80;
        return parseFloat(next.toFixed(2));
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Compute gold grams based on USD input
  useEffect(() => {
    const val = parseFloat(usdInput);
    setGramsToBuy(val > 0 ? val / livePrice : 0);
  }, [usdInput, livePrice]);

  // Compute USD from grams to sell input
  useEffect(() => {
    const val = parseFloat(gramsToSell);
    setUsdFromSell(val > 0 ? val * livePrice : 0);
  }, [gramsToSell, livePrice]);

  // Step content for onboarding
  const stepContent = [
    {
      title: "Welcome to GoldToken",
      description:
        "Buy, store, and transact tokenized fiscal gold securely and instantly.",
      icon: (
        <img
          src="https://cdn-icons-png.flaticon.com/512/196/196566.png"
          alt="Welcome icon"
          className="w-20 h-20 mx-auto mb-6"
          loading="lazy"
        />
      ),
    },
    {
      title: "Store & Transact",
      description:
        "Your gold is safely stored and can be used anytime for payments or exchanges.",
      icon: (
        <img
          src="https://cdn-icons-png.flaticon.com/512/616/616408.png"
          alt="Store icon"
          className="w-20 h-20 mx-auto mb-6"
          loading="lazy"
        />
      ),
    },
    {
      title: "Real-Time Pricing",
      description:
        "Watch live gold prices and market trends to make informed decisions.",
      icon: (
        <img
          src="https://cdn-icons-png.flaticon.com/512/1170/1170678.png"
          alt="Pricing icon"
          className="w-20 h-20 mx-auto mb-6"
          loading="lazy"
        />
      ),
    },
    {
      title: "Get Started",
      description: "Let's start buying and selling gold tokens now!",
      icon: (
        <img
          src="https://cdn-icons-png.flaticon.com/512/748/748122.png"
          alt="Get started icon"
          className="w-20 h-20 mx-auto mb-6"
          loading="lazy"
        />
      ),
    },
  ];

  // Animation variants for framer motion
  const stepVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  };

  // Chart component for price history (simple bar chart)
  function PriceChart({ range }) {
    const data = priceHistoryData[range];
    const maxPrice = Math.max(...data.map(Number));
    const minPrice = Math.min(...data.map(Number));

    return (
      <div
        role="img"
        aria-label={`Gold price chart for last ${range}`}
        className="flex items-end justify-between h-24 space-x-1 mt-3"
      >
        {data.map((price, i) => {
          const heightPercent =
            ((price - minPrice) / (maxPrice - minPrice || 1)) * 100 || 10;
          const isLatest = i === data.length - 1;
          return (
            <div
              key={i}
              title={`Day ${i + 1}: $${price}`}
              className={`bg-yellow-400 rounded-t-md transition-all duration-300 ${
                isLatest ? "bg-yellow-600" : "bg-yellow-400"
              }`}
              style={{ height: `${heightPercent}%`, width: "8%" }}
            ></div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-yellow-100 flex flex-col justify-between font-sans text-gray-900 px-6 py-8 max-w-lg mx-auto">
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-yellow-700">
          GoldToken
        </h1>
        <button
          aria-label="Open wallet"
          onClick={() => setShowWallet(true)}
          className="relative rounded-full p-2 bg-yellow-600 hover:bg-yellow-700 text-white shadow-md transition focus:outline-none focus:ring-4 focus:ring-yellow-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
            focusable="false"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 9V7a4 4 0 00-8 0v2M7 9v6a4 4 0 008 0V9"
            />
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13h14" />
          </svg>
          <span className="sr-only">Open Wallet</span>
        </button>
      </header>

      {/* Steps onboarding */}
      <AnimatePresence mode="wait">
        {step <= 3 && (
          <motion.section
            key={`step-${step}`}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={stepVariants}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl shadow-xl p-8 flex flex-col items-center"
            aria-live="polite"
          >
            {stepContent[step].icon}
            <h2 className="text-3xl font-bold text-yellow-700 mb-3 text-center">
              {stepContent[step].title}
            </h2>
            <p className="text-center text-gray-700 max-w-xs leading-relaxed mb-6">
              {stepContent[step].description}
            </p>
            <div className="flex justify-between w-full max-w-xs">
              <button
                onClick={() => setStep((s) => Math.max(0, s - 1))}
                disabled={step === 0}
                aria-disabled={step === 0}
                className={`px-6 py-3 rounded-full font-semibold transition ${
                  step === 0
                    ? "bg-yellow-200 text-yellow-400 cursor-not-allowed"
                    : "bg-yellow-500 text-white hover:bg-yellow-600"
                }`}
              >
                Back
              </button>
              <button
                onClick={() => setStep((s) => Math.min(4, s + 1))}
                className="px-6 py-3 rounded-full bg-yellow-600 text-white font-semibold hover:bg-yellow-700 transition"
                aria-label={step === 3 ? "Start using app" : "Next step"}
              >
                {step === 3 ? "Start" : "Next"}
              </button>
            </div>
            <div className="w-full mt-6 flex justify-center space-x-2">
              {[0, 1, 2, 3].map((i) => (
                <button
                  key={i}
                  aria-label={`Go to step ${i + 1}`}
                  onClick={() => setStep(i)}
                  className={`w-4 h-4 rounded-full transition-colors duration-300 focus:outline-none ${
                    step === i ? "bg-yellow-600" : "bg-yellow-300"
                  }`}
                />
              ))}
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Main interface */}
      {step === 4 && (
        <main className="flex flex-col space-y-8">
          {/* Live Price */}
          <section
            aria-label="Current gold price"
            className="flex justify-center items-center space-x-3 p-4 bg-yellow-50 rounded-xl shadow-inner text-yellow-700 font-semibold text-xl"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8 text-yellow-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
              focusable="false"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 8v8m-4-4h8"
              />
            </svg>
            <p>
              Live Gold Price:{" "}
              <span className="font-extrabold text-yellow-800 text-2xl">
                {formatUSD(livePrice)}
              </span>
            </p>
          </section>

          {/* Buy / Sell Tabs */}
          <section
            aria-label="Buy or sell gold tokens"
            className="bg-white rounded-3xl p-6 shadow-xl"
          >
            <div className="flex justify-center mb-6 space-x-4">
              {["buy", "sell"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-8 py-3 rounded-full font-semibold transition ${
                    activeTab === tab
                      ? "bg-yellow-600 text-white shadow-md"
                      : "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                  }`}
                  aria-selected={activeTab === tab}
                  role="tab"
                >
                  {tab === "buy" ? "Buy Gold" : "Sell Gold"}
                </button>
              ))}
            </div>

            {/* Buy Tab */}
            {activeTab === "buy" && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert(
                    `You bought ${gramsToBuy.toFixed(4)} grams for ${formatUSD(
                      gramsToBuy * livePrice
                    )}!`
                  );
                  setUsdInput("");
                }}
                aria-label="Buy gold token form"
                className="space-y-4"
              >
                <label htmlFor="usdInput" className="block font-semibold">
                  Amount to spend (USD)
                </label>
                <input
                  type="number"
                  id="usdInput"
                  min="0"
                  step="0.01"
                  value={usdInput}
                  onChange={(e) => setUsdInput(e.target.value)}
                  className="w-full rounded-lg border border-yellow-300 focus:ring-4 focus:ring-yellow-400 focus:border-yellow-600 px-4 py-3 text-lg font-medium text-yellow-900 placeholder-yellow-400 transition"
                  placeholder="Enter USD amount"
                  required
                  aria-describedby="buyHelp"
                />
                <p
                  id="buyHelp"
                  className="text-yellow-700 font-semibold text-right"
                  aria-live="polite"
                >
                  ≈ {formatGold(gramsToBuy)} gold grams
                </p>

                <button
                  type="submit"
                  disabled={gramsToBuy <= 0}
                  className={`w-full py-3 rounded-3xl font-bold text-white transition ${
                    gramsToBuy > 0
                      ? "bg-yellow-600 hover:bg-yellow-700 shadow-lg"
                      : "bg-yellow-300 cursor-not-allowed"
                  }`}
                >
                  Buy Now
                </button>
              </form>
            )}

            {/* Sell Tab */}
            {activeTab === "sell" && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (parseFloat(gramsToSell) > walletBalance) {
                    alert(
                      `Insufficient gold grams! Your balance: ${formatGold(
                        walletBalance
                      )}`
                    );
                    return;
                  }
                  alert(
                    `You sold ${parseFloat(gramsToSell).toFixed(
                      4
                    )} grams for ${formatUSD(usdFromSell)}!`
                  );
                  setWalletBalance((bal) => bal - parseFloat(gramsToSell));
                  setGramsToSell("");
                }}
                aria-label="Sell gold token form"
                className="space-y-4"
              >
                <label htmlFor="gramsSellInput" className="block font-semibold">
                  Gold grams to sell
                </label>
                <input
                  type="number"
                  id="gramsSellInput"
                  min="0"
                  step="0.0001"
                  max={walletBalance}
                  value={gramsToSell}
                  onChange={(e) => setGramsToSell(e.target.value)}
                  className="w-full rounded-lg border border-yellow-300 focus:ring-4 focus:ring-yellow-400 focus:border-yellow-600 px-4 py-3 text-lg font-medium text-yellow-900 placeholder-yellow-400 transition"
                  placeholder={`Max: ${walletBalance.toFixed(4)}`}
                  required
                  aria-describedby="sellHelp"
                />
                <p
                  id="sellHelp"
                  className="text-yellow-700 font-semibold text-right"
                  aria-live="polite"
                >
                  ≈ {formatUSD(usdFromSell)}
                </p>
                <button
                  type="submit"
                  disabled={
                    parseFloat(gramsToSell) <= 0 ||
                    parseFloat(gramsToSell) > walletBalance
                  }
                  className={`w-full py-3 rounded-3xl font-bold text-white transition ${
                    parseFloat(gramsToSell) > 0 &&
                    parseFloat(gramsToSell) <= walletBalance
                      ? "bg-yellow-600 hover:bg-yellow-700 shadow-lg"
                      : "bg-yellow-300 cursor-not-allowed"
                  }`}
                >
                  Sell Now
                </button>
              </form>
            )}
          </section>

          {/* Price History and Chart */}
          <section
            aria-label="Gold price history and chart"
            className="bg-white rounded-3xl p-6 shadow-xl"
          >
            <h3 className="text-yellow-700 font-bold mb-4 text-lg">
              Price History
            </h3>
            <div className="flex space-x-4 justify-center">
              {Object.keys(priceHistoryData).map((range) => (
                <button
                  key={range}
                  onClick={() => setPriceRange(range)}
                  className={`px-4 py-2 rounded-full font-semibold transition ${
                    priceRange === range
                      ? "bg-yellow-600 text-white shadow-md"
                      : "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                  }`}
                  aria-pressed={priceRange === range}
                >
                  Last {range}
                </button>
              ))}
            </div>
            <PriceChart range={priceRange} />
            <table className="w-full mt-4 text-left text-yellow-900 text-sm rounded-md overflow-hidden">
              <thead className="bg-yellow-200 rounded-md">
                <tr>
                  <th className="py-2 px-3">Price (USD)</th>
                  <th className="py-2 px-3">Change</th>
                  <th className="py-2 px-3">Day</th>
                </tr>
              </thead>
              <tbody>
                {priceHistoryData[priceRange].map((price, i) => {
                  const change = price - GOLD_BASE_PRICE;
                  return (
                    <tr
                      key={i}
                      className={`odd:bg-yellow-50 even:bg-yellow-100`}
                    >
                      <td className="py-2 px-3">{formatUSD(price)}</td>
                      <td
                        className={`py-2 px-3 font-semibold ${
                          change >= 0 ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {change >= 0 ? "+" : ""}
                        {change.toFixed(2)}
                      </td>
                      <td className="py-2 px-3">Day {i + 1}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </section>
        </main>
      )}

      {/* Wallet Modal */}
      <AnimatePresence>
        {showWallet && (
          <motion.div
            key="wallet"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="walletTitle"
            className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center p-4 z-50"
          >
            <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-xl relative">
              <h2
                id="walletTitle"
                className="text-yellow-700 font-extrabold text-2xl mb-4"
              >
                Wallet Balance
              </h2>
              <p className="text-yellow-900 text-xl font-semibold mb-4">
                {formatGold(walletBalance)} grams of gold tokens
              </p>
              <button
                onClick={() => setShowWallet(false)}
                aria-label="Close wallet"
                className="absolute top-4 right-4 text-yellow-600 hover:text-yellow-800 focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <button
                onClick={() => {
                  setShowQR(true);
                }}
                className="mt-4 w-full bg-yellow-600 text-white py-3 rounded-3xl font-bold hover:bg-yellow-700 transition"
              >
                Receive Payment (QR)
              </button>

              {/* QR Modal */}
              <AnimatePresence>
                {showQR && (
                  <motion.div
                    key="qr"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3 }}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="qrTitle"
                    className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-60"
                  >
                    <div className="bg-white p-6 rounded-3xl max-w-xs w-full shadow-xl relative flex flex-col items-center">
                      <h3
                        id="qrTitle"
                        className="text-yellow-700 font-extrabold mb-4"
                      >
                        Scan to Pay GoldToken
                      </h3>
                      <img
                        src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=goldtoken-wallet-address"
                        alt="QR code to receive gold token payments"
                        className="mb-4"
                        loading="lazy"
                      />
                      <button
                        onClick={() => setShowQR(false)}
                        className="bg-yellow-600 text-white py-2 px-6 rounded-full font-semibold hover:bg-yellow-700 transition"
                      >
                        Close
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="text-center mt-10 text-yellow-700 font-semibold select-none">
        &copy; 2025 GoldToken Inc.
      </footer>
    </div>
  );
}
