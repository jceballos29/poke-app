import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Switch, useHistory, useLocation, useRouteMatch } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import '../css/Pokemon.css'
import Stat from './Stat';
import Type from './Type';
import { ProtectedRoute } from '../ProtectedRoute';

function Pokemon() {

    const {state} = useLocation();
    const history = useHistory();
    const {path,url} = useRouteMatch();

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
    const [encounters, setEncounters] = useState([])
    const [enconutersList, setEncountersList] = useState([])

    const limit = 6
    const [start, setStart] = useState(0)
    const [final, setFinal] = useState(limit)
    const [movesRenderList, setMovesRenderList] = useState([])
    const [top, setTop] = useState(0)

    const localEncounter = (data) => {
        let encounter = data.split('-')
        let local = { region: null, area: null, extra: null };
        if (encounter.includes("route")) {
          encounter.splice(encounter.indexOf("area"), 1);
          local.area = encounter.splice(encounter.indexOf("route"), 2).join(" ");
          local.region = encounter.splice(0, 1).toString();
          if (encounter.length > 0) {
            local.extra = encounter.join(" ");
          }
        } else {
          encounter.splice(encounter.indexOf("area"), 1);
          local.area = encounter.join(" ");
        }
        
        if (local.region && local.area) {
          return (<div>
                    <span><b>Region: </b>{local.region}</span> 
                    <span><b>Area: </b>{local.area}</span>
                </div>)
        } else if (local.area) {
          return <div><b>Area: </b>{local.area}</div>
        }
      
    }

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
            axios.get(pokemon.location_area_encounters).then(response => setEncounters(response.data)).catch(console.log)    
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

    useEffect(() => {
        if(encounters){
            if(encounters.length === 0){
                setEncountersList('Location not available ')
            } else {
                let list = []
                for (let i = 0; i < encounters.length; i++) {
                    const encounter = encounters[i].location_area.name;
                    list.push(localEncounter(encounter))
                }
                console.log(list);
                if(list.length<10){
                    setEncountersList(list)
                } else {
                    let helper =[]
                    for (let i = 0; i < 10; i++) {
                        helper.push(list[i])
                    }
                    setEncountersList(helper)
                }
            }
        }
    },[encounters])

    console.log(enconutersList);
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
            
                <Switch>
                    <ProtectedRoute path={`${path}/encounters`}>
                        <div className="PokemonEncounter">
                            <div className="PokemonLocations">
                                <div className="LocationTitle">
                                    <h1>Where Locate it?</h1>
                                </div>
                                <div className="LocationEncounters">
                                    {enconutersList}
                                </div>
                            </div>
                            <div className="PokemonEncountersButtons">
                                <button onClick={() =>{
                                    history.goBack();
                                }}>Back</button>
                            </div>
                        </div>
                        

                    </ProtectedRoute>

                    <ProtectedRoute path={path}>
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
                                <button onClick={() =>{
                                    history.push(`${url}/encounters`,{name:state.name})
                                }}>Enconuters</button>
                            </div>
                        </div>
                    </ProtectedRoute>
                </Switch>
            
        </div>
    )
}

export default Pokemon
