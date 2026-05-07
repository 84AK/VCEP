# 🚀 Vercel Deployment & Environment Variables Guide

이 가이드는 프로젝트를 Vercel에 안전하게 배포하고, 노션 토큰을 환경 변수로 설정하는 방법을 설명합니다.

---

## 1. Vercel 배포 단계 (Deployment)

1. **GitHub Push**: 로컬의 모든 코드(특히 `api/` 폴더와 `vercel.json`)를 깃허브 저장소에 푸시합니다.
2. **Vercel Import**: [Vercel Dashboard](https://vercel.com/dashboard)에서 `Add New` -> `Project`를 클릭하고 해당 깃허브 저장소를 가져옵니다(Import).
3. **Deploy**: 별도의 설정 없이 `Deploy` 버튼을 누릅니다.

---

## 2. 환경 변수 설정 (Critical Security)

배포가 완료되면(또는 배포 중에) 다음 과정을 반드시 수행해야 피드백 기능이 작동합니다.

### 설정 순서
1. Vercel 프로젝트 페이지 진입 -> **Settings** 탭 클릭.
2. 좌측 메뉴의 **Environment Variables** 클릭.
3. 아래 표의 내용을 하나씩 입력하고 **Add** 버튼을 누릅니다.

| Key | Value (내용) | 설명 |
| :--- | :--- | :--- |
| `NOTION_TOKEN` | `secret_...` | 노션에서 발급받은 시크릿 토큰 전체 |
| `NOTION_DATABASE_ID` | `359e562546d5801a9565ece697df574c` | 제공된 피드백 DB ID |

4. 모든 변수를 추가한 후 상단의 **Deployments** 탭으로 가서, 가장 최근 배포의 `...` 버튼을 눌러 **Redeploy**를 실행합니다. (환경 변수 적용을 위해 재배포가 필요합니다.)

---

## 3. 작동 확인 (Verification)

1. 배포된 사이트 주소로 접속합니다.
2. 우측 하단의 **"의견 보내기"** 버튼을 클릭합니다.
3. 테스트 메시지를 입력하고 전송합니다.
4. 본인의 **노션 데이터베이스**에 데이터가 실시간으로 들어오는지 확인합니다!

---

## 4. 다른 앱에 재사용하기

새로운 앱을 만들 때 AI에게 이렇게 요청하세요:
> "Docs/REUSABLE_NOTION_FEEDBACK_GUIDE.md의 서버리스 아키텍처를 참고해서 내 앱에 피드백 시스템을 넣어줘. `api/feedback.js`와 `vercel.json`을 활용하고, 토큰은 환경 변수로 처리하도록 설계해줘."

---
*Updated by Antigravity Architect - 2026.05.07 (Vercel Specialized)*
*Link: [아크랩스 홈페이지](https://litt.ly/aklabs)*
