'use strict';

import { default as EE } from '/js/utils/eventEmitter.js';

(function(){
    var testName = 'Test on';
    var emitted = false;
    var emitted2 = false;
    // create tested element
    var ee = new EE();
    // test value
    ee.on('test', () => {
        emitted = true;
    });
    ee.on('test', () => {
        emitted2 = true;
    });
    ee.emit('test');
    if (
        emitted === true &&
        emitted2 === true
    ) {
        console.log(testName + ' - passed');
    } else {
        throw Error(testName + ' - expected true, found ' + emitted + ', ' + emitted2);
    }
})();
