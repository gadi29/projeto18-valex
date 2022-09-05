# projeto18-valex
A Typescript designed project to manage benefit cards among companies and employees.


<p align="center">
  <img  src="https://cdn.iconscout.com/icon/free/png-256/credit-card-2650080-2196542.png">
</p>
<h1 align="center">
  Valex
</h1>
<div align="center">

  <h3>Built With</h3>

  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" height="30px"/>  
  <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express.js&logoColor=white" height="30px"/>
  <!-- Badges source: https://dev.to/envoy_/150-badges-for-github-pnk -->
</div>

<br/>

# Description

Valex simulates an API that manages a benefit card, generally made available by companies to their employees.

</br>

## Features

-   Get the card balance and transactions
-   Create cards
-   Activate / Block / Unblock a card
-   Recharge a card
-   Make card payments with online payment option

</br>

## API Reference

### Create a card

```http
POST /card
```

#### Request:

| Body         | Type     | Description                              |
| :------------| :------- | :--------------------------------------- |
| `employeeId` | `integer`| **Required**. user Id                    |
| `isVirtual`  | `boolean`| **Required**. if card is virtual or not  |
| `type`       | `string` | **Required**. type of card benefit       |

`Valid types: [groceries, restaurant, transport, education, health]`

####

| Headers     | Type     | Description           |
| :---------- | :------- | :-------------------- |
| `apikey` | `string` | **Required**. api key |

####

</br>

#### Response:

```json
{
  "cardholderName": "NAME N NAME",
  "number": "1111-1111-1111-1111",
  "expirationDate": "MM/YY",
  "securityCode": "111",
  "type": "card type",
  "isVirtual": false
}
```

#

### Activate a card

```http
PUT /card/activate/${cardId}
```

#### Request:

| Params      | Type      | Description           |
| :---------- | :-------- | :-------------------- |
| `cardId` | `integer` | **Required**. card Id |

###

| Body             | Type     | Description                        |
| :--------------- | :------- | :--------------------------------- |
| `password`       | `string` | **Required**. card password        |
| `securityCode`   | `string` | **Required**. card cvv             |

`Password length: 4`

`Password pattern: only numbers`

###

</br>

#### Response:

```
Cartão ativado com sucesso!
```

#

### Get card informations

```http
GET /card/${cardId}
```

#### Request:

| Params      | Type      | Description           |
| :---------- | :-------- | :-------------------- |
| `cardId` | `integer` | **Required**. card Id |

###

| Body             | Type     | Description                        |
| :--------------- | :------- | :--------------------------------- |
| `password`       | `string` | **Required**. card password        |

####

</br>

#### Response:

```json
  {
    "number": "1111-1111-1111-1111",
    "cardholderName": "NAME N NAME",
    "expirationDate": "MM/YY",
    "securityCode": "111",
    "cardSituation": "blocked/unblocked"
  }
```

#

### Get card balance

```http
GET /card/balance/${cardId}
```

#### Request:

| Params      | Type      | Description           |
| :---------- | :-------- | :-------------------- |
| `cardId` | `integer` | **Required**. card Id |

###

</br>

#### Response:

```json
  {
    "balance": 1000,
    "transactions": [
      { "id": 1, "cardId": 1, "businessId": 1, "businessName": "BUSINESS", "timestamp": "01/01/2022", "amount": 1000 }
    ]
    "recharges": [
      { "id": 1, "cardId": 1, "timestamp": "01/01/2022", "amount": 2000 }
    ]
  }
```

#

### Block a card

```http
PUT /card/block/${cardId}
```

#### Request:

| Params      | Type      | Description           |
| :---------- | :-------- | :-------------------- |
| `cardId` | `integer` | **Required**. card Id |

###

| Body             | Type     | Description                        |
| :--------------- | :------- | :--------------------------------- |
| `password`       | `string` | **Required**. card password        |

###

</br>

#### Response:

```
Cartão bloqueado com sucesso!
```

#

### Unblock a card

```http
PUT /card/unblock/${cardId}
```

#### Request:

| Params      | Type      | Description           |
| :---------- | :-------- | :-------------------- |
| `cardId` | `integer` | **Required**. card Id |

###

| Body             | Type     | Description                        |
| :--------------- | :------- | :--------------------------------- |
| `password`       | `string` | **Required**. card password        |

###

</br>

#### Response:

```
Cartão desbloqueado com sucesso!
```

#

### Recharge a card

```http
POST /recharge/${cardId}
```

#### Request:

| Headers     | Type     | Description           |
| :---------- | :------- | :-------------------- |
| `apikey` | `string` | **Required**. api key |

####

| Params      | Type      | Description           |
| :---------- | :-------- | :-------------------- |
| `cardId` | `integer` | **Required**. card Id |

###

| Body             | Type      | Description                        |
| :--------------- | :-------- | :--------------------------------- |
| `amount`         | `integer` | **Required**. recharge amount      |

###

</br>

#### Response:

```
Cartão recarregado com sucesso!
```

#

### Card payments

```http
POST /payment/${businessId}
```
#### Request:

| Params      | Type      | Description           |
| :---------- | :-------- | :-------------------- |
| `businessId` | `integer` | **Required**. business Id |

###

| Body             | Type      | Description                        |
| :--------------- | :-------- | :--------------------------------- |
| `cardId`         | `integer` | **Required**. card Id              |
| `password`       | `string`  | **Required**. card password        |
| `amount`         | `integer` | **Required**. payment amount       |

#

```http
POST /payment/online/${businessId}
```

#### Request:

| Params       | Type      | Description               |
| :----------  | :-------- | :--------------------     |
| `businessId` | `integer` | **Required**. business Id |

###

| Body             | Type      | Description                        |
| :--------------- | :-------- | :--------------------------------- |
| `number`         | `string`  | **Required**. card number          |
| `cardholderName` | `string`  | **Required**. name in card         |
| `expirationDate` | `string`  | **Required**. card expiration date |
| `securityCode`   | `string`  | **Required**. card CVV             |
| `amount`         | `integer` | **Required**. payment amount       |

`Expiration Date Format: "MM/YY"`

#

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DATABASE_URL = postgres://UserName:Password@Hostname:5432/DatabaseName`

`PORT = number #recommended:5000`

`SECRET = any key to encrypt/decrypt CVV card number`

</br>

## Run Locally

Clone the project

```bash
  git clone https://github.com/gadi29/projeto18-valex
```

Go to the project directory

```bash
  cd projeto18-valex/
```

Install dependencies

```bash
  npm install
```

Create database

```bash
  cd src/db/dbConfig
```
```bash
  bash ./create-database
```
```bash
  cd ../../..
```

Start the server

```bash
  npm run start
```

</br>

## Lessons Learned

In this project I learned a lot about how to structure an API with TypeScript

</br>

## Acknowledgements

-   [Awesome Badges](https://github.com/Envoy-VC/awesome-badges)

</br>

## Authors

-   Gadiel Azevedo.
<br/>

#