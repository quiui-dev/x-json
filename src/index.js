const XJSON_REF = '$x_ref';

class XJSON {
    static __JSON = JSON;

    static replaceJSON() {
        JSON = XJSON;
    }

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
            XJSON.__xjson_set_refs(result, [], new RegExp(`^\\${XJSON_REF}\\((\\d)\\)$`));
    
        return result;
    }

    static __xjson_set_refs(obj, refs, refChecker, prop) {
        const value = prop ? obj[prop] : obj;
    
        if (typeof value === 'object') {
            if (refs.indexOf(value) === -1)
                refs.push(value);
    
            for (const prop in value)
                XJSON.__xjson_set_refs(value, refs, refChecker, prop);
        } else if (typeof value === 'string') {
            const ref = value.match(refChecker);
            if ( ! ref)
                return;
    
            const refIdx = Number(ref[1]);
            obj[prop] = refs[refIdx];
        }
    }
}

module.exports = XJSON;