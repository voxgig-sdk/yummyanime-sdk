"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.YummyanimeError = void 0;
class YummyanimeError extends Error {
    isYummyanimeError = true;
    sdk = 'Yummyanime';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.YummyanimeError = YummyanimeError;
//# sourceMappingURL=YummyanimeError.js.map