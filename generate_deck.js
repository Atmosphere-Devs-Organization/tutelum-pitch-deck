const pptxgen = require("pptxgenjs");
const path = require("path");
const fs = require("fs");

// ─── Palette ──────────────────────────────────────────────────────────────────
const C = {
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
  muted: "8A9BBE",
  mutedDark: "3D4E66",
  green: "4ADE80",
};

const LOGO = path.resolve(__dirname, "Tutelum_Logo.png");
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
pres.title = "Tutelum — Pre-Seed Pitch Deck";

// ══════════════════════════════════════════════════════════════════════════════
// SLIDE 1 · COVER
// ══════════════════════════════════════════════════════════════════════════════
{
  const sl = pres.addSlide();
  sl.background = { color: C.bgBlack };

  sl.addImage({ path: LOGO, x: 2.75, y: 0.1, w: 4.5, h: 4.5 });

  sl.addText("The Financial Control Layer for Enterprise AI Agents", {
    x: 0.5,
    y: 3.3,
    w: 9,
    h: 0.7,
    fontFace: "Calibri",
    fontSize: 21,
    bold: true,
    color: C.white,
    align: "center",
  });

  sl.addText(
    "Governing every payment  ·  Enforcing every policy  ·  Immutable audit trail",
    {
      x: 0.5,
      y: 4.05,
      w: 9,
      h: 0.38,
      fontFace: "Calibri",
      fontSize: 13,
      color: C.muted,
      align: "center",
    },
  );

  sl.addText("Pre-Seed  ·  2026", {
    x: 0.5,
    y: 4.5,
    w: 9,
    h: 0.3,
    fontFace: "Calibri",
    fontSize: 11,
    color: C.accent,
    align: "center",
  });

  sl.addText("john@tutelum.ai", {
    x: 7.5,
    y: 5.3,
    w: 2.3,
    h: 0.22,
    fontFace: "Calibri",
    fontSize: 9,
    color: C.mutedDark,
    align: "right",
    margin: 0,
  });
}

// ══════════════════════════════════════════════════════════════════════════════
// SLIDE 2 · PROBLEM
// ══════════════════════════════════════════════════════════════════════════════
{
  const sl = pres.addSlide();
  sl.background = { color: C.bg };
  slideNum(sl, 2);

  sl.addText("AI Agents Are Spending Real Money. With Zero Control.", {
    x: 0.5,
    y: 0.2,
    w: 9,
    h: 0.65,
    fontFace: "Calibri",
    fontSize: 27,
    bold: true,
    color: C.white,
    align: "center",
  });

  const problems = [
    {
      title: "No Visibility",
      desc: "VP Engineering can't see what their agent fleet is spending, when, or why.",
    },
    {
      title: "No Policy Enforcement",
      desc: "Any agent can call any API, pay any destination, at any amount. No rules. No limits.",
    },
    {
      title: "Prompt Injection Risk",
      desc: "Agents can be manipulated by malicious content in the web pages or APIs they interact with, redirecting payments without any human ever knowing.",
    },
    {
      title: "No Audit Trail",
      desc: "Finance and Compliance have no cryptographic record of agent transactions.",
    },
  ];

  const xs = [0.4, 5.25];
  const ys = [1.0, 2.95];
  const cW = 4.3,
    cH = 1.75;

  problems.forEach((p, i) => {
    const x = xs[i % 2],
      y = ys[Math.floor(i / 2)];
    card(sl, x, y, cW, cH, { border: "left" });

    sl.addText(p.title, {
      x: x + 0.22,
      y: y + 0.2,
      w: cW - 0.35,
      h: 0.35,
      fontFace: "Calibri",
      fontSize: 15,
      bold: true,
      color: C.white,
      margin: 0,
    });
    sl.addText(p.desc, {
      x: x + 0.22,
      y: y + 0.6,
      w: cW - 0.35,
      h: 1.0,
      fontFace: "Calibri",
      fontSize: 11,
      color: C.muted,
      margin: 0,
    });
  });
}

// ══════════════════════════════════════════════════════════════════════════════
// SLIDE 3 · INCIDENTS  (3 real AI payment failures)
// ══════════════════════════════════════════════════════════════════════════════
{
  const sl = pres.addSlide();
  sl.background = { color: C.bg };
  slideNum(sl, 3);

  sl.addText("Real Incidents. Real Losses. No Controls.", {
    x: 0.5,
    y: 0.18,
    w: 9,
    h: 0.58,
    fontFace: "Calibri",
    fontSize: 27,
    bold: true,
    color: C.white,
    align: "center",
  });

  sl.addText(
    "These aren't hypotheticals — they've already happened across on-chain agents and AI shopping systems.",
    {
      x: 0.75,
      y: 0.8,
      w: 8.5,
      h: 0.38,
      fontFace: "Calibri",
      fontSize: 11.5,
      color: C.muted,
      align: "center",
    },
  );

  const incidents = [
    {
      tag: "ON-CHAIN AGENT  ·  2026",
      title: "Lobstar Wilde",
      amount: "$250K",
      amountLabel: "lost in a single tx",
      color: "EF4444",
      desc:
        'An autonomous AI trading agent misinterpreted a user instruction and sent ~$250K ' +
        "(5% of its entire treasury) to a random user who requested only ~$4 of help. " +
        "The transfer was irreversible and wiped out the agent's on-chain balance.",
      source: "Reported 2026",
    },
    {
      tag: "ON-CHAIN AGENT  ·  NOV 2024",
      title: "Freysa AI",
      amount: "$47K",
      amountLabel: "drained via prompt injection",
      color: C.accentGold,
      desc:
        "Freysa was designed with a single directive: never transfer funds. After 481 failed attempts, " +
        'a user injected a fake "admin terminal" override that tricked the agent into releasing 13.19 ETH ' +
        "from its prize pool — a textbook prompt injection at the payment layer.",
      source: "@jarrodwatts · x.com · Nov 2024",
    },
    {
      tag: "RESEARCH  ·  JAN 2025",
      title: "Google AP2 Vulnerabilities",
      amount: "Critical",
      amountLabel: "weaknesses in AP2",
      color: C.accentPurp,
      desc:
        "Researchers red-teamed Google's Agent Payments Protocol using Branded Whisper and Vault Whisper " +
        "attacks — simple adversarial prompts that reliably subvert agent behavior, manipulate purchase " +
        "decisions, and extract sensitive user data from Gemini-powered shopping agents.",
      source: "arXiv:2601.22569 · Debi & Zhu, 2025",
    },
  ];

  const incCW = 2.9, incCH = 3.95, incY = 1.35;

  incidents.forEach((inc, i) => {
    const x = 0.45 + i * 3.2;

    // Card background
    sl.addShape(pres.shapes.RECTANGLE, {
      x,
      y: incY,
      w: incCW,
      h: incCH,
      fill: { color: C.card },
      line: { color: C.cardBorder, width: 0.75 },
    });
    // Top accent bar
    sl.addShape(pres.shapes.RECTANGLE, {
      x,
      y: incY,
      w: incCW,
      h: 0.05,
      fill: { color: inc.color },
      line: { color: inc.color },
    });

    // Tag
    sl.addText(inc.tag, {
      x: x + 0.15,
      y: incY + 0.14,
      w: incCW - 0.3,
      h: 0.2,
      fontFace: "Calibri",
      fontSize: 7.5,
      bold: true,
      color: inc.color,
      charSpacing: 1,
      margin: 0,
    });

    // Amount
    sl.addText(inc.amount, {
      x: x + 0.1,
      y: incY + 0.4,
      w: incCW - 0.2,
      h: 0.62,
      fontFace: "Calibri",
      fontSize: inc.amount.length > 7 ? 28 : 38,
      bold: true,
      color: inc.color,
      align: "center",
      margin: 0,
    });

    // Amount label
    sl.addText(inc.amountLabel, {
      x: x + 0.1,
      y: incY + 1.04,
      w: incCW - 0.2,
      h: 0.26,
      fontFace: "Calibri",
      fontSize: 9.5,
      color: C.muted,
      align: "center",
      margin: 0,
    });

    // Title
    sl.addText(inc.title, {
      x: x + 0.15,
      y: incY + 1.36,
      w: incCW - 0.3,
      h: 0.32,
      fontFace: "Calibri",
      fontSize: 13,
      bold: true,
      color: C.white,
      margin: 0,
    });

    // Divider
    sl.addShape(pres.shapes.RECTANGLE, {
      x: x + 0.15,
      y: incY + 1.74,
      w: incCW - 0.3,
      h: 0.02,
      fill: { color: C.mutedDark },
      line: { color: C.mutedDark },
    });

    // Description
    sl.addText(inc.desc, {
      x: x + 0.15,
      y: incY + 1.84,
      w: incCW - 0.3,
      h: 1.78,
      fontFace: "Calibri",
      fontSize: 10,
      color: C.muted,
      margin: 0,
    });

    // Source footnote
    sl.addText(`Source: ${inc.source}`, {
      x: x + 0.1,
      y: incY + incCH - 0.26,
      w: incCW - 0.2,
      h: 0.22,
      fontFace: "Calibri",
      fontSize: 7.5,
      color: C.mutedDark,
      align: "center",
      margin: 0,
    });
  });
}

// ══════════════════════════════════════════════════════════════════════════════
// SLIDE 4 · WHY NOW  (moved before Solution — urgency before answer)
// ══════════════════════════════════════════════════════════════════════════════
{
  const sl = pres.addSlide();
  sl.background = { color: C.bg };
  slideNum(sl, 4);

  sl.addText("Three Converging Forces Create an Urgent Window", {
    x: 0.5,
    y: 0.2,
    w: 9,
    h: 0.6,
    fontFace: "Calibri",
    fontSize: 27,
    bold: true,
    color: C.white,
    align: "center",
  });

  const forces = [
    {
      stat: "119",
      suffix: "%",
      label: "Agent Explosion",
      source: "Salesforce State of AI, 2025",
      lines: [
        "Surge in agent creation, H1 2025",
        "Market: $7.92B today",
        "→ $236B by 2034 at 45.8% CAGR",
      ],
    },
    {
      stat: "€35M",
      suffix: "",
      label: "Regulatory Pressure",
      source: "EU AI Act, Official Journal 2024",
      lines: [
        "EU AI Act maximum penalty",
        "Full enforcement: August 2026",
        "Up to 7% of global turnover",
      ],
    },
    {
      stat: "10,780",
      suffix: "%",
      label: "New Payment Rails",
      source: "Coinbase x402 launch data, May 2025",
      lines: [
        "x402 surge in one month (May 2025)",
        "Coinbase launched x402: May 2025",
        "~500K payments in one week, Oct 2025",
      ],
    },
  ];

  forces.forEach((f, i) => {
    const x = 0.45 + i * 3.2,
      y = 1.0;
    const cW = 2.9,
      cH = 4.2;
    card(sl, x, y, cW, cH, { border: "top" });

    // Stat number — split number and suffix to prevent overlap
    const statFontSize = f.stat.length > 5 ? 38 : 46;
    sl.addText(f.stat, {
      x: x + 0.1,
      y: y + 0.18,
      w: cW - 0.2,
      h: 0.7,
      fontFace: "Calibri",
      fontSize: statFontSize,
      bold: true,
      color: C.accent,
      align: "center",
      margin: 0,
    });
    if (f.suffix) {
      sl.addText(f.suffix, {
        x: x + 0.1,
        y: y + 0.82,
        w: cW - 0.2,
        h: 0.32,
        fontFace: "Calibri",
        fontSize: 20,
        bold: true,
        color: C.accent,
        align: "center",
        margin: 0,
      });
    }

    sl.addText(f.label, {
      x: x + 0.1,
      y: y + 1.18,
      w: cW - 0.2,
      h: 0.35,
      fontFace: "Calibri",
      fontSize: 14,
      bold: true,
      color: C.white,
      align: "center",
      margin: 0,
    });

    // Divider
    sl.addShape(pres.shapes.RECTANGLE, {
      x: x + 0.4,
      y: y + 1.6,
      w: cW - 0.8,
      h: 0.02,
      fill: { color: C.mutedDark },
      line: { color: C.mutedDark },
    });

    f.lines.forEach((ln, li) => {
      sl.addText(ln, {
        x: x + 0.15,
        y: y + 1.75 + li * 0.57,
        w: cW - 0.3,
        h: 0.5,
        fontFace: "Calibri",
        fontSize: 11,
        color: C.muted,
        align: "center",
        margin: 0,
      });
    });

    // Source footnote
    sl.addText(`Source: ${f.source}`, {
      x: x + 0.1,
      y: y + 3.85,
      w: cW - 0.2,
      h: 0.22,
      fontFace: "Calibri",
      fontSize: 7.5,
      color: C.mutedDark,
      align: "center",
      margin: 0,
    });
  });
}

// ══════════════════════════════════════════════════════════════════════════════
// SLIDE 4 · PRODUCT  (merged Stakeholder Stack + Architecture into diagram)
// ══════════════════════════════════════════════════════════════════════════════
{
  const sl = pres.addSlide();
  sl.background = { color: C.bg };
  slideNum(sl, 5);

  sl.addText("One Layer. Every Stakeholder. Zero Bypass.", {
    x: 0.5,
    y: 0.12,
    w: 9,
    h: 0.52,
    fontFace: "Calibri",
    fontSize: 27,
    bold: true,
    color: C.white,
  });

  // ── Stakeholder chips (4 across top) ──
  const stakeholders = [
    { role: "DEVELOPERS", detail: "SDK + MCP · Zero rewrites" },
    { role: "VP ENG / CTO", detail: "Policy Engine · Spend limits" },
    { role: "CISO", detail: "Anomaly Detection · TEE" },
    { role: "FINANCE / LEGAL", detail: "Immutable Audit Log · SOC 2" },
  ];

  stakeholders.forEach((s, i) => {
    const x = 0.4 + i * 2.3;
    sl.addShape(pres.shapes.RECTANGLE, {
      x,
      y: 0.75,
      w: 2.12,
      h: 0.68,
      fill: { color: C.cardAlt },
      line: { color: C.cardBorder, width: 0.75 },
    });
    sl.addText(s.role, {
      x: x + 0.1,
      y: 0.8,
      w: 1.92,
      h: 0.22,
      fontFace: "Calibri",
      fontSize: 8,
      bold: true,
      color: C.accent,
      align: "center",
      charSpacing: 1,
      margin: 0,
    });
    sl.addText(s.detail, {
      x: x + 0.1,
      y: 1.02,
      w: 1.92,
      h: 0.32,
      fontFace: "Calibri",
      fontSize: 9,
      color: C.muted,
      align: "center",
      margin: 0,
    });
  });

  // ── Transaction Flow Diagram ──
  const flowY = 1.65;
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
      color: "162040",
      border: C.accentDim,
    },
    {
      label: "TEE Layer",
      sub: "hardware limits\ncrypto-verified",
      color: "14102A",
      border: C.accentPurp,
    },
    {
      label: "Payment Router",
      sub: "x402 · USDC\ncard · ACH",
      color: "162040",
      border: C.accentDim,
    },
    {
      label: "Paid + Logged",
      sub: "signed receipt\nimmutable record",
      color: "0A1A10",
      border: "1A3A22",
    },
  ];

  const nodeW = 1.55,
    nodeH = 1.42,
    gapW = 0.25;
  const totalRowW = nodes.length * nodeW + (nodes.length - 1) * gapW;
  const startX = (W - totalRowW) / 2;

  nodes.forEach((n, i) => {
    const x = startX + i * (nodeW + gapW);

    // Node box
    sl.addShape(pres.shapes.RECTANGLE, {
      x,
      y: flowY,
      w: nodeW,
      h: nodeH,
      fill: { color: n.color },
      line: { color: n.border, width: 1.2 },
    });

    // Top accent line
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
      y: flowY + 0.12,
      w: nodeW - 0.16,
      h: 0.4,
      fontFace: "Calibri",
      fontSize: 11.5,
      bold: true,
      color: C.white,
      align: "center",
      margin: 0,
    });
    sl.addText(n.sub, {
      x: x + 0.08,
      y: flowY + 0.55,
      w: nodeW - 0.16,
      h: 0.8,
      fontFace: "Calibri",
      fontSize: 9.5,
      color: C.muted,
      align: "center",
      margin: 0,
    });

    // Arrow to next node
    if (i < nodes.length - 1) {
      const ax = x + nodeW + 0.02;
      const ay = flowY + nodeH / 2 - 0.02;
      sl.addShape(pres.shapes.RECTANGLE, {
        x: ax,
        y: ay,
        w: gapW - 0.04,
        h: 0.04,
        fill: { color: C.mutedDark },
        line: { color: C.mutedDark },
      });
      // Arrowhead triangle (right-pointing)
      sl.addShape(pres.shapes.RECTANGLE, {
        x: ax + gapW - 0.1,
        y: ay - 0.06,
        w: 0.1,
        h: 0.16,
        fill: { color: C.mutedDark },
        line: { color: C.mutedDark },
        rotate: 45,
      });
    }
  });

  // ── CISO Q&A strip ──
  sl.addShape(pres.shapes.RECTANGLE, {
    x: 0.4,
    y: 3.28,
    w: 9.2,
    h: 0.75,
    fill: { color: C.cardAlt },
    line: { color: "1E3050", width: 0.75 },
  });

  sl.addText(
    [
      {
        text: "CISO: Can an agent spend outside policy if Tutelum's servers are breached?  ",
        options: { color: C.muted },
      },
      { text: "No.", options: { bold: true, color: C.accent } },
      {
        text: "  The hard spend limit is enforced in hardware by Turnkey's secure enclave, cryptographically verifiable and independent of our application layer.",
        options: { color: C.muted },
      },
    ],
    {
      x: 0.6,
      y: 3.28,
      w: 8.9,
      h: 0.75,
      fontFace: "Calibri",
      fontSize: 11,
      valign: "middle",
      margin: 0,
    },
  );

  // ── Bottom detail row ──
  const details = [
    "Spend limits · Velocity caps · Domain allowlists · Time-window rules",
    "Z-score anomaly detection · 30-day behavioral baseline · Zero latency",
    "Cryptographically signed · 12-month retention · CSV / PDF / JSON export",
  ];

  details.forEach((d, i) => {
    sl.addText(d, {
      x: 0.4 + i * 3.2,
      y: 4.18,
      w: 3.0,
      h: 0.4,
      fontFace: "Calibri",
      fontSize: 9.5,
      color: C.mutedDark,
      align: "center",
      margin: 0,
    });
  });
}

// ══════════════════════════════════════════════════════════════════════════════
// SLIDE 5 · TRACTION  (new dedicated slide)
// ══════════════════════════════════════════════════════════════════════════════
{
  const sl = pres.addSlide();
  sl.background = { color: C.bg };
  slideNum(sl, 6);

  sl.addText("Momentum Before Revenue", {
    x: 0.5,
    y: 0.2,
    w: 9,
    h: 0.58,
    fontFace: "Calibri",
    fontSize: 27,
    bold: true,
    color: C.white,
    align: "center",
  });

  sl.addText(
    "Pre-revenue does not mean pre-progress. The product is live, tested, and integrated with the tools engineers already use.",
    {
      x: 0.75,
      y: 0.82,
      w: 8.5,
      h: 0.42,
      fontFace: "Calibri",
      fontSize: 11.5,
      color: C.muted,
      align: "center",
    },
  );

  const traction = [
    {
      stat: "3",
      label: "Integrations Shipped",
      detail:
        "LangChain  ·  AutoGen  ·  MCP\nDrop-in for the most popular agent frameworks",
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
      label: "Production-Ready",
      detail:
        "Built and deployed by a 3-person team\nDemonstrates execution speed and focus",
      color: C.accentTeal,
    },
    {
      stat: "Active",
      label: "Customer Discovery",
      detail: "Ongoing enterprise CISO and\nVP Eng conversations in progress",
      color: C.accentGold,
    },
  ];

  traction.forEach((t, i) => {
    const x = 0.4 + i * 2.35;
    card(sl, x, 1.42, 2.15, 3.8, {
      border: "top",
      color: t.color,
      fill: C.card,
      lineColor: C.cardBorder,
    });

    sl.addText(t.stat, {
      x: x + 0.1,
      y: 1.62,
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
      y: 2.38,
      w: 1.95,
      h: 0.35,
      fontFace: "Calibri",
      fontSize: 12,
      bold: true,
      color: C.white,
      align: "center",
      margin: 0,
    });

    sl.addShape(pres.shapes.RECTANGLE, {
      x: x + 0.3,
      y: 2.8,
      w: 1.55,
      h: 0.02,
      fill: { color: C.mutedDark },
      line: { color: C.mutedDark },
    });

    sl.addText(t.detail, {
      x: x + 0.1,
      y: 2.9,
      w: 1.95,
      h: 1.2,
      fontFace: "Calibri",
      fontSize: 10,
      color: C.muted,
      align: "center",
      margin: 0,
    });
  });

  // Bottom call-to-action strip
  sl.addShape(pres.shapes.RECTANGLE, {
    x: 0.4,
    y: 5.22,
    w: 9.2,
    h: 0.3,
    fill: { color: "0A1A10" },
    line: { color: "1A3A22", width: 0.75 },
  });
  sl.addText(
    "Next milestone: 5 signed pilot agreements · Letters of Intent from enterprise accounts in target verticals",
    {
      x: 0.6,
      y: 5.22,
      w: 8.8,
      h: 0.3,
      fontFace: "Calibri",
      fontSize: 9.5,
      color: C.green,
      align: "center",
      valign: "middle",
      margin: 0,
    },
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// SLIDE 6 · BUSINESS MODEL  (split — pricing + unit economics only)
// ══════════════════════════════════════════════════════════════════════════════
{
  const sl = pres.addSlide();
  sl.background = { color: C.bg };
  slideNum(sl, 7);

  sl.addText("Usage-Based SaaS + Platform Fees", {
    x: 0.5,
    y: 0.18,
    w: 9,
    h: 0.55,
    fontFace: "Calibri",
    fontSize: 27,
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
      y = 0.85;
    const cW = 2.95,
      cH = 2.55;

    card(sl, x, y, cW, cH, {
      border: "top",
      color: plan.highlight ? C.accent : C.accentDim,
      fill: plan.highlight ? "162040" : C.card,
      lineColor: plan.highlight ? C.accentDim : C.cardBorder,
    });

    sl.addText(plan.name, {
      x: x + 0.15,
      y: y + 0.15,
      w: cW - 0.3,
      h: 0.32,
      fontFace: "Calibri",
      fontSize: 14,
      bold: true,
      color: plan.highlight ? C.accent : C.white,
      margin: 0,
    });

    sl.addText(plan.price, {
      x: x + 0.15,
      y: y + 0.5,
      w: cW - 0.3,
      h: 0.32,
      fontFace: "Calibri",
      fontSize: 11,
      bold: true,
      color: plan.highlight ? C.white : C.muted,
      margin: 0,
    });

    sl.addShape(pres.shapes.RECTANGLE, {
      x: x + 0.15,
      y: y + 0.87,
      w: cW - 0.3,
      h: 0.02,
      fill: { color: "1E2A40" },
      line: { color: "1E2A40" },
    });

    plan.features.forEach((f, fi) => {
      dot(
        sl,
        x + 0.18,
        y + 1.05 + fi * 0.36 + 0.09,
        plan.highlight ? C.accent : C.mutedDark,
      );
      sl.addText(f, {
        x: x + 0.35,
        y: y + 1.03 + fi * 0.36,
        w: cW - 0.52,
        h: 0.32,
        fontFace: "Calibri",
        fontSize: 10,
        color: plan.highlight ? C.white : C.muted,
        valign: "middle",
        margin: 0,
      });
    });
  });

  // Unit economics callout box
  sl.addShape(pres.shapes.RECTANGLE, {
    x: 0.4,
    y: 3.58,
    w: 9.2,
    h: 1.82,
    fill: { color: "0D1628" },
    line: { color: C.accentDim, width: 0.75 },
  });

  sl.addShape(pres.shapes.RECTANGLE, {
    x: 0.4,
    y: 3.58,
    w: 0.05,
    h: 1.82,
    fill: { color: C.accent },
    line: { color: C.accent },
  });

  sl.addText("Unit Economics", {
    x: 0.65,
    y: 3.65,
    w: 8.7,
    h: 0.3,
    fontFace: "Calibri",
    fontSize: 11,
    bold: true,
    color: C.accent,
    margin: 0,
  });

  sl.addText(
    "Growth plan $999/mo = $12K ACV  ·  Enterprise plan ~$40K–$80K ACV\n" +
      "Year 1 target: 15 enterprise + 25 growth accounts = ~$800K ARR  ·  " +
      "Usage expansion: revenue scales automatically as agent fleets grow",
    {
      x: 0.65,
      y: 4.0,
      w: 8.7,
      h: 1.3,
      fontFace: "Calibri",
      fontSize: 11.5,
      color: C.muted,
      margin: 0,
    },
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// SLIDE 7 · GO-TO-MARKET  (split from old slide 9)
// ══════════════════════════════════════════════════════════════════════════════
{
  const sl = pres.addSlide();
  sl.background = { color: C.bg };
  slideNum(sl, 8);

  sl.addText("Three-Motion GTM Strategy", {
    x: 0.5,
    y: 0.2,
    w: 9,
    h: 0.55,
    fontFace: "Calibri",
    fontSize: 27,
    bold: true,
    color: C.white,
  });

  sl.addText(
    "Developer-led adoption creates the land; compliance pressure closes the enterprise deal; usage expansion drives NRR.",
    {
      x: 0.75,
      y: 0.8,
      w: 8.5,
      h: 0.42,
      fontFace: "Calibri",
      fontSize: 11.5,
      color: C.muted,
      align: "center",
    },
  );

  const gtm = [
    {
      number: "①",
      title: "SDK-Led (Bottom-Up)",
      detail:
        "Free tier and open MCP integration drive individual developer adoption. Developers bring Tutelum into their team's agent stack. Bottom-up enterprise land with zero cold sales needed for early accounts.",
      color: C.accent,
    },
    {
      number: "②",
      title: "Compliance Pull (Top-Down)",
      detail:
        "EU AI Act enforcement (August 2026) creates a mandatory procurement trigger for enterprise legal and CISO teams. CISOs are already asking vendors about agent financial controls — Tutelum is the answer.",
      color: C.accentTeal,
    },
    {
      number: "③",
      title: "Usage Expansion (Built-In NRR)",
      detail:
        "Revenue scales with agent fleet size, no enterprise renewal negotiation needed. Every new agent an existing customer deploys generates incremental per-transaction and per-seat revenue automatically.",
      color: C.accentGold,
    },
  ];

  gtm.forEach((g, i) => {
    const x = 0.4 + i * 3.2,
      y = 1.42;
    card(sl, x, y, 2.95, 3.7, { border: "top", color: g.color, fill: C.card });

    sl.addText(g.number, {
      x: x + 0.15,
      y: y + 0.18,
      w: 0.5,
      h: 0.5,
      fontFace: "Calibri",
      fontSize: 26,
      bold: true,
      color: g.color,
      margin: 0,
    });

    sl.addText(g.title, {
      x: x + 0.15,
      y: y + 0.72,
      w: 2.65,
      h: 0.45,
      fontFace: "Calibri",
      fontSize: 13,
      bold: true,
      color: C.white,
      margin: 0,
    });

    sl.addShape(pres.shapes.RECTANGLE, {
      x: x + 0.15,
      y: y + 1.22,
      w: 2.65,
      h: 0.02,
      fill: { color: C.mutedDark },
      line: { color: C.mutedDark },
    });

    sl.addText(g.detail, {
      x: x + 0.15,
      y: y + 1.32,
      w: 2.65,
      h: 2.2,
      fontFace: "Calibri",
      fontSize: 11,
      color: C.muted,
      margin: 0,
    });
  });

  // Sales motion timeline
  sl.addText(
    [
      { text: "Sales Motion:  ", options: { bold: true, color: C.accent } },
      { text: "Developer tries free tier  →  ", options: { color: C.muted } },
      { text: "Team adopts (Growth plan)  →  ", options: { color: C.muted } },
      {
        text: "CISO/Legal requires compliance package  →  ",
        options: { color: C.muted },
      },
      { text: "Enterprise contract", options: { bold: true, color: C.white } },
    ],
    {
      x: 0.5,
      y: 5.28,
      w: 9.2,
      h: 0.28,
      fontFace: "Calibri",
      fontSize: 9.5,
      margin: 0,
    },
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// SLIDE 8 · MARKET SIZE  (with bottom-up TAM + source citations)
// ══════════════════════════════════════════════════════════════════════════════
{
  const sl = pres.addSlide();
  sl.background = { color: C.bg };
  slideNum(sl, 9);

  sl.addText("A $251B Market With No Governance Layer", {
    x: 0.5,
    y: 0.2,
    w: 9,
    h: 0.6,
    fontFace: "Calibri",
    fontSize: 27,
    bold: true,
    color: C.white,
    align: "center",
  });

  const markets = [
    {
      label: "TAM",
      value: "$251B",
      sub: "Global AI Agents market by 2034",
      note: "45.8% CAGR · Grand View Research",
      highlight: true,
    },
    {
      label: "SAM",
      value: "$18B",
      sub: "Enterprise agentic AI with financial capability",
      note: "Est. 2026 · internal model",
      highlight: false,
    },
    {
      label: "SOM",
      value: "$850M",
      sub: "Reachable via dev-led enterprise sales (3 yrs)",
      note: "0.3% SAM · 40 accts Y1",
      highlight: false,
    },
  ];

  markets.forEach((m, i) => {
    const x = 0.5 + i * 3.1;
    card(sl, x, 0.92, 2.85, 2.2, {
      border: "top",
      color: m.highlight ? C.accent : C.accentDim,
      fill: m.highlight ? "162040" : C.card,
      lineColor: m.highlight ? C.accentDim : C.cardBorder,
    });

    sl.addText(m.label, {
      x: x + 0.15,
      y: 1.1,
      w: 2.55,
      h: 0.28,
      fontFace: "Calibri",
      fontSize: 11,
      bold: true,
      color: C.accent,
      charSpacing: 3,
      margin: 0,
    });

    sl.addText(m.value, {
      x: x + 0.1,
      y: 1.38,
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
      y: 2.14,
      w: 2.65,
      h: 0.45,
      fontFace: "Calibri",
      fontSize: 9.5,
      color: C.muted,
      align: "center",
      margin: 0,
    });

    sl.addText(m.note, {
      x: x + 0.1,
      y: 2.64,
      w: 2.65,
      h: 0.25,
      fontFace: "Calibri",
      fontSize: 8.5,
      color: C.accentDim,
      align: "center",
      margin: 0,
    });
  });

  // Bottom-up TAM card
  sl.addShape(pres.shapes.RECTANGLE, {
    x: 0.4,
    y: 3.08,
    w: 9.2,
    h: 1.1,
    fill: { color: "0D1628" },
    line: { color: C.accentDim, width: 0.75 },
  });
  sl.addShape(pres.shapes.RECTANGLE, {
    x: 0.4,
    y: 3.08,
    w: 0.05,
    h: 1.1,
    fill: { color: C.accent },
    line: { color: C.accent },
  });

  sl.addText("Bottom-Up Validation", {
    x: 0.65,
    y: 3.13,
    w: 3,
    h: 0.28,
    fontFace: "Calibri",
    fontSize: 10,
    bold: true,
    color: C.accent,
    margin: 0,
  });
  sl.addText(
    "~400K AI agents with purchasing power today  ·  Enterprise orgs average 200 agents/fleet  ·  " +
      "Governance tooling runs $20K–$80K/yr per fleet  →  Near-term SAM: $6B–$20B  ·  " +
      "At 0.3% capture with 40 enterprise accounts in Year 1: $800K ARR",
    {
      x: 0.65,
      y: 3.44,
      w: 8.8,
      h: 0.68,
      fontFace: "Calibri",
      fontSize: 11,
      color: C.muted,
      margin: 0,
    },
  );

  // Stat chips
  const stats = [
    {
      val: "400K+",
      label: "AI agents with\npurchasing power today",
      source: "Coinbase, 2025",
    },
    {
      val: "140M",
      label: "agent payments in\n9 months (2025)",
      source: "x402 Foundation, 2025",
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
      y: 4.3,
      w: 2.17,
      h: 1.18,
      fill: { color: C.cardAlt },
      line: { color: "1E3050", width: 0.75 },
    });
    sl.addText(s.val, {
      x: x + 0.08,
      y: 4.35,
      w: 2.01,
      h: 0.38,
      fontFace: "Calibri",
      fontSize: 20,
      bold: true,
      color: C.accent,
      align: "center",
      margin: 0,
    });
    sl.addText(s.label, {
      x: x + 0.08,
      y: 4.72,
      w: 2.01,
      h: 0.44,
      fontFace: "Calibri",
      fontSize: 9.5,
      color: C.muted,
      align: "center",
      margin: 0,
    });
    sl.addText(`Source: ${s.source}`, {
      x: x + 0.08,
      y: 5.16,
      w: 2.01,
      h: 0.22,
      fontFace: "Calibri",
      fontSize: 7.5,
      color: C.mutedDark,
      align: "center",
      margin: 0,
    });
  });
}

// ══════════════════════════════════════════════════════════════════════════════
// SLIDE 9 · COMPETITION  (capability matrix — Tutelum vs 5 competitors)
// ══════════════════════════════════════════════════════════════════════════════
{
  const sl = pres.addSlide();
  sl.background = { color: C.bg };
  slideNum(sl, 10);

  // ── Headline ──
  sl.addText("Every Alternative Enables Spending. None Enforce Governance.", {
    x: 0.2,
    y: 0.1,
    w: 9.6,
    h: 0.44,
    fontFace: "Calibri",
    fontSize: 23,
    bold: true,
    color: C.white,
    align: "center",
  });

  // ── Table layout ──
  const startX = 0.18;
  const startY = 0.63;
  const labelW = 2.28; // capability label column
  const numCols = 6; // competitors
  const colW = (W - startX * 2 - labelW) / numCols; // ≈ 1.223"
  const headerH = 0.54;
  const rowH = 0.56;

  const competitors = [
    "Tutelum",
    "Skyfire",
    "Payman AI",
    "AnChain.AI",
    "MC Agent Pay",
    "Ramp / Brex",
  ];

  // Each capability: [label, ...values per competitor (0=Tutelum … 5=Ramp)]
  // Values: "Y" = ✅  "N" = ❌  "P" = ⚠️
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
    { label: "x402 / Crypto-Native", vals: ["Y", "Y", "P", "N", "N", "N"] },
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
  const SYM_COLOR = { Y: C.green, N: "EF4444", P: C.accentGold };

  // ── Column highlight background for Tutelum (drawn first, behind cells) ──
  const tutelumX = startX + labelW;
  const tableH = headerH + capabilities.length * rowH;

  // Glow / highlight fill behind entire Tutelum column
  sl.addShape(pres.shapes.RECTANGLE, {
    x: tutelumX,
    y: startY,
    w: colW,
    h: tableH,
    fill: { color: "0E2244" },
    line: { color: C.accent, width: 1.5 },
  });
  // Top accent bar on Tutelum column
  sl.addShape(pres.shapes.RECTANGLE, {
    x: tutelumX,
    y: startY,
    w: colW,
    h: 0.06,
    fill: { color: C.accent },
    line: { color: C.accent },
  });

  // ── Header row ──
  // Label corner cell
  sl.addShape(pres.shapes.RECTANGLE, {
    x: startX,
    y: startY,
    w: labelW,
    h: headerH,
    fill: { color: C.cardAlt },
    line: { color: "1A2840", width: 0.75 },
  });

  competitors.forEach((name, ci) => {
    const cx = startX + labelW + ci * colW;
    const isTutelum = ci === 0;

    sl.addShape(pres.shapes.RECTANGLE, {
      x: cx,
      y: startY,
      w: colW,
      h: headerH,
      fill: { color: isTutelum ? "0E2244" : C.cardAlt },
      line: {
        color: isTutelum ? C.accent : "1A2840",
        width: isTutelum ? 1.5 : 0.75,
      },
    });

    sl.addText(name, {
      x: cx + 0.04,
      y: startY,
      w: colW - 0.08,
      h: headerH,
      fontFace: "Calibri",
      fontSize: isTutelum ? 11 : 9.5,
      bold: isTutelum,
      italic: false,
      color: isTutelum ? C.accent : C.muted,
      align: "center",
      valign: "middle",
      margin: 0,
    });
  });

  // ── Data rows ──
  capabilities.forEach((cap, ri) => {
    const ry = startY + headerH + ri * rowH;
    const isEven = ri % 2 === 0;
    const rowBg = isEven ? C.card : "141C2E";

    // Label cell
    sl.addShape(pres.shapes.RECTANGLE, {
      x: startX,
      y: ry,
      w: labelW,
      h: rowH,
      fill: { color: rowBg },
      line: { color: "1A2840", width: 0.75 },
    });
    sl.addText(cap.label, {
      x: startX + 0.14,
      y: ry,
      w: labelW - 0.18,
      h: rowH,
      fontFace: "Calibri",
      fontSize: 10,
      color: C.white,
      valign: "middle",
      margin: 0,
    });

    // Competitor cells
    cap.vals.forEach((val, ci) => {
      const cx = startX + labelW + ci * colW;
      const isTutelum = ci === 0;

      sl.addShape(pres.shapes.RECTANGLE, {
        x: cx,
        y: ry,
        w: colW,
        h: rowH,
        fill: { color: isTutelum ? "0E2244" : rowBg },
        line: {
          color: isTutelum ? C.accent : "1A2840",
          width: isTutelum ? 1.5 : 0.75,
        },
      });

      sl.addText(SYM[val], {
        x: cx + 0.04,
        y: ry,
        w: colW - 0.08,
        h: rowH,
        fontFace: "Calibri",
        fontSize: isTutelum ? 17 : 15,
        color: SYM_COLOR[val],
        align: "center",
        valign: "middle",
        margin: 0,
      });
    });
  });

  // ── Sub-headline below table ──
  const tableBottom = startY + headerH + capabilities.length * rowH;

  sl.addText(
    "Tutelum is the only layer with hardware-attested policy enforcement built natively for the agentic payment stack.",
    {
      x: 0.2,
      y: tableBottom + 0.1,
      w: 9.6,
      h: 0.36,
      fontFace: "Calibri",
      fontSize: 10.5,
      italic: true,
      color: C.muted,
      align: "center",
      margin: 0,
    },
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// SLIDE 10 · TEAM  (roles + real photos with fallback + reframed experience)
// ══════════════════════════════════════════════════════════════════════════════
{
  const sl = pres.addSlide();
  sl.background = { color: C.bg };
  slideNum(sl, 11);

  sl.addText("Built by Engineers Who've Lived the Problem", {
    x: 0.5,
    y: 0.2,
    w: 9,
    h: 0.55,
    fontFace: "Calibri",
    fontSize: 27,
    bold: true,
    color: C.white,
  });

  const team = [
    {
      name: "John Chambard",
      role: "CEO  ·  Co-Founder",
      initial: "J",
      photo: path.resolve(__dirname, "John.png"),
      avatarColor: "1E3A6E",
      bg: [
        "Comp Sci @ Purdue",
        "Enterprise IT Infrastructure @ Phillips66",
        "SWE @ NETSYNC",
      ],
    },
    {
      name: "Sri Harsha Potta",
      role: "CTO  ·  Co-Founder",
      initial: "S",
      photo: path.resolve(__dirname, "sri.jpeg"),
      avatarColor: "0D3D3A",
      bg: [
        "Comp Sci @ UT Austin",
        "Cloud Infrastructure @ HPE",
        "SWE @ NETSYNC",
      ],
    },
    {
      name: "Amar Nangia",
      role: "CRO  ·  Co-Founder",
      initial: "A",
      photo: path.resolve(__dirname, "Amar.png"),
      avatarColor: "2D1E5E",
      bg: ["Comp Sci @ Georgia Tech", "Tools @ LinkedIn", "SWE @ NETSYNC"],
    },
  ];

  const cW = 2.8,
    cH = 2.85;

  team.forEach((member, i) => {
    const x = 0.4 + i * 3.1,
      y = 0.9;
    card(sl, x, y, cW, cH, { border: "top" });

    // Photo or fallback avatar
    const photoSize = 0.88;
    const avatarX = x + (cW - photoSize) / 2;
    const avatarY = y + 0.2;

    if (fs.existsSync(member.photo)) {
      sl.addImage({
        path: member.photo,
        x: avatarX,
        y: avatarY,
        w: photoSize,
        h: photoSize,
      });
    } else {
      // Fallback: gradient circle with initial
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
      y: y + 1.18,
      w: cW - 0.2,
      h: 0.32,
      fontFace: "Calibri",
      fontSize: 12.5,
      bold: true,
      color: C.white,
      align: "center",
      margin: 0,
    });

    sl.addText(member.role, {
      x: x + 0.1,
      y: y + 1.52,
      w: cW - 0.2,
      h: 0.24,
      fontFace: "Calibri",
      fontSize: 9.5,
      bold: true,
      color: C.accent,
      align: "center",
      margin: 0,
    });

    member.bg.forEach((b, bi) => {
      sl.addText(b, {
        x: x + 0.1,
        y: y + 1.82 + bi * 0.26,
        w: cW - 0.2,
        h: 0.24,
        fontFace: "Calibri",
        fontSize: 9.5,
        color: C.muted,
        align: "center",
        margin: 0,
      });
    });
  });

  // Shared backstory
  sl.addShape(pres.shapes.RECTANGLE, {
    x: 0.4,
    y: 3.9,
    w: 9.2,
    h: 1.1,
    fill: { color: C.cardAlt },
    line: { color: "1E3050", width: 0.75 },
  });

  sl.addText(
    "John, Sri, and Amar met freshman year of high school and have been building together for over six years, " +
      "competing on the same hackathon and UIL competitive programming teams, shipping a school app that reached " +
      "thousands of users, and interning together at NETSYNC. They started Tutelum after working on agent systems " +
      "and seeing firsthand how easy it was to give agents powerful API access with almost no financial safeguards.",
    {
      x: 0.65,
      y: 3.95,
      w: 8.7,
      h: 1.0,
      fontFace: "Calibri",
      fontSize: 11.5,
      color: C.muted,
      valign: "middle",
      margin: 0,
    },
  );

  // Advisor placeholder
  sl.addText(
    [
      { text: "Advisors: ", options: { bold: true, color: C.accent } },
      {
        text: "Seeking 1–2 advisors with enterprise security / fintech AI experience  ·  Introductions welcome",
        options: { color: C.mutedDark },
      },
    ],
    {
      x: 0.5,
      y: 5.13,
      w: 9.2,
      h: 0.35,
      fontFace: "Calibri",
      fontSize: 9.5,
      margin: 0,
    },
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// SLIDE 11 · THE ASK  (accelerator framing, explicit $150K–$500K)
// ══════════════════════════════════════════════════════════════════════════════
{
  const sl = pres.addSlide();
  sl.background = { color: C.bgBlack };

  // ── Header block ──
  // $150K–$500K  (y: 0.12 → 0.82)
  sl.addText("$150K – $500K", {
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

  // Pre-Seed tag line  (y: 0.86 → 1.16)
  sl.addText("Pre-Seed  ·  Accelerator Round  ·  SAFE", {
    x: 0.5,
    y: 0.86,
    w: 9,
    h: 0.3,
    fontFace: "Calibri",
    fontSize: 14,
    bold: true,
    color: C.white,
    align: "center",
  });

  // Runway context  (y: 1.18 → 1.44)
  sl.addText(
    "12–18 months of runway  ·  Path to first enterprise contracts  ·  EU AI Act compliance launch",
    {
      x: 0.5,
      y: 1.18,
      w: 9,
      h: 0.26,
      fontFace: "Calibri",
      fontSize: 10.5,
      color: C.muted,
      align: "center",
    },
  );

  // ── What we're looking for — 3 compact cards  (y: 1.52 → 2.72) ──
  const asks = [
    {
      title: "Capital",
      color: C.accent,
      detail:
        "Pre-seed SAFE to fund 12–18 months of engineering, early sales, and SOC 2 certification",
    },
    {
      title: "Mentorship & Network",
      color: C.accentTeal,
      detail:
        "Intros to enterprise CISO / VP Eng prospects · EU regulatory advisors · dev community",
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
      y = 1.52;
    card(sl, x, y, 2.95, 1.2, {
      border: "top",
      color: a.color,
      fill: "0D1628",
      lineColor: C.accentDim,
    });
    sl.addText(a.title, {
      x: x + 0.15,
      y: y + 0.14,
      w: 2.65,
      h: 0.3,
      fontFace: "Calibri",
      fontSize: 12,
      bold: true,
      color: C.white,
      margin: 0,
    });
    sl.addText(a.detail, {
      x: x + 0.15,
      y: y + 0.48,
      w: 2.65,
      h: 0.66,
      fontFace: "Calibri",
      fontSize: 9.5,
      color: C.muted,
      margin: 0,
    });
  });
  // cards end at y = 1.52 + 1.2 = 2.72

  // ── ARR Timeline  (y: 2.88 → 4.10) ──
  const milestones = [
    {
      year: "NOW",
      arr: "$0",
      label: "Accelerator raise\nProduct live · seeking pilots",
    },
    {
      year: "YEAR 1",
      arr: "$800K",
      label: "40 enterprise accounts\n3,000+ agents governed",
    },
    { year: "YEAR 2", arr: "$3.5M", label: "EU market launch\n200+ accounts" },
    {
      year: "YEAR 3",
      arr: "$10M+",
      label: "1,000+ accounts\nper-tx revenue at scale",
    },
  ];

  // Horizontal connector line at y = 3.58
  sl.addShape(pres.shapes.RECTANGLE, {
    x: 1.0,
    y: 3.58,
    w: 7.0,
    h: 0.04,
    fill: { color: C.accentDim },
    line: { color: C.accentDim },
  });

  milestones.forEach((m, i) => {
    const cx = 1.0 + i * 2.3;

    // Dot centred on connector line
    sl.addShape(pres.shapes.OVAL, {
      x: cx + 0.87,
      y: 3.49,
      w: 0.22,
      h: 0.22,
      fill: { color: i === 0 ? C.accent : C.bgBlack },
      line: { color: C.accent, width: 1.5 },
    });

    // Year label — top of timeline block
    sl.addText(m.year, {
      x: cx,
      y: 2.9,
      w: 2.0,
      h: 0.24,
      fontFace: "Calibri",
      fontSize: 8.5,
      bold: true,
      color: C.muted,
      align: "center",
      charSpacing: 2,
      margin: 0,
    });

    // ARR value — clearly above line with breathing room
    sl.addText(m.arr, {
      x: cx,
      y: 3.16,
      w: 2.0,
      h: 0.34,
      fontFace: "Calibri",
      fontSize: 18,
      bold: true,
      color: i === 0 ? C.muted : C.accent,
      align: "center",
      margin: 0,
    });
    // ARR ends at 3.50 — line starts at 3.58 ✓ (8pt gap)

    // Label below line
    sl.addText(m.label, {
      x: cx,
      y: 3.78,
      w: 2.0,
      h: 0.52,
      fontFace: "Calibri",
      fontSize: 8.5,
      color: C.muted,
      align: "center",
      margin: 0,
    });
  });
  // timeline ends at y ≈ 4.30

  // ── Capital Allocation — bars + descriptions  (y: 4.44 → 5.52) ──
  sl.addText("Capital Allocation", {
    x: 0.5,
    y: 4.38,
    w: 3,
    h: 0.24,
    fontFace: "Calibri",
    fontSize: 9.5,
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
      color: "7CB4F8",
    },
    {
      label: "Operations  25%",
      pct: 25,
      desc: "SOC 2 · EU AI Act prep · infra",
      color: "4A7ACC",
    },
  ];

  // Bar width 5.5" leaves 3.0" for descriptions on the right
  const barTotalW = 5.5;
  const barX = 0.5;
  const descX = barX + barTotalW + 0.18;
  const descW = 9.0 - descX - 0.2;

  alloc.forEach((a, i) => {
    const y = 4.68 + i * 0.32;

    // Background bar
    sl.addShape(pres.shapes.RECTANGLE, {
      x: barX,
      y,
      w: barTotalW,
      h: 0.24,
      fill: { color: "111827" },
      line: { color: "111827" },
    });

    // Filled bar
    sl.addShape(pres.shapes.RECTANGLE, {
      x: barX,
      y,
      w: barTotalW * (a.pct / 100),
      h: 0.24,
      fill: { color: a.color },
      line: { color: a.color },
    });

    // Label on bar
    sl.addText(a.label, {
      x: barX + 0.1,
      y: y + 0.02,
      w: 3.0,
      h: 0.2,
      fontFace: "Calibri",
      fontSize: 9,
      bold: true,
      color: C.white,
      valign: "middle",
      margin: 0,
    });

    // Description to the right — now has 3" of space
    sl.addText(a.desc, {
      x: descX,
      y,
      w: descW,
      h: 0.24,
      fontFace: "Calibri",
      fontSize: 9,
      color: C.mutedDark,
      valign: "middle",
      margin: 0,
    });
  });
}

// ─── Write ────────────────────────────────────────────────────────────────────
pres
  .writeFile({ fileName: path.resolve(__dirname, "tutelum_pitch_deck.pptx") })
  .then(() => console.log("Done → tutelum_pitch_deck.pptx"))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
