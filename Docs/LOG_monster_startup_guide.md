# 작업 로그: 마왕군 스타트업 게임 가이드 제작
**날짜:** 2026-05-05
**담당:** 서기(Doc) & 건축가(Architect) & 디자이너(UI Polish)

## 1. 작업 개요
- **목적:** 'Monster Startup' 게임의 방법과 단계별 학습 내용을 설명하는 HTML 기반 슬라이드 가이드 제작.
- **대상 파일:** 
    - `apps/03_expert/monster_startup_guide.html` (신규 생성)
    - `apps/03_expert/monster_startup.html` (수정 - 링크 추가)
    - `apps/tutorial_hub.html` (수정 - 카드 추가)

## 2. 주요 구현 내용
### 2.1. 디자인 컨셉
- **Evil Tech & Pixel Art:** 기존 게임의 다크 모드와 픽셀 아트 스타일을 유지.
- **Bento Grid:** 정보를 박스 형태로 배치하는 2026년 최신 웹 디자인 트렌드 적용.
- **Glassmorphism 2.0:** 반투명 유리 효과와 깊이감 있는 그림자로 프리미엄한 느낌 구현.

### 2.2. 슬라이드 구성 (총 8개)
1. **Intro:** 게임 타이틀 및 비서 에이든(AIDEN) 소개.
2. **Overview:** 시나리오 및 기획 미션 개요 설명.
3. **How to Play:** 게임의 4단계 프로세스 가이드.
4. **Learning Quest 1-2:** 문제 정의(Pain Point)와 컨셉 수립의 중요성.
5. **Learning Quest 3-4:** 타겟 분석(Persona)과 핵심 기능(MVP) 선정 전략.
6. **Learning Quest 5-6:** UI/UX 설계와 최종 설득 전략.
7. **Outcome:** 완성된 PRD 예시 및 기획 가이드 요약.
8. **Conclusion:** 게임 시작을 위한 CTA(Call to Action).

## 3. 발생 이슈 및 해결 (Solver)
- **이슈 1:** `write_to_file` 도구 사용 시 `IsArtifact` 옵션 오남용으로 인한 경로 오류.
    - **해결:** 워크스페이스 내 프로젝트 파일 생성을 위해 `IsArtifact: false`로 설정하여 재시도.
- **이슈 2:** `monster_startup.html`의 내비게이션 바 수정 시 공백/경로 불일치로 인한 교체 실패.
    - **해결:** `grep_search`와 `view_file`을 통해 정확한 코드 스니펫을 확인한 후, 전체 div 블록을 타겟팅하여 수정 성공.
- **이슈 3:** 가이드 슬라이드의 폰트 및 아이콘 크기가 작아 가독성이 떨어짐.
    - **해결:** 주요 카드 제목(0.7rem -> 1rem), 본문(1rem -> 1.2rem), 인트로 문구 및 CORE FLOW 아이콘 크기를 상향 조정하여 가독성 개선.
- **이슈 4:** '태업 중'이라는 표현이 어색함.
    - **해결:** '사기를 잃고 통제 불능 상태', '기강 해이' 등 게임 세계관에 더 몰입할 수 있는 표현으로 가이드 및 게임 본문 일괄 수정.

## 4. 향후 참고 사항
- 가이드 내에 사용된 캐릭터 에셋은 `apps/03_expert/assets/` 경로를 참조함.
- `tutorial_hub.html`에 추가된 카드는 다른 웰니스 앱들과 달리 'Expert' 뱃지가 붙어 있으며 강조된 스타일을 가짐.

---
**기록 완료:** 아크랩스 (https://litt.ly/aklabs)
