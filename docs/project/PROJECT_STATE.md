# Текущее состояние проекта

<!-- STATE_JSON_BEGIN -->
```json
{
  "schema_version": 1,
  "repository": "astsaryov-beep/bacrf-finance-trainer",
  "working_version": "6.2.3",
  "stable_version": "5.0.8",
  "stable_path": "v5.0.8/index.html",
  "stable_blob_sha": "2b77ae8f74be9433af3c458c3be55314d2cc9519",
  "phase": "IN_PROGRESS",
  "active_task": "T-33",
  "next_task": "T-33",
  "last_verified_checkpoint": "CP-20261101-176",
  "last_verified_commit": "417ea43253ebc943478815536d5f5b36abba0d47",
  "last_verified_ci_run": "https://github.com/astsaryov-beep/bacrf-finance-trainer/actions/runs/41345388651",
  "last_verified_deployment_run": "https://github.com/astsaryov-beep/bacrf-finance-trainer/actions/runs/41346048937",
  "last_verified_status": "VERIFIED",
  "state_updated_on": "2026-11-01",
  "current_release": "6.2.3",
  "release_channel": "stable",
  "last_recheck": {
    "date": "2026-11-01",
    "commit": "417ea43253ebc943478815536d5f5b36abba0d47",
    "local_programs": 31,
    "browser_programs": 13,
    "live_public_files_match": 19,
    "actual_cache_urls_match": 6,
    "main_ci": "https://github.com/astsaryov-beep/bacrf-finance-trainer/actions/runs/41346049416",
    "proof": "docs/audits/data/RELEASE_6_2_2_PROOF.json"
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
    "P2": "IMPLEMENTED_LOCAL_GENERATION_PASS_FULL_REGRESSION_PENDING",
    "application_changed": true,
    "report": "docs/audits/T33_MC_BANK_REVIEW.md",
    "release_status": "6.2.2_VERIFIED",
    "edited_mc": 42,
    "keep_mc": 207,
    "work_branch": "work/t33-p1-publication-proof",
    "conditional_scope_clarifications": 3,
    "typography_only_mc": 34,
    "execution_status": "AVAILABLE",
    "recovery_checkpoint": "CP-20261101-169",
    "latest_source_review_commit": "417ea43253ebc943478815536d5f5b36abba0d47",
    "recovery_resolved_in": "CP-20261101-170",
    "subject_review": "COMPLETED",
    "local_programs": 31,
    "local_result": "PASS",
    "browser": "PASS_13_PR_AND_MAIN",
    "subject_edits": 8,
    "pr_candidate_checkpoint": "CP-20261101-173",
    "pr": 96,
    "runtime_changes_after_cp173": false,
    "P1": "VERIFIED_6_2_2",
    "admitted_mc": 143,
    "admitted_open": 84,
    "admitted_total": 227
  }
}
```
<!-- STATE_JSON_END -->

**Среда исполнения недоступна; новые тесты и выпуск заблокированы.** [Восстановление CP169](CHAT_HANDOFF.md).

**Опубликована и проверена6.2.2. P1принят, T-33продолжается этапомP2.**

Проверены249MC/1245утверждений:207KEEP,42правки(34типографика,5дистракторов/кейсов,3условия). Категорических ошибок ключа не найдено, наборы верных сохранены. Перекос количества ответов раскрыт в отчёте.

PR96 и31локальная/13браузерныхпрограммPASS;mainCIиPagesSUCCESS;совпали19файловсайтаишестьфактическихURLресурсов. [Доказательства](../audits/data/RELEASE_6_2_2_PROOF.json).

P2:инвентаризациякандидатовизсуществующегобанка,допусксовместимыхMC/open,атомарныецели/отсутствиеподсказок,≥1000seedипересечения. Расширениеещёне реализовано. Алгоритм/UI/рубрики/баллыopen,275/19,96блоков,135формул,frozen и история сохраняются. T-32непереоткрывается,T-06внеобъёма.

CP177: P2 baseline1000seed сохранён до изменений, фактически43MC+49open; среднее пересечение30,2696/50. Приложение не менялось.

CP178: ветка work/t33-p2-exam-pool, 6.2.3 пока не опубликована. Допуск227 (143MC/84open),1000seed,все227использованы,среднее пересечение16,2065/50. Полнаярегрессия/браузер/CI/PagesPENDING.

CP178: полный локальный набор32/32PASS;первичные7FAILфикстурисправленыбезослабленияassert. [ИтогP2](../audits/T33_EXAM_POOL_EXPANSION.md). Браузер/CI/релизPENDING.

## CP-20261101-179 ·T-33/P2 ·финальнаяредакторскаякарта IN_PROGRESS

Уточненыатомарныероли/подцели,безизмененийбанкаилиоценивания. Финальнаягенерация1000seed:227использованныхID,среднеепересечение16,2431/50вместо30,2696;100→186описанныхатомов,0коллизий/подсказокпоэтойкарте. Сохранённыйбилет6.2.2сохраняет50/50,0staleиответы/порядки/уверенность;границыuint32PASS.32полныхлокальныхPASSнаCP178,затронутыепроверкиповтореныпослеуточнения;новыйполныйPRCIобязателен.6.2.3релизPENDING.
