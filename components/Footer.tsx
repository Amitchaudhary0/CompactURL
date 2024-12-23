import React from 'react'

const Footer = () => {
  return (
 <footer className="fixed z-10 bottom-0 bg-amber-400 opacity-90 w-full p-2 border-t">
 <p className="text-center text-gray-500">
   &copy; {new Date().getFullYear()} CompactURL. All rights reserved.
 </p>
</footer>
  )
}

export default Footer
