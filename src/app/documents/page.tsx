import React from 'react'
import { Session } from 'next-auth';
import { redirect } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getAuthSession } from '@/lib/auth';
import FileDropzone from '@/components/FileDropzone';
import FileList from '@/components/FileList';


export default async function DocumentsPage() {
  const session: Session | null = await getAuthSession()

  if (!session) {
    redirect("/")
  }

  return (
    <div className="h-screen w-screen">
      <header className="z-50 h-[21%] md:h-[8%] border flex items-center justify-center">
        <Header />
      </header>
      <main className="h-[92%] w-full overflow-y-scroll">
        <div className="container py-8 mx-auto w-fit h-fit grid gap-2 grid-cols-1 grid-flow-row sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          <div className="flex items-center justify-center">
            <FileDropzone />
          </div>
          <FileList />
        </div>
      </main>
      <Footer />
    </div>
  )
}
