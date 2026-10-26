# Текущее состояние проекта

<!-- STATE_JSON_BEGIN -->
```json
{
  "schema_version": 1,
  "repository": "astsaryov-beep/bacrf-finance-trainer",
  "working_version": "5.0.27 beta",
  "stable_version": "5.0.8",
  "stable_path": "v5.0.8/index.html",
  "stable_blob_sha": "2b77ae8f74be9433af3c458c3be55314d2cc9519",
  "phase": "IN_PROGRESS",
  "active_task": "T-02",
  "next_task": "T-01",
  "last_verified_checkpoint": "CP-20261026-019",
  "last_verified_commit": "153322a2616f2274091088b7f8b059927aed4111",
  "last_verified_ci_run": "https://github.com/astsaryov-beep/bacrf-finance-trainer/actions/runs/40299760408",
  "last_verified_deployment_run": "https://github.com/astsaryov-beep/bacrf-finance-trainer/actions/runs/40299760314",
  "last_verified_status": "VERIFIED",
  "state_updated_on": "2026-10-26"
}
```
<!-- STATE_JSON_END -->

## Опубликованная основа ·5.0.26 beta VERIFIED

PR37, commit153322a2616f2274091088b7f8b059927aed4111. PR CI40299130642, main CI40299760408 и Pages40299760314 SUCCESS. Live совпадает с исходниками. CP-20261026-019.

## Рабочий выпуск ·5.0.27 beta · PENDING

T-02 содержательно DONE96/96. Все ранее сохранённые правки сохранены; несогласованность версии устранена сравнением HTML с каноническим working_version вместо второго ручного номера. Изменённые слои полной/краткой теории синхронизированы. 96 решений и отпечатков: COURSE_METHOD_REVIEW.json; подробный отчёт COURSE_METHOD_REVIEW_20261026.md.

Локально PASS: project-state-check, release-check, content-dedup-check, learning-review-check, strategies-check, methodical-review-check. CI/browser/Pages нового выпуска PENDING до фактического результата. Следующий шаг — PR и регрессия; после merge проверить Pages/live.

## Остальные задачи и ограничения

T-01 PARTIAL: полная академическая сверка 557 слайдов отдельно. T-04 основного банка, T-05 редакционно, T-12 дедупликация DONE. T-06 самый низкий приоритет, только по отдельной команде. T-07 снятиеbeta требует содержательной приёмки пользователем. Новую функциональность экзамена не менять; D-012 сохраняется. Исходные 275/19,84 формулы,309 назначений, подготовка и 5.0.8 неизменны.

История состояния сохранена в docs/PRE_5027_PROJECT_STATE.md и CHECKPOINTS.md.
