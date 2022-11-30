/**
 * 技术指导: hao.wang、xin.Li
 * Author: xiaolong.he
 * Date: 2021-12-01
 */

import { Game, game } from 'cc';
import { EDITOR } from 'cc/env';
// @ts-ignore
import { Runner } from 'db://automation-framework/runtime/test-framework.mjs';

/**
 *  注册监听游戏事件
 */
game.on(Game.EVENT_GAME_INITED, () => {
    game.onStart = () => {
        if (!EDITOR) {
            Runner.run();
        }
    };
}, this);


