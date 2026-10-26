# Текущее состояние проекта

<!-- STATE_JSON_BEGIN -->
```json
{
  "schema_version": 1,
  "repository": "astsaryov-beep/bacrf-finance-trainer",
  "working_version": "5.0.25 beta",
  "stable_version": "5.0.8",
  "stable_path": "v5.0.8/index.html",
  "stable_blob_sha": "2b77ae8f74be9433af3c458c3be55314d2cc9519",
  "phase": "IN_PROGRESS",
  "active_task": "T-02",
  "next_task": "T-02",
  "last_verified_checkpoint": "CP-20261026-005",
  "last_verified_commit": "eaccf834641781c60142e13713fd73dfe5c34af1",
  "last_verified_ci_run": "https://github.com/astsaryov-beep/bacrf-finance-trainer/actions/runs/40244609542",
  "last_verified_deployment_run": "https://github.com/astsaryov-beep/bacrf-finance-trainer/actions/runs/40244609105",
  "last_verified_status": "VERIFIED",
  "state_updated_on": "2026-10-26"
}
```
<!-- STATE_JSON_END -->

## 5.0.25 beta · IN_PROGRESS / публикация PENDING

Ветка content/remaining-content-20261026, основа main 0d46d109. Подготовлены:

- T-02: полная методическая редактура 20/96, предметные самопроверки с раскрываемыми разборами 96/96. Следующий пакет S2-01-0.
- T-05: редакторский аудит 419 уникальных заданий; исправления ключа IPO, неоднозначностей, 15 пояснений S3 и восьми ошибочно сопоставленных самостоятельных упражнений. Исходный BANK 275/19 сохранён.
- T-04: диагностика и проверка другим заданием для 275 ID основного банка, критерий двух разных ответов после известной ошибки; история и совместимость экспорта.
- T-01: закрыт прежний пропуск S1 41–47 по чтению и сопоставлению, внесены оговорки к найденным ошибкам источников. Полная сверка 557 страниц остаётся PARTIAL, инвентаризация не равна верификации.
- T-12: дедупликация завершена в 5.0.24; обоснованные учебные повторы сохранены. Дополнительные 96 самопроверок завершают её критерий самостоятельной проверки понимания.

Локально PASS: project-state, release, content-dedup, learning-review, strategies. Новая браузерная проверка 96 самопроверок, исправлений ключа и миграции подготовлена; CI/Pages ещё PENDING.

## Последний подтверждённый продукт

5.0.24 beta, PR #33 MERGED; eaccf834641781c60142e13713fd73dfe5c34af1. Последний документационный main 0d46d109, CI 40244871625 / Pages 40244871194 SUCCESS. Live blob cc974157800bf64a1ede88dab1c00266bcffdc34. Замороженная 5.0.8 неизменна.

## Ограничения и следующий шаг

T-06 — самый низкий приоритет, только по отдельной команде; не запускался. T-07 остаётся до содержательной приёмки пользователя. Экзамен не фильтруется/не перебалансируется (D-012). 48 тем, 96 блоков, 275/19, 309 уникальных назначений и 84 формулы сохранены. Полные T-01/T-02 не закрыты.

Следующий шаг этой ветки — PR, зелёные проверки, merge, Pages/live; затем обновление VERIFIED checkpoint и продолжение T-02 с S2-01-0 вместе с T-01. Реестры: COURSE_METHOD_REVIEW_20261026.md, QUESTION_REVIEW_20261026.md, SOURCE_ERRATA_20261026.md. История: CHECKPOINTS.md и docs/PROJECT_STATE_HISTORY_20261026.md.
