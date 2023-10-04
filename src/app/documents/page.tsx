import React from 'react'
import Header from '@/components/Header';
import FileDropzone from '@/components/FileDropzone';
import Opencard from '@/components/Opencard';


export default function DocumentsPage() {
  return (
    <div className="h-screen w-screen">
      <header className="z-50 h-[21%] md:h-[8%] border flex items-center justify-center">
        <Header />
      </header>
      <main className="h-[92%] w-full overflow-y-scroll">
        <div className="container py-8 mx-auto w-fit h-fit grid gap-2 grid-cols-1 grid-flow-row sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          <div className="h-fit flex items-center justify-centerborder">
            <FileDropzone />
          </div>
          {
            [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((card, index: number) => {
              return (
                <div key={index} className="h-fit flex items-center justify-centerborder">
                  <Opencard
                    id="asdfghjkl123edfgy65"
                    title="Ethereum_Whitepaper_2014.pdf"
                    created_at="4 oct, 2024"
                  />
                </div>
              )
            })
          }
        </div>
      </main>
    </div>
  )
}
