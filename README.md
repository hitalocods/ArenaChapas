# Arena Os Chapas

Sistema web para reservas online da Arena Os Chapas, com landing page responsiva, fluxo de agendamento, painel administrativo e integração com Firebase.

## Stack

- React + Vite
- Tailwind CSS
- Framer Motion
- Lucide React
- Firebase Authentication
- Firestore Database
- Firebase Hosting

## Como rodar localmente

Instale as dependências:

```bash
npm install
```

Crie o arquivo `.env` a partir do exemplo:

```bash
cp .env.example .env
```

Preencha as variáveis do Firebase no `.env`:

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_FIREBASE_MEASUREMENT_ID=
VITE_ADMIN_EMAIL=
VITE_WHATSAPP_NUMBER=
```

Inicie o projeto:

```bash
npm run dev
```

Site local:

```txt
http://127.0.0.1:5173/
```

Admin local:

```txt
http://127.0.0.1:5173/#admin
```

## Admin

O painel admin usa Firebase Authentication com e-mail e senha.

No Firebase Console:

1. Acesse Authentication.
2. Ative o provedor Email/senha.
3. Crie um usuário com o mesmo e-mail definido em `VITE_ADMIN_EMAIL`.

Somente esse e-mail consegue ler e alterar reservas no Firestore.

## Banco de dados

Collections usadas:

- `reservas`
- `clientes`

Quando um cliente faz uma reserva, o sistema cria:

- um documento em `reservas`
- um documento em `clientes`

O status inicial da reserva é:

```txt
reservado
```

Status possíveis:

- `disponivel`
- `reservado`
- `confirmado`

## Regras do Firestore

As regras estão em:

```txt
firestore.rules
```

Para publicar as regras:

```bash
npx firebase-tools deploy --only firestore:rules
```

## Build

```bash
npm run build
```

## Deploy no Firebase Hosting

Configure o projeto Firebase em `.firebaserc`, depois rode:

```bash
npm run deploy
```

Ou diretamente:

```bash
npx firebase-tools deploy --only hosting
```

## Links do projeto publicado

Site:

```txt
https://arenachapas-de41d.web.app/
```

Admin:

```txt
https://arenachapas-de41d.web.app/#admin
```
