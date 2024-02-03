import BookModel from "@/app/dbconfig/Models/Books"
import { NextResponse } from "next/server"


export async function GET(request: Request, {params}:{params: {id:string}}){
    const{id} = params

    const book =  await BookModel.findById(id)
    return NextResponse.json(book,{status:200})

    
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
    try {
        const  {id}  = params;
        const { title, date } = await request.json();

        console.log(id)

        const editedBook = await BookModel.findByIdAndUpdate( id, { title, date }, { new: true });

        // Check if book exists
        if (!editedBook) {
            return NextResponse.json({ message: 'Book not found' }, { status: 404 });
        }

        // Book successfully edited
        return NextResponse.json({ message: 'Book edited successfully', editedBook }, { status: 200 });
    } catch (error) {
        console.error('Error editing book:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}