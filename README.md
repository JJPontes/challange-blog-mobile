# challange-blog-mobile

Aplicativo mobile (React Native + Expo) para um blog escolar — desafio técnico.

## Descrição

Projeto de exemplo para criação, listagem e edição de posts via API REST.

## Requisitos

- Node.js
- Yarn ou npm
- Expo CLI
- Android Studio (para emulador AVD) ou um dispositivo Android

## Instalação

1. Instale dependências:

```bash
yarn install
# ou
npm install
```

2. Copie o arquivo de exemplo de variáveis de ambiente e ajuste conforme necessário:

```bash
cp .env.example .env
# Edite .env (API_URL, etc.)
```

## Configurar acesso à API (desenvolvimento)

O projeto usa `API_URL` do `.env` (importado via `@env`). Há um fallback automático:

- Emulador Android (AVD): use `http://10.0.2.2:3001/` (o emulador acessa o host da máquina por esse IP).
- Emulador iOS / dispositivo desktop: `http://localhost:3001/`.
- Dispositivo físico Android: use o IP da sua máquina na rede, por exemplo `http://192.168.1.42:3001/`.

Comandos úteis:

- Encaminhar porta para o emulador Android (quando necessário):

```bash
adb reverse tcp:3001 tcp:3001
```

- Rodar Expo em modo tunnel (útil se o dispositivo não estiver na mesma rede):

```bash
yarn start --tunnel
# ou
expo start --tunnel
```

## Variáveis de ambiente

Edite o `API_URL` em `.env` para apontar para sua API local ou remota. Exemplo em `.env.example`:

```
API_URL=http://localhost:3001/
API_TIMEOUT=10000
```

Para dispositivos físicos, substitua por `http://<SEU_IP>:3001/`.

## Executando o app

- Iniciar o Metro/Expo DevTools:

```bash
yarn start
# ou
npm run start
```

- Abrir no emulador Android:

```bash
yarn android
# ou
expo start --android
```

- Abrir no dispositivo físico: leia o QR do Expo Go (usuário deve selecionar `Connection: LAN` ou `Tunnel` conforme a rede).

## Troubleshooting

- Se o app não consegue alcançar a API no emulador Android, confirme se o servidor está rodando e use `10.0.2.2` como host.
- Se estiver usando Expo Go e problemas de rede, tente `adb reverse` ou `--tunnel`.
- Verifique firewalls e se o servidor backend aceita conexões externas.

## Contribuição

Pull requests são bem-vindos. Para mudanças de API/variáveis de ambiente, atualize `.env.example` também.

---

Se quiser, eu também posso:

- configurar `.env` para diferentes perfis (dev/prod),
- adicionar instruções em inglês,
- ou incluir badges e comandos CI.

# challange-blog-mobile

Aplicativo mobile (React Native + Expo) para um blog escolar — desafio técnico.

## Descrição

Projeto de exemplo para criação, listagem e edição de posts via API REST.

## Requisitos

- Node.js
- Yarn ou npm
- Expo CLI
- Android Studio (para emulador AVD) ou um dispositivo Android

## Instalação

1. Instale dependências:

```bash
yarn install
# ou
npm install
```

2. Copie o arquivo de exemplo de variáveis de ambiente e ajuste conforme necessário:

```bash
cp .env.example .env
# Edite .env (API_URL, etc.)
```

## Configurar acesso à API (desenvolvimento)

O projeto usa `API_URL` do `.env` (importado via `@env`). Há um fallback automático:

Emulador Android (AVD): use `http://10.0.2.2:3001/` (o emulador acessa o host da máquina por esse IP).

- Emulador iOS / dispositivo desktop: `http://localhost:3001/`.
  Emulador iOS / dispositivo desktop: `http://localhost:3001/`.
- Dispositivo físico Android: use o IP da sua máquina na rede, por exemplo `http://192.168.1.42:3001/`.
  Dispositivo físico Android: use o IP da sua máquina na rede, por exemplo `http://192.168.1.42:3001/`.

Comandos úteis:

- Encaminhar porta para o emulador Android (quando necessário):

```bash
adb reverse tcp:3001 tcp:3001
```

- Rodar Expo em modo tunnel (útil se o dispositivo não estiver na mesma rede):

```bash
yarn start --tunnel
# ou
expo start --tunnel
```

## Variáveis de ambiente

Edite o `API_URL` em `.env` para apontar para sua API local ou remota. Exemplo em `.env.example`:

```
API_URL=http://localhost:3001/
API_TIMEOUT=10000
```

Para dispositivos físicos, substitua por `http://<SEU_IP>:3000/`.
Para dispositivos físicos, substitua por `http://<SEU_IP>:3001/`.

## Executando o app

- Iniciar o Metro/Expo DevTools:

```bash
yarn start
# ou
npm run start
```

- Abrir no emulador Android:

```bash
yarn android
# ou
expo start --android
```

- Abrir no dispositivo físico: leia o QR do Expo Go (usuário deve selecionar `Connection: LAN` ou `Tunnel` conforme a rede).

## Troubleshooting

- Se o app não consegue alcançar a API no emulador Android, confirme se o servidor está rodando e use `10.0.2.2` como host.
- Se estiver usando Expo Go e problemas de rede, tente `adb reverse` ou `--tunnel`.
- Verifique firewalls e se o servidor backend aceita conexões externas.

## Contribuição

Pull requests são bem-vindos. Para mudanças de API/variáveis de ambiente, atualize `.env.example` também.

---

Se quiser, eu também posso:

- configurar `.env` para diferentes perfis (dev/prod),
- adicionar instruções em inglês,
- ou incluir badges e comandos CI.
