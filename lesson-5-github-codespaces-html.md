# Урок 5: HTML на Pages + FastAPI в Codespace

Пошаговый урок для детей. Ты свяжешь **страницу на GitHub Pages** (фронт) с **сервером FastAPI в Codespace** (бэкенд). Страница спросит сервер через **`fetch`** и покажет ответ.

**HTML-справочник:** [fastapi-html-handbook.html](https://nesrv.github.io/git-pages-for-kids/fastapi-html-handbook.html)  
**Демо-страница (практика):** [fastapi-html-demo.html](https://nesrv.github.io/git-pages-for-kids/fastapi-html-demo.html)

Нужен пройденный [урок 4](lesson-4-github-codespaces.md): Codespace открыт, `uvicorn` запущен.

---

## Шаг 0. Две «половинки» одного приложения

| Часть | Где живёт | Что делает |
|-------|-----------|------------|
| **HTML + JavaScript** | GitHub Pages | Кнопки, текст, запрос к серверу |
| **FastAPI** | GitHub Codespace | Отвечает JSON, например `{"hello": "Маша"}` |

Страница открывается по адресу `https://ник.github.io/...`, а API — по адресу Codespace: `https://xxxx-8000.app.github.dev`.

Браузер **сам** соединяет их, если сервер разрешил запросы с твоего сайта (**CORS**).

---

## Шаг 1. Запусти API (как в уроке 4)

В Codespace:

```bash
cd codespaces-fastapi
python3 -m pip install -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

Скопируй **публичный URL** порта 8000 (без `/docs`), например:

```text
https://твой-код-8000.app.github.dev
```

Проверь в браузере: `.../hello?name=Тест` — должен быть JSON.

---

## Шаг 2. Разреши запросы с GitHub Pages (CORS)

Открой `codespaces-fastapi/main.py`. В проекте уже добавлен **CORS** — блок с `CORSMiddleware`. Если пишешь с нуля, добавь после создания `app`:

```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["GET"],
    allow_headers=["*"],
)
```

Для учебного проекта `*` проще всего. На «взрослых» проектах указывают точный адрес сайта.

Сохрани файл — с `--reload` сервер перезапустится.

---

## Шаг 3. Открой демо-страницу на Pages

1. Закоммить и запушь репозиторий (если ещё не на GitHub).
2. Открой [fastapi-html-demo.html](fastapi-html-demo.html) на Pages:  
   `https://nesrv.github.io/git-pages-for-kids/fastapi-html-demo.html`
3. Вставь **URL API** из Codespace (шаг 1).
4. Введи имя и нажми **«Спросить сервер»**.

Если всё верно, увидишь ответ сервера на странице.

---

## Шаг 4. Как это работает в коде страницы

Главная идея в JavaScript:

```javascript
const base = "https://твой-код-8000.app.github.dev";
const name = "Маша";
const url = `${base}/hello?name=${encodeURIComponent(name)}`;

const response = await fetch(url);
const data = await response.json();
console.log(data.hello);
```

- `fetch` — «позвони серверу по сети».
- `encodeURIComponent` — безопасно вставить имя в URL.
- `response.json()` — разобрать ответ FastAPI.

Полный пример — в файле [fastapi-html-demo.html](fastapi-html-demo.html).

---

## Шаг 5. Своя простая страница

1. Создай `my-api-page.html` в репозитории.
2. Скопируй разметку и скрипт из демо (или напиши свою кнопку + `fetch`).
3. После push открой: `https://ник.github.io/репозиторий/my-api-page.html`.

**Важно:** пока Codespace **выключен**, API не отвечает — страница на Pages останется, но запрос упадёт с ошибкой. Для показа сначала запусти `uvicorn`.

---

## Частые проблемы

| Проблема | Решение |
|----------|---------|
| Ошибка CORS в консоли (F12) | Проверь `CORSMiddleware` в `main.py`, перезапусти uvicorn |
| Failed to fetch | Codespace спит? Запущен uvicorn? URL без лишнего `/docs`? |
| 404 на /hello | Адрес должен заканчиваться доменом Codespace, путь `/hello` добавляет скрипт |
| Страница старая | Обнови с Ctrl+F5; подожди деплой Pages после push |

---

## Чеклист

- [ ] FastAPI работает в Codespace, `/hello` открывается в браузере  
- [ ] В `main.py` включён CORS  
- [ ] Открыл `fastapi-html-demo.html` на GitHub Pages  
- [ ] Вставил URL API и получил приветствие на странице  
- [ ] Понял: Pages = витрина, Codespace = сервер за кулисами  

---

## Итог

Ты собрал **мини-fullstack**: HTML на **Pages**, логика ответа в **FastAPI** в **Codespace**. Дальше можно менять дизайн страницы и добавлять новые `@app.get` — и вызывать их из `fetch`.

Цепочка уроков: Git (1) → Pages (3) → API в Codespace (4) → связка HTML + API (5).
