Template.postSubmit.onCreated(function () {
  Session.set('postSubmitErrors', {});
});

Template.postSubmit.helpers({
  errorMessage: function (field) {
    return Session.get('postSubmitErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('postSubmitErrors')[field] ? 'has-error' : '';
  }
});

Template.postSubmit.events({
  'submit form': function (e) {
    e.preventDefault();

    var post = {
      language: $(e.target).find('[name=language]').val(),
      title: $(e.target).find('[name=title]').val(),
      body: $(e.target).find('[name=body]').val()
    };

    var errors = validatePost(post);
    if (errors.title || errors.language || errors.body)
      return Session.set('postSubmitErrors', errors);

    Meteor.call('postInsert', post, function (error, result) {
      // display the error to the user and abort
      if (error)
        return throwError(error.reason);

      if (result.postExists)
        throwError('This link has already been posted');

      Router.go('postPage', {_id: result._id});
    });


  }
});