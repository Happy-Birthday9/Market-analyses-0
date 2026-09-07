ekon "use strict";

const CONFIG = {
  APP_NAME: "AI Market Analyzer",
  VERSION: "1.0.0",

  analysis: {
    maxAnalysisTime: 10000,
    autoStartAfterUpload: true,
    supportedImageTypes: [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/jpg"
    ],
    maxImageSizeMB: 10
  },

  api: {
    enabled: false,
    apiKey: "",
    endpoint: "",
    model: "",
    timeout: 9000
  },

  futureSignals: {
    count: 10,
    markets: [
      "EUR/USD",
      "GBP/USD",
      "USD/JPY",
      "USD/CHF",
      "AUD/USD",
      "USD/CAD",
      "NZD/USD",
      "EUR/GBP",
      "EUR/JPY",
      "GBP/JPY",
      "AUD/JPY",
      "EUR/AUD",
      "EUR/CAD",
      "GBP/CAD",
      "AUD/CAD",
      "USD/SGD",
      "USD/HKD",
      "USD/TRY",
      "USD/MXN",
      "USD/ZAR"
    ]
  },

  ui: {
    toastDuration: 3500,
    pageAnimation: true,
    signalAnimation: true,
    loadingAnimation: true
  }
};

Object.freeze(CONFIG);
Object.freeze(CONFIG.analysis);
Object.freeze(CONFIG.api);
Object.freeze(CONFIG.futureSignals);
Object.freeze(CONFIG.ui);

window.MARKET_ANALYZER_CONFIG = CONFIG;

console.log(
  "%c AI Market Analyzer Config Loaded ",
  "background:#071321;color:#00e5ff;font-weight:bold;padding:7px;"
);
console.log("Version:", CONFIG.VERSION);
console.log(
  "AI API:",
  CONFIG.api.enabled ? "Enabled" : "Frontend Demo Mode"
);
