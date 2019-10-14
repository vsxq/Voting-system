"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const PollsSchema = new mongoose_1.Schema({
    note: { type: String },
    start_date: { type: Date },
    end_data: { type: Date },
    questions_id: { type: Number }
});
exports.Polls = mongoose_1.model("Polls", PollsSchema);
//# sourceMappingURL=Polls.js.map