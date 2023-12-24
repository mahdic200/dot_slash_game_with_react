import { is_empty } from "./Helpers";
import { Player } from "./Player";

export function getDifficulty() : "Normal" | "Professional" {
    let game_type: number | null;
    while (true) {
        game_type = parseInt(prompt("Enter game type: \n(1) => normal\n(2) => professional")!);
        if (
            isNaN(game_type) ||
            is_empty(game_type) ||
            game_type < 1 || game_type > 2
        ) {
            alert("input is invalid");
        } else {
            if (game_type == 1) {
                return "Normal";
            } else if (game_type == 2) {
                return "Professional";
            }
            return "Normal";
        }
    }
}

export function getGameMode() : "Two" | "Comp" {
    let game_type: number | null;
    while (true) {
        game_type = parseInt(prompt("Enter game type: \n(1) => two player\n(2) => with computer")!);
        if (
            isNaN(game_type) ||
            is_empty(game_type) ||
            game_type < 1 || game_type > 2
        ) {
            alert("input is invalid");
        } else {
            if (game_type == 1) {
                return "Two";
            } else if (game_type == 2) {
                return "Comp";
            }
            return "Two";
        }
    }
}

export function getPlayers(type: "Two" | "Comp") : [Player, Player] {
    let player1_name: string | null;
    let player2_name: string | null;
    while (true) {
        player1_name = prompt("Enter player 1 name: ")!;
        if (is_empty(player1_name)) {
            alert("input is invalid");
        } else {
            break;
        }
    }
    if (type == "Two") {
        while (true) {
            player2_name = prompt("Enter player 2 name: ")!;
            if (is_empty(player2_name)) {
                alert("input is invalid");
            } else {
                break;
            }
        }
    } else {
        player2_name = "computer";
    }
    return [new Player(player1_name, "User"), new Player(player2_name, type == "Comp" ? "Computer" : "User")];
}




