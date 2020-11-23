const Hapi = require('@hapi/hapi');
const Joi = require('joi');
const Mongoose = require('mongoose');

Mongoose.connect('mongodb://localhost:27017/votedb', {useNewUrlParser: true});

const schema = new Mongoose.Schema({
  ipAddr: String,
  reason: String,
  team: String 
});
const VoteModel = Mongoose.model("Vote", schema);

// Init Server
const server = new Hapi.Server({
  port: 5675,
  host: 'localhost'
});

// POST vote route
server.route({
  method: 'POST',
  path: '/vote',
  options: {
    validate: {
      payload: Joi.object({
        ipAddr: Joi.string().required(),
        reason: Joi.string().min(6).required(),
        team: Joi.string().required()
      }),
      failAction: (request, h, error) => {
        return error.isJoi ? h.response(error.details[0]).takeover().code(500) : h.response(error).takeover().code(500);
      }
    }
  },
  handler: async (request, h) => {
    try {
      var vote = new VoteModel(request.payload);
      var result = await vote.save();
      return h.response(result);
    } catch (error) {
      return error;
    }
  }
});

// GET votes route
server.route({
  method: 'GET',
  path: '/votes',
  handler: async (request, h) => {
    try {
      var votes = await VoteModel.find().exec();
      return h.response(votes);
    } catch (error) {
      return error;
    }
  }
});

// Start Server
server.start((err) => {
  if (err) {
    throw err;
  }

  console.log(`Server started on port ${server.info.uri}`);
});
