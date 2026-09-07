/* =========================================================
   AI ANALYSES — config.js
   ========================================================= */

"use strict";

/*
|--------------------------------------------------------------------------
| APPLICATION CONFIGURATION
|--------------------------------------------------------------------------
|
| IMPORTANT:
| Never put private API keys in this file.
|
| Anything inside config.js can be viewed by website visitors.
| Keep OpenAI, xAI and Gemini API keys on the backend/server.
|
|--------------------------------------------------------------------------
*/

const CONFIG = {

  /* =======================================================
     APP INFORMATION
     ======================================================= */

  APP_NAME: "AI Analyses",

  VERSION: "1.0.0",

  DESCRIPTION:
    "AI-powered chart analysis, OTC analysis and future market signals.",


  /* =======================================================
     API CONFIGURATION
     ======================================================= */

  /*
   * Leave this empty when frontend and backend
   * are hosted on the same domain.
   *
   * Example:
   * API_BASE: ""
   *
   * If your backend is hosted separately:
   * API_BASE: "https://your-api-domain.com"
   */

  API_BASE: "",


  /* =======================================================
     ANALYSIS SETTINGS
     ======================================================= */

  ANALYSIS: {

    /*
     * Maximum image size accepted by frontend.
     * 10 MB
     */

    MAX_IMAGE_SIZE_MB: 10,

    /*
     * Supported chart image formats.
     */

    SUPPORTED_IMAGE_TYPES: [
      "image/png",
      "image/jpeg",
      "image/webp"
    ],

    /*
     * Default timeframe.
     */

    DEFAULT_TIMEFRAME: "5m",

    /*
     * Confidence is an estimate, not a guarantee.
     */

    SHOW_CONFIDENCE: true,

    /*
     * Use multi-AI voting.
     */

    MULTI_AI_VOTING: true

  },


  /* =======================================================
     FUTURE SIGNAL MARKETS
     ======================================================= */

  FUTURE_SIGNALS: {

    MARKETS: [

      {
        symbol: "EUR/USD",
        name: "EUR/USD"
      },

      {
        symbol: "GBP/USD",
        name: "GBP/USD"
      },

      {
        symbol: "USD/JPY",
        name: "USD/JPY"
      },

      {
        symbol: "USD/CHF",
        name: "USD/CHF"
      },

      {
        symbol: "AUD/USD",
        name: "AUD/USD"
      },

      {
        symbol: "USD/CAD",
        name: "USD/CAD"
      },

      {
        symbol: "NZD/USD",
        name: "NZD/USD"
      },

      {
        symbol: "EUR/GBP",
        name: "EUR/GBP"
      },

      {
        symbol: "EUR/JPY",
        name: "EUR/JPY"
      },

      {
        symbol: "GBP/JPY",
        name: "GBP/JPY"
      },

      {
        symbol: "XAU/USD",
        name: "Gold / XAU/USD"
      },

      {
        symbol: "BTC/USD",
        name: "Bitcoin / BTC/USD"
      }

    ],


    TIMEFRAMES: [

      {
        value: "1m",
        label: "1 Minute"
      },

      {
        value: "5m",
        label: "5 Minutes"
      },

      {
        value: "15m",
        label: "15 Minutes"
      },

      {
        value: "30m",
        label: "30 Minutes"
      },

      {
        value: "1h",
        label: "1 Hour"
      }

    ]

  },


  /* =======================================================
     AI PROVIDERS
     ======================================================= */

  AI_PROVIDERS: {

    OPENAI: {

      name: "OpenAI",

      label: "ChatGPT",

      enabled: true

    },


    XAI: {

      name: "xAI",

      label: "Grok",

      enabled: true

    },


    GEMINI: {

      name: "Google",

      label: "Gemini",

      enabled: true

    }

  },


  /* =======================================================
     VOTING SYSTEM
     ======================================================= */

  VOTING: {

    /*
     * Minimum AI votes required for a consensus.
     */

    MINIMUM_VOTES: 2,

    /*
     * If 2 or more AIs say UP:
     * Final signal = UP
     *
     * If 2 or more AIs say DOWN:
     * Final signal = DOWN
     *
     * Otherwise:
     * Final signal = NEUTRAL / WAITING
     */

    UP_SIGNAL: "UP",

    DOWN_SIGNAL: "DOWN",

    NEUTRAL_SIGNAL: "NEUTRAL"

  },


  /* =======================================================
     UI SETTINGS
     ======================================================= */

  UI: {

    THEME: "dark",

    ANIMATION: true,

    SHOW_AI_VOTES: true,

    SHOW_RISK_NOTICE: true,

    SHOW_INSTALL_BUTTON: true,

    AUTO_SCROLL_RESULT: true

  },


  /* =======================================================
     PWA
     ======================================================= */

  PWA: {

    ENABLED: true,

    MANIFEST:
      "manifest.webmanifest",

    SERVICE_WORKER:
      "sw.js"

  }

};


/* =========================================================
   MAKE CONFIG AVAILABLE
   ========================================================= */

window.CONFIG = CONFIG;
