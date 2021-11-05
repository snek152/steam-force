import Head from "next/head"

export default function Layout({ children, title }) {
    return (
        <div>
            <Head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <meta name="description" content="An open-source initiative to provide accessible and interactive learning for underprivileged kids through a web app." />
                <meta name="robots" content="index, follow" />
                <meta property="og:type" content="website" />
                <meta name="og:title" property="og:title" content="The STEAM Force" />
                <meta name="og:description" property="og:description" content="An open-source initiative to provide accessible and interactive learning for underprivileged kids through a web app." />
                <meta property="og:site_name" content="The STEAM Force" />
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:title" content="The STEAM Force" />
                <meta name="twitter:description" content="An open-source initiative to provide accessible and interactive learning for underprivileged kids through a web app." />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <title>The STEAM Force | {title || "404"}</title>
            </Head>
            {children}
        </div>
    )
}