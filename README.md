# Getting Started Desafio Blog Framework



## `FRONT-END`
sera disponibilidado ja compilado na pasta `build` do projeto.

## INSTALAÇÃO
Pegar o conteudo da pasta build e rodar em algum servidor apache.




## `BACK-END`
sera disponibilidado um arquivo `.jar` na raiz do projeto, 

## INSTALAÇÂO
para rodar basta apenas ir na pasta onde se enontra o `.jar` e abrir um propt de comandos e rodar o seguinte comando `java -jar {nome do .JAR}`

## DIRETORIO DAS IMAGENS
as imagens esta sendo salva em um caminho fixo `C://imagens`, criar o diretorio.

## BANCO DE DADOS

As configurações estão padrao segue abaixo: 

spring.database.driverClassName=org.postgresql.Driver
spring.datasource.url=jdbc:postgresql://localhost:5432/fmw_db
spring.datasource.username=postgres
spring.datasource.password=root

precisa de um banco de dados `POSTGRES` rodadando na porta `5432` o banco sera criado automatico assim que a aplicação startar.

Apos o banco criado segue abaixo os scripts para crialçao do usuario admin:   
`insert into sys_usuario (usu_id, usu_email, usu_nome, usu_senha, usu_status, usu_login)
values(1, 'admin@teste.com', 'Admin da Silva', '$2a$10$OtBaZ2fLMKDRhFS0NH154e9xnLWquO9vUouuxPhtVmZAv9ZtbL4I2', 1, 'admin') `

OBS: `A senha está sendo salva com BASE64` porem ao logar usuario é `admin` e a senha é `admin`.








