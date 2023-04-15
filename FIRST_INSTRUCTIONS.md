## Objetivo

**Desenvolver a aplicação <u>Chat RPG</u>: Rede social para jogadores de RPG de mesa**

_Exemplos_:

Uma rede social para artistas, músicos, ou entusiastas de esportes.
Uma rede social focada numa indústria específica, como médicos, professores ou advogados.
Uma rede social com uma funcionalidade única, como realidade aumentada, ou uma plataforma "voice-only".

## Resultados esperados

### Requisitos

- A rede social deve usar MongoDB como armazenamento.
- A experiência do usuário deve ser de tempo real, ou seja, o conteúdo deve se atualizar em tempo real mesmo que não haja recarregamento de página (por exemplo, um feed de notícias deve se atualizar automaticamente sempre que houver um novo post). Para isso, deve ser usado o sistema Pub/Sub do Redis (no backend) e com Websockets no frontend.
- A implantação da(s) aplicações(s) criada(s) deve ser feita com a utilização de contêineres (Docker) e CI/CD.
- Deve haver um mural de conteúdo (como um feed de notícias) em que o usuário vê o conteúdo mais recente publicado na plataforma.
- O conteúdo publicado pelo usuário deve aceitar comentários e likes de outros usuários.
- Um usuário poderá iniciar grupos de bate-papo com outros usuários da plataforma, removendo e adicionando integrantes.

### Observações

As aplicações criadas podem ser feitas com qualquer tecnologia de seu interesse (Javascript, React, Typescript, Flutter, Node.js, Python, Rust, etc.)
