"use strict";

import ChessBoard from "./lib/chessboard";
import ChessMan from "./lib/chessman";
import * as ChessConfig from "./lib/constants";

class Gomoku {
    
    constructor (el) {
        this.el = el;
        this.render();
        this.chessmen = [];
        this.turn = 0;
    }
    
    render () {
        this.canvas = document.createElement('canvas');
        this.canvas.width = this.canvas.height = ChessConfig.ChessBoxCount * ChessConfig.ChessBoxWidth;
        this.canvas.style.margin = ChessConfig.ChessBoxWidth + 'px';
        this.canvas.style.cursor = "pointer";
        
        this.ctx = this.canvas.getContext('2d');
        
        new ChessBoard(this.ctx);

        this.el.appendChild(this.canvas);
        
        this.bindEvents();
    }
    
    bindEvents () {
        this.canvas.addEventListener('click',(e)=>{
            let {x,y} = this.getCord(e.clientX,e.clientY);
            console.log(`x: ${x},y: ${y}`);
            
            const chessMan = new ChessMan(this.ctx);
            
            let cord = {
                x: Math.round(x / ChessConfig.ChessBoxWidth) * ChessConfig.ChessBoxWidth,
                y: Math.round(y / ChessConfig.ChessBoxWidth) * ChessConfig.ChessBoxWidth
            };
        
            const cordStr = `${cord.x},${cord.y}`;
            
            if (this.chessmen.findIndex(item => item === cordStr) !== -1) {
                return;
            }
            
            chessMan.put(cord.x,cord.y,this.turn === 0 ? ChessConfig.ChessBlack : ChessConfig.ChessWhite);
            
            this.chessmen.push(cordStr);
            this.switchTurn();
        },false);
        
        this.canvas.addEventListener('mousemove',(e) => {
            let {x,y} = this.getCord(e.clientX,e.clientY);
            
            let cord = {
                x: Math.round(x / ChessConfig.ChessBoxWidth) * ChessConfig.ChessBoxWidth,
                y: Math.round(y / ChessConfig.ChessBoxWidth) * ChessConfig.ChessBoxWidth
            };
        
            const cordStr = `${cord.x},${cord.y}`;
            
            if (this.chessmen.findIndex(item => item === cordStr) !== -1) {
                this.canvas.style.cursor = "not-allowed";
                return;
            }
            
            this.canvas.style.cursor = "pointer";
        },false);
    }
    
    switchTurn () {
        this.turn = this.turn ^ 1;
    }
    
    getCord (x,y) {
        return {
            x: x - this.canvas.offsetTop,
            y: y - this.canvas.offsetLeft
        }
    }
}

export default Gomoku;