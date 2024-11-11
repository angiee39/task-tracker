'use client'
import "./globals.css";
import { UserProvider } from '@/context/user-context';
import NavBar from "./nav-bar";


export default function RootLayout({ children }: any) {
    return (
        <html lang="en">
            <body>
                <UserProvider>
                    <NavBar />
                    <main>
                        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 flex justify-center items-center">
                            {children}
                        </div>
                    </main>
                </UserProvider>
            </body>
        </html>
    );
}
