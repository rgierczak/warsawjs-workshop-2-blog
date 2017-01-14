(function (root) {
    'use strict';

    let $ = root.$;

    let RequestService = {
        fetchURL(url, successCallback, errorCallback) {
            $.get({
                url: url,
                cache: true,
                success: (template) => {
                    successCallback(template);
                },
                error: (message) => {
                    errorCallback(message);
                }
            });
        }
    };

    root.Blog.RequestService = RequestService;
}(window));
