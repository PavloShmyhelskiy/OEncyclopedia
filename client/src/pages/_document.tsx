import Document, { Head, Html, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          {/* <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          /> */}
          <link
            rel="icon"
            type="image/png"
            // sizes="16x16"
            href="/favicon.png"
          />

          <link
            href="/assets/fonts/PTSerif/PTSerif-Regular.ttf"
            rel="preconnect"
            crossOrigin=""
          />
          <link
            href="/assets/fonts/PTSerif/PTSerif-Italic.ttf"
            rel="preconnect"
            crossOrigin=""
          />
          <link
            href="/assets/fonts/PTSerif/PTSerif-BoldItalic.ttf"
            rel="preconnect"
            crossOrigin=""
          />
          <link
            href="/assets/fonts/PTSerif/PTSerif-Bold.ttf"
            rel="preconnect"
            crossOrigin=""
          />
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
