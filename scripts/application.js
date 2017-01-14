(function (root) {
    'use strict';

    let $ = root.$;
    let DOMHelper = root.Blog.DOMHelper;

    let PostView = root.Blog.PostView;
    let AddFormPostView = root.Blog.AddFormPostView;
    let CommentView = root.Blog.CommentView;
    let AddFormCommentView = root.Blog.AddFormCommentView;

    let PostModel = root.Blog.PostModel;
    let CommentModel = root.Blog.CommentModel;
    let PostListModel = root.Blog.PostListModel;

    let StorageService = root.Blog.StorageService;
    let Router = root.Blog.Router;

    class Application {
        constructor() {
            this.postList = new PostListModel();
            this.setupListeners();
            new Router();
        }

        setupListeners() {
            $(document).on('add-post:submitted', (event) => this.onPostSubmittedHandler(event.detail));
            $(document).on('add-comment:submitted', (event) => this.onCommentSubmittedHandler(event.detail));
            $(document).on('router:home', (event) => this.onRouterHomeHandler());
            $(document).on('router:post', (event) => this.onRouterPostHandler(event));
        }

        onPostSubmittedHandler(postData) {
            // 1) Stworzenie modelu Posta.
            let postModel = this._createPostModel(postData);
            
            // 2) Wyrenderowanie Posta.
            this._renderPostComponent(postModel);
            
            // 3) Zapisanie Posta do bazy danych.
            this._saveData();
        }

        onCommentSubmittedHandler(commentData) {
            // 1) Pobranie id posta, którego komentarze chcemy wyświetlić.
            let postId = parseInt(commentData.postId);
            
            // 2) Pobrać model posta z listy postów.
            let postModel = this.postList.getEntryById(postId);
            
            // 3) Stworzyć model komentarza.
            let commentModel = this._createCommentModel(commentData, postModel);
            
            // 4) Wyrenderować komponent z komentarzem.
            this._renderCommentComponent(commentModel);
            
            // 5) Zapisać dane do bazy danych.
            this._saveData();
        }

        onRouterHomeHandler() {
            // 1) Wyczyszczenie kontenera DOM
            DOMHelper.clearDOMContainer();
            
            // 2) Wyświetlenie formularza dodawania nowego postu.
            new AddFormPostView();
            
            // 3) Aktualizacja listy postów
            this._restorePostList(() => {
                this.postList.each((postModel) => {
                    
                    // 4) Wyrenderowanie postów na podstawie modeli
                    this._renderPostComponent(postModel);
                })
            });
        }

        onRouterPostHandler(event) {
            // 1) Wyczyszczenie kontenera DOM do którego wstrzykujemy widok.
            DOMHelper.clearDOMContainer();
            
            // 2) Pobranie id posta, którego chcemy wyświetlić.
            let postId = parseInt(event.detail.id);
            
            // 3) Uaktualnienie listy postów.
            this._restorePostList(() => {
                
                // 4) Pobranie z tablicy postów modelu postu o klikniętym id.
                let postModel = this.postList.getEntryById(postId);
                
                // 5) Wyrenderowanie komponentu posta na podstawie modelu.
                this._renderPostComponent(postModel);

                // 6) Dodanie do widoku formularza dodawania komentarzy.
                new AddFormCommentView(postId);

                // 7) Wyświetlenie (ewentualnych) komentarzy posta.
                postModel.comments.each((comment) => {
                    new CommentView(comment);
                });
            });
        }
    
        _saveData() {
            StorageService.setData(this._serializePostList());
        }
    
        _restorePostList(callback = Function) {
            // 1) wyczyszczenie tablicy postList
            this.postList.clear();
            
            // 2) Pobranie danych z bazy danych
            StorageService.getData((storedPosts) => {
                
                // 3) Stworzenie modeli postów
                storedPosts.forEach((postData) => this._createPostModel(postData));
                callback();
            });
        }

        _serializePostList() {
            let posts = [];

            this.postList.getEntries().forEach((post) => {
                posts.push({
                    id: post.id,
                    title: post.title,
                    body: post.body,
                    author: post.author,
                    comments: post.comments.getEntries().map((comment) => {
                        return {
                            id: comment.id,
                            body: comment.body,
                            author: comment.author
                        }
                    })
                });

            });
            return posts;
        }

        _createPostModel(postData) {
            let postModel = new PostModel(postData);
            return this.postList.addEntry(postModel);
        }

        _renderPostComponent(postModel) {
            new PostView(postModel);
        }

        _createCommentModel(commentData, postModel) {
            let commentModel = new CommentModel(commentData);
            return postModel.comments.addEntry(commentModel);
        }

        _renderCommentComponent(commentModel) {
            new CommentView(commentModel);
        }
    }

    document.addEventListener('DOMContentLoaded', () => {
        window.a = new Application();
    });
}(window));
