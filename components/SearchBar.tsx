'use client'
import { scrapeAndStore } from "@/lib/actions";
import { FormEvent, useState } from "react"

const isValidAmazonLink = (url:string) =>{
  try {
    const parsedURL = new URL(url);
    const hostname = parsedURL.hostname;

    if(hostname.includes('amazon.com') || hostname.includes('amazon.in') || hostname.includes('amazon.') || hostname.endsWith('amazon')){
      return true;
    }
  } catch (error) {
    return false;
  }
  return false;
}

const SearchBar = () => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async(event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isValid = isValidAmazonLink(prompt);

    if(!isValid){
      return alert('Please enter a valid Amazon Link');
    }

    try {
      setLoading(true);

      const product = await scrapeAndStore(prompt);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }

  };

  return (
    <form
        className='flex flex-wrap gap-4 mt-12'
        onSubmit={handleSubmit}
    >
      <input
        type="text"
        placeholder="enter the product link"
        className="searchbar-input"
        value={prompt}
        onChange={(e)=>setPrompt(e.target.value)}
      />

      <button 
        type="submit"
        className="searchbar-btn"
        disabled={prompt === ""}
      >
        { loading ? 'searching...' : 'search'}
      </button>
    </form>
  )
}

export default SearchBar;
