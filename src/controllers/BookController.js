const Book = require("../models/Book");
const { _ } = require("lodash");

module.exports = {
  async getBooks(req, res) {
    const {
      title,
      author,
      year,
      country,
      language,
      genres,
      limit,
      offset,
      groupby,
    } = req.query;

    var query;

    //selecting main queries
    const needValues = { title, author, year, country, language };

    //verify if the queries in empty and save as a object ex.: {title: "Die Leiden des jungen Werthers"}
    //also eliminate bad keys
    query = Object.fromEntries(
      Object.entries(needValues).filter(
        ([key, value]) => typeof value !== "undefined" && value.length > 0
      )
    );

    //return, if exists, the genres as: {...query, genres: { '$in': [children's book, fantasy] } }
    if (typeof genres !== "undefined" && genres.length > 0) {
      query = {
        ...query,
        genres: {
          $in: genres.split(",").map((genre) => {
            return genre.trim();
          }),
        },
      };
    }

    Book.find(
      query,
      null,
      { sort: { author: "asc" }, limit: limit, skip: offset },
      (er, re) => {
        if (er)
          return res.status(400).send({
            status: 400,
            ok: false,
            message: "an error occured in the database.",
          });

        if (re.length === 0)
          return res
            .status(404)
            .send({ status: 404, ok: false, message: "no book has found" });

        //groups stuff  here.
        if (typeof groupby !== "undefined" && groupby.length > 0) {
          if (
            groupby !== "author" &&
            groupby !== "genres" &&
            groupby !== "year" &&
            groupby !== "country" &&
            groupby !== "language"
          )
            return res.status(406).send({
              status: 406,
              ok: false,
              message: "groupby not available",
            });

          //if exists, groupby grouped by lodash
          const data = _.chain(re)
            .groupBy(groupby)
            .map((value, key) => ({
              [groupby]: key,
              books: value,
            }));
          return res.status(200).send({ status: 200, ok: true, data: data });
        }

        return res.status(200).send({ status: 200, ok: true, data: re });
      }
    );
  },
};
