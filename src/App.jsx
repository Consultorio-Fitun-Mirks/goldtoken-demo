import { useState } from "react";

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

  const goldPrice = 75.33;
  const priceHistory = {
    "24h": [74.5, 75.1, 75.33],
    "7d": [73.2, 74.0, 75.33],
    "30d": [70.0, 72.5, 75.33],
  };

  const nextStep = () => {
    if (step < 3) setStep(step + 1);
    else setStep(4);
  };
  const prevStep = () => setStep((s) => s - 1);

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

  const StepIndicator = () => (
    <div className="flex justify-between mb-6">
      {[0, 1, 2, 3].map((s) => (
        <div
          key={s}
          className={`flex-1 h-2 mx-1 rounded-full ${
            step >= s ? "bg-yellow-500" : "bg-gray-200"
          }`}
        ></div>
      ))}
    </div>
  );

  const StepImage = ({ step }) => {
    const images = [
      "https://www.logoai.com/uploads/icon/2017/07/03/14990782657194371.svg",
      "https://img.freepik.com/premium-vector/ethereum-vector-coin_1078-322.jpg?semt=ais_hybrid&w=740",
      "https://media.istockphoto.com/id/1325041603/photo/graph-icon.jpg?s=612x612&w=0&k=20&c=JlscaFx5Zd3Bi6dkYMyja-2uVmHxIEgkeH-G5kGeIHk=",
      "https://atlas-content-cdn.pixelsquid.com/stock-images/gold-icon-settings-computer-9K81AD4-600.jpg",
    ];
    const fallbackEmojis = ["📱", "🏦", "💰", "⚙️"];

    return (
      <div className="text-center">
        <img
          src={images[step]}
          alt={`Step ${step}`}
          onError={(e) => {
            e.target.onerror = null;
            e.target.replaceWith(document.createTextNode(fallbackEmojis[step]));
          }}
          className="mx-auto w-auto h-auto object-contain"
        />
      </div>
    );
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-yellow-50 via-white to-yellow-100 text-gray-900 flex flex-col justify-between p-4 overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <svg width="100%" height="100%">
          <defs>
            <pattern
              id="grid"
              width="80"
              height="80"
              patternUnits="userSpaceOnUse"
            >
              <circle
                cx="40"
                cy="40"
                r="30"
                stroke="#facc15"
                strokeWidth="1"
                fill="none"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Top bar */}
      <div className="absolute top-4 left-4 right-4 z-20 flex justify-between items-center">
        <button className="p-2 rounded-full bg-white shadow-md">
          <svg
            className="w-5 h-5 text-yellow-600"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 17h5l-1.4-1.4C18.8 15.2 18 13.5 18 12V8a6 6 0 00-12 0v4c0 1.5-.8 3.2-1.6 3.6L3 17h5m6 0v1a3 3 0 11-6 0v-1h6z"
            />
          </svg>
        </button>
        <div className="w-9 h-9 rounded-full bg-yellow-500 text-white flex items-center justify-center font-semibold shadow-md">
          U
        </div>
      </div>

      {/* Main content container */}
      <div className="relative z-10 w-full max-w-md mx-auto space-y-6 pt-12">
        {/* Onboarding steps */}
        {step <= 3 && (
          <>
            <StepIndicator />
            <div className="space-y-4">
              <StepImage step={step} />
              {step === 0 && (
                <>
                  <h2 className="text-xl font-bold text-center text-yellow-600">
                    Welcome to GoldToken
                  </h2>
                  <p className="text-center">
                    Buy and manage tokenized fiscal gold securely and easily.
                  </p>
                </>
              )}
              {step === 1 && (
                <>
                  <h2 className="text-xl font-bold text-center text-yellow-600">
                    Store &amp; Transact
                  </h2>
                  <p className="text-center">
                    Your gold is stored securely and can be used for payments or
                    exchanged anytime.
                  </p>
                </>
              )}
              {step === 2 && (
                <>
                  <h2 className="text-xl font-bold text-center text-yellow-600">
                    Real-Time Prices
                  </h2>
                  <p className="text-center">
                    Monitor the live price of gold tokens to make smart decisions.
                  </p>
                </>
              )}
              {step === 3 && (
                <>
                  <h2 className="text-xl font-bold text-center text-yellow-600">
                    Get Started
                  </h2>
                  <p className="text-center">
                    You're ready to buy and sell gold tokens!
                  </p>
                </>
              )}
              <div className="flex justify-between mt-6">
                {step > 0 && (
                  <button
                    onClick={prevStep}
                    className="px-4 py-2 rounded bg-gray-200 text-gray-800"
                  >
                    Back
                  </button>
                )}
                <button
                  onClick={nextStep}
                  className="ml-auto px-4 py-2 rounded bg-yellow-500 text-white"
                >
                  {step === 3 ? "Start" : "Next"}
                </button>
              </div>
            </div>
          </>
        )}

        {/* Buy/Sell/Pay interface, visible after onboarding and wallet closed */}
        {step > 3 && !showWallet && (
          <div className="mx-auto max-w-md rounded-3xl bg-yellow-50 shadow-lg p-6">
            <div className="flex justify-between space-x-4 mb-6 rounded-2xl bg-yellow-100 p-2">
              <button
                onClick={() => {
                  setActiveTab("buy");
                  setShowQR(false);
                }}
                className={`flex-1 px-4 py-2 rounded-xl font-semibold transition-colors duration-200 ${
                  activeTab === "buy"
                    ? "bg-yellow-500 text-white shadow-lg"
                    : "bg-white text-yellow-700 hover:bg-yellow-200"
                }`}
              >
                Buy
              </button>
              <button
                onClick={() => {
                  setActiveTab("sell");
                  setShowQR(false);
                }}
                className={`flex-1 px-4 py-2 rounded-xl font-semibold transition-colors duration-200 ${
                  activeTab === "sell"
                    ? "bg-yellow-500 text-white shadow-lg"
                    : "bg-white text-yellow-700 hover:bg-yellow-200"
                }`}
              >
                Sell
              </button>
              <button
                onClick={() => {
                  setActiveTab("pay");
                  setShowQR(true);
                }}
                className={`flex-1 px-4 py-2 rounded-xl font-semibold transition-colors duration-200 ${
                  activeTab === "pay"
                    ? "bg-yellow-500 text-white shadow-lg"
                    : "bg-white text-yellow-700 hover:bg-yellow-200"
                }`}
              >
                Pay
              </button>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-inner min-h-[220px]">
              {activeTab === "buy" && (
                <>
                  <h2 className="text-xl font-bold text-center text-yellow-600 mb-4">
                    Buy Gold
                  </h2>
                  <input
                    type="number"
                    placeholder="Enter USD"
                    value={usd}
                    onChange={handleBuyChange}
                    className="w-full p-3 border rounded-lg focus:outline-yellow-400 focus:ring-2 focus:ring-yellow-300"
                  />
                  <p className="text-center mt-3 text-gray-700">
                    You will get <strong>{goldToBuy.toFixed(4)}</strong> grams of
                    gold
                  </p>
                </>
              )}

              {activeTab === "sell" && (
                <>
                  <h2 className="text-xl font-bold text-center text-yellow-600 mb-4">
                    Sell Gold
                  </h2>
                  <input
                    type="number"
                    placeholder="Grams to sell"
                    value={goldToSell}
                    onChange={handleSellChange}
                    className="w-full p-3 border rounded-lg focus:outline-yellow-400 focus:ring-2 focus:ring-yellow-300"
                  />
                  <p className="text-center mt-3 text-gray-700">
                    You will receive <strong>${sellValue.toFixed(2)}</strong>
                  </p>
                </>
              )}

              {activeTab === "pay" && showQR && (
                <div className="flex flex-col items-center justify-center">
                  <h2 className="text-xl font-bold text-yellow-600 mb-6">
                    Pay with Gold
                  </h2>
                  <img
                    src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=goldtoken-payment"
                    alt="QR Code"
                    className="border p-2 rounded-lg shadow-md"
                  />
                  <p className="mt-4 text-center text-gray-700">
                    Scan this QR code to complete your payment.
                  </p>
                  <button
                    onClick={() => setShowQR(false)}
                    className="mt-6 px-4 py-2 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition"
                  >
                    Close QR
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Wallet panel (thin, fixed above bottom bar) */}
        {showWallet && (
          <div
            className={`fixed bottom-20 left-4 right-4 bg-white rounded-3xl p-4 shadow-2xl transition-all duration-500 ease-in-out transform z-30
              ${showWallet ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}`}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Wallet</h2>
              <button
                onClick={() => setShowWallet(false)}
                className="text-yellow-600 hover:text-yellow-800 font-bold text-xl"
                aria-label="Close wallet"
              >
                ×
              </button>
            </div>

            <div className="flex justify-between items-center mb-4 px-3 py-2 bg-yellow-50 rounded-xl">
              <div>
                <p className="text-yellow-600 font-bold text-lg">
                  1200 <span className="text-yellow-400">GOLD</span>
                </p>
                <p className="text-sm text-yellow-500">~ $90,399.25</p>
              </div>
              <button className="bg-yellow-500 px-3 py-1 rounded-full text-white font-semibold text-sm">
                Buy more
              </button>
            </div>

            {/* Price Range Buttons */}
            <div className="flex justify-center space-x-4 mb-4">
              {["24h", "7d", "30d"].map((range) => (
                <button
                  key={range}
                  onClick={() => setPriceRange(range)}
                  className={`px-4 py-1 rounded-full text-sm font-semibold transition ${
                    priceRange === range
                      ? "bg-yellow-500 text-white shadow-lg"
                      : "bg-yellow-100 text-yellow-600 hover:bg-yellow-200"
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>

            {/* Price info */}
            <div className="flex justify-between px-2 text-yellow-600 font-semibold mb-2">
              <span>{priceHistory[priceRange][0].toFixed(2)}</span>
              <span>{priceHistory[priceRange][1].toFixed(2)}</span>
              <span>{priceHistory[priceRange][2].toFixed(2)}</span>
            </div>

            {/* Line Chart - simple svg */}
            <svg
              viewBox="0 0 100 30"
              className="w-full h-10"
              fill="none"
              stroke="#fbbf24"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline
                points="0,30 25,15 50,20 75,5 100,10"
                className="stroke-current text-yellow-400"
              />
              <polyline
                points={priceHistory[priceRange]
                  .map((v, i) => `${(i * 100) / 2},${30 - v * 0.4}`)
                  .join(" ")}
                stroke="#f59e0b"
                fill="none"
              />
            </svg>
          </div>
        )}
      </div>

      {/* Bottom fixed bar with Wallet toggle */}
      {step > 3 && (
        <div className="fixed bottom-4 left-4 right-4 z-40 flex justify-center">
          <button
            onClick={() => setShowWallet(!showWallet)}
            className="rounded-full bg-yellow-500 text-white w-14 h-14 shadow-lg flex items-center justify-center text-2xl font-bold hover:bg-yellow-600 transition"
            aria-label="Toggle Wallet Panel"
          >
            W
          </button>
        </div>
      )}
    </div>
  );
}
