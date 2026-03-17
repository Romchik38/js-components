'use strict';

import { default as EE } from '/js/utils/eventEmitter.js';

(function(){
    var testName = 'Test listeners';
    var eventName = 'test';
    // create tested element
    var ee = new EE();
    // test value
    var fn1 = () => {};
    var fn2 = () => {};
    ee.on(eventName, fn1);
    ee.on(eventName, fn2);
    var events = ee.listeners(eventName);   
    // test count
    if (events.size === 2) {
        console.log(testName + ' - passed');
    } else {
        throw Error(testName + ' - expected 2, found ' +  events.length);
    }
})();
