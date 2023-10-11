import { NextRequest, NextResponse } from "next/server";

export async function GET(nextRequest: NextRequest, nextResponse: NextResponse) {

    // then read file again from s3
    // then read pdf content (PDFloader)
    // then create vector embedding 

    return new NextResponse(
        JSON.stringify({
            message: "lets create vectors",
        }),
        {
            status: 200,
        }
    );
}
