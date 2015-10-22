FlowRouter.triggers.enter([authorize], {except: ["home"]});

function authorize() {
  if (! Meteor.userId()) {
    FlowRouter.go('/');
  }
}

FlowRouter.notFound = {
  action() {
    FlowRouter.go('/page/home');
  },
};

FlowRouter.route('/', {
  name: 'home',
  action() {
    ReactLayout.render(HomeLayout, {});
  },
});

FlowRouter.route('/page/:pageId', {
  action(params) {
    Meteor.call('getPage', params.pageId, (err, page) => {
      if (! page) {
        return FlowRouter.go('/page/' + params.pageId + '/edit');
      }
      const privs = Session.get('userPrivileges');
      const content = (<Page {...params} text={page.text} 
        userCanEdit={privs && privs.teacher}/>);
      ReactLayout.render(MainLayout, {content});
    });
  },
});

FlowRouter.route('/page/:pageId/edit', {
  action(params) {
    Meteor.call('getPage', params.pageId, (err, page) => {
      const text = page && page.text || '';
      const content = (<PageEditor {...params} text={text}/>);
      ReactLayout.render(MainLayout, {content});
    });
  },
});
