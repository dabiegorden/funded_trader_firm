/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites(){
        return[
            {
                source: "/api/:path*",
                destination: "http://localhost:5000/api/:path*"
            }
        ]
    },

    reactStrictMode: true,
    images: {
      remotePatterns: [
        {
          protocol: "http",
          hostname: "localhost",
          port: "5000",
          pathname: "/uploads/**",
        },
      ],
    },
    
};

export default nextConfig;
  
  