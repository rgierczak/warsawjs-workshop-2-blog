(function (root) {
    let DOMHelper = {
        render(template, $element, context = null) {
            let $html = $(template).html();
            let templateScript = Handlebars.compile($html);
            $element.append(templateScript(context));
        }
    };
    
    root.Blog.DOMHelper = DOMHelper;
}(window));
