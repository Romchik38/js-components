'use strict';

import { default as Component } from './component.js';

class ComponentCollection {
    /**
     * @param {Component[]} components 
     */
    constructor(components) {
        for (var component of components) {
            if (! component instanceof Component ) {
                throw new Error('Param components is invalid. Expected Component');
            }
        }
        this.components = components;
    }

    disable() {
        for (var component of this.components) {
            component.disable();
        }
    }

    enable() {
        for (var component of this.components) {           
            component.enable();
        }
    }

    /**
     * @param {string} name 
     * @param {function} callback - You can use this inside a callback to refer to the component.
     */
    onEvent(name, callback) {
        for (var component of this.components) {
            component.onEvent(name, callback);
        }
    }

    /**
     * @param {function} callback - Params - node
     * @returns 
     */
    onShow(callback) {
        if  (typeof callback !== 'function') {
            throw new Error('Param show is invalid');
        }
        for (var component of this.components) {
            component.onShow(callback);
        }        
    }

    show(type) {
        for (var component of this.components) {
            component.show(type);
        }
    }

    /** 
     * Adds inner text.
     * Do not pass the text parameter for clearing.
     * @param {string} newText
    */
    text(newText = '') {       
        for (var component of this.components) {
            component.text(newText);
        }
    }

    static fromClass(className) {
        if (typeof className !== 'string') {
            throw new Error('Param className is invalid');
        }
        var nodes = document.getElementsByClassName(className);
        if (! nodes instanceof HTMLCollection ) {
            throw new Error('Param className is invalid. Expected HTMLCollection');
        }
        var components = [];
        for (var node of nodes) {
            components.push(new Component(node));
        }
        return new this(components);
    }

    static fromTag(tagName) {
        if (typeof tagName !== 'string') {
            throw new Error('Param tagName is invalid');
        }
        var nodes = document.getElementsByTagName(tagName);
        if (! nodes instanceof HTMLCollection ) {
            throw new Error('Param tagName is invalid. Expected HTMLCollection');
        }
        var components = [];
        for (var node of nodes) {
            components.push(new Component(node));
        }
        return new this(components);
    }    
};

export default ComponentCollection;