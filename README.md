XJSON
=====

Add circual reference auto solving capabilities to `JSON.parse()` and `JSON.stringify()` functions, licensed under MIT license.

# Install
```bash
npm i @quiui/x-json
```

# Usage
You can use this lib by calling it directly or by "installing" it over the global JSON.

## Directly calling
```javascript
const XJSON = require('@quiui/x-json');

const person = {name: 'foo', lastName: 'bar'};

console.log(XJSON.stringify(person));
// OUTPUT: {"name":"foo","lastName":"bar"}

const person2 = XJSON.parse('{"name":"Bar","lastName":"Foo"}');
// person2: {name: "Bar", lastName: "Foo"}
```

## Installing it over the global JSON
```javascript
const XJSON = require('@quiui/x-json');

// Installs XJSON over JSON
XJSON.replaceJSON();

const person = {name: 'foo', lastName: 'bar'};

// Note that now you can call XJSON by using global JSON
console.log(JSON.stringify(person));
// OUTPUT: {"name":"foo","lastName":"bar"}

const person2 = JSON.parse('{"name":"Bar","lastName":"Foo"}');
// person2: {name: "Bar", lastName: "Foo"}

// You can reverte XJSON installation anytime
XJSON.restoreJSON();
```

# Limitations
`XJSON.parse()` and `XJSON.stringify()` functions only accept one argument: "value". There's no way to pass a reviver function to it, or any other options. We thank you if you can help improve our library ;)