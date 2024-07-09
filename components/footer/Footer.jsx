"use client"
import Link from 'next/link'
import React from 'react'
import { FaLinkedin, FaTwitter, FaWhatsapp } from 'react-icons/fa'
import { ImLocation } from 'react-icons/im'
import { IoCall } from 'react-icons/io5'
import { LuInstagram, LuLinkedin } from 'react-icons/lu'
import { MdMail } from 'react-icons/md'


const Footer = () => {
  return (
    <footer className='bg-neutral-900/50 w-full h-auto mt-5'>
        <div className='h-auto py-10 w-full grid items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 px-10'>
            <div className='w-full pb-6 h-full flex items-center max-md:mt-3 md:border-b border-neutral-700'>
                <div className='h-full w-[80px] flex items-center justify-start'>
                    <ImLocation className='text-rose-500' size={30}/>
                </div>
                <div>
                    <h1 className='text-lg font-extrabold'>Find us</h1>
                    <p className='text-sm text-neutral-400'>Lucknow, Uttar Pradesh</p>
                </div>
            </div>
            <div className='w-full pb-6 h-full flex items-center max-md:mt-3 md:border-b border-neutral-700'>
                <div className='h-full w-[80px] flex items-center justify-start'>
                    <IoCall className='text-rose-500' size={30}/>
                </div>
                <div>
                    <h1 className='text-lg font-extrabold'>Call us</h1>
                    <p className='text-sm text-neutral-400'>+91 9336025818</p>
                </div>
            </div>
            <div className='w-full pb-6 h-full flex items-center max-md:mt-3 md:border-b border-neutral-700'>
                <div className='h-full w-[80px] flex items-center flex-shrink-0 justify-start'>
                    <MdMail className='text-rose-500' size={30}/>
                </div>
                <div>
                    <h1 className='text-lg font-extrabold'>Mail us</h1>
                    <p className='text-sm text-neutral-400 truncate'>mdnehalakhlaque43@gmail.com</p>
                </div>
            </div>
        </div>

        <div className='h-auto w-full grid items-center gap-x-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-10'>


            <div className='min-h-72 w-full pb-6'>
                <img className='relative -left-5 -top-3' width={150} src="/images/LOGO.png"/>
                <p className='text-2xl -mt-8'>Musix</p>
                <br/>
                <p className='text-[15px] text-neutral-400'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit ipsam, dolorem animi accusantium similique assumenda quo, temporibus soluta magni fugiat a ut delectus aperiam sunt amet id cupiditate quia. Laborum.</p>
            </div>


            <div className='min-h-72 w-full'>
                <h1 className='text-xl font-bold'>Useful links</h1>
                <br />
                <div className='w-full grid grid-cols-2 h-full'>
                    <div className='h-full w-full flex flex-col gap-3'>
                        <Link className='hover:underline hover:text-rose-500 transition text-neutral-400 duration-200' href="/">Home</Link>
                        <Link className='hover:underline hover:text-rose-500 transition text-neutral-400 duration-200' href="/services">Services</Link>
                        <Link className='hover:underline hover:text-rose-500 transition text-neutral-400 duration-200' href="/contact">Contact</Link>
                        <Link className='hover:underline hover:text-rose-500 transition text-neutral-400 duration-200' href="/pricing">Pricing</Link>
                        <Link className='hover:underline hover:text-rose-500 transition text-neutral-400 duration-200' href="/subscription">Subscription</Link>
                    </div>
                    <div className='h-full w-full flex flex-col gap-3'>
                        <Link className='hover:underline hover:text-rose-500 transition text-neutral-400 duration-200' href="/about">About</Link>
                        <Link className='hover:underline hover:text-rose-500 transition text-neutral-400 duration-200' href="/portfolio">Portfolio</Link>
                        <Link className='hover:underline hover:text-rose-500 transition text-neutral-400 duration-200' href="/aboutus">About us</Link>
                        <Link className='hover:underline hover:text-rose-500 transition text-neutral-400 duration-200' href="/feedback">Feedback</Link>
                        <Link className='hover:underline hover:text-rose-500 transition text-neutral-400 duration-200' href="/careers">Careers</Link>
                    </div>
                </div>
            </div>


            <div className='md:h-72 h-auto w-full flex flex-col justify-start pb-6'>
                <h1 className='text-xl font-bold'>Follow us</h1>
                <br />
                <div className='flex gap-y-3 w-full'>
                    <LuInstagram className='text-white/80 hover:text-rose-500 mr-4 cursor-pointer' size={25}/>
                    <FaLinkedin className='text-white/80 hover:text-rose-500 mr-4 cursor-pointer' size={25}/>
                    <FaWhatsapp className='text-white/80 hover:text-rose-500 mr-4 cursor-pointer' size={25}/>
                    <FaTwitter className='text-white/80 hover:text-rose-500 mr-4 cursor-pointer' size={25}/>
                </div>
            </div>
        </div>
        <div className='bg-neutral-800/70 h-14 text-neutral-400 flex justify-center items-center'>
            <p>&copy; Md Nehal Akhlaque 2024</p>
        </div>
    </footer>
  )
}

export default Footer