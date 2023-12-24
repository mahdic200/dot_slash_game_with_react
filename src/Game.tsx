import {Player} from "./Player";
import { Point } from "./Point";


export class Game {
    type: "Normal" | "Professional"
    p1: Player
    p2: Player
    constructor(p1: Player, p2: Player, type: "Normal" | "Professional") {
        this.type = type;
        this.p1 = p1;
        this.p2 = p2;
    }
}


function rec_point_type(i: number, j: number) : "St" | "Ver" | "Hor" | "Sq" {
    if (i % 2 == 0) {
        if (j % 2 == 0) {
            return "St";
        } else {
            return "Hor";
        }
    } else {
        if (j % 2 == 0) {
            return "Ver";
        } else {
            return "Sq";
        }
    }
}


export function init_points(difficulty: "Normal" | "Professional"): Point[] {
    let edge = difficulty == "Normal" ? 7 : 11;
    let points: Point[] = [];
    for (let i = 0; i < edge; i++) {
        for (let j = 0; j < edge; j++) {
            let type = rec_point_type(i, j);
            points.push(new Point(type));
        }
    }
    return points;
}

export const gIndex = (i: number, j: number, edge: number): number => i * edge + j;

export function is_square(p_name: string, edge: number, index: number, points: Point[]): boolean {
    const gIndex = (i: number, j: number): number => i * edge + j;
    let i = parseInt((index / edge) + "");
    let j = index % edge;
    if (["Hor", "Ver"].includes(points[index].type)) return false;
    if (
        points[gIndex(i - 1, j)].owner == p_name &&
        points[gIndex(i + 1, j)].owner == p_name &&
        points[gIndex(i, j - 1)].owner == p_name &&
        points[gIndex(i, j + 1)].owner == p_name
    ) {
        return true;
    } else {
        return false;
    }
}


export function square_check(p1: string, p2: string, edge: number, points: Point[]): [Point[], number, number] {
    let s1 = 0;
    let s2 = 0;
    for (let i = 1; i < edge;i += 2) {
        for (let j = 1; j < edge;j += 2) {
            let fi = gIndex(i, j, edge);
            if (is_square(p1, edge, fi, points)) {
                points[fi].owner = p1;
                s1 += 1;
            } else if (is_square(p2, edge, fi, points)) {
                points[fi].owner = p2;
                s2 += 1;
            }
        }
    }

    return [points, s1, s2];
}