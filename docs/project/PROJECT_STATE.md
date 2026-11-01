# Текущее состояние проекта

<!-- STATE_JSON_BEGIN -->
```json
{
  "schema_version": 1,
  "repository": "astsaryov-beep/bacrf-finance-trainer",
  "working_version": "6.2.2",
  "stable_version": "5.0.8",
  "stable_path": "v5.0.8/index.html",
  "stable_blob_sha": "2b77ae8f74be9433af3c458c3be55314d2cc9519",
  "phase": "IN_PROGRESS",
  "active_task": "T-33",
  "next_task": "T-33",
  "last_verified_checkpoint": "CP-20261101-164",
  "last_verified_commit": "b0e3346f5e4b21034985403ca52cab1499c1086b",
  "last_verified_ci_run": "https://github.com/astsaryov-beep/bacrf-finance-trainer/actions/runs/41317174216",
  "last_verified_deployment_run": "https://github.com/astsaryov-beep/bacrf-finance-trainer/actions/runs/41317777955",
  "last_verified_status": "VERIFIED",
  "state_updated_on": "2026-11-01",
  "current_release": "6.2.2",
  "release_channel": "stable",
  "last_recheck": {
    "date": "2026-11-01",
    "commit": "b0e3346f5e4b21034985403ca52cab1499c1086b",
    "local_programs": 31,
    "browser_programs": 13,
    "live_public_files_match": 19,
    "actual_cache_urls_match": 6,
    "main_ci": "https://github.com/astsaryov-beep/bacrf-finance-trainer/actions/runs/41317778013",
    "proof": "docs/audits/data/RELEASE_6_2_1_PROOF.json"
  },
  "last_audit": {
    "checkpoint": "CP-20261101-157",
    "date": "2026-11-01",
    "commit": "bd5a442f301559260162e963dfa43e875969d721",
    "status": "FINDINGS_ADDRESSED_WITH_DISCLOSED_LIMITS",
    "findings": [
      "A01",
      "A02",
      "A03",
      "A04",
      "A05",
      "A06",
      "A07"
    ],
    "report": "docs/audits/INDEPENDENT_REQUIREMENTS_AUDIT_20261101.md",
    "runtime_changed": false,
    "resolution": "docs/audits/T32_LEARNING_QUALITY_20261101.md",
    "resolved_in": "6.2.0"
  },
  "current_work": {
    "task": "T-33",
    "status": "IN_PROGRESS",
    "reviewed_mc": 144,
    "reviewed_statements": 720,
    "pending_mc": 105,
    "P2": "NOT_STARTED_PENDING_P1",
    "application_changed": true,
    "report": "docs/audits/T33_MC_BANK_REVIEW.md",
    "release_status": "6.2.2_PENDING;6.2.1_VERIFIED",
    "edited_mc": 19,
    "keep_mc": 125,
    "work_branch": "work/t33-p1-review-remaining",
    "conditional_scope_clarifications": 2,
    "typography_only_mc": 12
  }
}
```
<!-- STATE_JSON_END -->

**На сайте проверенная 6.2.1; рабочая 6.2.2 ещё не опубликована. T-33 продолжается.**

Проверены 144/249 MC и 720/1245 утверждений: 125 KEEP, 19 изменённых карточек (12 только типографика). Осталось 60 старых и 45 новых MC. Уточнений области применимости: 2; категорических ошибок ключа не найдено. Ключи и кардинальности сохранены.

B06: 24 вопроса / 120 утверждений. Кейс риска теперь сам задаёт веса и корреляцию; очевидное сравнение 16,3 и 20,37 заменено ошибкой линейного вместо корневого масштабирования времени. В трёх карточках исправлены пробелы. S3 PDF19/50 просмотрены визуально: формула DDM не дублирует последний дивиденд; исправленный в теории риск 20,3715% подтверждён независимо. Упрощения S3 PDF40 о net-сериях заменять верные MCFTRN/R нельзя: роли организаций подтверждены самой Мосбиржей. Предпосылки проверены до упражнений, ключи не менялись.

Результаты сохраняются в `work/t33-p1-review-remaining`; выпуск после P1 и полной регрессии. Проверенная публикация: [доказательства 6.2.1](../audits/data/RELEASE_6_2_1_PROOF.json). Open/UI/рубрики/баллы, 275/19, ID, история, 96 блоков, 135 формул и frozen защищены. P2 ещё не начат; T-32 не переоткрыта, T-06 вне объёма.

Следующий шаг: B07: вопросы 145–174, сначала независимые вердикты без ключей, затем источники/пояснения.
