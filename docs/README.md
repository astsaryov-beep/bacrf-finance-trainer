# Документация проекта

Последняя комплексная проверка: [T-34 / 02.11.2026](audits/FULL_REVIEW_20261102.md). F03/F04 исправлены в 6.2.4; F01 с обязательной арифметикой остаётся открытым.

Текущая приёмка: [6.2.4 — темы карточек и границы прогресса](audits/T35_PRESENTATION_FIX.md). [Доказательства](audits/data/RELEASE_6_2_4_PROOF.json).

Предыдущая приёмка содержания и учебного пути: [6.2.0 / T-32](audits/T32_LEARNING_QUALITY_20261101.md).

Для подготовки откройте [тренажёр](https://astsaryov-beep.github.io/bacrf-finance-trainer/).

## Разработка

- [Правила работы](../AGENTS.md)
- [Текущее состояние](project/PROJECT_STATE.md)
- [Передача контекста](project/CHAT_HANDOFF.md)
- [План и задачи](project/ROADMAP.md)
- [Решения](project/DECISIONS.md)
- [История выпусков](project/CHANGELOG.md)
- [Журнал проверок](project/CHECKPOINTS.md)

## Учебное содержание и качество

- [Текущий охват курса](audits/INTEGRATION_COVERAGE.md)
- [Экзаменационное обновление 6.1.5](audits/EXAM_FINAL_ACCEPTANCE_20261031.md)
- [Путь новичка по базовым 96 блокам](audits/NOVICE_PATH_FINAL_REVIEW_20261027.md)
- [Источники](audits/SOURCES_AUDIT.md)
- [Проверки приложения](audits/QA_REPORT.md)
- [Подробные аудиты](audits/)
- [Данные проверки](audits/data/)
- [Исторические документы](archive/)

## Структура

`index.html` — приложение; `assets/` — его скрипты и стили; `tests/` — проверки; `docs/` — документация. Версия `v5.0.8/` заморожена, `versions/` содержит выбор версии. Исходные закрытые презентации в репозиторий не включены.

[Интерфейс и выпуск 6.0](audits/UI_RELEASE_6.md).

[Из упражнения к теории](audits/QUESTION_THEORY_LINK_REVIEW.md).

[Очистка кода6.0.2](audits/CODE_CLEANUP_6_0_2.md).

[Повторный аудит ТЗ 01.11.2026](audits/INDEPENDENT_REQUIREMENTS_AUDIT_20261101.md): исторические замечания адресно закрыты в 6.2.0 / T-32. Текущая ревизия MC и экзамена завершена в 6.2.3 / T-33; её ограничения приведены в отчёте выше.
