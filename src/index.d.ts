/**
 * Provides circular auto resolving capabilities to JSON.stringify() and JSON.parse() functions.
 */
export class XJSON {
    static __JSON: JSON;
    static __refChecker: RegExp;
    /**
     * Replace global JSON object by XJSON, so JSON.parse() and JSON.stringify() will call XJSON.parse() and XJSON.stringify() respectively.
     */
    static replaceJSON(): void;
    /**
     * Restore global JSON object to its normal.
     */
    static restoreJSON(): void;
    static stringify(value: any): string;
    static parse(value: any): any;
    static __setRefs(obj: any, refs: any, prop: any): void;
    static __cacheReference(obj: any, refs: any): void;
    static __recursivelySearchForRefs(obj: any, refs: any): void;
    static __resolveReference(value: any, obj: any, refs: any, prop: any): void;
}
