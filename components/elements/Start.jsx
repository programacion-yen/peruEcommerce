import React from 'react'

const Start = (dato) => {
    let estado = (dato.dato == 1) ? 'fa-star' : 'fa-star-o';
    return(
        <i className={`fa ${estado}`}></i>
    )
}

export default Start