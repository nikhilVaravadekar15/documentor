import React from 'react'
import Header from '@/components/Header';
import Qna from '@/components/Qna';
import PdfRenderer from '@/components/PdfRenderer';
import { getAuthSession } from '@/lib/auth';
import { Session } from 'next-auth';
import { redirect } from 'next/navigation';

type TDocumentPageProps = {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default async function DocumentPage({ params }: TDocumentPageProps) {
  const session: Session | null = await getAuthSession()

  if (!session) {
    redirect("/")
  }

  return (
    <div className="h-screen w-screen">
      <header className="z-50 h-[8%]">
        <Header />
      </header>
      <main className="h-[92%] w-full flex flex-col items-center justify-center md:flex-row">
        <div className="h-[50%] w-full border md:h-full md:w-[50%]">
          <PdfRenderer url="http://localhost:3000/Ethereum_Whitepaper_2014.pdf" />
        </div>
        <div className="h-[50%] w-full border md:h-full md:w-[50%]">
          <Qna />
        </div>
      </main>
    </div>
  )
}
