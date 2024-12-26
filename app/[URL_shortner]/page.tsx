import { mongodbConnect } from '@/db/mongobConnect';
import urlShortnerSchema from '@/models/urlShortnerSchema';
import { notFound, redirect } from 'next/navigation';

import React from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Compact URL | Shortner Service",
  description: "A URL shortner service to shorten your long URL's to compact URL's with ease. Try now!",
};

const shortner = async({ params }: { params: Promise<{ URL_shortner: string }> }) => {
const siteName:{ URL_shortner: string } = await params;

async function getSite (){
    await mongodbConnect();
    const shortURL = await urlShortnerSchema.findOne({ shortURL: siteName.URL_shortner })
    console.log(shortURL)
    if(!shortURL){
     return notFound();
    }else{
     redirect(shortURL.URL) 
    }
}

await getSite();

  return (
    <div className='content-center text-black text-9xl h-screen'>
      {siteName.URL_shortner}
    </div>
  )
}

export default shortner
