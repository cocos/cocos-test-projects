// @ts-ignore
import { runScene, testCase, testClass,sleep } from "db://automation-framework/runtime/test-framework.mjs";
import { find } from "cc";
import { screenshot_custom } from "../common/utils";


@runScene("puzzle")
@testClass('Puzzle')
export class Puzzle {
    _dt = 10;
    
    @testCase
    async startPlay() {
        await screenshot_custom(this._dt);
    }

    @testCase
    async play_up() {
        this.move(1)
        await screenshot_custom(this._dt);
    }

    @testCase
    async play_down() {
        this.move(2)
        await screenshot_custom(this._dt);
    }

    @testCase
    async play_right() {
        this.move(4)
        await screenshot_custom(this._dt);
    }

    @testCase
    async play_left() {
        this.move(3)
        await screenshot_custom(this._dt);
    }

    @testCase
    async play_block() {
        this.move(3)
        //@ts-ignore
        if(find("Canvas/wrapper/map").getComponent("Puzzle").string==='This way is blocked!'){
            await screenshot_custom(this._dt);
        }
    }

    @testCase
    async playing(){
        //up:8
        for(let i=0;i<8;i++){
            this.move(1);
        }
        //left:1
        this.move(3)
         //up:3
         for(let i=0;i<3;i++){
            this.move(1);
        }

        //right:3
        for(let i=0;i<3;i++){
            this.move(4);
        }  
        
        //down:3
        for(let i=0;i<3;i++){
            this.move(2);
        }  
     
         //right:3
         for(let i=0;i<3;i++){
            this.move(4);
        } 

         //up:5
         for(let i=0;i<5;i++){
            this.move(1);
        } 
        //left:1
        this.move(3);
        
        //up:5
        for(let i=0;i<5;i++){
            this.move(1);
        } 
        //left:6
        for(let i=0;i<6;i++){
            this.move(3);
        } 
        //up:2
        for(let i=0;i<2;i++){
            this.move(1);
        } 
        //left:3
        for(let i=0;i<3;i++){
            this.move(4);
        } 
        //up:1
        this.move(1);

        //right:1
        this.move(4);

        //up:3
        for(let i=0;i<3;i++){
            this.move(1);
        } 
        //right:5
        for(let i=0;i<5;i++){
            this.move(4);
        } 
        //up:1
        this.move(1);

        //right:2
        for(let i=0;i<2;i++){
            this.move(4);
        } 

        //down:7
        for(let i=0;i<7;i++){
            this.move(2);
        } 
        //right:3
        for(let i=0;i<3;i++){
            this.move(4);
        } 
        //down:2
        for(let i=0;i<2;i++){
            this.move(2);
        } 
        //right:13
        for(let i=0;i<13;i++){
            this.move(4);
        } 
        //up:3
        for(let i=0;i<3;i++){
            this.move(1);
        } 
        //left:1
        this.move(3);
        //up:7
        for(let i=0;i<7;i++){
            this.move(1);
        } 
        //left:7
        for(let i=0;i<7;i++){
            this.move(3);
        } 
        //@ts-ignore
        if(find("Canvas/wrapper/succeedLayer/restartBtn").getComponent("cc.Button")){
            await sleep(2);
            await screenshot_custom(this._dt);
        }else{
            console.error(`【script error】className:${Puzzle.name},functionName:${this.playing.name} can't find restartBtn`)
        }
    }

    @testCase
    async restartPlaying(){
        this.restartGame();
        await screenshot_custom(this._dt);
    }



    move(moveDirectionEnum:number){
        //UP = 1, DOWN = 2, LEFT = 3, RIGHT = 4
        //@ts-ignore
        find("Canvas/wrapper/map").getComponent("Puzzle").simulateMove(moveDirectionEnum)
    }


    restartGame(){
        //@ts-ignore
        find("Canvas/wrapper/succeedLayer/restartBtn").getComponent("cc.Button").clickEvents[0].emit([]) 
    }

}
