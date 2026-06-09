/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // public/apps 하위의 정적 HTML 파일을 직접 서빙하기 위해 별도의 특수 설정은 필요하지 않으나,
  // 향후 MDX 도입 시 여기에 설정을 추가할 수 있습니다.
};

export default nextConfig;
