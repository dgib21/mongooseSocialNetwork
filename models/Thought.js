const { Schema, model, Types } = require("mongoose");
const moment = require("moment");

const ReactionSchema = new Schema(
  {

    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      trim: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
      trim: true,
    },
    //use moment.js to format the date for me
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) =>
        moment(createdAtVal).format("MMM DD, YYYY [at] hh:mm a"),
    },
  },
  {
    //tell the schema that it can use getters
    toJSON: {
      getters: true,
    },
  }
);

const ThoughtSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    thoughtText: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 280,
    },
    //using moment to format date 
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) =>
        moment(createdAtVal).format("MMM DD, YYYY [at] hh:mm a"),
    },
    //associate reactions with thoughts
    reactions: [ReactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

//get total count of reactions
ThoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

//create the Thought model using ThoughtSchema
const Thought = model("Thought", ThoughtSchema);

module.exports = Thought;