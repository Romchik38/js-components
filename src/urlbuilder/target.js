/**
 * This file is part of the project licensed under the MIT License.
 * Copyright (c) 2026 Serhii Romanenko
 * See LICENSE file in the project root for full license information.
 */

'use strict';

/**
 * 
 * @param {string[]} parts - URL path
 * @returns {string} - Ready to use path part with /
 */
export default function(parts = []){
    if(parts.length === 0) {
        return '/';
    }
    return '/' + parts.map((value)=>encodeURIComponent(value)).join('/');
}