# Текущее состояние проекта

<!-- STATE_JSON_BEGIN -->
```json
{
  "schema_version": 1,
  "repository": "astsaryov-beep/bacrf-finance-trainer",
  "working_version": "6.0",
  "stable_version": "5.0.8",
  "stable_path": "v5.0.8/index.html",
  "stable_blob_sha": "2b77ae8f74be9433af3c458c3be55314d2cc9519",
  "phase": "READY",
  "active_task": null,
  "next_task": "T-23",
  "last_verified_checkpoint": "CP-20261028-134",
  "last_verified_commit": "8518180b9d0ce1da6a6f4a40c4ee94f6d3f84bdc",
  "last_verified_ci_run": "https://github.com/astsaryov-beep/bacrf-finance-trainer/actions/runs/40593953771",
  "last_verified_deployment_run": "https://github.com/astsaryov-beep/bacrf-finance-trainer/actions/runs/40594826214",
  "last_verified_status": "VERIFIED",
  "state_updated_on": "2026-10-28",
  "current_release": "6.0",
  "release_channel": "stable"
}
```
<!-- STATE_JSON_END -->

**6.0 VERIFIED · без beta. T-22 и T-07 завершены.**

[PR69](https://github.com/astsaryov-beep/bacrf-finance-trainer/pull/69), продукт `8518180b9d0ce1da6a6f4a40c4ee94f6d3f84bdc`. [Полный CI](https://github.com/astsaryov-beep/bacrf-finance-trainer/actions/runs/40593953771) и [Pages](https://github.com/astsaryov-beep/bacrf-finance-trainer/actions/runs/40594826214) — SUCCESS. Дерево приложения после merge совпадает с проверенным PR. HTTP-сверка подтвердила совпадение 14 публичных файлов: приложения, 11 ресурсов, выбора версии и замороженная 5.0.8.

26 локальных и 11 браузерных программ PASS; self-test области CI также PASS. Новый визуальный аудит: 310 состояний (7 вкладок на 1440/320px, 3 представления 96 блоков и схемы), без белых поверхностей, переполнения страницы и pageerror. Проверены черновики/уверенность при смене вкладки и перезагрузке, оперативный счётчик, прокрутка схем, сохранность завершённой теории и экзамен из 25 открытых и 25 заданий с множественным выбором. Основные данные курса, ключи, ID, истории и замороженная 5.0.8 сохранены.

Снятие beta прямо разрешено пользователем (D019). Новая академическая или эмпирическая приёмка не заявляется. Поле `stable_version=5.0.8` сохраняет исторический замороженный снимок; актуальный выпуск задают `current_release` / `working_version` (6.0). T-23 ожидает только новой обратной связи, обязательных незавершённых работ текущего запроса нет.

[Контекст](CHAT_HANDOFF.md) · [План](ROADMAP.md) · [Проверка выпуска](../audits/UI_RELEASE_6.md) · [QA](../audits/QA_REPORT.md).
