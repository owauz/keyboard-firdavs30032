async function fetchData(link) {
    const response = await fetch(link)
    const data = await response.json()
    if(!response.ok){
        throw new Error("Sorry, the word you entered does not exist.")
    }
    return data
}
export default fetchData