import mysql from "mysql2/promise";
import { SquareRecord } from "./squareRecord";

export class SquareGateway {
  async findByTurnId(
    conn: mysql.Connection,
    turnId: number
  ): Promise<SquareRecord[]> {
    const squareSelectResult = await conn.execute<mysql.RowDataPacket[]>(
      'SELECT id, turn_id, x, y, disc FROM squares WHERE turn_id = ? ORDER BY y, x',
      [turnId]
    );
    const records = squareSelectResult[0];

    return records.map((record) => {
      return new SquareRecord(
        record.id,
        record.turn_id,
        record.x,
        record.y,
        record.disc
      );
    });
  }

  async insertAll(
    conn: mysql.Connection,
    turnId: number,
    board: number[][]
  ): Promise<void> {
    const squareCount = board.reduce((acc, line) => acc + line.length, 0);

    const squaresInsertSql =
      'INSERT INTO squares (turn_id, x, y, disc) VALUES ' +
      Array(squareCount).fill('(?, ?, ?, ?)').join(', ');

    const squaresInsertValues: any[] = [];
    board.forEach((line, y) => {
      line.forEach((disc, x) => {
        squaresInsertValues.push(turnId);
        squaresInsertValues.push(x);
        squaresInsertValues.push(y);
        squaresInsertValues.push(disc);
      });
    });

    await conn.execute(squaresInsertSql, squaresInsertValues);
  }
} 