
//const 

export const StarRating = (props) => {
    const rating = { "--rating": `${props.rating}` };

    const label = `Rating of this product is ${props.rating} out of 5.`;
    return (
        <div className="stars" style={rating} aria-label={label}></div >
    );

    /* New Code */
    // const star = [0, 0, 0, 0, 0];

    // if (props.star) {
    //     for (let i = 1; i < props.star.length; i++) {
    //         star[i] = props.star[i] ? props.star[i] : 0;
    //     }
    // }
    // const starCrossSum = star.reduce((x, y) => x + y, 0);
    // const rating = { "--rating": `${props.rating}` };

    // const label = `Rating of this product is ${props.rating} out of 5.`;
    // return (
    //     <div className="stars" style={rating} aria-label={label}></div >
    // );
}


/* Original code. */

// const rating = { "--rating": `${props.rating}` };

//     const label = `Rating of this product is ${props.rating} out of 5.`;
//     return (
//         <div className="stars" style={rating} aria-label={label}></div >
//     );