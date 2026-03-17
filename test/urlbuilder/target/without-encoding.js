'use strict';

import { default as target } from '/js/urlbuilder/target.js';

(function(){
    var testName = 'Test without encoding';
    // create tested element
    var parts = ['hello', 'world']
    var result = target(parts);
    // test
    if (result === '/hello/world') {
        console.log(testName + ' - passed');
    } else {
        throw Error(testName + ' - expected /hello/world, found ' + result);
    }
})();
