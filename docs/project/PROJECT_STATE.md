# Текущее состояние проекта

<!-- STATE_JSON_BEGIN -->
```json
{
  "schema_version": 1,
  "repository": "astsaryov-beep/bacrf-finance-trainer",
  "working_version": "6.0.2",
  "stable_version": "5.0.8",
  "stable_path": "v5.0.8/index.html",
  "stable_blob_sha": "2b77ae8f74be9433af3c458c3be55314d2cc9519",
  "phase": "IN_PROGRESS",
  "active_task": "T-25",
  "next_task": "T-25",
  "last_verified_checkpoint": "CP-20261028-136",
  "last_verified_commit": "ff1f9c0c205a7623e124c67513bb074078295305",
  "last_verified_ci_run": "https://github.com/astsaryov-beep/bacrf-finance-trainer/actions/runs/40606149502",
  "last_verified_deployment_run": "https://github.com/astsaryov-beep/bacrf-finance-trainer/actions/runs/40656987250",
  "last_verified_status": "VERIFIED",
  "state_updated_on": "2026-10-28",
  "current_release": "6.0.1",
  "release_channel": "stable"
}
```
<!-- STATE_JSON_END -->

**T-25 / 6.0.2 IN_PROGRESS.** Осторожная очистка кода; опубликованная 6.0.1 подтверждена. main `8ca9b08c3acf245b04340bd6a8c2f10e2166f58f`, CI40657300145 и Pages40657299835 SUCCESS, открытых PR нет.

Новый выпуск ещё не опубликован; сведения ниже — предыдущая проверенная точка.

[PR71](https://github.com/astsaryov-beep/bacrf-finance-trainer/pull/71), продукт `ff1f9c0c205a7623e124c67513bb074078295305`. [Полный CI](https://github.com/astsaryov-beep/bacrf-finance-trainer/actions/runs/40606149502) и [Pages](https://github.com/astsaryov-beep/bacrf-finance-trainer/actions/runs/40656987250) — SUCCESS. Дерево после merge совпадает с проверенным PR; HTTP-сверка подтвердила совпадение 16 публичных файлов.

27 локальных и 12 браузерных программ PASS; проверка области CI также PASS. Все 513 вопросов тренировки имеют явные ссылки; общая карта содержит 553 ID, включая 40 дополнительных учебных вопросов. В 41 записи есть несколько блоков. Подтверждены сохранение вариантов, текста и уверенности, чтение завершённого блока без сброса, перезагрузка и возврат, адресное пояснение NIM, возврат к выбранной итоговой карточке и запрет подсказок в активном экзамене.

Исходные вопросы/ключи, семь основных констант содержания, назначения, ID, истории и frozen5.0.8 сохранены. Для самостоятельного EXN-R01 добавлено отдельное редакционное пояснение NIM; 135 основных карточек формул не менялись. Новая академическая приёмка 96 блоков не заявляется. `stable_version=5.0.8` обозначает исторический замороженный снимок; актуальный выпуск — 6.0.1. Обязательных незавершённых работ текущего запроса нет; T-23 ждёт новой обратной связи.

[Контекст](CHAT_HANDOFF.md) · [План](ROADMAP.md) · [Отчёт](../audits/QUESTION_THEORY_LINK_REVIEW.md) · [QA](../audits/QA_REPORT.md).
