import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
    return (
        <Html lang="es">
            <Head />
            <title>Walla-Test</title>
            <meta
                content="width=device-width, initial-scale=1"
                name="viewport"
            />
            <link rel="icon" href="/favicon.ico" />
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
