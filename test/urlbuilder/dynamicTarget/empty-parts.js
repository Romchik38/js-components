'use strict';

import { default as target } from '/js/urlbuilder/dynamicTarget.js';

(function(){
    var testName = 'Test with empty parts';
    // create tested element
    var parts = []
    // test
    var thrown = false;
    try {
        target('uk')(parts);
    } catch(err) {
        if (err.message === 'Param parts is empty') {
            thrown = true;
            console.log(testName + ' - passed');    
        }
    }

    if (thrown === false) {
        throw Error(testName + ' - expected error on empty party, but it passed');
    }
})();
