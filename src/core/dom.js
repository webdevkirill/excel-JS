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

    width(width) {
        if (typeof width === 'number') {
            this.$el.style.width = width + 'px';
            return this;
        } else {
            return this.$el.style.width;
        }
    }

    height(height) {
        if (typeof height === 'number') {
            this.$el.style.height = height + 'px';
            return this;
        } else {
            return this.$el.style.height;
        }
    }

    get data() {
        return this.$el.dataset;
    }

    findAll(selector) {
        return this.$el.querySelectorAll(selector);
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
