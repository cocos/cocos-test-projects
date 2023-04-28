import { _decorator, CCBoolean, CCInteger, CCString, Enum, Label } from 'cc';
// @ts-ignore
import { EDITOR } from 'cc/env';
// import ICUType from '../core/ICUType';
// import I18nComponent from './I18nComponent';
// import { DateTimeFormatOptions, NumberFormatOptions, RelativeTimeFormatOptions, RelativeTimeFormatUnit } from '../core/ICUOptions';
// import intl from '../core/IntlManager';

const {
    ccclass,
    property,
    requireComponent,
    executeInEditMode,
} = _decorator;

enum VirtualEnum {}

// @ccclass('ICUComponent')
// @executeInEditMode(true)
// @requireComponent(Label)
// export default class ICUComponent extends I18nComponent {
//     @property({ visible: false })
//     _icuValue = '';
//
//     @property
//     set icuValue(value: string) {
//         this._icuValue = value;
//         this.render();
//     }
//
//     get icuValue(): string {
//         return this._icuValue;
//     }
//
//     @property({ visible: false })
//         _type: ICUType = ICUType.DateTime;
//
//     @property({ visible: true, type: Enum(ICUType) })
//     set type(value: ICUType) {
//         this._type = value;
//     }
//
//     get type(): ICUType {
//         return this._type;
//     }
//
//     protected onLoad() {
//         super.onLoad();
//         if (this.label && !this._icuValue) {
//             this._icuValue = this.label.string;
//         }
//     }
//
//     protected start() {
//         this.render();
//     }
//
//     public render() {
//         super.render();
//         if (this._icuValue.length === 0) return;
//         let translatedString!: string;
//         try {
//             switch (this.type) {
//                 case ICUType.Number:
//                     translatedString = intl.tn(parseFloat(this.icuValue), this.numberFormatOptions);
//                     break;
//                 case ICUType.DateTime:
//                     translatedString = intl.td(new Date(this.icuValue), this.dateTimeFormatOptions);
//                     break;
//                 case ICUType.RelativeTime:
//                     translatedString = intl.tt(
//                         parseFloat(this.icuValue),
//                         this.relativeTimeUnit,
//                         this.relativeTimeFormatOptions,
//                     );
//                     break;
//                 case ICUType.List: {
//                     const icuList = this.icuValue.split(',');
//                     translatedString = intl.tl(icuList);
//                     break;
//                 }
//                 default:
//                     break;
//             }
//         } catch (e) {
//             translatedString = this._icuValue;
//         }
//         if (EDITOR) {
//             this.preview(translatedString);
//         } else {
//             this.label!.string = translatedString;
//         }
//     }
//
//     // ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ auto generate by script don't edit ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
//     /************************** NumberFormatOptions **************************/
//     @property({ visible: false })
//         numberFormatOptions: NumberFormatOptions = { useGrouping: false };
//     @property({
//         type: Enum(VirtualEnum),
//         group: 'Number',
//         visible(this: ICUComponent) {
//             return this.type === ICUType.Number;
//         },
//     })
//     set numberStyle(value: string) {
//         this.numberFormatOptions.style = value;
//         this.render();
//     }
//     get numberStyle(): string {
//         return this.numberFormatOptions.style as string;
//     }
//
//     @property({
//         type: CCString,
//         group: 'Number',
//         visible(this: ICUComponent) {
//             return this.type === ICUType.Number;
//         },
//     })
//     set currency(value: string) {
//         this.numberFormatOptions.currency = value;
//         this.render();
//     }
//     get currency(): string {
//         return this.numberFormatOptions.currency as string;
//     }
//
//     @property({
//         type: Enum(VirtualEnum),
//         group: 'Number',
//         visible(this: ICUComponent) {
//             return this.type === ICUType.Number;
//         },
//     })
//     set currencySign(value: string) {
//         this.numberFormatOptions.currencySign = value;
//         this.render();
//     }
//     get currencySign(): string {
//         return this.numberFormatOptions.currencySign as string;
//     }
//
//     @property({
//         type: Enum(VirtualEnum),
//         group: 'Number',
//         visible(this: ICUComponent) {
//             return this.type === ICUType.Number;
//         },
//     })
//     set currencyDisplay(value: string) {
//         this.numberFormatOptions.currencyDisplay = value;
//         this.render();
//     }
//     get currencyDisplay(): string {
//         return this.numberFormatOptions.currencyDisplay as string;
//     }
//
//     @property({
//         type: CCBoolean,
//         group: 'Number',
//         visible(this: ICUComponent) {
//             return this.type === ICUType.Number;
//         },
//     })
//     set useGrouping(value: boolean) {
//         this.numberFormatOptions.useGrouping = value;
//         this.render();
//     }
//     get useGrouping(): boolean {
//         return this.numberFormatOptions.useGrouping as boolean;
//     }
//
//     @property({
//         type: CCInteger,
//         group: 'Number',
//         visible(this: ICUComponent) {
//             return this.type === ICUType.Number;
//         },
//     })
//     set minimumIntegerDigits(value: number) {
//         this.numberFormatOptions.minimumIntegerDigits = value;
//         this.render();
//     }
//     get minimumIntegerDigits(): number {
//         return this.numberFormatOptions.minimumIntegerDigits as number;
//     }
//
//     @property({
//         type: CCInteger,
//         group: 'Number',
//         visible(this: ICUComponent) {
//             return this.type === ICUType.Number;
//         },
//     })
//     set minimumFractionDigits(value: number) {
//         this.numberFormatOptions.minimumFractionDigits = value;
//         this.render();
//     }
//     get minimumFractionDigits(): number {
//         return this.numberFormatOptions.minimumFractionDigits as number;
//     }
//
//     @property({
//         type: CCInteger,
//         group: 'Number',
//         visible(this: ICUComponent) {
//             return this.type === ICUType.Number;
//         },
//     })
//     set maximumFractionDigits(value: number) {
//         this.numberFormatOptions.maximumFractionDigits = value;
//         this.render();
//     }
//     get maximumFractionDigits(): number {
//         return this.numberFormatOptions.maximumFractionDigits as number;
//     }
//
//     @property({
//         type: CCInteger,
//         group: 'Number',
//         visible(this: ICUComponent) {
//             return this.type === ICUType.Number;
//         },
//     })
//     set minimumSignificantDigits(value: number) {
//         this.numberFormatOptions.minimumSignificantDigits = value;
//         this.render();
//     }
//     get minimumSignificantDigits(): number {
//         return this.numberFormatOptions.minimumSignificantDigits as number;
//     }
//
//     @property({
//         type: CCInteger,
//         group: 'Number',
//         visible(this: ICUComponent) {
//             return this.type === ICUType.Number;
//         },
//     })
//     set maximumSignificantDigits(value: number) {
//         this.numberFormatOptions.maximumSignificantDigits = value;
//         this.render();
//     }
//     get maximumSignificantDigits(): number {
//         return this.numberFormatOptions.maximumSignificantDigits as number;
//     }
//
//     /************************** DateTimeFormatOptions **************************/
//     @property({ visible: false })
//         dateTimeFormatOptions: DateTimeFormatOptions = {};
//
//     @property({
//         type: Enum(VirtualEnum),
//         group: 'DateTime',
//         visible(this: ICUComponent) {
//             return this.type === ICUType.DateTime;
//         },
//     })
//     set dateTimeLocaleMatcher(value: string) {
//         this.dateTimeFormatOptions.localeMatcher = value;
//         this.render();
//     }
//     get dateTimeLocaleMatcher(): string {
//         return this.dateTimeFormatOptions.localeMatcher as string;
//     }
//
//     @property({
//         type: Enum(VirtualEnum),
//         group: 'DateTime',
//         visible(this: ICUComponent) {
//             return this.type === ICUType.DateTime;
//         },
//     })
//     set weekday(value: string) {
//         this.dateTimeFormatOptions.weekday = value;
//         this.render();
//     }
//     get weekday(): string {
//         return this.dateTimeFormatOptions.weekday as string;
//     }
//
//     @property({
//         type: Enum(VirtualEnum),
//         group: 'DateTime',
//         visible(this: ICUComponent) {
//             return this.type === ICUType.DateTime;
//         },
//     })
//     set era(value: string) {
//         this.dateTimeFormatOptions.era = value;
//         this.render();
//     }
//     get era(): string {
//         return this.dateTimeFormatOptions.era as string;
//     }
//
//     @property({
//         type: Enum(VirtualEnum),
//         group: 'DateTime',
//         visible(this: ICUComponent) {
//             return this.type === ICUType.DateTime;
//         },
//     })
//     set year(value: string) {
//         this.dateTimeFormatOptions.year = value;
//         this.render();
//     }
//     get year(): string {
//         return this.dateTimeFormatOptions.year as string;
//     }
//
//     @property({
//         type: Enum(VirtualEnum),
//         group: 'DateTime',
//         visible(this: ICUComponent) {
//             return this.type === ICUType.DateTime;
//         },
//     })
//     set month(value: string) {
//         this.dateTimeFormatOptions.month = value;
//         this.render();
//     }
//     get month(): string {
//         return this.dateTimeFormatOptions.month as string;
//     }
//
//     @property({
//         type: Enum(VirtualEnum),
//         group: 'DateTime',
//         visible(this: ICUComponent) {
//             return this.type === ICUType.DateTime;
//         },
//     })
//     set day(value: string) {
//         this.dateTimeFormatOptions.day = value;
//         this.render();
//     }
//     get day(): string {
//         return this.dateTimeFormatOptions.day as string;
//     }
//
//     @property({
//         type: Enum(VirtualEnum),
//         group: 'DateTime',
//         visible(this: ICUComponent) {
//             return this.type === ICUType.DateTime;
//         },
//     })
//     set hour(value: string) {
//         this.dateTimeFormatOptions.hour = value;
//         this.render();
//     }
//     get hour(): string {
//         return this.dateTimeFormatOptions.hour as string;
//     }
//
//     @property({
//         type: Enum(VirtualEnum),
//         group: 'DateTime',
//         visible(this: ICUComponent) {
//             return this.type === ICUType.DateTime;
//         },
//     })
//     set minute(value: string) {
//         this.dateTimeFormatOptions.minute = value;
//         this.render();
//     }
//     get minute(): string {
//         return this.dateTimeFormatOptions.minute as string;
//     }
//
//     @property({
//         type: Enum(VirtualEnum),
//         group: 'DateTime',
//         visible(this: ICUComponent) {
//             return this.type === ICUType.DateTime;
//         },
//     })
//     set second(value: string) {
//         this.dateTimeFormatOptions.second = value;
//         this.render();
//     }
//     get second(): string {
//         return this.dateTimeFormatOptions.second as string;
//     }
//
//     @property({
//         type: Enum(VirtualEnum),
//         group: 'DateTime',
//         visible(this: ICUComponent) {
//             return this.type === ICUType.DateTime;
//         },
//     })
//     set timeZoneName(value: string) {
//         this.dateTimeFormatOptions.timeZoneName = value;
//         this.render();
//     }
//     get timeZoneName(): string {
//         return this.dateTimeFormatOptions.timeZoneName as string;
//     }
//
//     @property({
//         type: Enum(VirtualEnum),
//         group: 'DateTime',
//         visible(this: ICUComponent) {
//             return this.type === ICUType.DateTime;
//         },
//     })
//     set formatMatcher(value: string) {
//         this.dateTimeFormatOptions.formatMatcher = value;
//         this.render();
//     }
//     get formatMatcher(): string {
//         return this.dateTimeFormatOptions.formatMatcher as string;
//     }
//
//     @property({
//         type: CCBoolean,
//         group: 'DateTime',
//         visible(this: ICUComponent) {
//             return this.type === ICUType.DateTime;
//         },
//     })
//     set hour12(value: boolean) {
//         this.dateTimeFormatOptions.hour12 = value;
//         this.render();
//     }
//     get hour12(): boolean {
//         return this.dateTimeFormatOptions.hour12 as boolean;
//     }
//
//     @property({
//         type: CCString,
//         group: 'DateTime',
//         visible(this: ICUComponent) {
//             return this.type === ICUType.DateTime;
//         },
//     })
//     set timeZone(value: string) {
//         this.dateTimeFormatOptions.timeZone = value;
//         this.render();
//     }
//     get timeZone(): string {
//         return this.dateTimeFormatOptions.timeZone as string;
//     }
//
//     /************************** RelativeTimeOptions **************************/
//     @property({ visible: false })
//         relativeTimeFormatOptions: RelativeTimeFormatOptions = {};
//
//     @property({
//         type: Enum(VirtualEnum),
//         group: 'RelativeTime',
//         visible(this: ICUComponent) {
//             return this.type === ICUType.RelativeTime;
//         },
//     })
//     set relativeTimeLocaleMatcher(value: string) {
//         this.relativeTimeFormatOptions.localeMatcher = value;
//         this.render();
//     }
//     get relativeTimeLocaleMatcher(): string {
//         return this.relativeTimeFormatOptions.localeMatcher as string;
//     }
//
//     @property({
//         type: Enum(VirtualEnum),
//         group: 'RelativeTime',
//         visible(this: ICUComponent) {
//             return this.type === ICUType.RelativeTime;
//         },
//     })
//     set numeric(value: string) {
//         this.relativeTimeFormatOptions.numeric = value;
//         this.render();
//     }
//     get numeric(): string {
//         return this.relativeTimeFormatOptions.numeric as string;
//     }
//
//     @property({
//         type: Enum(VirtualEnum),
//         group: 'RelativeTime',
//         visible(this: ICUComponent) {
//             return this.type === ICUType.RelativeTime;
//         },
//     })
//     set relativeTimeStyle(value: string) {
//         this.relativeTimeFormatOptions.style = value;
//         this.render();
//     }
//     get relativeTimeStyle(): string {
//         return this.relativeTimeFormatOptions.style as string;
//     }
//
//     @property({ visible: false })
//         _relativeTimeUnit: RelativeTimeFormatUnit = 'second';
//
//     @property({
//         type: Enum(VirtualEnum),
//         group: 'RelativeTime',
//         visible(this: ICUComponent) {
//             return this.type === ICUType.RelativeTime;
//         },
//     })
//     set relativeTimeUnit(value: string) {
//         this._relativeTimeUnit = value;
//         this.render();
//     }
//     get relativeTimeUnit(): string {
//         return this._relativeTimeUnit;
//     }
//
//     // ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ auto generate by script don't edit ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
// }
