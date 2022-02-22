import { Profiler as px } from 'react';

export const Profiler = px;

export const proCB = (
    id,
    phase,
    actualDuration,
    baseDuration,
    startTime,
    commitTime,
    interactions
) => {
    console.log("Profiler: ", id + " : " + phase);
    // console.log("Profiler - phase:", phase);
    // console.log("Profiler - actualDuration:", actualDuration);
    // console.log("Profiler - baseDuration:", baseDuration);
    // console.log("Profiler - startTime:", startTime);
    // console.log("Profiler - commitTime:", commitTime);
    // console.log("Profiler - interactions:", interactions);
}