import { GoogleAuthProvider } from "firebase/auth";
import { LayoutStyle } from "~/core/layout-style";
import { FeedbackCardType } from "~/components/FeedbackCard";

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
    faq: "/faq",
    termsOfService: "/terms-of-service",
    privacyPolicy: "/privacy-policy",
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
            price: "0",
            stripePriceId: "",
          },
          {
            name: "Annually",
            price: "0",
            stripePriceId: "",
          },
        ],
      },
      //* Creator
      {
        stripeProductId: process.env.NEXT_PUBLIC_CREATOR_PRODUCT_ID,
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
            price: "20",
            stripePriceId: process.env.NEXT_PUBLIC_CREATOR_MONTH_SUBSCRIPTION_ID,
          },
          {
            name: "Annually",
            price: "189",
            stripePriceId: process.env.NEXT_PUBLIC_CREATOR_YEAR_SUBSCRIPTION_ID,
          },
        ],
      },
      //* Standard
      {
        stripeProductId: process.env.NEXT_PUBLIC_STANDARD_PRODUCT_ID,
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
            price: "49",
            stripePriceId: process.env.NEXT_PUBLIC_STANDARD_MONTH_SUBSCRIPTION_ID,
          },
          {
            name: "Annually",
            price: "470",
            stripePriceId: process.env.NEXT_PUBLIC_STANDARD_YEAR_SUBSCRIPTION_ID,
          },
        ],
      },
      //* Producer
      {
        stripeProductId: process.env.NEXT_PUBLIC_PRODUCER_PRODUCT_ID,
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
            price: "349",
            stripePriceId: process.env.NEXT_PUBLIC_PRODUCER_MONTH_SUBSCRIPTION_ID,
          },
          {
            name: "Annually",
            price: "3349",
            stripePriceId: process.env.NEXT_PUBLIC_PRODUCER_YEAR_SUBSCRIPTION_ID,
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
  unavailableFeatures: [
    "Visual editor",
    "Your own voice in 29 languages",
    "Lip-syncing",
    "SRT sources",
  ],
  feedback: [
    {
      avatarUrl: "/assets/images/google.png",
      name: "Elena R.",
      rating: 5,
      comment:
        "“I used Audioland for dubbing my documentary from English to Spanish, and I'm blown away by the quality. The AI voice actors were incredibly natural, capturing the essence of each character with remarkable accuracy. The lip-syncing was flawless, and the customer service team was helpful throughout the process. Audioland has set a new standard for dubbing services!“",
    } as FeedbackCardType,
    {
      avatarUrl: "/assets/images/google.png",
      name: "Michael D.",
      rating: 5,
      comment:
        "“Top-notch dubbing service with a wide range of voice options. The final product for our corporate videos was exceptional. There was a slight delay in processing the whole batch, but the quality made up for it. Did Spanish to Italian and Portuguese.“",
    } as FeedbackCardType,
    {
      avatarUrl: "/assets/images/google.png",
      name: "Priya K.",
      rating: 4,
      comment:
        "“I'm thoroughly impressed with Audioland's dubbing service. Efficient, fast, affordable“",
    } as FeedbackCardType,
    {
      avatarUrl: "/assets/images/google.png",
      name: "Connor Williamson",
      rating: 4,
      comment:
        "“I used Audioland for dubbing my web series, and the outcome was fantastic. The voices matched our characters' personalities perfectly even they were cloned with AI, and the emotional delivery was spot on. The process was smooth, although pricing was a bit higher than expected. However, the quality justifies the cost. Highly recommended for anyone looking to dub entertainment content...“",
    } as FeedbackCardType,
  ],

  magic: {
    // https://www.notion.so/krenels/61d2dd45bea5420baf770e621b40ad2e?pvs=4
    projectDurationMultiplicator: 2,
  },
};

export default configuration;
