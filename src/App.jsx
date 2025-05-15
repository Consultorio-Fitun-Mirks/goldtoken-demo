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
    if (step < 3) {
      setStep(step + 1);
    } else {
      setStep(4);
    }
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

      <div className="relative z-10 w-full max-w-md mx-auto space-y-6 pt-12">
        {/* Steps */}
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

        {/* Main Interface */}
{step > 3 && !showWallet && (
  <div className="mx-auto max-w-md rounded-3xl bg-yellow-50 shadow-lg p-6">
    {/* Buttons container */}
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

    {/* Content area */}
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
            You will get <strong>{goldToBuy.toFixed(4)}</strong> grams of gold
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
          <h2 className="text-xl font-bold text-yellow-600 mb-6">Pay with Gold</h2>
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


        {/* Wallet */}
        {showWallet && (
          <div
            className={`fixed bottom-20 left-4 right-4 bg-white rounded-3xl p-4 shadow-2xl transition-all duration-500 ease-in-out transform ${
              showWallet ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
            } z-30`}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Wallet</h2>
              <button
                onClick={() => setShowWallet(false)}
                className="text-sm text-yellow-600"
              >
                Close
              </button>
            </div>

            <div className="bg-yellow-100 p-4 rounded-xl text-center mb-4">
              <p className="text-sm">Your Balance</p>
              <p className="text-2xl font-bold">3.27 g</p>
              <p className="text-sm text-gray-700">≈ $246.32 USD</p>
            </div>

            <div className="bg-yellow-50 p-4 rounded-xl">
              <p className="text-sm mb-2">Gold Token Value ({priceRange})</p>
              <div className="flex justify-between mb-2">
                {["24h", "7d", "30d"].map((r) => (
                  <button
                    key={r}
                    onClick={() => setPriceRange(r)}
                    className={`text-xs px-2 py-1 rounded-full ${
                      priceRange === r ? "bg-yellow-500 text-white" : "bg-white border"
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
              <div className="flex justify-around text-xs text-gray-700 mb-2">
                {priceHistory[priceRange].map((p, i) => (
                  <span key={i}>${p.toFixed(2)}</span>
                ))}
              </div>
              <svg viewBox="0 0 100 40" className="w-full h-20">
                <polyline
                  fill="none"
                  stroke="#facc15"
                  strokeWidth="2"
                  points={priceHistory[priceRange]
                    .map((p, i, arr) => {
                      const x = (i / (arr.length - 1)) * 100;
                      const max = Math.max(...arr);
                      const min = Math.min(...arr);
                      const y = 40 - ((p - min) / (max - min || 1)) * 30;
                      return `${x},${y}`;
                    })
                    .join(" ")}
                />
              </svg>
            </div>
          </div>
        )}
      </div>

      {step > 3 && (
        <div className="z-10 fixed bottom-0 inset-x-0 bg-white border-t rounded-t-3xl px-4 py-2 flex justify-around items-center">
          <button
            onClick={() => setStep(0)}
            className="text-sm text-yellow-700"
          >
            Home
          </button>
          <button
            onClick={() => setShowWallet(true)}
            className="bg-yellow-500 text-white px-4 py-1 rounded-full text-sm"
          >
            Wallet
          </button>
        </div>
      )}
    </div>
  );
}
