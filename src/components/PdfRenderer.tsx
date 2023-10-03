"use client"

import {
    Loader2,
    Scaling,
    RotateCw,
    ChevronUp,
    ChevronDown,
} from "lucide-react"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState } from "react"
// react-pdf
import { Document, Page, pdfjs } from "react-pdf"
import "react-pdf/dist/Page/TextLayer.css"
import "react-pdf/dist/Page/AnnotationLayer.css"
import { z } from "zod"
import { cn } from "@/lib/utils"
import { useFormik } from 'formik';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { useResizeDetector } from "react-resize-detector"


pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`

interface PdfRendererProps {
    url: string
}


export default function PdfRenderer({ url }: PdfRendererProps) {
    const { toast } = useToast()
    const { width, ref } = useResizeDetector()
    const [totalPageNumber, setTotalPageNumber] = useState<number>()
    const [currentPage, setCurrPage] = useState<number>(1)
    const [scale, setScale] = useState<number>(1)
    const [rotation, setRotation] = useState<number>(0)
    const [renderedScale, setRenderedScale] = useState<number | null>(null)

    const isLoading = renderedScale !== scale

    const CustomPageValidator = z.object({
        page: z.number()
    })

    type TCustomPageValidator = z.infer<
        typeof CustomPageValidator
    >

    const formik = useFormik<TCustomPageValidator>({
        initialValues: {
            page: 1
        },
        validate: (values: TCustomPageValidator) => {
            let errors: Partial<{ page: string }> = {};

            if (values.page < 1) {
                errors.page = "Page number must be greater than 0"
            }
            if (values.page > totalPageNumber!) {
                errors.page = `Page number must be less than ${totalPageNumber!}`
            }
            return errors
        },
        onSubmit: (values: TCustomPageValidator) => {
            setCurrPage(values.page)
        },
    });

    return (
        <div className="h-full w-full bg-white rounded-md shadow flex flex-col items-center">
            <div className="h-[10%] w-full border-b border-zinc-200 flex items-center justify-between px-2">
                <div className="flex items-center gap-1.5">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    className="h-9"
                                    variant={"outline"}
                                    aria-label="next-page"
                                    disabled={
                                        totalPageNumber === undefined ||
                                        currentPage === totalPageNumber
                                    }
                                    onClick={() => {
                                        setCurrPage((prev) =>
                                            prev + 1 > totalPageNumber! ? totalPageNumber! : prev + 1
                                        )
                                    }}
                                >
                                    <ChevronDown className="h-4 w-4" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Next page</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <div className="flex items-center gap-1.5">
                        <Input
                            min={1}
                            name="page"
                            type="number"
                            max={totalPageNumber}
                            defaultValue={currentPage}
                            onChange={formik.handleChange}
                            className={cn(
                                "focus-visible:ring-0 w-24 h-9",
                                formik.errors.page && formik.touched.page && "focus-visible:ring-red-500 focus-visible:border-red-500"
                            )}
                            onKeyDown={(event: any) => {
                                if (event.key === "Enter") {
                                    formik.handleSubmit()
                                }
                            }}
                        />
                        <p className="text-zinc-700 text-sm space-x-1">
                            <span>/</span>
                            <span>{totalPageNumber ?? "x"}</span>
                        </p>
                    </div>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    className="h-9"
                                    variant={"outline"}
                                    aria-label="previous-page"
                                    disabled={currentPage <= 1}
                                    onClick={() => {
                                        setCurrPage((prev) =>
                                            prev - 1 > 1 ? prev - 1 : 1
                                        )
                                    }}
                                >
                                    <ChevronUp className="h-4 w-4" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Previous page</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
                <div className="space-x-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                className="gap-1.5 h-9"
                                aria-label="zoom"
                                variant={"outline"}
                            >
                                <Scaling className="h-4 w-4" />
                                {scale * 100}%
                                <ChevronDown className="h-3 w-3 opacity-50" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem
                                onSelect={() => setScale(0.5)}
                            >
                                50%
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onSelect={() => setScale(1)}
                            >
                                100%
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onSelect={() => setScale(1.25)}
                            >
                                125%
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onSelect={() => setScale(1.5)}
                            >
                                150%
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onSelect={() => setScale(1.75)}
                            >
                                175%
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onSelect={() => setScale(2)}
                            >
                                200%
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Button
                        className="h-9"
                        variant={"outline"}
                        onClick={() => setRotation((prev: number) => {
                            return prev + 90 === 360 ? 0 : prev + 90
                        })}
                    >
                        <RotateCw className="h-4 w-4" />
                    </Button>
                </div>
            </div>
            <div className="h-[90%] w-full flex-1 max-h-screen overflow-scroll">
                <div
                    className="max-h-[calc(100vh-10rem)]">
                    <div ref={ref}>
                        <Document
                            file={url}
                            className="max-h-full"
                            onLoadSuccess={({ numPages }) =>
                                setTotalPageNumber(numPages)
                            }
                            onLoadError={() => {
                                toast({
                                    title: "Error loading PDF",
                                    description: "Please try again later",
                                    variant: "destructive",
                                })
                            }}
                            loading={
                                <div className="flex justify-center">
                                    <Loader2 color="rgb(96,165,250)" className="my-32 h-12 w-12 animate-spin" />
                                </div>
                            }
                        >
                            {
                                isLoading && renderedScale ? (
                                    <Page
                                        width={width ? width : 1}
                                        pageNumber={currentPage}
                                        scale={scale}
                                        rotate={rotation}
                                        key={"@" + renderedScale}
                                    />
                                ) : null
                            }
                            <Page
                                scale={scale}
                                rotate={rotation}
                                key={"@" + scale}
                                pageNumber={currentPage}
                                width={width ? width : 1}
                                className={cn(isLoading ? "hidden" : "")}
                                onRenderSuccess={() =>
                                    setRenderedScale(scale)
                                }
                                loading={
                                    <div className="flex justify-center">
                                        <Loader2 color="rgb(96,165,250)" className="my-32 h-6 w-6 animate-spin" />
                                    </div>
                                }
                            />
                        </Document>
                    </div>
                </div>
            </div>
        </div>
    )
}
