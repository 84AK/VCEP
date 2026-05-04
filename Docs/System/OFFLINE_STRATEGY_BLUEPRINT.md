# 📡 인터넷/Wi-Fi 없는 환경 대응 전략 (Blueprint)

이 문서는 인터넷 연결이 불가능한 교실 환경에서도 바이브코딩(VibeCoding) 프로젝트를 원활하게 실행하기 위한 기술적 대응 전략을 정의합니다.

## 1. 외부 라이브러리 로컬화 (Resource Localization)
*   **Tailwind CSS:** 현재의 CDN 방식에서 로컬 `assets/css/tailwind.min.css`로 전환하여 외부 통신 제거.
*   **Fonts:** Google Fonts 등 외부 폰트 리소스를 다운로드하여 `assets/fonts/`에 저장하고 CSS `@font-face`로 직접 연결.
*   **Icons:** Font Awesome 등 외부 아이콘 라이브러리를 로컬 SVG 또는 웹폰트 패키지로 교체.

## 2. 로컬 서버 구축 전략 (Local Server Architecture)
*   **Host-Client 구조:** 선생님의 컴퓨터를 메인 서버로 활용.
*   **서버 구동:** `npx serve` 또는 `python3 -m http.server`를 통해 프로젝트 폴더를 로컬 네트워크에 호스팅.
*   **네트워크 접속:** 동일한 공유기(Wi-Fi)에 접속한 학생들이 선생님 컴퓨터의 로컬 IP(예: `http://192.168.0.10:5000`)를 입력하여 접속.
*   **배포 패키지:** 인터넷이 아예 없는 상황을 대비하여 전체 프로젝트를 실행 파일 형태나 압축 패키지로 배포하여 각자 로컬에서 실행 가능하도록 준비.

## 3. 데이터 지속성 (Offline Persistence)
*   **LocalStorage 활용:** 모든 실습 데이터 및 사용자 설정은 브라우저의 `localStorage`에 즉시 저장하여 세션이 끊겨도 데이터 유지.
*   **JSON Export/Import:** 인터넷이 없는 상태에서 작업한 내용을 `.json` 파일로 내보내기 하여 선생님께 제출하거나, 나중에 다시 불러올 수 있는 기능 구현.

## 4. 비상용 네트워크 (Emergency Network)
*   인터넷 공유기가 없는 경우, 선생님의 스마트폰 핫스팟을 이용해 교실 내 폐쇄형 로컬 네트워크(LAN) 형성 후 서버 접속 유도.

---
**건축가(Architect)의 제언:**  
*"오프라인 대응의 핵심은 '의존성 제거'입니다. 모든 리소스가 프로젝트 폴더 내에 존재할 때, 우리의 교육 앱은 장소와 환경에 구애받지 않는 강력한 도구가 됩니다."*

---
**기록일:** 2026년 5월 3일  
**작성자:** 건축가(Architect) & 서기(Scribe)  
**참고:** [아크랩스 홈페이지](https://litt.ly/aklabs)
