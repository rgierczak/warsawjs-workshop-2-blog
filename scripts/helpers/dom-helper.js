(function (root) {
    'use strict';

    let DOMHelper = {
        render(template, $element, context = null) {
            let templateCompiled = root.Handlebars.compile(template);
            let templateScript = templateCompiled(context);
            $element.append(templateScript);
        },
    
        clearDOMContainer() {
            $('#view-container').empty();
        }
    };

    root.Blog.DOMHelper = DOMHelper;
}(window));
