# TCC_GPS - Sistema de Rastreamento por GPS

## Resumo do Projeto

O projeto **TCC_GPS** é um sistema completo de rastreamento de ativos móveis em tempo real, utilizando tecnologia GPS. Este sistema foi desenvolvido como parte de um Trabalho de Conclusão de Curso (TCC).

O sistema é composto por um backend que lida com a coleta, processamento e armazenamento dos dados, e um frontend que permite a visualização e interação com as informações geoespaciais de forma intuitiva.

## Tecnologias Utilizadas

### Backend
- **[Node.js](https://nodejs.org/):** Plataforma para desenvolvimento do servidor e das APIs RESTful.
- **[Express](https://expressjs.com/):** Framework web para construção das rotas e controle de requisições.
- **[MongoDB](https://www.mongodb.com/):** Banco de dados NoSQL para armazenamento de dados geoespaciais e de usuários.
- **[Mongoose](https://mongoosejs.com/):** Modelagem de dados em MongoDB para manipulação de documentos.
- **[Socket.io](https://socket.io/):** Comunicação em tempo real para transmissão de dados de localização instantânea.
- **[JWT (JSON Web Tokens)](https://jwt.io/):** Autenticação e autorização segura dos usuários.

### Frontend
- **[React.js](https://reactjs.org/):** Biblioteca JavaScript para construção de interfaces de usuário dinâmicas e interativas.
- **[Leaflet](https://leafletjs.com/):** Biblioteca JavaScript para criação de mapas interativos e visualização de dados de GPS.
- **[Axios](https://axios-http.com/):** Cliente HTTP para comunicação entre o frontend e o backend.

## Estrutura de Pastas

```markdown
├── backend
│   ├── src
│   │   ├── config          # Configurações do servidor e banco de dados
│   │   ├── controllers     # Lógica de controle e endpoints da API
│   │   ├── models          # Modelos de dados para MongoDB
│   │   ├── routes          # Definição das rotas da API
│   │   ├── services        # Serviços auxiliares (e.g., envio de emails, integração com APIs externas)
│   │   └── utils           # Funções utilitárias e middleware
│   ├── tests               # Testes unitários e de integração
│   ├── Dockerfile          # Dockerfile para containerização do backend
│   └── README.md           # Documentação do backend
├── frontend
│   ├── public              # Arquivos públicos estáticos
│   ├── src
│   │   ├── components      # Componentes React reutilizáveis
│   │   ├── pages           # Páginas da aplicação
│   │   ├── services        # Comunicação com a API (e.g., via Axios)
│   │   └── styles          # Estilos CSS
│   ├── Dockerfile          # Dockerfile para containerização do frontend
│   └── README.md           # Documentação do frontend
├── docker-compose.yml      # Configuração Docker para desenvolvimento
└── README.md               # Documentação geral do projeto
