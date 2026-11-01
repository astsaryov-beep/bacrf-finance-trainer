# Текущее состояние проекта

<!-- STATE_JSON_BEGIN -->
```json
{
  "schema_version": 1,
  "repository": "astsaryov-beep/bacrf-finance-trainer",
  "working_version": "6.2.0",
  "stable_version": "5.0.8",
  "stable_path": "v5.0.8/index.html",
  "stable_blob_sha": "2b77ae8f74be9433af3c458c3be55314d2cc9519",
  "phase": "IN_PROGRESS",
  "active_task": "T-33",
  "next_task": "T-33",
  "last_verified_checkpoint": "CP-20261101-161",
  "last_verified_commit": "154b8606a0aa77f5ebfc30f26b57b0650afe95fc",
  "last_verified_ci_run": "https://github.com/astsaryov-beep/bacrf-finance-trainer/actions/runs/41295018815",
  "last_verified_deployment_run": "https://github.com/astsaryov-beep/bacrf-finance-trainer/actions/runs/41295555468",
  "last_verified_status": "VERIFIED",
  "state_updated_on": "2026-11-01",
  "current_release": "6.2.0",
  "release_channel": "stable",
  "last_recheck": {
    "date": "2026-11-01",
    "commit": "154b8606a0aa77f5ebfc30f26b57b0650afe95fc",
    "local_programs": 30,
    "browser_programs": 13,
    "live_public_files_match": 19,
    "main_ci": "https://github.com/astsaryov-beep/bacrf-finance-trainer/actions/runs/41295555817",
    "proof": "docs/audits/data/RELEASE_6_2_0_PROOF_20261101.json"
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
    "reviewed_mc": 24,
    "reviewed_statements": 120,
    "pending_mc": 225,
    "P2": "NOT_STARTED_PENDING_P1",
    "application_changed": false,
    "report": "docs/audits/T33_MC_BANK_REVIEW.md"
  }
}
```
<!-- STATE_JSON_END -->

**6.2.0 опубликована и проверена. T-32 закрыта в адресном редакционном и техническом объёме.**

[PR91](https://github.com/astsaryov-beep/bacrf-finance-trainer/pull/91), продукт `154b8606a0aa77f5ebfc30f26b57b0650afe95fc`. [Полный CI](https://github.com/astsaryov-beep/bacrf-finance-trainer/actions/runs/41295018815), [Pages](https://github.com/astsaryov-beep/bacrf-finance-trainer/actions/runs/41295555468) — SUCCESS. Все 19 опубликованных файлов совпали с проверенным приложением.

95 упражнений связаны с 49 блоками после всех предпосылок и включены в последовательный путь. Базовые 96 завершений сохранены. Отдельный показатель экзаменационных навыков учитывает92задания;3учебныхрасчёта доступны для понимания и не входят в пробный экзамен. Подробные рубрики открытых,пропуски,уверенность,возврат к точной теории,черновики,редакционная история,перезагрузка и настоящийэкспорт/импорт проверены.

27 альтернатив16карточек уточнены по смыслу,источникам и условиям. В контрольном наборе50разных оценочных целей;25MC5+25open,квоты и не менее3составных. В1000наборах нет расчётных карточек и тесной парыДоу;три верных встречаются в45,69%MC-позиций вместо84,17%до исправлений. Это характеристики генератора,не эмпирическая калибровка сложности.

30 локальных и13браузерных программ PASS. Полный путь:96блоков,309базовых+204MC+95новых ответов,реальныйэкспорт/импорт608ответов. Сохранены275/19,135формул,ID/ключи иfrozen5.0.8. T06общимпакетомневыполнялась.

Официального ключа нет;32оговорки исходных утверждений сохранены. Источниковый/методический контроль редакционный,эксперимента со студентами не было. Новая полная независимая сертификация557страниц/608ответов не заявляется. Текущая новая работа — T-33 по ТЗ ревизии банка MC.

[Отчёт](../audits/T32_LEARNING_QUALITY_20261101.md) · [Доказательства](../audits/data/RELEASE_6_2_0_PROOF_20261101.json). Предыдущие рабочие статусы сохранены [в архиве](../archive/2026-11-01-t32/PROJECT_STATE.md), история этапов — в CHECKPOINTS.md.

## Текущая T-33 · IN_PROGRESS

Полная матрица249MC создана; B01 предметно проверен24/204 и120/1020 утверждений,24KEEP без правок. Новые45ещё не проверены. P2 не начат до приёмкиP1. Приложение остаётся6.2.0; open и весь рабочий код побайтно сохранены. [План и результат](../audits/T33_MC_BANK_REVIEW.md).
