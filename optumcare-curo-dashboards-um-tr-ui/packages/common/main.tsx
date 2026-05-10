/**
 * v0 by Vercel.
 * @see https://v0.dev/t/ByCfL0PoABJ
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
'use client';
import Header from '@uhg-netra-ai/common-react-components/ui/header';
import SideNav from '@uhg-netra-ai/common-react-components/ui/side-nav';
import { Inter } from 'next/font/google';
import React from 'react';
import SessionWrapper from './sessionWrapper';
const inter = Inter({ subsets: ['latin'] });
export default function Main(props: { children: React.ReactNode }) {
  return (
    <SessionWrapper>
      <html lang="en">
        <body className={inter.className}>
          <main className="hidden min-h-screen flex-col items-center justify-between lg:flex">
            <div key="1" className="flex h-screen w-full">
              <SideNav />
              <div className="flex-1">
                <Header origin={process.env.NEXTAUTH_URL ?? ''} />
                <main className="h-full flex-1 p-4">{props.children}</main>
              </div>
            </div>
          </main>
          {/*For Mobile and tab view */}
          <main className="min-h-screen flex-col items-center justify-between lg:hidden">
            <div key="1" className="h-screen w-full">
              <SideNav />
              <div className="">
                <Header origin={process.env.NEXTAUTH_URL ?? ''} />
                <main className="h-full p-4 md:p-6">{props.children}</main>
              </div>
            </div>
          </main>
        </body>
      </html>
    </SessionWrapper>
  );
}
