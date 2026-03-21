/**
 * This file is part of the project licensed under the MIT License.
 * Copyright (c) 2026 Serhii Romanenko
 * See LICENSE file in the project root for full license information.
 */

'use strict';

import { default as Component } from './component.js';

class Form extends Component {
    /**
     * Submits a from
     */
    submit() {
        this.node.submit();
    }
}

export default Form;