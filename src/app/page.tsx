import {
  ArrowBigRight,
} from 'lucide-react'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { TUsage, usageSectionData, usecaseSectionData } from '@/data';


export default function Home() {
  return (
    <>
      <Header />
      <main className="container flex flex-col items-center justify-center">
        <HeroSection />
        <UsageSection />
        <UsecaseSection />
      </main>
      <Footer />
    </>
  )
}


function HeroSection() {
  return (
    <div className="relative isolate px-6 pt-16 lg:px-8">
      <div className="relative mx-auto max-w-4xl py-24">
        <div className="absolute -top-[6rem] -z-10 transform-gpu overflow-hidden blur-3xl">
          <svg
            className="relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-30rem)] sm:h-[42.375rem]"
            viewBox="0 0 1155 678"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)"
              fillOpacity=".3"
              d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
            />
            <defs>
              <linearGradient
                id="45de2b6b-92d5-4d68-a6a0-9b9b2abad533"
                x1="1155.49"
                x2="-78.208"
                y1=".177"
                y2="474.645"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#9089FC" />
                <stop offset={1} stopColor="#FF80B5" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Chat with any
            <span className="mx-2 text-blue-400 sm:mx-4">PDF</span>
            document
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-800">
            From legal agreements to financial reports, documentor brings your pdf documents to life.
            <br />
            You can ask questions, get summaries, find information, & more securly and privately.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-2">
            <Button className="bg-blue-400 hover:bg-blue-500">
              Get started
              <ArrowBigRight size={20} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

function UsageSection() {
  return (
    <div className="pt-20 pb-12 gap-3 mx-auto flex flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-black my-6">
        How to Use
        <span className="mx-4 text-blue-400">?</span>
      </h1>
      <div className="flex gap-2 flex-col flex-wrap items-center justify-center md:w-full md:flex-row md:items-center md:justify-evenly md:gap-4">
        {
          usageSectionData.map((item: TUsage, index: number) => {
            return (
              <Card key={index} className="px-6 py-12 w-[352px] cursor-pointer hover:shadow-md">
                <CardHeader>
                  <CardTitle>
                    <div className="flex gap-2">
                      {item.icon}
                      {item.title}
                    </div>
                  </CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
              </Card>
            )
          })
        }
      </div>
    </div>
  )
}

function UsecaseSection() {
  return (
    <div id="use-cases" className="pt-12 pb-20 gap-3 mx-auto flex flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-black my-6">
        Built for any
        <span className="mx-4 text-blue-400">use case</span>
      </h1>
      <div className="flex gap-2 flex-col flex-wrap items-center justify-center md:w-full md:flex-row md:items-center md:justify-evenly md:gap-4">
        {
          usecaseSectionData.map((item: TUsage, index: number) => {
            return (
              <Card key={index} className="px-6 py-12 w-[352px] cursor-pointer hover:shadow-md">
                <CardHeader>
                  <CardTitle>
                    <div className="flex gap-1 items-center justify-center">
                      {item.icon}
                      {item.title}
                    </div>
                  </CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
              </Card>
            )
          })
        }
      </div>
    </div>
  )
}
