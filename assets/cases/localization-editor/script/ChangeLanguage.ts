import { _decorator, Component, game } from 'cc';
import intl from 'db://localization-editor/core/l10n-manager';
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
        const languages = intl.languages;
        console.log(languages);
        const currentLanguage = intl.currentLanguage;
        let currentLanguageIndex = languages.findIndex(lan => lan === currentLanguage);
        currentLanguageIndex = (currentLanguageIndex + 1) % languages.length
        console.log(`will change to ${languages[currentLanguageIndex]}`)
        await intl.changeLanguage(languages[currentLanguageIndex])
    }
}

