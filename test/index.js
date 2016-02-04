"use strict";

import Gomoku from "../gomoku";

const el = document.getElementById('gomoku');

const gomoku = new Gomoku(el);

gomoku.addPlayer({
    name: "Jerry"
});

gomoku.addPlayer({
    name: "Tom"
});

gomoku.start();