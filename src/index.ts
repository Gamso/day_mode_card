import "./components/day-mode-card";

// Optional: register card metadata in the picker
(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
  type: "day-mode-card",
  name: "Day Mode Card",
  description: "Regroupe deux input_select (jour & thermostat).",
  preview: true,
});
