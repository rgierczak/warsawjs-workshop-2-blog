(function (root) {
    'use strict';

    class EntryView {
        constructor() {
            this.template = null;
            this.templateContext = null;
        }

        render() {
            let $element = $('#view-container');
            let context = this.templateContext;
            root.Blog.DOMHelper.render(this.template, $element, context);
        }
    }

    root.Blog.EntryView = EntryView;
}(window));
