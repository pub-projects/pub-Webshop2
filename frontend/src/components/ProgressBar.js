/*
    ProgressBar v1.0
    Feb. 5, 2022
    pre_text - string
    post_text - string
    percent - number
    color - color hex, rgb, rgba, 
*/

export const ProgressBar = (props) => {
    const preText = props.pre_text ? props.pre_text : "";
    const postText = props.post_text ? props.post_text : "";
    const fillLevel = props.percent ? props.percent : 0;
    const fillColor = props.color ? props.color : "#00f";
    const barStyle = { "width": `${fillLevel}%`, "backgroundColor": `${fillColor}`, "height": "0.8em" };
    return (
        <div style={{ "width": "100%", "display": "flex", "justifyContent": "flex-start", "alignItems": "center" }}>
            <div>{preText}&nbsp; </div>
            <div style={{ "width": "70%", "border": "inset grey 1px", "borderRadius": "0.3em", "overflow": "hidden", "backgroundColor": "lightgrey" }}>
                <div style={barStyle}></div>
            </div>
            <div>&nbsp; {postText}</div>
        </div>
    )
}