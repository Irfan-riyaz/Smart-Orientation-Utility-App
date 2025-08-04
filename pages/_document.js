import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon/alarm.jpg" />
        <meta name="theme-color" content="#1e293b" />
      </Head>
      <body className="bg-slate-900 text-white">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
