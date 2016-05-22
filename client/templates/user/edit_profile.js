Template.editProfile.onRendered(() => {
  $("[name=nativeLanguage]").val(Meteor.user().profile.nativeLanguage);
  $("[name=languageOfStudy]").val(Meteor.user().profile.languageOfStudy);
});

Template.editProfile.helpers({
  username: () => Meteor.user().username,
  languages: () => Languages.find()
});

Template.editProfile.events({
  'submit form': e => {
    e.preventDefault();

    const options = {
      $set: {
        'profile.nativeLanguage': $(e.target).find('[name=nativeLanguage]').val(),
        'profile.languageOfStudy': $(e.target).find('[name=languageOfStudy]').val()
      }
    };
    //TODO: Write validateProfile function
    //let errors = validateProfile(profileProperties);
    //if (errors.nativeLanguage || errors.languageOfStudy)
    //  return Session.set('postEditErrors', errors);

    Meteor.users.update(Meteor.user()._id, options, error => {
      if (error) {
        // display the error to the user
        throwError(error.reason);
      } else {
        Router.go('home');
      }
    });
  }
});