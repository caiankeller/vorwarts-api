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

    //selecting main queries
    const needValues = { title, author, year, country, language };
    console.log(typeof genres);

    var queryResolve;

    //verify if the queries in empty and save as a object ex.: {title: "Die Leiden des jungen Werthers"}
    //also eliminate bad keys
    queryResolve = Object.fromEntries(
      Object.entries(needValues).filter(
        ([key, value]) => typeof value !== "undefined" && value.length > 0
      )
    );

    let genreResolve = {};
    let query;
    //return, if exists, the genres as: {...results from queryresovle... genres: { '$in': [ "children's book", 'fantasy' ] } }
    if (typeof genres !== "undefined" && genres.length > 0) {
      genreResolve = genres.filter(
        (genre) => genre !== "undefined" && genre.length > 0
      );
      query = { ...queryResolve, genres: { $in: genreResolve } };
    } else {
      query = { ...queryResolve };
    }

    console.log(query);
    query = queryResolve;

    Book.find(
      query,
      null,
      { sort: { author: "asc" }, limit: limit, skip: offset },
      (er, re) => {
        if (re.length === 0)
          return res
            .status(404)
            .send({ ok: false, message: "no book has found" });

        //groups stuff  here.
        if (typeof groupby !== "undefined" && groupby.length > 0) {
          if (
            groupby !== "author" &&
            groupby !== "genres" &&
            groupby !== "year" &&
            groupby !== "country" &&
            groupby !== "language"
          ) {
            return res
              .status(406)
              .send({ ok: false, message: "groupby not available" });
          }

          //if exists, groupby grouped by lodash
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
