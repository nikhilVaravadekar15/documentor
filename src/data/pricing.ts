export const PLANS = [
    {
        name: "Standard",
        slug: "standard",
        quota: 10,
        pagesPerPdf: 5,
        price: {
            amount: 0,
            priceIds: {
                test: "",
                production: "",
            },
        },
    },
    {
        name: "Pro",
        slug: "pro",
        quota: 50,
        pagesPerPdf: 25,
        price: {
            amount: 9,
            priceIds: {
                test: "price_1NuEwTA19umTXGu8MeS3hN8L",
                production: "",
            },
        },
    },
]


export const pricingPlansData = [
    {
        title: "Standard",
        tagline: "For small side projects.",
        details: PLANS.find((p) => p.slug === "standard")!,
        features: [
            {
                text: "15 pages per PDF",
                footnote: "The maximum amount of pages per PDF-file.",
            },
            {
                text: "10MB file size limit",
                footnote: "The maximum file size of a single PDF file.",
            },
            {
                text: "Mobile-friendly interface",
            },
            {
                text: "Higher-quality responses",
                footnote: "Better algorithmic responses for enhanced content quality",
            },
            {
                text: "Standard support",
            },
        ],
    },
    {
        title: "Pro",
        tagline: "For larger projects with higher needs.",
        details: PLANS.find((p) => p.slug === "pro")!,
        features: [
            {
                text: "Unlimited pages per PDF",
                footnote: "The maximum amount of pages per PDF-file.",
            },
            {
                text: "200MB file size limit",
                footnote: "The maximum file size of a single PDF file.",
            },
            {
                text: "Mobile-friendly interface",
            },
            {
                text: "Higher-quality responses",
                footnote: "Better algorithmic responses for enhanced content quality",
            },
            {
                text: "Priority support",
            },
        ],
    },
]
