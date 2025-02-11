import { connectMySQL } from '../dataaccess/connection'
import { toDisc } from '../domain/turn/disc';
import { Point } from '../domain/turn/point';
import { TurnRepository } from '../domain/turn/turnRepository'
import { GameRepository } from '../domain/game/gameRepository';

const gameRepository = new GameRepository()

class FindLatestGameTurnByTurnCountOutput {
  constructor(
    private _turnCount: number,
    private _board: number[][],
    private _nextDisc: number | undefined,
    private _winnerDisc: number | undefined
  ) {}

  get turnCount() {
    return this._turnCount
  }

  get board() {
    return this._board
  }

  get nextDisc() {
    return this._nextDisc
  }

  get winnerDisc() {
    return this._winnerDisc
  }
}

export class TurnService {
  async findLatestGameTurnByTurnCount(
    turnCount: number
  ): Promise<FindLatestGameTurnByTurnCountOutput> {
    const conn = await connectMySQL()
    try {
      const game = await gameRepository.findLatest(conn)
      if (!game) {
        throw new Error('Game not found')
      }
      if (!game.id) {
        throw new Error('game.id is not exist')
      }

      const turnRepository = new TurnRepository()
      const turn = await turnRepository.findByGameIdAndTurnCount(conn, game.id, turnCount)

      return new FindLatestGameTurnByTurnCountOutput(
        turn.turnCount,
        turn.board.discs,
        turn.nextDisc,
        // TODO 決着がついている場合、game_results テーブルから取得する
        undefined
      )
    } finally {
      await conn.end()
    }
  }

  async registerTurn(turnCount: number, disc: number, x: number, y: number) {
    const conn = await connectMySQL()
    try {
      await conn.beginTransaction()

      // 1つ前のターンを取得する
      const game = await gameRepository.findLatest(conn)
      if (!game) {
        throw new Error('Game not found')
      }
      if (!game.id) {
        throw new Error('game.id is not exist')
      }

      const previousTurnCount = turnCount - 1
      const turnRepository = new TurnRepository()
      const previousTurn = await turnRepository.findByGameIdAndTurnCount(conn, game.id, previousTurnCount)

      // 石を打つ
      const newTurn = previousTurn.placeNext(toDisc(disc), new Point(x, y))

      // ターンを保存する
      await turnRepository.save(conn, newTurn)

      await conn.commit()
    } finally {
      await conn.end()
    }
  }
}
