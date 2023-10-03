import {
    Send
} from 'lucide-react'
import React from 'react'
import Image from 'next/image'
import { Button } from './ui/button'
import { Textarea } from "@/components/ui/textarea"


export default function Qna() {
    return (
        <div className="relative flex-grow h-full w-full flex flex-col">
            <div className="relative w-full flex-grow overflow-y-scroll">
                <div className="w-full flex flex-col items-center justify-center">
                    <div className="p-4 w-full bg-gray-50">
                        <div className="flex flex-col">
                            <div className="text-base text-gray-600">
                                <Image
                                    width={24}
                                    height={24}
                                    draggable={false}
                                    alt="user-logo"
                                    className="cursor-pointer"
                                    src={"/apple-touch-icon.png"}
                                />
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint excepturi dolor quas.
                            </div>
                        </div>
                    </div>
                    <div className="p-4 w-full bg-blue-100">
                        <div className="flex flex-col">
                            <Image
                                width={24}
                                height={24}
                                draggable={false}
                                alt="documentor-logo"
                                className="cursor-pointer"
                                src={"/apple-touch-icon.png"}
                            />
                            <div className="text-base text-gray-700">
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Optio ut id velit. Accusamus, veniam consectetur. Aliquam delectus ut velit quibusdam. Fugit pariatur deleniti quisquam, in doloremque dolor quas ducimus, assumenda reprehenderit eos fuga ratione sunt magni necessitatibus quibusdam dolorem! A, qui iusto quo ipsa tempora consequuntur. Ea ab dignissimos nostrum esse. Dicta, culpa praesentium ipsa voluptas reprehenderit iste exercitationem, minima similique, eos ea assumenda iusto ratione. Laboriosam quam commodi esse accusantium, ducimus atque, autem praesentium consequuntur illo nobis inventore accusamus!
                            </div>
                        </div>
                    </div>
                    <div className="p-4 w-full bg-gray-50">
                        <div className="flex flex-col">
                            <div className="text-base text-gray-600">
                                <Image
                                    width={24}
                                    height={24}
                                    draggable={false}
                                    alt="user-logo"
                                    className="cursor-pointer"
                                    src={"/apple-touch-icon.png"}
                                />
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, in!
                            </div>
                        </div>
                    </div>
                    <div className="p-4 w-full bg-blue-100">
                        <div className="flex flex-col">
                            <Image
                                width={24}
                                height={24}
                                draggable={false}
                                alt="documentor-logo"
                                className="cursor-pointer"
                                src={"/apple-touch-icon.png"}
                            />
                            <div className="text-base text-gray-700">
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Culpa totam sunt eum minima molestiae voluptas, officiis ea veritatis fuga autem voluptates magni cumque exercitationem at nobis suscipit tempore mollitia placeat quae labore debitis nam tempora! Doloremque voluptatum aliquid, reiciendis quasi ad, hic dolor quos natus alias commodi ex blanditiis id doloribus sequi maxime! Facilis dolor aperiam doloribus eius tenetur nihil temporibus, officiis amet voluptatibus, non sit? Labore laborum nemo vero quisquam harum adipisci corporis iste soluta sunt accusantium a quibusdam odit asperiores, unde temporibus exercitationem quaerat. Officia possimus itaque, totam doloribus voluptas harum inventore, pariatur atque eum sunt rem in.
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-evenly py-2 rounded-lg shadow-[35px_35px_60px_15px_rgba(0,0,0,0.3)]">
                <Textarea
                    placeholder="Enter your question (max 1000 characters)"
                    className="min-h-[48px] ml-4 mr-2 p-2 w-full text-sm resize-none text-gray-900 bg-white rounded-lg border-2 outline-none ring-0 focus:outline-none focus:ring-0 focus:border-none"
                />
                <Button variant={"outline"} className="p-2 mr-4 cursor-pointer hover:text-blue-600">
                    <Send size={20} />
                </Button>
            </div>

        </div>
    )
}
