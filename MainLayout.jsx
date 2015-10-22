MainLayout = React.createClass({
  render() {
    const privs = Session.get('userPrivileges');
    return (
      <div>
        <header className="topbar_header">
          <h1 className="topbar_header_h1"> tuti </h1>
          <AccountsUIWrapper
            className="topbar_header_login" />
          <a href="/page/home">Home</a>
          {privs.admin || privs.teacher ? 
            <a href="/admin">Admin</a> : ''}
        </header>
        <main>{this.props.content}</main>
        <footer>Made with Meteor © 2015 Brian Cleary</footer>
      </div>
    );
  },
});
