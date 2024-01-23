const midtransClient = require("midtrans-client"); // Import library Midtrans

// Konfigurasi kredensial Midtrans Anda
const midtransConfig = {
  isProduction: false, // Ganti menjadi true saat di production
  serverKey: "SB-Mid-server-b-xTkWFeSVNLuRyyRfcYGgDR",
  clientKey: "SB-Mid-client-8wHZJa_sdi2rKgtI",
};

const snap = new midtransClient.Snap({
  isProduction: midtransConfig.isProduction,
  serverKey: midtransConfig.serverKey,
  clientKey: midtransConfig.clientKey,
});

// Fungsi untuk mengirim permintaan pembayaran ke Midtrans
async function charge(transactionData: any) {
  try {
    const chargeResponse = await snap.createTransaction(transactionData);
    return chargeResponse;
  } catch (error) {
    throw error;
  }
}

export { charge };
