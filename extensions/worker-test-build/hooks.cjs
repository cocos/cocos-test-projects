'use strict';
const fs = require('fs');
const path = require('path');
function packageWorkers(project, dest, platform) {
    if (!['web-mobile', 'web-desktop', 'wechatgame'].includes(platform)) return;
    if (!dest || !fs.statSync(dest).isDirectory()) throw new Error('Worker testcase build has no output directory.');
    const source = fs.readFileSync(path.join(project, 'workers/worker-test/spheres-worker.js'));
    const preview = fs.readFileSync(path.join(project, 'assets/resources/workers/spheres-worker.txt'));
    if (!source.equals(preview)) throw new Error('Worker preview source differs from packaged script: spheres-worker.js');
    const gameFile = path.join(dest, 'game.json');
    let game;
    if (platform === 'wechatgame') {
        game = JSON.parse(fs.readFileSync(gameFile, 'utf8'));
        if (game.workers && game.workers !== 'workers') {
            throw new Error('Worker testcase expects workers="workers"; resolve the existing worker directory first.');
        }
    }
    fs.mkdirSync(path.join(dest, 'workers'), { recursive: true });
    fs.writeFileSync(path.join(dest, 'workers/spheres-worker.js'), source);
    if (game && !game.workers) {
        game.workers = 'workers'; fs.writeFileSync(gameFile, JSON.stringify(game, null, 2) + '\n');
    }
    console.log('[worker-test-build] Packaged workers/spheres-worker.js');
}
exports.packageWorkers = packageWorkers;
exports.onAfterBuild = (options, result) => packageWorkers(Editor.Project.path, result && result.dest, options.platform);
