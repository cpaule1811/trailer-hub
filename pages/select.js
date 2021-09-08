import { useState } from 'react'
import { useRouter } from 'next/router'

export default function TagSelect({ user }) { 
  const [selected1, setSelected1] = useState(null)
  const [selected2, setSelected2] = useState(null)
  const [selected3, setSelected3] = useState(null)
  const [error, setError] = useState("")
  const { userId } = user
  const router = useRouter()

  const handleSelected = (genre) => {
    if (selected1 === genre) return setSelected1(null)
    if (selected2 === genre) return setSelected2(null)
    if (selected3 === genre) return setSelected3(null)
    if (!selected1) return setSelected1(genre)
    if (!selected2) return setSelected2(genre)
    if (!selected3) return setSelected3(genre)
  }

  const countSelected = () => {
    return [selected1, selected2, selected3].filter(item => item).length
  }

  const isSelected = (genre) => {
    if(genre === selected1 || genre === selected2 || genre === selected3){
      return false
    }
    return true
  }

  const submitTags = async (e) => {
    e.preventDefault()
    const tags = genres.filter(item => (item.genre === selected1 || item.genre === selected2|| item.genre === selected3))
    .map(item => { 
       return {
          genre: item.genre,
          user_id: userId,
          genre_id: item.genre_id
       }
    })
    try {
      const resp = await fetch("/api/tags", {
          method: "POST",
          body: JSON.stringify({tags: tags}),
          headers: {
              'Content-Type': 'application/json'
          }
      })
      const data = await resp.json()
      if(data.success) { 
        return router.push('/')
      }
      setError(data.message)
   }
   catch(error) { 
      setError(error.message)
   }
  }

    return ( 
        <div>
           <div className="mh-20-l mh2 pv3">
           <div className="f2 tc mb3">Please select your 3 favourite genres</div>
           <div className="f3 tc mb3">You have selected {countSelected()}/3</div>
           <form>
             <div className="flex flex-wrap justify-center select-gap">
             {genres.map(item => {
              return <div onClick={() => handleSelected(item.genre)} key={item.genre_id} className="w5 h5 br3 grow-light pointer" style={{backgroundImage: `url(${item.genrePath})`, backgroundSize: "cover"}}>
                       <div className={`${isSelected(item.genre) ? "overlay-tag" : "overlay-tag-selected" } h-100 br3 relative w-100`}>
                          <div className="tc white f3 pt5-5 tvc">{item.genre}</div>
                       </div>
                     </div>
                })}
             </div>
             <div className="mt4 flex justify-center">
                 {error && <div className="tc red">{error}</div>}
                 {countSelected() === 3 && <input onClick={(e) => submitTags(e)} className="bg-transparent pointer ba pa3 bg-button" type="submit" />}
             </div>
             </form>
          </div>
        </div>
    )
}

const genres = [
    { 
      genre: "Action",
      genrePath: "https://image.tmdb.org/t/p/w400/nNmJRkg8wWnRmzQDe2FwKbPIsJV.jpg",
      genre_id: 28
    },
    { 
      genre: "Anime",
      genrePath: "https://image.tmdb.org/t/p/w500/dIWwZW7dJJtqC6CgWzYkNVKIUm8.jpg",
      genre_id: 16
    },
    { 
      genre: "Drama",
      genrePath: "https://image.tmdb.org/t/p/w500/9Xw0I5RV2ZqNLpul6lXKoviYg55.jpg",
      genre_id: 18
    },
    { 
      genre: "Horror",
      genrePath: "https://image.tmdb.org/t/p/w500/e3ofKYdZ3jgNYuCriE5AAsHp4L6.jpg",
      genre_id: 27
    },
    { 
      genre: "Science Fiction",
      genrePath: "https://image.tmdb.org/t/p/w500/2JGYpteleFedXVJYKMR6Za7oBU9.jpg",
      genre_id: 878
    },
    { 
      genre: "Comedy",
      genrePath: "https://image.tmdb.org/t/p/w500/2kfkOigqC6B3P7UVB332EC0Eyz3.jpg",
      genre_id: 35
    },
    { 
      genre: "Crime",
      genrePath: "https://image.tmdb.org/t/p/w500/j2ugciy4ef6IwMDSnf5uDYPyMvc.jpg",
      genre_id: 80
    },
    { 
      genre: "Romance",
      genrePath: "https://image.tmdb.org/t/p/w500/ik2D3KqxFD0O0Bc3Wv1CZm8sOg8.jpg",
      genre_id: 10749
    },
    { 
      genre: "War",
      genrePath: "https://image.tmdb.org/t/p/w500/hjQp148VjWF4KjzhsD90OCMr11h.jpg",
      genre_id: 10752
    },
    
]