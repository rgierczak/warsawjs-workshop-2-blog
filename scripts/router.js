(function (root) {
    'use strict';
    
    function changeRoute(context) {
        let event = context.id ? buildEventDetails(context.id) : 'router:home';
        $(document).trigger(event);
    }
    
    function buildEventDetails(id) {
        let $event = $.Event("router:post");
        $event.detail = { id: id };
        return $event;
    }
    
    class Router {
        constructor() {
            this.router = null;
            this.setup();
        }
        
        setup() {
            this.router = new root.Routy.Router();
            this.createPaths();
            this.router.run();
        }
        
        createPaths() {
            this.router
                .add('/home')
                .add('/posts/:id')
                .otherwise('/home')
                .on('change', (req) => {
                    let context = { id: req.namedParams.id };
                    changeRoute(context);
                });
        }
    }
    
    root.Blog.Router = Router;
}(window));

