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
    "reviewed_mc": 249,
    "reviewed_statements": 1245,
    "pending_mc": 0,
    "P2": "NOT_STARTED_PENDING_P1",
    "application_changed": true,
    "report": "docs/audits/T33_MC_BANK_REVIEW.md",
    "release_status": "6.2.2_PENDING;6.2.1_VERIFIED",
    "edited_mc": 42,
    "keep_mc": 207,
    "work_branch": "work/t33-p1-review-remaining",
    "conditional_scope_clarifications": 3,
    "typography_only_mc": 34,
    "execution_status": "AVAILABLE",
    "recovery_checkpoint": "CP-20261101-169",
    "latest_source_review_commit": "c220f8bf040dec272861eece7513f704076af31f",
    "recovery_resolved_in": "CP-20261101-170",
    "subject_review": "COMPLETED",
    "local_programs": 31,
    "local_result": "PASS",
    "browser": "PENDING_AFTER_NATIVE_FIXTURE_CORRECTION",
    "subject_edits": 8,
    "pr_candidate_checkpoint": "CP-20261101-173",
    "pr": 96,
    "runtime_changes_after_cp173": false
  }
}
```
<!-- STATE_JSON_END -->

**Среда исполнения недоступна; новые тесты и выпуск заблокированы.** [Восстановление CP169](CHAT_HANDOFF.md).

**На сайте проверенная 6.2.1; рабочая 6.2.2 ещё не опубликована. T-33 продолжается.**

Проверены 249/249 MC и 1245/1245 утверждений: 207 KEEP, 42 изменённых карточек (34 только типографика). Осталось 0 старых и 0 новых MC. Уточнений области применимости: 3; категорических ошибок ключа не найдено. Ключи и кардинальности сохранены.

B10: завершены последние22новыхMC/110утверждений,20KEEPи2правки пробелов. В целом204старых+45новых,1245утверждений:207KEEP,42изменённыекарточки,изних34только типографика и8содержательныхправок;3уточненияобласти,0категорическихошибокключа. Новые правки наследуют существующие ревизии, старый ответ сохраняется вwording-истории. Дляalignmentмодуль защищён отдельно: все50openзаписей, теория/логика побайтно, разрешены только записанныеMCи регистрацияT33wording. Полная исходная baseline-сумма сохранена. Проверка миграции использует фактическую предыдущуюревизию, браузер динамически охватывает оба дополнительных банка. ПолнаяприёмкаP1и релиз ещёPENDING.

Результаты сохраняются в `work/t33-p1-review-remaining`; выпуск после P1 и полной регрессии. Проверенная публикация: [доказательства 6.2.1](../audits/data/RELEASE_6_2_1_PROOF.json). Open/UI/рубрики/баллы, 275/19, ID, история, 96 блоков, 135 формул и frozen защищены. P2 ещё не начат; T-32 не переоткрыта, T-06 вне объёма.

Следующий шаг: Итоговый отчётP1: раздельные распределения/повторы/пределы; полные31локальная и13браузерных программ,PR/CI/main/Pages/live, затемP2.

Предметный итог249/249: [сводка](../audits/data/T33_P1_SUMMARY.json), [31локальныйPASS](../audits/data/T33_P1_CHECKS.json). Общая приёмкаP1 ожидает браузер/CI/Pages/live;P2не начат.

CP174: [PR96](https://github.com/astsaryov-beep/bacrf-finance-trainer/pull/96), первыйCI41343887805verify/corePASS; уточнён реальный интерфейс двух нативных карточек в браузерном тесте. Полная приёмка ожидает новогоCI; приложение неизменно после CP173.

CP175:история42правок проверена через настоящийstudygetter;фактическиеназначения45MCсверены. Браузерные фикстуры используют назначенныйпослепредпосылокблок,новыйполныйCIещёPENDING.
