# VCEP 프로젝트 개발 에이전트 지침서 (AGENT.md)

이 문서는 VCEP(VibeCoding Education Project)의 앱 개발 표준 아키텍처와 프로세스를 정의합니다. 향후 새로운 카테고리(환경, 사이버 불링 등)의 앱을 개발할 때 이 표준을 엄격히 준수하여 일관성 있는 결과물을 도출해야 합니다.

---

## 1. 프로젝트 핵심 구조 (Core Architecture)

VCEP 프로젝트는 **중앙 대시보드(Hub)**와 **개별 미니 앱(Mini Apps)**, 그리고 **클라우드 백엔드(GAS)**의 3계층 구조로 이루어집니다.

### 1.1 개별 앱 구조 (App Structure)
- **기술 스택**: HTML5, Vanilla JavaScript, CSS3 (2026 트렌드: Glassmorphism 2.0).
- **데이터 처리 (중요)**: 
  - **직접적인 GAS 연동 금지**: 개별 앱 내부에는 `fetch`를 통한 GAS URL 호출 코드를 작성하지 않습니다.
  - **브릿지 통신**: `localStorage`에 데이터를 저장함과 동시에, 반드시 `window.parent.postMessage`를 호출하여 부모 창(`index.html`)으로 데이터를 전송합니다. 
  - **네임스페이스**: `localStorage` 키는 반드시 `vcep_` 접두사를 사용 (예: `vcep_petrock_data`).
- **창의적 기획 (VCEP 철학)**: 단순히 텍스트를 나열하는 기능적 앱이 아니라, 해당 앱의 **문제(Problem)를 해결하기 위한 창의적이고 재미있는 방법**(센서 활용, 게임화, 시각적 반전 등)을 반드시 포함해야 합니다.

### 1.2 중앙 대시보드 (`index.html`)
- **앱 등록**: `apps` 배열에 앱 정보를 객체 형태로 추가.
- **모달 시스템**: Iframe을 통해 앱을 로드합니다.
- **GAS 탭 표시 규칙**: 
  - **대표 앱(Master Hub)**인 경우에만 모달 창에 `GAS Code` 탭을 노출합니다.
  - 개별 미니 앱은 `Preview` 탭만 제공하여 학생들의 혼란을 방지합니다.
- **데이터 수신**: `message` 이벤트를 리스너를 통해 하위 앱으로부터 데이터를 받아 `GAS_URL`로 전송.

### 1.3 백엔드 (`GAS/Unified_Wellness_Master_GAS.js`)
- 모든 앱은 단 하나의 GAS 엔드포인트를 공유.
- `AppKey`를 기반으로 구글 시트 내의 시트 이름(한글)을 동적으로 매핑하여 저장.

---

## 2. 개발 프로세스 표준 (Standard Workflow)

새로운 앱 카테고리를 개발할 때는 다음 5단계를 거칩니다.

### 2.1 기획 단계 (Planning)
- **도구**: `apps/app_planner.html` 활용.
- **결과물**: PRD(Product Requirement Document) 수준의 상세 기획서 생성.
- **저장 위치**: `Docs/PRD/[카테고리명]/PRD_[앱이름].md`

### 2.2 개발 단계 (Coding)
- **디자인 원칙**: Bento Grid, Glassmorphism, Native CSS Nesting 적용.
- **프롬프트 전략**: `tutorial_hub.html`에 정의된 **'마스터 프롬프트'** 형식을 사용하여 Gemini에게 코드 작성을 요청.
- **동기화 구현**: 반드시 `postMessage` 브릿지 코드를 포함하여 대시보드 연동 확인.

### 2.3 통합 단계 (Integration)
- `index.html`의 `apps` 데이터 섹션에 새 앱 정보 추가.
- `GAS_PATH` 필드에 해당 앱의 GAS 코드가 담긴 `.md` 파일 경로 지정.

### 2.4 가이드 제작 단계 (Documentation)
- `apps/tutorial_hub.html`의 `tutorials` 객체에 새 앱 데이터 추가.
- **필수 항목**: 모든 입력 필드 정답지, 마스터 프롬프트, 예상 문제 대처법, 발전 아이디어.

---

## 3. 기술적 체크리스트 (Technical Checklist)

- [ ] 앱이 단일 HTML 파일로 실행 가능한가?
- [ ] `localStorage` 저장 기능이 정상 작동하는가?
- [ ] `window.parent.postMessage` 호출 코드가 포함되었는가?
- [ ] `index.html` 모달에서 앱이 깨지지 않고 로드되는가?
- [ ] GAS 탭에 해당 앱의 백엔드 코드가 정상적으로 표시되는가?
- [ ] 튜토리얼 허브에 '정답 가이드'가 등록되었는가?

---

## 4. 향후 확장 가이드 (Expansion Guide)

다음 카테고리 개발 시 이 `AGENT.md`를 첫 번째 참고 문서로 사용하십시오.

- **예시 카테고리**: `02_Environment`, `03_CyberBullying`, `04_Privacy`
- **구조적 일관성**: 아이콘 스타일, 버튼 크기, 컬러 시스템(Variable 사용)을 `index.css`에 정의된 토큰에 맞추어 개발하십시오.

---

**작성일**: 2026년 5월 1일
**작성자**: VCEP 개발 팀 (에이전트)
**참고**: [아크랩스 홈페이지](https://litt.ly/aklabs)
