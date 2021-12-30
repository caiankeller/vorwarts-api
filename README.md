[<h1>**Vorwärts**</h1>](https://vorwarts.herokuapp.com)

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

<h2>Endpoints</h2>

 **https://vorwartsapi.herokuapp.com/books**

At time, just books are avaliable for data fetching. In the future, these other will be implemented.

- [x] /books
- [ ] /genres
- [ ] /authors
- [ ] /years...

<h2>Getting in the /books</h2>
<h3>Options</h3>

- title
    - string
- author
    - string
- year"
    - number //origin year publishmment ex.: '1984'
- country
    - string //stands for country of origin from book
- language
    - string //language originally written
- genres(not supported yet)
    - array //ex.: ['adventure', 'childrens book'] 
- limit
    - number //stands for limit of books per request
- offset
    - number //skip the firsts books
- groupby
    - string //group books by a field, like author, genres, year, country or language

<h2>Basically...</h2>

```javascript
axios.get("https://vorwartsapi.herokuapp.com/books", {
    params: {
      author: "Carlo Collodi",
      groupby: "author"
    }
  })
```

<h2>Structure</h2>
The structure follow the MVC pattern. It's needed to configure dotenv file with the BD_URL parameter: 

```
BD_URL= [...]
````