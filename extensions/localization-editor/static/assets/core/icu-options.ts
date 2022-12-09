import { FallbackLanguage, L10nValue } from './l10n-options';

export type FormattedValue = string;
export type TextInfoDirection = 'ltr' | 'rtl';

export interface StandardOption {
    count?: number;
    // 暂不开放
    // context?: string
    defaultValue?: L10nValue;
    // returnObjects?: boolean;
    language?: Intl.BCP47LanguageTag;
    fallbackLanguage?: FallbackLanguage;
    // 暂不开放
    // joinArrays?: string
}

export interface Template {
    [key: string]:
    | string
    | {
        [key: string]: StandardOption;
    };
}

export interface NumberFormatOptions extends Intl.NumberFormatOptions {
    style?: 'decimal' | 'percent' | 'currency' | string;
    /**
     * 货币代码，采用ISO 4217标准
     * @see ISO4217Tag
     */
    currency?: string;
    currencySign?: 'standard' | 'accounting' | string;
    currencyDisplay?: 'symbol' | 'code' | 'name' | string;
    useGrouping?: boolean;
    minimumIntegerDigits?: number;
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
    minimumSignificantDigits?: number;
    maximumSignificantDigits?: number;
}

export interface DateTimeFormatOptions {
    localeMatcher?: 'best fit' | 'lookup' | undefined | string;
    weekday?: 'long' | 'short' | 'narrow' | undefined | string;
    era?: 'long' | 'short' | 'narrow' | undefined | string;
    year?: 'numeric' | '2-digit' | undefined | string;
    month?: 'numeric' | '2-digit' | 'long' | 'short' | 'narrow' | undefined | string;
    day?: 'numeric' | '2-digit' | undefined | string;
    hour?: 'numeric' | '2-digit' | undefined | string;
    minute?: 'numeric' | '2-digit' | undefined | string;
    second?: 'numeric' | '2-digit' | undefined | string;
    timeZoneName?: 'long' | 'short' | undefined | string;
    formatMatcher?: 'best fit' | 'basic' | undefined | string;
    hour12?: boolean | undefined;
    timeZone?: string | undefined;
}

export type RelativeTimeFormatUnit = 'second' | 'minute' | 'hour' | 'day' | 'month' | 'year' | string;

export interface RelativeTimeFormatOptions {
    localeMatcher?: 'lookup' | 'best fit' | string;
    style?: 'narrow' | 'short' | 'long' | string;
    numeric?: 'auto' | 'always' | string;
}
