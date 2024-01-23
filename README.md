# TekkenFramedataAPI

This is a work in progress API made specifically for my [TekkenFramedataBot](https://github.com/FrostemanNeogard/TekkenFramedataBot).

# Endpoints

## GET /character-code/{characterName}

This endpoint returns a corrected character name as a string based on the provided `characterName` parameter.

## GET /tekken7/{characterCode}

Retrieve detailed framedata for a given character in the form of an entire JSON document. Ensure the character is in the correct format, which can be validated using the `/character-code` endpoint.

## POST /tekken7/{characterCode}

This endpoint provides framedata for any given attack of the given character.

### Request

#### Headers

- Content-Type: application/json

#### Body

```
{
  input: "d/f+2"
}
```


