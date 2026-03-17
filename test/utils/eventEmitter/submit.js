'use strict';

import { default as EE } from '/js/utils/eventEmitter.js';

(function(){
    var testName = 'Test submit';
    var value = 'Test 1';
    var submitted = false;
    // create tested element
    var body = document.getElementsByTagName('body')[0];
    var form = document.createElement('form');
    form.submit = () => {
        submitted = true;
    };
    body.appendChild(form);
    // create a component
    var f = new Form(form);
    // test value
    f.submit();
    if (submitted === true) {
        console.log(testName + ' - passed');
    } else {
        throw Error(testName + ' - expected true, found ' + submitted);
    }
})();
