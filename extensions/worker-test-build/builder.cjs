'use strict';
exports.configs = Object.fromEntries(['web-mobile', 'web-desktop', 'wechatgame']
    .map(platform => [platform, { hooks: './hooks.cjs' }]));
