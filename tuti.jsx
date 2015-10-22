Pages = new Mongo.Collection('pages');
Privileges = new Mongo.Collection('privileges');
Quizzes = new Mongo.Collection('quizzes');
Questions = new Mongo.Collection('questions');

if (Meteor.isClient) {
  Accounts.ui.config({
    passwordSignupFields: 'USERNAME_ONLY',
  });

  Meteor.call('getPrivileges', (err, privs) => {
    Session.set('userPrivileges', privs);
  });
}

if (Meteor.isServer) {
  Meteor.startup(() => {
    // Create demonstration admin user in users and privileges
    if(! Meteor.users.findOne({username: 'admin'})) {
      console.log('creating admin user')
      const userId = Accounts.createUser({
        username: 'admin',
        password: 'admin',
      });
      Privileges.insert({userId, admin:true});
    }

    // TODO: publish Pages visibile to current user
  });
}

Meteor.methods({
  getPage(pageId) {
    if (Meteor.userId()) {
      return Pages.findOne({pageId});
    }
  },
  savePage(pageId, text) {
    if (Meteor.userId()) {
      const update = {
        pageId,
        text,
        createdAt: new Date(),
        createdBy: Meteor.userId(),
      };
      Pages.update({pageId}, update, {upsert: true});
    }
  },
  getPrivileges() {
    const privs = Privileges.findOne({userId: Meteor.userId()});
    return privs;
  },
  listUsers() {
    return Meteor.users.find({}, {
      fields: {
        _id: 1,
        username: 1,
        profile: 1,
      }
    }).map(user => {
      const privs = Privileges.findOne({userId: user._id});
      Object.keys(privs).map(key => {
        if(privs.hasOwnProperty(key) && key !== '_id') {
          user[key] = privs[key];
        }
      });
      return user;
    });
  },
  updateUserPrivileges(user) {
    if(! user.admin) {
      throw new Meteor.Error('not-authorized');
    }
    Privileges.update({userId:user.userId}, {
      userId:user.userId,
      admin: user.admin,
      student: user.student,
      teacher: user.teacher,
    });
    return;
  },
  getQuiz(quizId) {
    const quiz = Quizzes.findOne(quizId);
    const questionIds = quiz && quiz.questions || [];
    quiz.questions = Questions.find({questionId: {$in: questionIds}}).fetch();
    return quiz;
  },
});
