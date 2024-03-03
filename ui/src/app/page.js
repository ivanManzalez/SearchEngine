'use client';
import {useEffect, useState} from 'react';
import {useSearch} from './search';
import Link from 'next/link';
import { motion } from "framer-motion"
/////// SEARCH /////////////////////////////////////////////// 
const SearchTitle = ({title, subtitle}) => {
  return(
    <>
    <motion.div 
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="text-indigo-900 text-5xl font-xl font-mono pb-2 md:text-left lg:text-center w-full">{title}</motion.div>
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.5 }}
      className="text-indigo-900 text-md font-medium font-mono pb-2 md:text-left lg:text-center w-full">{subtitle}</motion.div>
    </>
  );
};
const SearchBar = ({searchQuery, handleSearchQuery, handleSearch}) => {
  const [outlineStyle, setOutlineStyle] = useState(" ");
  const handleKeyDown = (e) => {
    if(e.key === 'Enter'){
      handleSearch();
    }
  }

  return(
    <div className={"outline outline-2 outline-indigo-900/[0.6] flex flex-row justify-between items-center w-full  rounded-full "}>
      <input value={searchQuery} onKeyDown={handleKeyDown} onChange={handleSearchQuery} type="text" className="outline-none bg-transparent transition-all ease-in-out text-indigo-900 text-center text-2xl font-extralight font-sans w-full h-12  duration-1000 "></input>
      <button onClick={handleSearch}  className="font-semibold text-emerald-900 hover:text-white  hover:bg-emerald-700 active:bg-emerald-900/[0.8] bg-transparent rounded-full w-12 h-12"> Go </button>
    </div>
    );
};

const SearchContainer = ({children}) => {
  return(
    <div className="pt-32 sticky w-full  p-2">
      <div className=" w-full flex flex-col items-center ">
        {children}
      </div>
    </div>
  );
};

////////////////////////////////////////////////////////////
function articleSummary (snippet, MAX_SUMMARY) {
  const SNIPPET_LENGTH = snippet.length;
  const lastChar = snippet.charAt(SNIPPET_LENGTH - 1);
  const summaryLength = Math.min(MAX_SUMMARY, SNIPPET_LENGTH);

  if(snippet.length >= summaryLength && lastChar == "."){
    return snippet.substring(0, summaryLength)+"...";
  }
  return snippet;
};

const ResultCard = ({result}) => {
  const ARTICLE_ROUTE = "/article/";
  const MAX_SUMMARY = 147;
  var summary = articleSummary(result.snippet, MAX_SUMMARY);
// hover:bg-lime-900/[0.6]
  return(
    <Link href={ARTICLE_ROUTE+result.metadata.id} className="place-content-around ">
      <div className="p-4 hover:bg-indigo-500/[0.2]  outline-2 outline-indigo-900/[0.7] rounded-md   ">
        <p className="text-indigo-800 text-xl">{result.metadata.headline}</p>
        <p className="text-indigo-900/[0.5] text-sm">{result.metadata.date}</p>
        <h6 className="text-indigo-200 text-md">{summary}</h6>
      </div>
    </Link>
  );
};

const ResultsContainer = ({displayQuery, children}) => {
  return(
    <div className="h-auto w-full rounded-md mb-10 place-content-around" >
      <p className="text-indigo-950 rounded-t-md "> Results for <i>{displayQuery}</i> ({children.length}) </p>
      {children}
    </div> 
  );
};

////////////////////////////////////////////////////////////
export default function Home() {
  const [subtitle, setSubtitle] = useState("How can I help you? 🕵️");
  const [searchQuery, setSearchQuery] = useState("");
  const [displayQuery, setDisplayQuery] = useState("");
  const [results, setResults] = useState([]);
  const LAST_RESULTS = "lastResults";
  const LAST_QUERY = "lastQuery";
  
  // Refactor as useSessionStorage() ?
  useEffect(()=>{
    const prevResults = sessionStorage.getItem(LAST_RESULTS);
    const prevQuery = sessionStorage.getItem(LAST_QUERY);
    if(prevResults){
      setResults(JSON.parse(prevResults));
      setDisplayQuery(JSON.parse(prevQuery));
    }
  },[])
  //////////////////////////////////// 

  const handleSearch = async (e) =>{
    console.log("Searching for: ",searchQuery)
    if(searchQuery !== ""){
      const queryResp = await useSearch(searchQuery)
      .catch((error)=>{
        console.error(error);
        setSubtitle("😵‍💫 Sorry about that, looks like something went wrong😵! Try again later! ")
        return [{headline: error.message}]
      })
      console.log(queryResp, queryResp.length);
      if(queryResp.length < 1){
        setSubtitle(`Sorry I couldn't find anything related to ${searchQuery} 🧐 `)
      }else if(!queryResp[0].metadata){
        console.error(queryResp[0].headline);
        setSubtitle("😵‍💫 Sorry about that, looks like something went wrong😵! Try again later! ")
      }else{
        setResults(queryResp);
        setDisplayQuery(searchQuery);
        setSubtitle("Here's what I could find 🥸")
        // Refactor as useSessionStorage() ?
        sessionStorage.setItem(LAST_RESULTS, JSON.stringify(queryResp));
        sessionStorage.setItem(LAST_QUERY, JSON.stringify(searchQuery));
        ////////////////////////////////////
      }
      
    }else{
      setDisplayQuery("");
      setResults([]);
      sessionStorage.setItem(LAST_RESULTS, "");
      sessionStorage.setItem(LAST_QUERY, "");
    };
  };
  
  const handleSearchQuery = (e) => {
    setSearchQuery(e.target.value)
    handleSubtitle(e.target.value.split(" ").filter(word => word !== '').length);
  };

  const handleSubtitle = (searchQLength) => {
    const SM = 4;
    const MD = 7;
    const LG = 11;
    const XL = 15;

    if(searchQLength >= SM && searchQLength <= MD){
      setSubtitle("I'll see what I can do 👁️")
    }else if(searchQLength >= MD && searchQLength <= LG){
      setSubtitle("Now you asking for too much 😡 ")
    }else if(searchQLength > LG){
      setSubtitle("😴 🛏️")
    }else{
      setSubtitle("How can I help you? 🕵️")
    }
  }  

// bg-gradient-to-t from-red-900 from-1% to-yellow-800 to-40% 
  // bg-[#854e18]
  return(
    <main className=" bg-indigo-400  flex min-h-screen flex-col items-center align-middle px-8 " >
      
      <div className="sticky text-indigo-900 text-lg font-medium w-full flex justify-between top-0">
        <a href="https://github.com/ivanManzalez/SearchEngine"><button className="font-base" ><i>src</i></button></a>
        <a href="/about"><button className="font-base" ><i>about</i></button></a>
      </div>

      <div className="sticky flex flex-col flex-1 w-full ">
      <SearchContainer>
        <SearchTitle title={"CBC Finder \\(^Д^)/"} subtitle={subtitle}/>
        <SearchBar searchQuery={searchQuery} handleSearchQuery={handleSearchQuery} handleSearch={handleSearch} />
      </SearchContainer>

      { displayQuery &&
      <ResultsContainer displayQuery={displayQuery}>
        { results && results.map((result, id) => <ResultCard key={id} result={result}/>)}
      </ResultsContainer>
      }
      </div>
      

    </main>
  );
}

