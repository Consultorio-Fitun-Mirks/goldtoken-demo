import { useState } from "react";

export default function GoldTokenApp() {
  const [step, setStep] = useState(0);
  const [usd, setUsd] = useState("");
  const [goldToBuy, setGoldToBuy] = useState(0);
  const [goldToSell, setGoldToSell] = useState("");
  const [sellValue, setSellValue] = useState(0);
  const [priceRange, setPriceRange] = useState("7d");
  const goldPrice = 75.33; // USD per gram
  const priceHistory = {
    "24h": [74.5, 75.1, 75.33],
    "7d": [73.2, 74.0, 75.33],
    "30d": [70.0, 72.5, 75.33]
  };

  const nextStep = () => setStep((s) => s + 1);
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
          className={`flex-1 h-2 mx-1 rounded-full ${step >= s ? "bg-yellow-500" : "bg-gray-200"}`}
        ></div>
      ))}
    </div>
  );

const StepImage = ({ step }) => {
  const images = [
    "https://www.logoai.com/uploads/icon/2017/07/03/14990782657194371.svg",
    "https://img.freepik.com/premium-vector/ethereum-vector-coin_1078-322.jpg?semt=ais_hybrid&w=740",
    "https://media.istockphoto.com/id/1325041603/photo/graph-icon.jpg?s=612x612&w=0&k=20&c=JlscaFx5Zd3Bi6dkYMyja-2uVmHxIEgkeH-G5kGeIHk=",
    "https://atlas-content-cdn.pixelsquid.com/stock-images/gold-icon-settings-computer-9K81AD4-600.jpg"
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
        className="mx-auto w-auto h-100 object-contain"
      />
    </div>
  );
};

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-yellow-50 via-white to-yellow-100 text-gray-900 flex items-center justify-center p-4 overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
              <circle cx="40" cy="40" r="30" stroke="#facc15" strokeWidth="1" fill="none" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative z-10 w-full max-w-md space-y-6">
        {step <= 3 && <StepIndicator />}

        {step === 0 && (
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold text-yellow-600">GoldToken</h1>
            <StepImage step={step} />
            <p>Own, Trade & Pay with Real Gold</p>
            <button
              onClick={nextStep}
              className="bg-yellow-500 text-white px-4 py-2 rounded-xl"
            >
              Get Started
            </button>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">What is Tokenized Gold?</h2>
            <StepImage step={step} />
            <p>
              Tokenized gold = real gold on the blockchain. Buy fractions,
              store safely, trade easily.
            </p>
            <div className="flex justify-between">
              <button onClick={prevStep} className="text-yellow-700">Back</button>
              <button onClick={nextStep} className="bg-yellow-500 text-white px-4 py-2 rounded-xl">Next</button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Why Use It?</h2>
            <StepImage step={step} />
            <ul className="list-disc pl-5">
              <li>Hedge against inflation</li>
              <li>Global asset, digital ease</li>
              <li>Fully backed, audited gold</li>
            </ul>
            <div className="flex justify-between">
              <button onClick={prevStep} className="text-yellow-700">Back</button>
              <button onClick={nextStep} className="bg-yellow-500 text-white px-4 py-2 rounded-xl">Next</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">How It Works</h2>
            <StepImage step={step} />
            <p>
              Buy with fiat or crypto, hold tokens backed by real gold, and
              sell or send anytime.
            </p>
            <div className="flex justify-between">
              <button onClick={prevStep} className="text-yellow-700">Back</button>
              <button onClick={nextStep} className="bg-yellow-500 text-white px-4 py-2 rounded-xl">Get Started</button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6">
            <div className="bg-yellow-100 p-4 rounded-2xl text-center">
              <h2 className="text-lg font-medium">Your Balance</h2>
              <p className="text-2xl font-bold">3.27 g</p>
              <p className="text-sm text-gray-700">≈ $246.32 USD</p>
            </div>

            <div className="grid grid-cols-1 gap-2">
              <button onClick={() => setStep(5)} className="bg-yellow-500 text-white py-2 rounded-xl">
                Buy Gold
              </button>
              <button onClick={() => setStep(6)} className="bg-yellow-500 text-white py-2 rounded-xl">
                Sell Gold
              </button>
              <button onClick={() => setStep(7)} className="bg-yellow-500 text-white py-2 rounded-xl">
                Price Chart
              </button>
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Buy Gold</h2>
            <div className="space-y-2">
              <label className="block text-sm">Enter amount (USD)</label>
              <input
                type="number"
                value={usd}
                onChange={handleBuyChange}
                className="w-full border px-4 py-2 rounded-xl"
              />
              <p className="text-sm text-gray-600">Gold Price: ${goldPrice} / g</p>
              <p className="text-sm">You’ll receive: <strong>{goldToBuy.toFixed(3)} g</strong></p>
            </div>
            <div className="flex justify-between">
              <button onClick={() => setStep(4)}>Back</button>
              <button className="bg-yellow-500 text-white px-4 py-2 rounded-xl">
                Confirm Purchase
              </button>
            </div>
          </div>
        )}

        {step === 6 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Sell Gold</h2>
            <div className="space-y-2">
              <label className="block text-sm">Enter gold amount (g)</label>
              <input
                type="number"
                value={goldToSell}
                onChange={handleSellChange}
                className="w-full border px-4 py-2 rounded-xl"
              />
              <p className="text-sm text-gray-600">Gold Price: ${goldPrice} / g</p>
              <p className="text-sm">Est. return: <strong>${sellValue.toFixed(2)}</strong></p>
            </div>
            <div className="flex justify-between">
              <button onClick={() => setStep(4)}>Back</button>
              <button className="bg-yellow-500 text-white px-4 py-2 rounded-xl">
                Confirm Sale
              </button>
            </div>
          </div>
        )}

        {step === 7 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Gold Price Chart</h2>
            <div className="flex space-x-2">
              {["24h", "7d", "30d"].map((range) => (
                <button
                  key={range}
                  className={`px-3 py-1 rounded-full border ${priceRange === range ? "bg-yellow-500 text-white" : "bg-white"}`}
                  onClick={() => setPriceRange(range)}
                >
                  {range}
                </button>
              ))}
            </div>
            <div className="bg-yellow-100 p-4 rounded-xl">
              <p className="text-sm">Price History ({priceRange}):</p>
              <div className="flex space-x-2 mt-2">
                {priceHistory[priceRange].map((price, i) => (
                  <div key={i} className="text-xs">${price.toFixed(2)}</div>
                ))}
              </div>
            </div>
            <button onClick={() => setStep(4)} className="text-sm text-blue-500">
              ← Back to Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
}