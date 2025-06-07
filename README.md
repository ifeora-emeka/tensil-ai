# Tensil AI

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Fly.io

This project is configured for deployment on [Fly.io](https://fly.io). Follow these steps to deploy:

### Prerequisites

1. Install the [Fly.io CLI](https://fly.io/docs/hands-on/install-flyctl/)
2. Create a Fly.io account and log in:

   ```bash
   flyctl auth login
   ```

### Initial Deployment

1. Launch your app on Fly.io (this will create the app if it doesn't exist):

   ```bash
   flyctl launch
   ```

2. Or deploy using the existing configuration:

   ```bash
   flyctl deploy
   ```

### Deployment Scripts

For convenience, you can use the provided deployment scripts:

**On Windows:**

```cmd
deploy.bat
```

**On Linux/macOS:**

```bash
chmod +x deploy.sh
./deploy.sh
```

**Using npm:**

```bash
npm run deploy:fly
```

### Useful Fly.io Commands

- View logs: `flyctl logs` or `npm run deploy:fly:logs`
- SSH into your app: `flyctl ssh console` or `npm run deploy:fly:ssh`
- Scale your app: `flyctl scale count 2`
- Check app status: `flyctl status`
- View app info: `flyctl info`

### Configuration

The deployment is configured through:

- `fly.toml` - Main Fly.io configuration
- `Dockerfile` - Container configuration
- `.dockerignore` - Files to exclude from build
- `next.config.ts` - Next.js standalone output configuration

Your app will be available at: `https://tensil-ai.fly.dev`

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
