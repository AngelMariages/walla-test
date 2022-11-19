import Header from '../components/Header';
import '../styles/globals.css';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <head />
            <body>
                <Header />
                <main className="container mx-auto">{children}</main>
                <footer>
                    <p>Footer</p>
                </footer>
            </body>
        </html>
    );
}