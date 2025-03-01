import { Turn } from "./turn"
import { TurnGateway } from "../../../infrastructure/turnGateway";
import mysql from 'mysql2/promise';
import { SquareGateway } from "../../../infrastructure/squareGateway";
import { MoveGateway } from "../../../infrastructure/moveGateway";
import { Move } from "./move";
import { toDisc } from "./disc";
import { Point } from "./point";
import { Board } from "./board";
import { DomainError } from "../../error/domainError";
const turnGateway = new TurnGateway()
const squareGateway = new SquareGateway()
const moveGateway = new MoveGateway()
export class TurnRepository {

  async findByGameIdAndTurnCount(conn: mysql.Connection, gameId: number, turnCount: number): Promise<Turn> {
    const turnRecord = await turnGateway.findByGameIdAndTurnCount(
      conn,
      gameId,
      turnCount
    )
    if (!turnRecord) {
      throw new DomainError('SpecifiedTurnIsNotFound', 'Specified turn not found')
    }

    const squareRecords = await squareGateway.findByTurnId(
      conn,
      turnRecord.id
    )
    const board = Array.from(Array(8)).map(() => Array.from(Array(8)))
    squareRecords.forEach((s) => {
      board[s.y][s.x] = s.disc
    })

    const moveRecord = await moveGateway.findByTurnId(
      conn,
      turnRecord.id
    )
    let move: Move | undefined
    if (moveRecord) {
      move = new Move(toDisc(moveRecord.disc), new Point(moveRecord.x, moveRecord.y))
    }

    return new Turn(turnRecord.gameId, turnRecord.turnCount, toDisc(turnRecord.nextDisc), move, new Board(board), turnRecord.endAt)
  }

  async save(conn: mysql.Connection, turn: Turn) {
    const turnRecord = await turnGateway.insert(
      conn,
      turn.gameId,
      turn.turnCount,
      turn.nextDisc,
      turn.endAt
    )
    await squareGateway.insertAll(conn, turnRecord.id, turn.board.discs)

    if (turn.move) {
      await moveGateway.insert(conn, turnRecord.id, turn.move.disc, turn.move.point.x, turn.move.point.y)
    }
  }
}