import mysql from "mysql2/promise";
import { MoveRecord } from "./moveRecord";

export class MoveGateway {
  async findByTurnId(
    conn: mysql.Connection,
    turnId: number
  ): Promise<MoveRecord | undefined> {
    const moveSelectResult = await conn.execute<mysql.RowDataPacket[]>(
      'SELECT id, turn_id, disc, x, y FROM moves WHERE turn_id = ?',
      [turnId]
    );
    const record = moveSelectResult[0][0];

    if (!record) {
      return undefined;
    }

    return new MoveRecord(
      record.id,
      record.turn_id,
      record.disc,
      record.x,
      record.y
    );
  }

  async insert(
    conn: mysql.Connection,
    turnId: number,
    disc: number,
    x: number,
    y: number
  ): Promise<MoveRecord> {
    const moveInsertResult = await conn.execute<mysql.ResultSetHeader>(
      'INSERT INTO moves (turn_id, disc, x, y) VALUES (?, ?, ?, ?)',
      [turnId, disc, x, y]
    );
    const moveId = moveInsertResult[0].insertId;

    return new MoveRecord(moveId, turnId, disc, x, y);
  }
} 