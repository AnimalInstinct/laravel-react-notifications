# Laravel React real time notifications APP

[![wakatime](https://wakatime.com/badge/user/4e05e446-cc87-4243-b9e2-fd11ca8cab8b/project/a91fd804-882a-4190-a4c3-ce852eb5f3cc.svg)](https://wakatime.com/@AnimalInstinct/projects/shmnaimhwo?start=2024-09-10&end=2024-09-16)

## Prerequisites

php 8.2
node 21
composer

## Used

Laravel 11
MySQL
Soketi

## Installation and run locally with Sail and Docker

```bash
git clone https://github.com/AnimalInstinct/laravel-react-notifications.git
cd laravel-react-notifications/
cp .env.example .env
composer install
./vendor/bin/sail build
./vendor/bin/sail up -d
./vendor/bin/sail artisan migrate
npm i
npm run build
```

