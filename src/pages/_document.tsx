import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* FxFilterJS - Local file */}
        <script src="/FxFilter.js"></script>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
