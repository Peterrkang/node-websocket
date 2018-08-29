const expect = require("expect");

const { isRealString } = require("./validation");

describe("isRealString", () => {
  it("should reject non-string values", () => {
    var test = 98;
    expect(isRealString(test)).toBe(false);
  });
  it("should reject string with only spaces", () => {
    var test = " ";
    expect(isRealString(test)).toBe(false);
  });
  it("should allow string with non-space chars", () => {
    var test = "lotr";
    expect(isRealString(test)).toBe(true);
  });
});
