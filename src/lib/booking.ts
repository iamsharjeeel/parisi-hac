export const wellnessLiving = {
  scriptUrl:
    "https://widgets.wellnessliving.com/version/v24.0/lead-capture/inline-loader.js",
  host: process.env.NEXT_PUBLIC_WL_HOST || "presence",
  businessId: process.env.NEXT_PUBLIC_WL_BUSINESS_ID || "375026",
  skinId: process.env.NEXT_PUBLIC_WL_SKIN_ID || "381484",
  locationId: process.env.NEXT_PUBLIC_WL_LOCATION_ID || "265033",
} as const;

export const bookingSuccessPath =
  process.env.NEXT_PUBLIC_BOOKING_SUCCESS_PATH || "/thank-you";
