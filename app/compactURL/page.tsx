'use client'
import { ShortnerContext } from "@/Store/store";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { MdKeyboardDoubleArrowRight, MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { LuCopy, LuCopyCheck } from "react-icons/lu";
import { LiaCopy } from "react-icons/lia";
import { toast, Bounce } from 'react-toastify';

export default function CompactURL() {
  const [toggle, setToggle] = useState(true);
  const [anim, setAnim] = useState(false);
  const [copied, setCopied] = useState<string>("");

  interface CopyToClipboardProps {
    e: React.MouseEvent<HTMLButtonElement>;
    text: string;
  }

  function copyToClipboard({ e, text }: CopyToClipboardProps) {
    e.stopPropagation();
    e.preventDefault();
    navigator.clipboard.writeText(text).then(function () {
      setCopied(text.split("/").at(-1) as string);
      toast('Copied to Clipboard', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      setTimeout(() => {
        setCopied("");
      }, 3000);
      //apply toster in the future.
    }, function (err) {
      console.error('Async: Could not copy text: ', err);
    });
  }

  const [animationClass, setAnimationClass] = useState('opacity-0');

  useEffect(() => {
    getShortURL();
    setTimeout(() => {
      setAnimationClass('opacity-100 transition-opacity duration-1000');
    }, 300);

  }, []);



  type ResponseData = {
    success: boolean,
    message: string,
    URL: string,
    shortURL: string
  }

  type FetchedData = {
    success: boolean,
    message: string,
    find: [{ __id: string, URL: string, shortURL: string, _v: string }]
  }
  const { URL, shortURL, dispatch } = useContext(ShortnerContext);
  const [data, setdata] = useState<ResponseData>({
    success: false,
    message: "",
    URL: "",
    shortURL: ""
  });

  const [allData, setAllData] = useState<FetchedData>({
    success: false,
    message: "",
    find: [{ __id: "", URL: "", shortURL: "", _v: "" }]
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

    const requestOptions: RequestInit = {
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
    dispatch({ type: "SET_URL", payload: { URL: "https://", shortURL: "" } })
    setAnim(true);
    navigator.clipboard.writeText(window.location.origin + "/" + shortURL);
    toast(`URL copied`, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
    setTimeout(() => {
      setAnim(false);
    }, );
  }


  function getShortURL() {
    Promise.all([
      fetch("/api/shortner")
    ])
      .then(([response]) => response.json())
      .then(result => setAllData(result))
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
              <button className="bg-amber-800 p-2 rounded-full w-9 h-9 absolute right-2 flex justify-center items-center active:scale-110 transition-all text-white active:bg-amber-600 font-bold disabled:cursor-not-allowed"
              disabled={shortURL.length < 1}
                onClick={handleGenerateShortURL}
              ><span>Go</span></button>
            </div>
            <Link target="" href={`${data.shortURL}`} className="hover:bg-amber-700 rounded-md bg-amber-500 cursor-pointer transition-all ease-in-out duration-300 hover:text-white text-black">
              {data.URL ? <div className="w-full h-full p-2 flex justify-evenly items-center">{data.message}: <div className="font-bold">{data.shortURL}</div> -- {data.URL} {<button onClick={(e) => copyToClipboard({ e, text: window.location.origin + "/" + shortURL })}><LiaCopy size={25}  /></button>}</div> : <div className="w-full h-full p-2 cursor-not-allowed">Generate URL</div>} 
            </Link>

          </div>
          <section className={`fixed ${toggle ? "right-[-175px] sm:right-[-19%] " : "right-0 visible"}  py-4 pl-4 w-[180px] sm:w-1/5 bg-amber-300 text-white h-4/5 rounded-l-3xl transition-all  duration-1000 ease-in-out `}>
            <button className={`absolute top-[50%] left-[-14%] bg-amber-700 hover:bg-amber-600 rounded-full ${anim ? "animate-bounceLeft" : ""}`} onClick={() => setToggle(!toggle)}>{!toggle ? <MdKeyboardDoubleArrowRight size={30} /> : <MdKeyboardDoubleArrowLeft size={30} />}</button>
            <div className={`flex flex-col gap-2 h-full overflow-y-auto overflow-x-hidden`}>

              {allData? allData.find.map((item, index) => {
                return <Link target="_blank" href={"/" + item.shortURL} key={index} className="flex bg-amber-700 rounded-l-full p-2 px-4 hover:bg-amber-500 cursor-pointer justify-between items-center gap-3 transition-all ease-in-out duration-300 relative">
                  <p className="text-xs sm:text-sm font-bold">{(item.shortURL).toUpperCase()}</p>
                  <div className=" flex gap-2 absolute sm:right-5 right-1 ">
                    <button onClick={(e) => copyToClipboard({ e, text: window.location.origin + "/" + item.shortURL })}>{copied == item.shortURL ? <LuCopyCheck size={22}/> : <LuCopy size={22}/>}</button>
                    {/* <button>copy url</button> */}
                  </div>
                  {/* <p className="text-xs hidden sm:block">{item.URL}</p> */}
                </Link>
              }):<div className="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
              <div className="animate-pulse flex space-x-4">
                <div className="rounded-full bg-slate-700 h-10 w-10"></div>
                <div className="flex-1 space-y-6 py-1">
                  <div className="h-2 bg-slate-700 rounded"></div>
                  <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                      <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                    </div>
                    <div className="h-2 bg-slate-700 rounded"></div>
                  </div>
                </div>
              </div>
            </div>}
            </div>
          </section>
        </main>
  );
}
