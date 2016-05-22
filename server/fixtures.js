if (Languages.find().count() === 0) {
  const languages = ['Afrikaans', 'Ainu', 'Albanian', 'Arabic', 'Armenian', 'Azerbaijanian',
    'Basque', 'Bengali', 'Bihari', 'Bosnian', 'Breton', 'Bulgarian', 'Burmese', 'Cantonese',
    'Catalan', 'Croatian', 'Czech', 'Danish', 'Dutch', 'English', 'Esperanto', 'Estonian',
    'Faroese', 'Finnish', 'Flemish', 'French', 'Gaelic', 'Georgian', 'German', 'Greek',
    'Haitian', 'Hawaiian', 'Hebrew', 'Hindi', 'Hungarian', 'Icelandic', 'Indonesian', 'Irish',
    'Italian', 'Japanese', 'Javanese', 'Kannada', 'Khmer', 'Kirghiz', 'Korean', 'Kurdish',
    'Laotian', 'Latin', 'Latvian', 'Lithuanian', 'Lojban', 'Macedonian', 'Malay', 'Maltese',
    'Mandarin', 'Marathi', 'Mongolian', 'Myanmar', 'Navajo', 'Norwegian', 'Ossetic', 'Panjabi',
    'Pashto', 'Persian', 'Polish', 'Portuguese(Brazil)', 'Portuguese(Portugal)', 'Romani',
    'Romanian', 'Russian', 'Sanskrit', 'Serbian', 'Sinhalese', 'Slavic', 'Slovak', 'Slovenian',
    'Spanish', 'Swahili', 'Swedish', 'Tagalog', 'Tamil', 'Telugu', 'Thai', 'Tibetan', 'Tongan',
    'Traditional Chinese', 'Turkish', 'Turkmen', 'Udmurt', 'Ukrainian', 'Urdu', 'Uyghur', 'Uzbek',
    'Vietnamese', 'Welsh', 'Yiddish', 'Zulu'];
  for (i in languages) {
    Languages.insert({name: languages[i]});
  }
}

if (Posts.find().count() === 0) {
  var now = new Date().getTime();

  //create two users
  var tomId = Meteor.users.insert({
    profile: {name: 'Tom Coleman'}
  });
  var tom = Meteor.users.findOne(tomId);
  var sachaId = Meteor.users.insert({
    profile: {name: 'Sacha Greif'}
  });
  var sacha = Meteor.users.findOne(sachaId);

  var telescopeId = Posts.insert({
    title: 'Introducing Telescope',
    userId: sachaId,
    author: sacha.profile.name,
    url: 'http://sachagreif.com/introducing-telescope/',
    submitted: new Date(now - 7 * 3600 * 1000),
    commentsCount: 2,
    upvoters: [],
    votes: 0
  });

  Comments.insert({
    postId: telescopeId,
    userId: tomId,
    author: tom.profile.name,
    submitted: new Date(now - 5 * 3600 * 1000),
    body: 'Interesting project Sacha, can I get involved?'
  });

  Comments.insert({
    postId: telescopeId,
    userId: sachaId,
    author: sacha.profile.name,
    submitted: new Date(now - 3 * 3600 * 1000),
    body: 'You sure can Tom!'
  });

  Posts.insert({
    title: 'Meteor',
    userId: tomId,
    author: tom.profile.name,
    url: 'http://meteor.com',
    submitted: new Date(now - 10 * 3600 * 1000),
    commentsCount: 0,
    upvoters: [],
    votes: 0
  });

  Posts.insert({
    title: 'The Meteor Book',
    userId: tomId,
    author: tom.profile.name,
    url: 'http://themeteorbook.com',
    submitted: new Date(now - 12 * 3600 * 1000),
    commentsCount: 0,
    upvoters: [],
    votes: 0
  });

  for (var i=0; i<10; i++) {
    Posts.insert({
      title: 'Test post #' + i,
      author: sacha.profile.name,
      userId: sacha._id,
      url: 'http://google.com/?q=test-' + i,
      submitted: new Date(now - i * 3600 * 1000),
      commentsCount: 0,
      upvoters: [],
      votes: 0
    });
  }
}