import { withContentlayer } from 'next-contentlayer'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    if (isServer) {
      console.log('Copying Obsidian assets to `/public/assets`...')
      import('./scripts/copy-vault-assets.js');
      console.log('✅ Success copying Obsidian assets!')
    }

    return config;
  },
  redirects: () => [
    {
      source: '/text-highlight-gpt3',
      destination: '/text-highlight-visualizer',
      permanent: true,
    },
  ],
}

export default withContentlayer(nextConfig)
