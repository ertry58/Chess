let gameOver = false

const canvas = document.querySelector(".canvas")
canvas.width = window.innerWidth
canvas.height = window.innerHeight
const ctx = canvas.getContext('2d')
const board =  new Image()
board.src = './Board.png'
const chess = new Image()
chess.src = './Chess.png'
const colors = {
    light: "#F0D9B5",
    dark: "#B58863"
};
const boardX = window.innerWidth / 4 + 100;
const boardY = window.innerHeight / 40 + 50;
 let currentTurn = 0
const boardWidth = 800;
const boardHeight = 800;
let turn = [
    "white",
    "black"
]
const cellWidth = boardWidth / 11;
const cellHeight = boardHeight / 10.9;
const cells = []
let pieceMove = new Audio()
pieceMove.src = "./move-self.mp3"
let victorius = new Audio()
victorius.src = "./Victory Fanfare   Spirit of America Ensemble.m4a"

let selectedPiece = null 
const position = [

]


let base = []

for(let r = 0 ; r<8 ; r++){
    for(let c = 0 ; c<8; c++){
        const cell = {
    row: r,
    col: c,

    x: boardX + c * cellWidth +19 ,
    y: boardY + r * cellHeight + 5,

    width: cellWidth,
    height: cellHeight}
cells.push(cell);
    }
    
}
board.onload = ()=>{
 ctx.drawImage(
    board,
    0,
    0,
    1600,
    1600,
    boardX,
    boardY,
    800,
    800
);
}

class Chess {

    constructor(
        image,
        sourceX,
        sourceY,
        sourceWidth,
        sourceHeight,
        x,
        y,
        name,
        type,
        color
    ){

        this.image = image;

        this.name = name;

        this.sourceX = sourceX;
        this.sourceY = sourceY;

        this.sourceWidth = sourceWidth;
        this.sourceHeight = sourceHeight;


        this.x = x;
        this.y = y;


        this.type = type;
        this.color = color;


        this.hasMoved = false;


        base.push(this);

    }




    draw(){

        const width = this.sourceWidth / 5;
        const height = this.sourceHeight / 5;


        ctx.drawImage(
            this.image,

            this.sourceX,
            this.sourceY,
            this.sourceWidth,
            this.sourceHeight,

            this.x - width / 2,
            this.y - height / 2,

            width,
            height
        );

    }





    getCurrentCell(){

        return cells.find(cell =>

            this.x >= cell.x &&
            this.x < cell.x + cell.width &&

            this.y >= cell.y &&
            this.y < cell.y + cell.height

        );

    }





    getPieceAt(cell){

        return base.find(piece =>

            piece !== this &&
            piece.getCurrentCell() === cell

        );

    }





    isEmpty(cell){

        return !this.getPieceAt(cell);

    }





    isEnemy(cell){

        const piece = this.getPieceAt(cell);

        return piece &&
        piece.color !== this.color;

    }





    isAlly(cell){

        const piece = this.getPieceAt(cell);

        return piece &&
        piece.color === this.color;

    }





    getCell(row,col){

        return cells.find(cell =>

            cell.row === row &&
            cell.col === col

        );

    }





    isPathClear(currentCell,destinationCell){


        const rowStep = Math.sign(
            destinationCell.row -
            currentCell.row
        );


        const colStep = Math.sign(
            destinationCell.col -
            currentCell.col
        );


        let row =
        currentCell.row + rowStep;


        let col =
        currentCell.col + colStep;



        while(
            row !== destinationCell.row ||
            col !== destinationCell.col
        ){


            const cell =
            this.getCell(row,col);



            if(!cell || !this.isEmpty(cell)){

                return false;

            }



            row += rowStep;
            col += colStep;


        }



        return true;

    }





    findKing(color){

        return base.find(piece =>

            piece.type === "king" &&
            piece.color === color

        );

    }





    // فقط بررسی میکند مهره میتواند به خانه حمله کند
    // بدون تست کیش

    canAttack(destinationCell){


        const currentCell =
        this.getCurrentCell();



        if(!currentCell || !destinationCell){

            return false;

        }



        if(this.type === "pawn"){


            const direction =
            this.color === "white"
            ? -1
            : 1;



            return (

                destinationCell.row === currentCell.row + direction &&

                Math.abs(
                    destinationCell.col -
                    currentCell.col
                ) === 1

            );


        }





        if(this.type === "knight"){


            const row =
            Math.abs(
                destinationCell.row -
                currentCell.row
            );


            const col =
            Math.abs(
                destinationCell.col -
                currentCell.col
            );


            return (

                (row === 2 && col === 1) ||

                (row === 1 && col === 2)

            );


        }





        if(this.type === "bishop"){


            const row =
            Math.abs(
                destinationCell.row -
                currentCell.row
            );


            const col =
            Math.abs(
                destinationCell.col -
                currentCell.col
            );


            return (

                row === col &&

                this.isPathClear(
                    currentCell,
                    destinationCell
                )

            );


        }





        if(this.type === "rook"){


            return (

                (
                    destinationCell.row === currentCell.row ||

                    destinationCell.col === currentCell.col
                )

                &&

                this.isPathClear(
                    currentCell,
                    destinationCell
                )

            );


        }





        if(this.type === "queen"){


            const row =
            Math.abs(
                destinationCell.row -
                currentCell.row
            );


            const col =
            Math.abs(
                destinationCell.col -
                currentCell.col
            );



            return (

                (
                    destinationCell.row === currentCell.row ||

                    destinationCell.col === currentCell.col ||

                    row === col
                )

                &&

                this.isPathClear(
                    currentCell,
                    destinationCell
                )

            );


        }





        if(this.type === "king"){


            const row =
            Math.abs(
                destinationCell.row -
                currentCell.row
            );


            const col =
            Math.abs(
                destinationCell.col -
                currentCell.col
            );


            return row <= 1 && col <= 1;


        }



        return false;


    }

        isKingInCheck(color){


        const king =
        this.findKing(color);



        if(!king){

            return false;

        }



        const kingCell =
        king.getCurrentCell();




        const enemies =
        base.filter(piece =>
            piece.color !== color
        );




        for(let enemy of enemies){


            if(
                enemy.canAttack(kingCell)
            ){

                return true;

            }


        }



        return false;


    }





    testMove(destinationCell){


        const oldX = this.x;
        const oldY = this.y;



        const target =
        this.getPieceAt(destinationCell);



        let index = -1;



        if(target){


            index =
            base.indexOf(target);


            base.splice(
                index,
                1
            );

        }





        this.x =
        destinationCell.x +
        destinationCell.width / 2;


        this.y =
        destinationCell.y +
        destinationCell.height / 2;




        const result =
        this.isKingInCheck(this.color);





        this.x = oldX;
        this.y = oldY;




        if(target){


            base.splice(
                index,
                0,
                target
            );


        }




        return result;


    }





    isCheckmate(color){


        if(!this.isKingInCheck(color)){

            return false;

        }




        const pieces =
        base.filter(piece =>
            piece.color === color
        );




        for(let piece of pieces){


            for(let cell of cells){



                if(
                    piece.canMove(cell)
                ){


                    return false;


                }


            }


        }



        return true;


    }






    canMove(destinationCell){


        const currentCell =
        this.getCurrentCell();



        if(!currentCell || !destinationCell){

            return false;

        }




        if(currentCell === destinationCell){

            return false;

        }




        if(this.isAlly(destinationCell)){

            return false;

        }





        // سرباز

        if(this.type === "pawn"){



            const direction =
            this.color === "white"
            ? -1
            : 1;



            // جلو رفتن

            if(

                destinationCell.row === currentCell.row + direction &&

                destinationCell.col === currentCell.col &&

                this.isEmpty(destinationCell)

            ){

                return !this.testMove(destinationCell);

            }





            // دو خانه اول

            if(

                !this.hasMoved &&

                destinationCell.row === currentCell.row + direction * 2 &&

                destinationCell.col === currentCell.col

            ){



                const middle =
                this.getCell(
                    currentCell.row + direction,
                    currentCell.col
                );



                if(
                    this.isEmpty(middle) &&
                    this.isEmpty(destinationCell)
                ){

                    return !this.testMove(destinationCell);

                }


            }





            // زدن مهره

            if(

                destinationCell.row === currentCell.row + direction &&

                Math.abs(
                    destinationCell.col -
                    currentCell.col
                ) === 1 &&

                this.isEnemy(destinationCell)

            ){

                return !this.testMove(destinationCell);

            }



            return false;


        }






        // اسب

        if(this.type === "knight"){


            if(this.canAttack(destinationCell)){

                return !this.testMove(destinationCell);

            }


            return false;


        }







        // فیل

        if(this.type === "bishop"){


            if(
                this.canAttack(destinationCell)
            ){

                return !this.testMove(destinationCell);

            }


            return false;


        }







        // رخ

        if(this.type === "rook"){


            if(
                this.canAttack(destinationCell)
            ){

                return !this.testMove(destinationCell);

            }


            return false;


        }







        // وزیر

        if(this.type === "queen"){


            if(
                this.canAttack(destinationCell)
            ){

                return !this.testMove(destinationCell);

            }


            return false;


        }







        // شاه

        if(this.type === "king"){



            if(
                this.canAttack(destinationCell)
            ){

                return !this.testMove(destinationCell);

            }



            return false;


        }




        return false;


    }






    moveShow(){


        cells.forEach(cell=>{


            if(this.canMove(cell)){


                ctx.fillStyle = "green";


                ctx.fillRect(

                    cell.x,
                    cell.y,
                    cell.width,
                    cell.height

                );


            }


        });


    }






    move(destinationCell){



        if(!this.canMove(destinationCell)){

            return false;

        }




        const target =
        this.getPieceAt(destinationCell);





        if(target && target.color !== this.color){



            const index =
            base.indexOf(target);



            if(index !== -1){

                base.splice(
                    index,
                    1
                );

            }


        }





        this.x =
        destinationCell.x +
        destinationCell.width / 2;



        this.y =
        destinationCell.y +
        destinationCell.height / 2;




        this.hasMoved = true;



        return true;


    }
}

function getCellPosition(row, col){

    const cell = cells.find(e =>
        e.row === row &&
        e.col === col
    )

    return {
        x: cell.x + cell.width / 2,
        y: cell.y + cell.height / 2
    }

}
chess.onload = () => {


    function createPiece(
        sourceX,
        sourceY,
        sourceWidth,
        sourceHeight,
        row,
        col,
        name,
        type,
        color
    ){

        const cell = cells.find(e =>
            e.row === row &&
            e.col === col
        );


        const x = cell.x + cell.width / 2;
        const y = cell.y + cell.height / 2;


        const piece = new Chess(
            chess,
            sourceX,
            sourceY,
            sourceWidth,
            sourceHeight,
            x,
            y,
            name,
            type,
            color
        );


        piece.draw();

        return piece;
    }



    // سیاه‌ها


    createPiece(
        205,220,144,217,
        0,0,
        "roke1B",
        "rook",
        "black"
    );


    createPiece(
        205,220,144,217,
        0,7,
        "roke2B",
        "rook",
        "black"
    );



    createPiece(
        380,190,171,247,
        0,1,
        "horse1B",
        "knight",
        "black"
    );


    createPiece(
        380,190,171,247,
        0,6,
        "horse2B",
        "knight",
        "black"
    );



    createPiece(
        600,154,142,283,
        0,2,
        "elephant1B",
        "bishop",
        "black"
    );


    createPiece(
        600,154,142,283,
        0,5,
        "elephant2B",
        "bishop",
        "black"
    );



    createPiece(
        789,129,140,308,
        0,3,
        "ministerB",
        "queen",
        "black"
    );



    createPiece(
        968,87,146,350,
        0,4,
        "kingB",
        "king",
        "black"
    );



    for(let col = 0; col < 8; col++){

        createPiece(
            43,259,113,178,
            1,col,
            `solider${col+1}B`,
            "pawn",
            "black"
        );

    }






    // سفیدها



    createPiece(
        205,624,144,250,
        7,0,
        "roke1W",
        "rook",
        "white"
    );


    createPiece(
        205,624,144,250,
        7,7,
        "roke2W",
        "rook",
        "white"
    );



    createPiece(
        379,580,172,263,
        7,1,
        "horse1W",
        "knight",
        "white"
    );


    createPiece(
        379,580,172,263,
        7,6,
        "horse2W",
        "knight",
        "white"
    );



    createPiece(
        600,556,143,287,
        7,2,
        "elephant1W",
        "bishop",
        "white"
    );


    createPiece(
        600,556,143,287,
        7,5,
        "elephant2W",
        "bishop",
        "white"
    );



    createPiece(
        789,532,141,311,
        7,3,
        "ministerW",
        "queen",
        "white"
    );



    createPiece(
        968,490,146,353,
        7,4,
        "kingW",
        "king",
        "white"
    );



    for(let col = 0; col < 8; col++){

        createPiece(
            41,653,116,190,
            6,col,
            `solider${col+1}W`,
            "pawn",
            "white"
        );

    }


};

canvas.addEventListener("click", (e)=>{
    if(gameOver=== true){
        
        if(gameOver === true){
        canvas.style.display = "none";
    document.querySelector(".gameOver").style.display = "inline";

    victorius.play();

    console.log("kir");
}

        return
    }else{

    
        

    const clickedCell = cells.find(cell =>
        e.clientX >= cell.x &&
        e.clientX <= cell.x + cell.width &&
        e.clientY >= cell.y &&
        e.clientY <= cell.y + cell.height
    );

   
    if(!clickedCell){
        return;
    }



    // انتخاب مهره
    if(selectedPiece === null){


        const piece = base.find(piece =>
            piece.getCurrentCell() === clickedCell
        );


        if(piece){
            if(piece.color != turn[currentTurn]){

                return

            }else{
                            selectedPiece = piece;

            redraw();

            selectedPiece.moveShow();
            
            }
        }


    }

    // حرکت مهره
    else{

    if(selectedPiece.canMove(clickedCell) === true){
                selectedPiece.move(clickedCell);


        redraw();
        pieceMove.play()
        

       

        
currentTurn = currentTurn === 0 ? 1 : 0


let enemyColor = turn[currentTurn];


let checker = base[0];

if(checker.isKingInCheck(enemyColor)){

    console.log("CHECK");


    if(checker.isCheckmate(enemyColor)){

        console.log("CHECKMATE");
        
        gameOver = true
      

    
    }
}


         selectedPiece = null;

    }else{
        selectedPiece = null
        return
        
    }
    }



}});



function redraw(){

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    ctx.drawImage(
        board,
        0,
        0,
        1600,
        1600,
        boardX,
        boardY,
        boardWidth,
        boardHeight
    );


    base.forEach(piece=>{

        piece.draw();

    });

    
}



console.log(cells[40]);