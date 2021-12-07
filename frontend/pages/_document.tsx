import Document, { Html, Head, Main, NextScript } from "next/document";
import Footer from "../components/Footer";
import { ServerStyleSheet } from "styled-components";
import { closeModal } from "../libs/modal";
import Overlay from "../components/Overlay";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;
    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(
              <>
                <App {...props}></App>
              </>
            ),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html>
        <Head></Head>
        <body data-light>
          <Main></Main>
          <Footer></Footer>
          <NextScript></NextScript>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
