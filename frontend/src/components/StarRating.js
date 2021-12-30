
export const StarRating = (props) => {

    const rating = { "--rating": `${props.rating}` };

    const label = `Rating of this product is ${props.rating} out of 5.`;
    return (
        <div className="stars" style={rating} aria-label={label}></div >
    );
}
