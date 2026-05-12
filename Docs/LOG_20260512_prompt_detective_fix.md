# Project Log: Prompt Detective Stage 2 Progression Fix
**Date:** 2026-05-12
**Role:** Doc (서기)

## 1. 개요
`prompt_detective.html` 앱에서 스테이지 1 완료 후 스테이지 2(단서 분석)로 넘어갔을 때 UI가 표시되지 않아 진행이 불가능했던 현상을 수정함.

## 2. 발견된 문제점 (Error Analysis)
- **UI 가시성 제어 누락**: `showActionPanel` 함수에서 상위 패널만 표시하고, 각 단계별(Stage 1~5) 세부 컨테이너의 `hidden-stage` 클래스를 제거하는 로직이 없었음.
- **인트로 루프**: 인트로 화면에서 클릭 시 호출되는 `skipIntro` 함수가 정의되지 않아 에러 발생 가능성이 있었음.
- **사용자 피드백 부족**: 대화창에서 다음 단계로 넘어갈 수 있음을 알리는 화살표 인디케이터가 활성화되지 않아 진행이 멈춘 것으로 오해할 여지가 있었음.
- **HUD 동기화**: 상단 HUD의 점수와 스테이지 정보가 실제 게임 상태와 연동되지 않았음.

## 3. 해결 내용 (Implementation Details)
- **스테이지 전환 로직 수정**: `showActionPanel` 함수 내에 모든 `.stage-ui`를 숨기고 현재 스테이지 ID에 해당하는 요소만 표시하는 로직 추가.
- **인트로 스킵 기능 구현**: `skipIntro` 및 `finishIntro` 함수를 추가하여 인트로 타이핑 효과를 건너뛸 수 있게 함.
- **대화 인디케이터 연동**: `typeLine` 함수 종료 시 `next-indicator`를 표시하여 클릭 유도.
- **HUD 업데이트 시스템**: `updateHUD` 함수를 통해 점수(`gameState.score`)와 스테이지 이름을 실시간으로 반영.
- **액션 패널 개선**: 긴 내용이 있을 경우를 대비하여 `max-height`와 `overflow-y: auto` 스타일 적용.

## 4. 향후 과제
- 각 스테이지별 입력값에 따른 동적 결과(AI 응답 시뮬레이션) 강화.
- 사운드 효과 및 배경음악 추가로 몰입감 향상.

## 5. 참고 링크
- 아크랩스 홈페이지: https://litt.ly/aklabs
