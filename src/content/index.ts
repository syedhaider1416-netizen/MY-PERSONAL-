// Single source of truth for all site copy, links, and structured content.
// Edit this file to change anything on the page — no component edits needed.

export const site = {
  name: "Syed Shabih Haider",
  title: "AI Automation & Applied AI Engineer",
  location: "Sialkot, Pakistan",
  locationNote: "Works with clients worldwide, remote.",
  email: "syedhaider1416@gmail.com",
  whatsapp: "+92 314 1616088",
  whatsappHref: "https://wa.me/923141616088",
  linkedin: "https://www.linkedin.com/in/syed-haider-54bb91423/",
  instagram: "https://www.instagram.com/aria.ai0/",
  instagramHandle: "@aria.ai0",
  url: "https://syedshabihhaider.com",
  description:
    "I build the AI system and the AI content that fills it — voice agents, n8n workflows, Claude agents, full apps, and the AI video ads that drive traffic in. One person, whole pipeline.",
};

export const hero = {
  eyebrow: "AI Automation & Applied AI Engineer",
  headline: "I build the system. I build what fills it.",
  sub: "Most people can do the automation or the creative. I do both — the voice agent, the workflow, the app, and the AI video ad that sends people to it. One person, whole pipeline, no agency overhead.",
  ctaPrimary: { label: "Message me on WhatsApp", href: "https://wa.me/923141616088" },
  ctaSecondary: { label: "See the work", href: "#work" },
};

export const proof = [
  "2 live SaaS products",
  "AI voice agents",
  "n8n automation",
  "Claude Skills & agents",
  "AI video & UGC ads",
];

export const stats = [
  { value: 2, suffix: "", label: "Live SaaS products shipped" },
  { value: 5, suffix: "", label: "Capabilities, one pipeline" },
  { value: 24, suffix: "/7", label: "Voice agents answering calls" },
  { value: 1, suffix: "", label: "Person, end to end" },
];

export const services = [
  {
    index: "01",
    id: "voice-agents",
    name: "AI Voice Agents",
    tag: "STT · TTS · Telephony",
    pitch:
      "Answers your calls at 2am, qualifies the lead, and books the appointment straight into your calendar.",
    detail:
      "Inbound and outbound call agents that handle real conversations — not a script tree. They ask the right questions, answer what your prospects actually ask, and hand off cleanly when a human needs to step in.",
  },
  {
    index: "02",
    id: "n8n-automation",
    name: "n8n Automation Systems",
    tag: "CRM sync · Routing · Retries",
    pitch:
      "Leads get routed, followed up, and logged without anyone touching a spreadsheet.",
    detail:
      "CRM sync, lead routing, follow-up sequences, reporting, internal ops — built with real error handling and retries, so a failed step doesn't mean a lost lead.",
  },
  {
    index: "03",
    id: "claude-agents",
    name: "Claude AI Agents & Skills",
    tag: "Agents · Skills · Structured output",
    pitch:
      "An internal assistant that actually knows your business, because it's wired into your real data.",
    detail:
      "Custom Claude agents and Skills, structured output pipelines, internal tools — built on your documents, your CRM, your process, not a generic chatbot wrapper.",
  },
  {
    index: "04",
    id: "web-mobile-saas",
    name: "Web, Mobile & SaaS Builds",
    tag: "Database · Auth · Deployment",
    pitch:
      "A full product — database, login, dashboard, deployed — not a prototype that needs a real developer later.",
    detail:
      "Everything built solo, end to end: schema, backend, auth, UI, deployment. What you get is what ships.",
  },
  {
    index: "05",
    id: "ai-video-ugc",
    name: "AI Video & UGC Ads",
    tag: "Script · Generate · Edit",
    pitch:
      "A ready-to-run ad — hook, script, talent, edit — that drives traffic into whatever we just built.",
    detail:
      "Cinematic AI ads and UGC ads, scripted and produced end to end, delivered in paid-social format. This is the traffic side of the same pipeline.",
  },
];

export const work = [
  {
    id: "chatflow-ai",
    name: "ChatFlow AI",
    kind: "WhatsApp Business Automation Platform (SaaS)",
    description:
      "Shared conversation inbox, contact CRM, chatbot builder, broadcast campaigns, appointment scheduling, automation engine, team roles, notifications, and a full auth stack. Built and deployed solo.",
    href: "https://pretty-chat-flow-pro.base44.app",
    tags: ["SaaS", "WhatsApp API", "Auth", "CRM"],
    featured: true,
  },
  {
    id: "leadgen-pro",
    name: "LeadGen Pro",
    kind: "Business Lead Generation Web App",
    description:
      "Sources and structures business leads into an exportable, sales-ready list. Search, filter, export — built to feed directly into automated n8n outreach.",
    href: "https://leadgenpro-a43p6jjf.manus.space",
    tags: ["Web App", "Lead Gen", "n8n-ready export"],
    featured: false,
  },
];

export const videoReel = {
  title: "AI video & UGC ads",
  description:
    "Ads produced end to end: hook, script, AI talent and voice, edit, captions, delivered in paid-social format. Direct-response structure.",
  items: [
    {
      id: "easy-vitamins",
      title: "Easy Vitamins — Bone Support Formula",
      kind: "UGC Video Ad · 9:16 paid social",
      videoSrc: "/work/easy-vitamins-ugc.mp4",
      poster: "/work/easy-vitamins-poster.jpg",
      orientation: "portrait" as const,
    },
    {
      id: "ai-video-ad-02",
      title: "AI Video Ad — Cinematic Spot",
      kind: "AI Video Ad · 16:9 cinematic",
      videoSrc: "/work/ai-video-ad-02.mp4",
      poster: "",
      orientation: "landscape" as const,
    },
  ],
};

export const process = [
  {
    step: "01",
    name: "Scope",
    detail: "We define exactly what the system needs to do and what counts as done, before anything gets built.",
  },
  {
    step: "02",
    name: "Build",
    detail: "The agent, workflow, or app gets built end to end — no placeholder logic, no “we'll fix that later.”",
  },
  {
    step: "03",
    name: "Integrate",
    detail: "It gets wired into your real calendar, CRM, phone number, or database — not a demo environment.",
  },
  {
    step: "04",
    name: "Handover",
    detail: "You get a working system, walked through clearly, with what you need to run it without me.",
  },
];

export const contact = {
  heading: "Tell me what you're trying to build.",
  sub: "WhatsApp is the fastest way to reach me. Email and LinkedIn work too.",
  whatsapp: { label: "WhatsApp", value: "+92 314 1616088", href: "https://wa.me/923141616088" },
  email: { label: "Email", value: "syedhaider1416@gmail.com", href: "mailto:syedhaider1416@gmail.com" },
  linkedin: { label: "LinkedIn", value: "syed-haider", href: "https://www.linkedin.com/in/syed-haider-54bb91423/" },
  instagram: { label: "Instagram — AI creator channel", value: "@aria.ai0", href: "https://www.instagram.com/aria.ai0/" },
};
