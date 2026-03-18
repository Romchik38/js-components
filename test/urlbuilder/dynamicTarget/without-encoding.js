'use strict';

import { default as target } from '/js/urlbuilder/dynamicTarget.js';

(function(){
    var testName = 'Test without encoding';
    // create tested element
    var parts = ['root', 'world']
    var result = target('uk')(parts);
    // test
    if (result === '/uk/world') {
        console.log(testName + ' - passed');
    } else {
        throw Error(testName + ' - expected /uk/world, found ' + result);
    }
})();
