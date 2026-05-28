# Next.js 미니멀 보일러플레이트

Next.js 16 + NextAuth v5 + Prisma v7 + shadcn/ui 기반 미니멀 인증 스타터.
tRPC 없이 server actions만 사용. 이메일/비밀번호 + Google OAuth 지원.

## 스택

- **Next.js 16** — App Router, server actions, React 19
- **NextAuth v5** — JWT 세션, Credentials + Google OAuth
- **Prisma v7** — PostgreSQL ORM (Neon 무료 티어 호환), PrismaPg 어댑터
- **shadcn/ui v4** — Tailwind v4 기반 컴포넌트
- **bcryptjs** — 비밀번호 해싱
- **Zod v4** — 입력 검증

## 5분 셋업

### 1. 클론 및 의존성 설치

```bash
git clone <repo-url> my-app
cd my-app
npm install
```

> `npm install` 실행 시 `postinstall`이 자동으로 `prisma generate`를 실행합니다.

### 2. 환경변수 설정

```bash
cp .env.example .env
```

`.env` 파일을 열고 값을 채운다:

| 변수 | 방법 |
|------|------|
| `DATABASE_URL` | [Neon](https://neon.tech) → 새 프로젝트 → Connection string 복사 |
| `NEXTAUTH_SECRET` | 터미널에서 `openssl rand -base64 32` 실행 |
| `GOOGLE_CLIENT_ID` | [Google Cloud Console](https://console.cloud.google.com) → OAuth 2.0 Client IDs |
| `GOOGLE_CLIENT_SECRET` | 위와 동일 |

Google OAuth 설정 시 Authorized redirect URI:
- 개발: `http://localhost:3000/api/auth/callback/google`
- 프로덕션: `https://yourdomain.com/api/auth/callback/google`

### 3. DB 스키마 적용

```bash
npx prisma db push
```

### 4. 개발 서버 실행

```bash
npm run dev
```

→ http://localhost:3000

## Vercel 배포

1. GitHub에 push
2. Vercel에서 새 프로젝트로 import
3. Environment Variables에 `.env` 내용 추가
4. Deploy

`npm run build` 시 `postinstall`이 자동으로 `prisma generate`를 실행합니다.

> **Note:** Vercel에서 빌드가 실패하면 **Build Command**를 `npm run build`로,
> **Install Command**를 `npm install` (기본값)으로 설정하세요.

## 프로젝트 구조

```
src/
  app/
    (auth)/login/        # 로그인 페이지 → URL: /login
    (auth)/register/     # 회원가입 페이지 → URL: /register
    (dashboard)/         # 보호된 라우트 → URL: /dashboard
    api/auth/[...nextauth]/  # NextAuth 핸들러
  components/ui/         # shadcn 컴포넌트
  lib/
    auth.ts              # NextAuth 설정
    db.ts                # Prisma 싱글턴 (PrismaPg 어댑터)
    validations.ts       # Zod 스키마
  server/actions/auth.ts # register / login server actions
middleware.ts            # /dashboard 라우트 보호
prisma/schema.prisma     # DB 스키마
prisma.config.ts         # Prisma v7 설정 (마이그레이션용 DB URL)
```

## 테스트

```bash
npm test          # 전체 테스트 실행 (18개)
npm run test:watch  # watch 모드
```

## 범위 밖 (의도적으로 제외)

- 결제 / 구독
- 팀 / 멀티테넌시
- 비밀번호 재설정 이메일
- 회원가입 인증 이메일
- 기업 SSO (SAML/LDAP)
