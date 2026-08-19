import { certifications, processSteps, projects, skills, technologies } from "./data.js";

document.documentElement.classList.add("motion-ready");

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");

const escapeHtml = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

function renderSkills() {
  const grid = document.querySelector("#skills-grid");
  grid.innerHTML = skills
    .map(
      (skill, index) => `
        <article class="skill-card reveal" data-tilt>
          <span class="skill-number">0${index + 1} / 05</span>
          <span class="skill-symbol" aria-hidden="true">${escapeHtml(skill.symbol)}</span>
          <h3>${escapeHtml(skill.title)}</h3>
          <p class="skill-description">${escapeHtml(skill.description)}</p>
          <div class="skill-tags">
            ${skill.items.map((item) => `<span>${escapeHtml(item)}</span>`).join("")}
          </div>
        </article>
      `,
    )
    .join("");
}

function mockList(label, accent = false) {
  return `
    <div class="mock-list" aria-hidden="true">
      ${Array.from({ length: 4 }, (_, index) => `
        <div><i></i><span></span><em>${accent && index === 0 ? "alert" : `0${index + 1}`}</em></div>
      `).join("")}
    </div>
    <span class="sr-only">${escapeHtml(label)}</span>
  `;
}

function dashboardPreview(project) {
  const { metrics, panels } = project.preview;
  return `
    <div class="mock-app">
      <aside class="mock-sidebar" aria-hidden="true">
        <div class="mock-logo"></div>
        ${Array.from({ length: 6 }, (_, index) => `<div class="mock-nav-line ${index === 0 ? "active" : ""}"></div>`).join("")}
      </aside>
      <div class="mock-main">
        <div class="mock-heading"><strong>${escapeHtml(project.preview.heading)}</strong><span>DEMONSTRATION DATA</span></div>
        <div class="mock-metrics">
          ${metrics
            .map(
              (metric, index) => `
                <div class="mock-metric"><small>${escapeHtml(metric)}</small><strong>${index === 0 ? "— —" : index === 1 ? "ACTIVE" : "CHECK"}</strong></div>
              `,
            )
            .join("")}
        </div>
        <div class="mock-dashboard">
          <div class="mock-panel">
            <small>${escapeHtml(panels[0])}</small>
            <div class="mock-chart" aria-hidden="true">
              <i style="height: 31%"></i><i style="height: 58%"></i><i style="height: 44%"></i><i style="height: 78%"></i><i style="height: 62%"></i><i style="height: 91%"></i><i style="height: 74%"></i>
            </div>
          </div>
          <div class="mock-panel"><small>${escapeHtml(panels[1])}</small>${mockList(panels[1])}</div>
        </div>
        <div class="mock-bottom">
          <div class="mock-panel"><small>${escapeHtml(panels[2])}</small>${mockList(panels[2], true)}</div>
          <div class="mock-panel"><small>${escapeHtml(panels[3])}</small>${mockList(panels[3])}</div>
        </div>
      </div>
    </div>
  `;
}

function commercePreview(project) {
  return `
    <div class="mock-app">
      <div class="storefront-pane">
        <div class="mock-heading"><strong>Storefront</strong><span>CART / 02</span></div>
        <div class="product-grid" aria-label="Demonstration product catalog">
          ${["Product A", "Product B", "Product C", "Product D"]
            .map(
              (product) => `<div class="product-card"><div class="product-image"></div><strong>${product}</strong><small>Demo item</small></div>`,
            )
            .join("")}
        </div>
      </div>
      <div class="admin-pane">
        <div class="mock-heading"><strong>Commerce admin</strong><span>DEMONSTRATION</span></div>
        <div class="split-metrics">
          <div class="mock-metric"><small>Open orders</small><strong>— —</strong></div>
          <div class="mock-metric"><small>Catalog</small><strong>ACTIVE</strong></div>
        </div>
        <div class="mock-panel" style="margin-top:.6rem">
          <small>Sales activity</small>
          <div class="mock-chart" aria-hidden="true">
            <i style="height: 38%"></i><i style="height: 71%"></i><i style="height: 54%"></i><i style="height: 83%"></i><i style="height: 64%"></i>
          </div>
        </div>
        <div class="mock-panel" style="margin-top:.6rem"><small>Product management</small>${mockList("Product management")}</div>
      </div>
    </div>
  `;
}

function kanbanPreview(project) {
  return `
    <div class="mock-app">
      <aside class="mock-sidebar" aria-hidden="true">
        <div class="mock-logo"></div>
        ${Array.from({ length: 5 }, (_, index) => `<div class="mock-nav-line ${index === 1 ? "active" : ""}"></div>`).join("")}
      </aside>
      <div class="mock-main">
        <div class="mock-heading"><strong>${escapeHtml(project.preview.heading)}</strong><span>DEMONSTRATION BOARD</span></div>
        <div class="kanban-columns">
          ${project.preview.panels
            .map(
              (column, columnIndex) => `
                <div class="kanban-column">
                  <h4>${escapeHtml(column)}</h4>
                  ${Array.from({ length: columnIndex === 1 ? 3 : 2 }, () => `<div class="task-card" aria-label="Demonstration task"></div>`).join("")}
                </div>
              `,
            )
            .join("")}
        </div>
      </div>
    </div>
  `;
}

function healthPreview(project) {
  return `
    <div class="mock-app">
      <aside class="mock-sidebar" aria-hidden="true">
        <div class="mock-logo"></div>
        ${Array.from({ length: 6 }, (_, index) => `<div class="mock-nav-line ${index === 0 ? "active" : ""}"></div>`).join("")}
      </aside>
      <div class="mock-main">
        <div class="mock-heading"><strong>${escapeHtml(project.preview.heading)}</strong><span>ADMIN VIEW</span></div>
        <div class="mock-dashboard">
          <div class="mock-panel">
            <small>System health</small>
            <div class="health-ring"></div>
          </div>
          <div class="mock-panel"><small>Server status</small>${mockList("Server status")}</div>
        </div>
        <div class="mock-bottom">
          <div class="mock-panel"><small>Audit events</small>${mockList("Audit events", true)}</div>
          <div class="mock-panel"><small>Session activity</small>${mockList("Session activity")}</div>
        </div>
      </div>
    </div>
  `;
}

function renderPreview(project) {
  let content = dashboardPreview(project);
  let className = "dashboard-preview";

  if (project.previewType === "commerce") {
    content = commercePreview(project);
    className = "commerce-preview";
  }
  if (project.previewType === "kanban") {
    content = kanbanPreview(project);
    className = "kanban-preview";
  }
  if (project.previewType === "health") {
    content = healthPreview(project);
    className = "health-preview";
  }

  return `
    <div class="project-preview ${className} reveal" data-project-preview>
      <div class="mock-window">
        <div class="mock-topbar"><i></i><i></i><i></i><span>${escapeHtml(project.id)} / interface preview</span></div>
        ${content}
      </div>
    </div>
  `;
}

function renderProjects() {
  const list = document.querySelector("#project-list");
  list.innerHTML = projects
    .map(
      (project, index) => `
        <article
          class="project-showcase"
          data-project-index="${index}"
          style="--project-accent:${project.accent}"
          aria-labelledby="project-${escapeHtml(project.id)}"
        >
          <div class="project-info reveal">
            <span class="project-number">PROJECT / ${project.number}</span>
            <h3 id="project-${escapeHtml(project.id)}">${escapeHtml(project.title)}</h3>
            <p class="project-category">${escapeHtml(project.category)}</p>
            <p class="project-description">${escapeHtml(project.description)}</p>
            <div class="project-tags">
              ${project.technologies.map((technology) => `<span>${escapeHtml(technology)}</span>`).join("")}
            </div>
            <div class="project-actions">
              <button class="case-study-button" type="button" data-open-project="${index}">View case study ↗</button>
              <span class="project-link-disabled" title="No URL has been added">GitHub — not added</span>
              <span class="project-link-disabled" title="No URL has been added">Live demo — not added</span>
            </div>
          </div>
          ${renderPreview(project)}
        </article>
      `,
    )
    .join("");
}

function renderProcess() {
  const list = document.querySelector("#process-list");
  list.innerHTML = processSteps
    .map(
      (step) => `
        <li class="process-step reveal">
          <h3>${escapeHtml(step.title)}</h3>
          <p>${escapeHtml(step.text)}</p>
        </li>
      `,
    )
    .join("");
}

function renderCertifications() {
  const grid = document.querySelector("#cert-grid");
  grid.innerHTML = certifications
    .map(
      (certificate, index) => `
        <article class="cert-card reveal">
          <div class="cert-top"><span>CREDENTIAL / 0${index + 1}</span><span class="cert-mark" aria-hidden="true">✦</span></div>
          <h3>${escapeHtml(certificate.title)}</h3>
          <p class="cert-provider">${escapeHtml(certificate.provider)}</p>
          <p class="cert-description">${escapeHtml(certificate.description)}</p>
        </article>
      `,
    )
    .join("");
}

function renderMarquee() {
  const track = document.querySelector("#marquee-track");
  const group = `
    <div class="marquee-group">
      ${technologies.map((technology) => `<span>${escapeHtml(technology)}</span><i aria-hidden="true"></i>`).join("")}
    </div>
  `;
  track.innerHTML = group + group.replace('<div class="marquee-group">', '<div class="marquee-group" aria-hidden="true">');
}

function renderStructuredProjects() {
  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Selected software projects by Khalid Abdullahi Isse",
    itemListElement: projects.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "CreativeWork",
        name: project.title,
        description: project.description,
        genre: project.category,
        creator: { "@type": "Person", name: "Khalid Abdullahi Isse" },
      },
    })),
  });
  document.head.append(script);
}

function initializeReveals() {
  const elements = document.querySelectorAll(".reveal");
  if (prefersReducedMotion.matches || !("IntersectionObserver" in window)) {
    elements.forEach((element) => element.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        currentObserver.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -10%", threshold: 0.08 },
  );

  elements.forEach((element) => observer.observe(element));
}

function initializeNavigation() {
  const header = document.querySelector("#site-header");
  const toggle = document.querySelector(".menu-toggle");
  const menu = document.querySelector("#mobile-menu");
  const menuLinks = [...menu.querySelectorAll("a")];
  const desktopLinks = [...document.querySelectorAll(".desktop-nav a")];
  const sections = [...document.querySelectorAll("main section[id]")];
  let returnFocus = null;

  const setMenu = (open) => {
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close navigation menu" : "Open navigation menu");
    menu.setAttribute("aria-hidden", String(!open));
    menu.classList.toggle("is-open", open);
    document.body.classList.toggle("menu-open", open);
    if (open) {
      returnFocus = document.activeElement;
      requestAnimationFrame(() => menuLinks[0]?.focus());
    } else if (returnFocus instanceof HTMLElement && document.activeElement?.closest("#mobile-menu")) {
      returnFocus.focus();
    }
  };

  toggle.addEventListener("click", () => setMenu(toggle.getAttribute("aria-expanded") !== "true"));
  menuLinks.forEach((link) => link.addEventListener("click", () => setMenu(false)));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") setMenu(false);
  });

  const updateHeader = () => header.classList.toggle("is-scrolled", window.scrollY > 20);
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      desktopLinks.forEach((link) => {
        const active = link.getAttribute("href") === `#${visible.target.id}`;
        link.classList.toggle("is-active", active);
        if (active) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
    },
    { rootMargin: "-30% 0px -58%", threshold: [0, 0.15, 0.5] },
  );
  sections.forEach((section) => sectionObserver.observe(section));
}

function initializeRemixParticleField() {
  const canvas = document.querySelector("#remix-orb-canvas");
  const context = canvas?.getContext("2d", { alpha: true });
  const progressBar = document.querySelector(".scroll-progress span");
  const processSection = document.querySelector("#process");
  const processList = document.querySelector("#process-list");
  const processItems = [...document.querySelectorAll(".process-step")];
  if (!canvas || !context) return;

  const fieldPalettes = {
    hero: [[190, 242, 100], [245, 255, 232], [255, 255, 255], [248, 113, 113], [103, 232, 249]],
    blue: [[96, 165, 250], [125, 211, 252], [224, 242, 254], [255, 255, 255], [59, 130, 246]],
    cyan: [[34, 211, 238], [103, 232, 249], [236, 254, 255], [255, 255, 255], [59, 130, 246]],
    violet: [[139, 92, 246], [192, 132, 252], [244, 114, 182], [255, 255, 255], [34, 211, 238]],
    amber: [[251, 191, 36], [253, 224, 71], [255, 255, 255], [249, 115, 22], [236, 72, 153]],
    pink: [[236, 72, 153], [244, 114, 182], [255, 255, 255], [139, 92, 246], [249, 115, 22]],
  };
  const fieldStates = {
    hero: { centerX: 0.5, centerY: 0.69, radiusX: 0.64, radiusY: 0.52, tilt: 1.08, scatter: 0, opacity: 0.96, lines: 1, palette: "hero" },
    intro: { centerX: 0.62, centerY: 0.53, radiusX: 0.74, radiusY: 0.58, tilt: 0.38, scatter: 0.14, opacity: 0.84, lines: 0.34, palette: "blue" },
    about: { centerX: 0.6, centerY: 0.46, radiusX: 0.25, radiusY: 0.3, tilt: 0.74, scatter: 0.04, opacity: 0.74, lines: 0.28, palette: "cyan" },
    skills: { centerX: 0.5, centerY: 0.42, radiusX: 0.64, radiusY: 0.64, tilt: 0.9, scatter: 0.82, opacity: 0.78, lines: 0.08, palette: "blue" },
    projects: { centerX: 0.72, centerY: 0.48, radiusX: 0.55, radiusY: 0.44, tilt: 1.14, scatter: 0.18, opacity: 0.62, lines: 0.62, palette: "violet" },
    process: { centerX: 0.28, centerY: 0.45, radiusX: 0.44, radiusY: 0.36, tilt: 0.96, scatter: 0.3, opacity: 0.58, lines: 0.48, palette: "cyan" },
    education: { centerX: 0.68, centerY: 0.5, radiusX: 0.4, radiusY: 0.36, tilt: 0.82, scatter: 0.14, opacity: 0.6, lines: 0.46, palette: "amber" },
    languages: { centerX: 0.5, centerY: 0.52, radiusX: 0.68, radiusY: 0.48, tilt: 1.18, scatter: 0.42, opacity: 0.58, lines: 0.32, palette: "pink" },
    contact: { centerX: 0.55, centerY: 0.48, radiusX: 0.31, radiusY: 0.33, tilt: 0.72, scatter: 0.1, opacity: 0.76, lines: 0.66, palette: "pink" },
  };
  const particleCount = window.innerWidth < 720 ? 900 : 2400;
  const particles = Array.from({ length: particleCount }, (_, index) => {
    const seed = (index * 16807) % 2147483647;
    const randomA = ((seed * 48271) % 2147483647) / 2147483647;
    const randomB = ((seed * 69621) % 2147483647) / 2147483647;
    const randomC = ((seed * 40699) % 2147483647) / 2147483647;
    return {
      angle: randomA * Math.PI * 2,
      radius: 0.2 + Math.sqrt(randomB) * 0.84,
      lift: (randomC - 0.5) * (0.18 + randomB * 0.22),
      phase: randomB * Math.PI * 2,
      size: (index % 37 === 0 ? 2.4 : 0.55) + randomC * (index % 37 === 0 ? 2.8 : 1.65),
      colorIndex: (index + Math.floor(randomA * 7)) % 5,
      alpha: 0.22 + randomB * 0.7,
      scatterX: randomA * 2 - 1,
      scatterY: randomC * 2 - 1,
    };
  });
  const orbSections = [...document.querySelectorAll(".section-orb")];
  const currentFieldState = { ...fieldStates.hero };
  const targetFieldState = { ...fieldStates.hero };

  let width = 0;
  let height = 0;
  let pixelRatio = 1;
  let frame = 0;
  let pointerX = 0;
  let pointerY = 0;
  let scrollProgress = 0;

  const resize = () => {
    width = window.innerWidth;
    height = window.innerHeight;
    pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
    canvas.width = Math.round(width * pixelRatio);
    canvas.height = Math.round(height * pixelRatio);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  };

  const projectPoint = (angle, radius, lift, rotation, centerX, centerY, radiusX, radiusY, tilt) => {
    const theta = angle + rotation;
    const x3 = Math.cos(theta) * radius;
    const z3 = Math.sin(theta) * radius;
    const y3 = lift + Math.sin(theta * 3 + radius * 2.4) * 0.035;
    const projectedY = y3 * Math.cos(tilt) - z3 * Math.sin(tilt);
    const depth = z3 * Math.cos(tilt) + y3 * Math.sin(tilt);
    const perspective = 1 / (1.16 + depth * 0.28);
    return {
      x: centerX + x3 * radiusX * perspective,
      y: centerY + projectedY * radiusY * perspective,
      depth,
      perspective,
    };
  };

  const drawOrbit = (rotation, centerX, centerY, radiusX, radiusY, tilt, color, offset, lineWidth) => {
    context.beginPath();
    for (let index = 0; index <= 180; index += 1) {
      const angle = (index / 180) * Math.PI * 2;
      const point = projectPoint(
        angle,
        0.84 + Math.sin(angle * 3 + offset) * 0.028,
        Math.sin(angle * 2 + offset) * 0.025,
        rotation + offset * 0.08,
        centerX,
        centerY,
        radiusX,
        radiusY,
        tilt,
      );
      if (index === 0) context.moveTo(point.x, point.y);
      else context.lineTo(point.x, point.y);
    }
    context.strokeStyle = color;
    context.lineWidth = lineWidth;
    context.shadowColor = color;
    context.shadowBlur = 18;
    context.stroke();
  };

  const updatePageMotion = () => {
    const scrollable = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
    scrollProgress = Math.min(1, Math.max(0, window.scrollY / scrollable));
    if (progressBar) progressBar.style.transform = `scaleX(${scrollProgress})`;

    const viewportMarker = window.innerHeight * 0.48;
    const nearestSection = orbSections
      .map((section) => ({ section, distance: Math.abs(section.getBoundingClientRect().top - viewportMarker) }))
      .sort((a, b) => a.distance - b.distance)[0]?.section;
    const nextState = fieldStates[nearestSection?.dataset.orb] || fieldStates.hero;
    Object.assign(targetFieldState, nextState);

    if (processSection && processList) {
      const rect = processSection.getBoundingClientRect();
      const processProgress = Math.min(1, Math.max(0, (window.innerHeight * 0.58 - rect.top) / Math.max(rect.height, 1)));
      processList.style.setProperty("--process-progress", `${processProgress * 100}%`);
      processItems.forEach((item) => {
        const itemRect = item.getBoundingClientRect();
        item.classList.toggle("is-active", itemRect.top < window.innerHeight * 0.58);
      });
    }
  };

  const render = (time = 0) => {
    context.clearRect(0, 0, width, height);
    const reduced = prefersReducedMotion.matches;
    if (reduced) Object.assign(currentFieldState, targetFieldState);
    else {
      ["centerX", "centerY", "radiusX", "radiusY", "tilt", "scatter", "opacity", "lines"].forEach((key) => {
        currentFieldState[key] += (targetFieldState[key] - currentFieldState[key]) * 0.045;
      });
      currentFieldState.palette = targetFieldState.palette;
    }
    const rotation = (reduced ? 0.22 : time * 0.000055) + scrollProgress * 1.7;
    const centerX = width * (currentFieldState.centerX + pointerX * 0.035);
    const centerY = height * (currentFieldState.centerY + pointerY * 0.025);
    const radiusX = Math.max(width * currentFieldState.radiusX, 250);
    const radiusY = Math.max(height * currentFieldState.radiusY, 220);
    const fieldOpacity = currentFieldState.opacity;
    const activePalette = fieldPalettes[currentFieldState.palette] || fieldPalettes.hero;

    context.save();
    context.globalCompositeOperation = "lighter";
    context.globalAlpha = fieldOpacity;

    const glow = context.createRadialGradient(centerX, centerY + height * 0.03, 0, centerX, centerY, Math.min(width, height) * 0.38);
    glow.addColorStop(0, "rgba(255,255,255,0.2)");
    glow.addColorStop(0.18, "rgba(190,242,100,0.12)");
    glow.addColorStop(0.5, "rgba(34,211,238,0.045)");
    glow.addColorStop(1, "rgba(0,0,0,0)");
    context.fillStyle = glow;
    context.fillRect(0, 0, width, height);

    const orbitAlpha = currentFieldState.lines;
    drawOrbit(rotation, centerX, centerY, radiusX, radiusY, currentFieldState.tilt, `rgba(${activePalette[0].join(",")},${0.72 * orbitAlpha})`, 0.15, 1.15);
    drawOrbit(rotation, centerX, centerY, radiusX, radiusY, currentFieldState.tilt, `rgba(${activePalette[2].join(",")},${0.76 * orbitAlpha})`, 1.8, 0.8);
    drawOrbit(rotation, centerX, centerY, radiusX, radiusY, currentFieldState.tilt, `rgba(${activePalette[3].join(",")},${0.62 * orbitAlpha})`, 3.4, 0.7);

    context.shadowBlur = 0;
    particles.forEach((particle) => {
      const pulse = reduced ? 0 : Math.sin(time * 0.0007 + particle.phase) * 0.018;
      const point = projectPoint(
        particle.angle,
        particle.radius + pulse,
        particle.lift,
        rotation,
        centerX,
        centerY,
        radiusX,
        radiusY,
        currentFieldState.tilt,
      );
      point.x += (width * 0.5 + particle.scatterX * width * 0.58 - point.x) * currentFieldState.scatter;
      point.y += (height * 0.46 + particle.scatterY * height * 0.58 - point.y) * currentFieldState.scatter;
      if (point.x < -8 || point.x > width + 8 || point.y < -8 || point.y > height + 8) return;
      const [red, green, blue] = activePalette[particle.colorIndex];
      const depthAlpha = 0.5 + (point.depth + 1) * 0.28;
      context.fillStyle = `rgba(${red},${green},${blue},${Math.min(0.94, particle.alpha * depthAlpha)})`;
      const size = particle.size * point.perspective * (point.depth < 0 ? 0.8 : 1.15);
      context.fillRect(point.x, point.y, Math.max(0.45, size), Math.max(0.45, size));
    });

    context.restore();
    if (!reduced) frame = requestAnimationFrame(render);
  };

  resize();
  updatePageMotion();
  render();

  window.addEventListener("resize", () => {
    resize();
    if (prefersReducedMotion.matches) render();
  }, { passive: true });
  window.addEventListener("scroll", updatePageMotion, { passive: true });
  window.addEventListener("pointermove", (event) => {
    pointerX = event.clientX / Math.max(width, 1) - 0.5;
    pointerY = event.clientY / Math.max(height, 1) - 0.5;
  }, { passive: true });
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) cancelAnimationFrame(frame);
    else if (!prefersReducedMotion.matches) frame = requestAnimationFrame(render);
  });
  prefersReducedMotion.addEventListener("change", () => {
    cancelAnimationFrame(frame);
    render();
  });
}

const orbStates = {
  hero: {
    colors: ["#2dacf9", "#22d3ee", "#7ce95a", "#fa73da"],
    radius: "48% 52% 46% 54% / 50% 44% 56% 50%",
  },
  intro: {
    colors: ["#1d4ed8", "#06b6d4", "#6d28d9", "#db2777"],
    radius: "58% 42% 53% 47% / 44% 62% 38% 56%",
  },
  about: {
    colors: ["#4c1d95", "#a855f7", "#db2777", "#1e3a8a"],
    radius: "66% 34% 58% 42% / 42% 62% 38% 58%",
  },
  skills: {
    colors: ["#0369a1", "#22d3ee", "#2563eb", "#84cc16"],
    radius: "38% 62% 32% 68% / 62% 34% 66% 38%",
  },
  projects: {
    colors: ["#2563eb", "#22d3ee", "#7c3aed", "#a855f7"],
    radius: "68% 32% 62% 38% / 38% 64% 36% 62%",
  },
  process: {
    colors: ["#2563eb", "#06b6d4", "#7c3aed", "#22d3ee"],
    radius: "72% 28% 70% 30% / 36% 64% 40% 60%",
  },
  education: {
    colors: ["#1e40af", "#8b5cf6", "#f59e0b", "#4338ca"],
    radius: "44% 56% 68% 32% / 64% 38% 62% 36%",
  },
  languages: {
    colors: ["#0e7490", "#6366f1", "#a855f7", "#ec4899"],
    radius: "54% 46% 40% 60% / 52% 62% 38% 48%",
  },
  contact: {
    colors: ["#2563eb", "#22d3ee", "#db2777", "#f97316"],
    radius: "50%",
  },
};

function interpolate(progress, points, values) {
  if (progress <= points[0]) return values[0];
  for (let index = 1; index < points.length; index += 1) {
    if (progress <= points[index]) {
      const localProgress = (progress - points[index - 1]) / (points[index] - points[index - 1]);
      return values[index - 1] + (values[index] - values[index - 1]) * localProgress;
    }
  }
  return values.at(-1);
}

function initializeOrbAndScroll() {
  const root = document.documentElement;
  const orb = document.querySelector(".morph-orb");
  const orbStage = document.querySelector(".orb-stage");
  const progressBar = document.querySelector(".scroll-progress span");
  const orbSections = [...document.querySelectorAll(".section-orb")];
  const projectElements = [...document.querySelectorAll(".project-showcase")];
  const processSection = document.querySelector("#process");
  const processList = document.querySelector("#process-list");
  const processItems = [...document.querySelectorAll(".process-step")];
  const points = [0, 0.13, 0.27, 0.45, 0.65, 0.8, 1];
  const xValues = [52, 5, 42, 9, 33, 48, 18];
  const yValues = [2, 22, 40, 52, 38, 58, 28];
  const widthValues = [66, 34, 28, 54, 62, 34, 58];
  const heightValues = [66, 57, 31, 36, 22, 35, 58];
  const scaleValues = [1.14, 1.08, 0.9, 1.2, 1.08, 0.92, 1.3];
  const opacityValues = [0.96, 0.56, 0.6, 0.68, 0.56, 0.48, 0.76];
  const blurValues = [10, 24, 27, 31, 34, 36, 38];
  const saturationValues = [182, 132, 136, 145, 148, 142, 154];
  const particleCloud = document.createElement("div");
  const geometryShapes = [
    "hex-stripes",
    "arc",
    "ring",
    "line-stack",
    "zigzag",
    "striped-disc",
    "triangle",
    "dot-grid",
    "xrow",
    "cross",
    "square-dots",
    "ring",
    "wave",
    "outline-triangle",
    "triangle",
    "dot",
    "hex-stripes",
    "line-stack",
    "ring",
    "striped-disc",
    "dot",
    "cross",
  ];
  const particleShapes = window.innerWidth < 720 ? geometryShapes.slice(0, 13) : geometryShapes;
  const particleCount = particleShapes.length;
  const shapeSizes = {
    "arc": 3.8,
    "cross": 1.1,
    "dot": 0.95,
    "dot-grid": 3.8,
    "hex-stripes": 4.4,
    "line-stack": 3.5,
    "outline-triangle": 2.1,
    "ring": 1.45,
    "square-dots": 4.3,
    "striped-disc": 4.2,
    "triangle": 4.9,
    "wave": 4.8,
    "xrow": 3.7,
    "zigzag": 4.7,
  };
  let scheduled = false;
  let activeState = "";
  let activeProject = -1;

  particleCloud.className = "orb-particle-cloud";
  particleCloud.setAttribute("aria-hidden", "true");
  particleCloud.style.setProperty("--particle-spread", "0.52");

  Array.from({ length: particleCount }, (_, index) => {
    const particle = document.createElement("span");
    const shape = particleShapes[index];
    const angle = (360 / particleCount) * index + (index % 2 ? 8 : -6);
    const distance = 6.2 + (index % 7) * 1.16 + (index % 3) * 0.86;
    const size = (shapeSizes[shape] || 2.4) * (window.innerWidth < 720 ? 0.72 : 1);
    particle.className = `orb-particle shape-${shape}`;
    particle.style.setProperty("--particle-angle", `${angle}deg`);
    particle.style.setProperty("--particle-distance", `${distance}rem`);
    particle.style.setProperty("--particle-size", `${size}rem`);
    particle.style.setProperty("--particle-speed", `${2.2 + (index % 6) * 0.28}s`);
    particle.style.setProperty("--particle-delay", `${-index * 0.13}s`);
    particleCloud.append(particle);
    return particle;
  });

  orbStage?.append(particleCloud);

  const setColors = (colors) => {
    root.style.setProperty("--orb-one", colors[0]);
    root.style.setProperty("--orb-two", colors[1]);
    root.style.setProperty("--orb-three", colors[2]);
    root.style.setProperty("--orb-four", colors[3]);
  };

  const update = () => {
    scheduled = false;
    const scrollable = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
    const progress = Math.min(1, Math.max(0, window.scrollY / scrollable));
    progressBar.style.transform = `scaleX(${progress})`;

    if (!prefersReducedMotion.matches) {
      const x = interpolate(progress, points, xValues);
      const y = interpolate(progress, points, yValues);
      const width = interpolate(progress, points, widthValues);
      const height = interpolate(progress, points, heightValues);
      const scale = interpolate(progress, points, scaleValues);
      const opacity = interpolate(progress, points, opacityValues);
      const blur = interpolate(progress, points, blurValues);
      const saturation = interpolate(progress, points, saturationValues);
      const transitionWave = Math.abs(Math.sin(progress * Math.PI * 7));
      const heroGather = 1 - Math.min(progress / 0.08, 1);
      const particleSpread = 0.32 + transitionWave * 0.92 + heroGather * 0.28;
      const particleOpacity = Math.min(0.95, 0.34 + transitionWave * 0.5 + heroGather * 0.22);
      orb.style.width = `${width}vw`;
      orb.style.height = `${height}vw`;
      orb.style.opacity = String(opacity);
      orb.style.transform = `translate3d(${x}vw, ${y}vh, 0) rotate(${progress * 280}deg) scale(${scale})`;
      orb.style.filter = `blur(${blur}px) saturate(${saturation}%) contrast(112%)`;
      particleCloud.style.width = `${width}vw`;
      particleCloud.style.height = `${height}vw`;
      particleCloud.style.opacity = String(particleOpacity);
      particleCloud.style.setProperty("--particle-spread", particleSpread.toFixed(3));
      particleCloud.style.transform = `translate3d(${x}vw, ${y}vh, 0) rotate(${progress * -180}deg) scale(${scale})`;
    }

    const viewportMarker = window.innerHeight * 0.46;
    const currentSection = orbSections
      .map((section) => ({
        section,
        distance: Math.abs(section.getBoundingClientRect().top - viewportMarker),
      }))
      .sort((a, b) => a.distance - b.distance)[0]?.section;

    const nextState = currentSection?.dataset.orb || "hero";
    if (nextState !== activeState) {
      activeState = nextState;
      const state = orbStates[nextState] || orbStates.hero;
      orb.style.borderRadius = state.radius;
      setColors(state.colors);
    }

    if (nextState === "projects") {
      const nearestProject = projectElements
        .map((element) => ({
          element,
          index: Number(element.dataset.projectIndex),
          distance: Math.abs(element.getBoundingClientRect().top + element.offsetHeight * 0.35 - window.innerHeight * 0.5),
        }))
        .sort((a, b) => a.distance - b.distance)[0];
      if (nearestProject && nearestProject.index !== activeProject) {
        activeProject = nearestProject.index;
        setColors(projects[activeProject].orbColors);
      }
    } else {
      activeProject = -1;
    }

    if (processSection && processList) {
      const rect = processSection.getBoundingClientRect();
      const processProgress = Math.min(1, Math.max(0, (window.innerHeight * 0.58 - rect.top) / Math.max(rect.height, 1)));
      processList.style.setProperty("--process-progress", `${processProgress * 100}%`);
      processItems.forEach((item) => {
        const itemRect = item.getBoundingClientRect();
        item.classList.toggle("is-active", itemRect.top < window.innerHeight * 0.58);
      });
    }
  };

  const schedule = () => {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(update);
  };

  update();
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule, { passive: true });
  prefersReducedMotion.addEventListener("change", schedule);

  if (finePointer.matches && !prefersReducedMotion.matches) {
    window.addEventListener(
      "pointermove",
      (event) => {
        const rect = orb.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / Math.max(rect.width, 1)) * 100;
        const y = ((event.clientY - rect.top) / Math.max(rect.height, 1)) * 100;
        root.style.setProperty("--mouse-x", `${Math.min(100, Math.max(0, x))}%`);
        root.style.setProperty("--mouse-y", `${Math.min(100, Math.max(0, y))}%`);
      },
      { passive: true },
    );
  }
}

function initializeTerminal() {
  const terminal = document.querySelector(".terminal");
  const log = document.querySelector("#terminal-log");
  const lines = [
    "> Initializing developer profile...",
    "> Loading technical skills...",
    "> Connecting frontend and backend...",
    "> Loading selected projects...",
    "> System ready.",
  ];
  let started = false;
  let visible = false;

  if (prefersReducedMotion.matches) {
    log.innerHTML = lines.map((line, index) => `<div class="terminal-line ${index === lines.length - 1 ? "complete" : ""}">${line}</div>`).join("");
    return;
  }

  const typeLines = async () => {
    if (started) return;
    started = true;
    for (let lineIndex = 0; lineIndex < lines.length; lineIndex += 1) {
      const lineElement = document.createElement("div");
      lineElement.className = "terminal-line";
      log.append(lineElement);
      for (const character of lines[lineIndex]) {
        while (!visible) await new Promise((resolve) => setTimeout(resolve, 160));
        lineElement.textContent += character;
        await new Promise((resolve) => setTimeout(resolve, 13 + Math.random() * 17));
      }
      if (lineIndex === lines.length - 1) lineElement.classList.add("complete");
      await new Promise((resolve) => setTimeout(resolve, 190));
    }
  };

  const observer = new IntersectionObserver(
    ([entry]) => {
      visible = entry.isIntersecting;
      if (visible) typeLines();
    },
    { threshold: 0.2 },
  );
  observer.observe(terminal);
}

function initializePointerEffects() {
  if (!finePointer.matches || prefersReducedMotion.matches) return;

  document.querySelectorAll(".magnetic").forEach((button) => {
    button.addEventListener("pointermove", (event) => {
      const rect = button.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      button.style.transform = `translate(${x * 0.12}px, ${y * 0.18}px)`;
    });
    button.addEventListener("pointerleave", () => {
      button.style.transform = "";
    });
  });

  document.querySelectorAll("[data-tilt]").forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      card.style.setProperty("--card-x", `${x * 100}%`);
      card.style.setProperty("--card-y", `${y * 100}%`);
      card.style.transform = `perspective(900px) rotateY(${(x - 0.5) * 4}deg) rotateX(${(0.5 - y) * 4}deg) translateY(-5px)`;
    });
    card.addEventListener("pointerleave", () => {
      card.style.transform = "";
    });
  });

  document.querySelectorAll("[data-project-preview]").forEach((preview) => {
    preview.addEventListener("pointermove", (event) => {
      const rect = preview.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      preview.style.setProperty("--preview-rotate-y", `${x * 3}deg`);
      preview.style.setProperty("--preview-rotate-x", `${y * -3}deg`);
    });
    preview.addEventListener("pointerleave", () => {
      preview.style.setProperty("--preview-rotate-y", "0deg");
      preview.style.setProperty("--preview-rotate-x", "0deg");
    });
  });
}

function projectDialogMarkup(project) {
  return `
    <div class="dialog-hero">
      <div>
        <p class="eyebrow">${escapeHtml(project.category)}</p>
        <h2 id="dialog-title">${escapeHtml(project.title)}</h2>
      </div>
      <p>${escapeHtml(project.description)}</p>
    </div>
    <div class="dialog-body">
      <section class="dialog-section">
        <h3>01 / Problem</h3>
        <p>${escapeHtml(project.problem)}</p>
      </section>
      <section class="dialog-section">
        <h3>02 / Requirements</h3>
        <ul>${project.features.map((feature) => `<li>${escapeHtml(feature)}</li>`).join("")}</ul>
      </section>
      <section class="dialog-section">
        <h3>03 / Approach</h3>
        <p>${escapeHtml(project.approach)}</p>
      </section>
      <section class="dialog-section">
        <h3>04 / Technical decisions</h3>
        <p>${escapeHtml(project.decisions)}</p>
      </section>
      <section class="dialog-section">
        <h3>05 / Responsibilities</h3>
        <ul>${project.responsibilities.map((responsibility) => `<li>${escapeHtml(responsibility)}</li>`).join("")}</ul>
      </section>
      <section class="dialog-section">
        <h3>06 / Technologies</h3>
        <p>${project.technologies.map(escapeHtml).join(" · ")}</p>
      </section>
      <section class="dialog-section">
        <h3>07 / Challenge</h3>
        <p>${escapeHtml(project.challenges)}</p>
      </section>
      <section class="dialog-section">
        <h3>08 / Solution</h3>
        <p>${escapeHtml(project.solution)}</p>
      </section>
      <section class="dialog-section">
        <h3>09 / Capabilities</h3>
        <p>${escapeHtml(project.capabilities)}</p>
      </section>
      <section class="dialog-section dialog-architecture">
        <h3>10 / Architecture preview</h3>
        <div class="architecture-flow">
          ${project.architecture.map((item, index) => `${index ? "<i>→</i>" : ""}<span>${escapeHtml(item)}</span>`).join("")}
        </div>
      </section>
    </div>
  `;
}

function initializeProjectDialog() {
  const dialog = document.querySelector("#project-dialog");
  const content = document.querySelector("#dialog-content");
  const indexLabel = document.querySelector("#dialog-index");
  const closeButton = document.querySelector("#dialog-close");
  const previousButton = document.querySelector("#dialog-prev");
  const nextButton = document.querySelector("#dialog-next");
  let currentIndex = 0;
  let returnFocus = null;

  const updateDialog = (index) => {
    currentIndex = (index + projects.length) % projects.length;
    const project = projects[currentIndex];
    indexLabel.textContent = `CASE STUDY / ${project.number}`;
    content.innerHTML = projectDialogMarkup(project);
    content.scrollTop = 0;
    previousButton.setAttribute("aria-label", `View previous project, ${projects[(currentIndex - 1 + projects.length) % projects.length].title}`);
    nextButton.setAttribute("aria-label", `View next project, ${projects[(currentIndex + 1) % projects.length].title}`);
    document.querySelector("#dialog-title")?.focus?.();
  };

  const openDialog = (index, source) => {
    returnFocus = source;
    updateDialog(index);
    dialog.showModal();
    document.body.classList.add("dialog-open");
    requestAnimationFrame(() => closeButton.focus());
  };

  const closeDialog = () => dialog.close();

  document.querySelectorAll("[data-open-project]").forEach((button) => {
    button.addEventListener("click", () => openDialog(Number(button.dataset.openProject), button));
  });
  closeButton.addEventListener("click", closeDialog);
  previousButton.addEventListener("click", () => updateDialog(currentIndex - 1));
  nextButton.addEventListener("click", () => updateDialog(currentIndex + 1));
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) closeDialog();
  });
  dialog.addEventListener("close", () => {
    document.body.classList.remove("dialog-open");
    if (returnFocus instanceof HTMLElement) returnFocus.focus();
  });
  dialog.addEventListener("keydown", (event) => {
    if (event.key !== "Tab") return;
    const focusable = [...dialog.querySelectorAll("button, a, input, select, textarea, [tabindex]:not([tabindex='-1'])")].filter(
      (element) => !element.hasAttribute("disabled"),
    );
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable.at(-1);
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });
}

function initializeContactForm() {
  const form = document.querySelector("#contact-form");
  const submitButton = form.querySelector("button[type='submit']");
  const submitLabel = form.querySelector(".submit-label");
  const status = document.querySelector("#form-status");
  const fields = {
    fullName: {
      element: document.querySelector("#full-name"),
      error: document.querySelector("#full-name-error"),
      validate: (value) => (value.trim().length < 2 ? "Enter your full name." : ""),
    },
    email: {
      element: document.querySelector("#email"),
      error: document.querySelector("#email-error"),
      validate: (value) => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()) ? "" : "Enter a valid email address."),
    },
    projectType: {
      element: document.querySelector("#project-type"),
      error: document.querySelector("#project-type-error"),
      validate: (value) => (value ? "" : "Select a project type."),
    },
    budget: {
      element: document.querySelector("#budget"),
      error: document.querySelector("#budget-error"),
      validate: (value) => (value ? "" : "Select a budget range."),
    },
    message: {
      element: document.querySelector("#message"),
      error: document.querySelector("#message-error"),
      validate: (value) => (value.trim().length < 20 ? "Add at least 20 characters so I can understand the project." : ""),
    },
  };

  const validateField = (field) => {
    const message = field.validate(field.element.value);
    field.error.textContent = message;
    field.element.setAttribute("aria-invalid", String(Boolean(message)));
    field.element.setAttribute("aria-describedby", field.error.id);
    return !message;
  };

  Object.values(fields).forEach((field) => {
    field.element.addEventListener("blur", () => validateField(field));
    field.element.addEventListener("input", () => {
      if (field.element.getAttribute("aria-invalid") === "true") validateField(field);
    });
    field.element.addEventListener("change", () => {
      if (field.element.getAttribute("aria-invalid") === "true") validateField(field);
    });
  });

  const prepareContactSubmission = async () => {
    await new Promise((resolve) => setTimeout(resolve, 900));
    return { prepared: true };
  };

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const validations = Object.values(fields).map(validateField);
    if (validations.some((valid) => !valid)) {
      Object.values(fields).find((field) => field.element.getAttribute("aria-invalid") === "true")?.element.focus();
      status.textContent = "Please correct the highlighted fields.";
      status.classList.remove("is-success");
      return;
    }

    submitButton.disabled = true;
    submitLabel.textContent = "Preparing...";
    status.textContent = "Checking your inquiry details...";
    status.classList.remove("is-success");

    try {
      await prepareContactSubmission();
      status.textContent = "Inquiry prepared successfully. Connect this form to an email or API service to send real messages.";
      status.classList.add("is-success");
      submitLabel.textContent = "Inquiry Ready";
    } catch {
      status.textContent = "The inquiry could not be prepared. Please email Khalid directly.";
      submitLabel.textContent = "Try Again";
    } finally {
      submitButton.disabled = false;
    }
  });
}

function initializeMetadata() {
  const canonical = document.querySelector("#canonical-url");
  const absoluteUrl = `${window.location.origin}${window.location.pathname}`;
  if (window.location.protocol.startsWith("http")) canonical.href = absoluteUrl;
  document.querySelector("#current-year").textContent = String(new Date().getFullYear());
}

renderSkills();
renderProjects();
renderProcess();
renderCertifications();
renderMarquee();
renderStructuredProjects();
initializeMetadata();
initializeReveals();
initializeNavigation();
initializeRemixParticleField();
initializeTerminal();
initializePointerEffects();
initializeProjectDialog();
initializeContactForm();
