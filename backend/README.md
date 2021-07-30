
#Safar Travels

It is a travelling app, where people can create their account and they can book a ride for them and their friends,
anyone who wishes to be a part of safar travels as an travel agent.



## API Reference

#### create an user account

```http
  POST /api/users/user/signup
```

| Parameters | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email`| `string` | **Required**
| `name`     | `string` | **Required** |
| `password` | `string` | **Required** |
| `confirm password` |`string`| **required** |


#### log in with user account

```http
  POST /api/users/user/login
```

| Parameters | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email`| `string` | **Required**
| `password` | `string` | **Required** |

#### searching a bus

```http
  GET /api/buses/GetBuses
```

| Parameters | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `to`| `string` | **Required**
| `from`     | `string` | **Required** |
| `busType` | `string` | **Not Required** |
| `seatCategory` |`string`| **Not required** | 


#### getting a bus by bus id


```http
  GET /api/buses/bus
```

| Parameters | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `BusId`| `string` | **Required**









  
## Authors

- [@deepaksharma](https://www.github.com/https://github.com/deepaksharma9dev)

  
## Cloning my project

Installing my project

```bash
  git clone https://github.com/deepaksharma9dev/Safar_Travels.git
```

## Required Dependencies

```bash
  installing express
  
  npm install express --save

```


    