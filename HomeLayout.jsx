HomeLayout = React.createClass({
  render() {
    return (
      <div>
        <main>
          <h1 className="home_h1"> tuti </h1>
          <AccountsUIWrapper
            className="home_login" />
        </main>
        <footer>Made with Meteor © 2015 Brian Cleary</footer>
      </div>
    );
  }
});