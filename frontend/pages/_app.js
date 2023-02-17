import '../styles/nav_footer.css'
import '../styles/globals.css'
import GlobalLoading from "../components/globalLoadingbar.js";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";

function MyApp({ Component, pageProps }) {
    const router = useRouter()

    const [state, setState] = useState({
        isRouteChanging: false,
        loadingKey: 0,
    })

    useEffect(() => {
        const handleRouteChangeStart = () => {
            setState((prevState) => ({
                ...prevState,
                isRouteChanging: true,
                loadingKey: prevState.loadingKey ^ 1,
            }))
        }

        const handleRouteChangeEnd = () => {
            setState((prevState) => ({
                ...prevState,
                isRouteChanging: false,
            }))
        }

        router.events.on('routeChangeStart', handleRouteChangeStart)
        router.events.on('routeChangeComplete', handleRouteChangeEnd)
        router.events.on('routeChangeError', handleRouteChangeEnd)

        return () => {
            router.events.off('routeChangeStart', handleRouteChangeStart)
            router.events.off('routeChangeComplete', handleRouteChangeEnd)
            router.events.off('routeChangeError', handleRouteChangeEnd)
        }
    }, [router.events])

    return(
        <>
            <GlobalLoading isRouteChanging={state.isRouteChanging} key={state.loadingKey} />
            <Component {...pageProps} />
        </>
    )
}

export default MyApp
