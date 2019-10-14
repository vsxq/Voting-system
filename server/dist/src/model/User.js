"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    user: String,
    passwd: String,
    sex: Boolean,
});
exports.Users = mongoose_1.model("Users", UserSchema);
//# sourceMappingURL=User.js.map