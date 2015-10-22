Pages = new Mongo.Collection('pages');
Privileges = new Mongo.Collection('privileges');

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
  }
});
