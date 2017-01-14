(function (root) {
    'use strict';

    let $ = root.$;

    class Router {
        constructor() {
            this.router = new root.Routy.Router();
            this.setupRoutes();
            this.router.run();
        }

        setupRoutes() {
            this.router
                .add('/posts', function () {
                    $(document).trigger('router:home');
                })
                .add('/posts/:id', function (req) {
                    let $event = $.Event('router:post');
                    $event.detail = req.namedParams;
                    $(document).trigger($event);
                })
                .otherwise('/posts')
        }
    }

    root.Blog.Router = Router;
}(window));

