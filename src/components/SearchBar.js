import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import '../css/SearchBar.css'

function SearchBar({types}) {

    const history = useHistory();
    const [search, setSearch] = useState(true);
    const [buttonName, setbuttonName] = useState('type')
    const {register,handleSubmit, reset}  = useForm();

    const onSubmit = (data) => {
        if (data.type) {
            console.log(data)
            const type = data.type.split('-')
            console.log(type);
            history.push(`/pokedex/${type[1]}`,{
                type: type[0],
    
            })
        } 
        if (data.name){
            console.log(data.name)
            history.push(`/pokedex/pokemon/${data.name}`,{name: data.name})
        }
        reset({name: ''})
    }

    useEffect(() => {
        if(search) setbuttonName('name')
        else setbuttonName('type')
    },[search])

    const list = types.map((type,index) => <option key={index} value={`${index+1}-${type.name}`}>{type.name}</option>)

    return (
        <div className="SearchBar">
            <div className="options">
                <button onClick={() => {
                    setSearch(!search)
                    reset({name: ''})
                }}>
                    {buttonName}
                </button>
            </div>
            <form className="form" onSubmit={handleSubmit(onSubmit)}>
                {
                    search 
                    ?   <select className="select" {...register('type')}>
                            <option value="">Search by type of pokemon </option>
                            {list}
                        </select>
                    :   <input type="text" placeholder="name" {...register("name", {required: true})} />

                }
                <button type="submit" >
                    Search
                </button>
            </form>
        </div>

    )
}

export default SearchBar
