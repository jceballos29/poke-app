import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { useAuth } from '../Context/AuthProvider';
import '../css/TrainerCard.css'
import female from '../img/female.png'
import male from '../img/male.png'
import PorfileItem from './PorfileItem';


function TrainerCard({gender, user}) {

    const [img, setImg] = useState(null);
    const history = useHistory();
    const auth = useAuth();

    useEffect(() => {
        if (gender === 'female'){
            setImg(female)
        } else if (gender === 'male'){
            setImg(male)
        }
    }, [gender])

    return (
        <div className="TrainerCard">
            <div className="TrainerContainer">
                <h1 className="Title">TRAINER CARD</h1>
                <div className="Avatar">
                    <img alt="Avatar" src={img}/>
                </div>
                <div className="Profile">
                    <PorfileItem name="ID" value={123456}/>
                    <PorfileItem name="USER" value={user}/>
                    <PorfileItem name="FAV" value={0}/>
                </div>
                <div className="Button">
                    <button onClick={() => {
                        auth.signOut();
                        history.push('/')
                    }}>EXIT</button>
                </div>
            </div>
            
        </div>
    )
}

export default TrainerCard
