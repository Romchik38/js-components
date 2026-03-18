'use strict';

import { default as target } from '/js/urlbuilder/dynamicTarget.js';

(function(){
    var testName = 'Test with encoding';
    // create tested element
    var parts = ['root', 'hello world']
    var result = target('uk')(parts);
    // test
    if (
        result === '/uk/hello+world' ||
        result === '/uk/hello%20world'
    ) {
        console.log(testName + ' - passed');
    } else {
        throw Error(testName + ' - expected /uk/hello+world or /uk/hello%20world, found ' + result);
    }
})();
