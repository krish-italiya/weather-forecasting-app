import React, { useEffect, useState } from 'react'


const SearchBar = ({ getCity }) => {
    const [query, setQuery] = useState("")
    const [options, setOptions] = useState([])
    useEffect(() => {
        const getData = async (query) => {
            if (query.length > 0) {
                const url = `http://api.weatherapi.com/v1/search.json?key=${import.meta.env.VITE_API_KEY}&q=${query}`
                const res = await fetch(url, {
                    method: "GET",
                    headers: {
                        'Access-Control-Allow-Origin': "*",
                        'Access-Control-Allow-Headers': "*"
                    }
                })
                const json = await res.json()
                setOptions(json)
            }
            else {
                setOptions([])
            }
        }
        getData(query)
    }, [query])

    const handleClick = (e) => {
        setQuery("")
        getCity(e.target.innerText)
        console.log(e.target.innerText)
    }
    return (
        <>
            <div className='search'>
                <div>
                    <input className='search-input' placeholder='Search for any City..' type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
                    {options.length > 0 && (
                        <div className='search-menu'>
                            {options.map((option, index) => (
                                <div className='search-result' onClick={handleClick} key={index}>{option.name}</div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

        </>
    )
}

export default SearchBar