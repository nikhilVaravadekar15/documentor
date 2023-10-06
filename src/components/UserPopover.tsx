import {
    Award
} from "lucide-react"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    Avatar,
    AvatarFallback,
    AvatarImage
} from "@/components/ui/avatar"
import { getAuthSession } from "@/lib/auth"
import Link from "next/link"
import LogoutDialog from "./ot/LogoutDialog"
import { Session } from "next-auth"


export default async function UserPopover() {
    const session: Session | null = await getAuthSession()

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                    <AvatarImage src={session?.user?.image!} />
                    <AvatarFallback>{session?.user?.name!.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
            </PopoverTrigger>
            <PopoverContent className="w-80 mr-12">
                <div className="grid gap-2">
                    <div className="py-4 flex gap-2 items-center justify-start">
                        <Avatar className="cursor-pointer">
                            <AvatarImage src={session?.user?.image!} />
                            <AvatarFallback>{session?.user?.name!.slice(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                            <span className="font-bold">{session?.user.name}</span>
                            <span>{session?.user.email}</span>
                        </div>
                    </div>
                    <Link href={"/pricing"} className="group p-2 flex gap-1 items-center rounded-md hover:bg-yellow-50">
                        <Award className="group-hover:text-orange-600" />
                        Upgrade
                    </Link>
                    <LogoutDialog />
                </div>
            </PopoverContent>
        </Popover>
    )
}
