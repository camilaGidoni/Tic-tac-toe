import React, { useState } from 'react'
import Player from './Player'
import GameBoard from './GameBoard'
import Log from './Log'
import GameOver from './GameOver'
import { WININGS_COMBINATION, INITIAL_GAME_BORD, PLAYERS } from './constVal/constValues'


function deriveActivePlayer(gameTurns) {
    let activePlayer = 'X'
    if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
        activePlayer = 'O'
    }
    return activePlayer
}

function checkWin(gameBoard, players) {
    let winner = null
    for (const combo of WININGS_COMBINATION) {
        const firstSquareSymbol = gameBoard[combo[0].row][combo[0].col]
        const secondSquareSymbol = gameBoard[combo[1].row][combo[1].col]
        const thirdSquareSymbol = gameBoard[combo[2].row][combo[2].col]

        if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && secondSquareSymbol === thirdSquareSymbol) {
            winner = players[firstSquareSymbol]
        }
    }
    return winner
}
function deriveGameBoard(gameTurns) {
    // deep copy
    let gameBoard = [...INITIAL_GAME_BORD].map((arr) => [...arr])
    // distracturing
    for (const turn of gameTurns) {
        const { square, player } = turn;
        const { row, col } = square;
        gameBoard[row][col] = player;
    }
    return gameBoard

}

export default function TicTacToe() {
    const [players, setPlayers] = useState(PLAYERS)
    const [gameTurns, setGameTurns] = useState([])

    const gameBoard = deriveGameBoard(gameTurns)

    const activePlayer = deriveActivePlayer(gameTurns)

    const winner = checkWin(gameBoard, players)

    const hasDraw = gameTurns.length === 9 && !winner

    function handelSelectSquare(rowIndex, colIndex) {
        setGameTurns((prev) => {
            const currentPlayer = deriveActivePlayer(prev)
            const updateTurns = [{
                square: {
                    row: rowIndex,
                    col: colIndex
                },
                player: currentPlayer,
            }, ...prev]
            return updateTurns
        })
    }

    function handelReastart() {
        setGameTurns([])
    }

    function handelPlayerNameChange(symbol, newName) {
        setPlayers((prev) => {
            return {
                ...prev,
                [symbol]: newName
            }
        })
    }

    return (
        <main>
            <div id="game-container">
                <ol id="players" className="highlight-player">
                    <Player name={PLAYERS.X} symbol="X" isActive={activePlayer === 'X'} onChangeName={handelPlayerNameChange} />
                    <Player name={PLAYERS.O} symbol="O" isActive={activePlayer === 'O'} onChangeName={handelPlayerNameChange} />
                </ol>
                {(winner || hasDraw) && <GameOver winner={winner} onRestart={handelReastart} />}
                <GameBoard onSelectSquare={handelSelectSquare} board={gameBoard} />
            </div>
            <Log turns={gameTurns} />
        </main>
    )
}
