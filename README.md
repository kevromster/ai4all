Сервис AI4All, "Artificial Intelligence for All".

Платформа, позволяющая простым образом (без навыков программирования) применить искусственный интеллект
для анализа видеоизображения и получить нотификации в Телеграм о произошедшем событии.

Модули:

- frontend - Angular-приложение для браузера (UI-часть).
- backend - серверная часть.
- AI4AllObtainScreenshots.au3 - скрипт получения "сложных" скриншотов методом открытия страницы
в браузере и получения скриншота. Запускается в Windows-виртуалке.
- PlatformDetector - детектор объектов. Получает с сервера url'ы камер, подключается к ним и делает
скриншоты, а далее детектирует нужные объекты. Сохраняет результаты на сервер и посылает уведомления
в Telegram пользователям. Также в параллельном потоке запускаетя слушатель Telegram-бота @AI4AllBot,
генерирующий кнопки взаимодействия с сервисом.
