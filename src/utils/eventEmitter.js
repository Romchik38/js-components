'use strict';

export default class EventEmitter {
    constructor() {
        this.events = new Map();
        this.wrappers = new Map();
    }

    /**
     * Delete the event by name, or delete all events if no name was provided
     */
    clear(name) {
        if (name) this.events.delete(name);
        else this.events.clear();
    }

    /**
     * @returns {int} - Returns the number of registered callbacks or 0.
     */
    count(name) {
        const event = this.events.get(name);
        return event ? event.size : 0;
    }

    /**
     * Runs an event
     * @param {*} name - Event name
     * @param {...*} args - Event args
     */
    emit(name, ...args) {
        const event = this.events.get(name);
        if (!event) return;
        for (const fn of event.values()) {
            fn(...args);
        }
    }    

    /**
     * 
     * @param {*} name - Event name
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

    names() {
        return [...this.events.keys()];
    }
    
    on(name, fn) {
        const event = this.events.get(name);
        if (event) event.add(fn);
        else this.events.set(name, new Set([fn]));
    }

    once(name, fn) {
        const wrapper = (...args) => {
            this.remove(name, wrapper);
            fn(...args);
        };
        this.wrappers.set(fn, wrapper);
        this.on(name, wrapper);
    }

    remove(name, fn) {
        const event = this.events.get(name);
        if (!event) return;
        if (event.has(fn)) {
            event.delete(fn);
            return;
        }
        const wrapper = this.wrappers.get(fn);
        if (wrapper) {
            event.delete(wrapper);
            if (event.size === 0) this.events.delete(name);
        }
    }
}