# Getting Started

Сперва нужно запустить систему управления контентом для. Это нужно зайти в папку cms и выполнить команду:

```shell
yarn dev
```

Затем в этой же папке нужно запустить докер контейнер с поиском миллисерч (masterkey cгенерировать или смотреть в .env):

```shell
docker run -it --rm -p 7700:7700 getmeili/meilisearch:latest meilisearch --master-key=...masterKey...
```

Затем можно запустить фронтенд. Зайдя в папку web:

```bash
pnpm dev
```

Открыть [http://localhost:3000](http://localhost:3000) со своего браузера.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!
