/**
 * This file is part of the project licensed under the MIT License.
 * Copyright (c) 2026 Serhii Romanenko
 * See LICENSE file in the project root for full license information.
 */

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