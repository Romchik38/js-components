'use strict';

import { default as EE } from '/js/utils/eventEmitter.js';

(function(){
    var testName = 'Test once';
    var value = 0;
    // create tested element
    var ee = new EE();
    // test value
    ee.once('inc', () => {
        value += 1;
    });
    ee.emit('inc');
    ee.emit('inc');
    if (value === 1) {
        console.log(testName + ' - passed');
    } else {
        throw Error(testName + ' - expected 1, found ' + value);
    }
})();
