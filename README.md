# 🎄 Bota de Navidad - Wishlist App

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## ✨ Características

- 🎅 Perfiles personalizados con foto
- 🎁 Lista de regalos con URLs
- 🎨 Información personalizada (tallas, colores favoritos, etc.)
- 🔒 Protección con contraseña
- 📱 Diseño responsive y tema navideño
- ☁️ Imágenes en la nube con Cloudinary

## 🗄️ Database Setup (Neon)

This project uses [Neon](https://neon.tech) as a PostgreSQL serverless database.

### Setup Steps:

1. **Create a Neon account**: Go to [https://console.neon.tech](https://console.neon.tech)

2. **Create a new project**: 
   - Click "Create Project"
   - Choose a name (e.g., "bota-navidad")
   - Select a region close to you

3. **Get your connection string**:
   - Copy the connection string from the dashboard
   - It looks like: `postgresql://user:password@ep-xxx.region.aws.neon.tech/neondb?sslmode=require`

4. **Configure environment variables**:
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and add your Neon connection string:
   ```
   DATABASE_URL="your-neon-connection-string"
   ```

5. **Run migrations**:
   ```bash
   npx prisma migrate dev --name init
   ```

6. **Generate Prisma Client**:
   ```bash
   npx prisma generate
   ```

## 📸 Configurar Fotos de Perfil (Cloudinary)

Para habilitar la subida de fotos de perfil, necesitas configurar Cloudinary:

👉 **[Ver guía completa de configuración](./CLOUDINARY_SETUP.md)**

**Resumen rápido:**
1. Crea cuenta gratis en [Cloudinary](https://cloudinary.com)
2. Crea un Upload Preset llamado `ml_default` (unsigned)
3. Agrega tus credenciales al `.env`:
   ```env
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="tu-cloud-name"
   CLOUDINARY_API_KEY="tu-api-key"
   CLOUDINARY_API_SECRET="tu-api-secret"
   ```

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

## 🚀 Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

### Deployment Steps:

1. Push your code to GitHub
2. Import the project in Vercel
3. Add the `DATABASE_URL` environment variable in Vercel project settings
4. Deploy!

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## 📝 Database Schema

The project uses Prisma with two models:
- **Profile**: User profiles
- **WishlistItem**: Wishlist items linked to profiles

## 🔄 Useful Commands

```bash
# Start development server
npm run dev

# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate dev

# Open Prisma Studio (database GUI)
npx prisma studio

# Reset database (⚠️ deletes all data)
npx prisma migrate reset
```
