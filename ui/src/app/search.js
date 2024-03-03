const BASEURL = `http://127.0.0.1:8888`;
const ENDPOINT = `/search?query=`;

export const useSearch = async (query) => {
    const searchQuery = BASEURL + ENDPOINT + query;

    return await fetch(searchQuery)
    .then((response) => response.json())
    .then((resp) => {
        
        for(let i=0; i < resp.length; i++){
            var articleContent = resp[i].content;
            var articleHeadline = resp[i].metadata.headline;
            var articleDate = resp[i].metadata.date;
            var docid = resp[i].metadata.id;
            var docno = resp[i].metadata.docno;
            
            if(localStorage.getItem(docid)){
                console.log(docid+" already exists.")
                continue;
            };
            console.log("Adding "+docid+" to cache.")
            
            var data = {
                content:articleContent,
                headline:articleHeadline,
                date:articleDate,
                docno:docno
            }
            setLocalStorageItem(docid, data);
        }
        return resp;
    })
    .catch((error) => {
        console.error(error)
        return [{headline:"Failed to fetch results"}];
    });
}
const setLocalStorageItem = (key, value) => {
    const now = new Date().getTime();
    const expirationTime = now + (24 * 60 * 60 * 1000); // 24 hours in milliseconds
    const item = {
        value: value,
        expirationTime: expirationTime
    };
    localStorage.setItem(key, JSON.stringify(item));
};
