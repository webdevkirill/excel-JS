class DOM {
    constructor(selector) {
        this.$el = typeof selector === 'string' 
            ? document.querySelector(selector)
            : selector;
    }

    html(html) {
        if (typeof html === 'string') {
            this.$el.innerHTML = html;
            return this;
        } else {
            return this.$el.innerHTML.trim();
        }
    }

    text(text) {
        this.$el.textContent = text;
    }

    clear() {
        this.html('');
        return this;
    }

    append(node) {
        if (node instanceof DOM) {
            node = node.$el;
        }
        if (Element.prototype.append) {
            this.$el.append(node);
        } else {
            this.$el.appendChild(node);
        }
        return this;
    }

    on(eventType, callback) {
        this.$el.addEventListener(eventType, callback);
    }

    off(eventType, callback) {
        this.$el.removeEventListener(eventType, callback);
    }

    closest(selector) {
        return $(this.$el.closest(selector));
    }

    getCoords() {
        return this.$el.getBoundingClientRect();
    }

    css(styles = {}) {
        Object
            .keys(styles)
            .forEach(key => this.$el.style[key] = styles[key]);
        return this;
    }

    get data() {
        return this.$el.dataset;
    }

    find(selector) {
        return $(this.$el.querySelector(selector));
    }

    findAll(selector) {
        return this.$el.querySelectorAll(selector);
    }

    addClass(className) {
        this.$el.classList.add(className);
        return this;
    }

    removeClass(className) {
        this.$el.classList.remove(className);
        return this;
    }

    id(parse) {
        if (parse) {
            const [row, col] = this.id().split(':');
            return {
                row: +row, 
                col: +col
            };
        }
        return this.data.id;
    }

    focus() {
        this.$el.focus();
    }
}

export function $(selector) {
    return new DOM(selector);
}

$.create = (tagName, classes = '') => {
    const el = document.createElement(tagName);
    if (classes) {
        el.classList.add(classes);
    }
    return $(el);
};
