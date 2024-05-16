export const Allergy = {
  GLUTEN: "Gluten",
  SESAME: "Sesamfrø",
  NUTS: "Nøtter",
  SHELLFISH: "Skalldyr",
  EGG: "Egg",
  FISH: "Fisk",
  MUSTARD: "Sennep",
  MILK: "Melk",
  CELERY: "Selleri",
  PEANUTS: "Peanøtter",
  SOY: "Soya",
  MOLLUSCS: "Bløtdyr",
  LUPINE: "Lupin",
  SULFITES: "Svoveldioksyd/sulfitter",
} as const;

export type AllergyEnum = (typeof Allergy)[keyof typeof Allergy];
