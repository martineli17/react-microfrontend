# Microfrontend

##### Existem algumas maneiras de implementar o frontend de maneira separada:
  - Podemos utilizar o iFrame do próprio HTML
  - Existe também frameworks específicos para isso, como por exemplo o [Single SPA](https://single-spa.js.org/)
  - Há o Module Federation, que permite expor componentes remotamente.
  
##### Neste exemplo, foi criada uma pequena arquitetura microfrontend, utilizando o Module Federation como ferramenta para expor os componentes de maneira remota.
##### Além disso, foi utilizado o Docker para publicar as aplicações e Nginx para controlar qual microfrontend deverá ser executado através da rota informada.

## Setup
1. Em cada uma das aplicações, é necessário instalar o webpack nas aplicações React, pois é através dele que a configuração do Module Federation é realizada.
  - ``` yarn add webpack webpack-cli webpack-dev-server babel-loader html-webpack-plugin ```
  - Caso inicie com TypeScript, adicionar também ``` yarn add ts-loader ```
2. Adicionar a variável de ambiente ``` PUBLIC_URL ``` informando qual a rota pública. Isso será útil quando o Nginx é configurado. Nesse exemplo, o Nginx foi configurado em um ambiente docker.
3. Criar o arquivo ``` nginx.conf ``` para cada aplicação, informando as configurações a serem informadas pelo Nginx.

## Configurações do webpack
##### Neste exemplo, foi utilizado um webpack específico para ambiente de produção e um específico para desenvolvimento. Sendo assim, é possível informar qual arquivo de configuração será utilizado no momento de executar a aplicação.
  - [Exemplo: seção de scripts](https://github.com/martineli17/react-microfrontend/blob/master/main/package.json)
##### Algumas configurações do webpack que envolvem o Module Federation para microfrontend são:
![image](https://user-images.githubusercontent.com/50757499/221724743-46ddc2cf-6f87-4f85-b301-259135ceae7b.png)

1. ``` entry: "./src/index.ts" ``` : corresponde ao arquivo inicial a aplicação
2. ``` devServer: { port: 3000 } ```: corresponde a qual porta a aplicação será executada
3. Seção de plugins
  - ``` shared ```: corresponde à dependências que serão compartilhadas entre cada aplicação, ou seja, se houver 3 aplicações microfrontend e elas tem a mesma dependência, essa dependência será compartilhada
  - ``` name: "Main" ```: corresponde ao nome que será informado quando outra aplicação acessar o servidor remotamente e solicitar os componentes
  - ``` filename: "moduleEntry.js" ```: corresponde ao nome do arquivo que será apresentado quando solicitar as informações ao servidor
  - ``` exposes: { "./": "./src/index.ts" } ```: corresponde aos componentes que deverão ser disponibilizados remotamente e qual será a rota de acesso
  - ``` remotes: { PrimaryApp: `App01@http://localhost:3001/moduleEntry.js` } ```: corresponde aos componentes externos que serão utilizados na aplicação. 
    - O nome 'App01' é nome que a outra aplicação inseriu no campo 'name'
    - O nome 'PrimaryApp' vai ser o caminho do modulo a ser acessado dentro da aplicação para utilizar esse componente externo
    ![image](https://user-images.githubusercontent.com/50757499/221725633-1eacb422-a12a-478f-b0c9-3e464126a412.png)

## Utilização dos componentes externos
##### Vale ressaltar que, como os componentes são acessados de um servidor externo, corre o risco deste servidor está indisponível naquele momento. Sendo assim, é bom fazer um tratamento para tal situação.
##### Dentro desse cenário, nesse exemplo quando houver algum erro ao buscar o componente, retorna outro componente de erro.
[Exemplo de utilização](https://github.com/martineli17/react-microfrontend/blob/master/main/src/App.tsx)

