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
___
`GET` | Books

**params**

Optional params:

* **Title**
* **Author**
* **Year** `Origin year of publishmment. Ex.: {"year": "1984"}`
* **Country** `Stands for country of origin from book, it must be for extensive. Ex.: {"country": "Germany"}`
* **Language** `Language originally written, download options usually'll be in the same language` 
* **Genres** `CAUTION, 🙃 a bitte differente, to pass more than one genre. Divide it in ,(Coma). Ex.: {"genres": "Fantasy, Children's Book"}`
* **Limit** `stands for limit of books per request. The default limit is 10`
* **Offset** `Skip the firsts books.`
* **Groupby** `Group books by field. Try: author, genres, year, country or language. Ex.: {"groupby": "author"}`

Required params:

* **There's no that here, neither even tokens or rate limit(For while). Be gently and respectful.**

### **Basically**

```javascript
axios.get("https://vorwartsapi.herokuapp.com/books", {
    params: {
      author: "Johann Wolfgang von Goethe",
      groupby: "author"
    }
  })
```

### **If everything gonne right, expect for something like**

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

The most commons(the onlys, to be honest) erros that the app can response is

`404` It means that hasn't found any book in the specifications.

`406` It means that the groupby selected attribute are not enable.

But we response with a beautiful json with the information

```json
{
	"ok": false,
	"message": "no book has found"
}
```

## **"But I want to help"**

* ### **"I programm":**

😮‍💨 Ufa.

Just make a pull request. I don't know to manage a project. But soon as possible, I deploy it at heroku. The project follows MVC pattern. You just need to configure the dotenv file in the `/src`.

`BD_URL = `

* ### **"I don't programm":**
We'll come back for you, I promise <3. Since you're in the GitHub, if you know to commit, any help bringing new books to Vorwaärts are welcome in the [library](https://github.com/vonweinkeller/vorwarts-library) repository. Be carefully and attends if the book is in the public domain and translations copyrights.

> Is it worth it? Everything is worth the effort
>
> If the soul isn't small.
>
> Who wants to pass beyond Bojador
>
> Must first pass beyond the suffering.
>
> God gave to the sea danger and the abyss,
> 
> But in it lies what the sky mirrored.


Fernando Pessoa. Portuguese Sea.