import "../styles/globals.css";

export const metadata = {
  title: "VibeCoding Education Project - VCEP",
  description: "AI 기반 교육용 웹앱 40개 프로젝트 허브",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Outfit:wght@500;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased min-h-screen text-slate-800 bg-slate-50 font-sans">
        {children}
      </body>
    </html>
  );
}
