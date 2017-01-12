(function (root) {
    'use strict';
    
    let AddPostView = root.Blog.AddPostView;
    
    class Application {
        constructor() {
            new AddPostView();
            this.setupListeners();
        }
        
        setupListeners() {
            $(document).on('addPost', (event) => {
                console.log(event.detail);
            });
        }
    }
    
    new Application();
}(window));
