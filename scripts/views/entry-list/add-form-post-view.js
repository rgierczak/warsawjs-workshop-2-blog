(function (root) {
    'use strict';

    let $ = root.$;
    let AddFormEntryView = root.Blog.AddFormEntryView;

    class AddFormPostView extends AddFormEntryView {
        constructor() {
            console.log('AddFormPostView');
            super();
            
            // 1) Pobrać template z DOM.
            this.template = $('#template-add-post').html();
            
            // 2) Wyrenderować template.
            this.render();
            
            // 3) Pobrać referencję do formularza.
            this.$form = $('#add-post-form');
            
            // 4) Ustawić listenery na submit tego formularza.
            this.setupListeners();
        }

        buildEventDetails() {
            let $event = $.Event('add-post:submitted');
            $event.detail = {
                title: $('#add-post-title').val(),
                author: $('#add-post-author').val(),
                body: $('#add-post-body').val(),
            };
            return $event;
        }
    }

    root.Blog.AddFormPostView = AddFormPostView;
}(window));
