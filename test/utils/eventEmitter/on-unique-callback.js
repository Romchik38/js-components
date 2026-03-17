'use strict';

import { default as EE } from '/js/utils/eventEmitter.js';

(function(){
    var testName = 'Test on unique callback';
    var value = 0;
    // create tested element
    var ee = new EE();
    var fn1 = () => {
        value += 1;
    };
    // test value
    ee.on('test', fn1);
    ee.on('test', fn1);
    ee.emit('test');
    if (value === 1) {
        console.log(testName + ' - passed');
    } else {
        throw Error(testName + ' - expected 1, found ' + value);
    }
})();
