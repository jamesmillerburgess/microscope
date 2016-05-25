Accounts.onCreateUser(function (options, user) {
  if (options.profile) {
    options.profile.nativeLanguage = 'English';
    options.profile.languageOfStudy = 'English';
    if (user.services.facebook) {
      options.profile.picture = "https://graph.facebook.com/" + user.services.facebook.id + "/picture/?type=large";
    }
    user.profile = options.profile;
  }
  return user;
});
