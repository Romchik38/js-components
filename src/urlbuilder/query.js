'use strict';

export default class Query {
    /** 
     * @param {string} name - Non encoded text
     * @param {string} value  - Non encoded text
     */
    constructor(name, value) {
        if (typeof name !== 'string' || name === '') {
            throw new Error('Invalid param query name');
        }
        if (typeof value !== 'string' || value === '') {
            throw new Error('Invalid param query value');
        }
        this.name = name;
        this.value = value;
    }
}