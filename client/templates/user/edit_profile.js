Template.editProfile.onRendered( () => {
  $("[name=nativeLanguage]").val(Meteor.user().profile.nativeLanguage);
  $("[name=languageOfStudy]").val(Meteor.user().profile.languageOfStudy);
});

Template.editProfile.helpers({
  username: () => Meteor.user().username,
});

Template.editProfile.events({
  'submit form': e => {
    e.preventDefault();

    let profileProperties = {
      nativeLanguage: $(e.target).find('[name=nativeLanguage]').val(),
      languageOfStudy: $(e.target).find('[name=languageOfStudy]').val(),
    };

    //TODO: Write validateProfile function
    //let errors = validateProfile(profileProperties);
    //if (errors.nativeLanguage || errors.languageOfStudy)
    //  return Session.set('postEditErrors', errors);

    Meteor.users.update(Meteor.user()._id, {$set: { profile: profileProperties } }, error => {
      if (error) {
        // display the error to the user
        throwError(error.reason);
      } else {
        //Router.go('postPage', {_id: currentPostId});
      }
    });
  }
});