import { useState } from "react";

function formatNumber(number) {
  if (isNaN(number)) return "-";
  return "Rp" + Math.round(number).toLocaleString("id-ID");
}


export default function App() {
  const [gramMax, setGramMax] = useState("");
  const [gramMin, setGramMin] = useState("");
  const [harga, setHarga] = useState("");
  const [hargaCheckout, setHargaCheckout] = useState("");
  const [hargaBuyback, setHargaBuyback] = useState("");
  const [gramasiDidapat, setGramasiDidapat] = useState("");
  const [result, setResult] = useState(null);

  const handleCalculate = (e) => {
    e.preventDefault();

    const gMax = parseFloat(gramMax);
    const gMin = parseFloat(gramMin);
    const h = parseFloat(harga);
    const hc = parseFloat(hargaCheckout);
    const hb = parseFloat(hargaBuyback);
    const gd = parseFloat(gramasiDidapat);

    if (!gMax || !gMin || !h || !hc || !hb || !gd) return;

    // Perhitungan utama
    const selisihGram = gMax - gMin;
    const gram01 = h / gMax;
    const kembalian = gram01 * selisihGram;
    const modal = hc - kembalian;
    const hargaPerGram = (modal / gMin) * 10;


    const kembalianUntung = (gMax - gd) * gram01
    const estimasiJual = hb * (gd / 10); // total buyback yang bisa didapat
    const modalUntung = hc - kembalianUntung

    const estimasiKeuntungan = estimasiJual - modalUntung; // total profit


    setResult({
      modalUntung,
      estimasiKeuntungan,
      kembalian,
      modal,
      hargaPerGram,
      estimasiKeuntungan,
      kembalianUntung,
      estimasiJual
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
        <h1 className="text-2xl font-bold text-center mb-6 text-indigo-600">
          💎 Semar Calculator
        </h1>

        <form onSubmit={handleCalculate} className="space-y-4">
          {/* Input gram */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Gram Min</label>
              <input
                type="number"
                step="0.01"
                value={gramMin}
                onChange={(e) => setGramMin(e.target.value)}
                placeholder="Contoh: 17"
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Gram Max</label>
              <input
                type="number"
                step="0.01"
                value={gramMax}
                onChange={(e) => setGramMax(e.target.value)}
                placeholder="Contoh: 19"
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
          </div>

          {/* Harga-harga */}
          <div>
            <label className="block text-sm font-medium mb-1">Harga Awal</label>
            <input
              type="number"
              value={harga}
              onChange={(e) => setHarga(e.target.value)}
              placeholder="Masukkan harga awal"
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Harga Checkout
            </label>
            <input
              type="number"
              value={hargaCheckout}
              onChange={(e) => setHargaCheckout(e.target.value)}
              placeholder="Masukkan harga checkout"
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <hr />

          <h6 className="text-center mb-2 text-xl">Buyback</h6>
          <div>
            <label className="block text-sm font-medium mb-1">
              Harga Buyback
            </label>
            <input
              type="number"
              value={hargaBuyback}
              onChange={(e) => setHargaBuyback(e.target.value)}
              placeholder="Masukkan harga buyback"
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          {/* Gramasi */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Gramasi Didapat
            </label>
            <input
              type="number"
              step="0.01"
              value={gramasiDidapat}
              onChange={(e) => setGramasiDidapat(e.target.value)}
              placeholder="Masukkan gramasi didapat"
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition"
          >
            Hitung
          </button>
        </form>

        {/* Hasil */}
        {result && (
          <div className="mt-6 bg-gray-50 p-4 rounded-lg space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Kembalian:</span>
              <span className="font-semibold text-green-600">
                {formatNumber(result.kembalian)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Modal:</span>
              <span className="font-semibold text-green-600">
                {formatNumber(result.modal)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Harga per Gram:</span>
              <span className="font-semibold text-indigo-600">
                {formatNumber(result.hargaPerGram)}
              </span>
            </div>
            <hr />
            <h6 className="text-center text-lg">Buyback</h6>
            <div className="flex justify-between">
              <span>Modal:</span>
              <span className="font-semibold text-green-600">
                {formatNumber(result.modalUntung)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Harga Jual:</span>
              <span className="font-semibold text-indigo-600">
                {formatNumber(result.estimasiJual)}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Estimasi Keuntungan:</span>
              <span
                className={`font-semibold ${result.estimasiKeuntungan >= 0
                  ? "text-green-600"
                  : "text-red-600"
                  }`}
              >
                {formatNumber(result.estimasiKeuntungan)}
              </span>
            </div>
          </div>
        )}

        <div className="mt-10 text-center w-full text-gray-500 text-sm">
          Dibuat dengan 💛 oleh <a href="https://www.tiktok.com/@tam___31" className="underline hover:text-gray-700 transition">Nona</a>
        </div>

      </div>
      {/* copyright punya nona */}

    </div>
  );
}
