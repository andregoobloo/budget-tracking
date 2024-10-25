export const Currencies = [
  { value: "USD", label: "$ USD", locale: "en-US" },
  { value: "EUR", label: "€ EUR", locale: "en-EU" },
  //   { value: "EUR", label: "€ EUR", locale: "de-DE" },
  { value: "GBP", label: "£ GBP", locale: "en-GB" },
];

export type Currency = (typeof Currencies)[0];
