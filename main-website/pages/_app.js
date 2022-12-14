import { ChakraProvider } from '@chakra-ui/react';
import { useEffect, useMemo } from "react";
import {
    GlowWalletAdapter,
    PhantomWalletAdapter,
    SlopeWalletAdapter,
    SolflareWalletAdapter, TorusWalletAdapter,
    SolletWalletAdapter
} from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from '@solana/web3.js';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import NextNProgress from "nextjs-progressbar";
import Script from "next/script";
import { useRouter } from "next/router";
import * as gtag from '../lib/gtag'

require('@solana/wallet-adapter-react-ui/styles.css');
require('../styles/globals.css');



function MyApp({ Component, pageProps }) {

    const network = WalletAdapterNetwork.Mainnet;

    const config = {
        commitment: 'confirmed',
        endpoint: 'https://omniscient-burned-haze.solana-mainnet.discover.quiknode.pro/8c1c39b15055f92e29ffbc74586b0607d098801c',
        wsEndpoint: 'wss://omniscient-burned-haze.solana-mainnet.discover.quiknode.pro/8c1c39b15055f92e29ffbc74586b0607d098801c'
    }

    const wallets = useMemo(
        () => [
            new PhantomWalletAdapter(),
            new GlowWalletAdapter(),
            new SlopeWalletAdapter(),
            new SolflareWalletAdapter({ network }),
            new TorusWalletAdapter(),
            new SolletWalletAdapter(),
        ],
        [network]
    );

    const router = useRouter()
    useEffect(() => {
        const handleRouteChange = (url) => {
            gtag.pageview(url)
        }
        router.events.on('routeChangeComplete', handleRouteChange)
        router.events.on('hashChangeComplete', handleRouteChange)
        return () => {
            router.events.off('routeChangeComplete', handleRouteChange)
            router.events.off('hashChangeComplete', handleRouteChange)
        }
    }, [router.events])

    let result = <>
        <NextNProgress
            color="#B8C3E6"
            startPosition={0.3}
            stopDelayMs={200}
            height={3}
            showOnShallow={true}
        />
        <Script strategy="lazyOnload" src={`https://www.googletagmanager.com/gtag/js?id=G-88WW5S734R`} />

        <Script id="google-analytics" strategy="lazyOnload">
            {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', 'G-88WW5S734R', {
                    page_path: window.location.pathname,
                    });
                `}
        </Script>
        {/*<Loader loading={loading}/>*/}
        <Component {...pageProps} />
    </>;

    if (Component.needChakra)
        result = <ChakraProvider>{result}</ChakraProvider>

    if (Component.needWeb3)
        result = <ConnectionProvider endpoint={config.endpoint} config={config}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>{result}</WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>

    return result;
}

export default MyApp
