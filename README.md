# projeto18-valex

# Rotas de criação e gerenciamento de cartões:

## Rota <span style="color:yellow"> **POST** </span>/card

Essa é uma rota autenticada com um header http do tipo "x-api-key". Sua função é criar novos cartões para os funcionários.

O Body da requisição deve ser feito no seguinte formato:

```json
{
  "employeeId": id_do_funcionario, //number
  "isVirtual": true/false, //boolean
  "type": "tipo_do_cartão" //string, pode ser dos seguintes tipos: groceries, restaurant, transport, education, health
}
```

## Rota <span style="color:orange"> **PUT** </span>/card/activate/:id

Essa é uma rota não autenticada. Sua função é ativar os cartões criados.

O "id" passado na rota é o id do cartão a ser ativado.

O Body da requisição deve ser feito no seguinte formato:

```json
{
  "securityCode": "cvc_do_cartao", //string
  "password": "senha_escolhida" //string
}
```

## Rota <span style="color:green"> **GET** </span>/card/:id

Essa é uma rota não autenticada. Sua função é mostrar as informações do cartão.

O "id" passado na rota é o id do cartão de que se deseja as informações.

O Body da requisição deve ser feito no seguinte formato:

```json
{
  "password": "senha_do_cartao" //string
}
```

## Rota <span style="color:green"> **GET** </span>/card/balance/:id

Essa é uma rota não autenticada. Sua função é verificar o extrato dos cartões.

O "id" passado na rota é o id do cartão de que se deseja o extrato.

A resposta da requisição virá no seguinte formato:

```json
"balance": 35000,
  "transactions": [
		{ "id": 1, "cardId": 1, "businessId": 1, "businessName": "DrivenEats", "timestamp": "22/01/2022", "amount": 5000 }
	]
  "recharges": [
		{ "id": 1, "cardId": 1, "timestamp": "21/01/2022", "amount": 40000 }
	]
```

## Rotas <span style="color:orange"> **PUT** </span>/card/block/:id e /card/unblock/:id

Rotas não autenticadas, possuem o mesmo funcionamento, tem o intuíto de bloquear e desbloquear um determinado cartão, respectivamente.

O "id" passado na rota é o id do cartão que se deseja bloquear/desbloquear.

O Body da requisição deve ser feito no seguinte formato:

```json
{
  "password": "senha_do_cartao" //string
}
```

# Rotas de recarga e compra:

## Rota <span style="color:yellow"> **POST** </span>/recharge/:id

Essa é uma rota autenticada com um header http do tipo "x-api-key". Sua função é recarregar os cartões para os funcionários.

O Body da requisição deve ser feito no seguinte formato:

```json
{
  "amount": "valor_recarga" //number
}
```

## Rota <span style="color:yellow"> **POST** </span>/payment/:businessId

Essa é uma rota não autenticada. Sua função é permitir aos funcionários fazerem compras em estabelecimentos **do mesmo tipo** dos seus cartões.

O Body da requisição deve ser feito no seguinte formato:

```json
{
  "cardId": "id_do_cartão", //number
  "password": "senha_do_cartão", //string
  "amount": "valor_da_compra" //number
}
```

## Rota <span style="color:yellow"> **POST** </span>/payment/online/:businessId

Essa é uma rota não autenticada. Sua função é permitir aos funcionários fazerem compras online em estabelecimentos **do mesmo tipo** dos seus cartões.

O Body da requisição deve ser feito no seguinte formato:

```json
{
  "number": "numero_do_cartão", //string
  "cardholderName": "nome_do_funcionario", //string, deve ser exatamente como está no cartão
  "expirationDate": "data_de_expiracao", //string, está no formato MM/YY
  "securityCode": "cvc_do_cartao", //string,
  "amount": "valor_da_compra" //number
}
```