/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {


      protocol:'https',
      hostname:'ecommerce.routemisr.com',
      pathname:'/Route-Academy-*/**'
  

  
      },
    ],
  },

}

module.exports = nextConfig;