export const WL_FORM_THEME_CSS = `
:host, .app-wl-lead-capture-widget, .font-wl {
  --presence-color-primary: 237 28 36;
  --wl-color-primary: 237 28 36 !important;
  --wl-color-text: 212 212 216 !important;
  --wl-color-text-title: 250 250 250 !important;
  --wl-color-background: 17 17 17 !important;
  --wl-color-border: 48 48 48 !important;
  --wl-color-inverse: 0 0 0 !important;
  --wl-button-border-radius: 2px !important;
  color: #d4d4d8;
  font-family: system-ui, sans-serif;
}

.app-lead-capture-wrapper {
  background-color: transparent !important;
  padding: 0 !important;
  border-radius: 0 !important;
  box-shadow: none !important;
}

.app-lead-capture-logo,
.app-wl-branding,
.app-footer,
.app-booking-footer {
  display: none !important;
}

.bg-wl-snow,
input.bg-wl-snow,
.core-form-text-input,
input:not([type="submit"]):not([type="checkbox"]):not([type="radio"]),
textarea {
  background-color: #0a0a0a !important;
  border: 1px solid #2e2e2e !important;
  color: #fafafa !important;
  border-radius: 2px !important;
  min-height: 48px !important;
  padding: 0.7rem 0.85rem !important;
  font-size: 0.95rem !important;
  box-shadow: none !important;
  transition: border-color 160ms ease, box-shadow 160ms ease !important;
}

input::placeholder,
textarea::placeholder {
  color: #71717a !important;
}

input:hover,
textarea:hover {
  border-color: #4a4a4a !important;
}

input:focus,
textarea:focus {
  border-color: #ed1c24 !important;
  outline: none !important;
  box-shadow: 0 0 0 3px rgba(237, 28, 36, 0.18) !important;
}

.bg-wl-background-neutral-subtle,
.bg-wl-background {
  background-color: #0a0a0a !important;
  border-color: #2e2e2e !important;
}

.app-lead-capture-title div,
label,
.app-lead-capture-title {
  color: #a1a1aa !important;
  font-size: 0.72rem !important;
  font-weight: 600 !important;
  letter-spacing: 0.08em !important;
  text-transform: uppercase !important;
}

.text-lead-form-error {
  color: #ed1c24 !important;
  font-size: 0.8rem !important;
}

h1, h2, h3 {
  color: #fafafa !important;
}

p,
.text-wl-charcoal,
.text-wl-steel {
  color: #a1a1aa !important;
}

.core-gcaptcha {
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
  width: 100% !important;
  margin: 1rem 0 0.25rem !important;
  padding: 0.85rem 0.75rem !important;
  background: linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.015)) !important;
  border: 1px solid #2a2a2a !important;
  border-radius: 2px !important;
  overflow: hidden !important;
}

.core-gcaptcha iframe,
.core-gcaptcha > div {
  transform: scale(0.92);
  transform-origin: center center;
}

@media (max-width: 420px) {
  .core-gcaptcha iframe,
  .core-gcaptcha > div {
    transform: scale(0.84);
  }
}

.app-lead-capture-submit,
button[type="submit"] {
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  width: 100% !important;
  min-height: 54px !important;
  margin-top: 1.15rem !important;
  padding: 0.9rem 1.25rem !important;
  background-color: #ed1c24 !important;
  background-image: none !important;
  color: #ffffff !important;
  border: none !important;
  border-radius: 2px !important;
  font-size: 1rem !important;
  font-weight: 700 !important;
  letter-spacing: 0.02em !important;
  text-transform: none !important;
  cursor: pointer !important;
  box-shadow: none !important;
  transition: background-color 160ms ease !important;
}

.app-lead-capture-submit:hover,
button[type="submit"]:hover {
  background-color: #c41218 !important;
}

.app-confirmation-page__title {
  color: #ffffff !important;
}

.app-confirmation-page__message {
  color: #a1a1aa !important;
}
`;
