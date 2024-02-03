"use client"

import { useState, useEffect, cache } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Books {
  _id: string;
  title: string;
  date: string;
}



export default function Home() {

  const [books,setBooks] = useState<Books[]>([])
  const router = useRouter()

  useEffect(() => {
    const getBooks = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/create-post');
        const data = await response.json();
        if (Array.isArray(data)) { // Check if the data is an array
          setBooks(data);
        } else {
          console.error('Data is not an array:', data);
        }
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    getBooks();
  }, []);

  const handleEdit = async (book: Books) => {
    try {
       router.push(`/edit?id=${book._id}`);
    } catch (error) {
      console.error('Error navigating to edit page:', error);
    }
  };
  

 const handleDelete = async(book: Books) =>  {
  try {
      if (!book._id) {
          console.error('Book ID is undefined');
          return;
      }
      console.log(book._id)

      const response = await fetch(`/api/delete-post/${book._id}`, {
          method: "DELETE"
      });

      const data = await response.json()

      if (response.ok) {
          alert('Book Deleted successfully');
          setBooks(books.filter((b: Books) => b._id !== data._id));
          window.location.reload()
      } else {
          console.error('Failed to delete book');
      }
  } catch (error) {
      console.error('Error deleting book:', error);
  }
}


  const clearBooks = async() => {
    const confirmed = confirm('do you want to clear the books field')
    if(confirmed){
    const res = await fetch('/api/create-post',{
      method:"DELETE"
    })
    if(res.ok){
      setBooks([])
      window.location.reload()
    }
    
  }
}
  return (
    <>
      <div className="flex justify-between max-w-[750px] mx-auto mt-4 ">
        <h4 className='font-semibold text-2xl'>Book Place</h4>
        <Link href={"/create"} className="underline font-semibold text-2xl">Add Books</Link>
        <button className='font-semibold text-2xl px-4 py-2 bg-slate-700 text-white ' onClick={clearBooks}>Clear books</button>
      </div>
      <ul className='flex flex-col items-center '>
      {books.length === 0 && <p className='test-2xl font-bold '>Loading....</p> }
      {books.map((book: Books , index:number) => (
        <div className="text-2xl max-w-xl flex items-center bg-slate-600 rounded-md shadow-md  gap-4 mt-4" >
          <li className='font-bold' key={book._id}><h3 className="text-xl text-white px-6 py-3 mt-4">{book.title}</h3></li>
          <li><h3 className="text-xl  text-white   mt-4">{book.date}</h3></li>
          <div className='flex gap-4'>
          <button className='text-2xl font-semibold bg-slate-400 hover:bg-slate-800 py-2 px-4 rounded-md shadow-sm  ' onClick={() => handleEdit(book)}>edit</button>
          <button className='text-2xl font-semibold bg-slate-400 hover:bg-slate-800 py-2 px-4 rounded-md shadow-sm mx-4' onClick={() => handleDelete(book)}
          >delete</button>
        </div>
        </div>
      ))
}
</ul>
    </>
  );
      }
