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