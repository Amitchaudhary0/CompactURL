import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className='h-screen  flex flex-col justify-center items-center gap-4'>
      <h2 className=' text-5xl font-extrabold'>Not Found</h2>
      <p className='text-gray-600'>Could not find requested resource</p>
      <Link className='bg-amber-800 px-2 py-1 shadow-black shadow-md text-white rounded-full active:scale-110 transition-all active:bg-amber-600 font-bold' href="/">Return Home</Link>
    </div>
  )
}