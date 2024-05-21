export const priorityOptions = [
  { label: "4", value: "4", icon: "material-symbols:warning", color: "green" },
  { label: "3", value: "3", icon: "material-symbols:warning", color: "yellow" },
  { label: "2", value: "2", icon: "material-symbols:warning", color: "orange" },
  { label: "1", value: "1", icon: "material-symbols:warning", color: "red" },
];

export const systemOptions = [
  { label: "Projekt 1", key: "bea61e8c-681a-471e-bde8-eb4b422d8bab" },
  { label: "Projekt 2", key: "90f7c6bb-941f-40d7-b9eb-d28771e3ba35" },
  { label: "Projekt 3", key: "adb22331-2647-4fc0-88c2-e8fdee29a431" },
].sort((a, b) => a.label.localeCompare(b.label));
