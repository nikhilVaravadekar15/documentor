/* eslint-disable import/no-anonymous-default-export */
import {
    Document,
    RecursiveCharacterTextSplitter
} from "@pinecone-database/doc-splitter"
import { TPdfPage } from "@/types";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";


class PdfService {
    constructor() { }

    async loadPdfContent(file_name: string) {
        let pdfLoader: PDFLoader = new PDFLoader(file_name)
        const pages = await pdfLoader.load() as TPdfPage[]
        return pages
    }

    async truncateStringByBytes(text: string, bytes: number) {
        const encoder = new TextEncoder();
        return new TextDecoder().decode(encoder.encode(text).slice(0, bytes));
    }

    async prepareSplittedDocument(page: TPdfPage) {
        let { pageContent, metadata } = page
        pageContent = pageContent.replace(/\n/g, "")
        // split the page content into multiple documents
        const splitter = new RecursiveCharacterTextSplitter()
        const documents = splitter.splitDocuments([
            new Document({
                pageContent: pageContent,
                metadata: {
                    loc: {
                        pageNumber: metadata.loc.pageNumber!,
                        text: this.truncateStringByBytes(pageContent, 36000)
                    }
                }
            })
        ])

        return documents
    }

}

export default new PdfService()
