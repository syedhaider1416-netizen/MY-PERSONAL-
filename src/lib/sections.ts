export const sectionList = [
  { id: "hero", label: "Start", index: "00" },
  { id: "proof", label: "Proof", index: "01" },
  { id: "reel", label: "Reel", index: "02" },
  { id: "services", label: "Services", index: "03" },
  { id: "work", label: "Work", index: "04" },
  { id: "process", label: "Process", index: "05" },
  { id: "contact", label: "Contact", index: "06" },
] as const;

export type SectionId = (typeof sectionList)[number]["id"];
