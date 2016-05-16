Template.editProfile.onRendered(function () {
  $("#nativeLanguage").val(Meteor.user().profile.nativeLanguage);
  $("#languageOfStudy").val(Meteor.user().profile.languageOfStudy);
});

Template.editProfile.helpers({
  username: () => Meteor.user().username,
});