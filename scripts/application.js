(function (root) {
    'use strict';
    
    let AddPostView = root.Blog.AddPostView;
    let Post = root.Blog.Post;
    let PostList = root.Blog.PostList;
    let PostView = root.Blog.PostView;
    
    class Application {
        constructor() {
            this.postList = new PostList();
            // Sprawdź, czy istnieją posty w LocalStorage. Jeśli tak, wyświetl je w pętli.
            
            new AddPostView();
            this.setupListeners();
        }
        
        setupListeners() {
            $(document).on('addPost', (event) => {
                this.addPostHandler(event.detail);
            });
        }
        
        addPostHandler(postData) {
            // Tworzymy nowego posta.
            let post = new Post(postData);
            
            // Dodajemy posta do tablicy postów.
            this.postList.addPost(post);
            
            // Wyświetlamy ostatni element z tablicy.
            this.postView = new PostView(post);
        }
    }
    
    new Application();
}(window));
