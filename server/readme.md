# Сервер для распознавания речи

## Запуск

- скачать модель распознавания речи с сайта VOSK <https://alphacephei.com/vosk/models> и поместить в папку `server/model`. Выбирайте модель Да блять сука. под ваши нужды, так как они имеют разный размер и качество Транскрипции.

```shell
pnpm install
```

```shell
pnpm start
```

## Возможные проблемы

На Linux необходимо установить дополнительные пакеты.

- Установка на Ubuntu/Debian

```shell
sudo apt update
sudo apt install ffmpeg
```

- Установка на CentOS/RHEL

```bash
sudo yum install epel-release
sudo yum install ffmpeg ffmpeg-devel
```

- Установка на macOS с использованием Homebrew

```bash
brew install ffmpeg
```

- Установка на Windows

- Скачайте ffmpeg с официального сайта: FFmpeg Download
- Распакуйте архив и добавьте путь к ffmpeg.exe в переменную окружения PATH.

После установки ffmpeg, убедитесь, что он доступен в командной строке. Вы можете проверить это, выполнив команду:

```bash
ffmpeg -version
```

Если команда выводит информацию о версии ffmpeg, значит установка прошла успешно, и ваш код должен работать без ошибок.
