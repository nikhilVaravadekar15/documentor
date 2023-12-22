
export type TFilebody = {
    id: string,
    file_key?: string,
    file_name?: string
}

export type TPdfPage = {
    pageContent: string,
    metadata: {
        loc: {
            pageNumber: number
        }
    }
}

export type TQualifyingDocumentMetadata = {
    text: string;
    pageNumber: number;
};
