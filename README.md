# Code Challenge: MyHashCash

This is a simplified version of the hashcash proof-of-work algorithm that is served as an HTTP API.

## Prerequisites

### Minimum versions

- Node ^10.13.0

- NPM ^6.4.1

## Local Setup

Installation

```
$ git clone git@github.com:emmac1016/my-hash-cash.git
$ cd my-hash-cash && npm i
```

Running the App

```
$ npm start
```

Running Tests

```
$ npm test
```

## Endpoints

### /find

Given an arbitrary challenge ( c ) string, and a number of bits ( n ) integer, this endpoint finds the proof of work counter ( w ) where a SHA-256 digest ( d ) of the concatenation of c+w has n leading 0 bits

#### Testing

```
$ curl http://localhost:3000/find -d '{"c":"iBeat", "n":16}' -H "Content-Type: application/json"
```

**Expected Output:**

```json
{
  "w": 62073,
  "match": "iBeat62073",
  "hash": "0000d4ab4f89e8d1cd021a04151a280e4c76d487e04074a232bb0a8dec4a74cf"
}
```

### /verify

Given an arbitrary challenge ( c ) string, a number of bits ( n ) integer, and a proof of work counter ( w ), this endpoint verifies that the SHA-256 hash digest of the concatenation of c+w has n leading 0 bits

#### Testing

```
$ curl http://localhost:3000/verify -d '{"c":"iBeat", "n":16, "w":62073}' -H "Content-Type: application/json"
```

**Expected Output:**

```json
{
  "valid": true
}
```
