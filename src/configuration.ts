import { GoogleAuthProvider } from "firebase/auth";
import { LayoutStyle } from "~/core/layout-style";

enum Themes {
  Light = "light",
  Dark = "dark",
}

const configuration = {
  site: {
    name: "Audioland: Ultimate AI Dubbing for Video and Audio Translation",
    description:
      "Discover the future of content creation with Audioland's cutting-edge AI dubber and dubbing software. Our online AI dubbing service offers seamless audio and video dubbing, empowering you to dub audio over video effortlessly. Transform your YouTube videos with AI voice dubbing, video translation, and audio translation services. Join the revolution in content production with Audioland!",
    themeColor: "#ffffff",
    themeColorDark: "#0a0a0a",
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL as string,
    siteName: "Audioland, Inc",
    twitterHandle: "",
    githubHandle: "",
    convertKitFormId: "",
    emailOctopisFormId: process.env.NEXT_PUBLIC_EMAIL_OCTOPUS_FORM_ID,
    locale: process.env.DEFAULT_LOCALE,
  },
  firebase: {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  },
  auth: {
    // Enable MFA. You must upgrade to GCP Identity Platform to use it.
    // see: https://cloud.google.com/identity-platform/docs/product-comparison
    enableMultiFactorAuth: false,
    // When enabled, users will be required to verify their email address
    // before being able to access the app
    requireEmailVerification: process.env.NEXT_PUBLIC_REQUIRE_EMAIL_VERIFICATION === "true",
    // NB: Enable the providers below in the Firebase Console
    // in your production project
    providers: {
      emailPassword: true,
      phoneNumber: false,
      emailLink: false,
      oAuth: [GoogleAuthProvider],
    },
  },
  environment: process.env.NODE_ENV ?? "development",
  emulatorHost: process.env.NEXT_PUBLIC_EMULATOR_HOST,
  emulator: process.env.NEXT_PUBLIC_EMULATOR === "true",
  production: process.env.NODE_ENV === "production",
  enableThemeSwitcher: true,
  theme: Themes.Dark,
  paths: {
    signIn: "/auth/sign-in",
    signUp: "/auth/sign-up",
    emailLinkSignIn: "/auth/link",
    onboarding: `/onboarding`,
    appHome: "/projects",
    settings: {
      profile: "/settings/profile",
      authentication: "/settings/profile/authentication",
      email: "/settings/profile/email",
      password: "/settings/profile/password",
      subscription: "/settings/subscription",
    },
    api: {
      checkout: `/api/stripe/checkout`,
      billingPortal: `/api/stripe/portal`,
    },
  },
  navigation: {
    style: LayoutStyle.Sidebar,
  },
  appCheckSiteKey: process.env.NEXT_PUBLIC_APPCHECK_KEY,
  emailEtherealTestAccount: {
    email: process.env.ETHEREAL_EMAIL,
    password: process.env.ETHEREAL_PASSWORD,
  },
  sentry: {
    dsn: process.env.SENTRY_DSN,
  },
  stripe: {
    products: [
      //* Free
      {
        name: "Free",
        badge: "Enjoy!",
        description: "3 tokens",
        tokens: 3,
        isTokensPerMonth: false,
        maxFileDurationInMinutes: 1,
        free: true,
        features: [
          "1-min file-lengh max",
          "Audio translation",
          "Video translation",
          "70+ output languages",
          "Visual editor",
          "Your own voice in 29 languages",
          "Lip-syncing",
          "SRT sources",
        ],
        plans: [
          {
            name: "Monthly",
            price: "$0",
            stripePriceId: "price_1O5dATLMDoxZURVetlMftktp",
          },
          {
            name: "Yearly",
            price: "$0",
            stripePriceId: "price_1O5dATLMDoxZURVeJ8pbEq5t",
          },
        ],
      },
      //* Creator
      {
        stripeProductId: "prod_OuKnitbowAz4n4",
        name: "Creator",
        description: "10 tokens/month",
        tokens: 10,
        isTokensPerMonth: true,
        maxFileDurationInMinutes: 1,
        free: false,
        features: [
          "1-min file-lengh max",
          "Audio translation",
          "Video translation",
          "70+ output languages",
          "Visual editor",
          "Your own voice in 29 languages",
          "Lip-syncing",
          "SRT sources",
        ],
        plans: [
          {
            name: "Monthly",
            price: "$20",
            stripePriceId: "price_1O6W81LMDoxZURVe5SPXElmm",
          },
          {
            name: "Yearly",
            price: "$189",
            stripePriceId: "price_1O6W81LMDoxZURVevB2MwM3Z",
          },
        ],
      },
      //* Standart
      {
        stripeProductId: "prod_OuKpA5o0s5ysTU",
        name: "Standard",
        description: "30 tokens/month",
        tokens: 30,
        isTokensPerMonth: true,
        maxFileDurationInMinutes: 5,
        free: false,
        features: [
          "5-min file-lengh max",
          "Audio translation",
          "Video translation",
          "70+ output languages",
          "Visual editor",
          "Your own voice in 29 languages",
          "Lip-syncing",
          "SRT sources",
        ],
        plans: [
          {
            name: "Monthly",
            price: "$49",
            stripePriceId: "price_1O6WA2LMDoxZURVe3FYhuzEy",
          },
          {
            name: "Yearly",
            price: "$470",
            stripePriceId: "price_1O6WA2LMDoxZURVe2ZmelB28",
          },
        ],
      },
      //* Producer
      {
        stripeProductId: "prod_OuKubCASJyJPoR",
        name: "Producer",
        badge: `Most Popular`,
        recommended: true,
        description: "300 tokens/month",
        tokens: 300,
        isTokensPerMonth: true,
        maxFileDurationInMinutes: 20,
        free: false,
        features: [
          "20-min file-lengh max",
          "Audio translation",
          "Video translation",
          "70+ output languages",
          "Visual editor",
          "Your own voice in 29 languages",
          "Lip-syncing",
          "SRT sources",
        ],
        plans: [
          {
            name: "Monthly",
            price: "$349",
            stripePriceId: "price_1O81jhLMDoxZURVeNz22ANJ3",
          },
          {
            name: "Yearly",
            price: "$3,349",
            stripePriceId: "price_1O6WF3LMDoxZURVecqdybl5W",
          },
        ],
      },
      //* Enterprise
      {
        name: "Enterprise",
        badge: `Let's talk`,
        recommended: false,
        description: "From 1000 tokens/month",
        tokens: 1000,
        isTokensPerMonth: true,
        maxFileDurationInMinutes: 90,
        free: false,
        features: [
          "90-min file-lengh max",
          "Everything in Producer",
          "Custom Pricing",
          "Agreement and Invoices",
          "Priority support",
        ],
        plans: [
          {
            name: "",
            price: "Contact us",
            stripePriceId: "",
            label: `Contact us`,
            href: `/contact`,
          },
        ],
      },
    ],
  },
};

export default configuration;
