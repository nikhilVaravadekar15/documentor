import {
    Wand,
    Scale,
    Upload,
    BadgeCheck,
    FileSearch,
    Microscope,
    PocketKnife,
    BookOpenCheck,
    BadgeDollarSign,
} from 'lucide-react'

export type TUsage = {
    title?: string;
    description?: string;
    icon?: React.ReactNode;
}

export const usageSectionData: TUsage[] = [
    {
        title: "Upload documents",
        description: "Easily upload the PDF documents you'd like to chat with.",
        icon: <Upload size={20} className="hover:text-blue-500" />
    },
    {
        title: "Instant answers",
        description: "Ask questions, extract information, and summarize documents with AI.",
        icon: <Wand size={20} className="hover:text-blue-500" />
    },
    {
        title: "Sources included",
        description: "Every response is backed by sources extracted from the uploaded document.",
        icon: <BadgeCheck size={20} className="hover:text-blue-500" />
    },
]

export const usecaseSectionData: TUsage[] = [
    {
        title: "books",
        description: "Dive into a whole new reading experience! Chat with your favorite books using documentor and get ready for interactive conversations that bring the pages to life.",
        icon: <BookOpenCheck size={20} className="hover:text-blue-500" />
    },
    {
        title: "Scientific papers",
        description: "Take your research game to the next level with documentor. Collaborate effortlessly and exchange knowledge with a simple chat interface for scientific papers.",
        icon: <Microscope size={20} className="hover:text-blue-500" />
    },
    {
        title: "Financial reports",
        description: "Say goodbye to boring number crunching! Chat with your financial reports using documentor and get quick answers like a pro.",
        icon: <BadgeDollarSign size={20} className="hover:text-blue-500" />
    },
    {
        title: "Product manuals",
        description: "Confused about how to set up that gadget? Chat with your user manual using documentor and get instant, friendly assistance that'll have you up and running in no time.",
        icon: <PocketKnife size={20} className="hover:text-blue-500" />
    },
    {
        title: "Legal documents",
        description: "No more headaches trying to decipher legal jargon! With documentor, legal documents become a breeze to understand and discuss.",
        icon: <Scale size={20} className="hover:text-blue-500" />
    },
    {
        title: "Legal documents",
        description: "Boring training sessions, be gone! With documentor, training documents become interactive buddies, making learning fun, engaging, and as easy as chatting with a friend.",
        icon: <FileSearch size={20} className="hover:text-blue-500" />
    },
]
