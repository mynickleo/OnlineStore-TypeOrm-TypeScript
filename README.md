## BACKEND с использованием TypeOrm + TypeScript ##

> Перед началом использования - прописать в терминале **yarn**

> Запуск приложения можно осуществить по команде **yarn dev**

#### Данные о подключении к Базе Данных лежат в ####
> src/data-source.ts

### Кратенько по запросам и функционалу ###

#### РЕГИСТРАЦИЯ, ЛОГИН, ПОЛЬЗОВАТЕЛИ ####
Регистрация **/register** (post запрос), **пример**:
```
{
    "firstname" : "Sonny",
    "surname" : "Crockett",
    "email" : "sonnycrockett@gmail.com",
    "password" : "12345665Test"
}
```

> Пароль хешируется и в захешированном виде отправляется в базу данных

> Пользователю выдается базовая роль - USER (Если нужно проверить функционал админа, то переключите в коде на ADMIN)

> Пользователь получает свой id, по которому может посмотреть информацию о себе через get запрос (когда войдет в аккаунт) **/users/id**

> А Админы могут посмотреть всех по get запросу **/users**

Логин **/login** (post запрос), **пример**:
```
{
    "email" : "sonnycrockett@gmail.com",
    "password" : "12345665Test"
}
```

> Пользователь получает токен, который нужно записать в Headers Authorization, после чего может пользоваться остальным функционалом

Удаление пользователя **/users** (delete запрос), **пример**:
```
{
    "userId" : "1"
}
```

#### РОЛИ ####
Роль можно посмотреть по get запросу **/roles (/roles/id)**, установить роль пользователю через **post**
```
{
    "user_id" : "12",
    "role" : "ADMIN"
}
```
Удалить *(удаляется сам каскадно, при удалении пользователя)* по **delete**
```
{
    "userId" : "1"
}
```

#### ПРОИЗВОДИТЕЛИ ####
Производителей можно посмотреть по get запросу **/makers**, создать через **post**
```
{
    "name_maker" : "happyPC"
}
```
Удалить по **delete**
```
{
    "idMaker" : "4"
}
```
поменять через **put**
```
{
    "idMaker" : "1",
    "newNameMaker" : "Lamborghini"
}
```


### ТИПЫ ТОВАРОВ ###
Типы товаров можно посмотреть по get запросу **/typesprod**, создать через post
```
{
    "name_type" : "computer"
}
```
удалить через **delete**
```
{
    "idType" : "1"
}
```
поменять через **put**
```
{
    "idType" : "1",
    "newNameType" : "cars"
}
```

### ТОВАРЫ ###
Товары можно посмотреть по get запросу **/products (/products/id)**, создать через **post**
```
{
    "name_product" : "BoxPC Super",
    "id_maker" : "1",
    "id_type" : "1",
    "price" : "1000"
}
```
удалить через **delete**
{
    "idProduct" : "1"
}
поменять через **put**
```
{
    "id_product" : "1",
    "name_product" : "BoxPC Super",
    "id_maker" : "1",
    "id_type" : "1",
    "price" : "1000"
}
```


#### КОРЗИНА ####
Корзину можно посмотреть по запросу get запросу **/basket/id**, положить товар в корзину через **post**
```
{
    "user_id" : "1",
    "product_id" : "1",
    "count_product" : "1"
}
```
удаляется через **delete**
```
{
    "idUser" : "1",
    "idProduct" : "1"
}
```
> Также корзина удаляется каскадно при удалении пользователя




#### ЗАКАЗЫ ####
> Общие заказы **(id заказа, id пользователя)** можно посмотреть по get запросу /orders/id

> Детально заказ **(id заказа, id покупателя, id товара, количество, дату)** можно посмотреть по get запросу /orders_details/id

Создать заказ можно по post запросу **(/orders)** *(из корзины товары переместятся в заказ у указанного пользователя, сама корзина очистится)*
```
{
    "idUser" : "1"
}
```
удалить по **delete**
```
{
    "idOrder" : "1"
}
```
изменить товар в заказе по **put**
```
{
    "id_order" : "1",
    "id_product" : "1",
    "count_product" : "2"
}
```
> Также заказы удалятся каскадно при удалении пользователя