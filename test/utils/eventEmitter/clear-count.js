'use strict';

import { default as EE } from '/js/utils/eventEmitter.js';

(function(){
    var testName = 'Test clear count';
    var eventName = 'test';
    var eventName2 = 'test2';
    // create tested element
    var ee = new EE();
    // test count
    if (ee.count(eventName) !== 0) {
        throw Error(testName + ' - expected 0 events, found ' + ee.count(eventName));
    }
    ee.on(eventName, () => {});
    if (ee.count(eventName) !== 1) {
        throw Error(testName + ' - expected 1 events, found ' + ee.count(eventName));
    }
    // test clear
    ee.clear(eventName);
    if (ee.count(eventName) !== 0) {
        throw Error(testName + ' - after clear expected 0 events, found ' + ee.count(eventName));
    }
    // test clear all
    ee.on(eventName, () => {});
    ee.on(eventName2, () => {});
    ee.clear();
    if (
        ee.count(eventName) !== 0 ||
        ee.count(eventName2) !== 0
    ) {
        throw Error(testName + ' - after clear all expected 0 events, found ' + ee.count(eventName) + ', ' + ee.count(eventName2));
    }    
    console.log(testName + ' - passed');
    
})();
