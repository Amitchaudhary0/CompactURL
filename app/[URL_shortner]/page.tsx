import { mongodbConnect } from '@/db/mongobConnect';
import urlShortnerSchema from '@/models/urlShortnerSchema';
import { notFound, redirect } from 'next/navigation';

import React from 'react'

const shortner = async({ params }: { params: { URL_shortner: string } }) => {
const siteName = params;

async function getSite (){
    await mongodbConnect();
    let shortURL = await urlShortnerSchema.findOne({ shortURL: siteName.URL_shortner })
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