import "../styles/globals.scss";
import Head from "next/head";
import { ApolloProvider } from "@apollo/client";
import { MainContextProvider } from "../libs/MainContext";
import { Head as Header } from "../components/Head";
import { useApollo } from "../libs/apollo";
import { closeModal } from "../libs/modal";
import Overlay from "../components/Overlay";
function MyApp({ Component, pageProps, apollo }) {
  const client = useApollo(pageProps.initialApolloState);
  if (typeof window !== "undefined") {
    window.onresize = () => {
      const divs: NodeListOf<HTMLDivElement> =
        document.querySelectorAll("[data-des]");
      divs.forEach((el: HTMLDivElement) => {
        if (el.hasAttribute("style")) {
          const contentDiv: HTMLDivElement = el.children[1] as HTMLDivElement;
          el.style.bottom = -contentDiv.offsetHeight + "px";
        }
      });
      if (window.innerWidth > 590) {
        closeModal();
      }
    };
  }
  return (
    <ApolloProvider client={client}>
      <Head>
        <title>Welcome</title>
      </Head>
      <MainContextProvider>
        <Header></Header>
        <Component {...pageProps} />
      </MainContextProvider>
      <Overlay />
    </ApolloProvider>
  );
}

// export default MyApp;
export default MyApp;
