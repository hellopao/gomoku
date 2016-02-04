"use strict";

export const ChessBoxCount = 14;                    //棋盘每一行格子数量
export const ChessBoxWidth = 40;                    //棋盘每个格子宽度
export const ChessManRadius = ChessBoxWidth / 2;    //棋子的半径 （格子宽度的一半）

export const ChessStatus = {
    "LOCKED": 0,
    "PLAYING": 1,
    "FINISHED": 2
};

export const ChessManTypes = {
    "WHITE": {
        name: "白棋",
        value: 0,
        color: "rgb(255,255,255)"
    },
    "BLACK": {
        name: "黑棋",
        value: 1,
        color: "rgb(0,0,0)"
    }  
};

export const ChessMode = {
    "AI": 0,
    "BATTLE": 1
}