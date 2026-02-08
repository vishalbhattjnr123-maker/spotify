const mongoose = require("mongoose");

// Song schema
const songSchema = new mongoose.Schema({
  songName: { type: String, required: true },
  artist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Artist",
    required: true,
  },
  album: { type: String },
  lyrics: { type: String },
  releaseDate: { type: Date, default: Date.now },
  audioFile: {
    data: { type: Buffer, required: true },
    contentType: { type: String, required: true },
  },
  coverImage: {
    data: Buffer,
    contentType: String,
  },
  createdAt: { type: Date, default: Date.now },
});

// Song model
const Song = mongoose.model("Song", songSchema);

module.exports = Song;
