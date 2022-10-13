const XJSON_REF = '$x_ref';

/**
 * Provides circular auto resolving capabilities to JSON.stringify() and JSON.parse() functions.
 */
class XJSON {
    static __JSON = JSON;
    static __refChecker = new RegExp(`^\\${XJSON_REF}\\((\\d)\\)$`);

    /**
     * Replace global JSON object by XJSON, so JSON.parse() and JSON.stringify() will call XJSON.parse() and XJSON.stringify() respectively.
     */
    static replaceJSON() {
        JSON = XJSON;
    }

    /**
     * Restore global JSON object to its normal.
     */
    static restoreJSON() {
        JSON = XJSON.__JSON;
    }

    static stringify(value) {
        const refs = [];

        return XJSON.__JSON.stringify(value, (key, value) => {
            if (typeof value === 'object') {
                const refIdx = refs.indexOf(value);
    
                if (refIdx !== -1)
                    return `${XJSON_REF}(${refIdx})`;
                else
                    refs.push(value);
            }
    
            return value;
        });
    }

    static parse(value) {
        let thereIsRefs = false;

        const result = XJSON.__JSON.parse(value, (key, value) => {
            if ( ! thereIsRefs && typeof value === 'string' && value.startsWith(XJSON_REF))
                thereIsRefs = true;

            return value;
        });

        if (thereIsRefs)
            XJSON.__setRefs(result, []);
    
        return result;
    }

    static __setRefs(obj, refs, prop) {
        const value = prop ? obj[prop] : obj;
    
        if (typeof value === 'object') {
            XJSON.__cacheReference(value, refs);
            XJSON.__recursivelySearchForRefs(value, refs);
        } else if (typeof value === 'string')
            XJSON.__resolveReference(value, obj, refs, prop);
    }

    static __cacheReference(obj, refs) {
        if (refs.indexOf(obj) === -1)
            refs.push(obj);
    }

    static __recursivelySearchForRefs(obj, refs) {
        for (const prop in obj)
            XJSON.__setRefs(obj, refs, prop);
    }

    static __resolveReference(value, obj, refs, prop) {
        const isRef = value.match(XJSON.__refChecker);
        if ( ! isRef)
            return;

        const refIdx = Number(isRef[1]);
        obj[prop] = refs[refIdx];
    }
}

module.exports = XJSON;