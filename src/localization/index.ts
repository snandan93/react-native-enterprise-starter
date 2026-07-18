export const translations = {en:{welcome:'Welcome back',tasks:'Tasks',offline:'You are offline'},hi:{welcome:'वापसी पर स्वागत है',tasks:'कार्य',offline:'आप ऑफ़लाइन हैं'}} as const;
export type Locale=keyof typeof translations; export type TranslationKey=keyof typeof translations.en; export const translate=(locale:Locale,key:TranslationKey)=>translations[locale][key];
