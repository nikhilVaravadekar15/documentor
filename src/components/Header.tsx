import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from './ui/button'
import { ArrowBigRight } from 'lucide-react'

export default function Header() {
    return (
        <header className="z-20">
            <nav className="border-gray-200 px-4 lg:px-6 py-2.5 shadow dark:bg-gray-800 dark:shadow-white">
                <div className="flex gap-4 flex-wrap flex-col items-center justify-center mx-auto max-w-screen-xl md:flex-row md:justify-between">
                    <Link href={"/"} className="flex items-center cursor-pointer">
                        <Image
                            src={"/apple-touch-icon.png"}
                            className="mr-3"
                            alt="Flowbite Logo"
                            width={32}
                            height={32}
                            draggable={false}
                        />
                        <span className="text-xl font-semibold dark:text-white">
                            Documentor
                        </span>
                    </Link>
                    <ul className="flex gap-4 mb-2 font-medium lg:space-x-8 items-center justify-center">
                        <li>
                            <Link href={"/#use-cases"} className=" text-base font-medium text-gray-900 hover:text-gray-700">
                                Use cases
                            </Link>
                        </li>
                        <li>
                            <Link href={"/pricing"} className=" text-base font-medium text-gray-900 hover:text-gray-700">
                                Pricing
                            </Link>
                        </li>
                    </ul>
                    <div className="flex items-center">
                        <Link
                            href="#"
                            className="text-gray-800 dark:text-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-400 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
                        >
                            Log in
                        </Link>
                        <Button className="bg-blue-400 hover:bg-blue-500">
                            Get started
                            <ArrowBigRight size={20} />
                        </Button>
                    </div>
                </div>
            </nav>
        </header>
    )
}
