import React from 'react';
import Start from '/components/elements/Start';

const Rating = ({rating}) => {

    let arrayRating = [0,0,0,0,0];
    let puntuacion = rating != null ? rating.puntuacionfinal : 0
    for (let i= 0; i < arrayRating.length; i++) {
        if(i < puntuacion){
            arrayRating[i] = 1
        }
    }
    return (
        <span className="ps-rating ml-0">
            {arrayRating.map((id, key) =>
                <Start dato={id} key={key} />
            )}
        </span>
    );
};

export default Rating;