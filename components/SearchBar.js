import Image from 'next/image'
import search from '../img/search.svg'
import { useState } from 'react' 
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function SearchBar() { 

    const [searchfield, setSearchField] = useState("")
    const router = useRouter()

    const handleSearchForm = (e) => { 
        e.preventDefault()
        router.push({ pathname: '/results', query: { search: searchfield || 'a' }})
    }

    return (
      <div className="w-70-ns pv3">
      <form onSubmit={(e) => handleSearchForm(e)}>
      <label htmlFor="Searchbar" className="back" style={{position: "absolute"}}>search</label>
       <div className="flex mh6-ns mh4-m justify-between mh2 mv2 center shadow-3 h2">
           <input 
               onChange={(e) => setSearchField(e.target.value)} 
               type="search" 
               className="w-100 pl2 br2 br--left" 
               style={{lineHeight: "1.00"}}
               value={searchfield}
               id="Searchbar"
            />
           <Link href={{ pathname: '/results', query: { search: searchfield || "a" }}} passHref>
               <div className="w3 tc dt-background br2 br--right pointer pv1"><Image src={search} alt="search icon"/></div>
            </Link>
       </div>
       </form>
       </div>
    )
}