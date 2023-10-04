import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import Link from "next/link"
import { Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import LoadingSpinner from "./LoadingSpinner"


type TOpencardProps = {
    id: string
    title: string;
    created_at?: string;
    updated_at?: string;
}

export default function Opencard({ id, title, created_at, updated_at }: TOpencardProps) {
    return (
        <Card className="w-fit h-fit border shadow-sm cursor-pointer hover:shadow-lg hover:border-blue-200">
            <CardHeader className="w-[256px]">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild className="break-words">
                            <Link href={`/documents/${id}`} className="hover:text-blue-900">
                                <CardTitle className="text-lg">
                                    {title}
                                </CardTitle>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p className="p-2">{title}</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </CardHeader>
            <CardContent>
                <div className="flex items-center justify-between">
                    <span className="text-gray-500">
                        {updated_at ? updated_at : created_at}
                    </span>
                    <Button variant="outline" className="rounded-full bg-red-100 hover:bg-red-200">
                        <Trash2 color="red" />
                        {/* <LoadingSpinner color="red" classname="h-6 w-6" /> */}
                    </Button>
                </div>
            </CardContent>
        </Card >

    )
}
