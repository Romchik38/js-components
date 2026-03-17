'use strict';

import { default as target } from '/js/urlbuilder/target.js';

(function(){
    var testName = 'Test with encoding';
    // create tested element
    var parts = ['hello world']
    var result = target(parts);
    // test
    if (
        result === '/helloworld' ||
        result === '/hello%20world'
    ) {
        console.log(testName + ' - passed');
    } else {
        throw Error(testName + ' - expected /hello+world or /hello%20world found ' + result);
    }
})();
