# Challenge Blog Mobile

Aplicativo móvel desenvolvido com React Native e Expo para gerenciamento de um blog escolar. Este projeto faz parte de um desafio técnico e demonstra conceitos de autenticação, consumo de API REST, controle de acesso por perfil (Role-Based Access Control) e internacionalização.

## 🚀 Tecnologias e Bibliotecas

O projeto utiliza uma stack moderna baseada em **Expo** e **React Native**.

*   **Core**: [React Native](https://reactnative.dev/), [Expo](https://expo.dev/) (SDK 54), [TypeScript](https://www.typescriptlang.org/)
*   **Navegação**: [React Navigation 7](https://reactnavigation.org/) (Native Stack) e [Expo Router](https://docs.expo.dev/router/introduction/)
*   **Estilização**: [NativeWind](https://www.nativewind.dev/) (Tailwind CSS) v4
*   **Gerenciamento de Estado/Auth**: React Context API
*   **Comunicação com API**: [Axios](https://axios-http.com/)
*   **Armazenamento Local**:
    *   `expo-secure-store` (para tokens sensíveis)
    *   `@react-native-async-storage` (para dados de usuário não sensíveis)
*   **Formulários**: [Formik](https://formik.org/) e [Yup](https://github.com/jquense/yup) (validação)
*   **Internacionalização (i18n)**: `i18next`, `react-i18next` (Suporte a PT-BR e EN)
*   **UI/Icons**: Phosphor React Native

## ✨ Funcionalidades

*   **Autenticação**: Login com JWT.
*   **Gestão de Sessão**: Persistência de login automático e Logout.
*   **Controle de Acesso (RBAC)**:
    *   **Todos usuários logados**: Visualizar e ler posts.
    *   **Teacher (Professor)**: Criar e editar postagens.
    *   **Coordinator (Coordenador)**: Gerenciar usuários (criar e editar usuários).
*   **Listagens**: Posts com paginação (scroll infinito ou botões) e filtro.
*   **Internacionalização**: Suporte a múltiplos idiomas configurado.

## 🛠️ Pré-requisitos

*   Node.js (LTS recomendado)
*   Yarn ou npm
*   Configuração de ambiente para React Native (Android Studio/Emulador ou Expo Go no celular física)

## ⚙️ Configuração e Instalação

1.  **Clone o repositório** e acesse a pasta:
    ```bash
    git clone <URL_DO_REPOSITORIO>
    cd challange-blog-mobile
    ```

2.  **Instale as dependências**:
    ```bash
    yarn install
    # ou
    npm install
    ```

3.  **Configuração de Variáveis de Ambiente**:
    Crie um arquivo `.env` na raiz do projeto (copie de `.env.example` se existir) com as seguintes chaves:

    ```properties
    API_URL=http://seuiservidor:3001
    API_TIMEOUT=10000
    ```

    > **⚠️ Atenção (Desenvolvimento):** O arquivo `src/lib/axios/api.ts` possui uma lógica que pode sobrescrever a `API_URL` para `localhost` (iOS) ou `192.168...` (Android) quando em modo `__DEV__`. Verifique este arquivo se tiver problemas de conexão.

## ▶️ Executando o Projeto

Para iniciar o servidor de desenvolvimento do Expo:

```bash
yarn start
```

Opções adicionais:

*   **Android**: `yarn android` (ou pressione `a` no terminal do Metro)
*   **iOS**: `yarn ios` (apenas macOS)
*   **Web**: `yarn web`

## 📂 Estrutura do Projeto

```
src/
├── app/              # Entry point e configuração do Expo Router/Layout
├── assets/           # Imagens e recursos estáticos
├── components/       # Componentes reutilizáveis (botões, cards, headers, inputs)
├── config/           # Configurações gerais
├── constants/        # Constantes (rotas, chaves de API, etc.)
├── contexts/         # Context API (AuthContext para estado do usuário)
├── hooks/            # Custom hooks
├── layout/           # Componentes estruturais de layout (BaseLayout)
├── lib/              # Configuração de libs externas (Axios instance)
├── page/             # Telas da aplicação (Posts, Login, Users, etc.)
├── router/           # Configuração de navegação (Stack Navigator, Guardas de rota)
├── services/         # Camada de serviço para chamadas à API
├── styles/           # Configuração de temas e estilos globais (NativeWind)
├── types/            # Definições de tipos TypeScript
└── utils/            # Utilitários (formatação de data, i18n, secureStore)
```

## 🐛 Troubleshooting

*   **Erro de conexão com API**: Verifique se o backend está rodando na porta correta (padrão 3001). Se estiver usando emulador Android, lembre-se que `localhost` refere-se ao próprio emulador; use `10.0.2.2` ou o IP da sua máquina.
*   **Estilos não aplicando (NativeWind)**: Executar com `--clear` pode ajudar a limpar cache do Metro bundler: `yarn start --clear`.
