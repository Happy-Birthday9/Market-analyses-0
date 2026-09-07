/* =========================================================
   AI ANALYSES — script.js
   ========================================================= */

"use strict";

/* =========================================================
   GLOBAL VARIABLES
   ========================================================= */

let deferredInstallPrompt = null;

let realImageBase64 = null;
let otcImageBase64 = null;


/* =========================================================
   DOM HELPERS
   ========================================================= */

const $ = (selector) => document.querySelector(selector);

const $$ = (selector) => document.querySelectorAll(selector);


/* =========================================================
   ELEMENTS
   ========================================================= */

// Menu
const menuBtn = $("#menuBtn");
const closeMenuBtn = $("#closeMenuBtn");
const sideMenu = $("#sideMenu");
const menuOverlay = $("#menuOverlay");

// Install
const installBtn = $("#installBtn");

// Sections
const sections = {
  dashboard: $("#dashboardSection"),
  future: $("#futureSection"),
  real: $("#realSection"),
  otc: $("#otcSection"),
  settings: $("#settingsSection")
};

// Navigation
const menuItems = $$(".menu-item");
const goButtons = $$("[data-go]");

// Future
const marketSelect = $("#marketSelect");
const futureTimeframe = $("#futureTimeframe");
const futureBtn = $("#futureBtn");
const futureLoading = $("#futureLoading");
const futureResult = $("#futureResult");
const futureDirection = $("#futureDirection");
const futureConfidence = $("#futureConfidence");
const futureReason = $("#futureReason");
const futureVotes = $("#futureVotes");

// Real Market
const realChartInput = $("#realChartInput");
const realUploadArea = $("#realUploadArea");
const realPreview = $("#realPreview");
const realPreviewImage = $("#realPreviewImage");
const removeRealImage = $("#removeRealImage");
const realTimeframe = $("#realTimeframe");
const realAnalyzeBtn = $("#realAnalyzeBtn");
const realLoading = $("#realLoading");
const realResult = $("#realResult");
const realDirection = $("#realDirection");
const realConfidence = $("#realConfidence");
const realReason = $("#realReason");
const realVotes = $("#realVotes");

// OTC
const otcChartInput = $("#otcChartInput");
const otcUploadArea = $("#otcUploadArea");
const otcPreview = $("#otcPreview");
const otcPreviewImage = $("#otcPreviewImage");
const removeOtcImage = $("#removeOtcImage");
const otcTimeframe = $("#otcTimeframe");
const otcAnalyzeBtn = $("#otcAnalyzeBtn");
const otcLoading = $("#otcLoading");
const otcResult = $("#otcResult");
const otcDirection = $("#otcDirection");
const otcConfidence = $("#otcConfidence");
const otcReason = $("#otcReason");
const otcVotes = $("#otcVotes");


/* =========================================================
   CONFIG
   ========================================================= */

const APP_CONFIG = window.CONFIG || {};

const API_BASE =
  APP_CONFIG.API_BASE ||
  APP_CONFIG.API_BASE_URL ||
  "";


/* =========================================================
   INITIALIZATION
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  initializeNavigation();

  initializeMenu();

  initializeInstallPrompt();

  initializeImageUpload();

  initializeAnalysisButtons();

  registerServiceWorker();

});


/* =========================================================
   NAVIGATION
   ========================================================= */

function initializeNavigation() {

  menuItems.forEach((item) => {

    item.addEventListener("click", () => {

      const sectionName = item.dataset.section;

      if (!sectionName) {
        return;
      }

      showSection(sectionName);

      closeMenu();

    });

  });


  goButtons.forEach((button) => {

    button.addEventListener("click", () => {

      const sectionName = button.dataset.go;

      if (!sectionName) {
        return;
      }

      showSection(sectionName);

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

    });

  });

}


function showSection(sectionName) {

  Object.values(sections).forEach((section) => {

    if (!section) {
      return;
    }

    section.classList.remove("active-section");

  });


  if (sections[sectionName]) {

    sections[sectionName].classList.add(
      "active-section"
    );

  }


  menuItems.forEach((item) => {

    item.classList.toggle(
      "active",
      item.dataset.section === sectionName
    );

  });


  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

}


/* =========================================================
   SIDE MENU
   ========================================================= */

function initializeMenu() {

  if (menuBtn) {

    menuBtn.addEventListener("click", openMenu);

  }


  if (closeMenuBtn) {

    closeMenuBtn.addEventListener("click", closeMenu);

  }


  if (menuOverlay) {

    menuOverlay.addEventListener(
      "click",
      closeMenu
    );

  }


  document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

      closeMenu();

    }

  });

}


function openMenu() {

  sideMenu?.classList.add("open");

  menuOverlay?.classList.add("open");

  document.body.style.overflow = "hidden";

}


function closeMenu() {

  sideMenu?.classList.remove("open");

  menuOverlay?.classList.remove("open");

  document.body.style.overflow = "";

}


/* =========================================================
   PWA INSTALL
   ========================================================= */

function initializeInstallPrompt() {

  window.addEventListener(
    "beforeinstallprompt",
    (event) => {

      event.preventDefault();

      deferredInstallPrompt = event;

      if (installBtn) {
        installBtn.hidden = false;
      }

    }
  );


  installBtn?.addEventListener(
    "click",
    async () => {

      if (!deferredInstallPrompt) {

        showToast(
          "Install option is not available yet.",
          "info"
        );

        return;

      }


      deferredInstallPrompt.prompt();


      try {

        const result =
          await deferredInstallPrompt.userChoice;

        if (result.outcome === "accepted") {

          showToast(
            "AI Analyses installation started.",
            "success"
          );

        }

      } catch (error) {

        console.error(
          "Install prompt error:",
          error
        );

      }


      deferredInstallPrompt = null;

      installBtn.hidden = true;

    }
  );


  window.addEventListener(
    "appinstalled",
    () => {

      if (installBtn) {
        installBtn.hidden = true;
      }

      deferredInstallPrompt = null;

      showToast(
        "AI Analyses installed successfully.",
        "success"
      );

    }
  );

}


/* =========================================================
   SERVICE WORKER
   ========================================================= */

function registerServiceWorker() {

  if (
    "serviceWorker" in navigator &&
    window.location.protocol !== "file:"
  ) {

    window.addEventListener(
      "load",
      async () => {

        try {

          await navigator.serviceWorker.register(
            "sw.js"
          );

          console.log(
            "AI Analyses service worker registered."
          );

        } catch (error) {

          console.warn(
            "Service worker registration failed:",
            error
          );

        }

      }
    );

  }

}


/* =========================================================
   IMAGE UPLOAD
   ========================================================= */

function initializeImageUpload() {

  if (realChartInput) {

    realChartInput.addEventListener(
      "change",
      (event) => {

        handleImageFile(
          event.target.files?.[0],
          "real"
        );

      }
    );

  }


  if (otcChartInput) {

    otcChartInput.addEventListener(
      "change",
      (event) => {

        handleImageFile(
          event.target.files?.[0],
          "otc"
        );

      }
    );

  }


  removeRealImage?.addEventListener(
    "click",
    () => {

      clearImage("real");

    }
  );


  removeOtcImage?.addEventListener(
    "click",
    () => {

      clearImage("otc");

    }
  );


  setupDragDrop(
    realUploadArea,
    "real"
  );


  setupDragDrop(
    otcUploadArea,
    "otc"
  );

}


function setupDragDrop(area, type) {

  if (!area) {
    return;
  }


  ["dragenter", "dragover"].forEach(
    (eventName) => {

      area.addEventListener(
        eventName,
        (event) => {

          event.preventDefault();

          area.classList.add("drag-active");

        }
      );

    }
  );


  ["dragleave", "drop"].forEach(
    (eventName) => {

      area.addEventListener(
        eventName,
        (event) => {

          event.preventDefault();

          area.classList.remove(
            "drag-active"
          );

        }
      );

    }
  );


  area.addEventListener(
    "drop",
    (event) => {

      const file =
        event.dataTransfer?.files?.[0];

      handleImageFile(file, type);

    }
  );

}


function handleImageFile(file, type) {

  if (!file) {
    return;
  }


  const allowedTypes = [
    "image/png",
    "image/jpeg",
    "image/webp"
  ];


  if (!allowedTypes.includes(file.type)) {

    showToast(
      "Please upload PNG, JPG, JPEG or WEBP image.",
      "error"
    );

    return;

  }


  const maxSize =
    10 * 1024 * 1024;


  if (file.size > maxSize) {

    showToast(
      "Image must be smaller than 10 MB.",
      "error"
    );

    return;

  }


  const reader = new FileReader();


  reader.onload = () => {

    const result =
      String(reader.result || "");


    if (!result) {
      return;
    }


    if (type === "real") {

      realImageBase64 = result;

      if (realPreviewImage) {
        realPreviewImage.src = result;
      }

      if (realPreview) {
        realPreview.hidden = false;
      }

    }


    if (type === "otc") {

      otcImageBase64 = result;

      if (otcPreviewImage) {
        otcPreviewImage.src = result;
      }

      if (otcPreview) {
        otcPreview.hidden = false;
      }

    }

  };


  reader.onerror = () => {

    showToast(
      "Unable to read the selected image.",
      "error"
    );

  };


  reader.readAsDataURL(file);

}


function clearImage(type) {

  if (type === "real") {

    realImageBase64 = null;

    if (realChartInput) {
      realChartInput.value = "";
    }

    if (realPreviewImage) {
      realPreviewImage.src = "";
    }

    if (realPreview) {
      realPreview.hidden = true;
    }

    if (realResult) {
      realResult.hidden = true;
    }

  }


  if (type === "otc") {

    otcImageBase64 = null;

    if (otcChartInput) {
      otcChartInput.value = "";
    }

    if (otcPreviewImage) {
      otcPreviewImage.src = "";
    }

    if (otcPreview) {
      otcPreview.hidden = true;
    }

    if (otcResult) {
      otcResult.hidden = true;
    }

  }

}


/* =========================================================
   ANALYSIS BUTTONS
   ========================================================= */

function initializeAnalysisButtons() {

  futureBtn?.addEventListener(
    "click",
    generateFutureSignal
  );


  realAnalyzeBtn?.addEventListener(
    "click",
    analyzeRealMarket
  );


  otcAnalyzeBtn?.addEventListener(
    "click",
    analyzeOTCMarket
  );

}


/* =========================================================
   FUTURE SIGNAL
   ========================================================= */

async function generateFutureSignal() {

  const market =
    marketSelect?.value?.trim();


  const timeframe =
    futureTimeframe?.value?.trim() ||
    "5m";


  if (!market) {

    showToast(
      "Please select a market first.",
      "error"
    );

    marketSelect?.focus();

    return;

  }


  setLoading(
    futureBtn,
    futureLoading,
    true,
    "Generating signal..."
  );


  if (futureResult) {
    futureResult.hidden = true;
  }


  try {

    const data = await apiRequest(
      "/api/future",
      {
        method: "POST",

        body: JSON.stringify({
          market,
          timeframe
        })
      }
    );


    renderSignalResult(
      data,
      {
        result: futureResult,
        direction: futureDirection,
        confidence: futureConfidence,
        reason: futureReason,
        votes: futureVotes
      }
    );


  } catch (error) {

    console.error(
      "Future signal error:",
      error
    );


    showToast(
      error.message ||
      "Unable to generate future signal.",
      "error"
    );

  } finally {

    setLoading(
      futureBtn,
      futureLoading,
      false,
      "🔮 Generate Future Signal"
    );

  }

}


/* =========================================================
   REAL MARKET ANALYSIS
   ========================================================= */

async function analyzeRealMarket() {

  if (!realImageBase64) {

    showToast(
      "Please upload a chart screenshot first.",
      "error"
    );

    return;

  }


  const timeframe =
    realTimeframe?.value?.trim() ||
    "5m";


  setLoading(
    realAnalyzeBtn,
    realLoading,
    true,
    "Analyzing chart..."
  );


  if (realResult) {
    realResult.hidden = true;
  }


  try {

    const data = await apiRequest(
      "/api/analyze",
      {
        method: "POST",

        body: JSON.stringify({
          type: "real",
          timeframe,
          image: realImageBase64
        })
      }
    );


    renderSignalResult(
      data,
      {
        result: realResult,
        direction: realDirection,
        confidence: realConfidence,
        reason: realReason,
        votes: realVotes
      }
    );


  } catch (error) {

    console.error(
      "Real market analysis error:",
      error
    );


    showToast(
      error.message ||
      "Unable to analyze the chart.",
      "error"
    );

  } finally {

    setLoading(
      realAnalyzeBtn,
      realLoading,
      false,
      "📊 Analyze Real Market"
    );

  }

}


/* =========================================================
   OTC MARKET ANALYSIS
   ========================================================= */

async function analyzeOTCMarket() {

  if (!otcImageBase64) {

    showToast(
      "Please upload an OTC chart first.",
      "error"
    );

    return;

  }


  const timeframe =
    otcTimeframe?.value?.trim() ||
    "5m";


  setLoading(
    otcAnalyzeBtn,
    otcLoading,
    true,
    "Analyzing OTC chart..."
  );


  if (otcResult) {
    otcResult.hidden = true;
  }


  try {

    const data = await apiRequest(
      "/api/analyze",
      {
        method: "POST",

        body: JSON.stringify({
          type: "otc",
          timeframe,
          image: otcImageBase64
        })
      }
    );


    renderSignalResult(
      data,
      {
        result: otcResult,
        direction: otcDirection,
        confidence: otcConfidence,
        reason: otcReason,
        votes: otcVotes
      }
    );


  } catch (error) {

    console.error(
      "OTC analysis error:",
      error
    );


    showToast(
      error.message ||
      "Unable to analyze the OTC chart.",
      "error"
    );

  } finally {

    setLoading(
      otcAnalyzeBtn,
      otcLoading,
      false,
      "🧪 Analyze OTC Market"
    );

  }

}


/* =========================================================
   API REQUEST
   ========================================================= */

async function apiRequest(endpoint, options = {}) {

  const url =
    `${API_BASE}${endpoint}`;


  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {})
  };


  const response = await fetch(
    url,
    {
      ...options,
      headers
    }
  );


  let data = null;


  try {

    data = await response.json();

  } catch {

    data = null;

  }


  if (!response.ok) {

    const message =
      data?.error ||
      data?.message ||
      `Request failed with status ${response.status}.`;


    throw new Error(message);

  }


  return data || {};

}


/* =========================================================
   LOADING STATE
   ========================================================= */

function setLoading(
  button,
  loadingElement,
  isLoading,
  buttonText
) {

  if (button) {

    button.disabled = isLoading;

    if (!button.dataset.originalText) {

      button.dataset.originalText =
        button.textContent;

    }


    button.textContent =
      isLoading
        ? "Please wait..."
        : buttonText ||
          button.dataset.originalText;

  }


  if (loadingElement) {

    loadingElement.hidden =
      !isLoading;

  }

}


/* =========================================================
   RESULT RENDERING
   ========================================================= */

function renderSignalResult(
  data,
  elements
) {

  const normalized =
    normalizeSignalData(data);


  if (elements.direction) {

    elements.direction.textContent =
      normalized.direction;


    elements.direction.classList.remove(
      "up",
      "down",
      "neutral"
    );


    if (
      normalized.direction === "UP"
    ) {

      elements.direction.classList.add(
        "up"
      );

    } else if (
      normalized.direction === "DOWN"
    ) {

      elements.direction.classList.add(
        "down"
      );

    } else {

      elements.direction.classList.add(
        "neutral"
      );

    }

  }


  if (elements.confidence) {

    elements.confidence.textContent =
      `${normalized.confidence}%`;

  }


  if (elements.reason) {

    elements.reason.textContent =
      normalized.reason ||
      "No additional explanation was provided.";

  }


  if (elements.votes) {

    elements.votes.innerHTML =
      buildVotesHTML(
        normalized.votes
      );

  }


  if (elements.result) {

    elements.result.hidden = false;

    elements.result.scrollIntoView({
      behavior: "smooth",
      block: "nearest"
    });

  }

}


/* =========================================================
   NORMALIZE API DATA
   ========================================================= */

function normalizeSignalData(data) {

  let direction =
    data?.direction ||
    data?.signal ||
    data?.finalSignal ||
    data?.prediction ||
    "WAITING";


  direction =
    String(direction)
      .toUpperCase()
      .trim();


  if (
    direction.includes("BUY") ||
    direction.includes("UP") ||
    direction.includes("CALL")
  ) {

    direction = "UP";

  } else if (
    direction.includes("SELL") ||
    direction.includes("DOWN") ||
    direction.includes("PUT")
  ) {

    direction = "DOWN";

  } else if (
    direction.includes("HOLD") ||
    direction.includes("WAIT") ||
    direction.includes("NEUTRAL")
  ) {

    direction = "NEUTRAL";

  } else {

    direction = "WAITING";

  }


  let confidence =
    Number(
      data?.confidence ??
      data?.confidenceScore ??
      data?.percentage ??
      0
    );


  if (
    Number.isNaN(confidence) ||
    !Number.isFinite(confidence)
  ) {

    confidence = 0;

  }


  confidence =
    Math.max(
      0,
      Math.min(
        100,
        Math.round(confidence)
      )
    );


  const reason =
    data?.reason ||
    data?.analysis ||
    data?.explanation ||
    data?.summary ||
    "";


  const votes =
    normalizeVotes(
      data?.votes ||
      data?.providers ||
      data?.models ||
      []
    );


  return {
    direction,
    confidence,
    reason,
    votes
  };

}


/* =========================================================
   NORMALIZE VOTES
   ========================================================= */

function normalizeVotes(votes) {

  if (!votes) {
    return [];
  }


  if (!Array.isArray(votes)) {

    if (
      typeof votes === "object"
    ) {

      return Object.entries(votes)
        .map(([name, value]) => ({
          name,
          signal:
            extractDirection(value),
          confidence:
            extractConfidence(value)
        }));

    }

    return [];

  }


  return votes.map(
    (vote, index) => {

      if (
        typeof vote === "string"
      ) {

        return {
          name: `AI ${index + 1}`,
          signal:
            extractDirection(vote),
          confidence: null
        };

      }


      return {
        name:
          vote?.name ||
          vote?.provider ||
          vote?.model ||
          `AI ${index + 1}`,

        signal:
          extractDirection(
            vote?.signal ||
            vote?.direction ||
            vote?.prediction ||
            vote?.result
          ),

        confidence:
          extractConfidence(
            vote
          )
      };

    }
  );

}


/* =========================================================
   EXTRACT DIRECTION
   ========================================================= */

function extractDirection(value) {

  if (
    value &&
    typeof value === "object"
  ) {

    value =
      value.signal ||
      value.direction ||
      value.prediction ||
      value.result ||
      "";

  }


  const text =
    String(value || "")
      .toUpperCase()
      .trim();


  if (
    text.includes("UP") ||
    text.includes("BUY") ||
    text.includes("CALL")
  ) {

    return "UP";

  }


  if (
    text.includes("DOWN") ||
    text.includes("SELL") ||
    text.includes("PUT")
  ) {

    return "DOWN";

  }


  if (
    text.includes("NEUTRAL") ||
    text.includes("HOLD") ||
    text.includes("WAIT")
  ) {

    return "NEUTRAL";

  }


  return "UNKNOWN";

}


/* =========================================================
   EXTRACT CONFIDENCE
   ========================================================= */

function extractConfidence(value) {

  if (
    value === null ||
    value === undefined
  ) {

    return null;

  }


  if (
    typeof value === "number"
  ) {

    return normalizeConfidence(
      value
    );

  }


  if (
    typeof value === "object"
  ) {

    return normalizeConfidence(
      value.confidence ??
      value.confidenceScore ??
      value.percentage
    );

  }


  return normalizeConfidence(
    value
  );

}


function normalizeConfidence(value) {

  const number =
    Number(
      String(value)
        .replace("%", "")
        .trim()
    );


  if (
    Number.isNaN(number) ||
    !Number.isFinite(number)
  ) {

    return null;

  }


  return Math.max(
    0,
    Math.min(
      100,
      Math.round(number)
    )
  );

}


/* =========================================================
   BUILD AI VOTES HTML
   ========================================================= */

function buildVotesHTML(votes) {

  if (
    !Array.isArray(votes) ||
    votes.length === 0
  ) {

    return "";

  }


  return votes
    .map((vote) => {

      const signal =
        vote.signal ||
        "UNKNOWN";


      const confidence =
        vote.confidence !== null &&
        vote.confidence !== undefined
          ? ` • ${vote.confidence}%`
          : "";


      return `
        <div class="ai-vote">
          <strong>${escapeHTML(vote.name)}</strong>
          <span>${escapeHTML(signal)}${confidence}</span>
        </div>
      `;

    })
    .join("");

}


/* =========================================================
   HTML ESCAPE
   ========================================================= */

function escapeHTML(value) {

  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

}


/* =========================================================
   TOAST
   ========================================================= */

function showToast(
  message,
  type = "info"
) {

  let container =
    document.querySelector(
      ".toast-container"
    );


  if (!container) {

    container =
      document.createElement("div");

    container.className =
      "toast-container";


    Object.assign(
      container.style,
      {
        position: "fixed",
        left: "50%",
        bottom: "25px",
        transform: "translateX(-50%)",
        zIndex: "3000",
        display: "flex",
        flexDirection: "column",
        gap: "9px",
        width: "min(420px, calc(100% - 30px))",
        pointerEvents: "none"
      }
    );


    document.body.appendChild(
      container
    );

  }


  const toast =
    document.createElement("div");


  toast.className =
    `ai-toast ${type}`;


  const icon =
    type === "success"
      ? "✓"
      : type === "error"
        ? "!"
        : "i";


  toast.innerHTML = `
    <span class="toast-icon">${icon}</span>
    <span>${escapeHTML(message)}</span>
  `;


  Object.assign(
    toast.style,
    {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      padding: "13px 15px",
      border: "1px solid rgba(255,255,255,.1)",
      borderRadius: "14px",
      color: "#fff",
      background: "rgba(14,19,34,.96)",
      boxShadow: "0 15px 40px rgba(0,0,0,.35)",
      fontSize: "12px",
      fontWeight: "700",
      pointerEvents: "auto",
      animation: "toastIn .3s ease both"
    }
  );


  container.appendChild(toast);


  setTimeout(() => {

    toast.style.opacity = "0";
    toast.style.transform =
      "translateY(8px)";


    toast.style.transition =
      "opacity .25s ease, transform .25s ease";


    setTimeout(() => {

      toast.remove();

    }, 300);

  }, 3500);

}


/* =========================================================
   ADD TOAST ANIMATION
   ========================================================= */

(function addToastAnimation() {

  if (
    document.getElementById(
      "ai-analyses-toast-style"
    )
  ) {

    return;

  }


  const style =
    document.createElement("style");


  style.id =
    "ai-analyses-toast-style";


  style.textContent = `
    @keyframes toastIn {
      from {
        opacity: 0;
        transform: translateY(10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .drag-active {
      border-color: rgba(0,217,255,.8) !important;
      background: rgba(0,217,255,.08) !important;
      transform: scale(1.01);
    }

    .ai-toast .toast-icon {
      width: 24px;
      height: 24px;
      min-width: 24px;
      display: grid;
      place-items: center;
      border-radius: 8px;
      background: rgba(108,99,255,.18);
      color: #8c7cff;
      font-weight: 900;
    }

    .ai-toast.success .toast-icon {
      background: rgba(32,229,154,.12);
      color: #20e59a;
    }

    .ai-toast.error .toast-icon {
      background: rgba(255,85,119,.12);
      color: #ff5577;
    }
  `;


  document.head.appendChild(style);

})();


/* =========================================================
   ONLINE / OFFLINE STATUS
   ========================================================= */

window.addEventListener(
  "online",
  () => {

    showToast(
      "Internet connection restored.",
      "success"
    );

  }
);


window.addEventListener(
  "offline",
  () => {

    showToast(
      "You are currently offline.",
      "error"
    );

  }
);


/* =========================================================
   EXPORT FOR DEBUGGING
   ========================================================= */

window.AIAnalyses = {

  showSection,

  generateFutureSignal,

  analyzeRealMarket,

  analyzeOTCMarket,

  clearImage,

  showToast

};
