const SONGS = [
  ["LOVE LOVE HAPPYDAY", "2013 · Early single"],
  ["春風ラバーズ", "2013 · Early single"],
  ["Don't stop me NOW", "2013 · Early single"],
  ["妄想的ギャラクシー", "2013 · Early single"],
  ["Lockon マイダーリン", "2013 · Early single"],
  ["COLOR", "2013 · Early single"],
  ["Toxic", "2014 · ALL is VANITY"],
  ["激動プログレッシブ", "2014 · ALL is VANITY"],
  ["Kissの花束", "2014 · ALL is VANITY"],
  ["Club Kids Never Die", "2014 · ALL is VANITY"],
  ["XYZ", "2014 · ALL is VANITY"],
  ["Let the revelry begin", "2014 · ALL is VANITY"],
  ["over there", "2014 · ALL is VANITY"],
  ["アスタリスク", "2014 · ALL is VANITY"],
  ["Seize the day!!", "2014 · ALL is VANITY"],
  ["Link", "2014 · ALL is VANITY"],
  ["Nextage", "2014 · NEXTAGE"],
  ["Shake it up tonight", "2014 · NEXTAGE"],
  ["Now I Know", "2015 · Now I Know"],
  ["Seek out the truth", "2015 · Now I Know"],
  ["オレンジ", "2015 · Now I Know"],
  ["Never Sleep Again", "2015 · Never Sleep Again"],
  ["Rize!!", "2015 · Never Sleep Again"],
  ["MOON PHASE", "2016 · VIRTUAL"],
  ["AXIS", "2016 · VIRTUAL"],
  ["ドリームメーカー", "2016 · VIRTUAL"],
  ["NINJA BOMBER", "2016 · VIRTUAL"],
  ["from here", "2016 · VIRTUAL"],
  ["SIGNAL", "2016 · VIRTUAL"],
  ["Selfish Girl", "2016 · VIRTUAL"],
  ["Don't leave me alone", "2016 · VIRTUAL"],
  ["You made my day", "2016 · VIRTUAL"],
  ["MISS UNLIMITED", "2016 · MISS UNLIMITED"],
  ["Cry Out", "2016 · MISS UNLIMITED"],
  ["TRACE", "2016 · MISS UNLIMITED"],
  ["bite the bullet", "2017 · ZENITH"],
  ["LOST", "2017 · bite the bullet"],
  ["カタルシス", "2017 · ZENITH"],
  ["Maze of mind", "2017 · ZENITH"],
  ["all or nothing", "2017 · ZENITH"],
  ["ONE STEP BEYOND", "2017 · ZENITH"],
  ["Scarlet night", "2017 · ZENITH"],
  ["Same to you", "2017 · ZENITH"],
  ["rise in revolt", "2017 · ZENITH"],
  ["Insanity", "2017 · ZENITH"],
  ["Voice", "2017 · ZENITH"],
  ["PARALLEL", "2018 · Locus"],
  ["Ray", "2018 · Ray"],
  ["UNTILL THE DAWN", "2018 · Ray"],
  ["TRICKSTER", "2018 · Ray"],
  ["Tonight", "2018 · Tonight / Taking you out"],
  ["Taking you out", "2018 · Tonight / Taking you out"],
  ["ATLAS", "2019 · ATLAS"],
  ["Future's near by", "2019 · ATLAS"],
  ["GOLDEN FIRE", "2019 · ATLAS"],
  ["PROJECTION", "2019 · CLARITY"],
  ["DIVE INTO THE LIGHT", "2019 · CLARITY"],
  ["4", "2019 · CLARITY"],
  ["THE DAY WITH NOTHING", "2019 · CLARITY"],
  ["horoscope", "2019 · CLARITY"],
  ["It's you", "2019 · CLARITY"],
  ["In the Rain", "2019 · CLARITY"],
  ["WILL", "2019 · CLARITY"],
  ["一か八か", "2019 · CLARITY"],
  ["STARRY SKY", "2020 · STARRY SKY"],
  ["Tramonto", "2020 · STARRY SKY"],
  ["Seize Approaching BRAND NEW ERA", "2020 · STARRY SKY"],
  ["MANTRA", "2020 · Digital single"],
  ["Anything New", "2020 · STRIVE"],
  ["SPARK IGNITION", "2020 · STRIVE"],
  ["Majestic", "2020 · STRIVE"],
  ["Shedding tears", "2020 · STRIVE"],
  ["Yin-Yang", "2020 · STRIVE"],
  ["Stealth Haze", "2020 · STRIVE"],
  ["yours", "2020 · STRIVE"],
  ["Remnants of my youth", "2020 · STRIVE"],
  ["Freely", "2021 · Freely / FLAVOR OF BLUE"],
  ["FLAVOR OF BLUE", "2021 · Freely / FLAVOR OF BLUE"],
  ["Live your truth", "2022 · REVERBERATE ep."],
  ["SIREN", "2022 · REVERBERATE ep."],
  ["NOTHING SEEKER", "2022 · REVERBERATE ep."],
  ["Clouds Across The Moon", "2022 · REVERBERATE ep."],
  ["Lord of Light", "2023 · GROUNDSWELL ep."],
  ["Melody from the Bumbling Clash", "2023 · GROUNDSWELL ep."],
  ["MYTH", "2023 · GROUNDSWELL ep."],
  ["GROUNDSWELL", "2023 · GROUNDSWELL ep."],
  ["恋するチェリーときどき花粉症", "2023 · Digital single"],
  ["WILLSHINE", "2024 · WILLSHINE"],
  ["Specter", "2024 · WILLSHINE"],
  ["SKILLAWAKE", "2024 · SKILLAWAKE"],
  ["Super Addiction", "2024 · SKILLAWAKE"],
  ["DESTINEX", "2025 · INSIGNIA"],
  ["MIRAGE WALKER", "2025 · INSIGNIA"],
  ["VIRIVIRI", "2025 · INSIGNIA"],
  ["One Time Only", "2025 · INSIGNIA"],
  ["A certain Motor-Heart is not working right!", "2025 · INSIGNIA"],
  ["Echoes", "2025 · INSIGNIA"],
  ["Liberator", "2026 · Liberator"],
  ["AWANE", "2026 · Liberator"],
  ["Every time, I knew", "2026 · Liberator"],
].map(([title, era], id) => ({ id, title, era }));

const STORAGE_KEY = "passcode-best9-state-v1";
const screens = [...document.querySelectorAll(".screen")];
const el = (id) => document.getElementById(id);
const history = [];
let state = null;

el("songCount").textContent = SONGS.length;

function shuffle(values) {
  const output = [...values];
  for (let i = output.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [output[i], output[j]] = [output[j], output[i]];
  }
  return output;
}

function freshState() {
  return {
    version: 1,
    runs: shuffle(SONGS.map((song) => [song.id])),
    nextRuns: [],
    current: null,
    choices: 0,
    completed: false,
    ranking: [],
  };
}

function showScreen(id) {
  screens.forEach((screen) => screen.classList.toggle("is-active", screen.id === id));
  el("restartHeader").hidden = id === "introScreen" || id === "resultScreen";
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function load() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (saved?.version === 1 && Array.isArray(saved.runs)) return saved;
  } catch (_) {
    // A broken local save should never block the sorter.
  }
  return null;
}

function prepareComparison() {
  if (state.current) return renderComparison();

  if (state.runs.length === 0) {
    state.runs = state.nextRuns;
    state.nextRuns = [];
  }

  if (state.runs.length === 1 && state.nextRuns.length === 0) {
    finish(state.runs[0]);
    return;
  }

  if (state.runs.length === 1) {
    state.nextRuns.push(state.runs.shift());
    return prepareComparison();
  }

  state.current = {
    left: state.runs.shift(),
    right: state.runs.shift(),
    leftIndex: 0,
    rightIndex: 0,
    merged: [],
  };
  save();
  renderComparison();
}

function renderComparison() {
  const { current } = state;
  const left = SONGS[current.left[current.leftIndex]];
  const right = SONGS[current.right[current.rightIndex]];
  el("titleA").textContent = left.title;
  el("eraA").textContent = left.era;
  el("titleB").textContent = right.title;
  el("eraB").textContent = right.era;

  const n = SONGS.length;
  const levels = Math.ceil(Math.log2(n));
  const maxComparisons = n * levels - 2 ** levels + 1;
  const progress = Math.min(99, Math.round((state.choices / maxComparisons) * 100));
  el("progressPercent").textContent = `${progress}%`;
  el("progressBar").style.width = `${progress}%`;
  document.querySelector("[role='progressbar']").setAttribute("aria-valuenow", progress);
  el("progressLabel").textContent = `${state.choices} choices made`;
  el("undoButton").disabled = history.length === 0;
}

function choose(side) {
  if (!state?.current) return;
  history.push(JSON.stringify(state));
  if (history.length > 80) history.shift();

  const current = state.current;
  if (side === "left") {
    current.merged.push(current.left[current.leftIndex]);
    current.leftIndex += 1;
  } else if (side === "right") {
    current.merged.push(current.right[current.rightIndex]);
    current.rightIndex += 1;
  } else {
    current.merged.push(current.left[current.leftIndex], current.right[current.rightIndex]);
    current.leftIndex += 1;
    current.rightIndex += 1;
  }
  state.choices += 1;

  const leftDone = current.leftIndex >= current.left.length;
  const rightDone = current.rightIndex >= current.right.length;
  if (leftDone || rightDone) {
    current.merged.push(
      ...current.left.slice(current.leftIndex),
      ...current.right.slice(current.rightIndex),
    );
    state.nextRuns.push(current.merged);
    state.current = null;
  }
  save();
  prepareComparison();
}

function undo() {
  const previous = history.pop();
  if (!previous) return;
  state = JSON.parse(previous);
  save();
  renderComparison();
}

function finish(ranking) {
  state.completed = true;
  state.ranking = ranking;
  state.runs = [ranking];
  state.current = null;
  save();
  renderResults(ranking.slice(0, 9));
}

function renderResults(ids, shared = false) {
  const top = ids.map((id) => SONGS[id]).filter(Boolean);
  el("rankingGrid").replaceChildren(
    ...top.map((song) => {
      const item = document.createElement("li");
      item.className = "ranking-card";
      const title = document.createElement("strong");
      title.textContent = song.title;
      const era = document.createElement("span");
      era.textContent = song.era;
      item.append(title, era);
      return item;
    }),
  );
  el("resultEyebrow").textContent = shared ? "SHARED RANKING" : "RANKING COMPLETE";
  el("resultTitle").textContent = shared ? "A PassCode Best 9" : "Your PassCode Best 9";
  el("resultSummary").textContent = shared
    ? "Someone sent you their nine essential tracks. How does yours compare?"
    : `${state?.choices ?? 0} choices shaped this lineup.`;
  el("shareButton").hidden = shared;
  el("copyButton").hidden = shared;
  el("restartButton").textContent = shared ? "Make your own Best 9" : "Rank again";
  drawShareCard(top);
  showScreen("resultScreen");
}

function splitTitle(ctx, title, maxWidth) {
  const units = title.includes(" ") ? title.split(" ") : [...title];
  const joiner = title.includes(" ") ? " " : "";
  const lines = [];
  let line = "";

  units.forEach((unit) => {
    const attempt = line ? `${line}${joiner}${unit}` : unit;
    if (ctx.measureText(attempt).width <= maxWidth || !line) {
      line = attempt;
    } else {
      lines.push(line);
      line = unit;
    }
  });
  if (line) lines.push(line);
  return lines;
}

function ellipsize(ctx, text, maxWidth) {
  if (ctx.measureText(text).width <= maxWidth) return text;
  let shortened = text;
  while (shortened.length > 1 && ctx.measureText(`${shortened}…`).width > maxWidth) {
    shortened = shortened.slice(0, -1);
  }
  return `${shortened}…`;
}

function drawShareCard(top) {
  const canvas = el("shareCanvas");
  const ctx = canvas.getContext("2d");
  const width = canvas.width;
  const margin = 54;
  const headerHeight = 146;
  const gridWidth = width - margin * 2;
  const cellWidth = gridWidth / 3;
  const cellHeight = 284;
  const gridTop = headerHeight;

  ctx.clearRect(0, 0, width, width);
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, width, width);

  ctx.strokeStyle = "#111214";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(margin, 42);
  ctx.lineTo(margin + 34, 102);
  ctx.moveTo(margin + 34, 42);
  ctx.lineTo(margin, 102);
  ctx.stroke();

  ctx.fillStyle = "#111214";
  ctx.font = '600 25px "Helvetica Neue", Arial, sans-serif';
  ctx.letterSpacing = "4px";
  ctx.fillText("PASSCODE", margin + 54, 74);
  ctx.font = '500 20px ui-monospace, "SFMono-Regular", Menlo, monospace';
  ctx.fillText("BEST 9", margin + 54, 105);
  ctx.textAlign = "right";
  ctx.fillStyle = "#777b80";
  ctx.font = '500 18px ui-monospace, "SFMono-Regular", Menlo, monospace';
  ctx.fillText("MY NINE ESSENTIAL TRACKS", width - margin, 78);
  ctx.textAlign = "left";

  top.forEach((song, index) => {
    const col = index % 3;
    const row = Math.floor(index / 3);
    const x = margin + col * cellWidth;
    const y = gridTop + row * cellHeight;
    const inset = 25;

    ctx.fillStyle = index % 2 === 0 ? "#f7f7f8" : "#ffffff";
    ctx.fillRect(x, y, cellWidth, cellHeight);
    ctx.strokeStyle = "#d4d6d9";
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, cellWidth, cellHeight);

    ctx.fillStyle = "#777b80";
    ctx.font = '500 20px ui-monospace, "SFMono-Regular", Menlo, monospace';
    ctx.fillText(String(index + 1).padStart(2, "0"), x + inset, y + 37);

    let fontSize = 36;
    let lines = [];
    do {
      ctx.font = `500 ${fontSize}px "Helvetica Neue", Arial, "Yu Gothic", YuGothic, sans-serif`;
      lines = splitTitle(ctx, song.title, cellWidth - inset * 2);
      fontSize -= 2;
    } while (lines.length > 3 && fontSize >= 22);

    ctx.fillStyle = "#111214";
    lines.slice(0, 3).forEach((line, lineIndex) => {
      const lastLine = lineIndex === 2 && lines.length > 3 ? `${line.replace(/[.…]*$/, "")}…` : line;
      ctx.fillText(lastLine, x + inset, y + 98 + lineIndex * (fontSize + 10));
    });

    ctx.fillStyle = "#777b80";
    ctx.font = '500 15px ui-monospace, "SFMono-Regular", Menlo, monospace';
    const meta = song.era.toUpperCase();
    const clippedMeta = ellipsize(ctx, meta, cellWidth - inset * 2);
    ctx.fillText(clippedMeta, x + inset, y + cellHeight - 24);
  });

  const footerY = gridTop + cellHeight * 3 + 38;
  ctx.fillStyle = "#111214";
  ctx.font = '500 17px ui-monospace, "SFMono-Regular", Menlo, monospace';
  ctx.fillText("PASSCODE BEST 9 · FAN-MADE SONG SORTER", margin, footerY);
  ctx.textAlign = "right";
  ctx.fillStyle = "#777b80";
  ctx.fillText("#PassCodeBest9", width - margin, footerY);
  ctx.textAlign = "left";
}

function topNine() {
  return state.ranking.slice(0, 9).map((id) => SONGS[id]);
}

function resultText() {
  return ["My PassCode Best 9", "", ...topNine().map((song, index) => `${index + 1}. ${song.title}`), "", "#PassCodeBest9"].join("\n");
}

function resultUrl() {
  const url = new URL(window.location.href);
  url.search = "";
  url.hash = "";
  url.searchParams.set("top", state.ranking.slice(0, 9).join("."));
  return url.toString();
}

async function copyText(text, message) {
  try {
    await navigator.clipboard.writeText(text);
    el("shareStatus").textContent = message;
  } catch (_) {
    el("shareStatus").textContent = "Copy was blocked by your browser. Select the ranking and copy it manually.";
  }
}

function shareImageBlob() {
  return new Promise((resolve, reject) => {
    el("shareCanvas").toBlob((blob) => {
      if (blob) resolve(blob);
      else reject(new Error("Could not create the image."));
    }, "image/png");
  });
}

async function downloadImage(showMessage = true) {
  try {
    const blob = await shareImageBlob();
    const imageUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = "passcode-best-9.png";
    link.click();
    URL.revokeObjectURL(imageUrl);
    if (showMessage) el("shareStatus").textContent = "Your 3×3 image has been downloaded.";
  } catch (_) {
    el("shareStatus").textContent = "The image could not be created in this browser.";
  }
}

async function share() {
  try {
    const blob = await shareImageBlob();
    const file = new File([blob], "passcode-best-9.png", { type: "image/png" });
    const data = { title: "My PassCode Best 9", text: resultText(), url: resultUrl(), files: [file] };
    if (navigator.share && navigator.canShare?.({ files: [file] })) {
      try {
        await navigator.share(data);
        return;
      } catch (error) {
        if (error.name === "AbortError") return;
      }
    }
    await downloadImage(false);
    el("shareStatus").textContent = "Image downloaded — attach it to any post to share your Best 9.";
  } catch (_) {
    el("shareStatus").textContent = "The image could not be created in this browser.";
  }
}

function startNew() {
  state = freshState();
  history.length = 0;
  save();
  showScreen("compareScreen");
  prepareComparison();
}

function confirmRestart() {
  if (!state || state.completed || window.confirm("Start over? Your current ranking progress will be replaced.")) {
    localStorage.removeItem(STORAGE_KEY);
    startNew();
  }
}

el("startButton").addEventListener("click", startNew);
el("resumeButton").addEventListener("click", () => {
  state = load();
  showScreen("compareScreen");
  prepareComparison();
});
el("choiceA").addEventListener("click", () => choose("left"));
el("choiceB").addEventListener("click", () => choose("right"));
el("tieButton").addEventListener("click", () => choose("tie"));
el("undoButton").addEventListener("click", undo);
el("restartButton").addEventListener("click", startNew);
el("restartHeader").addEventListener("click", confirmRestart);
el("shareButton").addEventListener("click", share);
el("downloadButton").addEventListener("click", () => downloadImage());
el("copyButton").addEventListener("click", () => copyText(resultText(), "Best 9 copied as text."));

document.addEventListener("keydown", (event) => {
  if (!el("compareScreen").classList.contains("is-active") || event.repeat) return;
  if (event.key === "1" || event.key === "ArrowLeft") choose("left");
  if (event.key === "2" || event.key === "ArrowRight") choose("right");
});

const sharedIds = new URLSearchParams(window.location.search)
  .get("top")
  ?.split(".")
  .map(Number)
  .filter((id) => Number.isInteger(id) && SONGS[id]);

if (sharedIds?.length === 9) {
  renderResults(sharedIds, true);
} else {
  const saved = load();
  if (saved?.completed && saved.ranking.length === SONGS.length) {
    state = saved;
    renderResults(saved.ranking.slice(0, 9));
  } else if (saved) {
    el("resumeButton").hidden = false;
    el("startButton").textContent = "Start a new ranking";
  }
}
