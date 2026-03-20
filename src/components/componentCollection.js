'use strict';

import { default as Component } from './component.js';

class ComponentCollection {
    /**
     * @param {Component[]} components - The set of components
     */
    constructor(components) {
        for (const component of components) {
            if (! (component instanceof Component) ) {
                throw new Error('Param components is invalid. Expected Component');
            }
        }
        this.components = components;
    }
  
    /**
     * Makes the components inaccessible
     */
    disable() {
        for (const component of this.components) {
            component.disable();
        }
    }

    /**
     * Makes the components accessible
     */    
    enable() {
        for (const component of this.components) {           
            component.enable();
        }
    }

    /**
     * Subscribe the components to a DOM event
     * @param {string} name - The DOM event name
     * @param {function(Event): void} callback - Triggered on a DOM event
     */
    onEvent(name, callback) {
        for (const component of this.components) {
            component.onEvent(name, callback);
        }
    }

    /**
     * @param {function(HTMLElement): void} callback - Triggered on show() call
     */
    onShow(callback) {
        if  (typeof callback !== 'function') {
            throw new Error('Param show is invalid');
        }
        for (const component of this.components) {
            component.onShow(callback);
        }        
    }

    /**
     * @param {function(HTMLElement): void} callback - Triggered on hide() call
     */
    onHide(callback) {
        if  (typeof callback !== 'function') {
            throw new Error('Param callback is invalid');
        }
        for (const component of this.components) {
            component.onHide(callback);
        }        
    }

    /**
     * Displays components
     * @param {string} type - CSS style display
     */
    show(type = 'block') {
        for (const component of this.components) {
            component.show(type);
        }
    }

    /**
     * Hides components
     */
    hide() {
        for (const component of this.components) {
            component.hide();
        }
    }

    /** 
     * Adds inner text.
     * Do not pass the text parameter for clearing.
     * @param {string} newText Inner text
     */
    text(newText = '') {       
        for (const component of this.components) {
            component.text(newText);
        }
    }

    /**
     * @param {string} className - Css class
     * @returns {Component} - The componentCollection instance
     */
    static fromClass(className) {
        if (typeof className !== 'string') {
            throw new Error('Param className is invalid');
        }
        const nodes = document.getElementsByClassName(className);
        if (! (nodes instanceof HTMLCollection) ) {
            throw new Error('Param className is invalid. Expected HTMLCollection');
        }
        if (nodes.length === 0) {
            throw new Error('Elements with class name ' + className + ' not present');
        }
        const components = [];
        for (const node of nodes) {
            components.push(new Component(node));
        }
        return new this(components);
    }

    /**
     * @param {string} tagName - HTML tag
     * @returns {Component} - The componentCollection instance
     */    
    static fromTag(tagName) {
        if (typeof tagName !== 'string') {
            throw new Error('Param tagName is invalid');
        }
        const nodes = document.getElementsByTagName(tagName);
        if (! (nodes instanceof HTMLCollection) ) {
            throw new Error('Param tagName is invalid. Expected HTMLCollection');
        }
        const components = [];
        for (const node of nodes) {
            components.push(new Component(node));
        }
        return new this(components);
    }    
}

export default ComponentCollection;