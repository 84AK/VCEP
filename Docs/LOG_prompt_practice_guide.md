# 작업 로그: 프롬프트 엔지니어링 마스터 가이드 제작
**날짜:** 2026-05-05
**담당:** 서기(Doc) & 건축가(Architect) & 디자이너(UI Polish)

## 1. 작업 개요
- **목적:** '철벽 AI의 마음을 녹여라!(Prompt Practice)' 게임의 핵심 프롬프트 기술을 설명하는 감성형 가이드 슬라이드 제작.
- **대상 파일:** 
    - `apps/03_expert/prompt_practice_guide.html` (신규 생성)
    - `apps/03_expert/prompt_practice.html` (수정 - 인트로 가이드 버튼 추가)
    - `apps/tutorial_hub.html` (수정 - 카드 추가)

## 2. 주요 구현 내용
### 2.1. 디자인 컨셉
- **Emotional Tech & Glassmorphism:** `prompt_practice.html`의 로즈(`--accent-love: #fb7185`) 및 인디고(`--accent-primary: #818cf8`) 그라데이션 반영.
- **Atmospheric Visuals:** 배경 앰비언트 라이트 효과와 부드러운 글래스모피즘 2.0 디자인 적용.
- **Bento Grid:** 정보의 위계에 따른 세련된 박스 배치.

### 2.2. 슬라이드 구성 (총 8개)
1. **Intro:** AI의 마음을 녹이는 프롬프트 엔지니어링 코스 소개.
2. **Goal:** 호감도 100% 달성을 위한 목표 및 학습 포인트(RCTF, Few-shot, Temp, Negative) 요약.
3. **Stage 1 (RCTF):** Role, Context, Task, Format을 통한 페르소나 주입 기술.
4. **Stage 2 (Few-shot):** 예시 데이터를 통한 AI 패턴 학습 기술.
5. **Stage 3 (Temperature):** 답변의 창의성과 감정의 온도를 조절하는 기술.
6. **Stage 4 (Negative):** 금기어 설정을 통한 오해 방지 및 제약 조건 기술.
7. **Evaluation:** 품질에 따른 등급 시스템(S~F) 및 최종 평가 리포트 안내.
8. **CTA:** 게임 시작 버튼.

## 3. 핵심 수정 사항 (Refinement)
- **일관성 확보:** 게임 원본의 폰트('Noto Sans KR', 'Outfit')와 컬러 변수를 완벽히 이식하여 사용자 경험 통일.
- **가독성 최적화:** 복잡한 기술 용어를 연애 시나리오에 빗대어 쉽게 설명하고, 예시 프롬프트 블록을 추가하여 이해도 증진.

## 4. 향후 참고 사항
- 전문가 과정(Expert Mission) 카드는 로즈/핑크 테마로 설정하여 다른 전문가 과정들과 시각적으로 구분(파란색: 시뮬레이터, 빨간색: 마왕군).

---
**기록 완료:** 아크랩스 (https://litt.ly/aklabs)
