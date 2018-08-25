var expect = require("expect");

var { generateMessage, generateLocationMessage } = require("./message");

describe("generateMessage", () => {
  it("should generate correct message", () => {
    var newMessage = generateMessage("email", "test text");
    expect(newMessage.from).toBe("email");
    expect(newMessage.text).toBe("test text");
    expect(typeof newMessage.createdAt).toBe("number");
  });
});

describe("generateLocationMEssage", () => {
  it("should generate correct location message", () => {
    var newLocation = generateLocationMessage("peter", 1, 2);
    expect(newLocation.from).toBe("peter");
    expect(newLocation.url).toBe("https://www.google.com/maps?q=1,2");
    expect(typeof newLocation.createdAt).toBe("number");
  });
});
