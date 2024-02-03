import BookModel from "@/app/dbconfig/Models/Books.js";
import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";

function getIdFromPathname(s: String){
let parts = s.split('/')
return parts[parts.length -1]
}

export async function DELETE(request: NextRequest, { params }: any) {
    try {
        const { id } = params;
        if (!id) {
            return NextResponse.json({ message: "Missing ID parameter" }, { status: 400 });
        }

        await BookModel.findByIdAndDelete(id);
        return NextResponse.json({ message: "Book deleted" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting book:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
