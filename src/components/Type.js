import React from 'react'
import '../css/Type.css'
import {colors} from '../services/colors.json'

function Type({type}) {
    
    const { color } = colors.find((c) => c.name === type);
    const style = { backgroundColor: color};
    
    return (
        
        <span className="Type" style={style} > { type } </span>
        
    )
}

export default Type
