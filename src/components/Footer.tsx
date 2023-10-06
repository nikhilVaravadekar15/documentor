import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Session } from 'next-auth'
import { getAuthSession } from '@/lib/auth'


export default async function Footer() {
    const session: Session | null = await getAuthSession()

    return session ? (
        <section className="relative overflow-hidden py-6 shadow-[1px_1px_16px_2px_rgba(0,0,0,0.3)]">
            <div className="container flex h-full w-full flex-col items-center justify-center md:flex-row md:justify-between">
                <div className="flex items-center">
                    <Image
                        src={"/apple-touch-icon.png"}
                        className="mr-3"
                        alt="Flowbite Logo"
                        width={32}
                        height={32}
                        draggable={false}
                    />
                    <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                        Documentor
                    </span>
                </div>
                <p className="text-sm text-gray-600">
                    &copy; Copyright 2023. All Rights Reserved by Documentor.
                </p>
            </div>
        </section>
    ) : (
        <section className="relative overflow-hidden py-10 shadow-[35px_35px_60px_15px_rgba(0,0,0,0.3)]">
            <div className="relative z-10 mx-auto max-w-7xl px-4">
                <div className="-m-6 flex flex-wrap">
                    <div className="w-full p-6 md:w-1/2 lg:w-5/12">
                        <div className="flex h-full flex-col justify-between">
                            <div className="flex items-center">
                                <Image
                                    src={"/apple-touch-icon.png"}
                                    className="mr-3"
                                    alt="Flowbite Logo"
                                    width={32}
                                    height={32}
                                    draggable={false}
                                />
                                <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                                    Documentor
                                </span>
                            </div>
                            <p className="text-sm text-gray-600">
                                &copy; Copyright 2023. All Rights Reserved by Documentor.
                            </p>
                        </div>
                    </div>
                    <div className="w-full p-6 md:w-1/2 lg:w-2/12">
                        <div className="h-full">
                            <h3 className="tracking-px mb-9  text-xs font-semibold uppercase text-gray-500">
                                Company
                            </h3>
                            <ul>
                                <li className="mb-4">
                                    <Link href="#" className=" text-base font-medium text-gray-900 hover:text-gray-700">
                                        Use cases
                                    </Link>
                                </li>
                                <li className="mb-4">
                                    <Link href="#" className=" text-base font-medium text-gray-900 hover:text-gray-700">
                                        Pricing
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="w-full p-6 md:w-1/2 lg:w-2/12">
                        <div className="h-full">
                            <h3 className="tracking-px mb-9  text-xs font-semibold uppercase text-gray-500">
                                Support
                            </h3>
                            <ul>
                                <li className="mb-4">
                                    <Link href="#" className=" text-base font-medium text-gray-900 hover:text-gray-700">
                                        Account
                                    </Link>
                                </li>
                                <li className="mb-4">
                                    <Link href="#" className=" text-base font-medium text-gray-900 hover:text-gray-700">
                                        Help
                                    </Link>
                                </li>
                                <li className="mb-4">
                                    <Link href="#" className=" text-base font-medium text-gray-900 hover:text-gray-700">
                                        Contact Us
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="w-full p-6 md:w-1/2 lg:w-3/12">
                        <div className="h-full">
                            <h3 className="tracking-px mb-9  text-xs font-semibold uppercase text-gray-500">
                                Legals
                            </h3>
                            <ul>
                                <li className="mb-4">
                                    <Link href="#" className=" text-base font-medium text-gray-900 hover:text-gray-700">
                                        Terms & Conditions
                                    </Link>
                                </li>
                                <li className="mb-4">
                                    <Link href="#" className=" text-base font-medium text-gray-900 hover:text-gray-700">
                                        Privacy Policy
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" className=" text-base font-medium text-gray-900 hover:text-gray-700">
                                        Licensing
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
