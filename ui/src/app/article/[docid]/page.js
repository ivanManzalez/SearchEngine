"use client";
import { useEffect, useState } from "react";
// import { useLocalStorage } from "@/app/hooks"
import Link from 'next/link'
import beautify from 'xml-beautifier';
import XMLViewer from 'react-xml-viewer'
////////////////////////////////////////////////////////////
export default function Article({ params }) {
    const [article, setArticle] = useState("");
    const [parsedArticle, setParsedArticle] = useState("");
    
    useEffect(()=>{
        const article = getCachedArticleContentbyId(params.docid);
        setArticle(article);
        setParsedArticle(parseXml(article.content));

    },[]);
    // bg-gradient-to-t from-red-900 from-1% to-yellow-800 to-40% 
    return(
        <div className="flex flex-col place-content-center px-20 pb-24 pt-4 bg-indigo-400  min-h-screen">
            <Link href="/" className="text-indigo-900 hover:underline decoration-1 mb-4 text-sm"><i>Back</i></Link>
            {article ?( 
            <>
            <ArticleHeading article={article}/>
            <ArticleContainer>
                <ArticleContent paragraphs={parsedArticle.text} /> 
            </ArticleContainer>
            </>):
            <>Loading ...</>
            }
        </div>
    )
}
////////////////////////////////////////////////////////////
const ArticleHeading = ({article}) => {
    return(
    <>
        <div className="text-3xl text-indigo-900 mb-4">
            {article.headline}
            <p className="text-xs inline ml-2 align-middle text-indigo-900/[0.5]">({article.docno})</p>
        </div>
        <div className="text-lg text-indigo-900/[0.5] italic"> {article.date}</div>
    </>
    )
}

const ArticleContainer = ({children}) => {
    return(
    <div className="flex flex-col items-left justify-center w-full rounded-lg p-4">
        {children}
    </div>
    )
}
const ArticleContent = ({paragraphs}) => {
    return(
    <>
    {paragraphs && paragraphs.map((paragraph, id) => <p key={id} className="mb-5 text-indigo-900 ">{paragraph}</p>)}
    </>)
}

const DisplayXmlContent = ({content}) => {
    const customTheme = {
        "attributeKeyColor": "#FF0000",
        "attributeValueColor": "#000FF",
        "commentColor":"333333",
        "fontFamily":"sans-serif",
        "separatorColor":"#FF00AA",
        "tagColor":"#6B3FAA",
        "textColor":"#AABBCC",
      }
    
    return(
        <XMLViewer xml={beautify(content)} theme={customTheme}/>
    );
}

function getCachedArticleContentbyId (id) {
    const data = localStorage.getItem(id);
    return JSON.parse(data).value;
}

function parseXml(xmlContent){
    // Extract data from XML
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlContent, 'text/xml');
    const docDocno = xmlDoc.querySelector('DOCNO').textContent.trim();
    const date = xmlDoc.querySelector('DATE P').textContent.trim();
    const headline = xmlDoc.querySelector('HEADLINE P').textContent.trim();
    const textParagraphs = xmlDoc.querySelectorAll('TEXT P');
    const text = Array.from(textParagraphs).map(p => p.textContent.trim());
    
    const parsedArticle = {
        docno: docDocno,
        date: date,
        headline: headline,
        text: text
    };
    return parsedArticle;
}