'use strict';

import { default as target } from '/js/urlbuilder/target.js';

(function(){
    var testName = 'Test empty parts';
    // create tested element
    var result = target();
    if (result === '/') {
        console.log(testName + ' - passed');    
    } else {
        throw Error(testName + ' - expected /, found ' + result);
    }
})();
