const Book = require('../models/Book')
const { _ } = require('lodash')

module.exports = {
  async getBooks (req, res) {
    const {
      title,
      author,
      year,
      country,
      language,
      genres,
      limit,
      offset,
      groupby
    } = req.query

    let query

    // selecting main queries
    const needValues = { title, author, year, country, language }

    // verify if the queries in empty and save as a object ex.: {title: "Die Leiden des jungen Werthers"}
    // also eliminate bad keys
    query = Object.fromEntries(
      Object.entries(needValues).filter(
        ([key, value]) => typeof value !== 'undefined' && value.length > 0
      )
    )

    // return, if exists, the genres ready for mongoose search: {...query, genres: { '$in': [children's book, fantasy] } }
    if (typeof genres !== 'undefined' && genres.length > 0) {
      query = {
        ...query,
        genres: {
          $in: genres.split(',').map((genre) => {
            return genre.trim()
          })
        }
      }
    }

    Book.find(
      query,
      null,
      { sort: { author: 'asc' }, limit: limit, skip: offset },
      (er, re) => {
        if (er) {
          return res.status(400).send({
            status: 400,
            ok: false,
            message: 'An une'
          })
        }

        if (re.length === 0) {
          return res
            .status(404)
            .send({ status: 404, ok: false, message: 'No books were found.' })
        }

        // groups stuff  here.
        if (typeof groupby !== 'undefined' && groupby.length > 0) {
          if (
            groupby !== 'author' &&
            groupby !== 'genres' &&
            groupby !== 'year' &&
            groupby !== 'country' &&
            groupby !== 'language'
          ) {
            return res.status(406).send({
              status: 406,
              ok: false,
              message: 'Group by not available.'
            })
          }

          // if exists, groupby grouped by lodash
          const data = _.chain(re)
            .groupBy(groupby)
            .map((value, key) => ({
              [groupby]: key,
              books: value
            }))
          return res.status(200).send({ status: 200, ok: true, data: data })
        }

        return res.status(200).send({ status: 200, ok: true, data: re })
      }
    )
  },
  async getGenres (req, res) {
    Book.find({}).select('genres').then((re) => {
      const genres = []
      let u = 0
      while (re.length > u) {
        let i = 0
        while (re[u].genres.length > i) {
          genres.push(re[u].genres[i])
          i++
        }
        u++
      }
      return res.status(200).send({ status: 200, ok: true, data: _.uniq(genres) })
    }).catch(er => {
      return res.status(400).send({
        status: 400,
        ok: false,
        message: 'An unexpected error occured.'
      })
    })
  },
  async getCountries (req, res) {
    Book.find({}).select('country').then((re) => {
      const countries = []
      let u = 0
      while (re.length > u) {
        countries.push(re[u].country)
        u++
      }
      return res.status(200).send({ status: 200, ok: true, data: _.uniq(countries) })
    }).catch(er => {
      return res.status(400).send({
        status: 400,
        ok: false,
        message: 'An unexpected error occured.'
      })
    })
  }
}
