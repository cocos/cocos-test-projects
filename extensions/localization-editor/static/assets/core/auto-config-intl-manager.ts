import l10n from './l10n-manager';
import { game, cclegacy } from 'cc';
// @ts-expect-error 
import { EDITOR } from 'cc/env';
if (cclegacy.GAME_VIEW || EDITOR) { // for Editor
    // @ts-expect-error we need top level await in Editor
    await l10n.createIntl({});

} else { // for Runtime or Preview
    game.onPostProjectInitDelegate.add(
        () => l10n.createIntl({}),
    );
}

