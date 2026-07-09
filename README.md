# movie-nomination-analyzer
Load a CSV nomination list and analyze it

## Quickstart

**1. Install**

```shell
npm install
```

**2. Run**

Uses Node.js built in in-memory sqlite which is created on start

```shell
npm start
```

**3. API**

Curl to get winning intervals

```shell
curl --request GET \
  --url http://localhost:3000/winning-intervals \
```

Curl to get all parserd rows from CSV

```shell
curl --request GET \
  --url http://localhost:3000/csv-data \
```

**Integration tests**

```shell
npm run test
```