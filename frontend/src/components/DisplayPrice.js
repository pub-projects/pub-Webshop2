import React from 'react';

export const DisplayPrice = (props) => {
    const priceSection = props.price.toString().split(".");
    let wholePart = priceSection[0];
    let fractionPart = priceSection[1] + "00";
    fractionPart = fractionPart.slice(0, 2);
    let numberFormat = Intl.NumberFormat("en-us", {
        style: "currency",
        minimumFractionDigits: 2,
        maximuFractionDddigits: 2,
        currency: "USD"
    }).format;

    let price = "";
    switch (props.displayStyle) {
        case "regular": price = <p className="text-danger">{numberFormat(Number(props.price))}</p>;
            break;
        case "amazon": price = props.symbolPlacement === "pre" ? <p><span className="smaller">{props.symbol}</span><span className="normal">{wholePart}</span><span className="smaller">{fractionPart}</span></p> : <p><span className="normal">{wholePart}</span><span className="smaller">{fractionPart}</span><span className="normal">{props.symbol}</span></p>;
            break;
        default:
            price = <p className="text-danger">{numberFormat(Number(props.price))}</p>;
            break;
    }

    return (
        <>{price}</>
    );
}
