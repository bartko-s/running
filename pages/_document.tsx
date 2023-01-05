import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
          <meta charSet="utf-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

          {/* Global site tag (gtag.js) - Google Analytics*/}
          <Script src="https://www.googletagmanager.com/gtag/js?id=UA-50873093-3" strategy="afterInteractive" />
          <Script id="google-analytics" strategy="afterInteractive">
              {
                  `window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', 'UA-50873093-3');`
              }
          </Script>

          <link rel="apple-touch-icon" sizes="180x180" href="/img/favicon/apple-touch-icon.png"/>
          <link rel="icon" type="image/png" sizes="32x32" href="/img/favicon/favicon-32x32.png"/>
          <link rel="icon" type="image/png" sizes="16x16" href="/img/favicon/favicon-16x16.png"/>
          <link rel="manifest" href="/img/favicon/site.webmanifest"/>
          <link rel="mask-icon" href="/img/favicon/safari-pinned-tab.svg" color="#5bbad5"/>
          <link rel="shortcut icon" href="/img/favicon/favicon.ico"/>
          <meta name="msapplication-TileColor" content="#da532c" />
          <meta name="msapplication-config" content="/img/favicon/browserconfig.xml" />
          <meta name="theme-color" content="#ffffff" />
          <meta name="description" content="The best running pace calculator" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
