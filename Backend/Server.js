// server.js
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const sharp = require("sharp");

const User = require("./models/User");
const Song = require("./models/Songs");
const Artist = require("./models/Artist");
const OTP = require("./models/OTP");

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(cors());

// =================== MongoDB Connection ===================
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// =================== Test Route ===================
app.get("/", (req, res) => res.json({ message: "Server running ✅" }));

// =================== OTP Routes ===================
app.post("/send-otp", async (req, res) => {
  const { email, username, password } = req.body;

  // DEBUG LOG
  console.log(
    `[DEBUG] /send-otp received - User: ${username}, Pass: ${password}`
  );

  try {
    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Save to DB
    const newOtp = new OTP({ email, username, password, otp });
    await newOtp.save();

    // Log to console (Simulate Email)
    console.log(`\n🔑 OTP for ${email}: ${otp} \n`);

    res.json({ message: "OTP sent successfully (check server console)", otp });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/verify-otp", async (req, res) => {
  const { email, otp } = req.body;

  try {
    const record = await OTP.findOne({ email, otp });
    if (!record) return res.status(400).json({ message: "Invalid OTP" });

    // OTP verified -> Create user
    try {
      const exist = await User.findOne({
        $or: [{ email: record.email }, { username: record.username }],
      });
      if (!exist) {
        console.log(
          `[DEBUG] Creating user from OTP record - Pass: ${record.password}`
        ); // DEBUG LOG
        const newUser = new User({
          username: record.username,
          email: record.email,
          password: record.password,
        });
        await newUser.save();
      }
    } catch (createErr) {
      console.error("User creation failed after OTP verify:", createErr);
    }

    // Delete OTP
    await OTP.deleteOne({ email, otp });

    res.json({
      message: "OTP verified successfully",
      username: record.username,
      email: record.email,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// =================== Signup ===================
app.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password)
    return res.status(400).json({ message: "All fields required" });

  try {
    const exist = await User.findOne({ $or: [{ email }, { username }] });
    if (exist) return res.status(400).json({ message: "User already exists" });

    const newUser = new User({ username, email, password });
    await newUser.save();

    res.status(201).json({ message: "Signup successful", user: newUser });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// =================== Login ===================
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      return res.status(400).json({ message: "All fields required" });

    const user = await User.findOne({
      $or: [
        { username: new RegExp(`^${username}$`, "i") },
        { email: new RegExp(`^${username}$`, "i") },
      ],
    });

    if (!user) return res.status(404).json({ message: "User not found" });
    if (user.password !== password)
      return res.status(401).json({ message: "Invalid password" });

    res.json({ message: "Login successful", user });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// =================== Multer Config ===================
const storage = multer.memoryStorage();
const upload = multer({ storage, limits: { fileSize: 50 * 1024 * 1024 } });

// =================== Upload Song Route ===================
app.post(
  "/Plus",
  upload.fields([
    { name: "audioFile", maxCount: 1 },
    { name: "coverImage", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const { songName, artistName, artistId, album, lyrics, releaseDate } =
        req.body;

      if (!songName || (!artistName && !artistId))
        return res
          .status(400)
          .json({ message: "Song Name & Artist (name or id) required" });

      if (!req.files || !req.files.audioFile || !req.files.audioFile[0]) {
        return res.status(400).json({
          message:
            "Audio file is required and must be uploaded as multipart/form-data",
        });
      }

      // Resolve artist
      let artistRef = artistId;
      if (!artistRef && artistName) {
        const existing = await Artist.findOne({
          name: new RegExp(`^${artistName}$`, "i"),
        });
        artistRef = existing
          ? existing._id
          : (await new Artist({ name: artistName }).save())._id;
      }

      // Compress cover image
      let compressedCover = null;
      if (req.files.coverImage && req.files.coverImage[0]) {
        try {
          const inputBuf = req.files.coverImage[0].buffer;
          const outBuf = await sharp(inputBuf)
            .resize({ width: 600, height: 600, fit: "cover" })
            .jpeg({ quality: 75 })
            .toBuffer();
          compressedCover = { data: outBuf, contentType: "image/jpeg" };
        } catch (e) {
          console.error("Cover compression failed, storing original:", e);
          compressedCover = {
            data: req.files.coverImage[0].buffer,
            contentType: req.files.coverImage[0].mimetype,
          };
        }
      }

      const newSong = new Song({
        songName,
        artist: artistRef,
        album,
        lyrics,
        releaseDate: releaseDate ? new Date(releaseDate) : Date.now(),
        audioFile: {
          data: req.files.audioFile[0].buffer,
          contentType: req.files.audioFile[0].mimetype,
        },
        coverImage: compressedCover,
      });

      await newSong.save();

      if (compressedCover) {
        try {
          await Artist.findByIdAndUpdate(artistRef, {
            avatar: compressedCover,
          });
        } catch (e) {
          console.error("Failed to update artist avatar:", e);
        }
      }

      res.status(201).json({
        message: "Song uploaded successfully",
        song: { _id: newSong._id, songName, artist: artistRef },
      });
    } catch (err) {
      console.error("Song upload error:", err);
      res.status(500).json({ message: "Server error" });
    }
  }
);

// =================== Content Routes ===================

// GET single artist
app.get("/artists/:id", async (req, res) => {
  try {
    const artist = await Artist.findById(req.params.id).select("-avatar.data");
    if (!artist) return res.status(404).json({ message: "Artist not found" });
    res.json(artist);
  } catch (err) {
    console.error("Error fetching artist:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET songs by artist
app.get("/artists/:id/songs", async (req, res) => {
  try {
    const songs = await Song.find({ artist: req.params.id })
      .sort({ releaseDate: -1 }) // Newest first
      .select("-audioFile.data -coverImage.data");
    res.json(songs);
  } catch (err) {
    console.error("Error fetching artist songs:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET all artists
app.get("/artists", async (req, res) => {
  try {
    const artists = await Artist.find().select("-avatar.data");
    res.json(artists);
  } catch (err) {
    console.error("Error fetching artists:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET all songs (with artist info)
app.get("/songs", async (req, res) => {
  try {
    const songs = await Song.find()
      .populate("artist")
      .select("-audioFile.data -coverImage.data")
      .sort({ createdAt: -1 })
      .limit(10);
    res.json(songs);
  } catch (err) {
    console.error("Error fetching songs:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET next song
app.get("/songs/:id/next", async (req, res) => {
  try {
    const currentSong = await Song.findById(req.params.id);
    if (!currentSong)
      return res.status(404).json({ message: "Song not found" });

    // Find first song created AFTER this one
    const nextSong = await Song.findOne({ _id: { $gt: currentSong._id } })
      .sort({ _id: 1 })
      .populate("artist")
      .select("-audioFile.data -coverImage.data");

    if (!nextSong) return res.status(404).json({ message: "No next song" });

    res.json(nextSong);
  } catch (err) {
    console.error("Error fetching next song:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET previous song
app.get("/songs/:id/previous", async (req, res) => {
  try {
    const currentSong = await Song.findById(req.params.id);
    if (!currentSong)
      return res.status(404).json({ message: "Song not found" });

    // Find first song created BEFORE this one
    const prevSong = await Song.findOne({ _id: { $lt: currentSong._id } })
      .sort({ _id: -1 })
      .populate("artist")
      .select("-audioFile.data -coverImage.data");

    if (!prevSong) return res.status(404).json({ message: "No previous song" });

    res.json(prevSong);
  } catch (err) {
    console.error("Error fetching previous song:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET artist avatar
app.get("/artists/:id/avatar", async (req, res) => {
  try {
    const artist = await Artist.findById(req.params.id);
    if (!artist || !artist.avatar || !artist.avatar.data) {
      // Redirect to a placeholder or return 404
      // For now, let's just 404
      return res.status(404).send("No avatar found");
    }
    res.set("Content-Type", artist.avatar.contentType);
    res.send(artist.avatar.data);
  } catch (err) {
    console.error("Error fetching avatar:", err);
    res.status(500).send("Server error");
  }
});

// GET song audio
app.get("/audio/:id", async (req, res) => {
  try {
    const song = await Song.findById(req.params.id);
    if (!song || !song.audioFile || !song.audioFile.data) {
      return res.status(404).send("Audio not found");
    }
    res.set("Content-Type", song.audioFile.contentType);
    res.send(song.audioFile.data);
  } catch (err) {
    console.error("Error fetching audio:", err);
    res.status(500).send("Server error");
  }
});

// GET song cover
app.get("/cover/:id", async (req, res) => {
  try {
    const song = await Song.findById(req.params.id);
    if (!song || !song.coverImage || !song.coverImage.data) {
      return res.status(404).send("Cover not found");
    }
    res.set("Content-Type", song.coverImage.contentType);
    res.send(song.coverImage.data);
  } catch (err) {
    console.error("Error fetching cover:", err);
    res.status(500).send("Server error");
  }
});

app.listen(PORT, () => console.log(`🚀 Server running at port ${PORT}`));
