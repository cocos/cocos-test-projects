/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { createInstance, i18n, InitOptions as I18NextInitOptions } from 'i18next';
// @ts-ignore
import { EDITOR, BUILD, PREVIEW } from 'cc/env';
import { game, assetManager } from 'cc';
import type { L10nOptions, ResourceData, L10nKey, L10nValue, ResourceItem } from './l10n-options';
import {
    DateTimeFormatOptions,
    FormattedValue,
    NumberFormatOptions,
    RelativeTimeFormatOptions,
    RelativeTimeFormatUnit,
    StandardOption,
    Template,
    TextInfoDirection,
} from './icu-options';
import L10nListenEvent from './l10n-listen-event';
import ResourceDataManager from './resource-data-manager';
import { mainName, pluginName } from './localization-global';
import { ResourceBundle, ResourceList } from './l10n-options';

export class L10nManager {
    static LOCAL_STORAGE_LANGUAGE_KEY = `${mainName}/language`;
    static readonly DEFAULT_NAMESPACE = 'translation' as const;
    static readonly ASSET_NAMESPACE = 'asset' as const;
    static readonly ALLOW_NAMESPACE = [L10nManager.DEFAULT_NAMESPACE, L10nManager.ASSET_NAMESPACE] as const;
    static l10n: L10nManager = new L10nManager();
    /**
     * @zh
     * i18n 实例
     * @en
     * i18next instance
     */
    private _intl?: i18n = undefined;

    private _options: L10nOptions = {};

    private resourceList?: ResourceList;

    private resourceBundle: ResourceBundle = {};

    public resourceDataManager: ResourceDataManager;

    private constructor() {
        this.resourceDataManager = new ResourceDataManager();
    }

    public isInitialized(): boolean {
        return this._intl?.isInitialized ?? false;
    }

    public async createIntl(options: L10nOptions) {
        const reloadResult = await this.reloadResourceData();
        if (!reloadResult) {
            return;
        }
        this._options = options;
        this._intl = createInstance();
        let localStorageLanguage: string | undefined = undefined;
        if (BUILD && !PREVIEW) {
            localStorageLanguage = localStorage.getItem(
                l10n['_options'].localStorageLanguageKey ?? L10nManager.LOCAL_STORAGE_LANGUAGE_KEY,
            );
            localStorageLanguage = this.checkLanguage(localStorageLanguage);
        }
        const defaultLanguage = localStorageLanguage ?? options.language ?? this.resourceList.defaultLanguage;
        const fallbackLanguage = options.fallbackLanguage ?? this.resourceList.fallbackLanguage;
        const resources = options.resources ?? this.resourceBundle;

        const i18nextOptions: I18NextInitOptions = {
            lng: defaultLanguage,
            fallbackLng: fallbackLanguage,
            resources: { ...resources },
            ns: L10nManager.ALLOW_NAMESPACE,
            defaultNS: L10nManager.DEFAULT_NAMESPACE,
            initImmediate: false,
            load: 'currentOnly',
        };
        await this._intl.init(i18nextOptions);
        this.setAssetOverrideMap(resources[defaultLanguage][L10nManager.ASSET_NAMESPACE]);

    }

    public checkLanguage(language: string): string | undefined {
        if (!language || language.length === 0 || language === 'null' || language === null || language === 'undefined' || language === undefined) {
            return undefined;
        }
        if (this.resourceList && this.resourceList.languages.length > 0 && this.resourceList.languages.find(it => it === language)) {
            return language;
        }
        return undefined;
    }

    public cloneIntl(options: L10nOptions) {
        if (!this._intl) {
            throw new Error('i18next not init, please use \'l10n.createIntl\'');
        }
        this._intl = this._intl.cloneInstance(options);
    }

    async reloadResourceData(): Promise<boolean> {
        this.resourceList = await this.resourceDataManager.readResourceList();
        if (!this.resourceList) {
            console.log(`[${pluginName}] not found translate language list, skip init l10n`);
            return false;
        }
        this.resourceBundle = await this.resourceDataManager.readResourceBundle(this.resourceList?.languages ?? []);
        if (!this.resourceList?.defaultLanguage) {
            console.log(`[${pluginName}] not found translate language data, skip init l10n`);
            return false;
        }
        return true;
    }

    /** 初始化 i18next */
    public config(options: L10nOptions) {
        this.cloneIntl(options);
    }

    public async changeLanguage(language: Intl.BCP47LanguageTag) {
        if (!language) {
            console.warn(`[${pluginName}] invalid language tag`);
            return;
        }
        console.log(`[${pluginName}] will change language to`, language);
        if (this._intl) {
            if (this.currentLanguage) {
                this.releaseOverrideMap(this.resourceBundle[this.currentLanguage][L10nManager.ASSET_NAMESPACE]);
            }
            await this._intl.changeLanguage(language);
            this.setAssetOverrideMap(this.resourceBundle[language][L10nManager.ASSET_NAMESPACE]);
            if (!EDITOR) {
                localStorage.setItem(L10nManager.LOCAL_STORAGE_LANGUAGE_KEY, language);
                console.log(`[${pluginName}] game will restart`);
                game.restart();
            }
        } else {
            console.log(`[${pluginName}] language data not load, please confirm whether the language data is included in the build`);
        }
    }

    public t(key: L10nKey, options?: StandardOption | Template): L10nValue {
        if (!(this._intl?.isInitialized ?? false)) return key;
        return this._intl!.t(key, options);
    }

    /**
     * 实验性功能暂不开放
     * 数字类ICU
     */
    private tn(value: number, options?: NumberFormatOptions): FormattedValue {
        if (!(this._intl?.isInitialized ?? false)) return value.toString();
        const cloneOptions: NumberFormatOptions = {};
        Object.assign(cloneOptions, options);
        type NumberFormatOptionsKey = keyof NumberFormatOptions;
        for (const key of Object.keys(cloneOptions) as NumberFormatOptionsKey[]) {
            if (typeof cloneOptions[key] === 'string' && (cloneOptions[key] as string)!.length === 0) {
                delete cloneOptions[key];
            } else if (typeof cloneOptions[key] === 'number' && cloneOptions[key] === 0) {
                delete cloneOptions[key];
            }
        }
        return new Intl.NumberFormat(this._intl?.language, cloneOptions).format(value);
    }

    /**
     * 实验性功能暂不开放
     * 日期/时刻类ICU
     */
    private td(date: Date, options?: DateTimeFormatOptions): FormattedValue {
        if (!(this._intl?.isInitialized ?? false)) return date.toString();
        const cloneOptions: DateTimeFormatOptions = {};
        Object.assign(cloneOptions, options);
        type DateTimeFormatOptionsKey = keyof DateTimeFormatOptions;
        for (const key of Object.keys(cloneOptions) as DateTimeFormatOptionsKey[]) {
            if (typeof cloneOptions[key] === 'string' && (cloneOptions[key] as string).length === 0) {
                delete cloneOptions[key];
            }
        }
        return new Intl.DateTimeFormat(this._intl?.language, cloneOptions as Intl.DateTimeFormatOptions).format(date);
    }

    /**
     * 实验性功能暂不开放
     * 时长类ICU
     */
    private tt(value: number, unit: RelativeTimeFormatUnit, options?: RelativeTimeFormatOptions): FormattedValue {
        if (!(this._intl?.isInitialized ?? false)) return value.toString();
        const cloneOptions: RelativeTimeFormatOptions = {};
        Object.assign(cloneOptions, options);
        type RelativeTimeFormatOptionsKey = keyof RelativeTimeFormatOptions;
        for (const key of Object.keys(cloneOptions) as RelativeTimeFormatOptionsKey[]) {
            if (typeof cloneOptions[key] === 'string' && (cloneOptions[key] as string).length === 0) {
                delete cloneOptions[key];
            }
        }
        return new Intl.RelativeTimeFormat(this._intl?.language, cloneOptions as Intl.RelativeTimeFormatOptions).format(
            value,
            unit as Intl.RelativeTimeFormatUnit,
        );
    }

    /**
     * 实验性功能暂不开放
     * 数组类ICU
     */
    private tl(value: string[]): FormattedValue {
        if (!(this._intl?.isInitialized ?? false)) return value.toString();
        return new Intl.ListFormat(this._intl?.language).format(value);
    }

    public exists(key: L10nKey): boolean {
        return this._intl?.exists(key) ?? false;
    }

    get currentLanguage(): Intl.BCP47LanguageTag {
        return this._intl?.language ?? '';
    }

    get languages(): readonly Intl.BCP47LanguageTag[] {
        return this.resourceList?.languages ?? [];
    }

    public direction(language?: Intl.BCP47LanguageTag): TextInfoDirection {
        return (language ? new Intl.Locale(language) : new Intl.Locale(this._intl!.language)).textInfo()
            .direction as TextInfoDirection;
    }

    public on(event: L10nListenEvent, callback: (...args: any[]) => void) {
        this._intl?.on(event, callback);
    }

    public off(event: L10nListenEvent, callback: (...args: any[]) => void) {
        this._intl?.off(event, callback);
    }

    public getResourceBundle(language: string, namespace: typeof L10nManager.ALLOW_NAMESPACE[number]): ResourceData | undefined {
        return this._intl?.getResourceBundle(language, namespace);
    }

    protected setAssetOverrideMap(assetNamespace: Readonly<ResourceItem>) {
        for (const key of Object.keys(assetNamespace)) {
            assetManager.assetsOverrideMap.set(key, assetNamespace[key]);
        }
    }

    protected releaseOverrideMap(assetNamespace: Readonly<ResourceItem>) {
        for (const key of Object.keys(assetNamespace)) {
            assetManager.assetsOverrideMap.delete(key);
        }
    }
}

const l10n: L10nManager = L10nManager.l10n;

export default l10n;
