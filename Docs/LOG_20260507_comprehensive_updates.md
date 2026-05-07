# 📝 Project Work Log: 2026-05-07

## 📋 작업 개요
오늘은 프로젝트의 피드백 수집 체계를 보안 중심의 서버리스 아키텍처로 전환하고, 주요 시뮬레이션 앱들의 사용자 경험(UX)과 학습적 가치를 높이는 고도화 작업을 진행함.

## 🛠️ 주요 수정 및 구현 사항

### 1. 보안 노션 피드백 시스템 (Secure Notion Proxy)
- **문제**: 클라이언트 사이드에서 노션 API 토큰이 노출될 위험이 있었음.
- **해결**: Vercel Serverless Function (`api/feedback.js`)을 구축하여 API 키를 환경 변수로 숨김.
- **적용 앱**:
    - `prompt_practice.html`
    - `vibecoding_sim.html`
    - `vibecoding_quest.html`
    - `monster_startup.html`
- **특이사항**: 각 앱의 컨셉에 맞춘 커스텀 UI(FAB, Modal)를 개별 디자인하여 통합함.

### 2. Prompt Mastery (연애 시뮬레이션)
- **기능 추가**: 엔딩 시 '마스터 프롬프트' 복사 기능 구현.
- **목적**: 사용자가 게임에서 배운 프롬프트 엔지니어링 기술을 실제 AI 모델(ChatGPT 등)에서 바로 사용할 수 있도록 학습 연계 강화.
- **디자인**: 에메랄드빛 'Master Prompt Acquired' 섹션 및 원클릭 복사 애니메이션 추가.

### 3. VibeCoding Quest (게임형 앱)
- **UI 개선**: 인트로 화면의 시작 버튼 3종을 가로 배치에서 세로 배치로 변경하여 모바일 가독성 및 웅장함 개선.
- **캐릭터 소환**: AI 생성을 통해 퀘스트 영웅(디지털 용사) 캐릭터를 생성하고 배경 투명화 로직을 통해 인트로 화면에 배치.
- **에러 해결**: 텍스트 줄바꿈(`white-space: nowrap`) 및 캐릭터 노출 지연 문제(`makeTransparent` 함수 누락) 해결.

### 4. Monster Startup (스타트업 경영)
- **UI 통합**: 마왕군 테마(네온 그린 & 픽셀 스타일)에 맞춘 피드백 시스템 연동 완료.

## ⚠️ 발생했던 이슈 및 해결 (Solver)
- **404 Routing Error**: Vercel 배포 시 `vercel.json` 설정 문제로 API 경로를 찾지 못함 -> `vercel.json`을 기본 설정으로 단순화하여 해결.
- **Transparency Issue**: AI 생성 이미지가 투명 배경 대신 체크무늬를 포함함 -> 순백색 배경으로 재생성 후 `makeTransparent` 함수로 실시간 도려내기 적용.
- **Missing Function**: `vibecoding_quest.html`에 배경 제거 로직이 누락되어 이미지가 안 보임 -> 함수 주입 및 인터벌 설정으로 해결.

## 🚀 향후 작업 참고 사항
- 노션 데이터베이스의 `App Name` 열을 필터링하여 각 앱별 피드백을 관리할 것.
- 새로운 앱 추가 시 `NOTION_CONFIG` 객체의 `appName`만 수정하면 즉시 연동 가능.
- `makeTransparent` 함수는 흰색(RGB > 240) 배경을 기준으로 작동하므로 캐릭터 생성 시 `PURE SOLID WHITE BACKGROUND` 프롬프트 유지가 중요함.

---
**기록자**: 서기 (Doc)
**최종 업데이트**: 2026-05-07
**Link**: [아크랩스 홈페이지](https://litt.ly/aklabs)
