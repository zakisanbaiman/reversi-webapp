import { DomainError } from "../../error/domainError";
import { Disc, isOppositeDisc } from "./disc";
import { Move } from "./move";
import { Point } from "./point";

export class Board {
  private _walledDiscs: Disc[][]

  constructor(private _discs: Disc[][]) {
    this._walledDiscs = this.wallDiscs()
  }

  private wallDiscs(): Disc[][] {
    const walled: Disc[][] = []

    const topAndBottomWall = Array(this._discs[0].length + 2).fill(Disc.Wall)

    // 上の壁
    walled.push(topAndBottomWall)

    // 2段目〜7段目
    this._discs.forEach((line) => {
      walled.push([Disc.Wall, ...line, Disc.Wall])
    })

    // 下の壁
    walled.push(topAndBottomWall)

    return walled
  }

  get discs() {
    return this._discs;
  }

  listFlipPoints(move: Move): Point[] {
    const flipPoints: Point[] = []

    // 番兵を置いた盤面では置きたい場所は1つ動いた位置になる
    const walledX = move.point.x + 1
    const walledY = move.point.y + 1

    const checkFlipPoints = (xMove: number, yMove: number) => {
      // ひっくり返す候補
      const flipCandidate: Point[] = []
  
      // 1つ動いた位置から開始
      let cursolX = walledX + xMove
      let cursolY = walledY + yMove
  
      while (isOppositeDisc(move.disc, this._walledDiscs[cursolY][cursolX])) {
        flipCandidate.push(new Point(cursolX - 1, cursolY - 1))
        // 上に進む（（Y軸は上に進むごとにcursolYが減る）
        cursolX += xMove
        cursolY += yMove
        // 次の手が自身と同じ色の場合は終了
        if (move.disc === this._walledDiscs[cursolY][cursolX]) {
          flipPoints.push(...flipCandidate)
          break
        }
      }
    } 

    // 上
    checkFlipPoints(0, -1)

    // 右上
    checkFlipPoints(1, -1)

    // 右
    checkFlipPoints(1, 0)

    // 右下
    checkFlipPoints(1, 1)

    // 下
    checkFlipPoints(0, 1)

    // 左下
    checkFlipPoints(-1, 1)

    // 左
    checkFlipPoints(-1, 0)

    // 左上
    checkFlipPoints(-1, -1)

    return flipPoints
  }

  place(move: Move): Board {
    // 盤面におけるかチェック
    if (this._discs[move.point.y][move.point.x] !== Disc.Empty) {
      throw new DomainError('SelectedPointIsNotEmpty', 'Invalid move')
    }

    // ひっくり返せる点をリストアップ
    const flipPoints = this.listFlipPoints(move)
    if (flipPoints.length === 0) {
      throw new DomainError('FlipPointsIsEmpty', 'Flip points is empty')
    }

    // 盤面をコピー
    const newDiscs = this._discs.map((line) => {
      return line.map((disc) => {
        return disc;
      });
    });

    // 石を置く
    newDiscs[move.point.y][move.point.x] = move.disc;

    // ひっくり返す
    flipPoints.forEach((p) => 
      newDiscs[p.y][p.x] = move.disc
    )
    
    return new Board(newDiscs);
  }
}

const E = Disc.Empty
const D = Disc.Dark
const L = Disc.Light

const INITIAL_DISCS = [
  [E, E, E, E, E, E, E, E],
  [E, E, E, E, E, E, E, E],
  [E, E, E, E, E, E, E, E],
  [E, E, E, D, L, E, E, E],
  [E, E, E, L, D, E, E, E],
  [E, E, E, E, E, E, E, E],
  [E, E, E, E, E, E, E, E],
  [E, E, E, E, E, E, E, E],
]

export const INITIAL_BOARD = new Board(INITIAL_DISCS)