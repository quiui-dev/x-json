const XJSON = require('../src/index')

describe('Test XJSON lib', () => {
    beforeAll(() => {
        // Replace JSON.parse() and JSON.stringify() global calls.
        // If you don't want to replace them, just use XJSON.parse() and XJSON().stringify() without calling XJSON.replaceJSON().
        // You can turn back normal JSON implementation by calling XJSON.restoreJSON().
        XJSON.replaceJSON();
    })

    test('Normal JSON stringify/parse', () => {
        const person = {name: 'foo', lastName: 'bar'};

        // stringfying
        const jsonPerson = JSON.stringify(person);
        expect(jsonPerson).toBe('{"name":"foo","lastName":"bar"}');

        // parsing
        const person_ = JSON.parse(jsonPerson);
        expect(person_).toEqual(person);
    });

    test('Stringifying and parsing a circular referenced JSON object.', () => {
        const father = {name: 'foo', lastName: 'father', child: null};
        const child = {name: 'foo', lastName: 'son', father: null};

        child.father = father;
        father.child = child;

        // stringifying
        const jsonFather = JSON.stringify(father);
        // Notice that the child.father property was replaced by $x_ref(0).
        expect(jsonFather).toBe('{"name":"foo","lastName":"father","child":{"name":"foo","lastName":"son","father":"$x_ref(0)"}}');

        // parsing
        const father_ = JSON.parse(jsonFather);
        expect(father_).toEqual(father);
    });

    test('Stringfying and parsing a circular referenced array', () => {
        const array1 = [1, 2];
        const array2 = [3, 4];

        array1.push(array2);
        array2.push(array1);

        // stringfying
        const jsonArray1 = JSON.stringify(array1);
        // Notice that the circular reference was replaced by $x_ref(0).
        expect(jsonArray1).toBe('[1,2,[3,4,"$x_ref(0)"]]');

        // parsing
        const array1_ = JSON.parse(jsonArray1);
        expect(array1_).toEqual(array1);
    })
})