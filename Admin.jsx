Admin = React.createClass({
  propTypes: {
    users: React.PropTypes.array.isRequired,
  },
  
  onClick(user, field){
    if (field === 'admin' && user.userId === Meteor.userId()) {
      return;
    }
    user[field] = ! user[field];
    Meteor.call('updateUserPrivileges', user, () => this.forceUpdate());
  },

  render() {
    return (
      <div>
        <table>
          <tr>
            <th>User</th>
            <th>Student</th>
            <th>Teacher</th>
            <th>Admin</th>
          </tr>
          {this.props.users && this.props.users.map(user => (
            <tr>
              <td>{user.username}</td>
              <td><input type="checkbox" checked={user.student} onClick={() => this.onClick(user, 'student')}/></td>
              <td><input type="checkbox" checked={user.teacher} onClick={() => this.onClick(user, 'teacher')}/></td>
              <td><input type="checkbox" checked={user.admin} onClick={() => this.onClick(user, 'admin')}/></td>
            </tr>
          ))}
        </table>
      </div>);
  },
});
