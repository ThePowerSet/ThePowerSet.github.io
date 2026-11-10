/*
 * Motion: scroll reveals for elements marked with `.reveal`, and the fan of
 * simulated paths drawn behind the home page hero.
 */
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* Scroll reveals */
(() => {
  const targets = document.querySelectorAll(".reveal");
  if (!targets.length) return;
  if (reducedMotion || !("IntersectionObserver" in window)) {
    targets.forEach((el) => el.classList.add("is-visible"));
    return;
  }
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }
  );
  targets.forEach((el) => observer.observe(el));
})();

/* Hero paths: mean-reverting random walks leaving a common starting point */
(() => {
  const canvas = document.querySelector("canvas.hero-paths");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const STEPS = 260;
  const PATHS = 9;
  const DURATION = 2600; // ms to draw the paths the first time

  // Small seeded generator, so the picture is the same at every visit and resize
  const mulberry32 = (seed) => () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };

  const simulate = () => {
    const rand = mulberry32(20261019);
    const gauss = () => Math.sqrt(-2 * Math.log(1 - rand())) * Math.cos(2 * Math.PI * rand());
    const paths = [];
    for (let p = 0; p < PATHS; p++) {
      const level = (p / (PATHS - 1) - 0.5) * 1.5; // each path reverts to its own level
      const path = [0];
      for (let i = 1; i <= STEPS; i++) {
        const prev = path[i - 1];
        path.push(prev + 0.035 * (level - prev) + 0.03 * gauss());
      }
      paths.push(path);
    }
    return paths;
  };

  const paths = simulate();
  let progress = reducedMotion ? 1 : 0;
  let start = null;

  const draw = () => {
    const styles = getComputedStyle(document.documentElement);
    const colors = [
      styles.getPropertyValue("--global-theme-color").trim(),
      styles.getPropertyValue("--global-accent-color").trim(),
      styles.getPropertyValue("--global-text-color-light").trim(),
    ];
    const ratio = window.devicePixelRatio || 1;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    canvas.width = width * ratio;
    canvas.height = height * ratio;
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    ctx.clearRect(0, 0, width, height);
    ctx.lineJoin = "round";

    const upTo = Math.floor(progress * STEPS);
    const x = (i) => (i / STEPS) * width;
    const y = (value) => height * (0.5 - value * 0.36);

    // the level the paths start from
    ctx.strokeStyle = colors[2];
    ctx.globalAlpha = 0.35;
    ctx.lineWidth = 1;
    ctx.setLineDash([2, 6]);
    ctx.beginPath();
    ctx.moveTo(0, y(0));
    ctx.lineTo(width, y(0));
    ctx.stroke();
    ctx.setLineDash([]);

    paths.forEach((path, p) => {
      ctx.strokeStyle = p === 2 ? colors[1] : p % 3 === 0 ? colors[0] : colors[2];
      ctx.globalAlpha = p === 2 || p % 3 === 0 ? 0.9 : 0.45;
      ctx.lineWidth = p === 2 || p % 3 === 0 ? 1.6 : 1;
      ctx.beginPath();
      for (let i = 0; i <= upTo; i++) {
        if (i === 0) ctx.moveTo(x(i), y(path[i]));
        else ctx.lineTo(x(i), y(path[i]));
      }
      ctx.stroke();
    });
  };

  const animate = (now) => {
    if (start === null) start = now;
    const t = Math.min((now - start) / DURATION, 1);
    progress = 1 - Math.pow(1 - t, 2.2);
    draw();
    if (t < 1) requestAnimationFrame(animate);
  };

  if (reducedMotion) draw();
  else requestAnimationFrame(animate);

  window.addEventListener("resize", draw);
  // redraw with the new palette when the theme changes
  new MutationObserver(draw).observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
})();
