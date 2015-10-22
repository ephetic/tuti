Pages = new Mongo.Collection('pages');
Privileges = new Mongo.Collection('privileges');

// Pages.insert({
//   pageId: 'home',
//   text: [ '# Select Grade Level\n',
//           '- [Grade 9](Grade-9)',
//           '- [Grade 10](Grade-10)',
//           '- [Grade 11](Grade-11)',
//           '- [Grade 12](Grade-12)',
//         ].join('\n'),
//   createdAt: new Date(),
// });

if (Meteor.isClient) {
  Accounts.ui.config({
    passwordSignupFields: 'USERNAME_ONLY',
  });

  // Meteor.startup(() => {
  //   React.render(
  //     <App />,
  //     document.getElementById('render-target')
  //   );
  // });
}

if (Meteor.isServer) {
  Meteor.startup(() => {
    // code to run on server at startup
  });
}

Meteor.methods({
  getPage(pageId) {
    if (Meteor.userId()) {
      return Pages.findOne({pageId});
    }
  },
});
