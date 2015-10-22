MainLayout = React.createClass({
  render() {
    const privs = Session.get('userPrivileges');
    return (
      <div>
        <header className="topbar_header">
          <h1 className="topbar_header_h1">tuti</h1>
          <div className="topbar_header_navbar">
            <AccountsUIWrapper />
            <a href="/page/home">Home</a>
            {privs && (privs.admin || privs.teacher) ? 
              <a href="/admin">Admin</a> : ''}
          </div>
        </header>
        <main>{this.props.content}</main>
        <footer>Made with Meteor © 2015 Brian Cleary</footer>
      </div>
    );
  },
});
