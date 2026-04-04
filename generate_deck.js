const pptxgen = require("pptxgenjs");
const path = require("path");
const fs = require("fs");

// ─── Palettes ─────────────────────────────────────────────────────────────────
const THEMES = {
  dark: {
    bgBlack: "000000",
    bg: "0D1117",
    card: "1A2235",
    cardBorder: "232E45",
    cardAlt: "0A0F1A",
    accent: "4B8EF8",
    accentDim: "2D5BB8",
    accentPurp: "6B7FCC",
    accentTeal: "2DD4BF",
    accentGold: "F59E0B",
    white: "FFFFFF",
    muted: "AABCD0",
    mutedDark: "5A6E8A",
    green: "4ADE80",
    red: "EF4444",
    nodeBg: "162040",
    nodeTeeBg: "14102A",
    nodeGreenBg: "0A1A10",
    nodeGreenBorder: "1A3A22",
    stripBorder: "1E3050",
    deepBg: "0D1628",
    tutelumRowBg: "0E2244",
    compBorder: "1A2840",
    compRowAlt: "141C2E",
    featureStrip: "1E2A40",
    barColor2: "7CB4F8",
    barColor3: "4A7ACC",
    barBg: "111827",
    avatarJohn: "1E3A6E",
    avatarSri: "0D3D3A",
    avatarAmar: "2D1E5E",
  },
  light: {
    bgBlack: "FFFFFF",
    bg: "F4F7FD",
    card: "FFFFFF",
    cardBorder: "8FADD4",
    cardAlt: "E8EFF9",
    accent: "1E40AF",
    accentDim: "1D4ED8",
    accentPurp: "6D28D9",
    accentTeal: "0F766E",
    accentGold: "92400E",
    white: "0F172A",
    muted: "334155",
    mutedDark: "64748B",
    green: "065F46",
    red: "EF4444",
    nodeBg: "EBF0FA",
    nodeTeeBg: "F0EBFA",
    nodeGreenBg: "EAFAF0",
    nodeGreenBorder: "A8D8B8",
    stripBorder: "B8C8E0",
    deepBg: "EAF0FA",
    tutelumRowBg: "DDEEFF",
    compBorder: "C8D6EC",
    compRowAlt: "F5F8FF",
    featureStrip: "D1DCF0",
    barColor2: "2B6CB0",
    barColor3: "3B5FC0",
    barBg: "DDE4F0",
    avatarJohn: "1E3A6E",
    avatarSri: "0D3D3A",
    avatarAmar: "2D1E5E",
  },
};

const theme = process.argv[2] === "light" ? "light" : "dark";
const C = THEMES[theme];
const LOGO = path.resolve(__dirname, theme === "light" ? "Tutelum_Logo_Light.png" : "Tutelum_Logo.png");
const outFile = path.resolve(__dirname, `tutelum_pitch_deck_${theme}.pptx`);
const TOTAL = 12;
const W = 10,
  H = 5.625;

// ─── Helpers ─────────────────────────────────────────────────────────────────

function slideNum(slide, n) {
  slide.addText(`${n} / ${TOTAL}`, {
    x: 9.1,
    y: 5.32,
    w: 0.75,
    h: 0.2,
    fontFace: "Calibri",
    fontSize: 8,
    color: C.mutedDark,
    align: "right",
    margin: 0,
  });
}

function card(slide, x, y, w, h, opts = {}) {
  const {
    border = "top",
    color = C.accent,
    fill = C.card,
    lineColor = C.cardBorder,
  } = opts;
  slide.addShape(pres.shapes.RECTANGLE, {
    x,
    y,
    w,
    h,
    fill: { color: fill },
    line: { color: lineColor, width: 0.75 },
  });
  if (border === "top") {
    slide.addShape(pres.shapes.RECTANGLE, {
      x,
      y,
      w,
      h: 0.05,
      fill: { color },
      line: { color },
    });
  } else if (border === "left") {
    slide.addShape(pres.shapes.RECTANGLE, {
      x,
      y,
      w: 0.05,
      h,
      fill: { color },
      line: { color },
    });
  }
}

function dot(slide, x, y, color = C.accent) {
  slide.addShape(pres.shapes.OVAL, {
    x,
    y,
    w: 0.1,
    h: 0.1,
    fill: { color },
    line: { color },
  });
}

// Arrow connector (horizontal, pointing right)
function arrow(slide, x, y, w, color = C.accentDim) {
  // Line
  slide.addShape(pres.shapes.RECTANGLE, {
    x,
    y: y + 0.07,
    w: w - 0.12,
    h: 0.04,
    fill: { color },
    line: { color },
  });
  // Arrowhead (triangle approximated by a small rectangle rotated — use diamond)
  slide.addShape(pres.shapes.RECTANGLE, {
    x: x + w - 0.14,
    y: y + 0.02,
    w: 0.14,
    h: 0.14,
    fill: { color },
    line: { color },
    rotate: 45,
  });
}

// ─── Build ────────────────────────────────────────────────────────────────────
const pres = new pptxgen();
pres.layout = "LAYOUT_16x9";
pres.title = "Tutelum Pre-Seed Pitch Deck";

// ══════════════════════════════════════════════════════════════════════════════
// SLIDE 1 · COVER
// ══════════════════════════════════════════════════════════════════════════════
{
  const sl = pres.addSlide();
  sl.background = { color: C.bgBlack };

  sl.addImage({ path: LOGO, x: 2.75, y: 0.1, w: 4.5, h: 4.5 });

  sl.addText("The Financial Control Layer for Enterprise AI Agents", {
    x: 0.5,
    y: 3.2,
    w: 9,
    h: 0.8,
    fontFace: "Calibri",
    fontSize: 26,
    bold: true,
    color: C.white,
    align: "center",
  });

  // Single value prop line replacing the old feature-list sub-tagline
  sl.addText(
    "Tutelum lets enterprises deploy AI agents that spend money without losing control.",
    {
      x: 0.5,
      y: 4.08,
      w: 9,
      h: 0.45,
      fontFace: "Calibri",
      fontSize: 16,
      color: C.muted,
      align: "center",
    },
  );

  sl.addText("Pre-Seed  ·  2026", {
    x: 0.5,
    y: 4.6,
    w: 9,
    h: 0.38,
    fontFace: "Calibri",
    fontSize: 18,
    color: C.accent,
    align: "center",
  });

  sl.addText("john@tutelum.ai  ·  tutelum.ai", {
    x: 6.8,
    y: 5.3,
    w: 3.0,
    h: 0.22,
    fontFace: "Calibri",
    fontSize: 9,
    color: C.mutedDark,
    align: "right",
    margin: 0,
  });
}

// ══════════════════════════════════════════════════════════════════════════════
// SLIDE 2 · PROBLEM  (reframed from feature-gaps to business consequences)
// ══════════════════════════════════════════════════════════════════════════════
{
  const sl = pres.addSlide();
  sl.background = { color: C.bg };
  slideNum(sl, 2);

  sl.addText("Agents Spend Real Money. With No Control.", {
    x: 0.5,
    y: 0.1,
    w: 9,
    h: 0.65,
    fontFace: "Calibri",
    fontSize: 30,
    bold: true,
    color: C.white,
    align: "center",
  });

  // Thesis statement — investor agrees before seeing the evidence
  sl.addText(
    "As AI agents gain purchasing power, enterprises have no financial control layer.",
    {
      x: 0.5,
      y: 0.78,
      w: 9,
      h: 0.38,
      fontFace: "Calibri",
      fontSize: 16,
      italic: true,
      color: C.accent,
      align: "center",
    },
  );

  const problems = [
    {
      title: "Invisible Spending",
      desc: "VP Engineering can't see what their agent fleet is spending: when, why, or to whom.",
    },
    {
      title: "Uncontrolled Spending",
      desc: "Any agent can call any API, drain company funds in a single request: no limits, no rules.",
    },
    {
      title: "Prompt Injection Risk",
      desc: "Agents can be manipulated by malicious content in web pages or APIs, redirecting payments without any human knowing.",
    },
    {
      title: "No Cryptographic Record",
      desc: "Finance and Compliance have nothing for auditors; no signed record of any agent transaction.",
    },
  ];

  const xs = [0.4, 5.25];
  const ys = [1.22, 3.48];
  const cW = 4.3,
    cH = 2.1;

  problems.forEach((p, i) => {
    const x = xs[i % 2],
      y = ys[Math.floor(i / 2)];
    card(sl, x, y, cW, cH, { border: "left" });

    sl.addText(p.title, {
      x: x + 0.22,
      y: y + 0.18,
      w: cW - 0.35,
      h: 0.45,
      fontFace: "Calibri",
      fontSize: 20,
      bold: true,
      color: C.white,
      margin: 0,
    });
    sl.addText(p.desc, {
      x: x + 0.22,
      y: y + 0.68,
      w: cW - 0.35,
      h: 1.3,
      fontFace: "Calibri",
      fontSize: 18,
      color: C.muted,
      margin: 0,
    });
  });
}

// ══════════════════════════════════════════════════════════════════════════════
// SLIDE 3 · WHY NOW  (moved before Incidents — urgency before evidence)
// ══════════════════════════════════════════════════════════════════════════════
{
  const sl = pres.addSlide();
  sl.background = { color: C.bg };
  slideNum(sl, 3);

  sl.addText("Three Converging Forces Create an Urgent Window", {
    x: 0.5,
    y: 0.15,
    w: 9,
    h: 0.72,
    fontFace: "Calibri",
    fontSize: 30,
    bold: true,
    color: C.white,
    align: "center",
  });

  const forces = [
    {
      stat: "119%",
      suffix: "",
      label: "Agent Explosion",
      source: "Salesforce Agentic Enterprise Index, Sept 2025",
      lines: [
        "Surge in agent creation, H1 2025",
        "Market: $7.92B today",
        "→ $236B by 2034 at 45.8% CAGR",
      ],
      accentColor: C.accent,
    },
    {
      stat: "€35M",
      suffix: "$40M",
      label: "Regulatory Pressure",
      subtitle:
        "EU's binding AI risk law; mandatory compliance for high-risk AI systems",
      source: "EU AI Act, Official Journal 2024",
      lines: [
        "€35M EU AI Act maximum penalty",
        "August 2026 Deadline",
        "→ 4 months away",
      ],
      accentColor: C.accentGold, // Elevated: most actionable near-term catalyst
    },
    {
      stat: "10,780%",
      suffix: "",
      label: "New Payment Rails",
      source: "Dune Analytics / Coinbase, Oct 2025",
      lines: [
        "x402 surge in one month (May 2025)",
        "Coinbase launched x402: May 2025",
        "~500K payments in one week, Oct 2025",
      ],
      accentColor: C.accent,
    },
  ];

  forces.forEach((f, i) => {
    const x = 0.45 + i * 3.2,
      y = 1.0;
    const cW = 2.9,
      cH = 4.2;
    card(sl, x, y, cW, cH, { border: "top", color: f.accentColor });

    const statFontSize = f.stat.length > 5 ? 38 : 46;
    sl.addText(f.stat, {
      x: x + 0.1,
      y: y + 0.18,
      w: cW - 0.2,
      h: 0.7,
      fontFace: "Calibri",
      fontSize: statFontSize,
      bold: true,
      color: f.accentColor,
      align: "center",
      margin: 0,
    });
    if (f.suffix) {
      sl.addText(f.suffix, {
        x: x + 0.1,
        y: y + 0.82,
        w: cW - 0.2,
        h: 0.38,
        fontFace: "Calibri",
        fontSize: 22,
        bold: true,
        color: f.accentColor,
        align: "center",
        margin: 0,
      });
    }

    sl.addText(f.label, {
      x: x + 0.1,
      y: y + 1.24,
      w: cW - 0.2,
      h: 0.42,
      fontFace: "Calibri",
      fontSize: 20,
      bold: true,
      color: C.white,
      align: "center",
      margin: 0,
    });

    if (f.subtitle) {
      sl.addText(f.subtitle, {
        x: x + 0.1,
        y: y + 1.68,
        w: cW - 0.2,
        h: 0.28,
        fontFace: "Calibri",
        fontSize: 10,
        italic: true,
        color: C.mutedDark,
        align: "center",
        margin: 0,
      });
    }

    // Divider
    const dividerY = f.subtitle ? y + 2.05 : y + 1.72;
    sl.addShape(pres.shapes.RECTANGLE, {
      x: x + 0.4,
      y: dividerY,
      w: cW - 0.8,
      h: 0.02,
      fill: { color: C.mutedDark },
      line: { color: C.mutedDark },
    });

    const linesStartY = f.subtitle ? y + 2.23 : y + 1.85;
    f.lines.forEach((ln, li) => {
      const isUrgencyNote = i === 1 && li === 2; // "→ 4 months away"
      sl.addText(ln, {
        x: x + 0.15,
        y: linesStartY + li * (isUrgencyNote ? 0.58 : 0.62),
        w: cW - 0.3,
        h: 0.58,
        fontFace: "Calibri",
        fontSize: isUrgencyNote ? 16 : 18,
        bold: isUrgencyNote,
        color: isUrgencyNote ? C.accentGold : C.muted,
        align: "center",
        margin: 0,
      });
    });

    // Source footnote
    sl.addText(`Source: ${f.source}`, {
      x: x + 0.1,
      y: y + 3.9,
      w: cW - 0.2,
      h: 0.22,
      fontFace: "Calibri",
      fontSize: 9,
      color: C.mutedDark,
      align: "center",
      margin: 0,
    });
  });
}

// ══════════════════════════════════════════════════════════════════════════════
// SLIDE 4 · REAL INCIDENTS  (moved after Why Now — evidence lands on primed urgency)
// ══════════════════════════════════════════════════════════════════════════════
{
  const sl = pres.addSlide();
  sl.background = { color: C.bg };
  slideNum(sl, 4);

  sl.addText("Real Incidents. Real Losses. No Controls.", {
    x: 0.5,
    y: 0.12,
    w: 9,
    h: 0.72,
    fontFace: "Calibri",
    fontSize: 30,
    bold: true,
    color: C.white,
    align: "center",
  });

  sl.addText("These are public incidents. The unreported ones are worse.", {
    x: 0.5,
    y: 0.9,
    w: 9,
    h: 0.38,
    fontFace: "Calibri",
    fontSize: 18,
    color: C.muted,
    align: "center",
  });

  const incidents = [
    {
      tag: "ON-CHAIN AGENT  ·  2026",
      title: "Lobstar Wilde",
      amount: "$250K",
      amountLabel: "paper value, irreversible",
      color: C.red,
      desc:
        "A trading agent misread a sarcastic post and transferred 5% of its token supply " +
        "(~$250K paper value) to a user requesting $4. The transaction was irreversible.",
      source: "Reported 2026",
    },
    {
      tag: "ON-CHAIN AGENT  ·  NOV 2024",
      title: "Freysa AI",
      amount: "$47K",
      amountLabel: "via prompt injection",
      color: C.accentGold,
      desc:
        "Freysa's only rule: never transfer funds. After 481 failed attempts, a user's " +
        'fake "admin terminal" override drained 13.19 ETH ($47K) from the prize pool.',
      source: "@jarrodwatts · Nov 2024",
    },
    {
      tag: "RESEARCH  ·  JAN 2025",
      title: "Google AP2 Flaws",
      amount: "Critical",
      amountLabel: "weaknesses in AP2",
      color: C.accentPurp,
      desc:
        "Adversarial prompts reliably subvert Google's Agent Payments Protocol, " +
        "manipulating purchases and extracting user data from Gemini agents.",
      source: "arXiv:2601.22569 · Jan 2026",
    },
  ];

  const incCW = 2.9,
    incCH = 3.9,
    incY = 1.42;

  incidents.forEach((inc, i) => {
    const x = 0.45 + i * 3.2;

    sl.addShape(pres.shapes.RECTANGLE, {
      x,
      y: incY,
      w: incCW,
      h: incCH,
      fill: { color: C.card },
      line: { color: C.cardBorder, width: 0.75 },
    });
    sl.addShape(pres.shapes.RECTANGLE, {
      x,
      y: incY,
      w: incCW,
      h: 0.05,
      fill: { color: inc.color },
      line: { color: inc.color },
    });

    sl.addText(inc.tag, {
      x: x + 0.15,
      y: incY + 0.12,
      w: incCW - 0.3,
      h: 0.22,
      fontFace: "Calibri",
      fontSize: 9,
      bold: true,
      color: inc.color,
      charSpacing: 1,
      margin: 0,
    });

    sl.addText(inc.amount, {
      x: x + 0.1,
      y: incY + 0.38,
      w: incCW - 0.2,
      h: 0.72,
      fontFace: "Calibri",
      fontSize: inc.amount.length > 7 ? 28 : 38,
      bold: true,
      color: inc.color,
      align: "center",
      margin: 0,
    });

    sl.addText(inc.amountLabel, {
      x: x + 0.1,
      y: incY + 1.14,
      w: incCW - 0.2,
      h: 0.28,
      fontFace: "Calibri",
      fontSize: 14,
      color: C.muted,
      align: "center",
      margin: 0,
    });

    sl.addText(inc.title, {
      x: x + 0.15,
      y: incY + 1.48,
      w: incCW - 0.3,
      h: 0.55,
      fontFace: "Calibri",
      fontSize: 20,
      bold: true,
      color: C.white,
      margin: 0,
    });

    sl.addShape(pres.shapes.RECTANGLE, {
      x: x + 0.15,
      y: incY + 2,
      w: incCW - 0.3,
      h: 0.02,
      fill: { color: C.mutedDark },
      line: { color: C.mutedDark },
    });

    sl.addText(inc.desc, {
      x: x + 0.15,
      y: incY + 2.2,
      w: incCW - 0.3,
      h: 1.38,
      fontFace: "Calibri",
      fontSize: 15,
      color: C.muted,
      margin: 0,
    });

    sl.addText(`Source: ${inc.source}`, {
      x: x + 0.1,
      y: incY + incCH - 0.26,
      w: incCW - 0.2,
      h: 0.22,
      fontFace: "Calibri",
      fontSize: 9,
      color: C.mutedDark,
      align: "center",
      margin: 0,
    });
  });
}

// ══════════════════════════════════════════════════════════════════════════════
// SLIDE 5 · PRODUCT  (stakeholder stack + architecture diagram)
// ══════════════════════════════════════════════════════════════════════════════
{
  const sl = pres.addSlide();
  sl.background = { color: C.bg };
  slideNum(sl, 5);

  sl.addText("One Layer. Every Stakeholder. Zero Bypass.", {
    x: 0.5,
    y: 0.08,
    w: 9,
    h: 0.62,
    fontFace: "Calibri",
    fontSize: 30,
    bold: true,
    color: C.white,
  });

  // ── Stakeholder chips (4 across top) ──
  const stakeholders = [
    { role: "DEVELOPERS", detail: "SDK + MCP · Zero rewrites required" },
    { role: "VP ENG / CTO", detail: "Policy Engine · Spend limits" },
    { role: "CISO", detail: "Anomaly Detection · TEE" },
    { role: "FINANCE / LEGAL", detail: "Immutable Audit Log · SOC 2" },
  ];

  stakeholders.forEach((s, i) => {
    const x = 0.4 + i * 2.3;
    sl.addShape(pres.shapes.RECTANGLE, {
      x,
      y: 0.78,
      w: 2.12,
      h: 1.0,
      fill: { color: C.cardAlt },
      line: { color: C.cardBorder, width: 0.75 },
    });
    sl.addText(s.role, {
      x: x + 0.1,
      y: 0.86,
      w: 1.92,
      h: 0.32,
      fontFace: "Calibri",
      fontSize: 14,
      bold: true,
      color: C.accent,
      align: "center",
      charSpacing: 1,
      margin: 0,
    });
    sl.addText(s.detail, {
      x: x + 0.1,
      y: 1.22,
      w: 1.92,
      h: 0.42,
      fontFace: "Calibri",
      fontSize: 12,
      color: i === 0 ? C.white : C.muted, // "Zero rewrites required" in white for emphasis
      align: "center",
      margin: 0,
    });
  });

  // ── Transaction Flow Diagram ──
  const flowY = 2.17;
  const nodes = [
    {
      label: "AI Agent",
      sub: "initiates pay()",
      color: C.cardAlt,
      border: C.mutedDark,
    },
    {
      label: "Policy Engine",
      sub: "rules enforced\nserver-side",
      color: C.nodeBg,
      border: C.accentDim,
    },
    {
      label: "TEE Layer",
      sub: "hardware limits\ncrypto-verified",
      color: C.nodeTeeBg,
      border: C.accentPurp,
    },
    {
      label: "Payment Router",
      sub: "x402 · USDC\ncard · ACH",
      color: C.nodeBg,
      border: C.accentDim,
    },
    {
      label: "Paid + Logged",
      sub: "signed receipt\nimmutable record",
      color: C.nodeGreenBg,
      border: C.nodeGreenBorder,
    },
  ];

  const nodeW = 1.6,
    nodeH = 1.75,
    gapW = 0.22;
  const totalRowW = nodes.length * nodeW + (nodes.length - 1) * gapW;
  const startX = (W - totalRowW) / 2;

  nodes.forEach((n, i) => {
    const x = startX + i * (nodeW + gapW);

    sl.addShape(pres.shapes.RECTANGLE, {
      x,
      y: flowY,
      w: nodeW,
      h: nodeH,
      fill: { color: n.color },
      line: { color: n.border, width: 1.2 },
    });

    sl.addShape(pres.shapes.RECTANGLE, {
      x,
      y: flowY,
      w: nodeW,
      h: 0.05,
      fill: { color: n.border },
      line: { color: n.border },
    });

    sl.addText(n.label, {
      x: x + 0.08,
      y: flowY + 0.14,
      w: nodeW - 0.16,
      h: 0.48,
      fontFace: "Calibri",
      fontSize: 18,
      bold: true,
      color: C.white,
      align: "center",
      margin: 0,
    });
    sl.addText(n.sub, {
      x: x + 0.08,
      y: flowY + 0.68,
      w: nodeW - 0.16,
      h: 0.95,
      fontFace: "Calibri",
      fontSize: 14,
      color: C.muted,
      align: "center",
      margin: 0,
    });

    if (i < nodes.length - 1) {
      const arrowW = gapW - 0.02;
      const arrowH = 0.28;
      const ax = x + nodeW + 0.01;
      const ay = flowY + nodeH / 2 - arrowH / 2;
      sl.addShape(pres.shapes.RIGHT_ARROW, {
        x: ax,
        y: ay,
        w: arrowW,
        h: arrowH,
        fill: { color: C.accent },
        line: { color: C.accent, width: 0.5 },
      });
    }
  });

  // ── CISO Q&A strip ──
  sl.addShape(pres.shapes.RECTANGLE, {
    x: 0.4,
    y: 4.3,
    w: 9.2,
    h: 1.1,
    fill: { color: C.cardAlt },
    line: { color: C.stripBorder, width: 0.75 },
  });

  sl.addText(
    [
      {
        text: "CISO: Can an agent spend outside policy if Tutelum's servers are breached?  ",
        options: { color: C.muted },
      },
      { text: "No.", options: { bold: true, color: C.accent } },
      {
        text: "  Spend limits are enforced in hardware by Turnkey's secure enclave; cryptographically verifiable, independent of our application layer.",
        options: { color: C.muted },
      },
    ],
    {
      x: 0.6,
      y: 4.3,
      w: 8.9,
      h: 1.1,
      fontFace: "Calibri",
      fontSize: 18,
      valign: "middle",
      margin: 0,
    },
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// SLIDE 6 · MARKET SIZE  (moved before Competition — size before proof)
// ══════════════════════════════════════════════════════════════════════════════
{
  const sl = pres.addSlide();
  sl.background = { color: C.bg };
  slideNum(sl, 6);

  sl.addText("A $236B Market With No Governance Layer", {
    x: 0.5,
    y: 0.12,
    w: 9,
    h: 0.72,
    fontFace: "Calibri",
    fontSize: 30,
    bold: true,
    color: C.white,
    align: "center",
  });

  const markets = [
    {
      label: "TAM",
      value: "$236B",
      sub: "Global AI Agents market by 2034",
      note: "45.82% CAGR · Precedence Research",
      highlight: true,
    },
    {
      label: "SAM",
      value: "$18B",
      sub: "Enterprise agentic AI with financial capability",
      note: "88% enterprises × 200 agents × $20K/yr = ~$17.6B",
      highlight: false,
    },
    {
      label: "SOM",
      value: "$850M",
      sub: "Reachable via dev-led enterprise sales (3 yrs)",
      note: "0.3% SAM · 5 accts Y1",
      highlight: false,
    },
  ];

  markets.forEach((m, i) => {
    const x = 0.5 + i * 3.1;
    card(sl, x, 0.96, 2.85, 2.3, {
      border: "top",
      color: m.highlight ? C.accent : C.accentDim,
      fill: m.highlight ? C.nodeBg : C.card,
      lineColor: m.highlight ? C.accentDim : C.cardBorder,
    });

    sl.addText(m.label, {
      x: x + 0.15,
      y: 1.12,
      w: 2.55,
      h: 0.36,
      fontFace: "Calibri",
      fontSize: 18,
      bold: true,
      color: C.accent,
      charSpacing: 3,
      margin: 0,
    });

    sl.addText(m.value, {
      x: x + 0.1,
      y: 1.48,
      w: 2.65,
      h: 0.72,
      fontFace: "Calibri",
      fontSize: 42,
      bold: true,
      color: C.white,
      align: "center",
      margin: 0,
    });

    sl.addText(m.sub, {
      x: x + 0.1,
      y: 2.22,
      w: 2.65,
      h: 0.52,
      fontFace: "Calibri",
      fontSize: 16,
      color: C.muted,
      align: "center",
      margin: 0,
    });

    sl.addText(m.note, {
      x: x + 0.1,
      y: 2.8,
      w: 2.65,
      h: 0.3,
      fontFace: "Calibri",
      fontSize: 12,
      color: C.accentDim,
      align: "center",
      margin: 0,
    });
  });

  // Bottom-up TAM card
  sl.addShape(pres.shapes.RECTANGLE, {
    x: 0.4,
    y: 3.38,
    w: 9.2,
    h: 1.1,
    fill: { color: C.deepBg },
    line: { color: C.accentDim, width: 0.75 },
  });
  sl.addShape(pres.shapes.RECTANGLE, {
    x: 0.4,
    y: 3.38,
    w: 0.05,
    h: 1.1,
    fill: { color: C.accent },
    line: { color: C.accent },
  });

  sl.addText("Bottom-Up Validation", {
    x: 0.65,
    y: 3.44,
    w: 3.5,
    h: 0.35,
    fontFace: "Calibri",
    fontSize: 18,
    bold: true,
    color: C.accent,
    margin: 0,
  });
  sl.addText(
    "~400K AI agents with purchasing power today · avg 200 agents/fleet · governance $20K–$80K/yr per fleet\n" +
      "Near-term SAM: $6B–$20B · 5 enterprise pilot accounts in Year 1 at avg $40K ACV = ~$200K ARR",
    {
      x: 0.65,
      y: 3.82,
      w: 8.8,
      h: 0.62,
      fontFace: "Calibri",
      fontSize: 14,
      color: C.muted,
      margin: 0,
    },
  );

  // Stat chips
  const stats = [
    {
      val: "400K+",
      label: "AI agents with\npurchasing power today",
      source: "Coinbase / x402, Q1 2026",
    },
    {
      val: "140M",
      label: "agent payments in\n9 months (2025)",
      source: "Dune Analytics / x402, 2025",
    },
    {
      val: "88%",
      label: "of enterprises using\nAI in ≥1 function",
      source: "McKinsey, 2025",
    },
    {
      val: "€35M",
      label: "EU AI Act max penalty\nAug 2026 enforce",
      source: "EU Official Journal",
    },
  ];

  stats.forEach((s, i) => {
    const x = 0.5 + i * 2.37;
    sl.addShape(pres.shapes.RECTANGLE, {
      x,
      y: 4.58,
      w: 2.17,
      h: 1.0,
      fill: { color: C.cardAlt },
      line: { color: C.stripBorder, width: 0.75 },
    });
    sl.addText(s.val, {
      x: x + 0.08,
      y: 4.62,
      w: 2.01,
      h: 0.42,
      fontFace: "Calibri",
      fontSize: 20,
      bold: true,
      color: C.accent,
      align: "center",
      margin: 0,
    });
    sl.addText(s.label, {
      x: x + 0.08,
      y: 5.06,
      w: 2.01,
      h: 0.4,
      fontFace: "Calibri",
      fontSize: 13,
      color: C.muted,
      align: "center",
      margin: 0,
    });
    sl.addText(`Source: ${s.source}`, {
      x: x + 0.08,
      y: 5.44,
      w: 2.01,
      h: 0.18,
      fontFace: "Calibri",
      fontSize: 9,
      color: C.mutedDark,
      align: "center",
      margin: 0,
    });
  });
}

// ══════════════════════════════════════════════════════════════════════════════
// SLIDE 7 · COMPETITION  (capability matrix + honest ⚠️ + legend)
// ══════════════════════════════════════════════════════════════════════════════
{
  const sl = pres.addSlide();
  sl.background = { color: C.bg };
  slideNum(sl, 7);

  sl.addText("Every Alternative Enables Spending. None Enforce Governance.", {
    x: 0.2,
    y: 0.12,
    w: 9.6,
    h: 0.44,
    fontFace: "Calibri",
    fontSize: 22,
    bold: true,
    color: C.white,
    align: "center",
  });

  // ── Capability Matrix ──
  const startX = 0.18;
  const startY = 0.68;
  const labelW = 2.28;
  const numCols = 6;
  const colW = (W - startX * 2 - labelW) / numCols;
  const headerH = 0.58;
  const rowH = 0.62;

  const competitorNames = [
    "Tutelum",
    "Skyfire",
    "Payman AI",
    "AnChain.AI",
    "MC Agent Pay",
    "Ramp / Brex",
  ];

  // x402 row updated: Tutelum gets ⚠️ (x402 native; traditional card/ACH rails in development)
  const capabilities = [
    {
      label: "TEE / Hardware-Attested\nEnforcement",
      vals: ["Y", "N", "N", "P", "N", "N"],
    },
    {
      label: "Prompt Injection Defense\nat Payment Layer",
      vals: ["Y", "N", "N", "N", "N", "N"],
    },
    {
      label: "Complex Conditional\nPolicy Engine",
      vals: ["Y", "P", "P", "N", "P", "P"],
    },
    {
      label: "x402 + Traditional\nPayment Rails",
      vals: ["P", "P", "P", "N", "Y", "Y"],
    },
    {
      label: "Enterprise Agent\nGovernance",
      vals: ["Y", "P", "P", "P", "N", "N"],
    },
    {
      label: "Real-Time Transaction\nBlocking",
      vals: ["Y", "N", "P", "N", "P", "N"],
    },
  ];

  const SYM = { Y: "✅", N: "❌", P: "⚠️" };
  const SYM_COLOR = { Y: C.green, N: C.red, P: C.accentGold };

  const tutelumX = startX + labelW;
  const tableH = headerH + capabilities.length * rowH;

  // Tutelum column highlight
  sl.addShape(pres.shapes.RECTANGLE, {
    x: tutelumX,
    y: startY,
    w: colW,
    h: tableH,
    fill: { color: C.tutelumRowBg },
    line: { color: C.accent, width: 1.5 },
  });
  sl.addShape(pres.shapes.RECTANGLE, {
    x: tutelumX,
    y: startY,
    w: colW,
    h: 0.05,
    fill: { color: C.accent },
    line: { color: C.accent },
  });

  // Header row
  sl.addShape(pres.shapes.RECTANGLE, {
    x: startX,
    y: startY,
    w: labelW,
    h: headerH,
    fill: { color: C.cardAlt },
    line: { color: C.compBorder, width: 0.75 },
  });

  competitorNames.forEach((name, ci) => {
    const cx = startX + labelW + ci * colW;
    const isTutelum = ci === 0;

    sl.addShape(pres.shapes.RECTANGLE, {
      x: cx,
      y: startY,
      w: colW,
      h: headerH,
      fill: { color: isTutelum ? C.tutelumRowBg : C.cardAlt },
      line: {
        color: isTutelum ? C.accent : C.compBorder,
        width: isTutelum ? 1.5 : 0.75,
      },
    });

    sl.addText(name, {
      x: cx + 0.04,
      y: startY,
      w: colW - 0.08,
      h: headerH,
      fontFace: "Calibri",
      fontSize: isTutelum ? 18 : 14,
      bold: isTutelum,
      color: isTutelum ? C.accent : C.muted,
      align: "center",
      valign: "middle",
      margin: 0,
    });
  });

  // Data rows
  capabilities.forEach((cap, ri) => {
    const ry = startY + headerH + ri * rowH;
    const isEven = ri % 2 === 0;
    const rowBg = isEven ? C.card : C.compRowAlt;

    sl.addShape(pres.shapes.RECTANGLE, {
      x: startX,
      y: ry,
      w: labelW,
      h: rowH,
      fill: { color: rowBg },
      line: { color: C.compBorder, width: 0.75 },
    });
    sl.addText(cap.label, {
      x: startX + 0.14,
      y: ry,
      w: labelW - 0.18,
      h: rowH,
      fontFace: "Calibri",
      fontSize: 14,
      color: C.white,
      valign: "middle",
      margin: 0,
    });

    cap.vals.forEach((val, ci) => {
      const cx = startX + labelW + ci * colW;
      const isTutelum = ci === 0;

      sl.addShape(pres.shapes.RECTANGLE, {
        x: cx,
        y: ry,
        w: colW,
        h: rowH,
        fill: { color: isTutelum ? C.tutelumRowBg : rowBg },
        line: {
          color: isTutelum ? C.accent : C.compBorder,
          width: isTutelum ? 1.5 : 0.75,
        },
      });

      sl.addText(SYM[val], {
        x: cx + 0.04,
        y: ry,
        w: colW - 0.08,
        h: rowH,
        fontFace: "Calibri",
        fontSize: isTutelum ? 20 : 16,
        color: SYM_COLOR[val],
        align: "center",
        valign: "middle",
        margin: 0,
      });
    });
  });

  const tableBottom = startY + tableH;

  // Legend
  sl.addText(
    "✅ Full support  ·  ⚠️ Partial / in development  ·  ❌ Not supported",
    {
      x: 0.2,
      y: tableBottom + 0.2,
      w: 9.6,
      h: 0.2,
      fontFace: "Calibri",
      fontSize: 11,
      color: C.mutedDark,
      align: "center",
      margin: 0,
    },
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// SLIDE 8 · TRACTION  (moved after Competition; 4th card strengthened)
// ══════════════════════════════════════════════════════════════════════════════
{
  const sl = pres.addSlide();
  sl.background = { color: C.bg };
  slideNum(sl, 8);

  sl.addText("Momentum Before Revenue", {
    x: 0.5,
    y: 0.15,
    w: 9,
    h: 0.7,
    fontFace: "Calibri",
    fontSize: 30,
    bold: true,
    color: C.white,
    align: "center",
  });

  sl.addText(
    "Pre-revenue ≠ pre-progress. The product is live and integrated with the top agent frameworks.",
    {
      x: 0.75,
      y: 0.9,
      w: 8.5,
      h: 0.45,
      fontFace: "Calibri",
      fontSize: 18,
      color: C.muted,
      align: "center",
    },
  );

  const traction = [
    {
      stat: "3",
      label: "Integrations Shipped",
      detail:
        "LangChain  ·  AutoGen  ·  MCP\nDrop-in for popular agent frameworks",
      color: C.accent,
    },
    {
      stat: "100%",
      label: "Policy Enforcement Rate",
      detail: "Zero policy bypasses recorded\nin production testing to date",
      color: C.green,
    },
    {
      stat: "0 → Live",
      label: "Production-Ready\n(1 month)",
      detail: "Built by a 3-person team\nDemonstrates execution speed",
      color: C.accentTeal,
    },
    {
      stat: "5",
      label: "Pilot Leads",
      detail:
        "Active conversations with CISOs\nand VP Engs in fintech and logistics",
      color: C.accentGold,
    },
  ];

  traction.forEach((t, i) => {
    const x = 0.4 + i * 2.35;
    card(sl, x, 1.48, 2.15, 3.72, {
      border: "top",
      color: t.color,
      fill: C.card,
      lineColor: C.cardBorder,
    });

    sl.addText(t.stat, {
      x: x + 0.1,
      y: 1.66,
      w: 1.95,
      h: 0.72,
      fontFace: "Calibri",
      fontSize: t.stat.length > 3 ? 30 : 42,
      bold: true,
      color: t.color,
      align: "center",
      margin: 0,
    });

    sl.addText(t.label, {
      x: x + 0.1,
      y: 2.44,
      w: 1.95,
      h: 0.45,
      fontFace: "Calibri",
      fontSize: 18,
      bold: true,
      color: C.white,
      align: "center",
      margin: 0,
    });

    sl.addShape(pres.shapes.RECTANGLE, {
      x: x + 0.3,
      y: 3.28,
      w: 1.55,
      h: 0.02,
      fill: { color: C.mutedDark },
      line: { color: C.mutedDark },
    });

    sl.addText(t.detail, {
      x: x + 0.1,
      y: 3.44,
      w: 1.95,
      h: 1.4,
      fontFace: "Calibri",
      fontSize: 16,
      color: C.muted,
      align: "center",
      margin: 0,
    });
  });

  // Bottom call-to-action strip
  sl.addShape(pres.shapes.RECTANGLE, {
    x: 0.4,
    y: 5.2,
    w: 9.2,
    h: 0.35,
    fill: { color: C.nodeGreenBg },
    line: { color: C.nodeGreenBorder, width: 0.75 },
  });
  sl.addText(
    "Goal: 5 signed LOIs before seed round  ·  EU AI Act enforcement window: August 2026",
    {
      x: 0.6,
      y: 5.2,
      w: 8.8,
      h: 0.35,
      fontFace: "Calibri",
      fontSize: 14,
      color: C.green,
      align: "center",
      valign: "middle",
      margin: 0,
    },
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// SLIDE 9 · BUSINESS MODEL  (moved after Traction; NRR expansion added)
// ══════════════════════════════════════════════════════════════════════════════
{
  const sl = pres.addSlide();
  sl.background = { color: C.bg };
  slideNum(sl, 9);

  sl.addText("Usage-Based SaaS + Platform Fees", {
    x: 0.5,
    y: 0.12,
    w: 9,
    h: 0.68,
    fontFace: "Calibri",
    fontSize: 30,
    bold: true,
    color: C.white,
  });

  const plans = [
    {
      name: "Starter",
      price: "Free  →  $199/mo",
      features: [
        "Up to 10 agents",
        "10K tx/mo",
        "Basic policy",
        "30-day audit log",
      ],
      highlight: false,
    },
    {
      name: "Growth",
      price: "$999/mo + 0.008% per tx",
      features: [
        "Unlimited agents",
        "Full policy + anomaly detection",
        "Human approvals",
        "12-month audit log",
      ],
      highlight: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      features: [
        "Turnkey TEE hardware",
        "SOC 2 / EU AI Act packages",
        "SSO (Okta, Azure AD)",
        "Dedicated support",
      ],
      highlight: false,
    },
  ];

  plans.forEach((plan, i) => {
    const x = 0.4 + i * 3.15,
      y = 0.92;
    const cW = 2.95,
      cH = 3.2;

    card(sl, x, y, cW, cH, {
      border: "top",
      color: plan.highlight ? C.accent : C.accentDim,
      fill: plan.highlight ? C.nodeBg : C.card,
      lineColor: plan.highlight ? C.accentDim : C.cardBorder,
    });

    sl.addText(plan.name, {
      x: x + 0.15,
      y: y + 0.15,
      w: cW - 0.3,
      h: 0.42,
      fontFace: "Calibri",
      fontSize: 20,
      bold: true,
      color: plan.highlight ? C.accent : C.white,
      margin: 0,
    });

    sl.addText(plan.price, {
      x: x + 0.15,
      y: y + 0.6,
      w: cW - 0.3,
      h: 0.38,
      fontFace: "Calibri",
      fontSize: 18,
      bold: true,
      color: plan.highlight ? C.white : C.muted,
      margin: 0,
    });

    sl.addShape(pres.shapes.RECTANGLE, {
      x: x + 0.15,
      y: y + 1.04,
      w: cW - 0.3,
      h: 0.02,
      fill: { color: C.featureStrip },
      line: { color: C.featureStrip },
    });

    plan.features.forEach((f, fi) => {
      dot(
        sl,
        x + 0.18,
        y + 1.22 + fi * 0.49 + 0.09,
        plan.highlight ? C.accent : C.mutedDark,
      );
      sl.addText(f, {
        x: x + 0.35,
        y: y + 1.2 + fi * 0.49,
        w: cW - 0.52,
        h: 0.42,
        fontFace: "Calibri",
        fontSize: 16,
        color: plan.highlight ? C.white : C.muted,
        valign: "middle",
        margin: 0,
      });
    });
  });

  // Unit economics + NRR expansion callout box
  sl.addShape(pres.shapes.RECTANGLE, {
    x: 0.4,
    y: 4.12,
    w: 9.2,
    h: 1.46,
    fill: { color: C.deepBg },
    line: { color: C.accentDim, width: 0.75 },
  });

  sl.addShape(pres.shapes.RECTANGLE, {
    x: 0.4,
    y: 4.12,
    w: 0.05,
    h: 1.46,
    fill: { color: C.accent },
    line: { color: C.accent },
  });

  sl.addText("Unit Economics", {
    x: 0.65,
    y: 4.19,
    w: 8.7,
    h: 0.34,
    fontFace: "Calibri",
    fontSize: 18,
    bold: true,
    color: C.accent,
    margin: 0,
  });

  sl.addText(
    "Growth $999/mo = $12K ACV  ·  Enterprise ~$40K–$80K ACV  ·  Model: 5 enterprise accounts Y1 × $40K avg = ~$200K ARR",
    {
      x: 0.65,
      y: 4.58,
      w: 8.7,
      h: 0.36,
      fontFace: "Calibri",
      fontSize: 14,
      color: C.muted,
      margin: 0,
    },
  );

  // Divider between unit economics and NRR line
  sl.addShape(pres.shapes.RECTANGLE, {
    x: 0.65,
    y: 5.0,
    w: 8.7,
    h: 0.02,
    fill: { color: C.mutedDark },
    line: { color: C.mutedDark },
  });

  sl.addText(
    "NRR expansion: a $12K/yr Growth account becomes $30K/yr as the agent fleet grows 2–3× YoY. Zero new sales motion.",
    {
      x: 0.65,
      y: 5.08,
      w: 8.7,
      h: 0.38,
      fontFace: "Calibri",
      fontSize: 14,
      italic: true,
      color: C.accentTeal,
      margin: 0,
    },
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// SLIDE 10 · GO-TO-MARKET  (initial distribution + activation timeline added)
// ══════════════════════════════════════════════════════════════════════════════
{
  const sl = pres.addSlide();
  sl.background = { color: C.bg };
  slideNum(sl, 10);

  sl.addText("Three-Motion GTM Strategy", {
    x: 0.5,
    y: 0.15,
    w: 9,
    h: 0.68,
    fontFace: "Calibri",
    fontSize: 30,
    bold: true,
    color: C.white,
  });

  sl.addText(
    "Dev-led adoption lands the account. Compliance pressure closes the enterprise deal. Usage expansion drives NRR.",
    {
      x: 0.75,
      y: 0.88,
      w: 8.5,
      h: 0.45,
      fontFace: "Calibri",
      fontSize: 18,
      color: C.muted,
      align: "center",
    },
  );

  const gtm = [
    {
      number: "①",
      title: "SDK-Led (Bottom-Up)",
      detail:
        "Initial developer reach via LangChain, AutoGen, and MCP communities: 200K+ active users. Free tier drives adoption into team stacks, zero cold sales needed.",
      color: C.accent,
    },
    {
      number: "②",
      title: "Compliance Pull (Top-Down)",
      detail:
        "EU AI Act enforcement (Aug 2026) is a mandatory procurement trigger. CISOs are already asking about agent financial controls; Tutelum is the answer.",
      color: C.accentTeal,
    },
    {
      number: "③",
      title: "Usage Expansion (Built-In NRR)",
      detail:
        "Revenue scales automatically with agent fleet size. Every new agent an existing customer deploys generates incremental per-transaction revenue.",
      color: C.accentGold,
    },
  ];

  gtm.forEach((g, i) => {
    const x = 0.4 + i * 3.2,
      y = 1.45;
    card(sl, x, y, 2.95, 3.45, { border: "top", color: g.color, fill: C.card });

    sl.addText(g.number, {
      x: x + 0.15,
      y: y + 0.18,
      w: 0.5,
      h: 0.52,
      fontFace: "Calibri",
      fontSize: 26,
      bold: true,
      color: g.color,
      margin: 0,
    });

    sl.addText(g.title, {
      x: x + 0.15,
      y: y + 0.76,
      w: 2.65,
      h: 0.52,
      fontFace: "Calibri",
      fontSize: 20,
      bold: true,
      color: C.white,
      margin: 0,
    });

    sl.addShape(pres.shapes.RECTANGLE, {
      x: x + 0.15,
      y: y + 1.34,
      w: 2.65,
      h: 0.02,
      fill: { color: C.mutedDark },
      line: { color: C.mutedDark },
    });

    sl.addText(g.detail, {
      x: x + 0.15,
      y: y + 1.44,
      w: 2.65,
      h: 1.88,
      fontFace: "Calibri",
      fontSize: 16,
      color: C.muted,
      margin: 0,
    });
  });

  // Activation timeline strip
  sl.addShape(pres.shapes.RECTANGLE, {
    x: 0.4,
    y: 4.98,
    w: 9.2,
    h: 0.54,
    fill: { color: C.cardAlt },
    line: { color: C.stripBorder, width: 0.75 },
  });
  sl.addText(
    [
      { text: "Activation:  ", options: { bold: true, color: C.accent } },
      {
        text: "SDK-led (Now)  →  ",
        options: { color: C.muted },
      },
      {
        text: "Compliance pull (Q3 2026, EU AI Act enforcement)  →  ",
        options: { color: C.accentGold },
      },
      {
        text: "Usage expansion (YR2+)",
        options: { bold: true, color: C.white },
      },
    ],
    {
      x: 0.6,
      y: 4.98,
      w: 8.9,
      h: 0.54,
      fontFace: "Calibri",
      fontSize: 13,
      valign: "middle",
      margin: 0,
    },
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// SLIDE 11 · TEAM  (founder-market fit sentences + updated backstory + LinkedIn)
// ══════════════════════════════════════════════════════════════════════════════
{
  const sl = pres.addSlide();
  sl.background = { color: C.bg };
  slideNum(sl, 11);

  sl.addText("Built by Engineers Who've Lived the Problem", {
    x: 0.5,
    y: 0.12,
    w: 9,
    h: 0.72,
    fontFace: "Calibri",
    fontSize: 30,
    bold: true,
    color: C.white,
  });

  const team = [
    {
      name: "John Chambard",
      role: "CEO  ·  Co-Founder",
      // Confirm LinkedIn slug before publishing
      linkedin: "linkedin.com/in/john-chambard",
      fit: "Built infrastructure and enterprise compliance tooling at NETSYNC; Saw how emerging regulations around agents creates a need for AI auditing.",
      initial: "J",
      photo: path.resolve(__dirname, "John.png"),
      avatarColor: C.avatarJohn,
      bg: ["Comp Sci @ Purdue", "Enterprise IT @ Phillips66"],
    },
    {
      name: "Sri Harsha Potta",
      role: "CTO  ·  Co-Founder",
      // Confirm LinkedIn slug before publishing
      linkedin: "linkedin.com/in/sri-harsha-potta",
      fit: "Built developer tooling at NETSYNC for platform tools; Knows exactly where governance gaps open up when developers get API access.",
      initial: "S",
      photo: path.resolve(__dirname, "sri.jpeg"),
      avatarColor: C.avatarSri,
      bg: ["Comp Sci @ UT Austin", "Cloud Infrastructure @ HPE"],
    },
    {
      name: "Amar Nangia",
      role: "CRO  ·  Co-Founder",
      // Confirm LinkedIn slug before publishing
      linkedin: "linkedin.com/in/amar-nangia",
      fit: "Worked on agent fleet deployments at NETSYNC; Saw the control gap firsthand: agents with access and nothing governing them.",
      initial: "A",
      photo: path.resolve(__dirname, "Amar.png"),
      avatarColor: C.avatarAmar,
      bg: ["Comp Sci @ Georgia Tech", "SWE @ LinkedIn"],
    },
  ];

  const cW = 2.8,
    cH = 3.5;

  team.forEach((member, i) => {
    const x = 0.4 + i * 3.1,
      y = 0.95;
    card(sl, x, y, cW, cH, { border: "top" });

    const photoSize = 0.9;
    const avatarX = x + (cW - photoSize) / 2;
    const avatarY = y + 0.14;

    if (fs.existsSync(member.photo)) {
      sl.addImage({
        path: member.photo,
        x: avatarX,
        y: avatarY,
        w: photoSize,
        h: photoSize,
      });
    } else {
      sl.addShape(pres.shapes.OVAL, {
        x: avatarX,
        y: avatarY,
        w: photoSize,
        h: photoSize,
        fill: { color: member.avatarColor },
        line: { color: C.accent, width: 1.5 },
      });
      sl.addText(member.initial, {
        x: avatarX,
        y: avatarY,
        w: photoSize,
        h: photoSize,
        fontFace: "Calibri",
        fontSize: 26,
        bold: true,
        color: C.white,
        align: "center",
        valign: "middle",
        margin: 0,
      });
    }

    sl.addText(member.name, {
      x: x + 0.1,
      y: y + 1.1,
      w: cW - 0.2,
      h: 0.38,
      fontFace: "Calibri",
      fontSize: 18,
      bold: true,
      color: C.white,
      align: "center",
      margin: 0,
    });

    sl.addText(member.role, {
      x: x + 0.1,
      y: y + 1.52,
      w: cW - 0.2,
      h: 0.28,
      fontFace: "Calibri",
      fontSize: 14,
      bold: true,
      color: C.accent,
      align: "center",
      margin: 0,
    });

    // Founder-market fit sentence
    sl.addText(member.fit, {
      x: x + 0.12,
      y: y + 1.84,
      w: cW - 0.24,
      h: 0.74,
      fontFace: "Calibri",
      fontSize: 12,
      italic: true,
      color: C.muted,
      align: "center",
      margin: 0,
    });

    // Divider
    sl.addShape(pres.shapes.RECTANGLE, {
      x: x + 0.3,
      y: y + 2.64,
      w: cW - 0.6,
      h: 0.02,
      fill: { color: C.mutedDark },
      line: { color: C.mutedDark },
    });

    member.bg.forEach((b, bi) => {
      sl.addText(b, {
        x: x + 0.1,
        y: y + 2.72 + bi * 0.28,
        w: cW - 0.2,
        h: 0.26,
        fontFace: "Calibri",
        fontSize: 13,
        color: C.muted,
        align: "center",
        margin: 0,
      });
    });

    // LinkedIn link
    sl.addText(member.linkedin, {
      x: x + 0.1,
      y: y + 3.3,
      w: cW - 0.2,
      h: 0.18,
      fontFace: "Calibri",
      fontSize: 10,
      color: C.accentDim,
      align: "center",
      margin: 0,
    });
  });

  // Updated backstory — problem-discovery framing
  sl.addShape(pres.shapes.RECTANGLE, {
    x: 0.4,
    y: 4.52,
    w: 9.2,
    h: 1.0,
    fill: { color: C.cardAlt },
    line: { color: C.stripBorder, width: 0.75 },
  });

  sl.addText(
    "We have built together for six years: hackathons, UIL competitive programming, " +
      "a school app used by thousands, and internships at NETSYNC. Tutelum started when we saw firsthand how easy it was " +
      "to give agents powerful API access with almost no financial safeguards.",
    {
      x: 0.65,
      y: 4.57,
      w: 8.7,
      h: 0.9,
      fontFace: "Calibri",
      fontSize: 16,
      color: C.muted,
      valign: "middle",
      margin: 0,
    },
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// SLIDE 12 · THE ASK  (specific $150K target; milestone-to-seed framing)
// ══════════════════════════════════════════════════════════════════════════════
{
  const sl = pres.addSlide();
  sl.background = { color: C.bgBlack };

  // Specific ask amount — targeted at this accelerator's check size
  sl.addText("$150K", {
    x: 0.5,
    y: 0.12,
    w: 9,
    h: 0.72,
    fontFace: "Calibri",
    fontSize: 48,
    bold: true,
    color: C.accent,
    align: "center",
  });

  sl.addText("Pre-Seed  ·  Accelerator Round  ·  SAFE", {
    x: 0.5,
    y: 0.86,
    w: 9,
    h: 0.38,
    fontFace: "Calibri",
    fontSize: 18,
    bold: true,
    color: C.white,
    align: "center",
  });

  sl.addText(
    "12 months runway  ·  5 enterprise pilot LOIs  ·  EU AI Act compliance launch",
    {
      x: 0.5,
      y: 1.28,
      w: 9,
      h: 0.35,
      fontFace: "Calibri",
      fontSize: 18,
      color: C.muted,
      align: "center",
    },
  );

  // ── What we're looking for — 3 cards ──
  const asks = [
    {
      title: "Capital",
      color: C.accent,
      detail:
        "Pre-seed SAFE to fund 12 months of engineering, 5 pilot LOIs, and SOC 2 certification",
    },
    {
      title: "Mentors & Network",
      color: C.accentTeal,
      detail:
        "Intros to enterprise prospects · EU regulatory advisors · dev community",
    },
    {
      title: "Accelerator Value",
      color: C.accentGold,
      detail:
        "Portfolio companies as early customers · enterprise sales credibility · co-investor intros",
    },
  ];

  asks.forEach((a, i) => {
    const x = 0.4 + i * 3.2,
      y = 1.72;
    card(sl, x, y, 2.95, 1.5, {
      border: "top",
      color: a.color,
      fill: C.deepBg,
      lineColor: C.accentDim,
    });
    sl.addText(a.title, {
      x: x + 0.15,
      y: y + 0.14,
      w: 2.65,
      h: 0.38,
      fontFace: "Calibri",
      fontSize: 20,
      bold: true,
      color: C.white,
      margin: 0,
    });
    sl.addText(a.detail, {
      x: x + 0.15,
      y: y + 0.56,
      w: 2.65,
      h: 0.88,
      fontFace: "Calibri",
      fontSize: 16,
      color: C.muted,
      margin: 0,
    });
  });

  // ── Milestone-to-Seed Timeline  (replaces raw ARR projections) ──
  const milestones = [
    {
      year: "THIS RAISE",
      arr: "$0",
      label: "5 pilot LOIs\nProduct live",
    },
    {
      year: "MILESTONE 1",
      arr: "$200K",
      label: "5 paying pilots\nenterprise ARR",
    },
    {
      year: "SEED ROUND",
      arr: "$1.5M",
      label: "Target seed raise\nEU market launch",
    },
    {
      year: "SEED DEPLOYS",
      arr: "$3.5M",
      label: "200+ accounts\nper-tx revenue",
    },
  ];

  // Horizontal connector line
  sl.addShape(pres.shapes.RECTANGLE, {
    x: 1.0,
    y: 4.05,
    w: 7.0,
    h: 0.04,
    fill: { color: C.accentDim },
    line: { color: C.accentDim },
  });

  milestones.forEach((m, i) => {
    const cx = 1.0 + i * 2.3;

    sl.addShape(pres.shapes.OVAL, {
      x: cx + 0.87,
      y: 3.96,
      w: 0.22,
      h: 0.22,
      fill: { color: i === 0 ? C.accent : C.bgBlack },
      line: { color: C.accent, width: 1.5 },
    });

    sl.addText(m.year, {
      x: cx,
      y: 3.38,
      w: 2.0,
      h: 0.24,
      fontFace: "Calibri",
      fontSize: 9,
      bold: true,
      color: C.muted,
      align: "center",
      charSpacing: 1,
      margin: 0,
    });

    sl.addText(m.arr, {
      x: cx,
      y: 3.62,
      w: 2.0,
      h: 0.38,
      fontFace: "Calibri",
      fontSize: 20,
      bold: true,
      color: i === 0 ? C.muted : C.accent,
      align: "center",
      margin: 0,
    });

    sl.addText(m.label, {
      x: cx,
      y: 4.22,
      w: 2.0,
      h: 0.52,
      fontFace: "Calibri",
      fontSize: 12,
      color: C.muted,
      align: "center",
      margin: 0,
    });
  });

  // ── Capital Allocation ──
  sl.addText("Capital Allocation", {
    x: 0.5,
    y: 4.76,
    w: 3,
    h: 0.26,
    fontFace: "Calibri",
    fontSize: 18,
    bold: true,
    color: C.muted,
    margin: 0,
  });

  const alloc = [
    {
      label: "Engineering  45%",
      pct: 45,
      desc: "TEE hardening · EU AI Act modules · SSO",
      color: C.accent,
    },
    {
      label: "Sales & GTM  30%",
      pct: 30,
      desc: "Enterprise sales · developer community",
      color: C.barColor2,
    },
    {
      label: "Operations  25%",
      pct: 25,
      desc: "SOC 2 · EU AI Act prep · infra",
      color: C.barColor3,
    },
  ];

  const barTotalW = 3.8;
  const labelW2 = 1.6;
  const barX = 0.5 + labelW2 + 0.12;
  const descX = barX + barTotalW + 0.14;
  const descW = 9.6 - descX - 0.2;

  alloc.forEach((a, i) => {
    const rowY = 5.06 + i * 0.18;
    const barY = rowY + 0.03;

    sl.addText(a.label, {
      x: 0.5,
      y: rowY,
      w: labelW2,
      h: 0.16,
      fontFace: "Calibri",
      fontSize: 12,
      bold: false,
      color: a.color,
      valign: "middle",
      margin: 0,
    });

    sl.addShape(pres.shapes.RECTANGLE, {
      x: barX,
      y: barY,
      w: barTotalW,
      h: 0.1,
      fill: { color: C.barBg },
      line: { color: C.barBg },
    });

    sl.addShape(pres.shapes.RECTANGLE, {
      x: barX,
      y: barY,
      w: barTotalW * (a.pct / 100),
      h: 0.1,
      fill: { color: a.color },
      line: { color: a.color },
    });

    sl.addText(a.desc, {
      x: descX,
      y: rowY,
      w: descW,
      h: 0.16,
      fontFace: "Calibri",
      fontSize: 11,
      color: C.mutedDark,
      valign: "middle",
      margin: 0,
    });
  });
}

// ─── Write ────────────────────────────────────────────────────────────────────
pres
  .writeFile({ fileName: outFile })
  .then(() => console.log(`Done → tutelum_pitch_deck_${theme}.pptx`))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
