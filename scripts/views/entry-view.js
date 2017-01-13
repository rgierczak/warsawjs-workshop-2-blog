(function (root) {
    'use strict';

    class EntryView {
        constructor(item) {
            this.templateContext = item;
            this.render();
        }

        render() {
            let $element = $('#view-container');
            let context = this.templateContext;
            root.Blog.DOMHelper.render(this.template, $element, context);
        }
    }

    root.Blog.EntryView = EntryView;
}(window));
