# Api для дипломного проекта курса «Веб-разработчик» от «Яндекс Практикум»

Бэкенд проекта movies-explorer, включающий возможности: авторизации и регистрации пользователей, операции с фильмами и пользователями.

## Ссылки на проект

[Backend](http://movies.api.sdlmdev.site/)

## Роуты

<table>
  <thead>
    <tr>
      <th>Запрос</th>
      <th>Роут</th>
      <th>Описание</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>POST</td>
      <td>/signup</td>
      <td>Создаёт пользователя с переданными в теле данными</td>
    </tr>
    <tr>
      <td>POST</td>
      <td>/signin</td>
      <td>Возвращает JWT, если в теле запроса переданы правильные почта и пароль</td>
    </tr>
    <tr>
      <td>GET</td>
      <td>/users/me</td>
      <td>Возвращает информацию о пользователе (email и имя)</td>
    </tr>
    <tr>
      <td>PATCH</td>
      <td>/users/me</td>
      <td>Обновляет информацию о пользователе</td>
    </tr>
    <tr>
      <td>POST</td>
      <td>/movies</td>
      <td>Создаёт фильм с переданными в теле данными</td>
    </tr>
    <tr>
      <td>GET</td>
      <td>/movies</td>
      <td>Возвращает все сохранённые пользователем фильмы</td>
    </tr>
    <tr>
      <td>DELETE</td>
      <td>/movies/_id</td>
      <td>Удаляет сохранённый пользователем фильм по _id</td>
    </tr>
  </tbody>
</table>

### Запуск проекта

* Клонировать репозиторий: `git clone https://github.com/sdlmdev/movies-explorer-api`
* Установить зависимости: `npm install`
* `npm run start` — запускает сервер
* `npm run dev` — запускает сервер с hot-reload
