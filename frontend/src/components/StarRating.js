import { useState } from 'react';


export const StarRating = (props) => {
    /* New Code */
    const [showDetails, setShowDetails] = useState("none");
    const [hideAverageStarRating, seteHideAverageStarRating] = useState("block");
    const rating = props.rating
        ? props.rating
        : { "5": 0, "4": 0, "3": 0, "2": 0, "1": 0 };

    let starCount = 1;
    let starRatingWeighted = 0;



    for (let i = 1; i < Object.keys(rating).length + 1; i++) {
        starCount += rating[i.toString()];
        starRatingWeighted += i * rating[i.toString()];
    }
    if (starCount > 1) starCount--;
    // console.log("rating:", rating);
    console.log("starCount:", starCount);
    // console.log("starRating", starRating);

    const starRatingOverAll = Math.round((starRatingWeighted / starCount) * 10) / 10;

    const ratingAll = { "--rating": `${starRatingOverAll}` };

    const label = `Rating of this product is ${starRatingOverAll} out of 5.`;

    const style = {
        "display": `${hideAverageStarRating}`,
        "--rating": `${starRatingOverAll}`
    };

    return (
        <div
            onMouseEnter={() => { setShowDetails("block"); seteHideAverageStarRating("none"); }}
            onMouseLeave={() => { setShowDetails("none"); seteHideAverageStarRating("block"); }}
        >
            <div
                className="stars-before"
                aria-label={label}
                style={style}
            >
            </div>
            <div style={{ minHeight: '150px', display: `${showDetails}` }}>
                <div id="example-collapse-text">
                    <div style={{ width: 'max-content', textAlign: 'right' }}>
                        <div style={{ textAlign: 'left', fontWeight: 700 }}>Star Ratings</div>
                        <div className="stars" style={ratingAll} aria-label={label}>5 : </div>
                        <br />
                        <div className="stars" style={ratingAll} aria-label={label}>4 : </div>
                        <br />
                        <div className="stars" style={ratingAll} aria-label={label}>3 : </div>
                        <br />
                        <div className="stars" style={ratingAll} aria-label={label}>2 : </div>
                        <br />
                        <div className="stars" style={ratingAll} aria-label={label}>1 : </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

{/*
    <div style={{ minHeight: '150px', display: `${showDetails}` }}>
<div id="example-collapse-text">
                    <div style={{ width: '100%' }}>
                        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus
                        terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer
                        labore wes anderson cred nesciunt sapiente ea proident.
                    </div>
                </div></div>
                */}

{/* <div style={{ minHeight: '150px' }}>
                <div id="example-collapse-text">
                    <div style={{ width: '400px' }}>
                        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus
                        terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer
                        labore wes anderson cred nesciunt sapiente ea proident.
                    </div>
                </div>
            </div> */}

/* Original code. */

// const rating = { "--rating": `${props.rating}` };

//     const label = `Rating of this product is ${props.rating} out of 5.`;
//     return (
//         <div className="stars" style={rating} aria-label={label}></div >
//     );