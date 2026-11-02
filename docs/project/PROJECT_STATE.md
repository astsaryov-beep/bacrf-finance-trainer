# Текущее состояние проекта

<!-- STATE_JSON_BEGIN -->
```json
{
  "schema_version": 1,
  "repository": "astsaryov-beep/bacrf-finance-trainer",
  "working_version": "6.2.4",
  "stable_version": "5.0.8",
  "stable_path": "v5.0.8/index.html",
  "stable_blob_sha": "2b77ae8f74be9433af3c458c3be55314d2cc9519",
  "phase": "IN_PROGRESS",
  "active_task": "T-35",
  "next_task": "T-35",
  "last_verified_checkpoint": "CP-20261102-181",
  "last_verified_commit": "d6fb5bb1d96ef612f97ce7f5bf08d6b9651ea6a5",
  "last_verified_ci_run": "https://github.com/astsaryov-beep/bacrf-finance-trainer/actions/runs/41351733406",
  "last_verified_deployment_run": "https://github.com/astsaryov-beep/bacrf-finance-trainer/actions/runs/41351733541",
  "last_verified_status": "VERIFIED",
  "state_updated_on": "2026-11-02",
  "current_release": "6.2.4",
  "release_channel": "stable",
  "last_recheck": {
    "date": "2026-11-02",
    "commit": "d6fb5bb1d96ef612f97ce7f5bf08d6b9651ea6a5",
    "local_programs": 33,
    "ci_node_programs": 33,
    "browser_programs": 13,
    "live_public_files_match": 20,
    "actual_cache_urls_match": 7,
    "main_ci": "https://github.com/astsaryov-beep/bacrf-finance-trainer/actions/runs/41351733406",
    "proof": "docs/audits/data/RELEASE_6_2_3_PROOF.json"
  },
  "last_audit": {
    "checkpoint": "CP-20261102-183",
    "date": "2026-11-02",
    "commit": "f74f1e3c3cac67347252fe03506ef512f4455992",
    "status": "COMPLETED_WITH_OPEN_FINDINGS",
    "findings": [
      "F01",
      "F02",
      "F03",
      "F04"
    ],
    "open": [
      "F01",
      "F03",
      "F04"
    ],
    "report": "docs/audits/FULL_REVIEW_20261102.md",
    "runtime_changed": false
  },
  "current_work": {
    "task": "T-35",
    "status": "IN_PROGRESS",
    "scope": [
      "F03",
      "F04"
    ],
    "F01": "OPEN_OUTSIDE_SELECTED_CHANGE",
    "report": "docs/audits/T35_PRESENTATION_FIX.md"
  },
  "next_task_policy": "AUDIT_COMPLETE_REMEDIATION_PLANNED_T06_STILL_REQUIRES_SEPARATE_COMMAND"
}
```
<!-- STATE_JSON_END -->

**6.2.3 технически проверена. Новый аудит T-34 выявил открытые F01/F03/F04; полное соответствие ТЗ без оговорок не подтверждается.**

Опубликованный код: `d6fb5bb1d96ef612f97ce7f5bf08d6b9651ea6a5` (PR98). Последний PR CI41351059194, main CI41351733406 и Pages41351733541 — SUCCESS. После восстановления среды 02.11.2026 повторно прошли все 33 локальные программы. В PR и main прошли 13 браузерных программ; совпали 20 файлов сайта и семь фактических URL ресурсов.

P1: проверены 249 MC / 1245 утверждений; сохранены 207 карточек, изменены 42 (34 исправления типографики, пять улучшений дистракторов/кейсов и три уточнения условий). Категорических ошибок ключей не найдено; наборы верных вариантов сохранены.

P2: пул расширен с 92 до 227 существующих заданий (143 MC и 84 open). Все ID использованы на 1000 seed; среднее пересечение двух билетов снизилось с 30,2696 до 16,2431/50. Прежние квоты сохранены. По описанной карте атомарных целей и направленных подсказок коллизий в новых билетах нет. Механизм/UI/рубрики/баллы open, исходные 275/19, 96 блоков, 135 формул, frozen5.0.8 и история защищены.

Ограничения: EX17-31 повторяется из-за единственного кандидата в своей квоте; 80,4% выбранных MC имеют три верных варианта. Нет официальных ключей или эмпирической калибровки; 32 исходные условные/неоднозначные трактовки сохранены. Всегда новые билеты не обещаются.

Вывод CP181 об отсутствии обязательных остатков уточнён новым аудитом: остаются F01/F03/F04, план T-35. T-06 — только по отдельной команде; значение next_task не разрешает автоматический запуск. T-32 не переоткрывается. Интервальные повторы и исследование на студентах вне объёма.

[Итог P2](../audits/T33_EXAM_POOL_EXPANSION.md) · [Доказательства](../audits/data/RELEASE_6_2_3_PROOF.json) · [Контекст CP181](CHAT_HANDOFF.md) · [История этапов](CHECKPOINTS.md).
