class Users {
  constructor() {
    this.users = [];
  }

  addUser(id, name, room) {
    var user = {
      id,
      name,
      room
    };
    this.users.push(user);
    return user;
  }

  removeUser(id) {
    var removedUser;
    this.users = this.users.filter(user => {
      if (user.id !== id) return user;
      else removedUser = user;
    });
    return removedUser;
  }

  getUser(id) {
    return this.users.filter(user => user.id === id)[0];
  }

  getUserList(room) {
    var users = this.users.filter(user => user.room === room);
    return users.map(user => user.name);
  }
}

module.exports = { Users };
