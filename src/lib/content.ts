export const site = {
  name: "Parisi Speed School Horsham",
  // [RESOLVE: decided 215-262-2935 from ad creatives; replaces 267-266-3430]
  phoneDisplay: "215-262-2935",
  phoneTel: "+12152622935",
  addressLine1: "400 Horsham Road",
  addressLine2: "Horsham, PA 19044",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=400+Horsham+Road%2C+Horsham%2C+PA+19044",
} as const;

export const ctaLabel = "Request the evaluation";

export const hero = {
  eyebrow: "Free 60-minute evaluation · Ages 5 to 18 · Horsham, PA",
  h1Lines: ["Know", "your", "starting point"] as const,
  sub: "Sixty minutes of testing at Parisi Speed School Horsham. Speed, power and movement, measured by a coach, with every number explained before your athlete leaves the floor.",
  ghost: "See what's tested",
  micro: "Free. No card. No membership.",
} as const;

export const credentialsBar = {
  label: "Parisi system · Local Horsham coaching",
} as const;

export const credentials = {
  // [VERIFY] franchise-level claim
  years: {
    value: "25+",
    label: "Years",
    note: "Across the Parisi system",
  },
  // [VERIFY] franchise-level claim
  athletes: {
    value: "650,000+",
    label: "Athletes trained",
    note: "Across the Parisi system",
  },
  ages: {
    value: "5 to 18",
    label: "Ages",
    note: "Youth athlete development",
  },
  location: {
    value: "Horsham",
    label: "Location",
    note: "Coaching and evaluation",
  },
} as const;

export const baseline = {
  kicker: "01 / 05",
  heading: "Stop guessing",
  body: [
    "Every athlete develops on their own timeline. Two twelve-year-olds on the same team can need completely different work, and there is no way to tell which is which by watching a game.",
    "The evaluation gives a coach an objective read on how your athlete accelerates, how much force they produce, and how well they move under control. Training decisions come after that.",
  ] as const,
  columns: [
    {
      title: "Speed and running",
      copy: "Acceleration, sprint mechanics and the 10-yard dash, on the clock.",
    },
    {
      title: "Power and strength",
      copy: "Vertical jump and strength testing. How much force, and how quickly.",
    },
    {
      title: "Mobility and movement",
      copy: "Agility, balance and control, assessed through Parisi's dynamic warm-up.",
    },
  ] as const,
} as const;

export const sixtyMinutes = {
  kicker: "02 / 05",
  heading: "Sixty minutes, three parts",
  intro:
    "Every athlete runs the same protocol. A nine-year-old trying a sport for the first time and a senior chasing a roster spot get tested the same way.",
  steps: [
    {
      number: "STEP 01",
      title: "Assess",
      copy: "Your athlete works through Parisi's structured warm-up and running analysis.",
    },
    {
      number: "STEP 02",
      title: "Measure",
      copy: "Coaches test speed, power, strength and movement quality.",
    },
    {
      number: "STEP 03",
      title: "Review",
      copy: "You and your athlete sit with the coach and go through every result.",
    },
  ] as const,
  micro: "No cost. Sixty minutes. 400 Horsham Road.",
} as const;

export const direction = {
  kicker: "03 / 05",
  heading: "Give their effort a direction",
  body: "Young athletes already put the work in. Practices, games, tournaments most weekends. What the evaluation adds is a read on where that effort would pay off fastest.",
  items: [
    {
      title: "Speed",
      copy: "Better acceleration mechanics and a more efficient stride.",
    },
    {
      title: "Strength",
      copy: "The physical base that movement and performance sit on.",
    },
    {
      title: "Movement",
      copy: "Control, mobility and how the athlete moves inside their sport.",
    },
    {
      title: "Confidence",
      copy: "Clear goals, measurable progress, and coaching that tracks both.",
    },
  ] as const,
} as const;

export const whyParisi = {
  kicker: "04 / 05",
  heading: "A system behind the training",
  // [VERIFY: confirm the exact figure with the franchise before this line ships.]
  body: "Parisi has spent more than two decades building a method for developing young athletes.",
  local:
    "At Horsham the evaluation comes first, and that order is deliberate. A coach should understand how an athlete moves before deciding how that athlete trains.",
} as const;

export const faq = {
  kicker: "05 / 05",
  heading: "Questions parents ask first",
  items: [
    {
      question: "Is the evaluation actually free?",
      answer: "Yes. No card, no deposit, no membership.",
    },
    {
      question: "How long does it take?",
      answer:
        "Sixty minutes of testing. Add a few minutes at the front desk when you arrive.",
    },
    {
      question: "Does my athlete need training experience?",
      answer: "No. A first-timer and a varsity starter run the same testing.",
    },
    {
      question: "What should they bring?",
      answer: "Athletic clothes, trainers and water.",
    },
    {
      question: "Do parents stay?",
      answer: "Yes. You watch the testing and you sit in on the review at the end.",
    },
    {
      question: "Will I get a sales pitch?",
      answer:
        "A coach will tell you what the numbers show and which program would suit your athlete. You leave with the results either way.",
    },
    {
      question: "Where is it and where do I park?",
      answer:
        "400 Horsham Road, Horsham, PA 19044. Free parking on site, and the training floor is straight through the main entrance.",
    },
  ] as const,
} as const;

export const formCopy = {
  heading: "Request your evaluation",
  sub: "Two steps. A coach calls you to lock in the time.",
  step1: "Your details",
  step2: "Your athlete",
  continue: "Continue",
  back: "Back",
  sending: "Sending",
  expectation: "A coach calls to confirm your time. Usually the same day.",
  consent:
    "I agree to receive texts and calls from Parisi Speed School Horsham about this evaluation. Message and data rates may apply. Reply STOP to opt out. Consent is not required to book.",
  successHeading: "Got it.",
  successBody: (phone: string) =>
    `A coach from Parisi Horsham will call to confirm your time. If you would rather reach us first, call ${phone}.`,
  errorBody: (phone: string) =>
    `That did not go through. Try again, or call ${phone}.`,
  fields: {
    firstName: "First name",
    lastName: "Last name",
    email: "Email",
    mobile: "Mobile",
    athleteFirstName: "Athlete's first name",
    athleteAge: "Athlete's age",
    sport: "Main sport",
    availability: "When suits you",
    notes: "Anything we should know",
  },
} as const;

export const locationCopy = {
  heading: "Find us",
  parking:
    "Free parking on site. The training floor is straight through the main entrance.",
  mapsLabel: "Open in Google Maps",
} as const;

export const footerCopy = {
  privacy: "Privacy Policy",
  terms: "Terms",
  sms: "SMS Terms",
} as const;
