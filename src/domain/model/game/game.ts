import { firstTurn } from '../turn/turn'
import { Turn } from '../turn/turn'

export class Game {
  constructor(
    private _id: number | undefined,
    private _startedAt: Date,
  ) {}

  get id() {
    return this._id
  }

  get startedAt() {
    return this._startedAt
  }

  static start() {
    const now = new Date()
    const game = new Game(undefined, now)
    return game
  }
} 