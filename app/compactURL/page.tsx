'use client'
import { ShortnerContext } from "@/Store/store";
import { set } from "mongoose";
import Link from "next/link";
import { use, useContext, useEffect, useState } from "react";
import { MdKeyboardDoubleArrowRight, MdKeyboardDoubleArrowLeft  } from "react-icons/md";


export default function CompactURL() {
  const [toggle, setToggle] = useState(true);
  const [anim, setAnim] = useState(false);

        const [animationClass, setAnimationClass] = useState('opacity-0');

      useEffect(() => {
        getShortURL();
        setTimeout(() => {
          setAnimationClass('opacity-100 transition-opacity duration-1000');
        }, 300);

      }, []);

      

  type ResponseData ={
    success:boolean,
    message:string,
    URL:string,
    shortURL:string
  }

  type FetchedData ={
    success:boolean,
    message:string,
    find:[{__id:string, URL:string, shortURL:string, _v:string}]
  }
  const { URL, shortURL, dispatch } = useContext(ShortnerContext);
  const [data, setdata] = useState<ResponseData>({
    success:false,
    message:"",
    URL:"",
    shortURL:""
  });

  const [allData, setAllData] = useState<FetchedData>({
    success:false,
    message:"",
    find:[{__id:"", URL:"", shortURL:"", _v:""}]
  });

  const handleChangeURL = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "URL") {
      dispatch({ type: "SET_URL", payload: { URL: value, shortURL } })
    } else {
      dispatch({ type: "SET_URL", payload: { URL, shortURL: value } })
    }
  };

  const handleGenerateShortURL = () => {
    
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      "URL": URL,
      "shortURL": shortURL
    });

    const requestOptions : RequestInit = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    Promise.all([
    fetch("/api/shortner", requestOptions)])
      .then(([response]) => response.json())
      .then((result) => {
        setdata(result);
        getShortURL(); 
      })
      .catch(error => console.log('error', error));
      dispatch({ type: "SET_URL", payload: { URL: "https://", shortURL:"" } })
      setAnim(true);
      setTimeout(() => {
        setAnim(false);
      }, 3000);
  }


   function getShortURL() {
    Promise.all([
      fetch("/api/shortner")
    ])
    .then(([response]) => response.json())
    .then(result=>setAllData(result))
  }


  return (
    <main className={`flex z-10 justify-center items-center h-screen ${animationClass} relative overflow-hidden `}>
      <div className="container m-2 w-full bg-amber-300 h-1/2 content-center text-center p-4 rounded-md flex flex-col justify-evenly sm:w-1/2">
        <h1 className="text-4xl font-bold">Url Shortner</h1>
        <input className="w-full p-3 border border-black rounded-full"
          type="text"
          placeholder="Enter URL"
          name="URL"
          value={URL}
          onChange={handleChangeURL}
        />
        <div className="w-full shortner relative  flex items-center">
          <input className="w-full p-3 border border-black rounded-full"
            type="text"
            placeholder="Enter preffered URL"
            name="shortURL"
            value={shortURL}
            onChange={handleChangeURL}
          />
          <button className="bg-amber-800 p-2 rounded-full w-9 h-9 absolute right-2 flex justify-center items-center active:scale-110 transition-all text-white active:bg-amber-600 font-bold"
            onClick={handleGenerateShortURL}
          ><span>Go</span></button>
        </div>
        <Link target="" href={`${data.shortURL}`}>
        {data.URL?`${data.message} -- ${data.shortURL} -- ${data.URL}`:""}
        </Link>
        
      </div>
<section className={`absolute ${toggle?"right-[-19%]":"right-0 visible"}  py-4 pl-4  sm:w-1/5 bg-amber-300 text-white h-4/5 rounded-l-3xl transition-all  duration-1000 ease-in-out `}>
<button className={`absolute top-[50%] left-[-14%] bg-amber-700 hover:bg-amber-600 rounded-full ${anim?"animate-bounceLeft":""}`} onClick={()=>setToggle(!toggle)}>{!toggle?<MdKeyboardDoubleArrowRight size={30}/>: <MdKeyboardDoubleArrowLeft size={30}/>}</button>
<div className="flex flex-col gap-2 h-full overflow-y-auto">
  {allData.find.map((item, index) => {
    return <Link target="_blank" href={item.URL} key={index} className="flex bg-amber-700 rounded-l-full p-2 hover:bg-amber-500 cursor-pointer justify-between items-center">
      <p className="text-xs hidden sm:block">{item.URL}</p>
      <p className="text-xs sm:text-sm font-bold">{(item.shortURL).toUpperCase()}</p>
    </Link>
  })}
</div>
</section>
    </main>
  );
}
