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
    "reviewed_mc": 174,
    "reviewed_statements": 870,
    "pending_mc": 75,
    "P2": "NOT_STARTED_PENDING_P1",
    "application_changed": true,
    "report": "docs/audits/T33_MC_BANK_REVIEW.md",
    "release_status": "6.2.2_PENDING;6.2.1_VERIFIED",
    "edited_mc": 38,
    "keep_mc": 136,
    "work_branch": "work/t33-p1-review-remaining",
    "conditional_scope_clarifications": 3,
    "typography_only_mc": 30,
    "execution_status": "BLOCKED_ENVIRONMENT",
    "recovery_checkpoint": "CP-20261101-169",
    "pending_draft": "docs/audits/data/T33_B08_RECOVERY_DRAFT.json",
    "latest_source_review_commit": "996f66432d73061d8393903a200a190aaf74d0bd"
  }
}
```
<!-- STATE_JSON_END -->

**Среда исполнения недоступна; новые тесты и выпуск заблокированы.** [Восстановление CP169](CHAT_HANDOFF.md).

**На сайте проверенная 6.2.1; рабочая 6.2.2 ещё не опубликована. T-33 продолжается.**

Проверены 174/249 MC и 870/1245 утверждений: 136 KEEP, 38 изменённых карточек (30 только типографика). Осталось 30 старых и 45 новых MC. Уточнений области применимости: 3; категорических ошибок ключа не найдено. Ключи и кардинальности сохранены.

B07: 30 вопросов / 150 утверждений. Уточнён вклад плеча при ненулевом движении цены до расходов, в 18 карточках устранены слипшиеся слова и пробелы. Предпосылки CAPM/метрик/TA/РЕПО/спредов/рейтинга/лизинга/страхования найдены до упражнений. НПР, нулевая маржа и договорные оговорки сверены по официальному 6681-У; ПВО, октябрьская дата стандарта и общая база льгот ИИС — по ЦБ. Краткие слайды ICMA дополнены первичным Guidance Handbook; источник четырёх компонентов не приписан дословно слайдам. Ключи сохранены, три уточнения области применимости за весь проход.

Результаты сохраняются в `work/t33-p1-review-remaining`; выпуск после P1 и полной регрессии. Проверенная публикация: [доказательства 6.2.1](../audits/data/RELEASE_6_2_1_PROOF.json). Open/UI/рубрики/баллы, 275/19, ID, история, 96 блоков, 135 формул и frozen защищены. P2 ещё не начат; T-32 не переоткрыта, T-06 вне объёма.

Следующий шаг: B08: последние 30 старых MC, вопросы 175–204; затем отдельно 45 новых MC.
