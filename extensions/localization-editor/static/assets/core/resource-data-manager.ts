// @ts-ignore
import { BUILD, EDITOR } from 'cc/env';
import { AssetManager, assetManager, JsonAsset, settings, Settings } from 'cc';
import { ResourceBundle, ResourceList } from './l10n-options';
import { mainName, pluginName, resourceBundlePath, resourceListPath, runtimeBundleName } from './localization-global';

export default class ResourceDataManager {
    async readResourceList(): Promise<ResourceList> {
        if (EDITOR) {
            return Editor.Message.request(mainName, 'get-resource-list');
        } else if (BUILD) {
            console.log(`[${pluginName}] this is build env`);
            return this.runtimeLoad(resourceListPath);
        } else {
            return this.previewLoad(resourceListPath);
        }
    }

    async readResourceBundle(tags: Intl.BCP47LanguageTag[]): Promise<ResourceBundle> {
        if (EDITOR) {
            return this.editorLoad(tags);
        } else if (BUILD) {
            return this.runtimeLoad(resourceBundlePath);
        } else {
            return this.previewLoad(resourceBundlePath);
        }
    }

    /**
     * 编辑器模式下使用
     * @param locales
     */
    async editorLoad(locales: Intl.BCP47LanguageTag[]): Promise<ResourceBundle | undefined> {
        return Editor.Message.request(mainName, 'get-resource-bundle', locales);
    }

    /**
     * 构建后运行时使用
     * @param fileName
     */
    async runtimeLoad<T>(fileName: string): Promise<T | undefined> {
        const bundle = await this.getBundle(runtimeBundleName);
        if (!bundle) return undefined;
        const jsonAsset = await this.getResource(bundle, fileName);
        if (!jsonAsset || !jsonAsset.json) return undefined;
        return jsonAsset.json as any as T;
    }

    /**
     * 浏览器预览使用
     * @param urlPath
     */
    async previewLoad<T>(urlPath: string): Promise<T | undefined> {
        try {
            return await (await fetch(`${mainName}/${urlPath}`)).json() as T;
        } catch (e) {
            return undefined;
        }
    }

    async checkBundle(bundleName: string): Promise<boolean> {
        const queryResult: { bundle: string, version: string }[] | null = settings.querySettings<{ bundle: string, version: string }[]>(Settings.Category.ASSETS, 'preloadBundles');
        const bundle = queryResult?.find((it) => it.bundle === bundleName);
        return !!bundle;
    }

    async getBundle(bundleName: string): Promise<AssetManager.Bundle | undefined> {
        return new Promise(resolve => {
            assetManager.loadBundle(bundleName, (error, bundle: AssetManager.Bundle) => {
                if (error) {
                    resolve(undefined);
                } else {
                    resolve(bundle);
                }
            });
        });
    }

    async getResource(bundle: AssetManager.Bundle, resourceName: string): Promise<JsonAsset | undefined> {
        return new Promise(resolve => {
            bundle.load(resourceName, (error, asset: JsonAsset) => {
                if (error) {
                    resolve(undefined);
                } else {
                    resolve(asset);
                }
            });
        });
    }
}
