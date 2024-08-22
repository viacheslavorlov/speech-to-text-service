# Getting Started

Затем в этой же папке нужно запустить докер контейнер с поиском миллисерч (masterkey cгенерировать или смотреть в .env):

## Генерация ключа и запуск milisearch

```shell
 sudo docker run -it --rm -p 7700:7700 getmeili/meilisearch:latest meilisearch
```

```shell
sudo docker run -d --restart always -p 7700:7700 getmeili/meilisearch:latest meilisearch --master-key=...masterKey...
```

Затем нужно добавить мастер ключ в переменные .env в папке cms. И этот же ключ добавить в пименные .env в папке web.
Запустить strapi, зайти в папку cms и выполнить команду:

```shell
yarn build && yarn dev
```

и добавить коллекцию notes в milisearch plugin

Затем можно запустить фронтенд. Зайдя в папку web:

```bash
pnpm build && pnpm dev
```

## Process manager

Для запуска скриптовых, чтобы они работали после выключения консоли, нужно использовать ход смены и команду такого вида:

```shell
pm2 start pnpm --name "speach-totext-WEB" -- start
```

Проверить работоспособность процесс менеджера можно командой:

```shell
pm2 status
```

Остановка и запуск одного из процессов осуществляется командой.

```shell
pm2 <stop/start> <номер или название процесса>
```

## Fastpanel

Если деплой осуществляется с помощью `Fastpanel` то запущенные процессы привязываются к адресам через обратный прокси.

Открыть [http://localhost:3000](http://localhost:3000) со своего браузера.
