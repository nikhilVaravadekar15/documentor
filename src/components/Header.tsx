import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import SignupModal from '@/components/ot/SignupModal'
import SigninModal from '@/components/ot/SigninModal'
import { getAuthSession } from '@/lib/auth'
import { Session } from 'next-auth'
import UserPopover from './UserPopover'

export default async function Navigationbar() {
    const session: Session | null = await getAuthSession()
    return (
        <nav className="w-full h-full border-gray-200 px-4 lg:px-6 py-2.5 shadow dark:bg-gray-800 dark:shadow-white">
            <div className="flex gap-4 flex-wrap flex-col items-center justify-center mx-auto max-w-screen-xl md:flex-row md:justify-between">
                <Link
                    href={session ? "/documents" : "/"}
                    className="group flex items-center cursor-pointer"
                >
                    <Image
                        src={"/apple-touch-icon.png"}
                        className="mr-3 group-hover:animate-spin"
                        alt="documentor-logo"
                        width={32}
                        height={32}
                        draggable={false}
                    />
                    <span className="text-xl font-semibold dark:text-white">
                        Documentor
                    </span>
                </Link>
                {
                    session === null && (
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
                    )
                }
                {
                    session ? (
                        <div className="flex gap-1 items-center justify-center">
                            <UserPopover />
                        </div>
                    ) : (
                        <div className="flex gap-1 items-center justify-center">
                            <SigninModal />
                            <SignupModal />
                        </div>
                    )
                }
            </div>
        </nav>
    )
}
