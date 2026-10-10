/*
 * Nagihan'ın SVG avatarı (fotoğraftan esinlenen çizim: uzun koyu saç,
 * bej blazer, beyaz üst). Sayfa aşağı kaydırıldıkça el sallar,
 * tıklayınca da selam verir, gözleri kırpar, başı fareyi takip eder.
 */
(function () {
  const SVG = `
<svg viewBox="0 0 320 640" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Nagihan waving">
  <defs>
    <linearGradient id="blazer" x1="0" x2="1">
      <stop offset="0" stop-color="#b8996d"/><stop offset=".5" stop-color="#cfb086"/><stop offset="1" stop-color="#a98a5f"/>
    </linearGradient>
    <linearGradient id="hair" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#2b1c16"/><stop offset="1" stop-color="#1a110d"/>
    </linearGradient>
    <linearGradient id="pants" x1="0" x2="1">
      <stop offset="0" stop-color="#2f2a27"/><stop offset="1" stop-color="#46403b"/>
    </linearGradient>
    <radialGradient id="skin" cx=".5" cy=".4" r=".7">
      <stop offset="0" stop-color="#f6dccb"/><stop offset="1" stop-color="#e8c2aa"/>
    </radialGradient>
    <radialGradient id="glow" cx=".5" cy=".5" r=".5">
      <stop offset="0" stop-color="#7b3cff" stop-opacity=".35"/><stop offset="1" stop-color="#7b3cff" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <ellipse cx="160" cy="330" rx="170" ry="300" fill="url(#glow)"/>
  <ellipse cx="160" cy="612" rx="80" ry="10" fill="#000" opacity=".5"/>

  <g id="av-body">
    <!-- arka saç -->
    <path d="M100 110 C95 60 225 60 220 110 C232 190 240 290 228 352 C200 362 120 362 92 352 C80 290 88 190 100 110Z" fill="url(#hair)"/>

    <!-- bacaklar -->
    <path d="M118 392 L202 392 L198 590 L168 590 L162 440 L156 590 L124 590Z" fill="url(#pants)"/>
    <path d="M120 588 h38 v10 a6 6 0 0 1 -6 6 h-40 a6 6 0 0 1 2-12z" fill="#f2f2f2"/>
    <path d="M164 588 h36 l6 12 a6 6 0 0 1 -6 6 h-36z" fill="#f2f2f2"/>

    <!-- sol kol (asılı) -->
    <g id="av-arm-left">
      <path d="M214 204 C236 214 240 250 240 300 L238 378 L222 378 L218 300 Z" fill="url(#blazer)"/>
      <circle cx="230" cy="386" r="11" fill="url(#skin)"/>
    </g>

    <!-- gövde -->
    <path d="M104 200 C130 188 190 188 216 200 C226 260 222 340 214 404 L106 404 C98 340 94 260 104 200Z" fill="url(#blazer)"/>
    <path d="M140 196 L180 196 L176 404 L144 404Z" fill="#f4f1ea"/>
    <path d="M140 196 L160 262 L132 300 L118 210Z" fill="#a8895e"/>
    <path d="M180 196 L160 262 L188 300 L202 210Z" fill="#a8895e"/>
    <path d="M144 404 L160 262 L150 404Z" fill="#b99a6e" opacity=".6"/>
    <path d="M150 210 Q160 236 170 210" stroke="#c9a24a" stroke-width="1.5" fill="none"/>
    <circle cx="160" cy="236" r="3.5" fill="#d8b453"/>

    <!-- boyun -->
    <path d="M148 158 L172 158 L174 198 Q160 206 146 198Z" fill="#e3b9a0"/>
  </g>

  <g id="av-head">
    <ellipse cx="160" cy="118" rx="38" ry="47" fill="url(#skin)"/>
    <!-- kulak -->
    <ellipse cx="123" cy="122" rx="5" ry="9" fill="#e6bea6"/>
    <ellipse cx="197" cy="122" rx="5" ry="9" fill="#e6bea6"/>
    <!-- kaşlar -->
    <path d="M134 98 Q146 90 156 97" stroke="#1d130f" stroke-width="4.5" stroke-linecap="round" fill="none"/>
    <path d="M164 97 Q174 90 186 98" stroke="#1d130f" stroke-width="4.5" stroke-linecap="round" fill="none"/>
    <!-- gözler -->
    <g id="av-eyes">
      <ellipse cx="145" cy="113" rx="7.5" ry="5" fill="#fff"/>
      <ellipse cx="175" cy="113" rx="7.5" ry="5" fill="#fff"/>
      <circle class="pupil" cx="145" cy="113" r="4" fill="#3a2316"/>
      <circle class="pupil" cx="175" cy="113" r="4" fill="#3a2316"/>
      <path d="M136 110 Q145 104 154 110" stroke="#140c09" stroke-width="2.2" fill="none"/>
      <path d="M166 110 Q175 104 184 110" stroke="#140c09" stroke-width="2.2" fill="none"/>
    </g>
    <!-- burun / yanak / dudak -->
    <path d="M160 116 Q157 130 162 134" stroke="#cf9f86" stroke-width="2" fill="none" stroke-linecap="round"/>
    <ellipse cx="138" cy="132" rx="7" ry="4" fill="#f0a0a0" opacity=".35"/>
    <ellipse cx="182" cy="132" rx="7" ry="4" fill="#f0a0a0" opacity=".35"/>
    <path id="av-mouth" d="M149 145 Q160 153 171 145 Q160 149 149 145Z" fill="#d9776e"/>
    <!-- ön saç: orta ayrık -->
    <path d="M160 70 C130 70 116 90 118 130 C112 100 122 80 160 78Z" fill="url(#hair)"/>
    <path d="M160 70 C190 70 204 90 202 130 C208 100 198 80 160 78Z" fill="url(#hair)"/>
    <path d="M122 70 C150 52 172 52 198 70 C186 64 172 66 160 74 C148 66 134 64 122 70Z" fill="url(#hair)"/>
  </g>

  <!-- omuzlara dökülen saç -->
  <path id="av-hair-front-l" d="M120 110 C108 170 106 240 118 340 C128 300 130 240 134 200 C132 170 128 140 120 110Z" fill="url(#hair)"/>
  <path id="av-hair-front-r" d="M200 110 C212 170 214 240 202 340 C192 300 190 240 186 200 C188 170 192 140 200 110Z" fill="url(#hair)"/>

  <!-- el sallayan kol -->
  <g id="av-arm-wave">
    <path d="M94 204 C106 200 116 206 114 218 L110 292 L88 292 L84 222 C84 212 88 206 94 204Z" fill="url(#blazer)"/>
    <g id="av-forearm">
      <path d="M88 288 L110 288 L108 362 L90 362Z" fill="url(#blazer)"/>
      <path d="M88 356 L110 356 L109 366 L89 366Z" fill="#f4f1ea"/>
      <g id="av-hand">
        <ellipse cx="99" cy="378" rx="11" ry="13" fill="url(#skin)"/>
        <rect x="88" y="380" width="5" height="16" rx="2.5" fill="url(#skin)"/>
        <rect x="94" y="384" width="5" height="18" rx="2.5" fill="url(#skin)"/>
        <rect x="100" y="384" width="5" height="18" rx="2.5" fill="url(#skin)"/>
        <rect x="106" y="381" width="5" height="15" rx="2.5" fill="url(#skin)"/>
        <rect x="108" y="366" width="5" height="13" rx="2.5" transform="rotate(-35 110 372)" fill="url(#skin)"/>
      </g>
    </g>
  </g>
</svg>`;

  const SHOULDER = [99, 210];
  const ELBOW = [99, 290];

  function mount(container) {
    container.innerHTML = SVG;
    const svg = container.querySelector("svg");
    const arm = svg.querySelector("#av-arm-wave");
    const fore = svg.querySelector("#av-forearm");
    const head = svg.querySelector("#av-head");
    const eyes = svg.querySelector("#av-eyes");
    const pupils = svg.querySelectorAll(".pupil");
    const mouth = svg.querySelector("#av-mouth");

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // energy: 0 = kol aşağıda, 1 = tam selam
    let energy = reduced ? 0 : 1.2; // açılışta bir kere selam versin
    let raise = 0;
    let phase = 0;
    let lastY = window.scrollY;
    let mouse = { x: 0, y: 0 };
    let last = performance.now();

    window.addEventListener("scroll", () => {
      const dy = Math.abs(window.scrollY - lastY);
      lastY = window.scrollY;
      energy = Math.min(1.4, energy + dy / 180);
    }, { passive: true });

    window.addEventListener("pointermove", (e) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = (e.clientY / window.innerHeight) * 2 - 1;
    });

    container.addEventListener("click", () => { energy = 1.6; });
    container.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); energy = 1.6; }
    });

    function frame(now) {
      const dt = Math.min(50, now - last) / 16.67;
      last = now;

      energy = Math.max(0, energy - 0.012 * dt);
      const target = Math.min(1, energy);
      raise += (target - raise) * 0.12 * dt;
      if (raise > 0.05) phase += 0.22 * dt;

      // Kol: dinlenmede 6°, selamda 140°; ön kol sağa sola sallanır
      const upper = 6 + raise * 134;
      const lower = raise * (38 + Math.sin(phase) * 28);
      arm.setAttribute("transform", `rotate(${upper} ${SHOULDER[0]} ${SHOULDER[1]})`);
      fore.setAttribute("transform", `rotate(${lower} ${ELBOW[0]} ${ELBOW[1]})`);

      // Baş fareye doğru hafif döner, selam verirken gülümser
      const tilt = mouse.x * 5 + raise * -3;
      head.setAttribute("transform", `rotate(${tilt} 160 160) translate(${mouse.x * 2} ${mouse.y * 1.5})`);
      pupils.forEach((p) => p.setAttribute("transform", `translate(${mouse.x * 2.2} ${mouse.y * 1.4})`));
      const smile = 149 + raise * 4;
      mouth.setAttribute("d", `M149 145 Q160 ${smile + 4} 171 145 Q160 ${149 + raise * 2} 149 145Z`);

      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);

    // Göz kırpma
    (function blink() {
      eyes.style.transformOrigin = "160px 113px";
      eyes.animate(
        [{ transform: "scaleY(1)" }, { transform: "scaleY(0.1)" }, { transform: "scaleY(1)" }],
        { duration: 180 }
      );
      setTimeout(blink, 2500 + Math.random() * 3000);
    })();
  }

  window.mountAvatar = mount;
})();
