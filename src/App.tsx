import { useState, useEffect, Children, MouseEvent } from "react";
import { Player, get_computer_input } from "./Player";
import { Point } from "./Point";
import { getDifficulty, getGameMode, getPlayers } from "./Config";
import { getRandomInt, is_game_done } from "./Helpers";
import { init_points, square_check } from "./Game";
import Base from "./Base";

function App() {
    const [turn, setTurn] = useState<2 | 1>(getRandomInt(1, 3) as any);
    const [s1, setS1] = useState<number>(0);
    const [s2, setS2] = useState<number>(0);
    const [points, setPoints] = useState<Point[]>([]);
    const [got, setGot] = useState<boolean>(false);
    const [isDone, setIsDone] = useState<boolean>(false);
    const [difficulty, setDifficulty] = useState<"Normal" | "Professional">("Normal");
    const [edge, setEdge] = useState<number>(difficulty == "Normal" ? 7 : 11);
    const [_gameMode, setGameMode] = useState<"Two" | "Comp">("Two");
    const [player1, setPlayer1] = useState<Player>(new Player("player1", "User"));
    const [player2, setPlayer2] = useState<Player>(new Player("computer", "User"));
    const [change, setChange] = useState<boolean>(false);

    useEffect(() => {
        if (isDone) return () => {};
        if (!got) {
            let d = getDifficulty();
            setDifficulty(d);
            setEdge(d == 'Normal' ? 7 : 11);
            let m = getGameMode();
            setGameMode(m);
            let [player1, player2] = getPlayers(m);
            setPlayer1(player1);
            setPlayer2(player2);
            setPoints(init_points(d));
            setGot(true);
        } else {
            if (is_game_done(edge, points)) {
                setIsDone(true);
            }
            if (turn == 2 && player2.name == "computer") {
                if (is_game_done(edge, points)) {
                    setIsDone(true);
                    return () => {};
                }
                let i = get_computer_input(points);
                points[i].owner = "computer";
                setTurn(1);
                setChange(!change);
            }
            let [new_points, ns1, ns2]= square_check(player1.name, player2.name, edge, points);
            setPoints(new_points);
            setS1(ns1);
            setS2(ns2);
        }
    });

    const handlePlayerClick = (e: MouseEvent) => {
        let index = parseInt(e.currentTarget.getAttribute('data-index')!);
        let selectedLine = points[index];
        if (selectedLine.owner != "") {
            alert('select another line !');
            return;
        }
        points[index].owner = turn == 1 ? player1.name : player2.name;
        if (is_game_done(edge, points)) {
            setIsDone(true);
        }
        setChange(!change);
        setTurn(turn == 1 ? 2 : 1);
    }

    const getPointClassName = (point: Point): string => {
        let className = "";
        if (point.owner == "" && ["Hor", "Ver"].includes(point.type)) {
            className = "hover:text-blue-500 cursor-pointer";
        } else {
            let append = "";
            if (point.owner == player1.name) {
                append = "text-green-500";
            } else if (point.owner == player2.name) {
                append = "text-orange-500";
            }
            className = "pointer-events-none " + append;
        }
        return className;
    }

    const getPointSymbol = (point: Point): string => {
        let symbol = "";
        if (point.type == "St") {
            symbol = "*";
        } else if (point.type == "Hor") {
            symbol = "--";
        } else if (point.type == "Ver") {
            symbol = "|";
        } else if (point.type == "Sq") {
            if (point.owner == player1.name) {symbol = "P1";}
            else if (point.owner == player2.name) {symbol = "P1";}
            else {symbol = ""}
        } else {
            symbol = "undefined type";
        }
        return symbol;
    }

    const getFinalMessage = () => {
        let message = (name: string, score: number) => `${name} is winner with ${score} scores !`;
        if (s1 > s2) {
            return message(player1.name, s1);
        } else if (s2 > s1) {
            return message(player2.name, s2);
        } else {
            return "Round draw !";
        }
    }


    return (
        <>
            <section className="flex flex-col justify-center items-center w-[100vw] h-[100vh] bg-rose-100">
                {!isDone && <section>{turn == 1 ? player1.name : player2.name}'s turn</section>}
                {isDone && <section className="text-[2rem]">{getFinalMessage()}</section>}
                {isDone && <section className="text-[1.3rem]">{player1.name}'s score : {s1}, {player2.name}'s score : {s2}</section>}
                <section id="container" className={`grid ${difficulty == "Normal" ?  "grid-cols-7" :  "grid-cols-11"} bg-cyan-200`}>
                    {Children.toArray(points.map((point, index) => {
                        return (
                            <>
                                <Base index={index} className={getPointClassName(point)}
                                onClick={handlePlayerClick}>{getPointSymbol(point)}</Base>
                            </>
                        );
                    }))}
                </section>
            </section>
        </>
    );
}

export default App;
