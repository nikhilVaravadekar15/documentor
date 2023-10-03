import {
  Info,
  ArrowBigRight,
  CircleDollarSign
} from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import React from 'react'
import Footer from '@/components/Footer';
import { pricingPlansData } from '@/data/pricing';
import { Button } from '@/components/ui/button';
import Navigationbar from '@/components/Header';


export default function PricingPage() {
  return (
    <>
      <Navigationbar />
      <main className="container mt-8 mb-20 flex flex-col items-center justify-center">
        <h1 className="text-4xl font-black my-4 flex gap-3 items-center justify-center">
          Pricing
          <CircleDollarSign size={32} className="text-blue-400" />
        </h1>
        <div className="relative z-10 mx-auto max-w-7xl px-4">
          <div className="mx-auto md:max-w-4xl">
            <div className="flex flex-wrap">
              {
                pricingPlansData.map((plan, index: number) => {
                  return (
                    <div key={plan.title} className="w-full p-5 md:w-1/2">
                      <div className="rounded-md border bg-white bg-opacity-90">
                        <div className=" border-b">
                          <div className="px-9 py-7">
                            <h3 className="mb-3 text-xl font-bold leading-snug text-gray-900">{plan.title}</h3>
                            <p className="font-medium leading-relaxed text-gray-500">
                              {plan.tagline}
                            </p>
                          </div>
                        </div>
                        <div className="px-9 pb-9 pt-8">
                          <p className="mb-6 font-medium leading-relaxed text-gray-600">
                            Features included:
                          </p>
                          <ul className="mb-11">
                            {
                              plan.features.map((feature, index: number) => {
                                return (
                                  <li key={feature.text} className="mb-4 flex gap-2 items-center">
                                    <p className="font-semibold leading-normal">{feature.text}</p>
                                    {
                                      feature?.footnote != null && (
                                        <TooltipProvider>
                                          <Tooltip>
                                            <TooltipTrigger asChild className="cursor-pointer">
                                              <Info className="mr-2" size={16} />
                                            </TooltipTrigger>
                                            <TooltipContent>
                                              <p>{feature.footnote}</p>
                                            </TooltipContent>
                                          </Tooltip>
                                        </TooltipProvider>
                                      )
                                    }
                                  </li>
                                )
                              })
                            }
                          </ul>
                          <p className="mb-6 text-lg font-semibold leading-normal text-gray-600">
                            <span>Starting from</span>
                            <span className="ml-2 text-gray-900">${plan?.details?.price?.amount!}/mo</span>
                          </p>
                          <div className="md:inline-block">
                            <Button className="bg-blue-400 hover:bg-blue-500">
                              Get started
                              <ArrowBigRight size={20} />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
