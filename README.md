ExpressJsStuff
==============

To launch the server :

```bash
node app.js
```


To test with curl :

```bash
curl -i "http://localhost:3001/cities"
```

```bash
curl -i "http://localhost:3001/cities?search=Indigo"
```

```bash
curl -i "http://localhost:3001/cities/Indigo"
```

```
curl -i --data "name=nameValue&description=descriptionValue" "http://localhost:3001/cities"
```

```
```