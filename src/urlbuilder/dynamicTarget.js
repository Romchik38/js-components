/**
 * This file is part of the project licensed under the MIT License.
 * Copyright (c) 2026 Serhii Romanenko
 * See LICENSE file in the project root for full license information.
 */

'use strict';

import { default as target } from './target.js';

const rootName = 'root';

/**
 * @param {string} dynamicRoot - The dynamic url part to swap
 * @returns {function(string[]): string} - The target to form a path
 */
export default function(dynamicRoot){
    return function(parts = []){
        if(parts.length === 0) {
            throw new Error('Param parts is empty');
        }
        const firstPath = parts[0];
        if (firstPath === rootName) {
            parts[0] = dynamicRoot;
        }
        return target(parts);
    };
}