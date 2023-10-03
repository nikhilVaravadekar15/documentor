import React from 'react'
import Header from '@/components/Header';
import Qna from '@/components/Qna';
import PdfRenderer from '@/components/PdfRenderer';


export default function DocumentsPage() {
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
