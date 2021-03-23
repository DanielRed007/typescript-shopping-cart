import { SecurityEncryption } from "../config/SecurityEncription";

describe("Security Encryption Tests", () => {
  const secretValue = "My test";
  const hashedResult = "7030ebb11fa69ef5aca399dd6944ea37";

  test("Can perform a successful hash encryption", () => {
    const hashResult = SecurityEncryption.md5(secretValue);

    expect(hashResult).toBeDefined();
    expect(hashResult).toBe(hashedResult);
  });

  test("Invalid secret value will produce an invalid hash", () => {
    const invalidValue = "#";
    const hashResult = SecurityEncryption.md5(secretValue + invalidValue);

    expect(hashResult).toBeDefined();
    expect(hashResult).not.toBe(hashedResult);
  });
});
