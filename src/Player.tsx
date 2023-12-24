import { getRandomInt } from "./Helpers";
import {Point} from "./Point";

export enum PlayerTypes {
    "User",
    "Computer",
}

export class Player {
    name: string
    type: "User" | "Computer"

    constructor(name: string, type: "User" | "Computer") {
        this.name = name;
        this.type = type;
    }

}


export const get_computer_input = (points: Point[]) => {
    while (true) {
        let i = getRandomInt(0, 501);
        i = i % points.length;
        if (points[i].owner == "" && ["Hor", "Ver"].includes(points[i].type)) {
            return i;
        }
    }
}