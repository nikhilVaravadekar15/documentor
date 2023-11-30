import React from 'react'
import Header from '@/components/Header';
import { getAuthSession } from '@/lib/auth';
import { Session } from 'next-auth';
import { redirect } from 'next/navigation';
import PdfQna from '@/components/PdfQna';

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
        <PdfQna
          slug={params.slug}
        />
      </main>
    </div>
  )
}
