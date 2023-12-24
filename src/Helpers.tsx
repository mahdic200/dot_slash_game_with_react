import {Point} from "./Point";

export const getRandomInt = (min: number, max: number) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}


export function is_empty(input: number | string) {
    if (input == null || undefined || input == "") {
        return true;
    } else {
        return false
    }
}

export function is_game_done(edge: number, points: Point[]): boolean {
    // stars number
    const stars = (edge + 1) / 2;
    // all lines number
    const alno = edge * edge - (stars ** 2 + (stars - 1) ** 2);
    // allocated lines
    let al = 0;
    for (const point of points) {
        if (point.owner != "" && ["Hor", "Ver"].includes(point.type)) {
            al += 1;
        }
    }
    return al == alno;
}