import { GoogleAuthProvider } from "firebase/auth";
import { LayoutStyle } from "~/core/layout-style";

enum Themes {
  Light = "light",
  Dark = "dark",
}

const configuration = {
  site: {
    name: "DUB - Translate video & audio",
    description: "Make your videos speak more languages",
    themeColor: "#ffffff",
    themeColorDark: "#0a0a0a",
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL as string,
    siteName: "Awesomely",
    twitterHandle: "",
    githubHandle: "",
    convertKitFormId: "",
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
    requireEmailVerification:
      process.env.NEXT_PUBLIC_REQUIRE_EMAIL_VERIFICATION === "true",
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
      {
        name: "Basic",
        description: "1000 mins of translation",
        badge: `Up to 20 users`,
        features: ["1000 mins of translation", "Chat Support"],
        plans: [
          {
            name: "Monthly",
            price: "$10",
            stripePriceId: "price_1O5dATLMDoxZURVetlMftktp",
          },
          {
            name: "Yearly",
            price: "$100",
            stripePriceId: "price_1O5dATLMDoxZURVeJ8pbEq5t",
          },
        ],
      },
      {
        name: "Pro",
        badge: `Most Popular`,
        recommended: true,
        description: "Description of your Pro plan",
        features: ["5000 mins of translation", "Chat Support"],
        plans: [
          {
            name: "Monthly",
            price: "$50",
            stripePriceId: "pro-plan-mth",
          },
          {
            name: "Yearly",
            price: "$500",
            stripePriceId: "pro-plan-yr",
          },
        ],
      },
      // {
      //   name: 'Premium',
      //   description: '5000 mins of translation',
      //   badge: ``,
      //   features: [
      //     'Advanced Reporting',
      //     'Unlimited users',
      //     '50GB for each user',
      //     'Account Manager',
      //   ],
      //   plans: [
      //     {
      //       name: '',
      //       price: 'Contact us',
      //       stripePriceId: '',
      //       label: `Contact us`,
      //       href: `/contact`,
      //     },
      //   ],
      // },
    ],
  },
};

export default configuration;
