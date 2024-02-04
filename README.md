# Finance APP

## Build Setup

```bash
Foi utilizado na construção e execução do projeto a versão v16.20.2 do Node Rodando na maquina.
Importante verificar se essa é a versão que você possui na sua máquina para que o projeto possa rodar adequadamente.

# Instalar as dependências com Yarn
$ yarn install

# Servidor local da aplicação localhost:3000
$ yarn dev

# Build para produção 
$ yarn build
$ yarn start


## `Tecnologias e padrões`
Para esse projeto utilizamos: NuxtJs 2/ Vue, Vuetify, HTML, SCSS, Padrão BEM CSS, Javascript, Componetização Base e Avançada, Sprites com SVG para atender icones da aplicação.


### `assets`
No diretório assets ficam imagens SVG, fontes e arquivos SCSS que são usados pela aplicação como um todo.

### `components`
Na pasta components ficam os componentes Vue. Dentro dela possui a pasta Base, onde são colocados os componentes que atendem a aplicação em diversos cenários
e por estarem em um único local facilitam a manutenção e atualização de toda aplicação. Fora da pasta Base a ideia é criar os componentes mais específicos que
muitas vezes utilizam o componente Base ou até outro componente mais específico dentro dele.

### `layouts`
A pasta layout contém as partes que fazem parte de uma definição de página que geralmente pouco se altera, onde contém layouts específicos para alguns casos
como Tela de Login, Principal.


### `pages`
Nesta pasta ficam as páginas da aplicação onde todos os componentes e estruturação acontece para atender a aplicação.

### `store`
A pasta store possui todos os arquivos da Vuex, onde acontece a criação das funções Actions para buscar, salvar dados e controlar
todo estado da aplicação.
