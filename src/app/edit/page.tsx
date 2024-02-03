"use client"
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { json } from 'stream/consumers';

interface bookProp {
title: string,
date: string
}

const editPage = () => {
 
    const[title,setTitle] = useState("")
    const[date,setDate] = useState('')
    const[books,setBooks] = useState<bookProp | undefined>()

    const router = useRouter()

    const searchParam = useSearchParams()
    const bookId = searchParam.get('id')
    console.log(bookId)

    useEffect(() => {

        const getBooks = async() => {
            const response = await fetch(`/api/edit-post/${bookId}`,{
                method:"GET"
            })
            const data = await response.json()
            setBooks(data)
        }; getBooks()
    }, [bookId])

const handleEditBooks = async(event: React.FormEvent<HTMLFormElement>) => {
if(!title || !date){
   return  alert(`please fill inall the details`)
}
event.preventDefault()
console.log({title,date})
try{
const response = await fetch(`/api/edit-post/${bookId}`,{
    method:'PATCH',
    headers:{
        'Content-Type':"application/json"
    },
    body: JSON.stringify({title,date})
})
//const data = await response.json()

if(response.ok){
    alert(`book edited succesfully`)
    router.push('/')
}
}
catch(error){
    console.log("error in page.tsx while fetching")
}
}
    return (
        <div><div className=" bg-violet-500 items-center flex flex-col   ">
        <h1 className='text-2xl font-semibold pt-8'>Edit Book</h1>{
            books ? (
                <>
                <p className='text-gray-700'>{books.title}</p>
                <p className='text-gray-700'>{books.date}</p>
                </>
            ) : (
                <p>loading....</p>
            )
        }
      <form className="max-w-96 flex flex-col mx-auto items-center gap-4 mt-6" onSubmit={handleEditBooks}>
        <label className=" font-semibold mt-4">Enter Book Name:</label>
        <input className="w-full px-8 py-3 rounded-md shadow-md mt-4" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        <label className="font-semibold mt-4">Enter Date </label>
        <input className="w-full px-8 py-3 rounded-md shadow-md mt-4" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        <button className='bg-violet-800 text-white rounded-md shadow-md px-6 py-3'>Edit</button>
      </form>
      <Link href={"/"} className='text-lg font-bold underline mt-16 mb-48'>Home</Link>
    </div></div>
    )
}

export default editPage