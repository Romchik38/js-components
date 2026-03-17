'use strict';

import { default as EE } from '/js/utils/eventEmitter.js';

(function(){
    var testName = 'Test names';
    var eventName = 'test';
    var eventName2 = 'test2';
    // create tested element
    var ee = new EE();
    // test
    ee.on(eventName, () => {});
    ee.on(eventName2, () => {});
    var names = ee.names();
    if (
        names[0] === eventName &&
        names[1] === eventName2
    ) {
        console.log(testName + ' - passed');
    } else {
        throw Error(testName + ' - expected test, test2 found ' + eventName + ', ' + eventName2);
    }
})();
