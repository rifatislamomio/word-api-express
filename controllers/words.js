const Validator = require("../utils/utils.validator");
const wordsSchema = require("../schemas/word.schemas");

const mongoose = require("mongoose");
const WordModelMongo = new mongoose.model("Word", wordsSchema); //cloud mongo database (with mongoose ODM)

// const db = require("../models/db") //Use this for local mysql server (with Sequelize ORM)
// const Word = db.words

const home = (req, res) => {
  res.json({
    status: "OK",
    message: "Perfectly up and running"
  });
};

const add_word = async (req, res) => {
  var reqBody = req.body;
  if (!Validator(reqBody)) {
    res.json({ Error: "Validator failed!" });
  } else {
    try {
      const word = await Word.create(reqBody);
      res.send(word);
    } catch (error) {
      res.json({
        Error: "Word already exists!"
      });
    }
  }
};

const add_word_mongo = async (req, res) => {
  var reqBody = req.body;
  if (!Validator(reqBody)) {
    res.json({ Error: "Validator failed!" });
  } else {
    const newWord = new WordModelMongo(reqBody);
    await newWord.save(err => {
      if (err) {
        res.status(500).json({
          error: err.message
        });
      } else {
        res.send(reqBody);
      }
    });
  }
};

const getAllWords = async (req, res) => {
  let words = await Word.findAll({});
  res.send(words);
};

const getAllWordsMongo = async (req, res) => {
  await WordModelMongo.find({})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        error: "There was an error"
      });
    });
};

const getNoOfWords = async (req, res) => {
  try {
    limit = req.params.limit;
    let words = await Word.findAll({
      limit: parseInt(limit),
      order: [["id", "DESC"]]
    });
    res.send(words);
  } catch (error) {
    res.status(404).send({ Error: "Invalid API Param/s!" });
  }
};

module.exports = {
  homePageGet: home,
  noteWordPost: add_word,
  allWordsGet: getAllWords,
  noOfWordsGet: getNoOfWords,

  noteWordMongoPost: add_word_mongo,
  allWordsMongoGet: getAllWordsMongo
};
