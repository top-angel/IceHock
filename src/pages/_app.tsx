import "../styles/global.css";

import type { AppProps } from "next/app";
import StoreProvider from "../redux/StoreProvider";
import { PrivyProvider } from "@privy-io/react-auth";

import AuthContextProvider from "../context/AuthProvider";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <StoreProvider>
      <PrivyProvider
        appId={"clnaa51jp06yzle0fm50vpbbm"}
        config={{
          loginMethods: ["email"],
          appearance: {
            theme: "light",
            accentColor: "#676FFF",
            // logo: "https://your-logo-url",
          },
          embeddedWallets: {
            noPromptOnSignature: true, // defaults to false
          },
        }}
      >
        <AuthContextProvider>
          <Component {...pageProps} />
        </AuthContextProvider>
      </PrivyProvider>
    </StoreProvider>
  );
};

export default MyApp;
