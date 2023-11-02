import Head from "next/head";
import { useContext } from "react";
import configuration from "~/configuration";
import { ThemeContext } from "~/core/contexts/theme";

const Layout: React.FCC = ({ children }) => {
  const siteUrl = configuration.site.siteUrl;

  if (!siteUrl) {
    throw new Error(`Please add the property siteUrl in the configuration`);
  }

  const structuredData = {
    name: configuration.site.name,
    url: siteUrl,
    logo: `${siteUrl}/assets/images/favicon/favicon.svg`,
    "@context": "https://schema.org",
    "@type": "Organization", // change to person for Personal websites
  };

  return (
    <>
      <Head>
        <title key={"title"}>{configuration.site.name}</title>

        <link 
          rel="icon"
          type="image/svg" href="/assets/images/favicon/favicon.svg" />

        <link
          rel="apple-touch-icon"
          type="image/svg"
          href="/assets/images/favicon/favicon.svg"
        />

        <link
          rel="icon"
          type="image/svg"
          sizes="16x16"
          href="/assets/images/favicon/favicon.svg"
        />

        <link
          rel="icon"
          type="image/svg"
          sizes="32x32"
          href="/assets/images/favicon/favicon.svg"
        />

        <link rel="manifest" href="/assets/images/favicon/site.webmanifest" />

        <link
          rel="mask-icon"
          href="/assets/images/favicon/favicon.svg"
          color="#000000"
        />

        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />

        <meta
          name="google-site-verification"
          content="VwFn4zBGTiUrqKCdwjXQta4mKqQJOda3pcBteUGPSdM"
        />

        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-config" content="/favicon/browserconfig.xml" />

        <MetaColor />

        <meta
          name="description"
          content={configuration.site.description}
          key="meta:description"
        />

        <meta property="og:title" key="og:title" content={configuration.site.name} />

        <meta
          property="og:description"
          key="og:description"
          content={configuration.site.description}
        />

        <meta property="og:site_name" content={configuration.site.siteName} />
        <meta property="twitter:title" content={configuration.site.siteName} />
        <meta property="twitter:card" content="summary_large_image" />

        <meta property="twitter:creator" content={configuration.site.twitterHandle} />

        <script
          async
          key="ld:json"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>

      <main>{children}</main>
    </>
  );
};

export default Layout;

function MetaColor() {
  const { theme } = useContext(ThemeContext);

  const color =
    theme === "dark" ? configuration.site.themeColorDark : configuration.site.themeColor;

  return <meta name="theme-color" content={color} />;
}
