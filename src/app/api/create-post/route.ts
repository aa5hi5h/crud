import { NextRequest, NextResponse } from 'next/server';
import MongoConnect from '../../dbconfig/connectmongo';
import BookModel from '../../dbconfig/Models/Books';

export async function POST(request: Request) {
    try {
        await MongoConnect();
        const { title, date } = await request.json(); // Assuming request.body contains JSON data
        const newBook = await BookModel.create({ title, date });
        return NextResponse.json({ message: "Book Created", newBook }, { status: 200 });
    } catch (error) {
        console.error('Error creating book:', error);
        return NextResponse.json({ message: "Failed to create book" }, { status: 500 });
    }
}

export async function GET(request: Request) {
    try {
        await MongoConnect();
        const booksData = await BookModel.find();
        return NextResponse.json( booksData , { status: 200 });
    } catch (error) {
        console.error('Error fetching books:', error);
        return NextResponse.json({ message: "Failed to fetch books" }, { status: 500 });
    }
}

export async function DELETE(request: Request){
    try{
     await BookModel.deleteMany({})
     return NextResponse.json({message:'Books Cleared', success:true})
    }
    catch(error)
    {console.log(error)}
}

