# Текущее состояние проекта

<!-- STATE_JSON_BEGIN -->
```json
{
  "schema_version": 1,
  "repository": "astsaryov-beep/bacrf-finance-trainer",
  "working_version": "5.0.45 beta",
  "stable_version": "5.0.8",
  "stable_path": "v5.0.8/index.html",
  "stable_blob_sha": "2b77ae8f74be9433af3c458c3be55314d2cc9519",
  "phase": "IN_PROGRESS",
  "active_task": "T-20",
  "next_task": "T-21",
  "last_verified_checkpoint": "CP-20261027-127",
  "last_verified_commit": "8557474a9e211c3d545f605193d45f58bb8cb69e",
  "last_verified_ci_run": "https://github.com/astsaryov-beep/bacrf-finance-trainer/actions/runs/40547525625",
  "last_verified_deployment_run": "https://github.com/astsaryov-beep/bacrf-finance-trainer/actions/runs/40547525526",
  "last_verified_status": "VERIFIED",
  "state_updated_on": "2026-10-27"
}
```
<!-- STATE_JSON_END -->

**T-19 завершена: 96/96 основных блоков и все дополнительные учебные слои проверены. 5.0.44 beta опубликована и проверена.** Известных незакрытых существенных дефектов в согласованном объёме не осталось. Полезные повторы сохранены, пересказы без новой учебной роли сокращены.

Продукт `8557474a9e211c3d545f605193d45f58bb8cb69e`: [PR63](https://github.com/astsaryov-beep/bacrf-finance-trainer/pull/63) MERGED, [PR CI](https://github.com/astsaryov-beep/bacrf-finance-trainer/actions/runs/40545368090), [main CI](https://github.com/astsaryov-beep/bacrf-finance-trainer/actions/runs/40547525625) и [Pages](https://github.com/astsaryov-beep/bacrf-finance-trainer/actions/runs/40547525526) SUCCESS. Опубликованные файлы побайтно совпали с деревом продукта; frozen5.0.8 сохранён. JSON и снимки артефакта12754041805 осмотрены.

[Итог качества](NOVICE_PATH_FINAL_REVIEW_20261027.md) · [журнал 96 блоков](NOVICE_PATH_REVIEW.md) · [контекст](CHAT_HANDOFF.md).

T-07 — отдельное принятие beta, не автозадача. T-06 — только отдельная команда. Новых незавершённых содержательных задач нет.

T-20 IN_PROGRESS: навигация тренировки/экзамена, отложенные вопросы без потери черновика, чтение завершённой теории без сброса. T-21 далее: организация репозитория и чистовой README. Последний VERIFIED продукт5.0.44;5.0.45 RELEASE_PENDING.

T20: сохранение уверенности ответа проверяется отдельно при навигации без поля confidence.

T20: прокрутка охватывает также переход к аналогу/новой тренировке понятия. CI разделён на3 параллельные группы без сокращения10 сценариев; для одних документов остаются полные локальные проверки, неизвестные изменения запускают браузер.
