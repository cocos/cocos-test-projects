import { _decorator, Component, game } from 'cc';
import { l10n } from 'db://localization-editor/l10n';
const { ccclass, property } = _decorator;

@ccclass('ChangeLanguage')
export class ChangeLanguage extends Component {
    onLoad() {
    }

    start() {

    }

    update(deltaTime: number) {
    }

    async changeLanguage() {
        const languages = l10n.languages;
        console.log(languages);
        const currentLanguage = l10n.currentLanguage;
        let currentLanguageIndex = languages.findIndex(lan => lan === currentLanguage);
        currentLanguageIndex = (currentLanguageIndex + 1) % languages.length
        console.log(`will change to ${languages[currentLanguageIndex]}`)
        await l10n.changeLanguage(languages[currentLanguageIndex])
    }
}

