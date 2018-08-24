var expect = require("expect");

var { generateMessage } = require("./message");

describe("generateMessage", () => {
  it("should generate correct message", () => {
    var newMessage = generateMessage("email", "test text");
    expect(newMessage.from).toBe("email");
    expect(newMessage.text).toBe("test text");
    expect(typeof newMessage.createdAt).toBe("number");
  });
});
