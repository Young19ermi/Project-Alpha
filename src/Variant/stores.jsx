import {proxy} from 'valtio';

const State = proxy({
    mainColor: "red",
    sleeveColor: "blue",
    logoColor: "white",
});

export default State;