"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Smartphone,
  Brain,
  Trash2,
  AlertOctagon,
  ShieldCheck,
  Info,
  Code,
  Database,
  ExternalLink,
  Copy,
  Menu,
  X,
  CheckCircle,
  GraduationCap,
  Lightbulb,
  MessageCircle
} from "lucide-react";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedApp, setSelectedApp] = useState(null);
  const [activeTab, setActiveTab] = useState("info");
  const [appCode, setAppCode] = useState("");
  const [gasCode, setGasCode] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  
  // Ref for background close
  const modalRef = useRef(null);

  // VCEP App Data Definition
  const categories = [
    {
      id: "category-1",
      title: "스마트폰 과사용 예방",
      icon: <Smartphone className="w-6 h-6 text-indigo-500" />,
      color: "border-indigo-500",
      apps: [
        {
          key: "master_wellness",
          title: "스마트폰 웰니스 마스터",
          path: "/apps/01_smartphone/smartphone_wellness_master.html",
          gasPath: "/apps/01_smartphone/smartphone_wellness_master.html", // 이 마스터 앱은 자체 iframe 통신을 함
          gasCodePath: "/Docs/GAS/01_Smartphone/Unified_Wellness_Master_GAS.js", // 가상 혹은 실제 경로
          desc: "8개의 기능을 하나로! 우리 팀이 완성한 통합 웰니스 플랫폼을 직접 체험해 보세요. 모든 앱의 데이터를 클라우드(GAS)로 동기화하여 안전하게 보관할 수 있습니다.",
          status: "ready",
          statusText: "통합 완료",
          isFeatured: true,
          iconText: "🏆"
        },
        {
          key: "screen_record",
          title: "스크린타임 기록 앱",
          path: "/apps/01_smartphone/screen_record.html",
          desc: "내 시간을 훔쳐간 앱을 '현상수배범'으로 등록하는 게이미피케이션 기록기입니다. 도둑들의 얄미운 변명을 들어보고, 건강한 미션을 수행하여 시간을 되찾는 '체포 작전'을 경험해 보세요.",
          status: "ready",
          statusText: "배포 완료",
          iconText: "📊"
        },
        {
          key: "pattern_analyzer",
          title: "사용 패턴 분석기",
          path: "/apps/01_smartphone/pattern_analyzer.html",
          desc: "16가지 성격 유형으로 분석하는 '디지털 페르소나' 테스트입니다. 12개의 정교한 문항을 통해 내가 소셜 미디어의 노예인지, 아니면 흔들리지 않는 갓생러인지 확인해 보세요. 입체적인 3D 홀로그램 결과 카드를 수집할 수 있습니다.",
          status: "ready",
          statusText: "배포 완료",
          iconText: "🔍"
        },
        {
          key: "nophone_timer",
          title: "폰 안 보기 타이머",
          path: "/apps/01_smartphone/nophone_timer.html",
          desc: "목표 시간 동안 폰을 보지 않고 집중하는 클래식 타이머입니다. 성공할 때마다 주어지는 보상을 통해 디지털 디톡스 습관을 재미있게 형성할 수 있습니다.",
          status: "ready",
          statusText: "배포 완료",
          iconText: "⏳"
        },
        {
          key: "focus_session",
          title: "반려돌 키우기",
          path: "/apps/01_smartphone/focus_session.html",
          desc: "스마트폰을 내려놓아야만 자라나는 나만의 '반려돌'을 키워보세요. 아주 미세한 움직임도 감지하는 가속도 센서를 통해, 당신의 인내심이 돌에 끼는 '이끼'의 양으로 증명됩니다.",
          status: "ready",
          statusText: "배포 완료",
          iconText: "🪨"
        },
        {
          key: "phonedown_challenge",
          title: "도파민 디톡스 자판기",
          path: "/apps/01_smartphone/phonedown_challenge.html",
          desc: "숏폼의 늪에서 빠져나오고 싶을 때 버튼을 눌러보세요! 현실 세계에서 즐길 수 있는 창의적인 '오프라인 미션'을 자판기처럼 뽑아줍니다. 스마트폰 대신 진짜 세상을 만나는 첫걸음입니다.",
          status: "ready",
          statusText: "배포 완료",
          iconText: "🎰"
        },
        {
          key: "offline_topic",
          title: "시한폭탄 토크",
          path: "/apps/01_smartphone/offline_topic.html",
          desc: "모두가 폰을 내려놓고 대화에 집중하게 만드는 긴장감 넘치는 게임입니다. 흥미진진한 질문이 던져지고, 누군가 폰을 만지는 순간 폭탄이 터지며 패배하게 됩니다. 햅틱 진동과 화려한 폭발 연출을 느껴보세요.",
          status: "ready",
          statusText: "배포 완료",
          iconText: "💣"
        },
        {
          key: "sleep_routine",
          title: "수면 유도 양 떼 목장",
          path: "/apps/01_smartphone/sleep_routine.html",
          desc: "잠들기 전 폰을 내려두게 만드는 평화로운 목장 시뮬레이션입니다. 화면을 터치하지 않아야 양들이 무사히 울타리를 넘을 수 있습니다. ASMR 같은 차분한 분위기 속에서 수면의 질을 높여보세요.",
          status: "ready",
          statusText: "배포 완료",
          iconText: "🐑"
        },
        {
          key: "sleep_correlation",
          title: "오늘의 시간 일기",
          path: "/apps/01_smartphone/sleep_correlation.html",
          desc: "나의 후회와 낭비된 시간을 요정 '포몽이'에게 먹이로 주는 특별한 일기장입니다. 낭비한 시간을 시각화하여 던져 넣고, 폰을 세게 흔들어 소화시킴으로써 홀가분하게 내일을 준비하는 '카타르시스'를 경험해 보세요.",
          status: "ready",
          statusText: "배포 완료",
          iconText: "🕳️"
        }
      ]
    },
    {
      id: "category-2",
      title: "감정 및 정신건강",
      icon: <Brain className="w-6 h-6 text-pink-500" />,
      color: "border-pink-500",
      apps: [
        {
          key: "mental_wellness",
          title: "멘탈 웰니스 마스터",
          path: "/apps/02_mental/mental_wellness_master.html",
          gasCodePath: "/Docs/GAS/02_Mental/Unified_Mental_Wellness_GAS.js",
          desc: "9개의 감정 및 정신건강 기능을 하나로! 우리 팀이 완성한 통합 멘탈 웰니스 플랫폼을 직접 체험해 보세요. 모든 앱의 데이터를 클라우드(GAS)로 동기화하여 안전하게 보관할 수 있습니다.",
          status: "ready",
          statusText: "통합 완료",
          isFeatured: true,
          iconText: "💖",
          customFeaturedClass: "from-sky-500 to-sky-700"
        },
        {
          key: "emotion_weather",
          title: "비밀 잉크와 불꽃",
          path: "/apps/02_mental/secret_ink_fire.html",
          desc: "보이지 않는 투명 잉크로 속마음을 적고, 성냥을 켜서 불꽃으로 내용을 확인하는 신비로운 경험을 제공합니다. 확인한 내용을 비밀 금고에 보관하거나, 종이 모서리부터 타오르는 불꽃 애니메이션과 함께 고민을 재로 만들어 영구적으로 소멸시키며 정서적 정화(Catharsis)를 경험해 보세요.",
          status: "ready",
          statusText: "배포 완료",
          iconText: "🔥"
        },
        {
          key: "emotion_alchemy",
          title: "심해의 파동",
          path: "/apps/02_mental/bioluminescent_fluid.html",
          desc: "복잡한 감정을 빛나는 파동으로 승화시키는 유체 시뮬레이션. 손가락 끝을 따라 소용돌이치는 형광빛 유체를 통해 복잡한 마음을 예술적으로 승화시키고, 정서적 평온을 되찾는 시각적 명상 앱입니다.",
          status: "ready",
          statusText: "배포 완료",
          iconText: "💧"
        },
        {
          key: "anonymous_confession",
          title: "기억의 등불",
          path: "/apps/02_mental/message_lantern.html",
          desc: "말 못 할 진심이나 응원을 등불에 실어 고요한 밤하늘로 띄워 보내세요. 호수 위를 수놓은 다른 이들의 등불을 터치하며 익명의 온기를 나누고, 나 혼자가 아니라는 따뜻한 연결감을 경험하는 시네마틱 힐링 앱입니다.",
          status: "ready",
          statusText: "배포 완료",
          iconText: "🏮"
        },
        {
          key: "help_firststep",
          title: "마음의 등대",
          path: "/apps/02_mental/help_lighthouse.html",
          desc: "한 권의 따뜻한 수채화 동화책을 읽듯, 마음의 안개를 걷어내 보세요. '도움을 구하는 것은 용기 있는 선택'이라는 다정한 응원과 함께, 실전 상담 예약 가이드까지 차근차근 안내해 주는 마음 길잡이 앱입니다.",
          status: "ready",
          statusText: "배포 완료",
          iconText: "⚓"
        },
        {
          key: "empathy_practice",
          title: "다정한 마음 배달부",
          path: "/apps/02_mental/empathy_postman.html",
          desc: "마음 우체국에 도착한 익명의 고민 편지들을 읽고, 가장 따뜻한 공감의 답장을 골라보세요. 상대방의 감정을 헤아리고 올바르게 소통하는 방법을 시나리오 시뮬레이션을 통해 자연스럽게 익히는 공감 교육 앱입니다.",
          status: "ready",
          statusText: "배포 완료",
          iconText: "📮"
        },
        {
          key: "empathy_dialogue",
          title: "공감 대화 연습",
          path: "/apps/02_mental/empathy_dialogue.html",
          desc: "위로가 필요한 친구에게 건넬 공감 표현을 시나리오로 연습합니다. 내 대화 방식에 따라 실시간으로 변하는 상대방의 마음 온도를 확인해 보세요.",
          status: "ready",
          statusText: "배포 완료",
          iconText: "🤝"
        },
        {
          key: "mental_stats",
          title: "정신건강 통계 시각화",
          path: "/apps/02_mental/stat_garden.html",
          desc: "인천 청소년들의 마음 상태를 기상도로 시뮬레이션하는 데이터 정원입니다. 스트레스, 우울감, 수면 수치에 따라 정원의 날씨가 실시간으로 변하는 인터랙티브 시뮬레이션을 체험해 보세요.",
          status: "ready",
          statusText: "배포 완료",
          iconText: "📊"
        },
        {
          key: "resource_map",
          title: "상담 자원 지도",
          path: "/apps/02_mental/resource_map.html",
          desc: "인천광역시 10개 군·구의 상담 자원을 안내하는 보물지도입니다. 인터넷 없이도 작동하는 커스텀 지도를 통해 우리 동네의 청소년상담복지센터와 Wee 센터 정보를 확인하고 바로 전화를 걸 수 있습니다.",
          status: "ready",
          statusText: "배포 완료",
          iconText: "📍"
        }
      ]
    },
    {
      id: "category-3",
      title: "환경 및 쓰레기 문제",
      icon: <Trash2 className="w-6 h-6 text-emerald-500" />,
      color: "border-emerald-500",
      apps: [
        { key: "waste_record", title: "오늘의 쓰레기 기록", desc: "하루 동안 배출한 쓰레기의 종류와 양을 기록합니다.", status: "dev", statusText: "개발 중", iconText: "🗑️" },
        { key: "waste_reduction", title: "쓰레기 줄이기 챌린지", desc: "제로 웨이스트를 목표로 배출량을 점진적으로 줄입니다.", status: "dev", statusText: "개발 중", iconText: "♻️" },
        { key: "barcode_recycling", title: "재활용 판별기", desc: "바코드를 스캔하여 정확한 분리배출 방법을 안내합니다.", status: "dev", statusText: "개발 중", iconText: "🔍" },
        { key: "waste_journey", title: "쓰레기 여정 시각화", desc: "내가 버린 쓰레기가 처리되는 과정을 애니메이션으로 추적합니다.", status: "dev", statusText: "개발 중", iconText: "🛣️" },
        { key: "school_env_challenge", title: "학교 환경 챌린지", desc: "학급별 환경 실천 현황을 기록하고 긍정적인 경쟁을 유도합니다.", status: "dev", statusText: "개발 중", iconText: "🏫" }
      ]
    },
    {
      id: "category-4",
      title: "학교 및 디지털 폭력 예방",
      icon: <AlertOctagon className="w-6 h-6 text-amber-500" />,
      color: "border-amber-500",
      apps: [
        { key: "anonymous_report", title: "익명 신고 앱", desc: "신원 노출 우려 없이 폭력 사실을 안전하게 알립니다.", status: "dev", statusText: "개발 중", iconText: "📢" },
        { key: "help_guide", title: "도움 요청 가이드", desc: "폭력 상황 발생 시 대응 절차와 연락망을 가이드합니다.", status: "dev", statusText: "개발 중", iconText: "📕" },
        { key: "bystander_scenario", title: "방관자 행동 시나리오", desc: "폭력 현장 목격 시 취할 수 있는 최선의 행동을 연습합니다.", status: "dev", statusText: "개발 중", iconText: "🎭" }
      ]
    },
    {
      id: "category-5",
      title: "개인정보 보호 및 프라이버시",
      icon: <ShieldCheck className="w-6 h-6 text-cyan-500" />,
      color: "border-cyan-500",
      apps: [
        { key: "app_permission", title: "앱 권한 점검 가이드", desc: "앱 설치 시 요구되는 권한의 의미와 위험성을 체크합니다.", status: "dev", statusText: "개발 중", iconText: "🛂" },
        { key: "terms_summarizer", title: "이용약관 3줄 요약기", desc: "복잡하고 긴 약관에서 개인정보 관련 핵심만 추출합니다.", status: "dev", statusText: "개발 중", iconText: "📄" },
        { key: "photo_metadata", title: "사진 메타데이터 확인기", desc: "사진에 숨겨진 위치 및 상세 정보가 유출되지 않게 확인합니다.", status: "dev", statusText: "개발 중", iconText: "📸" }
      ]
    }
  ];

  // Open modal and load sources
  const openModal = async (app) => {
    if (app.status === "dev") {
      showToastMessage("준비 중인 프로젝트입니다.");
      return;
    }
    setSelectedApp(app);
    setActiveTab("info");
    setAppCode("로딩 중...");
    setGasCode("로딩 중...");

    // Fetch HTML Source
    try {
      const appRes = await fetch(app.path);
      const appText = await appRes.text();
      setAppCode(appText);
    } catch (err) {
      setAppCode("HTML 코드를 불러오는데 실패했습니다.");
    }

    // Fetch GAS Source if path exists
    if (app.gasCodePath) {
      try {
        const gasRes = await fetch(app.gasCodePath);
        const gasText = await gasRes.text();
        setGasCode(gasText);
      } catch (err) {
        setGasCode("GAS 백엔드 코드가 준비 중이거나 파일을 불러올 수 없습니다.");
      }
    }
  };

  const closeModal = () => {
    setSelectedApp(null);
    setAppCode("");
    setGasCode("");
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      showToastMessage("코드가 클립보드에 복사되었습니다!");
    });
  };

  const copyAskPrompt = () => {
    if (!selectedApp || !appCode) return;
    const prompt = `아래는 HTML 기반의 웹 앱 코드입니다.

[앱 제목]: ${selectedApp.title}
[앱 설명]: ${selectedApp.desc}

[원본 코드]:
${appCode}

---
이 원본 코드를 수정하여 사용자의 아이디어를 구현할 수 있는 새로운 앱으로 완성할 수 있도록 가이드해주세요.

이 앱은 단일 HTML 파일 구조로 만들어져 있으니, 새로운 앱도 반드시 단일 HTML 파일 구조로 완성해 주세요.

질문을 통해 사용자의 의도를 파악하고 현실적으로 실행 가능한 방법을 제안해 주세요.
대화 진행 시 반드시 질문은 한 개씩만 하고, 전체 내용이 질문을 통해 계속해서 이어질 수 있도록 가이드해 주세요.

먼저 사용자에게 첫 번째 질문으로 시작해주세요: 이 앱을 어떤 방향으로 바꾸고 싶으신가요?`;

    navigator.clipboard.writeText(prompt).then(() => {
      showToastMessage("질문하기 프롬프트가 복사되었습니다!");
    });
  };

  const showToastMessage = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage("");
    }, 3000);
  };

  // Close modal when clicking backdrop
  const handleBackdropClick = (e) => {
    if (e.target === modalRef.current) {
      closeModal();
    }
  };

  return (
    <div className="relative min-h-screen">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-xl shadow-xl animate-bounce">
          <CheckCircle className="w-5 h-5 text-emerald-400" />
          <span className="font-semibold text-sm">{toastMessage}</span>
        </div>
      )}

      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center glass-panel">
        <div className="flex items-center gap-2">
          <span className="font-extrabold text-xl tracking-wider text-slate-800">VCEP</span>
        </div>
        <div className="hidden lg:flex items-center gap-6">
          <a href="#" className="font-semibold text-emerald-600 hover:text-emerald-700 transition">홈</a>
          <a href="/apps/03_expert/vibecoding.html" className="font-semibold text-slate-600 hover:text-emerald-600 transition" target="_blank" rel="noopener noreferrer">시뮬레이션</a>
          <a href="/apps/04_gas_crud/gas_hub.html" className="font-semibold text-slate-600 hover:text-emerald-600 transition" target="_blank" rel="noopener noreferrer">GAS</a>
          <a href="/apps/app_planner.html" className="font-semibold text-slate-600 hover:text-emerald-600 transition" target="_blank" rel="noopener noreferrer">앱 플래너</a>
          <a href="/apps/tutorial_hub.html" className="flex items-center gap-1 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-xl font-bold text-sm transition shadow-sm" target="_blank" rel="noopener noreferrer">
            학습 가이드 <GraduationCap className="w-4 h-4" />
          </a>
        </div>
        <button className="lg:hidden text-slate-600" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="lg:hidden fixed top-[69px] left-0 w-full h-[calc(100vh-69px)] bg-white z-30 flex flex-col items-center justify-center gap-6 p-6">
          <a href="#" className="text-xl font-bold text-emerald-600" onClick={() => setIsMenuOpen(false)}>홈</a>
          <a href="/apps/03_expert/vibecoding.html" className="text-xl font-bold text-slate-700" onClick={() => setIsMenuOpen(false)} target="_blank" rel="noopener noreferrer">시뮬레이션</a>
          <a href="/apps/04_gas_crud/gas_hub.html" className="text-xl font-bold text-slate-700" onClick={() => setIsMenuOpen(false)} target="_blank" rel="noopener noreferrer">GAS</a>
          <a href="/apps/app_planner.html" className="text-xl font-bold text-slate-700" onClick={() => setIsMenuOpen(false)} target="_blank" rel="noopener noreferrer">앱 플래너</a>
          <a href="/apps/tutorial_hub.html" className="flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold text-lg" onClick={() => setIsMenuOpen(false)} target="_blank" rel="noopener noreferrer">
            학습 가이드 <GraduationCap className="w-5 h-5" />
          </a>
        </div>
      )}

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <header className="text-center mb-16">
          <div className="inline-block bg-white px-6 py-1.5 rounded-full font-bold text-xs tracking-wider text-indigo-600 shadow-sm border border-slate-100 mb-6">
            VCEP: VIBECODING EDUCATION PROJECT
          </div>
          <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 gradient-text">
            AI Web App Center
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
            청소년의 사회 문제 해결력을 기르는 40가지 AI 웹 애플리케이션 프로젝트 허브
          </p>
        </header>

        {/* Categories Section */}
        {categories.map((category) => (
          <section key={category.id} className="mb-16">
            <div className="flex items-center gap-3 mb-6 pb-2 border-l-4 border-indigo-500 pl-4">
              <div className="p-2 bg-white rounded-xl shadow-sm border border-slate-100">
                {category.icon}
              </div>
              <h2 className="text-2xl font-extrabold text-slate-800">{category.title}</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.apps.map((app) => (
                <div
                  key={app.key}
                  onClick={() => openModal(app)}
                  className={`relative group rounded-3xl p-6 transition-all duration-300 cursor-pointer flex flex-col justify-between hover:-translate-y-2 hover:shadow-lg ${
                    app.isFeatured 
                      ? `md:col-span-2 text-white bg-gradient-to-br ${app.customFeaturedClass || 'from-indigo-600 to-purple-600'} border-none shadow-md hover:opacity-95` 
                      : 'glass-panel hover:bg-white hover:shadow-lg'
                  }`}
                >
                  {app.isFeatured && (
                    <span className="absolute top-6 right-6 bg-white/20 backdrop-blur-md px-3.5 py-1 rounded-full text-[10px] font-extrabold tracking-wider">
                      ALL-IN-ONE
                    </span>
                  )}
                  <div>
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-4 ${
                      app.isFeatured ? 'bg-white/20' : 'bg-indigo-50 text-indigo-600'
                    }`}>
                      {app.iconText}
                    </div>
                    <h3 className={`text-xl font-bold mb-2 ${app.isFeatured ? 'text-white' : 'text-slate-800'}`}>
                      {app.title}
                    </h3>
                    <p className={`text-sm mb-6 ${app.isFeatured ? 'text-white/90' : 'text-slate-500'}`}>
                      {app.desc}
                    </p>
                  </div>
                  <span className={`inline-flex items-center text-xs font-bold px-3 py-1 rounded-full self-start ${
                    app.status === "ready"
                      ? app.isFeatured 
                        ? "bg-white/20 text-white" 
                        : "bg-emerald-100 text-emerald-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}>
                    {app.statusText}
                  </span>
                </div>
              ))}
            </div>
          </section>
        ))}

        {/* Footer */}
        <footer className="text-center py-12 border-t border-slate-200 mt-16 text-slate-500 text-sm font-medium">
          <p className="mb-2">&copy; 2026 VibeCoding Education Project. All rights reserved.</p>
          <p>
            함께 만드는 더 나은 디지털 세상{" "}
            <a href="https://litt.ly/aklabs" target="_blank" rel="noopener noreferrer" className="text-indigo-600 font-bold hover:underline">
              아크랩스
            </a>
          </p>
        </footer>
      </div>

      {/* Modal Popup */}
      {selectedApp && (
        <div 
          ref={modalRef}
          onClick={handleBackdropClick}
          className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div className="bg-white w-full max-w-6xl h-[90vh] rounded-3xl flex flex-col overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-white">
              <h2 className="text-xl font-black text-slate-800">{selectedApp.title}</h2>
              <button 
                onClick={closeModal}
                className="p-1 rounded-full hover:bg-slate-100 transition text-slate-400 hover:text-slate-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
              {/* Left Pane - Iframe Preview */}
              <div className="flex-1 md:flex-[2] bg-slate-50 relative border-r border-slate-100 min-h-[300px] md:min-h-0">
                <iframe 
                  src={selectedApp.path} 
                  className="w-full h-full border-none"
                  title={`${selectedApp.title} 미리보기`}
                />
              </div>

              {/* Right Pane - Info & Code tabs */}
              <div className="flex-1 flex flex-col bg-white">
                <div className="flex border-b border-slate-100">
                  <button 
                    onClick={() => setActiveTab("info")}
                    className={`flex-1 py-4 font-bold text-sm flex items-center justify-center gap-1.5 border-b-2 transition ${
                      activeTab === "info" 
                        ? "text-indigo-600 border-indigo-600 bg-indigo-50/10" 
                        : "text-slate-500 border-transparent hover:text-slate-700"
                    }`}
                  >
                    <Info className="w-4 h-4" /> 설명
                  </button>
                  <button 
                    onClick={() => setActiveTab("code")}
                    className={`flex-1 py-4 font-bold text-sm flex items-center justify-center gap-1.5 border-b-2 transition ${
                      activeTab === "code" 
                        ? "text-indigo-600 border-indigo-600 bg-indigo-50/10" 
                        : "text-slate-500 border-transparent hover:text-slate-700"
                    }`}
                  >
                    <Code className="w-4 h-4" /> 코드
                  </button>
                  {selectedApp.gasCodePath && (
                    <button 
                      onClick={() => setActiveTab("gas")}
                      className={`flex-1 py-4 font-bold text-sm flex items-center justify-center gap-1.5 border-b-2 transition ${
                        activeTab === "gas" 
                          ? "text-indigo-600 border-indigo-600 bg-indigo-50/10" 
                          : "text-slate-500 border-transparent hover:text-slate-700"
                      }`}
                    >
                      <Database className="w-4 h-4" /> GAS
                    </button>
                  )}
                </div>

                {/* Tab Contents */}
                <div className="flex-1 overflow-y-auto p-6">
                  {activeTab === "info" && (
                    <div className="h-full flex flex-col justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-slate-800 mb-2">{selectedApp.title}</h3>
                        <p className="text-sm text-slate-500 leading-relaxed">{selectedApp.desc}</p>
                      </div>
                      <div className="flex flex-col gap-2 mt-8">
                        <button
                          onClick={() => window.open(selectedApp.path, "_blank")}
                          className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-2xl shadow-sm transition text-sm"
                        >
                          새 창에서 열기 <ExternalLink className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => window.open("/apps/app_planner.html", "_blank")}
                          className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-2xl shadow-sm transition text-sm"
                        >
                          기획하기 <Lightbulb className="w-4 h-4" />
                        </button>
                        <button
                          onClick={copyAskPrompt}
                          className="w-full flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-700 text-white font-bold py-3 rounded-2xl shadow-sm transition text-sm"
                        >
                          질문하기 <MessageCircle className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}

                  {activeTab === "code" && (
                    <div className="h-full flex flex-col">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-xs font-bold text-slate-400">HTML/JS SOURCE</span>
                        <button 
                          onClick={() => copyToClipboard(appCode)}
                          className="flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-700"
                        >
                          <Copy className="w-3.5 h-3.5" /> 복사하기
                        </button>
                      </div>
                      <pre className="flex-1 bg-slate-900 text-slate-200 p-4 rounded-xl font-mono text-[11px] overflow-auto whitespace-pre-wrap select-all leading-relaxed">
                        {appCode}
                      </pre>
                    </div>
                  )}

                  {activeTab === "gas" && (
                    <div className="h-full flex flex-col">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs font-bold text-slate-400">GAS (BACKEND) SOURCE</span>
                        <button 
                          onClick={() => copyToClipboard(gasCode)}
                          className="flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-700"
                        >
                          <Copy className="w-3.5 h-3.5" /> 복사하기
                        </button>
                      </div>
                      <p className="text-[10px] text-slate-400 mb-3">
                        구글 앱스 스크립트에 붙여넣어 클라우드 저장소를 구축할 수 있는 코드입니다.
                      </p>
                      <pre className="flex-1 bg-slate-900 text-slate-200 p-4 rounded-xl font-mono text-[11px] overflow-auto whitespace-pre-wrap select-all leading-relaxed">
                        {gasCode}
                      </pre>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
