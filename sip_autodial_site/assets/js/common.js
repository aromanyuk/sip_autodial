/**
 * Temporary data storage
 **/

class Tmp {
    constructor() {}
    clear(fast) {
        var method = fast ? "this[key] = undefined" : "delete this[key]";

        for (var key in this) {
          this.hasOwnProperty(key) && eval(method);
        }

        return this;
    }
    rm(...properties) {
        properties.forEach((value) => {
            delete this[value];
        });

        return this;
    }
}

window.tmp = new Tmp();

window.checkAllCheckboxes = function (parent) {
    parent = parent ? parent + ' ' : '';
    document
        .querySelectorAll(parent + 'input[type=checkbox]')
        .forEach(el => el.checked = true);
};

window.uncheckAllCheckboxes = function (parent) {
    parent = parent ? parent + ' ' : '';
    document
        .querySelectorAll(parent + 'input[type=checkbox]')
        .forEach(el => el.checked = false);
};

/**
 * Stop propagate click events
 */

$(document).on('click', '.stop-propagation', event => event.stopPropagation());