'use strict';

import { default as Component } from '/js/components/component.js';

// Test 1: Successfully get an existing data attribute
(function(){
    var testName = 'Test dataset - get existing attribute';
    var body = document.getElementsByTagName('body')[0];
    var div = document.createElement('div');
    div.setAttribute('data-user-id', '12345');
    body.appendChild(div);
    
    var component = new Component(div);
    var result = component.dataset('userId');
    
    if (result === '12345') {
        console.log(testName + ' - passed');
    } else {
        throw Error(testName + ' - expected "12345", found "' + result + '"');
    }
})();

// Test 2: TypeError when name is not a string
(function(){
    var testName = 'Test dataset - TypeError for non-string name';
    var body = document.getElementsByTagName('body')[0];
    var div = document.createElement('div');
    div.setAttribute('data-test', 'value');
    body.appendChild(div);
    
    var component = new Component(div);
    try {
        component.dataset(123); // Pass a number instead of string
        throw Error(testName + ' - should have thrown TypeError');
    } catch (error) {
        if (error instanceof TypeError && error.message === 'Parameter "name" must be a non-empty string') {
            console.log(testName + ' - passed');
        } else {
            throw Error(testName + ' - expected TypeError with correct message, got: ' + error.message);
        }
    }
})();

// Test 3: TypeError when name is an empty string
(function(){
    var testName = 'Test dataset - TypeError for empty string name';
    var body = document.getElementsByTagName('body')[0];
    var div = document.createElement('div');
    div.setAttribute('data-test', 'value');
    body.appendChild(div);
    
    var component = new Component(div);
    try {
        component.dataset(''); // Pass an empty string
        throw Error(testName + ' - should have thrown TypeError');
    } catch (error) {
        if (error instanceof TypeError && error.message === 'Parameter "name" must be a non-empty string') {
            console.log(testName + ' - passed');
        } else {
            throw Error(testName + ' - expected TypeError with correct message, got: ' + error.message);
        }
    }
})();

// Test 4: Error when data attribute does not exist
(function(){
    var testName = 'Test dataset - Error for non-existent attribute';
    var body = document.getElementsByTagName('body')[0];
    var div = document.createElement('div');
    body.appendChild(div);
    
    var component = new Component(div);
    try {
        component.dataset('non-existent'); // Try to get non-existent attribute
        throw Error(testName + ' - should have thrown Error');
    } catch (error) {
        if (!(error instanceof TypeError) && error.message === 'Data attribute "non-existent" does not exist') {
            console.log(testName + ' - passed');
        } else {
            throw Error(testName + ' - expected Error with correct message, got: ' + error.message);
        }
    }
})();

// Test 5: Successfully get multiple different data attributes
(function(){
    var testName = 'Test dataset - get multiple attributes';
    var body = document.getElementsByTagName('body')[0];
    var div = document.createElement('div');
    div.setAttribute('data-name', 'John');
    div.setAttribute('data-age', '30');
    div.setAttribute('data-email', 'john@example.com');
    body.appendChild(div);
    
    var component = new Component(div);
    var resultName = component.dataset('name');
    var resultAge = component.dataset('age');
    var resultEmail = component.dataset('email');
    
    if (resultName === 'John' && resultAge === '30' && resultEmail === 'john@example.com') {
        console.log(testName + ' - passed');
    } else {
        throw Error(testName + ' - expected John, 30, john@example.com, found ' + resultName + ', ' + resultAge + ', ' + resultEmail);
    }
})();

// Test 6: TypeError when name is null
(function(){
    var testName = 'Test dataset - TypeError for null name';
    var body = document.getElementsByTagName('body')[0];
    var div = document.createElement('div');
    div.setAttribute('data-test', 'value');
    body.appendChild(div);
    
    var component = new Component(div);
    try {
        component.dataset(null); // Pass null
        throw Error(testName + ' - should have thrown TypeError');
    } catch (error) {
        if (error instanceof TypeError && error.message === 'Parameter "name" must be a non-empty string') {
            console.log(testName + ' - passed');
        } else {
            throw Error(testName + ' - expected TypeError with correct message, got: ' + error.message);
        }
    }
})();

// Test 7: TypeError when name is undefined
(function(){
    var testName = 'Test dataset - TypeError for undefined name';
    var body = document.getElementsByTagName('body')[0];
    var div = document.createElement('div');
    div.setAttribute('data-test', 'value');
    body.appendChild(div);
    
    var component = new Component(div);
    try {
        component.dataset(undefined); // Pass undefined
        throw Error(testName + ' - should have thrown TypeError');
    } catch (error) {
        if (error instanceof TypeError && error.message === 'Parameter "name" must be a non-empty string') {
            console.log(testName + ' - passed');
        } else {
            throw Error(testName + ' - expected TypeError with correct message, got: ' + error.message);
        }
    }
})();
