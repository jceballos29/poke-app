import React, { useEffect, useState } from 'react'
import axios from 'axios'
import '../css/Home.css'
import ButtonPage from './ButtonPage'
import CardContainer from './CardContainer' 


function Home() {


    const [pokemons,setPokemons] = useState(null)
    const [page, setPage] = useState(0)
    const [count, setCount] = useState(null)
    const [offset, setOffset] = useState(0);
    const limit = 4;

    const getPage = (page) => {
        setPage(page)
    }

    useEffect(() => {
        axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`)
            .then(response => {
                setPokemons(response.data.results)
                setCount(response.data.count)
            })
            .catch(err => console.log(err))
    },[offset,limit]);

    useEffect(() => {
        setOffset(page*limit)
    },[page])

    return (
        <div className="Pokedex">
            <CardContainer pokemons={pokemons}/>
            <ButtonPage top={Math.ceil(count/limit)} handlePage={getPage}/>
        </div>
    )
}

export default Home
