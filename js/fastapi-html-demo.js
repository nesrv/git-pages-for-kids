(function () {
  const urlInput = document.getElementById("api-url");
  const nameInput = document.getElementById("name");
  const btn = document.getElementById("ask-btn");
  const result = document.getElementById("result");

  const STORAGE_KEY = "lesson5-api-base";

  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved && urlInput) urlInput.value = saved;

  function normalizeBase(raw) {
    return raw.trim().replace(/\/+$/, "");
  }

  btn?.addEventListener("click", async () => {
    const base = normalizeBase(urlInput?.value || "");
    const name = (nameInput?.value || "друг").trim();

    if (!base) {
      result.textContent = "Вставь URL API из Codespace (вкладка Ports → 8000).";
      result.className = "demo-result error";
      return;
    }

    try {
      localStorage.setItem(STORAGE_KEY, base);
    } catch {
      /* ignore */
    }

    const endpoint = `${base}/hello?name=${encodeURIComponent(name)}`;
    result.textContent = "Запрашиваю…";
    result.className = "demo-result loading";

    try {
      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      const data = await response.json();
      const hello = data.hello ?? JSON.stringify(data);
      result.textContent = `Сервер ответил: «${hello}»`;
      result.className = "demo-result ok";
    } catch (err) {
      result.textContent =
        "Не получилось связаться с API. Запущен uvicorn? В main.py есть CORS? URL верный? (" +
        (err.message || "ошибка") +
        ")";
      result.className = "demo-result error";
    }
  });
})();
