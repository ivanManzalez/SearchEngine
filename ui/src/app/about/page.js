import Link from 'next/link'
////////////////////////////////////////////////////////////
export default function About() {
    return(
        <main className=" bg-indigo-400  flex min-h-screen flex-col place-content-center align-middle px-24 py-12 " > 
            <Link href="/" className="text-indigo-900 hover:underline decoration-1 mb-4 text-sm"><i>Back</i></Link>
            <h1 className="text-5xl font-xl font-mono text-indigo-900 pb-5 text-center">About CBC Finder </h1>
            <div className="flex flex-col space-y-4">
                <div className=" flex-2 text-lg font-xl font-sans text-indigo-900 space-y-4">    
                    <p>
                        CBC Finder was built using a simple information retrieval architecture.
                    </p>
                    <p>
                        The index engine parses through the collection (CBC articles) which tokenizes all unique terms into a vocabulary.
                        Using the vocabulary, meaningful data structures (Lexicon & Inverted Index) are generated which map tokens to documnents.
                    </p>
                </div>

                <div className=" px-48">
                    <img className="cursor-pointer pb-3" src="/media/searchengine-diagram.svg"/>
                </div> 

                <div className=" flex-2 text-lg font-xl font-sans text-indigo-900">    
                    <p>
                    Documents containing a query term are ranked using the BM25 function, a popular relevancy scoring algorithm for information retrieval.
                    </p>
                </div>

                <div className=" px-48">
                    <img className="cursor-pointer pb-3" src="/media/bm25.svg"/>
                </div>  

                <div className=" flex-2 text-lg font-xl font-sans text-indigo-900">    
                    <p>
                        Finally, using a SprintBoot powered API server, the top 5 results are returned and displayed in the React user interface. 
                    </p>
                </div>  
                <div className=" text-sm font-sans text-indigo-100 ">  
                    <p className="mt-20 bottom-0 text-center">Architecture described by Dr.Mark Shmuck in lecture series (<Link href="https://www.youtube.com/@msci541-searchengines3" className="text-indigo-200 hover:underline decoration-1 mb-4 text-sm"><i>Search Engines</i></Link>)</p>         
                </div>  
            </div>
        </main>
    )
};