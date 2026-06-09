# 📝 작업 로그 (Work Log - 2026.06.04)
> **역할:** Doc - 서기 (Scribe)
> **작업 대상:** 바이브코딩 교재 청사진 (`VibeCoding_Textbook_Blueprint.md`) 및 플랫폼 Next.js 이주 계획서 (`VCEP_Nextjs_Migration_Plan.md`)

---

## 1. 📋 작업 개요 (Overview)
- **요청 사항:** 
  1. VCEP 플랫폼 내의 다양한 앱 및 시뮬레이션 게임을 교재에 녹여내고, 툴 사용 중심이 아닌 주체적인 기획 및 문제 해결 중심의 바이브코딩 교재 방향성과 아이디어를 설계.
  2. 플랫폼 자체를 지속해서 관리하고 유지보수하기 위해 기존 단일 HTML 구조를 고수하는 것이 좋은지, 아니면 React/Next.js 구조로 전환하는 것이 좋은지 아키텍처 타당성 검토 및 이주 계획 수립.
- **수행 작업:**
  1. 교재의 교육 철학, 단계별 로드맵(1~4부), 게임 매핑, 평가 루브릭을 포함한 **교재 청사진** 문서화 완료.
  2. 유지보수성, AI 에이전트 협업 효율성, MDX 연동 등을 고려하여 Next.js 구조 전환을 적극 제안하고, 구체적인 **Next.js 이주 계획서(Migration Plan)** 수립 및 저장 완료.

---

## 2. 🛠️ 구현 내용 (Implementation Details)
- **교재 교육과정 매핑:**
  - **도입부:** `prompt_detective.html` (프롬프트 탐정)을 통한 프롬프트 엔지니어링 개념 체득.
  - **모의 훈련:** `vibecoding_sim.html` (바이브코딩 시뮬레이터)을 통한 AI 인턴 '에이든'과의 페어 프로그래밍 및 디버깅 예행연습.
  - **기획 및 빌드:** `app_planner.html`을 통한 PRD 작성 ➔ Gemini Canvas 등의 무설치 툴을 통해 스마트폰 오버유즈 및 멘탈 웰니스 앱 프로토타이핑.
  - **데이터베이스 연동:** Google Apps Script(GAS)를 통한 구글 스프레드시트 클라우드 연동 실습.
  - **에이전틱 개발 및 배포:** Antigravity / Claude Code CLI 환경에서 자율 에이전트 협업 및 Vercel을 통한 원클릭 배포.
  - **상용화 시뮬레이션:** `monster_startup.html` (스타트업 경영)을 연계하여 IT 비즈니스 모델 설계 및 모의 창업 시뮬레이션.
- **교재 원고 집필 현황:**
  - **[NEW]** `content/chapter1_prompt_detective.mdx` 원고 초안 집필 완료. 프롬프트의 3대 핵심 기둥(역할, 맥락, 제약) 설명, 미션 가이드라인, 프롬프트 수사 일지 워크북 시트 및 강사 가이드라인 포함.
  - **[NEW]** 실습용 게임 플레이 캡처본 4종(`detective_intro.png`, `detective_game.png`, `detective_stage1.png`, `detective_wrong.png`)을 원고 내부에 적소 매핑 완료.
  - **[NEW]** (2차 보완): 기존 스크린샷의 구도 및 화질 저하 문제를 극복하기 위해, Playwright 자동화 스크립트(`scratch/capture_screens.js`)를 구축하여 가상 크로미움 브라우저에서 게임을 직접 구동하면서 최적의 해상도(1200x900)와 겹침 버그가 해결된 완벽한 구도의 신규 캡처본 4종을 자동 생성 및 교체 완료함.
- **Next.js 이주 계획 설계:**
  - **폴더 구조 설계:** App Router 기반 라우팅 및 MDX 콘텐츠(/content) 구조 설계.
  - **상태 관리:** `iframe` + `postMessage` 구조를 제거하고 Zustand 전역 스토어를 활용한 데이터 관리 정의.
  - **AI 에이전트 활용 지침:** 기존 레거시 HTML을 React 컴포넌트로 자율 전환하기 위한 리팩토링 프롬프트 템플릿 정의.
- **공식 파트너 연계:** 아크랩스 공식 홈페이지(`https://litt.ly/aklabs`) 정보 포함.

---

## ⚠️ 3. 발생 에러 및 해결 (Error & Resolution)
- **발생 에러 1 (아티팩트 경로):** 
  - `write_to_file` 실행 시 `IsArtifact` 옵션을 `true`로 설정하고 TargetFile을 일반 로컬 경로(`/Users/byunmose/Desktop/.../Docs/Educational_Guide/VibeCoding_Textbook_Blueprint.md`)로 설정하여 도구 파싱 에러 발생.
  - **해결 방안:** 아티팩트용 파일(IsArtifact: true)은 지정된 아티팩트 디렉토리 내에 `vibecoding_textbook_blueprint.md`로 생성하고, 로컬 디렉토리에는 일반 텍스트 문서(IsArtifact: false)로 저장하여 동시 보관 완료.
- **발생 에러 2 (UI 및 404 링크 에러):**
  - **현상 1:** Featured 앱 카드(스마트폰 웰니스 마스터 등)에서 `glass-panel` 및 `hover:bg-white` 스타일이 중복 적용되어 배경이 흰색으로 뒤덮여 글씨가 보이지 않는 현상 발생.
  - **현상 2:** 네비게이션 내 '시뮬레이션', 'GAS' 등 링크 주소에 `/public/apps/...`가 하드코딩되어 정적 렌더링 시 404 에러 발생.
  - **해결 방안:**
    - `page.js`에서 삼항 연산자를 이용해 Featured 카드일 때는 `glass-panel` 및 `hover:bg-white` 클래스가 아예 붙지 않도록 조건부 렌더링으로 수정하여 그라데이션 및 글씨가 정상 노출되도록 조치.
    - Next.js는 `public` 폴더 하위를 루트(`/`) 경로로 바로 서빙하므로, 네비게이션 경로에 포함되었던 `/public` 접두사를 모두 제거하여 404 에러 해결.
- **발생 에러 3 (프롬프트 디텍티브 HUD 레이아웃 겹침 오류):**
  - **현상 1:** `prompt_detective.html` 게임 중 좌측 상단의 "Investigation Progress" 텍스트/타임라인이 "현장 수사 중" 배지 바로 위에 완전하게 겹쳐서 표시됨.
  - **현상 2:** 우측 상단의 "⭐ SCORE: 0" 배지가 "내 수사 프롬프트" 패널의 헤더 제목 텍스트 위에 겹쳐서 일부 텍스트가 가려짐.
  - **현상 3 (추가):** `STAGE 1: 프로필 설계` 등 심문 수사 액션 패널이 열렸을 때, 화면 고정인 `#hud` 배지 바와 타임라인이 액션 패널 내용(임무 프로필 설계 등) 위에 흉하게 포개져 렌더링됨.
  - **해결 방안:**
    - `#hud` 스타일의 정렬 방식을 기존 `justify-content: space-between`에서 `justify-content: flex-start; gap: 16px;`로 수정하여 스코어 배지를 좌측의 수사중 배지 옆으로 안전하게 대피시킴.
    - `#progress-timeline` 타임라인의 top 배치를 기존 `100px`에서 `156px`로 하향 조정하여 두 배지의 아래에 겹치지 않고 정렬되도록 수정 완료.
    - **(2차 보완):** 수사가 시작되어 액션 패널이 켜지는 시점(`showActionPanel`)에 `#hud` 엘리먼트에 `hidden-stage` 클래스를 추가하여 HUD를 완전히 가리고, 수사 단계가 끝나 패널이 닫히는 시점(`submitStage`)에 `hidden-stage`를 제거해 다시 HUD를 복구함으로써 겹침 문제를 구조적으로 완벽히 해결함.

---

## 🎯 4. 다음 단계 제안 (Next Steps)
- **빌드 검증 완료:** 2026-06-04 10:18 기준 `npm run build` 결과 정적 페이지 생성(4/4) 및 빌드 트레이스 수집이 에러 없이 성공(`Compiled successfully`)하였음을 검증 완료했습니다.
- Next.js 기반 로컬 개발 서버 구동 (`npm run dev`) 확인 및 Vercel 실전 배포 테스트 진행.
- **Chapter 2 원고 집필:** AI 인턴 '에이든'과 협업하는 바이브코딩 시뮬레이션(`vibecoding_sim.html` 활용)을 주제로 한 Chapter 2 실습 가이드 및 교사용 수사 일지 기획 및 작성.

---
*© 2026 AK Labs. All rights reserved. [아크랩스 홈페이지](https://litt.ly/aklabs)*

