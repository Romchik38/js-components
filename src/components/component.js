/**
 * This file is part of the project licensed under the MIT License.
 * Copyright (c) 2026 Serhii Romanenko
 * See LICENSE file in the project root for full license information.
 */

'use strict';

import { default as EE } from './../utils/eventEmitter.js';

export default class Component extends EE {
    #fnHide = null;
    #fnShow = null;

    /**
     * @param {HTMLElement} node - HTMLElement
     */
    constructor(node) {
        super();
        // Node
        if (! (node instanceof HTMLElement)) {
            throw new TypeError('Wrong node type. Expected HtmlElement');
        } else {
            this.node = node;
        }
        // events
        this.domEvents = ['click', 'change', 'submit'];
        this.registeredEvents = [];
    }

    /**
     * The Component finds an element by class name and appends itself as a child
     * @param {string} className - Css class
     */
    appendByClass(className) {
        if (typeof className !== 'string') {
            throw new TypeError('param className is invalid');
        } else if (className === '') {
            throw new TypeError('param className is empty');
        }
        const collection = document.getElementsByClassName(className);
        const len = collection.length;
        if (len === 0) {
            throw new Error(`Component container with class ${className} not found`);
        } else if (len > 1) {
            throw new Error(`element ${className} is more than one`);
        }
        const container = collection[0];
        container.appendChild(this.node);
    }

    /**
     * The Component finds an element by id and appends itself as a child
     * @param {string} id - HTML tag attribute id
     */    
    appendById(id) {
        if (typeof id !== 'string') {
            throw new TypeError('param id is invalid');
        } else if (id === '') {
            throw new TypeError('param id is empty');
        }
        const element = document.getElementById(id);
        if (element === null) {
            throw new Error(`Component container with id ${id} not found`);
        }
        element.appendChild(this.node);
    }
    
    /** Enable the component */
    enable() {
        this.node.disabled = false;
    }

    /**
     * Gets a data attribute.
     * @param {string} name - Dataset name
     * @returns {string} - Dataset value
     * @throws {TypeError} If the name is not a valid non-empty string.
     * @throws {Error} If the attribute does not exist.
     */
    dataset(name) {
        if (typeof name !== 'string' || name === '') {
            throw new TypeError('Parameter "name" must be a non-empty string');
        }

        const data = this.node.dataset[name];
        
        if (data === undefined) {
            throw new Error(`Data attribute "${name}" does not exist`);
        }

        return data;
    }

    /** Disable the component */
    disable() {
        this.node.disabled = true;
    }

    /** 
     * Registers a callback on givent DOM event 
     * @param {string} name - The Event name
     * @param {function(Event): void} callback - Triggered on a DOM event
     * @returns {Component} - The Component instance
     */
    onEvent(name, callback) {
        if (typeof name !== 'string') {
            throw new TypeError('Param event name is invalid');
        } else {
            if (!this.domEvents.find((v) => v === name)) {
                throw new TypeError('Param event name has non expected value: ' + name);
            }
        }
        if (typeof callback !== 'function') {
            throw new Error('Param event callback is invalid');
        }

        const existingEvents = this.registeredEvents[name] || [];
        // One-time registration of an internal callback to later execute all received callbacks.
        if (existingEvents.length === 0) {
            this.node.addEventListener(name, (...params) => {
                this._event(name, ...params);
            });
        }
        existingEvents.push(callback);
        this.registeredEvents[name] = existingEvents;

        return this;
    }

    /** Hide the component */
    hide() {
        if (typeof this.#fnHide === 'function') {
            this.#fnHide(this.node);
        } else {
            this.node.style.display = 'none';
        }
    }

    /** 
     * Display the component 
     * @param {string} type - Css display property
     */    
    show(type = 'block') {
        if (this.#fnShow !== null) {
            this.#fnShow(this.node);
        } else {
            if (typeof type === 'string') {
                this.node.style.display = type;
            } else {
                this.node.style.display = '';
            }
        }
    }

    /** 
     * Adds inner text.
     * Do not pass the text parameter for clearing.
     * @param {string} newText - Inner text
     */
    text(newText = '') {
        this.node.innerText = newText;
    }

    /** 
     * Registers a callback to handle hiding 
     * @param {function(HTMLElement): void} callback - Triggered on hide() call
     * @returns {Component} - The Component instance
     */
    onHide(callback) {      
        if  (typeof callback === 'function') {
            this.#fnHide = callback;
        } else {
            throw new TypeError('Param callback is invalid');
        }

        return this;
    }

    /** 
     * Registers a callback to handle showing 
     * @param {function(HTMLElement): void} callback - Triggered on show() call
     * @returns {Component} - The Component instance
     */    
    onShow(callback) {      
        if  (typeof callback === 'function') {
            this.#fnShow = callback;
        } else {
            throw new TypeError('Param callback is invalid');
        }
        
        return this;
    }

    /**
     * Gets HTMLElement attribute value
     * @returns {string} - HTMLElement attribute value
     */
    getValue() {
        return this.node.value;
    }

    /**
     * Sets HTMLElement attribute value
     * @param {string} val - HTMLElement attribute value
     */    
    setValue(val) {
        this.node.value = val;
    }

    /**
     * Gets HTMLElement attribute name
     * @returns {string} - HTMLElement attribute name
     */    
    getName() {
        return this.node.name;
    }

    /**
     * Sets HTMLElement attribute value
     * @param {string} val - HTMLElement attribute value
     */        
    setName(val) {
        this.node.name = val;
    }

    /**
     * Creates a component from a node by its attribute class name
     * @param {string} className - HTMLElement attribute name
     * @returns {Component} - The Component instance
     */    
    static fromClass(className) {
        if (typeof className !== 'string') {
            throw new TypeError('Param className is invalid');
        }
        const collection = document.getElementsByClassName(className);
        const len = collection.length;
        if (len === 0) {
            throw new Error(`element ${className} not found`);
        } else if (len > 1) {
            throw new Error(`element ${className} is more than one`);
        }
        const node = collection[0];
        return new this(node);
    }

    /**
     * Creates a component from a node by its attribute name
     * @param {string} name - HTMLElement attribute name
     * @returns {Component} - The Component instance
     */
    static fromName(name) {
        if (typeof name !== 'string') {
            throw new TypeError('Param name is invalid');
        }
        const collection = document.getElementsByName(name);
        const len = collection.length;
        if (len === 0) {
            throw new Error(`element ${name} not found`);
        } else if (len > 1) {
            throw new Error(`element ${name} is more than one`);
        }
        const node = collection[0];
        return new this(node);
    }    

    /**
     * Creates a component from a node by its attribute id
     * @param {string} id - HTMLElement attribute id
     * @returns {Component} - The Component instance
     */
    static fromId(id) {
        if (typeof id !== 'string') {
            throw new TypeError('Param id is invalid');
        }
        const element = document.getElementById(id);
        if (element === null) {
            throw new Error(`element ${id} not found`);
        }
        return new this(element);
    }      

    /**
     * Creates a component from given parameters
     * @param {string} tagName - HTMLElement tag
     * @param {[string: string]} attributes - A  set of attribute:value
     * @param {string} text - Inner text
     * @returns {Component} - The Component instance
     */
    static fromParams (tagName, attributes = {}, text = '') {
        if (
            typeof tagName !== 'string' || tagName === ''
        ) {
            throw new TypeError('Invalid param create element tag name');
        }
        if (typeof attributes !== 'object') {
            throw new TypeError('Invalid param create element attributes');
        }

        const element = document.createElement(tagName);
        const keys = Object.keys(attributes);
        for (const key of keys) {
            element.setAttribute(key, attributes[key]);
        }
        element.innerText = text;
        return new this(element);
    }
    
    /**
     * This function runs on every event and calls all registered callbacks.
     * @param {string} name - Event name
     * @param  {...unknown} params - Actually, it's an array with a single Event.
     */
    _event(name, ...params) {
        const existingEvents = this.registeredEvents[name] || [];
        
        if (existingEvents.length === 0) {
            throw new Error(`Event with name ${name} is not registered`);
        }
        
        for (const callback of existingEvents) {
            callback.call(this, ...params);
        }
    }
}