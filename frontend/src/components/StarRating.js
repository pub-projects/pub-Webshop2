import { useState } from 'react';
import { ProgressBar } from './ProgressBar';
import { Profiler, proCB } from '../util/Profiler';

/*
    Trying to use stars in the detailed view of StarRating didn't turn out good. 
    Applying the percentage of each star level to only 5 elements makes eveything congregate towards the first star. 
    Each full star represent 20% of all the stars and it makes it difficult to visualize.
    Will use a rectangle, filled to the percentage of each star vote instead, as does amazon.com.
*/
// Props (star, votes, totalVotes)
const RatingDetail = (props) => {
    const rating = Math.round((props.votes / props.totalVotes) * 100);
    const label = `${props.rating} out of ${props.totalVotes} gave this ${props.star + 1} stars.`;
    const barPreText = `${props.star + 1} star `;
    const barPostText = ` ${rating}%`;
    return (
        // <><div className="stars" style={style} aria-label={label}>{props.star + 1} : </div><div>{Math.round((props.votes / props.totalVotes) * 100)}%</div></>
        <div className="star-rating">
            {/* <Profiler id="RatingDetail" onRender={proCB} /> */}
            <ProgressBar pre_text={barPreText} post_text={barPostText} percent={rating} color="gold" />
            <span className="float-right"></span>
        </div>
    );
}

export const StarRating = (props) => {
    /* New Code */
    const [detailStarRatingBlock, setDetailStarRatingBlock] = useState("none");
    const [averageStarRatingBlock, setAverageStarRatingBlock] = useState("block");
    const showDetails = props.showDetails;
    // console.log("props.showDetails:", props.showDetails);
    // console.log("showDetails:", showDetails);
    const rating = props.rating
        ? props.rating
        : { "5": 0, "4": 0, "3": 0, "2": 0, "1": 0 };

    let totalVotes = 1;
    let starRatingWeighted = 0;
    // Converting an object to an array of objects.
    // https://medium.com/chrisburgin/javascript-converting-an-object-to-an-array-94b030a1604c
    const starRatingArray = Object.keys(rating).map(i => rating[i]);

    for (let i = 1; i < Object.keys(rating).length + 1; i++) {
        totalVotes += rating[i.toString()];
        starRatingWeighted += i * rating[i.toString()];
    }
    if (totalVotes > 1) totalVotes--;

    const starRatingWeightedAverage = Math.round((starRatingWeighted / totalVotes) * 10) / 10;

    const label = `Rating of this product is ${starRatingWeightedAverage} out of 5.`;
    // console.log("starRatingWeightedAverage:", starRatingWeightedAverage);
    const style = {
        "display": `${averageStarRatingBlock}`,
        "--rating": `${starRatingWeightedAverage}`
    };
    const mouseEnter = () => {
        if (showDetails) {
            setDetailStarRatingBlock("block"); setAverageStarRatingBlock("none");
        }
    }
    const mouseLeave = () => {
        setDetailStarRatingBlock("none"); setAverageStarRatingBlock("block");
    }

    return (
        <div
            onMouseEnter={() => { mouseEnter() }}
            onMouseLeave={() => { mouseLeave() }}
        >
            {/* <Profiler id="StarRating" onRender={proCB} /> */}
            <div
                className="stars-before"
                aria-label={label}
                style={style}
            >
            </div>
            <div style={{ minHeight: '150px', display: `${detailStarRatingBlock}` }}>

                <div style={{ width: '100%', textAlign: 'right' }}>
                    <div style={{ textAlign: 'left', fontWeight: 700 }}>Star Ratings</div>
                    {
                        starRatingArray.map((rating, i) => {
                            const key = `rating_${i}`;
                            return (
                                <RatingDetail key={key} star={i} votes={rating} totalVotes={totalVotes} />
                            );
                        }).reverse()
                    }
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