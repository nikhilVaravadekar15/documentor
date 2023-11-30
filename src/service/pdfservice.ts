/* eslint-disable import/no-anonymous-default-export */
import {
    Document,
    RecursiveCharacterTextSplitter
} from "@pinecone-database/doc-splitter"
import { TPdfPage } from "@/types";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { truncateStringByBytes } from "@/lib/utils";

class PdfService {
    constructor() { }

    async loadPdfContent(file_name: string) {
        let pdfLoader: PDFLoader = new PDFLoader(file_name)
        const pages = await pdfLoader.load() as TPdfPage[]
        return pages
    }

    async prepareSplittedDocument(page: TPdfPage) {
        let { pageContent, metadata } = page
        pageContent = pageContent.replace(/\n/g, " ")
        // split the page content into multiple documents
        const splitter = new RecursiveCharacterTextSplitter()
        const documents = await splitter.splitDocuments([
            new Document({
                pageContent: pageContent,
                metadata: {
                    loc: {
                        pageNumber: metadata.loc.pageNumber!,
                        text: truncateStringByBytes(pageContent, 36000)
                    }
                }
            })
        ])
        return documents
    }

}

export default new PdfService()
