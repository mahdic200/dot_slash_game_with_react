export enum PointTypes {
    "St",
    "Ver",
    "Hor",
    "Sq"
}

export class Point {
    type: "St" | "Ver" | "Hor" | "Sq"
    owner: string
    constructor(type: "St" | "Ver" | "Hor" | "Sq") {
        this.type = type
        this.owner = ""
    }

}