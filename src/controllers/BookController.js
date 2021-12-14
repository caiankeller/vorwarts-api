const Book = require("../models/Book");
const { _ } = require("lodash");

module.exports = {
  async getBooks(req, res) {
    const { title, author, year, country, language, limit, offset, groupby } =
      req.query;

    const { genres } = req.body;

    const queries = {
      title: title,
      author: author,
      firstPublishment: year,
      originCountry: country,
      language: language,
    };

    const queryResolve = Object.fromEntries(
      Object.entries(queries).filter(
        ([key, value]) => typeof value !== "undefined" && value.length > 0
      )
    );

    let genreResolve = {};
    let query;

    if (typeof genres !== "undefined" && genres.length > 0) {
      genreResolve = genres.filter(
        (genre) => genre !== "undefined" && genre.length > 0
      );
      query = { ...queryResolve, genre: { $in: genreResolve } };
    } else {
      query = { ...queryResolve };
    }

    Book.find(
      query,
      null,
      { sort: { author: "asc" }, limit: limit, skip: offset },
      (er, re) => {
        if (re.length === 0)
          return res
            .status(400)
            .send({ ok: false, message: "no book has found" });

        if (typeof groupby !== "undefined" && groupby.length > 0) {
          if (
            groupby !== "author" &&
            groupby !== "genre" &&
            groupby !== "year" &&
            groupby !== "originCountry" &&
            groupby !== "language"
          ) {
            return res
              .status(400)
              .send({ ok: false, message: "groupby not available" });
          }
          const data = _.chain(re)
            .groupBy(groupby)
            .map((value, key) => ({
              [groupby]: key,
              books: value,
            }));
          return res.status(200).send({ ok: true, data: data });
        }

        return res.status(200).send({ ok: true, data: re });
      }
    );
  },
};
