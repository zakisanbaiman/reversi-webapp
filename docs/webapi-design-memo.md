# API設計メモ

## 対戦を開始する

「対戦」を登録する

POST /api/games

## 現在の盤面を見る

指定したターン数の「ターン」を取得する
GET /api/games/latest/turns/{turnCount}

レスポンスボディ
```json
{
  "turnCount": 1,
  "board": [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 2, 0, 0, 0],
    [0, 0, 0, 2, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ],
  "nextDisc": 1,
  "winnerDisc": 1
}
```

## 石を打つ
「ターン」を登録する

POST /api/games/latest/turns

リクエストボディ
```json
{
  "turnCount": 1,
  "move": {
    "disc": 1,
    "x": 2,
    "y": 3,
  }
}
```

## 勝敗を確認する

「対戦」の一覧を取得する

GET /api/games

レスポンスボディ
```json
{
  "games": [
    {
      "id": 1,
      "winnerDisc": 1,
      "startedAt": "2021-01-01T00:00:00Z",
    },
    {
      "id": 2,
      "winnerDisc": 2,
      "startedAt": "2021-01-02T00:00:00Z",
    }
  ]
}
```