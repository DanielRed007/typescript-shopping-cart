import * as crypto from "crypto";

export class SecurityEncryption {
  static md5(value) {
    if (!value) return;

    return crypto.createHash("md5").update(value).digest("hex");
  }

  static isValidOnce(value, request) {
    return (
      value === this.md5(request.sessionId + request.headers["user-agent"])
    );
  }
}
