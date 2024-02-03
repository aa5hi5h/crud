'use client'
import Link from 'next/link';
import React from 'react'
import { useState, useEffect } from 'react';

const create = () => {
 
    const[title,setTitle] = useState("")
    const[date,setDate] = useState("")

    const handlePostBooks = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!title || !date) return alert("Please Fill all the details");
    
        console.log(`The Book ${title} is published on ${date}`);
    
        const response = await fetch('http://localhost:3000/api/create-post', {
            method: "POST",
            headers: {
                'content-type': "application/json"
            },
            body: JSON.stringify({ title, date })
        });
    
        try {
            const responseData = await response.json();
    
            if (response.ok) {
                alert("Book Created successfully");
                setTitle("");
                setDate("");
            } else {
                alert("Something went wrong: " + responseData.message);
            }
        } catch (error) {
            console.error("Error processing response:", error);
            alert("An error occurred while processing the response.");
        }
    };
    


    return(
    <div className=" bg-rose-500 items-center flex flex-col   ">
        <h1 className='text-2xl font-semibold pt-8'>Create Book</h1>
      <form className="max-w-96 flex flex-col mx-auto items-center gap-4 mt-6" onSubmit={handlePostBooks}>
        <label className=" font-semibold mt-4">Enter Book Name:</label>
        <input className="w-full px-8 py-3 rounded-md shadow-md mt-4" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        <label className="font-semibold mt-4">Enter Date </label>
        <input className="w-full px-8 py-3 rounded-md shadow-md mt-4" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        <button className='bg-rose-800 text-white rounded-md shadow-md px-6 py-3'>Create</button>
      </form>
      <Link href={"/"} className='text-lg font-bold underline mt-16 mb-48 '>Home</Link>
    </div>
    )
}

export default create;