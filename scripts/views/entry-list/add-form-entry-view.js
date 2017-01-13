(function (root) {
    'use strict';

    let $ = root.$;

    class AddFormEntryView {
        constructor() {
            this.$form = null;
            this.template = null;
        }

        setupListeners() {
            this.$form.submit((event) => this.submitFormHandler(event));
        }

        submitFormHandler(event) {
            event.preventDefault();
            let $event = this.buildEventDetails();
            $(document).trigger($event);
        }

        buildEventDetails(name, detail) {
            let $event = $.Event(name);
            $event.detail = detail;
            return $event;
        }

        render() {
            let $element = $('#view-container');
            root.Blog.DOMHelper.render(this.template, $element);
        }
    }

    root.Blog.AddFormEntryView = AddFormEntryView;
}(window));
