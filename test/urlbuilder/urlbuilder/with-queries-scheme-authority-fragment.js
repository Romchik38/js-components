'use strict';

import { default as urlbuilder } from '/js/urlbuilder/urlbuilder.js';
import { default as target } from '/js/urlbuilder/target.js';
import { default as Query } from '/js/urlbuilder/query.js';

(function(){
    var testName = 'Test with queries scheme authority fragment';
    // create tested element
    var parts = ['articles'];
    var query1 = new Query('order', 'desc');
    var query2 = new Query('page', '2');
    var queries = [query1, query2];
    var fragment = 'header1';
    var u = urlbuilder(target, 'https', 'example.com');
    // test
    var url = u(parts, queries, fragment);
    if (url === 'https://example.com/articles?order=desc&page=2#header1') {
        console.log(testName + ' - passed');
    } else {
        throw Error(testName + ' - expected /, found ' + url);
    }
})();
