// @ts-ignore
import { runScene, testCase, testClass, beforeClass, sleep } from "db://automation-framework/runtime/test-framework.mjs";
import { EventKeyboard, find, KeyCode } from "cc";
import { screenshot_custom } from "../common/utils";

import { Puzzle as PuzzleObj } from "../../../cases/middleware/tiled-map/puzzle";

@runScene("puzzle")
@testClass('Puzzle')
export class Puzzle {
    _dt = 10;
    puzzle: PuzzleObj | undefined;

    @beforeClass
    async initData(){
        //@ts-ignore
        this.puzzle = find("Canvas/wrapper/map").getComponent("Puzzle");
    }

    @testCase
    async startPlay() {
        await screenshot_custom(this._dt);
    }

    @testCase
    async play_up() {
        this.move(KeyCode.ARROW_UP);
        await screenshot_custom(this._dt);
    }

    @testCase
    async play_down() {
        this.move(KeyCode.ARROW_DOWN);
        await screenshot_custom(this._dt);
    }

    @testCase
    async play_right() {
        this.move(KeyCode.ARROW_RIGHT);
        await screenshot_custom(this._dt);
    }

    @testCase
    async play_left() {
        this.move(KeyCode.ARROW_LEFT);
        await screenshot_custom(this._dt);
    }

    @testCase
    async play_block() {
        this.move(KeyCode.ARROW_LEFT);
        //@ts-ignore
        if(this.puzzle?.isBlocked){
            await screenshot_custom(this._dt);
        }
    }

    @testCase
    async playing(){
        //up:8
        for(let i=0;i<8;i++){
            this.move(KeyCode.ARROW_UP);
        }
        //left:1
        this.move(KeyCode.ARROW_LEFT);
        //up:3
         for(let i=0;i<3;i++){
            this.move(KeyCode.ARROW_UP);
        }
        //right:3
        for(let i=0;i<3;i++){
            this.move(KeyCode.ARROW_RIGHT);
        }  
        //down:3
        for(let i=0;i<3;i++){
            this.move(KeyCode.ARROW_DOWN);
        }  
         //right:3
         for(let i=0;i<3;i++){
            this.move(KeyCode.ARROW_RIGHT);
        } 
         //up:5
         for(let i=0;i<5;i++){
            this.move(KeyCode.ARROW_UP);
        } 
        //left:1
        this.move(KeyCode.ARROW_LEFT);
        
        //up:5
        for(let i=0;i<5;i++){
            this.move(KeyCode.ARROW_UP);
        } 
        //left:6
        for(let i=0;i<6;i++){
            this.move(KeyCode.ARROW_LEFT);
        } 
        //up:2
        for(let i=0;i<2;i++){
            this.move(KeyCode.ARROW_UP);
        } 
        //left:3
        for(let i=0;i<3;i++){
            this.move(KeyCode.ARROW_RIGHT);
        } 
        //up:1
        this.move(KeyCode.ARROW_UP);

        //right:1
        this.move(KeyCode.ARROW_RIGHT);

        //up:3
        for(let i=0;i<3;i++){
            this.move(KeyCode.ARROW_UP);
        } 
        //right:5
        for(let i=0;i<5;i++){
            this.move(KeyCode.ARROW_RIGHT);
        } 
        //up:1
        this.move(KeyCode.ARROW_UP);

        //right:2
        for(let i=0;i<2;i++){
            this.move(KeyCode.ARROW_RIGHT);
        } 
        //down:7
        for(let i=0;i<7;i++){
            this.move(KeyCode.ARROW_DOWN);
        } 
        //right:3
        for(let i=0;i<3;i++){
            this.move(KeyCode.ARROW_RIGHT);
        } 
        //down:2
        for(let i=0;i<2;i++){
            this.move(KeyCode.ARROW_DOWN);
        } 
        //right:13
        for(let i=0;i<13;i++){
            this.move(KeyCode.ARROW_RIGHT);
        } 
        //up:3
        for(let i=0;i<3;i++){
            this.move(KeyCode.ARROW_UP);
        } 
        //left:1
        this.move(KeyCode.ARROW_LEFT);
        //up:7
        for(let i=0;i<7;i++){
            this.move(KeyCode.ARROW_UP);
        } 
        //left:7
        for(let i=0;i<7;i++){
            this.move(KeyCode.ARROW_LEFT);
        } 
        //@ts-ignore
        if(find("Canvas/wrapper/succeedLayer/restartBtn").getComponent("cc.Button")){
            await sleep(2);
            await screenshot_custom(this._dt);
        }else{
            console.error(`【script error】className:${Puzzle.name},functionName:${this.playing.name} can't find restartBtn`);
        }
    }

    @testCase
    async restartPlaying(){
        this.restartGame();
        await screenshot_custom(this._dt);
    }



    move(key:KeyCode){
        //UP = 1, DOWN = 2, LEFT = 3, RIGHT = 4
        //@ts-ignore
        this.puzzle._onKeyPressed(new EventKeyboard(key));
    }


    restartGame(){
        //@ts-ignore
        find("Canvas/wrapper/succeedLayer/restartBtn").getComponent("cc.Button").clickEvents[0].emit([]);
    }

}
