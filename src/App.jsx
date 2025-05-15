import { useState, useEffect } from "react";

const goldPrice = 75.33;
const priceHistory = {
  "24h": [74.5, 75.1, 75.33],
  "7d": [73.2, 74.0, 75.33],
  "30d": [70.0, 72.5, 75.33],
};

const stepImages = [
  "https://www.logoai.com/uploads/icon/2017/07/03/14990782657194371.svg",
  "https://img.freepik.com/premium-vector/ethereum-vector-coin_1078-322.jpg?semt=ais_hybrid&w=740",
  "https://media.istockphoto.com/id/1325041603/photo/graph-icon.jpg?s=612x612&w=0&k=20&c=JlscaFx5Zd3Bi6dkYMyja-2uVmHxIEgkeH-G5kGeIHk=",
  "https://atlas-content-cdn.pixelsquid.com/stock-images/gold-icon-settings-computer-9K81AD4-600.jpg",
];

const fallbackEmojis = ["📱", "🏦", "💰", "⚙️"];

export default function GoldTokenApp() {
  const [step, setStep] = useState(0);
  const [usd, setUsd] = useState("");
  const [goldToBuy, setGoldToBuy] = useState(0);
  const [goldToSell, setGoldToSell] = useState("");
  const [sellValue, setSellValue] = useState(0);
  const [priceRange, setPriceRange] = useState("7d");
  const [showWallet, setShowWallet] = useState(false);
  const [activeTab, setActiveTab] = useState("buy");
  const [showQR, setShowQR] = useState(false);

  // Animate chart points drawing
  const [animatedPoints, setAnimatedPoints] = useState([]);

  useEffect(() => {
    const data = priceHistory[priceRange];
    let index = 0;
    setAnimatedPoints([]);
    const interval = setInterval(() => {
      setAnimatedPoints((prev) => [...prev, data[index]]);
      index++;
      if (index >= data.length) clearInterval(interval);
    }, 250);
    return () => clearInterval(interval);
  }, [priceRange]);

  const nextStep = () => {
    if (step < 3) setStep(step + 1);
    else setStep(4);
  };

  const prevStep = () => setStep((s) => Math.max(s - 1, 0));

  const handleBuyChange = (e) => {
    const value = e.target.value;
    setUsd(value);
    const goldAmount = parseFloat(value) / goldPrice;
    setGoldToBuy(goldAmount || 0);
  };

  const handleSellChange = (e) => {
    const value = e.target.value;
    setGoldToSell(value);
    const usdValue = parseFloat(value) * goldPrice;
    setSellValue(usdValue || 0);
  };

  const buildPoints = (points) => {
    if (points.length === 0) return "";
    const max = Math.max(...priceHistory[priceRange]);
    const min = Math.min(...priceHistory[priceRange]);
    return points
      .map((p, i, arr) => {
        const x = (i / (arr.length - 1)) * 100;
        const y = 40 - ((p - min) / (max - min || 1)) * 30;
        return `${x},${y}`;
      })
      .join(" ");
  };

  const StepImage = ({ step }) => (
    <div className="mb-4 flex justify-center">
      <img
        src={stepImages[step]}
        alt={`Step ${step + 1}`}
        onError={(e) => {
          e.target.onerror = null;
          e.target.replaceWith(document.createTextNode(fallbackEmojis[step]));
        }}
        className="w-24 h-24 object-contain drop-shadow-lg"
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-yellow-100 text-gray-900 flex flex-col justify-between px-6 py-8 font-sans select-none">
      {/* Header */}
      <header className="flex justify-between items-center mb-10">
        <button
          aria-label="Notifications"
          className="p-3 rounded-full bg-white shadow-md hover:shadow-lg transition"
        >
          <svg
            className="w-6 h-6 text-yellow-600"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 17h5l-1.4-1.4C18.8 15.2 18 13.5 18 12V8a6 6 0 00-12 0v4c0 1.5-.8 3.2-1.6 3.6L3 17h5m6 0v1a3 3 0 11-6 0v-1h6z"
            />
          </svg>
        </button>
        <div className="w-10 h-10 rounded-full bg-yellow-500 text-white flex items-center justify-center font-semibold text-lg shadow-md">
          U
        </div>
      </header>

      {/* Main */}
      <main className="max-w-md mx-auto w-full space-y-8">
        {/* Onboarding Steps */}
        {step <= 3 && (
          <section
            aria-label="Onboarding steps"
            className="bg-white rounded-3xl shadow-xl p-8 flex flex-col items-center text-center space-y-3"
          >
            <div className="flex w-full justify-between space-x-2 mb-8">
              {[0, 1, 2, 3].map((s) => (
                <div
                  key={s}
                  className={`flex-1 h-3 rounded-full transition-colors duration-300 ${
                    step >= s ? "bg-yellow-500" : "bg-yellow-200"
                  }`}
                />
              ))}
            </div>

            <StepImage step={step} />

            {{
              0: (
                <>
                  <h2 className="text-3xl font-extrabold text-yellow-600 mb-2">
                    Welcome to GoldToken
                  </h2>
                  <p className="text-gray-700 max-w-xs leading-relaxed">
                    Buy and manage tokenized fiscal gold securely and easily.
                  </p>
                </>
              ),
              1: (
                <>
                  <h2 className="text-3xl font-extrabold text-yellow-600 mb-2">
                    Store &amp; Transact
                  </h2>
                  <p className="text-gray-700 max-w-xs leading-relaxed">
                    Your gold is stored securely and can be used for payments or
                    exchanged anytime.
                  </p>
                </>
              ),
              2: (
                <>
                  <h2 className="text-3xl font-extrabold text-yellow-600 mb-2">
                    Real-Time Prices
                  </h2>
                  <p className="text-gray-700 max-w-xs leading-relaxed">
                    Monitor the live price of gold tokens to make smart decisions.
                  </p>
                </>
              ),
              3: (
                <>
                  <h2 className="text-3xl font-extrabold text-yellow-600 mb-2">
                    Get Started
                  </h2>
                  <p className="text-gray-700 max-w-xs leading-relaxed">
                    You're ready to buy and sell gold tokens!
                  </p>
                </>
              ),
            }[step]}

            <div className="flex w-full justify-between mt-10">
              {step > 0 && (
                <button
                  onClick={prevStep}
                  className="px-5 py-3 rounded-full bg-gray-200 text-gray-800 font-semibold hover:bg-gray-300 transition"
                >
                  Back
                </button>
              )}
              <button
                onClick={nextStep}
                className="ml-auto px-6 py-3 rounded-full bg-yellow-500 text-white font-semibold shadow-lg hover:bg-yellow-600 transition"
              >
                {step === 3 ? "Start" : "Next"}
              </button>
            </div>
          </section>
        )}

        {/* Main App */}
        {step > 3 && !showWallet && (
          <section
            aria-label="Main app interface"
            className="bg-yellow-50 rounded-3xl shadow-xl p-8 max-w-md mx-auto"
          >
            {/* Tabs */}
            <nav className="flex justify-between mb-6 rounded-xl bg-yellow-100 p-2 shadow-inner">
              {["buy", "sell", "pay"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveTab(tab);
                    setShowQR(false);
                  }}
                  className={`flex-1 text-center font-semibold text-sm rounded-xl px-4 py-2 transition-colors duration-300 ${
                    activeTab === tab
                      ? "bg-yellow-500 text-white shadow-lg"
                      : "bg-white text-yellow-700 hover:bg-yellow-200"
                  }`}
                  aria-current={activeTab === tab ? "page" : undefined}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>

            {/* Tab Content */}
            <div className="bg-white rounded-2xl p-6 shadow-inner min-h-[240px] flex flex-col justify-center">
              {activeTab === "buy" && (
                <>
                  <h2 className="text-2xl font-bold text-yellow-600 mb-5 text-center">
                    Buy Gold
                  </h2>
                  <input
                    type="number"
                    placeholder="Enter USD amount"
                    value={usd}
                    onChange={handleBuyChange}
                    className="w-full p-4 rounded-xl border border-yellow-300 focus:outline-none focus:ring-4 focus:ring-yellow-400 transition"
                    aria-label="Enter USD amount to buy gold"
                  />
                  <p className="mt-4 text-center text-gray-700 text-lg font-semibold">
                    You will get{" "}
                    <span className="text-yellow-600">{goldToBuy.toFixed(4)}</span>{" "}
                    grams of gold
                  </p>
                </>
              )}

              {activeTab === "sell" && (
                <>
                  <h2 className="text-2xl font-bold text-yellow-600 mb-5 text-center">
                    Sell Gold
                  </h2>
                  <input
                    type="number"
                    placeholder="Grams to sell"
                    value={goldToSell}
                    onChange={handleSellChange}
                    className="w-full p-4 rounded-xl border border-yellow-300 focus:outline-none focus:ring-4 focus:ring-yellow-400 transition"
                    aria-label="Enter grams of gold to sell"
                  />
                  <p className="mt-4 text-center text-gray-700 text-lg font-semibold">
                    You will receive{" "}
                    <span className="text-yellow-600">${sellValue.toFixed(2)}</span>
                  </p>
                </>
              )}

              {activeTab === "pay" && showQR && (
                <div className="flex flex-col items-center justify-center">
                  <h2 className="text-2xl font-bold text-yellow-600 mb-6 text-center">
                    Pay with Gold
                  </h2>
                  <img
                    src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=goldtoken-payment"
                    alt="GoldToken payment QR code"
                    className="border p-3 rounded-2xl shadow-lg"
                  />
                  <p className="mt-5 text-gray-700 max-w-xs text-center leading-relaxed">
                    Scan this QR code to complete your payment.
                  </p>
                  <button
                    onClick={() => setShowQR(false)}
                    className="mt-8 px-6 py-3 rounded-full bg-yellow-500 text-white font-semibold shadow hover:bg-yellow-600 transition"
                  >
                    Close QR
                  </button>
                </div>
              )}

              {activeTab === "pay" && !showQR && (
                <div className="flex justify-center items-center h-full text-yellow-600 font-semibold italic">
                  <p>Tap "Show QR" to pay with GoldToken.</p>
                  <button
                    onClick={() => setShowQR(true)}
                    className="ml-4 px-5 py-2 bg-yellow-500 text-white rounded-lg font-bold shadow hover:bg-yellow-600 transition"
                    aria-label="Show payment QR code"
                  >
                    Show QR
                  </button>
                </div>
              )}
            </div>

            {/* Price Chart */}
            <section
              aria-label="Gold price chart"
              className="mt-10 bg-white rounded-3xl p-6 shadow-lg"
            >
              <h3 className="text-lg font-semibold text-yellow-600 mb-4">
                Gold Price - Last {priceRange.toUpperCase()}
              </h3>
              <div className="flex justify-between mb-3 text-yellow-700 font-semibold">
                {["24h", "7d", "30d"].map((range) => (
                  <button
                    key={range}
                    onClick={() => setPriceRange(range)}
                    className={`text-sm px-3 py-1 rounded-full transition ${
                      priceRange === range
                        ? "bg-yellow-500 text-white shadow"
                        : "hover:bg-yellow-200"
                    }`}
                  >
                    {range.toUpperCase()}
                  </button>
                ))}
              </div>

              <svg
                viewBox="0 0 100 40"
                className="w-full h-24"
                aria-hidden="true"
                role="img"
                preserveAspectRatio="none"
              >
                <polyline
                  fill="none"
                  stroke="#fbbf24"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  points={buildPoints(animatedPoints)}
                  style={{ transition: "all 0.3s ease-in-out" }}
                />
                <line
                  x1="0"
                  y1="40"
                  x2="100"
                  y2="40"
                  stroke="#fbbf24"
                  strokeWidth="1"
                />
              </svg>
              <p className="text-center text-yellow-700 mt-2 font-medium">
                Current Price: <span className="font-bold">${goldPrice}</span> per gram
              </p>
            </section>

            {/* Wallet Button */}
            <button
              onClick={() => setShowWallet(true)}
              className="mt-8 w-full bg-yellow-600 text-white font-bold py-3 rounded-2xl shadow-lg hover:bg-yellow-700 transition"
              aria-label="Open wallet"
            >
              Open Wallet
            </button>
          </section>
        )}

        {/* Wallet Popup */}
        {showWallet && (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="walletTitle"
            className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex justify-center items-center p-4 z-50"
          >
            <div className="bg-yellow-50 rounded-3xl shadow-2xl max-w-md w-full p-8 relative">
              <h2
                id="walletTitle"
                className="text-2xl font-extrabold text-yellow-600 mb-6 text-center"
              >
                Your GoldToken Wallet
              </h2>
              <p className="text-gray-700 text-center mb-10">
                Balance:{" "}
                <span className="font-semibold text-yellow-600">23.45g</span> (~$
                {(23.45 * goldPrice).toFixed(2)})
              </p>
              <button
                onClick={() => setShowWallet(false)}
                aria-label="Close wallet"
                className="absolute top-5 right-5 text-yellow-600 hover:text-yellow-800 transition"
              >
                <svg
                  className="w-7 h-7"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <button
                onClick={() => alert("Send gold functionality coming soon!")}
                className="w-full py-3 bg-yellow-500 text-white font-bold rounded-xl hover:bg-yellow-600 transition"
              >
                Send Gold
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="text-center text-yellow-600 font-semibold mt-12 text-sm">
        &copy; 2025 GoldToken. All rights reserved.
      </footer>
    </div>
  );
}
