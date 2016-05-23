Posts = new Mongo.Collection('posts');

Posts.allow({
  update: function (userId, post) {
    return ownsDocument(userId, post);
  },
  remove: function (userId, post) {
    return ownsDocument(userId, post);
  }
});

Posts.deny({
  update: function (userId, post, fieldNames) {
    // may only edit the following two fields:
    return (_.without(fieldNames, 'language', 'title', 'body').length > 0);
  }
});

Posts.deny({
  update: function (userId, post, fieldNames, modifier) {
    const errors = validatePost(modifier.$set);
    return errors.title || errors.language || errors.body;
  }
});

// TODO: Migrate edit post into a method so we prevent duplicate urls
Meteor.methods({
  postInsert: function (postAttributes) {
    check(Meteor.userId(), String);
    check(postAttributes, {
      title: String,
      language: String,
      body: String
    });

    const errors = validatePost(postAttributes);
    if (errors.title || errors.language || errors.body)
      throw new Meteor.Error('invalid-post', "You must set a title and URL for your post");

    /*var postWithSameLink = Posts.findOne({url: postAttributes.url});
    if (postWithSameLink) {
      return {
        postExists: true,
        _id: postWithSameLink._id
      }
    }  */

    const user = Meteor.user();
    const post = _.extend(postAttributes, {
      userId: user._id,
      author: user.username || user.profile.name,
      picture: user.profile.picture,
      submitted: new Date(),
      commentsCount: 0,
      upvoters: [],
      votes: 0
    });

    const postId = Posts.insert(post);

    return {_id: postId};
  },
  upvote: function (postId) {
    check(this.userId, String);
    check(postId, String);

    const affected = Posts.update({
      _id: postId,
      upvoters: {$ne: this.userId}
    }, {
      $addToSet: {upvoters: this.userId},
      $inc: {votes: 1}
    });

    if (!affected)
      throw new Meteor.Error('invalid', "You weren't able to upvote that post");
  }
});

validatePost = function (post) {
  const errors = {};
  if (!post.title)
    errors.title = "Please fill in a headline";
  if (!post.body)
    errors.body = "Please fill in a URL";
  if (!post.language)
    errors.language = "Please select a language";
  return errors;
};