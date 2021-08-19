import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import '../css/Pokemon.css'
import Stat from './Stat';
import Type from './Type';

function Pokemon() {

    const {state} = useLocation();
    const history = useHistory();

    const [pokemon, setPokemon] = useState(null)
    const [name, setName] = useState(null)
    const [id, setId] = useState(null)
    const [types, setTypes] = useState([])
    const [stats, setStats] = useState([])
    const [image, setImage] = useState(null)
    const [order, setOrder] = useState(null)
    const [height,setHeight] = useState(null)
    const [weight, setWeight] = useState(null)
    const [abilities, setAbilities] = useState([])
    const [moves, setMoves] = useState([])

    const limit = 6
    const [start, setStart] = useState(0)
    const [final, setFinal] = useState(limit)
    const [movesRenderList, setMovesRenderList] = useState([])
    const [top, setTop] = useState(0)

    useEffect(() => {
        if(state.name){
            axios.get(`https://pokeapi.co/api/v2/pokemon/${state.name}`)
            .then(response => setPokemon(response.data))
            .catch(console.log)
        }
    },[state.name])

    useEffect(() => {
        if(pokemon){
            setName(pokemon.name)
            setId(pokemon.id)
            setTypes(pokemon.types.map(t => <Type key={t.slot} type={t.type.name}/>))
            setStats(pokemon.stats.map((s,index) => <Stat key={index} baseStat={s.base_stat} name={s.stat.name} validate={false}/>))
            setOrder(pokemon.order)
            setHeight(pokemon.height)
            setWeight(pokemon.weight)
            setAbilities(pokemon.abilities.map(a => <span key={a.slot}>{a.ability.name.replace('-',' ')}</span>))
            setMoves(pokemon.moves.map((m,index) => <span key={index}>{m.move.name.replace('-',' ')}</span>))
            
        }
    },[pokemon])

    useEffect(() => {
        if(id){
            setImage(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`)
        }
    },[id])

    useEffect(() => {
        if(moves){
            let list = []
            for (let i = start; i < final; i++) {
                list.push(moves[i])
            }
            setMovesRenderList(list)
            setTop(Math.ceil(moves.length/limit))
        }
    },[start, final, moves, limit])


    return (
        <div className="Pokemon">
            <div className="PokemonHeaders">
                <div className="PokemonName">
                    <h1>{name}</h1>
                </div>
                <div className="PokemonImage">
                    <img alt={name} src={image}/>
                </div>
                <div className="PokemonTypes">
                    {types}
                </div>
            </div>
            <div className="PokemonInfo">
                <div className="PokedexNumber">
                    <p>Pokedex: {order}</p>
                </div>
                <div className="PokemonQualities">
                    <div className="height">
                        <span>Height: </span>
                        <span>{height/10} m</span>
                    </div>
                    <div className="weight">
                        <span>Weight: </span>
                        <span>{weight/10} Kg</span>
                    </div>
                </div>
                <div className="PokemonStats">
                    {stats}
                </div>
                <div className="PokemonAbilities">
                    <div className="PokemonAbilitiesContent">
                        {abilities}
                    </div>
                </div>
                <div className="PokemonMoves">
                    <div className="PokemonMovesPrevious">
                        <FontAwesomeIcon onClick={() => {
                            if(start > 0) {
                                setStart(start - limit)
                                setFinal(final - limit)
                            }
                        }} icon={faChevronLeft} size="3x" className="cursor" disabled={true}/>
                    </div>
                    <div className="PokemonMovesItems">
                        {movesRenderList}
                    </div>
                    <div className="PokemonMovesNext">
                        <FontAwesomeIcon onClick={() => {
                            if(final < top*limit){
                                setStart(start + limit)
                                setFinal(final + limit)
                            }
                        }} icon={faChevronRight} size="3x" className="cursor"/>
                    </div>
                </div>
                <div className="PokemonButtons">
                    <button onClick={() =>{
                        history.push('/pokedex')
                    }}>Back</button>
                    <button>Enconuters</button>
                </div>
            </div>
        </div>
    )
}

export default Pokemon
