const expect = require("expect");
const { Users } = require("./users");

describe("Users", () => {
  var users;
  beforeEach(() => {
    users = new Users();
    users.users = [
      {
        id: 1,
        name: "oats",
        room: "The office"
      },
      {
        id: 2,
        name: "tots",
        room: "React"
      },
      {
        id: 3,
        name: "toasts",
        room: "The office"
      }
    ];
  });

  it("should add a user", () => {
    var users = new Users();
    var user = {
      id: 1,
      name: "oats",
      room: "The office"
    };
    users.addUser(user.id, user.name, user.room);
    expect(users.users).toEqual([user]);
  });

  it("should remove a user", () => {
    var user = users.removeUser(1);
    expect(user.id).toBe(1);
    expect(users.users.length).toBe(2);
  });

  it("should not remove a user", () => {
    var user = users.removeUser(123);
    expect(user).toBeFalsy();
    expect(users.users.length).toBe(3);
  });

  it("should find user", () => {
    var user = users.getUser(1);
    expect(user.id).toBe(1);
  });

  it("should not find a user", () => {
    var user = users.getUser(123);
    expect(user).toBeFalsy();
  });

  it("should return names in room the office", () => {
    var userList = users.getUserList("The office");
    expect(userList).toEqual(["oats", "toasts"]);
  });

  it("should return names in room React", () => {
    var userList = users.getUserList("React");
    expect(userList).toEqual(["tots"]);
  });
});
