'use strict';

import { default as urlbuilder } from '/js/urlbuilder/createUrlBuilder.js';
import { default as target } from '/js/urlbuilder/target.js';

(function(){
    var testName = 'Test without queries scheme authority';
    // create tested element
    var parts = []
    var u = urlbuilder(target);
    // test
    var url = u(parts);
    if (url === '/') {
        console.log(testName + ' - passed');
    } else {
        throw Error(testName + ' - expected /, found ' + url);
    }
})();
