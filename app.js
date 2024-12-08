const Gameboard = (function() {
    const gameboard = [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ];

    return{

        getBoard: function(){
            return gameboard;
        },
        makeMove: function(row,col,player){
            if(gameboard[row][col] === null){
                gameboard[row][col] = player;
                return true;
            }
            return false;
        },
        reset : function(){
            for(i = 0; i < gameboard.length; i++){
                for(y = 0; y < gameboard[i].length; y++){
                    gameboard[i][y] = null;
                }
            }
        },
        display: function(){
            gameboard.forEach(row => {
                console.log(row.map(cell => cell || " ").join(" | "));
                console.log("---------");
            })
        }
    };
})();