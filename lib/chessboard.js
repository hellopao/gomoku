"use strict";

import ChessBox from "./chessbox";
import * as ChessConfig from "./constants";

class ChessBoard {
    
    constructor (ctx) {
        this.ctx = ctx;
        this.render();
    }
    
    render () {
        for (let i = 0; i < ChessConfig.ChessBoxCount; i++) {
            for (let j = 0; j < ChessConfig.ChessBoxCount; j++) {
                new ChessBox(this.ctx,i * ChessConfig.ChessBoxWidth,j * ChessConfig.ChessBoxWidth);
            }
        }
    }
    
}

export default ChessBoard;