// js/settings.js

export const settings = {
  siteName: "TMT Official",
  version: "1.0.0",
  theme: "dark",
  apiBase: "/api",
  debug: false
};

export function getSetting(key) {
  return settings[key];
}

export function setSetting(key, value) {
  settings[key] = value;
}

export default settings;
