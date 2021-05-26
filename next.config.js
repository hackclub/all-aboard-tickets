const withMDX = require('@next/mdx')({ extension: /\.mdx?$/ })
module.exports = withMDX({
  pageExtensions: ['js', 'jsx', 'mdx'],
  images: {
    domains: [
      'cloud-16uu33t6r-hack-club-bot.vercel.app',
      'upload.wikimedia.org',
      '261.com',
      'cloud-awp2vjv78-hack-club-bot.vercel.app'
    ]
  }
})
