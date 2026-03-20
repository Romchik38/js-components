'use strict';

export default class EventEmitter {
    /**
     * Creates an EventEmitter instance
     */
    constructor() {
        this.events = new Map();
        this.wrappers = new Map();
    }

    /**
     * Delete the event by name, or delete all events if no name was provided
     * @param {unknown} name - Event Name
     */
    clear(name) {
        if (name) {
            this.events.delete(name);
        } else {
            this.events.clear();
        }
    }

    /**
     * @param {unknown} name - Event Name
     * @returns {number} - Returns the number of registered callbacks or 0.
     */
    count(name) {
        const event = this.events.get(name);
        return event ? event.size : 0;
    }

    /**
     * Runs an event
     * @param {unknown} name - Event name
     * @param {...unknown} args - Event args
     */
    emit(name, ...args) {
        const event = this.events.get(name);
        if (!event) {
            return;
        }
        for (const fn of event.values()) {
            fn(...args);
        }
    }    

    /**
     * 
     * @param {unknown} name - Event name
     * @returns {Set} - Event's callbacks
     */
    listeners(name) {
        if (
            typeof name !== 'string' ||
            name === ''
        ) {
            throw Error('Param name is invalid')
        }
        const event = this.events.get(name);
        return new Set(event);
    }

    /**
     * @returns {Array} Events' names
     */
    names() {
        return [...this.events.keys()];
    }

    /**
     * Subscribe a unique callback to the event.
     * @param {unknown} name - Event name
     * @param {(...args: unknown[]) => void} fn - Event callback
     */
    on(name, fn) {
        const event = this.events.get(name);
        if (event) {
            event.add(fn);
        } else {
            this.events.set(name, new Set([fn]));
        }
    }

    /**
     * The event will be removed after the first execution
     * @param {unknown} name - Event name
     * @param {(...args: unknown[]) => void} fn - Event callback
     */
    once(name, fn) {
        const wrapper = (...args) => {
            this.remove(name, wrapper);
            fn(...args);
        };
        this.wrappers.set(fn, wrapper);
        this.on(name, wrapper);
    }

    /**
     * Removes the callback
     * @param {unknown} name - Event name
     * @param {(...args: unknown[]) => void} fn - Event callback
     */
    remove(name, fn) {
        const event = this.events.get(name);
        if (!event) {
            return;
        }
        if (event.has(fn)) {
            event.delete(fn);
            return;
        }
        const wrapper = this.wrappers.get(fn);
        if (wrapper) {
            event.delete(wrapper);
            if (event.size === 0) {
                this.events.delete(name);
            }
        }
    }
}