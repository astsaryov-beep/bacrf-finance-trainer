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
  "last_verified_checkpoint": "CP-20261102-185",
  "last_verified_commit": "9c57c166578071feef4e3277308f4a016c15ceff",
  "last_verified_ci_run": "https://github.com/astsaryov-beep/bacrf-finance-trainer/actions/runs/41452492559",
  "last_verified_deployment_run": "https://github.com/astsaryov-beep/bacrf-finance-trainer/actions/runs/41452492046",
  "last_verified_status": "VERIFIED",
  "state_updated_on": "2026-11-02",
  "current_release": "6.2.4",
  "release_channel": "stable",
  "last_recheck": {
    "date": "2026-11-02",
    "commit": "9c57c166578071feef4e3277308f4a016c15ceff",
    "local_programs": 34,
    "ci_node_programs": 34,
    "browser_programs": 13,
    "live_public_files_match": 21,
    "actual_cache_urls_match": 8,
    "main_ci": "https://github.com/astsaryov-beep/bacrf-finance-trainer/actions/runs/41452492559",
    "proof": "docs/audits/data/RELEASE_6_2_4_PROOF.json"
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
      "F01"
    ],
    "report": "docs/audits/FULL_REVIEW_20261102.md",
    "runtime_changed": false,
    "followup": {
      "checkpoint": "CP-20261102-185",
      "fixed": [
        "F03",
        "F04"
      ],
      "version": "6.2.4",
      "report": "docs/audits/T35_PRESENTATION_FIX.md"
    }
  },
  "current_work": {
    "task": "T-35",
    "status": "F03_F04_VERIFIED_F01_OPEN",
    "completed_scope": [
      "F03",
      "F04"
    ],
    "F01": "OPEN_OUTSIDE_SELECTED_CHANGE",
    "application_commit": "9c57c166578071feef4e3277308f4a016c15ceff",
    "pr": 101,
    "report": "docs/audits/T35_PRESENTATION_FIX.md"
  },
  "next_task_policy": "F03_F04_PUBLISHED_F01_REMAINS_OPEN_T06_REQUIRES_SEPARATE_COMMAND"
}
```
<!-- STATE_JSON_END -->

**6.2.4 опубликована и технически проверена. Выбранные пользователем F03/F04 закрыты; F01 остаётся открытым.**

Проверены названия всех 95 новых карточек: 47 исправлены или конкретизированы, 48 сохранены. В том числе исправлены неверные темы аккредитива, процентного свопа и валютного форварда. Подписи не называют термин, который требуется вспомнить. Изменены только тема и унаследованная подпись понятия; вопросы, ключи, рубрики, ревизии, теория и история ответов сохранены.

Счётчик «Экзаменационный блок курса» относится к 92 дополнительным заданиям после теории. Пояснение отличает его от общего банка пробного экзамена: 227 заданий, из которых выбираются 50. Арифметика счётчика не менялась. В курсе пояснение находится в существующем раскрываемом блоке «О курсе и прогрессе», поэтому список тем сохранил высоту.

Код: `9c57c166578071feef4e3277308f4a016c15ceff` ([PR101](https://github.com/astsaryov-beep/bacrf-finance-trainer/pull/101)). Все 34 локальные программы и 13 браузерных сценариев в PR/main прошли; [main CI](https://github.com/astsaryov-beep/bacrf-finance-trainer/actions/runs/41452492559) и [Pages](https://github.com/astsaryov-beep/bacrf-finance-trainer/actions/runs/41452492046) — SUCCESS. Проверены точные байты 21 файла сайта и восьми фактических URL ресурсов; их Git-хеши независимо сопоставлены с деревом main. Проверки реального импорта/экспорта, перезагрузки и 42 прежних миграций сохранены.

F01: EX17-44/RECON-17 содержат обязательные вычисления, хотя допущены в экзамен. Это отдельный остаток T-35; данный пакет его не исправляет. Полного соответствия требованию «ноль обязательных вычислений» пока нет. T-06 — только по отдельной команде.

Ограничения T-33 сохранены: EX17-31 повторяется из-за единственного кандидата в своей квоте; 80,4% выбранных MC имеют три верных варианта. Официальных ключей и эмпирической калибровки нет; 32 исходные условные/неоднозначные трактовки не менялись. Новый академический пересмотр всех 557 страниц или эксперимент с новичками в T-35 не проводился.

[Отчёт T-35](../audits/T35_PRESENTATION_FIX.md) · [Доказательства](../audits/data/RELEASE_6_2_4_PROOF.json) · [Передача контекста](CHAT_HANDOFF.md) · [История этапов](CHECKPOINTS.md).
