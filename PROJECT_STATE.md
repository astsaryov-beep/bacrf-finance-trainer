# Текущее состояние проекта

<!-- STATE_JSON_BEGIN -->
```json
{
  "schema_version": 1,
  "repository": "astsaryov-beep/bacrf-finance-trainer",
  "working_version": "5.0.28 beta",
  "stable_version": "5.0.8",
  "stable_path": "v5.0.8/index.html",
  "stable_blob_sha": "2b77ae8f74be9433af3c458c3be55314d2cc9519",
  "phase": "IN_PROGRESS",
  "active_task": "T-01",
  "next_task": "T-01",
  "last_verified_checkpoint": "CP-20261026-031",
  "last_verified_commit": "0108a6e429c5f56be008da7766f6067d572f35a6",
  "last_verified_ci_run": "https://github.com/astsaryov-beep/bacrf-finance-trainer/actions/runs/40319001440",
  "last_verified_deployment_run": "https://github.com/astsaryov-beep/bacrf-finance-trainer/actions/runs/40319001017",
  "last_verified_status": "VERIFIED",
  "state_updated_on": "2026-10-26"
}
```
<!-- STATE_JSON_END -->

## 5.0.28 beta · VERIFIED · комплексный аудит IN_PROGRESS

Первый пакет M01:6/96 блоков комплексно рассмотрены, семи локальным проверкам PASS; браузер нового выпуска PASS. Прочитаны/визуально просмотрены54/557 страниц с оговорками, все20заданий преподавательского разбора сопоставлены с19исходнымиID. Изменения/ограничения: QUALITY_STATUS.md и QUALITY_M01_REVIEW.md. Оставшиеся90блоков и итоговый сквозной проход не завершены.

Исправлены эффективные ответы/чек-листы Q13/Q10/Q12 и пояснение Q18. История прежних оценок сохраняется с повторной самопроверкой. Добавлены две полные формулы кредитного анализа: всего86, прежние84 сохранены. Терминов447; дополнительные концептуальные проверки7; прежние96 сохранены. RawBANK275/19,309назначений/подготовка, ID, экспорт/импорт и замороженная5.0.8 сохранены.

Последняя опубликованная подтверждённая основа5.0.27: PR38, commit e3dad380e74f56629e4f906dfe1590ceb5b4c082, mainCI40302216887/Pages40302216421 SUCCESS, live MATCH (CP025). Начало новой ветки — фактический main a3d5d63974fef2e75a8e30a99511a24b3e556b94; mainCI40303064679/Pages40303063241 SUCCESS. Предыдущая основа сохранена как история; актуальный VERIFIED в JSON —5.0.28.

T-02 DONE96/96, T-12 дедупликация DONE в прежнем объёме. T-01/T-14/T-15/T-16 комплексно IN_PROGRESS. T-06 только по отдельной команде. Экзаменационный отбор не менять (D-012), beta до принятия пользователем. Публикация проверена; следующий шаг — M02 без новой команды.

## Подтверждение 5.0.28

[PR #40](https://github.com/astsaryov-beep/bacrf-finance-trainer/pull/40), [PR CI SUCCESS](https://github.com/astsaryov-beep/bacrf-finance-trainer/actions/runs/40318710837), [main CI SUCCESS](https://github.com/astsaryov-beep/bacrf-finance-trainer/actions/runs/40319001440), [Pages SUCCESS](https://github.com/astsaryov-beep/bacrf-finance-trainer/actions/runs/40319001017). Продуктовый commit `0108a6e429c5f56be008da7766f6067d572f35a6`. Live MATCH: index `2a72b21f28b535962511b2dd43e58657a2f03e4a`, question-review.js `aab1a7dc68eaa834ab8c94217170a8dd5cffd684`, frozen5.0.8 `2b77ae8f74be9433af3c458c3be55314d2cc9519`.

M01 принят6/96 с описанными ограничениями; общий аудит IN_PROGRESS. Следующий M02(S1-04…S1-06: долговые инструменты, секьюритизация, цена/доходность) без новой команды.
