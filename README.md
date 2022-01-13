# [**Vorwärts**](https://vorwarts.herokuapp.com)

```json
{
	"ok": true,
	"data": [
		{
			"author": "Johann Wolfgang von Goethe",
			"books": [
				{
					"downloads": [],
					"_id": "61ba1d7e24a1157ef54f1220",
					"title": "The Sorrows of Young Werther",
					"author": "Johann Wolfgang von Goethe",
					"genres": [
						"Epistolary novel"
					],
					"language": "German",
					"country": "Germany",
					"year": 1774
				}
			]
		}
	]
}
```

# **Getting into it**

## **Why?** 

Vorwärts was born to be an easy way to get books in the public domain, free of any publicity and completely transparent. The ideology of Vorwärts is to maintain the neutrality of all these books written by incredible authors and which now belong to everyone.

## **Root**

**`https://vorwartsapi.herokuapp.com`**

## **EndPoints**

- [x] /books
- [ ] /genres
- [ ] /authors
- [ ] /years...

Well, so...

### **/books**
`GET` | Books

**params**

Optional parameters

* `Title`
* `Author`
* `Year` *Year of publication. Ex.: {"year": "1984"}*
* `Country` *Stands for the country where the book was originally published. The short version of the name should be used. Ex.: {"country": "Germany"}*
* `Language` *Language originally written, the download options will usually be in the same language* 
* `Genres` *CAUTION🙃,  a slightly different field. To pass more than one gender, divide it into commas. Ex.: {"genres": "Fantasy, Children's Book"}*
* `Limit` *stands for limit of books per request. The default limit is 10*
* `Offset` *Skip the first books.*
* `Groupby` *Group books by field. Try: author, genres, year, country or language. Ex.: {"groupby": "author"}*

Required parameters

* There are no required parameters here, not even tokens or rate limits(For now, be kind and respectful).

### **Basically**

```javascript
axios.get("https://vorwartsapi.herokuapp.com/books", {
    params: {
      author: "Johann Wolfgang von Goethe",
      groupby: "author"
    }
  })
```

### **If all goes well, expect something like that**

```json
{
	"ok": true,
	"data": [
		{
			"author": "Johann Wolfgang von Goethe",
			"books": [
				{
					"downloads": [],
					"_id": "61ba1d7e24a1157ef54f1220",
					"title": "The Sorrows of Young Werther",
					"author": "Johann Wolfgang von Goethe",
					"genres": [
						"Epistolary novel"
					],
					"language": "German",
					"country": "Germany",
					"year": 1774
				}
			]
		}
	]
}
```

### **If not 😳**

The most common errors (the only ones, to be honest) that the application can respond to are

`404` This means that the application has not found any books in these specifications.

`406` This means that the group by selected attribute is not enabled.

But we responded with a nice json saying what exactly happened.

```json
{
	"ok": false,
	"message": "no book has found"
}
```

## **"But I want to help"**

* ### **"I program":**

😮‍💨 Ufa.

Just make a pull request. I don't know to manage a project. But soon as possible, I deploy it at heroku. The project follows MVC pattern. You just need to configure the dotenv file in the `/src`.

`BD_URL = `

`node src/app.js` to run 

* ### **"I don't program":**

We'll be back for you, I promise <3. Since you're on GitHub, if you know how to commit, any help with bringing new books to Vorwärts is welcome in the [library](https://github.com/vonweinkeller/vorwarts-library)  repository. Just be careful and pay attention to whether the book is in the public domain and whether there is copyright on the translation.

> Is it worth it? Everything is worth the effort<br>
> If the soul isn't small.<br>
> Who wants to pass beyond Bojador<br>
> Must first pass beyond the suffering.<br>
> God gave to the sea danger and the abyss,<br>
> But in it lies what the sky mirrored.<br>

**Fernando Pessoa, Portuguese Sea**.

## **Issues**

- [ ] All paramedics are case sensitive, which makes the request more likely to respond with no book. A solution will be implemented as soon as I discover a good one.
- [ ] Find more issues to put here.