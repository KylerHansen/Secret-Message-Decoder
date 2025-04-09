import { assert } from "chai";
import { describe, it } from "mocha";
import { decodeMessage } from "../src/decode-message.js";

describe(decodeMessage.name, () => {
  it("rejects empty url", async () => {
    assert.isUndefined(await decodeMessage(""), "empty string");
  });

  it("returns decoded letter F", async () => {
    assert.deepEqual(
      await decodeMessage(
        "https://docs.google.com/document/d/e/2PACX-1vRMx5YQlZNa3ra8dYYxmv-QIQ3YJe8tbI3kqcuC7lQiZm-CSEznKfN_HYNSpoXcZIV3Y_O3YoUB1ecq/pub"
      ),
      `█▀▀▀
█▀▀ 
█`
    );
  });

  it("gives final coded message", async () => {
    assert.deepEqual(
      await decodeMessage(
        "https://docs.google.com/document/d/e/2PACX-1vQGUck9HIFCyezsrBSnmENk5ieJuYwpt7YHYEzeNJkIb9OSDdx-ov2nRNReKQyey-cwJOoEKUhLmN9z/pub"
      ),
      `


████████░     ████████░   ██████████░    ███████░  ██░           ███░ ███░    ███░ ██░     ██░
██░     ██░ ███░     ███░ ██░          ███░    ██░ ███░   ███░   ██░    ██░  ██░   ██░     ██░
██░     ██░ ██░       ██░ ██░         ███░          ██░  █████░ ███░     ██░██░    ██░     ██░
████████░   ██░       ██░ ████████░   ██░           ███░ ██░██░ ██░       ███░     ██████████░
██░     ██░ ██░       ██░ ██░         ███░           ██░██░ ██░██░       ██░██░    ██░     ██░
██░     ██░ ███░     ███░ ██░          ███░    ██░   ████░   ████░      ██░  ██░   ██░     ██░
████████░     ████████░   ██████████░    ███████░     ██░     ██░     ███░    ███░ ██░     ██░
`
    );
  });
});
