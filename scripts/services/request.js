(function (root) {
    let Request = {
        fetchURL(url, successCallback, errorCallback) {
            $.get({
                url: url,
                cache: true,
                success: (template) =>
                    successCallback(template),
                error: (message) =>
                    errorCallback(message)
            });
        }
    };
    
    root.Blog.Request = Request;
}(window));
