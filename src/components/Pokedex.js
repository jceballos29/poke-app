import React, { useEffect, useState } from 'react'
import TrainerCard from './TrainerCard'
import '../css/PokeContainer.css'
import SearchBar from './SearchBar'
import axios from 'axios'
import Container from './Container'
import { useAuth } from '../Context/AuthProvider'

function Pokedex() {

    const {user} = useAuth()
    const [types, setTypes] = useState([]);

    const [name, setName] = useState('Ash')
    const [gender, setGender] = useState('male')

    useEffect(() => {
        const getTypes = async () => {
            axios.get('https://pokeapi.co/api/v2/type')
                .then(response => setTypes(response.data.results))
                .catch(err => console.log(err))
        }
        getTypes();
    }, [])

    useEffect(() => {
        if(user){
            setName(user.name);
            setGender(user.gender)
        }
    },[user])

    return (
        <div className="PokeContainer">
            <TrainerCard gender={gender} user={name}/>
            <SearchBar types={types}/>
            <Container />
        </div>
    )
}

export default Pokedex
