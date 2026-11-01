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
    "reviewed_mc": 96,
    "reviewed_statements": 480,
    "pending_mc": 153,
    "P2": "NOT_STARTED_PENDING_P1",
    "application_changed": true,
    "report": "docs/audits/T33_MC_BANK_REVIEW.md",
    "release_status": "6.2.2_PENDING;6.2.1_VERIFIED",
    "edited_mc": 5,
    "keep_mc": 91,
    "work_branch": "work/t33-p1-review-remaining",
    "conditional_scope_clarifications": 1
  }
}
```
<!-- STATE_JSON_END -->

**На сайте проверенная 6.2.1; рабочая 6.2.2 ещё не опубликована. T-33 продолжается.**

Предметно проверены 96 MC и 480 утверждений: 91 KEEP и пять правок; категорических ошибок ключей не найдено, у одного утверждения уточнена область применимости. Осталось 108 старых и 45 новых MC. Полная приёмка P1 и расширение P2 ещё не выполнены.

Опубликованные две правки 6.2.1 подтверждены 31 локальной и 13 браузерными программами, CI в PR/main, Pages, 19 файлами сайта и шестью фактическими URL ресурсов. [Доказательства](../audits/data/RELEASE_6_2_1_PROOF.json). Три новые правки B04 и расширенная браузерная проверка сохранены в рабочей ветке `work/t33-p1-review-remaining`; их публикация ожидает завершения крупного блока P1 и полной регрессии.

Open, 275/19, 96 блоков, 135 формул, ID, история и frozen сохраняются. [План и аудит](../audits/T33_MC_BANK_REVIEW.md). Следующий B05: вопросы 97–120. T-32 не переоткрыта; T-06, отдельная переработка интервальных повторов и исследование на студентах не входят в объём.
