/* ======================================================
   KİŞİSEL AYARLAR
====================================================== */
const SECRET_CODE = "1306";
const RELATIONSHIP_START_DATE = "2026-06-01"; // Haziran 2026'daki ilk baş başa buluşma

const NOTE_CARDS = [
  { emoji: "💝", text: "Her sabahımı güzelleştiren ilk düşünce olman." },
  { emoji: "😊", text: "Gülüşünle en zor günümü bile hafifletmen." },
  { emoji: "🫶", text: "Beni gerçekten dinlediğini her an hissettirmen." },
  { emoji: "🌙", text: "Gece olunca bile kalbimin sana yakın hissetmesi." },
  { emoji: "🌸", text: "Küçücük şeyleri bile birlikte özel kılman." },
  { emoji: "🤗", text: "Sarılınca dünyanın geri kalanının susması." },
  { emoji: "✨", text: "Hayallerime inanıp bana cesaret vermen." },
  { emoji: "💗", text: "Sadece sen olduğun için seni her gün yeniden seçmem." },
  { emoji: "☕", text: "Birlikte içtiğimiz en sıradan kahvenin bile güzel gelmesi." },
  { emoji: "🎧", text: "Şarkılar duyunca aklıma ilk senin gelmen." },
  { emoji: "🌧️", text: "Yağmurlu günleri bile sesinle ısıtman." },
  { emoji: "🦋", text: "Yanındayken içimdeki heyecanın hiç bitmemesi." },
  { emoji: "🫧", text: "Beni ben yapan her küçük ayrıntıyı fark etmen." },
  { emoji: "🌍", text: "Dünyayı birlikte keşfetme hayali kurdurman." },
  { emoji: "🧸", text: "Kendimi en güvende senin yanında hissetmem." },
  { emoji: "💌", text: "Uzakta olsak bile sevgini hep yakınımda hissettirmem." },
  { emoji: "🌟", text: "Hayatıma geldiğin günden beri her şeyi biraz daha parlatman." },
  { emoji: "♾️", text: "Bizim hikâyemizin daha yazılacak çok güzel sayfası olması." }
];

const QUIZ_QUESTIONS = [
  {
    q: "En sevdiğin çiçek hangisi?",
    options: ["Şakayık", "Papatya", "Lale", "Orkide"],
    correct: 0
  },
  {
    q: "Tuttuğumuz takım hangisi?",
    options: ["Fenerbahçe", "Galatasaray", "Beşiktaş", "Trabzonspor"],
    correct: 0
  },
  {
    q: "En sevdiğin spor hangisi?",
    options: ["Yüzme", "Voleybol", "Tenis", "Basketbol"],
    correct: 0
  },
  {
    q: "En sevmediğin çiçek hangisi?",
    options: ["Gül", "Sümbül", "Menekşe", "Karanfil"],
    correct: 0
  },
  {
    q: "En sevdiğin tatlı hangisi?",
    options: ["Dondurma", "Baklava", "Sufle", "Tiramisu"],
    correct: 0
  },
  {
    q: "En sevdiğin mevsim hangisi?",
    options: ["Kış", "İlkbahar", "Yaz", "Sonbahar"],
    correct: 0
  }
];

const DAILY_MESSAGES = [
  "Gülüşün odayı her şeyden daha güzel dolduruyor.",
  "Seninle geçen her sıradan gün bile benim için özel.",
  "Bugün de seni dünden daha çok seviyorum.",
  "Varlığın, kalbimin en sevdiği huzur yeri.",
  "Sen benim en güzel alışkanlığımsın.",
  "Uzak olsan bile kalbim sana hep çok yakın.",
  "İyi ki hikâyemizin en güzel kısmı sensin."
];

const MOOD_OPTIONS = ["😍", "🥰", "🙂", "😌", "😴", "🥺", "😢", "😠", "😵‍💫", "💖"];

/* ======================================================
   GENEL YARDIMCILAR
====================================================== */
function getDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function parseLocalDate(dateKey) {
  const [year, month, day] = dateKey.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function formatDateTR(dateKey, includeYear = false) {
  const date = typeof dateKey === "string" ? parseLocalDate(dateKey) : dateKey;
  const months = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];
  return `${date.getDate()} ${months[date.getMonth()]}${includeYear ? ` ${date.getFullYear()}` : ""}`;
}

function getStoredJson(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback));
  } catch {
    return fallback;
  }
}

/* ======================================================
   KİLİT EKRANI
====================================================== */
let enteredCode = "";

function updateDots() {
  const dots = document.querySelectorAll("#lock-dots .dot");
  dots.forEach((dot, index) => dot.classList.toggle("filled", index < enteredCode.length));
}

function checkCode() {
  const dotsWrap = document.getElementById("lock-dots");
  const message = document.getElementById("lock-msg");

  if (enteredCode === SECRET_CODE) {
    const lockScreen = document.getElementById("lock-screen");
    lockScreen.style.transition = "opacity 0.4s ease";
    lockScreen.style.opacity = "0";
    setTimeout(() => {
      lockScreen.classList.add("hidden");
      document.getElementById("app").classList.remove("hidden");
    }, 400);
    return;
  }

  dotsWrap.classList.add("shake");
  message.textContent = "Tekrar dene aşkım 🥺";
  setTimeout(() => {
    dotsWrap.classList.remove("shake");
    enteredCode = "";
    updateDots();
  }, 500);
}

document.getElementById("numpad").addEventListener("click", (event) => {
  const button = event.target.closest(".num-btn");
  if (!button || button.classList.contains("empty")) return;

  if (button.id === "backspace-btn") {
    enteredCode = enteredCode.slice(0, -1);
    document.getElementById("lock-msg").textContent = "";
    updateDots();
    return;
  }

  if (enteredCode.length >= 4) return;
  enteredCode += button.dataset.num;
  updateDots();
  if (enteredCode.length === 4) setTimeout(checkCode, 150);
});

/* ======================================================
   TEMA VE SAYFA GEÇİŞLERİ
====================================================== */
function setTheme(theme) {
  document.body.dataset.theme = theme;
  localStorage.setItem("app-theme", theme);
  document.querySelectorAll(".theme-dot").forEach((dot) => {
    dot.classList.toggle("active", dot.dataset.t === theme);
  });
}

document.querySelectorAll(".theme-dot").forEach((dot) => {
  dot.addEventListener("click", () => setTheme(dot.dataset.t));
});

const savedTheme = localStorage.getItem("app-theme");
if (savedTheme) setTheme(savedTheme);

function closeSideMenu() {
  document.getElementById("side-menu-overlay").classList.add("hidden");
}

function goToPage(pageName) {
  document.querySelectorAll(".page").forEach((page) => page.classList.add("hidden"));
  document.getElementById(`page-${pageName}`)?.classList.remove("hidden");
  document.querySelectorAll(".nav-btn").forEach((button) => {
    button.classList.toggle("active", button.dataset.page === pageName);
  });
  closeSideMenu();
}

document.querySelectorAll(".nav-btn, .menu-item").forEach((button) => {
  button.addEventListener("click", () => goToPage(button.dataset.page));
});

document.getElementById("menu-open-btn").addEventListener("click", () => {
  document.getElementById("side-menu-overlay").classList.remove("hidden");
});

document.getElementById("side-menu-overlay").addEventListener("click", (event) => {
  if (event.target.id === "side-menu-overlay") closeSideMenu();
});

/* ======================================================
   ANA SAYFA VE KALP
====================================================== */
document.getElementById("daily-refresh-btn").addEventListener("click", () => {
  const random = DAILY_MESSAGES[Math.floor(Math.random() * DAILY_MESSAGES.length)];
  document.getElementById("daily-card-text").textContent = `“${random}”`;
});

document.getElementById("send-heart-btn").addEventListener("click", () => {
  spawnFloatingEmojis();
  const caption = document.querySelector(".heart-caption");
  caption.textContent = "Kalbin yola çıktı 💌";
  setTimeout(() => {
    caption.textContent = "Özledim demek için dokun";
  }, 2200);

});

function spawnFloatingEmojis() {
  const emojis = ["❤️", "💖", "🌸", "✨", "💌"];
  for (let index = 0; index < 8; index += 1) {
    setTimeout(() => {
      const emoji = document.createElement("div");
      emoji.className = "floating-emoji";
      emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      emoji.style.left = `${50 + (Math.random() * 60 - 30)}%`;
      document.body.appendChild(emoji);
      setTimeout(() => emoji.remove(), 1800);
    }, index * 90);
  }
}

/* ======================================================
   RUH HALİ: BUGÜN BALONU + TAKVİM
====================================================== */
let selectedMoodDate = getDateKey(new Date());
const moodCalendarDate = new Date();
moodCalendarDate.setDate(1);

function loadMoods() {
  return getStoredJson("mood-history", {});
}

function saveMoods(moods) {
  localStorage.setItem("mood-history", JSON.stringify(moods));
}

function updateMoodBubble() {
  const bubble = document.getElementById("mood-bubble-btn");
  const todayMood = loadMoods()[getDateKey(new Date())] || "🙂";
  bubble.textContent = todayMood;
  bubble.setAttribute("aria-label", "Bugünkü ruh halini seç");
}

function setupMoodPicker() {
  const options = document.querySelector(".mood-options");
  options.innerHTML = "";
  MOOD_OPTIONS.forEach((mood) => {
    const button = document.createElement("button");
    button.className = "mood-opt";
    button.type = "button";
    button.textContent = mood;
    button.setAttribute("aria-label", `${mood} ruh hali`);
    button.addEventListener("click", () => {
      const moods = loadMoods();
      moods[selectedMoodDate] = mood;
      saveMoods(moods);
      document.getElementById("mood-sheet").classList.add("hidden");
      updateMoodBubble();
      renderMoodCalendar();
    });
    options.appendChild(button);
  });

  const sheetInner = document.querySelector(".mood-sheet-inner");
  const title = sheetInner.querySelector("h2");
  const dateText = document.createElement("p");
  dateText.id = "mood-sheet-date";
  dateText.className = "mood-sheet-date";
  title.insertAdjacentElement("afterend", dateText);

  const clearButton = document.createElement("button");
  clearButton.id = "mood-clear-btn";
  clearButton.type = "button";
  clearButton.className = "mood-clear-btn";
  clearButton.textContent = "Bu günün ruh halini temizle";
  clearButton.addEventListener("click", () => {
    const moods = loadMoods();
    delete moods[selectedMoodDate];
    saveMoods(moods);
    document.getElementById("mood-sheet").classList.add("hidden");
    updateMoodBubble();
    renderMoodCalendar();
  });
  sheetInner.appendChild(clearButton);
}

function openMoodPicker(dateKey = getDateKey(new Date())) {
  selectedMoodDate = dateKey;
  document.querySelector(".mood-sheet-inner h2").textContent = "Bu gün nasıldı?";
  document.getElementById("mood-sheet-date").textContent = formatDateTR(dateKey, true);
  document.getElementById("mood-sheet").classList.remove("hidden");
}

function setupMoodCalendar() {
  const page = document.getElementById("page-moodcal");
  const grid = document.getElementById("mood-calendar-grid");
  const subtitle = page.querySelector(".page-subtitle");
  subtitle.textContent = "Bir güne dokun, o günün ruh halini seç veya değiştir.";

  const toolbar = document.createElement("div");
  toolbar.className = "mood-calendar-toolbar";
  const previous = document.createElement("button");
  previous.className = "calendar-nav-btn";
  previous.type = "button";
  previous.textContent = "‹";
  previous.setAttribute("aria-label", "Önceki ay");
  previous.addEventListener("click", () => {
    moodCalendarDate.setMonth(moodCalendarDate.getMonth() - 1);
    renderMoodCalendar();
  });
  const title = document.createElement("h2");
  title.id = "mood-calendar-title";
  const next = document.createElement("button");
  next.className = "calendar-nav-btn";
  next.type = "button";
  next.textContent = "›";
  next.setAttribute("aria-label", "Sonraki ay");
  next.addEventListener("click", () => {
    moodCalendarDate.setMonth(moodCalendarDate.getMonth() + 1);
    renderMoodCalendar();
  });
  toolbar.append(previous, title, next);

  const weekdays = document.createElement("div");
  weekdays.className = "mood-weekdays";
  ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"].forEach((day) => {
    const label = document.createElement("span");
    label.textContent = day;
    weekdays.appendChild(label);
  });
  page.insertBefore(toolbar, grid);
  page.insertBefore(weekdays, grid);
}

function renderMoodCalendar() {
  const grid = document.getElementById("mood-calendar-grid");
  const title = document.getElementById("mood-calendar-title");
  const moods = loadMoods();
  const year = moodCalendarDate.getFullYear();
  const month = moodCalendarDate.getMonth();
  const firstDayOffset = (new Date(year, month, 1).getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const monthTitle = new Intl.DateTimeFormat("tr-TR", { month: "long", year: "numeric" }).format(moodCalendarDate);

  title.textContent = monthTitle.charAt(0).toUpperCase() + monthTitle.slice(1);
  grid.innerHTML = "";
  for (let index = 0; index < firstDayOffset; index += 1) {
    const blank = document.createElement("span");
    blank.className = "mood-calendar-blank";
    grid.appendChild(blank);
  }

  const todayKey = getDateKey(new Date());
  for (let day = 1; day <= daysInMonth; day += 1) {
    const date = new Date(year, month, day);
    const dateKey = getDateKey(date);
    const cell = document.createElement("button");
    cell.type = "button";
    cell.className = "mood-calendar-cell";
    if (dateKey === todayKey) cell.classList.add("today");
    if (moods[dateKey]) cell.classList.add("has-mood");
    cell.setAttribute("aria-label", `${formatDateTR(dateKey, true)} ruh halini düzenle`);

    const number = document.createElement("span");
    number.className = "mood-date-number";
    number.textContent = day;
    const emoji = document.createElement("span");
    emoji.className = "mood-date-emoji";
    emoji.textContent = moods[dateKey] || "";
    cell.append(number, emoji);
    cell.addEventListener("click", () => openMoodPicker(dateKey));
    grid.appendChild(cell);
  }
}

setupMoodPicker();
setupMoodCalendar();
document.getElementById("mood-bubble-btn").addEventListener("click", () => openMoodPicker());
document.getElementById("mood-sheet").addEventListener("click", (event) => {
  if (event.target.id === "mood-sheet") event.currentTarget.classList.add("hidden");
});
updateMoodBubble();

/* ======================================================
   SEVGİ NOTLARI
====================================================== */
let noteIndex = 0;

function renderNoteCard() {
  const card = NOTE_CARDS[noteIndex];
  document.getElementById("note-emoji").textContent = card.emoji;
  document.getElementById("note-text").textContent = card.text;
  document.getElementById("note-counter").textContent = `${noteIndex + 1} / ${NOTE_CARDS.length}`;
}

document.getElementById("note-prev").addEventListener("click", () => {
  noteIndex = (noteIndex - 1 + NOTE_CARDS.length) % NOTE_CARDS.length;
  renderNoteCard();
});
document.getElementById("note-next").addEventListener("click", () => {
  noteIndex = (noteIndex + 1) % NOTE_CARDS.length;
  renderNoteCard();
});
renderNoteCard();

/* ======================================================
   MEKTUP
====================================================== */
const letterTextarea = document.getElementById("letter-textarea");
const savedLetter = localStorage.getItem("saved-letter");
if (savedLetter) letterTextarea.value = savedLetter;

document.getElementById("letter-save-btn").addEventListener("click", () => {
  localStorage.setItem("saved-letter", letterTextarea.value);
  const message = document.getElementById("letter-saved-msg");
  message.textContent = "Mektup kaydedildi 💾";
  setTimeout(() => { message.textContent = ""; }, 2000);
});

/* ======================================================
   QUIZ
====================================================== */
let quizIndex = 0;
let quizScore = 0;
let quizAnswered = false;

function renderQuizProgress() {
  const wrap = document.getElementById("quiz-progress");
  wrap.innerHTML = "";
  QUIZ_QUESTIONS.forEach((_, index) => {
    const segment = document.createElement("div");
    segment.className = `seg${index < quizIndex ? " done" : ""}`;
    wrap.appendChild(segment);
  });
}

function renderQuizQuestion() {
  quizAnswered = false;
  renderQuizProgress();
  const body = document.getElementById("quiz-body");
  const question = QUIZ_QUESTIONS[quizIndex];
  body.innerHTML = "";
  const label = document.createElement("div");
  label.className = "quiz-q-label";
  label.textContent = `Soru ${quizIndex + 1} / ${QUIZ_QUESTIONS.length}`;
  const title = document.createElement("div");
  title.className = "quiz-question";
  title.textContent = question.q;
  const options = document.createElement("div");

  question.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.className = "quiz-opt";
    button.textContent = option;
    button.addEventListener("click", () => handleQuizAnswer(index, button));
    options.appendChild(button);
  });
  body.append(label, title, options);
}

function handleQuizAnswer(answerIndex, selectedButton) {
  if (quizAnswered) return;
  quizAnswered = true;
  const question = QUIZ_QUESTIONS[quizIndex];
  const buttons = document.querySelectorAll(".quiz-opt");

  if (answerIndex === question.correct) {
    selectedButton.classList.add("correct");
    quizScore += 1;
  } else {
    selectedButton.classList.add("wrong");
    buttons[question.correct].classList.add("correct");
  }

  setTimeout(() => {
    quizIndex += 1;
    if (quizIndex < QUIZ_QUESTIONS.length) renderQuizQuestion();
    else renderQuizResult();
  }, 900);
}

function renderQuizResult() {
  renderQuizProgress();
  const body = document.getElementById("quiz-body");
  body.innerHTML = `
    <div class="quiz-result">
      <div class="big-emoji">🏆</div>
      <h2>${quizScore} / ${QUIZ_QUESTIONS.length} doğru!</h2>
      <p style="color:var(--text-secondary); margin-top:8px;">Bizi ne kadar iyi tanıdığına bak 💖</p>
      <button class="quiz-restart" id="quiz-restart-btn">Tekrar Oyna</button>
    </div>`;
  document.getElementById("quiz-restart-btn").addEventListener("click", () => {
    quizIndex = 0;
    quizScore = 0;
    renderQuizQuestion();
  });
}

renderQuizQuestion();

/* ======================================================
   ANILAR: FOTOĞRAF + BAŞLIK
====================================================== */
function loadMemories() {
  return getStoredJson("memories", []);
}

function saveMemories(memories) {
  try {
    localStorage.setItem("memories", JSON.stringify(memories));
    return true;
  } catch {
    alert("Fotoğraf kaydedilemedi. Daha küçük bir fotoğraf seçmeyi dene.");
    return false;
  }
}

function getMemoryFileInput() {
  let input = document.getElementById("memory-file-input");
  if (input) return input;
  input = document.createElement("input");
  input.id = "memory-file-input";
  input.type = "file";
  input.accept = "image/*";
  input.className = "hidden";
  document.getElementById("page-memories").appendChild(input);
  return input;
}

async function resizeImageForStorage(file) {
  const sourceUrl = await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => {
      const maxSize = 1200;
      const scale = Math.min(1, maxSize / Math.max(image.width, image.height));
      const canvas = document.createElement("canvas");
      canvas.width = Math.max(1, Math.round(image.width * scale));
      canvas.height = Math.max(1, Math.round(image.height * scale));
      const context = canvas.getContext("2d");
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      resolve(canvas.toDataURL("image/jpeg", 0.82));
    };
    image.onerror = reject;
    image.src = sourceUrl;
  });
}

function renderMemories() {
  const grid = document.getElementById("memories-grid");
  const memories = loadMemories();
  grid.innerHTML = "";

  memories.forEach((memory, index) => {
    const card = document.createElement("article");
    card.className = "polaroid";
    const photo = document.createElement("div");
    photo.className = "polaroid-photo";
    if (memory.photo) {
      const image = document.createElement("img");
      image.src = memory.photo;
      image.alt = memory.caption || "Anımız";
      photo.appendChild(image);
    } else {
      photo.textContent = "📷";
    }
    const caption = document.createElement("div");
    caption.className = "polaroid-caption";
    caption.textContent = memory.caption;
    const deleteButton = document.createElement("button");
    deleteButton.className = "memory-delete-btn";
    deleteButton.type = "button";
    deleteButton.title = "Anıyı sil";
    deleteButton.setAttribute("aria-label", `${memory.caption} anısını sil`);
    deleteButton.textContent = "×";
    deleteButton.addEventListener("click", () => {
      if (!confirm("Bu anıyı silmek istediğine emin misin?")) return;
      memories.splice(index, 1);
      saveMemories(memories);
      renderMemories();
    });
    card.append(photo, caption, deleteButton);
    grid.appendChild(card);
  });

  const addButton = document.createElement("button");
  addButton.className = "add-memory-btn";
  addButton.type = "button";
  addButton.textContent = "+ Fotoğrafla yeni anı ekle";
  addButton.addEventListener("click", handleAddMemory);
  grid.appendChild(addButton);
}

function handleAddMemory() {
  const caption = prompt("Bu anı için kısa bir başlık yaz:");
  if (!caption?.trim()) return;
  const input = getMemoryFileInput();
  input.dataset.caption = caption.trim();
  input.value = "";
  input.click();
}

getMemoryFileInput().addEventListener("change", async (event) => {
  const file = event.target.files?.[0];
  const caption = event.target.dataset.caption;
  if (!file || !caption) return;
  if (!file.type.startsWith("image/")) {
    alert("Lütfen bir fotoğraf seç.");
    return;
  }

  try {
    const photo = await resizeImageForStorage(file);
    const memories = loadMemories();
    memories.unshift({ id: `${Date.now()}`, caption, photo });
    if (saveMemories(memories)) renderMemories();
  } catch {
    alert("Fotoğraf okunamadı. Başka bir fotoğraf seçmeyi dene.");
  } finally {
    event.target.value = "";
    delete event.target.dataset.caption;
  }
});

renderMemories();

/* ======================================================
   SAYAÇ VE AY DÖNÜMLERİ
====================================================== */
function addMonths(date, monthCount) {
  const copy = new Date(date);
  copy.setMonth(copy.getMonth() + monthCount);
  return copy;
}

function updateMilestone(monthCount, targetIndex) {
  const start = parseLocalDate(RELATIONSHIP_START_DATE);
  const milestone = addMonths(start, monthCount);
  const diff = milestone.getTime() - Date.now();
  const target = document.querySelectorAll(".mini-countdown-row .days")[targetIndex];
  if (!target) return;
  if (diff <= 0) {
    target.textContent = `${monthCount}. ayımız kutlu olsun ✨`;
    return;
  }
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
  target.textContent = `${days} gün kaldı`;
}

function updateCountdown() {
  const start = parseLocalDate(RELATIONSHIP_START_DATE);
  const elapsed = Math.max(0, Date.now() - start.getTime());
  const days = Math.floor(elapsed / (1000 * 60 * 60 * 24));
  const hours = Math.floor((elapsed / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((elapsed / (1000 * 60)) % 60);
  const seconds = Math.floor((elapsed / 1000) % 60);

  document.getElementById("countdown-date-badge").textContent = `${formatDateTR(RELATIONSHIP_START_DATE, true)}’dan beri`;
  document.querySelector(".countdown-hero .page-subtitle").textContent = "İlk baş başa buluşmamızdan beri";
  document.getElementById("cd-days").textContent = String(days).padStart(2, "0");
  document.getElementById("cd-hours").textContent = String(hours).padStart(2, "0");
  document.getElementById("cd-mins").textContent = String(minutes).padStart(2, "0");
  document.getElementById("cd-secs").textContent = String(seconds).padStart(2, "0");
  updateMilestone(5, 0);
  updateMilestone(6, 1);
}

updateCountdown();
setInterval(updateCountdown, 1000);

/* ======================================================
   İSTEK LİSTESİ
====================================================== */
function loadWishlist() {
  return getStoredJson("wishlist", []);
}

function saveWishlist(items) {
  localStorage.setItem("wishlist", JSON.stringify(items));
}

function renderWishlist() {
  const list = document.getElementById("wishlist-list");
  const items = loadWishlist();
  list.innerHTML = "";
  if (items.length === 0) {
    list.innerHTML = '<p class="empty-list-message">Henüz bir şey eklenmedi 🛍️</p>';
    return;
  }

  items.forEach((item, index) => {
    const row = document.createElement("div");
    row.className = `wishlist-item${item.purchased ? " purchased" : ""}`;
    const thumb = document.createElement("div");
    thumb.className = "thumb";
    thumb.textContent = item.purchased ? "🎁" : "🛍️";
    const info = document.createElement("div");
    info.className = "info";
    const name = document.createElement("div");
    name.className = "name";
    name.textContent = item.name;
    const note = document.createElement("div");
    note.className = "note";
    note.textContent = item.purchased ? "Alındı 💝" : "İstek listesinde";
    info.append(name, note);

    const toggle = document.createElement("button");
    toggle.className = "item-status-btn";
    toggle.type = "button";
    toggle.title = item.purchased ? "Alınmadı olarak işaretle" : "Alındı olarak işaretle";
    toggle.textContent = item.purchased ? "✓" : "○";
    toggle.addEventListener("click", () => {
      items[index].purchased = !items[index].purchased;
      saveWishlist(items);
      renderWishlist();
    });

    const deleteButton = document.createElement("button");
    deleteButton.className = "item-delete-btn";
    deleteButton.type = "button";
    deleteButton.title = "Listeden sil";
    deleteButton.textContent = "×";
    deleteButton.addEventListener("click", () => {
      if (!confirm("Bu isteği listeden silmek istediğine emin misin?")) return;
      items.splice(index, 1);
      saveWishlist(items);
      renderWishlist();
    });

    row.append(thumb, info, toggle, deleteButton);
    list.appendChild(row);
  });
}

function addWishlistItem() {
  const input = document.getElementById("wishlist-input");
  const name = input.value.trim();
  if (!name) return;
  const items = loadWishlist();
  items.push({ id: `${Date.now()}`, name, purchased: false });
  saveWishlist(items);
  input.value = "";
  renderWishlist();
}

document.getElementById("wishlist-add-btn").addEventListener("click", addWishlistItem);
document.getElementById("wishlist-input").addEventListener("keydown", (event) => {
  if (event.key === "Enter") addWishlistItem();
});
renderWishlist();

/* ======================================================
   ORTAK LİSTE
====================================================== */
function loadSharedList() {
  return getStoredJson("shared-list", []);
}

function saveSharedList(items) {
  localStorage.setItem("shared-list", JSON.stringify(items));
}

function renderSharedList() {
  const list = document.getElementById("sharedlist-list");
  const items = loadSharedList();
  list.innerHTML = "";
  if (items.length === 0) {
    list.innerHTML = '<p class="empty-list-message">Birlikte yapacağınız ilk şeyi ekleyin ✨</p>';
    return;
  }

  items.forEach((item, index) => {
    const row = document.createElement("div");
    row.className = `checklist-item${item.done ? " done" : ""}`;
    const toggle = document.createElement("button");
    toggle.className = "list-check-toggle";
    toggle.type = "button";
    toggle.setAttribute("aria-label", item.done ? "Yapılmadı olarak işaretle" : "Yapıldı olarak işaretle");
    toggle.innerHTML = `<span class="box">${item.done ? "✓" : ""}</span>`;
    toggle.addEventListener("click", () => {
      items[index].done = !items[index].done;
      saveSharedList(items);
      renderSharedList();
    });
    const label = document.createElement("div");
    label.className = "label";
    label.textContent = item.text;
    label.addEventListener("click", () => toggle.click());
    const deleteButton = document.createElement("button");
    deleteButton.className = "item-delete-btn";
    deleteButton.type = "button";
    deleteButton.title = "Listeden sil";
    deleteButton.textContent = "×";
    deleteButton.addEventListener("click", () => {
      if (!confirm("Bu maddeyi silmek istediğine emin misin?")) return;
      items.splice(index, 1);
      saveSharedList(items);
      renderSharedList();
    });
    row.append(toggle, label, deleteButton);
    list.appendChild(row);
  });
}

function addSharedListItem() {
  const input = document.getElementById("sharedlist-input");
  const text = input.value.trim();
  if (!text) return;
  const items = loadSharedList();
  items.push({ id: `${Date.now()}`, text, done: false });
  saveSharedList(items);
  input.value = "";
  renderSharedList();
}

document.getElementById("sharedlist-add-btn").addEventListener("click", addSharedListItem);
document.getElementById("sharedlist-input").addEventListener("keydown", (event) => {
  if (event.key === "Enter") addSharedListItem();
});
renderSharedList();

/* ======================================================
   SÜRPRİZ VE PWA
====================================================== */
document.getElementById("replay-hearts-btn").addEventListener("click", spawnFloatingEmojis);
renderMoodCalendar();

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  });
}
