const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const quitSchema = Schema({
    userId: Schema.Types.ObjectId,
    demand_text: String,
    submitted: { type: Date, default: Date.now}
});

module.exports = mongoose.model('quit_demand', quitSchema);