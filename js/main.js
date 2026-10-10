/* Tüm sayfalarda ortak: nav, scroll animasyonları, veritabanından içerik doldurma. */
(function () {
  const DB = window.DB;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];

  // Aktif menü linki
  const page = location.pathname.split("/").pop() || "index.html";
  $$(".nav a").forEach((a) => {
    if (a.getAttribute("href").split("#")[0] === page) a.classList.add("active");
  });

  // [data-db="profile.email"] gibi alanları doldur
  $$("[data-db]").forEach((el) => {
    const val = el.dataset.db.split(".").reduce((o, k) => o && o[k], DB);
    if (val == null) return;
    if (el.tagName === "IMG") el.src = val;
    else if (el.tagName === "A") el.href = el.dataset.dbPrefix ? el.dataset.dbPrefix + val : val;
    else el.textContent = val;
  });

  // Footer
  $$("footer [data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));

  // ----- Ana sayfa -----
  const avatar = $("#avatar");
  if (avatar && window.mountAvatar) window.mountAvatar(avatar);

  // Başlığı tek satıra sığdır (ekran genişliğine göre font boyutu)
  const heroTitle = $(".hero h1");
  if (heroTitle) {
    const fit = () => {
      heroTitle.style.fontSize = "100px";
      const cs = getComputedStyle(heroTitle.parentElement);
      const avail = heroTitle.parentElement.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
      const ratio = avail / heroTitle.scrollWidth;
      heroTitle.style.fontSize = Math.min(170, 100 * ratio * 0.98) + "px";
    };
    fit();
    document.fonts && document.fonts.ready.then(fit);
    window.addEventListener("resize", fit);
  }

  const tagline = $("#tagline");
  if (tagline) {
    tagline.innerHTML = DB.profile.tagline
      .map((t, i) => `<span style="animation-delay:${0.9 + i * 0.15}s">${t}</span>`)
      .join("");
  }

  // "About me" metni: kaydırdıkça kelime kelime aydınlanır
  const reveal = $("#about-text");
  if (reveal) {
    reveal.innerHTML = DB.profile.about
      .split(" ")
      .map((w) => `<span class="w">${w}</span>`)
      .join(" ");
    const words = $$(".w", reveal);
    const onScroll = () => {
      const r = reveal.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (r.height + vh * 0.35)));
      const n = Math.round(p * words.length);
      words.forEach((w, i) => w.classList.toggle("on", i < n));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  const exp = $("#experience");
  if (exp) {
    exp.innerHTML =
      DB.experience.map((e) => `
        <article class="card in">
          <p class="eyebrow">Experience</p>
          <h3>${e.company}</h3>
          <p class="meta">${e.role} · ${e.period}</p>
          <p>${e.text}</p>
        </article>`).join("") +
      DB.education.map((e) => `
        <article class="card in">
          <p class="eyebrow">Education</p>
          <h3>${e.school}</h3>
          <p class="meta">${e.period} · ${e.place}</p>
          <p>${e.degree}</p>
        </article>`).join("");
  }

  const hl = $("#highlights");
  if (hl) hl.innerHTML = DB.highlights.map((h) => `<span class="chip">${h}</span>`).join("");

  const langs = $("#languages");
  if (langs) {
    langs.innerHTML = DB.languages.map((l) => `
      <div style="margin-bottom:18px">
        <div style="display:flex;justify-content:space-between"><span>${l.name}</span><span class="lvl">${l.level}</span></div>
        <div class="bar"><i data-w="${l.pct}"></i></div>
      </div>`).join("");
  }

  const hob = $("#hobbies");
  if (hob) hob.innerHTML = DB.hobbies.map((h) => `<span class="chip">${h.icon} ${h.name}</span>`).join("");

  // ----- Experience sayfası: resimli tablolar -----
  const skillRows = $("#skills-table");
  if (skillRows) {
    skillRows.innerHTML = DB.skills.map((s) => `
      <tr tabindex="0">
        <td><img src="assets/icons/${s.icon}.svg" alt="${s.name} icon"></td>
        <td><strong>${s.name}</strong></td>
        <td>${s.use}</td>
        <td><div style="display:flex;align-items:center"><div class="bar"><i data-w="${s.level * 10}"></i></div><span class="lvl">${s.level}/10</span></div></td>
      </tr>`).join("");
  }
  const courseRows = $("#courses-table");
  if (courseRows) {
    courseRows.innerHTML = DB.courses.map((c) => `
      <tr tabindex="0">
        <td><img src="assets/icons/${c.icon}.svg" alt=""></td>
        <td>${c.name}</td>
        <td class="lvl">${c.date}</td>
      </tr>`).join("");
  }
  $$("tbody tr").forEach((tr) => {
    const toggle = () => tr.classList.toggle("selected");
    tr.addEventListener("click", toggle);
    tr.addEventListener("keydown", (e) => { if (e.key === "Enter") toggle(); });
  });

  // ----- İletişim -----
  const form = $("#contact-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const f = new FormData(form);
      const body = `${f.get("message")}\n\n— ${f.get("name")} (${f.get("email")})`;
      location.href = `mailto:${DB.profile.email}?subject=${encodeURIComponent("Hello from your website")}&body=${encodeURIComponent(body)}`;
      toast("Opening your mail app…");
    });
  }
  const copyBtn = $("#copy-email");
  if (copyBtn) {
    copyBtn.addEventListener("click", async () => {
      try { await navigator.clipboard.writeText(DB.profile.email); toast("Email copied!"); }
      catch { toast(DB.profile.email); }
    });
  }

  function toast(msg) {
    let t = $(".toast");
    if (!t) { t = document.createElement("div"); t.className = "toast"; document.body.appendChild(t); }
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(t._h);
    t._h = setTimeout(() => t.classList.remove("show"), 2200);
  }

  // Ekrana girince görünür yap + barları doldur
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      en.target.classList.add("visible");
      $$(".bar > i", en.target).forEach((i) => (i.style.width = i.dataset.w + "%"));
      io.unobserve(en.target);
    });
  }, { threshold: 0.15 });
  $$(".in, .observe").forEach((el) => io.observe(el));
})();
