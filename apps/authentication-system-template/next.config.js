/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		esmExternals: "loose",
	},
	reactStrictMode: false,
};

module.exports = nextConfig;
