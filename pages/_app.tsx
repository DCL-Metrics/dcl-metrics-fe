import "../styles/globals.css"
import Head from "next/head"
import Script from "next/script"
import type { AppProps } from "next/app"
import { ChakraProvider } from "@chakra-ui/react"

function SafeHydrate({ children }) {
  return (
    <div suppressHydrationWarning>
      {typeof window === "undefined" ? null : children}
    </div>
  )
}

function MyApp({ Component, pageProps }: AppProps) {
  const isProd = () => {
    return process.env.NEXT_PUBLIC_ENV === "prod"
  }

  return (
    <ChakraProvider>
      <SafeHydrate>
        <Head>
          <title>DCL Metrics</title>
          <link rel="shortcut icon" sizes="32x32" href="/images/favicon.ico" />
          <meta
            name="description"
            content="We make Decentraland's data accessible so it can be used by the community to build a better metaverse."
          />
          <meta
            name="keywords"
            content="Decentraland, dcl stats, decentraland stats, dcl statistics, decentraland statistics, dcl metrics, decentraland metrics, metaverse stats, metaverse statistics, metaverse metrics"
          />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        {isProd() && (
          <Script
            async
            defer
            data-website-id="ba886c85-0602-4add-a574-52d2d163ecc1"
            src="https://dcl-metrics-telemetry.herokuapp.com/dcl-metrics-telemetry.js"
            data-cache="true"
          ></Script>
        )}
        <Component {...pageProps} />
      </SafeHydrate>
    </ChakraProvider>
  )
}

export default MyApp
