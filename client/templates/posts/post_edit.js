Template.postEdit.onCreated( () => Session.set('postEditErrors', {}) );

Template.postEdit.onRendered( () => $('[name=language]').val(Template.currentData().language) );

Template.postEdit.helpers({
  errorMessage: function(field) {
    return Session.get('postEditErrors')[field];
  },
  errorClass: function(field) {
    return !!Session.get('postEditErrors')[field] ? 'has-error' : '';
  },
  language: () => this.language,
  languages: () => Languages.find()
});

Template.postEdit.events({
  'submit form': function (e) {
    e.preventDefault();

    var currentPostId = this._id;

    var postProperties = {
      language: $(e.target).find('[name=language]').val(),
      title: $(e.target).find('[name=title]').val(),
      body: $(e.target).find('[name=body]').val()
    };

    var errors = validatePost(postProperties);
    if (errors.title || errors.language || errors.body)
      return Session.set('postEditErrors', errors);

    Posts.update(currentPostId, {$set: postProperties}, function (error) {
      if (error) {
        // display the error to the user
        throwError(error.reason);
      } else {
        Router.go('postPage', {_id: currentPostId});
      }

    });
  },

  'click .delete': function (e) {
    e.preventDefault();

    if (confirm("Delete this post?")) {
      var currentPostId = this._id;
      Posts.remove(currentPostId);
      Router.go('postsList');
    }
  }
});