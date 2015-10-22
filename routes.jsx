FlowRouter.triggers.enter([checkLogin], {except: ["home"]});

function checkLogin() {
  if (! Meteor.userId()) {
    FlowRouter.go('/');
  }
}

function checkAdmin() {
  const privs = Session.get('userPrivileges');
  if (! privs || ! privs.admin && ! privs.teacher) {
    FlowRouter.go('/');  
  }
}

FlowRouter.notFound = {
  action() {
    console.log('notFound');
    FlowRouter.go('/page/home');
  },
};

FlowRouter.route('/', {
  name: 'home',
  action() {
    if (Meteor.userId()) {
      return FlowRouter.go('/page/home');
    }
    // ReactLayout.render(HomeLayout, {});
    ReactLayout.render(MainLayout, {});

  },
});

FlowRouter.route('/page/:pageId', {
  action(params) {
    Meteor.call('getPage', params.pageId, (err, page) => {
      const privs = Session.get('userPrivileges');
      if (! page && privs && privs.teacher) {
        return FlowRouter.go('/page/' + params.pageId + '/edit');
      }
      const content = (<Page {...params} text={page && page.text || ''} 
        userCanEdit={privs && privs.teacher}/>);
      ReactLayout.render(MainLayout, {content});
    });
  },
});

FlowRouter.route('/page/:pageId/edit', {
  triggersEnter: [checkAdmin],
  action(params) {
    Meteor.call('getPage', params.pageId, (err, page) => {
      const text = page && page.text || '';
      const content = (<PageEditor {...params} text={text}/>);
      ReactLayout.render(MainLayout, {content});
    });
  },
});

FlowRouter.route('/admin', {
  triggersEnter: [checkAdmin],
  action() {
    Meteor.call('listUsers', (err, users) => {
      const content = (<Admin users={users}/>);
      ReactLayout.render(MainLayout, {content});      
    });
  }
});

FlowRouter.route('/quiz/:quizId', {
  action(params) {
    Meteor.call('getQuiz', params.quizId, (err, quiz) => {
      console.log(quiz);
      const privs = Session.get('userPrivileges');
      if (privs.student && ! quiz.available) {
        return FlowRouter.go('/');
      }
      const content = <Quiz {...params} {...quiz} privs={privs}/>;
      return ReactLayout.render(MainLayout, {content});
    });
  }
});

FlowRouter.route('/quiz/:quizId/edit', {
  triggersEnter: [checkAdmin],
  action(params) {
    Meteor.call('getQuiz', params.quizId, (err, quiz) => {
      const privs = Session.get('userPrivileges');
      const content = (<QuizEditor {...quiz} privs={privs}/>);
      ReactLayout.render(MainLayout, {content});
    });
  },
});

