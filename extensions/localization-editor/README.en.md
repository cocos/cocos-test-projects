# Localization Editor Api

## Quick Start

### [Core Features `l10n`](#l10n)

l10n provides the core translation function and icu function, as well as the function to switch languages.

We will store the switched target language in `localStorage` and also automatically restart the project runtime and read the `localStorage` configuration at the next start to complete the whole language switching process.

> ***So we want users to make sure to handle data persistence before switching languages***

### Import the [`l10n`](#l10n) module

All api's provided by localization-editor will be imported by name from db://localization-editor/l10n

```typescript
import { l10n } from 'db://localization-editor/l10n'
```

### Use the translation api

```typescript
// in the code of any component component

// l10n is the core functionality of localization
import { l10n } from 'db://localization-editor/l10n'
import { _decorator, Label, Component } from 'cc';

@ccclass('SomeComponent')
class SomeComponent extends Component {
    // ......
    someMethod() {
        // will return the text corresponding to this_is_an_apple
        const text = l10n.t("this_is_an_apple")
    }
    // ......
}
```

### API details

- Class:[`L10nManager`](#l10nmanager)

---

- Interface:[`ResourceList`](#resourcelist)

- Interface:[`ResourceBundle`](#resourcebundle)

- Interface:[`ResourceData`](#resourcedata)

- Interface:[`ResourceItem`](#resourceitem)

- Interface:[`FallbackLanguageObjectList`](#fallbacklanguageobjectlist)

- Interface:[`L10nOptions`](#l10noptions)

- Interface:[`StandardOption`](#standardoption)

---

- Enumerations:[`L10nListenEvent`](#l10nlistenevent)

---

- Alias:[`L10nKey`](#alternate name)

- Alias:[`L10nValue`](#alternate)

- Alias:[`TextInfoDirection`](# alias)

- Alias:[`FallbackLanguage`](# alias)

---

# `L10nManager`

Import example.

```ts
import { L10nManager } from 'db://localization-editor/l10n'

```

Description.

Normally we do not recommend that you use or construct this type yourself.

Instead, we provide [``l10n``](#l10n) as a global singleton to use the translation functionality.

---

## Index

### Constructor

- `L10nManager` **private**

---

### Global variables

#### `l10n`

Definition: `const l10n: L10nManager`

---

### Static properties

#### `LOCAL_STORAGE_LANGUAGE_KEY`

Definition: `static LOCAL_STORAGE_LANGUAGE_KEY: string`

Description: When calling [`changeLanguage`](#changelanguage) to switch the game language, `localStorage` is used to
and use [`LOCAL_STORAGE_LANGUAGE_KEY`](#localstoragelanguagekey) as the key of `localStorage`.

Remarks.

| default | localization-editor/language |
|-----|------------------------------|
---

### Instance methods

#### `config`

Definition: `config(options: L10nOptions): void`

Description: Used to configure certain settings of l10n, see [`L10nOptions`](#l10noptions) for more options.

Use case:

```ts
l10n.config({
    // Used to display the default language with this value if no translation is found
    fallbackLanguage: 'zh-Hans-CN',
    // If you don't like the default value of LOCAL_STORAGE_LANGUAGE_KEY, you can change it here, but make sure it's before changeLanguage
    localStorageLanguageKey: 'localization-editor/langauge'
})

```

---

#### `changeLanguage`

Definition: `changeLanguage(language: Intl.BCP47LanguageTag): void`

Description: Used to dynamically switch languages, see [``BCP47 Language Tag``](https://www.techonthenet.com/js/language_tags.php) for more information

Use case:

```ts
l10n.changeLanguage('zh-Hans-CN')
```

> ***Note: After calling this method, the game will be restarted automatically, please make sure to do the data persistence work***

---

#### `t`

Definition: `t(key: L10nKey, options?: StandardOption): L10nValue`

Description: Returns the L10nValue corresponding to the current language data according to the incoming L10nKey, see [`StandardOption`](#standardoption) for more options.

Use case:

```ts
console.log(l10n.t('this_is_apple'))
// This is an apple
```

> ***Note: The language data needs to be generated after compilation with the Localization Editor plugin.***
>
> ***Cannot use l10n.t in static initialization, e.g. `static name = l10n.t('xxx_name')`***
>
> ***Unable to scan when variable is used as parameter, e.g. `let name = 'this_is_apple'; l10n.t(name)`***

---

#### `exists`

Definition: `exists(key: L10nKey): boolean`

Description: Returns whether the key exists or not

Use case:

```ts
console.log(l10n.exists('test_key'))
```

---

#### `currentLanguage`

Definition: `get currentLanguage(): Intl.BCP47LanguageTag`

Description: Returns the [``BCP47 Language Tag``](https://www.techonthenet.com/js/language_tags.php) for the current language.

Use case:

```ts
console.log(l10n.currentLanguage)
// 'zh-Hans-CN'
```

---

#### `languages`

Definition: `get languages(): readonly Intl.BCP47LanguageTag[]`

Description: Returns an array of [``BCP47 Language Tag``](https://www.techonthenet.com/js/language_tags.php) for the currently available languages, which can be used as a data source for switching language dropdown boxes

Use case:

```ts
console.log(l10n.languages)
// ['zh-Hans-CN', 'en-US']
```

---

#### `direction`

Definition: `direction(language?: Intl. BCP47LanguageTag): TextInfoDirection`

Description: Most languages respect the left-to-right reading convention, but some languages are exceptions such as Arabic, this method learns the [TextInfoDirection](#textinfodirection) of the incoming language.

Use case:

```ts
console.log(l10n.direction('ar'))
// 'rtl'
```

---

#### `on`

Definition: `on(event: L10nListenEvent, callback: (. .args: any[]) => void)`

Description: Used to register [L10nListenEvent](#l10n) event callbacks for [l10n](#l10nlistenevent), such as `languageChanged`.

use case:

```ts
l10n.on(L10nListenEvent.languageChanged, (. .args: any[]) => {
    // some actions after switching language, some data can be persisted here and the whole game scene will be restarted afterwards
})
```

--

#### `off`

Definition: `off(event: L10nListenEvent, callback: (.. .args: any[]) => void)`

Description: Callback for the [L10nListenEvent](#L10n) event used to counter-register [l10n](#L10nListenEvent)

> ***Make sure to make on and off appear in pairs to ensure proper destruction of useless data***

---

# Alias

| alias | original type |
|---------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------|
| `L10nKey` | `string` |
| `L10nValue` | `string` |
| `TextInfoDirection` | `'ltr' / 'rtl'` |
| `FallbackLanguage` | `string / readonly string[] / FallbackLanguageObjectList / ((language: Intl.BCP47LanguageTag) => string / readonly string[] / FallbackLanguageObjectList` |
---

# Interface

## `L10nOptions`

| function/variable name | type | optional |
|---------------------------|-------------------------------------|-----|
| `fallbackLanguage` | `false` / [`FallbackLanguage`](# alias) | yes |
| `localStorageLanguageKey` | `string` | yes |
| `beforeTranslate` | `(key: L10nKey) => L10nValue` | yes |
| `afterTranslate` | `(key: L10nKey) => L10nValue` | yes |
| `returnNull` | `boolean` | yes |
| `returnEmptyString` | `boolean` | yes |

---

## `ResourceList`

| function/variable name | type | optional |
|--------------------|---------------------------|-----|
| `defaultLanguage` | `Intl.BCP47LanguageTag` | yes |
| `fallbackLanguage` | `Intl.BCP47LanguageTag` | yes |
| `languages` | `Intl.BCP47LanguageTag[]` | no |

## `ResourceBundle`

| function/variable name | type | optional |
|-------------------------------------|---------------------------------|-----|
| `[language: Intl.BCP47LanguageTag]` | [`ResourceData`](#resourcedata) | no |

---

## `ResourceData`

| function/variable name | type | optional |
|-----------------------|---------------------------------|-----|
| `[namespace: string]` | [`ResourceItem`](#resourceitem) | no |

---

## `ResourceItem`

| function/variable name | type | optional |
|-----------------|-------|-----|
| `[key: string]` | `any` | no |

---

## `FallbackLanguageObjectList`

| function/variable name | type | optional |
|----------------------|---------------------|-----|
| `[language: string]` | `readonly string[]` | no |

---

## `StandardOption`

| function/variable name | type | optional |
|--------------------|---------------------------|-----|
| `count` | `number` | yes |
| `defaultValue` | `L10nValue` | yes |
| `language` | `Intl.BCP47LanguageTag` | yes |
| `fallbackLanguage` | [`FallbackLanguage`](# alias) | yes |

---

# Enumerations

## `L10nListenEvent`

| function/variable name | type |
|-------------------|-------------------|
| `languageChanged` | `languageChanged` |
| `onMissingKey` | `missingKey` |
