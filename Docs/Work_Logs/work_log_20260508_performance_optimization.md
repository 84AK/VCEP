# 작업 로그 (Work Log) - 2026-05-08

## 📝 작업 개요
- **날짜:** 2026년 5월 8일
- **담당:** 해결사 (Solver), 작업자 (Worker), 서기 (Scribe)
- **주제:** 앱 성능 최적화 및 CPU 점유율 감소 작업

## 🔍 문제 분석
사용자로부터 `monster_startup.html`과 `prompt_practice.html` 실행 시 CPU 사용량이 급증하고 시스템이 느려진다는 리포트를 받음.

1. **Monster Startup 앱:**
   - `setInterval`을 이용해 0.5초마다 모든 이미지의 픽셀을 전수 조사하여 배경을 투명하게 만드는 로직이 무한 반복됨.
   - 이미 처리가 완료된 이미지에 대해서도 DOM 탐색 및 조건문 체크가 빈번하게 발생하여 CPU 부하 유발.

2. **Prompt Mastery 앱:**
   - 고사양 디자인 트렌드인 Glassmorphism을 구현하기 위해 `backdrop-filter: blur(20px)`를 다수의 패널에 중첩 적용.
   - 브라우저의 실시간 렌더링 부하가 GPU 및 CPU에 집중됨.

## 🛠 해결 내용

### 1. Monster Startup 성능 개선
- **기존:** `setInterval(() => { ... }, 500)` 방식을 사용.
- **수정:** 
    - `setInterval`을 제거하고 `MutationObserver`를 도입.
    - DOM에 새로운 요소가 추가될 때만 감지하여 `makeTransparent` 함수를 실행하도록 변경.
    - 초기 로드 시 `document.querySelectorAll`을 통해 기존 요소들을 1회 처리.
    - 이를 통해 불필요한 무한 루프 연산을 제거하고 이벤트 기반으로 최적화함.

### 2. Prompt Mastery 성능 개선
- **기존:** `blur(20px)`의 강한 블러 효과를 다수의 Glass 패널에 적용.
- **수정:**
    - `backdrop-filter: blur(12px)`로 블러 강도를 조정하여 시각적 효과는 유지하면서 연산량 감소.
    - CSS에 `will-change: backdrop-filter`, `will-change: transform` 속성을 추가하여 브라우저의 하드웨어 가속(Layer 분리)을 유도.
    - 앰비언트 라이트 효과의 블러 값을 `50px`에서 `40px`로 최적화.

## ✅ 결과 확인
- 두 앱 모두 시각적 퀄리티를 유지하면서도 시스템 자원 사용량이 대폭 감소함.
- `monster_startup.html`의 경우, 자바스크립트 실행 시간이 이벤트 발생 시로 국한되어 대기 상태에서의 CPU 점유율이 거의 0%에 수렴하게 됨.

---
**기록자:** 서기 (Scribe)
**참고 링크:** [아크랩스 홈페이지](https://litt.ly/aklabs)
