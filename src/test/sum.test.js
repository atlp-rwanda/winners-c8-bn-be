import assert from "assert";
import sum from "./sum";

describe("coveralls testing", () => {
  it("makes sum of two numbers", () => {
    assert(sum() == 2);
  });
});
