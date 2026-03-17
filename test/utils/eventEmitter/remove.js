'use strict';

import { default as EE } from '/js/utils/eventEmitter.js';

(function(){
    var testName = 'Test remove';
    var eventName = 'test1';
    // create tested element
    var ee = new EE();
    var fn1 = () => {};
    // test value
    ee.on(eventName, fn1);
    ee.remove(eventName, fn1);
    if (
        ee.count(eventName) === 0
    ) {
        console.log(testName + ' - passed');
    } else {
        throw Error(testName + ' - expected 0, found ' + ee.count(eventName));
    }
})();
