# Configurações inicias
* Solicitar ao gestor do Égide as seguintes informações
	* Número do Anydesk para acesso ao equipamento. 
	* Ativar a loja no painel administrativo 
	* Login da loja
	* Senha da API
	* Se a integração é **normal** ou **preço promocional**
> Lembrando que o acesso ao equipamento do cliente é supervisionado e agendado com o cliente. Uma vez recebido o aval do Gestor do Égide para iniciar o processo, o mesmo deve ser tratado como prioridade, evitando deixar o cliente aguardando ou interrupções durante a implantação.
> Também é importante ao iniciar o acesso remoto enviar via chat do AnyDesk uma mensagem de saudação ao cliente, informando que você um analista de suporte do Égide, que acessou o equipamento para instalar a integração, com prazo para conclusão de 20 a 30 minutos. 
O símbolo $ indica que o texto deve ser digitado no prompt em aberto.
O Símbolo # indica que se trata de um comentário explicativo e não deve ser digitado no prompt.

 
### Install Chocolatey 
 * Abrir o Windows Power Shell como administrador

~~~
$ Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
~~~
- Caso  seja executado com sucesso, execute a instalação do Node.JS e do Git pelo mesmo prompt do Power Shell através dos comandos abaixo. 
~~~
$ choco install -y nodejs --version=16.4.0
$ choco install -y git.install
~~~
- Caso a instalação do Chocolatey falhe, é preciso realizar a instalação manual dos pacotes Node.JS e Git, baixando e instalando os pacotes através dos links abaixo
	- Windows 64 Bits
		- <https://nodejs.org/download/release/v13.14.0/node-v13.14.0-x64.msi>
		- <https://github.com/git-for-windows/git/releases/download/v2.37.2.windows.2/Git-2.37.2.2-64-bit.exe>
	- Windows 32 Bits
		- <https://nodejs.org/download/release/v13.14.0/node-v13.14.0-x86.msi>
		- <https://github.com/git-for-windows/git/releases/download/v2.37.2.windows.2/Git-2.37.2.2-32-bit.exe>
* Ao final das instalações o Power Shell pode ser fechado. 

### Local e ambiente de instalação
* Abrir o Windows Explorer e criar a pasta **c:\Egide**. Sem acentos
* Localize a pasta de instalação do sistema. Geralmente **c:\farmaxWIN** 
	* Se não encontrar, verifique o local correto no atalho do programa no desktop. 
* Abrir o Programa **IBExpert.exe**
	* Se o programa **IBExpert.exe** não estiver instalado, usar o programa alternativo **Flame Robin**
		* Versão 64Bits -> <https://github.com/mariuz/flamerobin/releases/download/0.9.3.12/flamerobin-0.9.3.1bd8c1ac-setup-x64.exe>
		* Versão 32Bits -> <https://github.com/mariuz/flamerobin/releases/download/0.9.3.12/flamerobin-0.9.3.1bd8c1ac-setup.exe>
* Acesso as informações usando o **IBExpert.exe**
	* Localizar a base de dados do programa, identificada pelo nome  **LOJA**
	*  Clicar com o botão direito, escolher a opção  **Database registration info**
		* Anotar as informações dos campos *Server*, *Server name* e *Database File*
	* Clicar no botão **Query Editor (F12)**, Apagar qualquer comando existente que esteja no histórico do Query Editor, digitar a consulta abaixo e executar pelo botão de play **Execute (F9)**
~~~
select * from parametros
~~~
> Anotar o **Código da Filial**, na primeira coluna do resultado exibido.


### Instalar app de integração e configurar arquivos de parametrização
* Abrir o Windows Explorer e localizar a pasta **c:\Egide**
* Clicar com o botão direito na pasta, escolher a opção **Git Bash Here**
* No prompt que se abre digite os 2 comandos abaixo
~~~
$ git clone https://github.com/camim-apps/egide-firebird.git .
$ npm install
~~~
* Copiar e editar o arquivo .env.example para .env na pasta **c:\Egide**
~~~
$ cp .env.example .env
$ nano .env
~~~
* No Editor que se abre insira as informações de USERNAME e PASSWORD recebidas anteriormente. 

| Parâmetro | Valor esperado |
| :-------- | :------------- |
| INTEGRATION_URL | https://integration.egidesaude.com.br |
| INTEGRATION_USERNAME | Usuário recebido do gestor do Égide |
| INTEGRATION_PASSWORD | Senha recebida do gestor do Égide |
| PLUGIN | Nome do Sistema local. Padrão **farmax** |


* Para salvar pressionar CRLT X, depois Y para confirmar  e por fim ENTER para sobreescrever o arquivo

* Copiar e editaro arquivo .env.example para .env que está dentro da src/plugins/farmax
~~~
$ cp src/plugins/farmax/.env.example src/plugins/farmax/.env
$ nano src/plugins/farmax/.env
~~~
* No Editor que se abre altere as informações conforme abaixo

| Parâmetro | Valor esperado |
| :-------- | :------------ |
| DB_HOST | Usar informação anotada do campo SERVER NAME |
| DB_USER | SYSDBA (manter o maiúsculo) |
| DB_PASSWORD | masterkey |
| DB_DATABASE | Informação anota do campo DATABASE FILE entre aspas duplas. Padrão **"C:\FarmaxWIN\Farmax.FDB"** |
| ONLY_PROMOTIONS | Para integração somente de **Preço Promocional** setar variável para **true**. Padrão é **false** |
| ONLY_FULL_PRICE | Para integração somente com o **Preço Cheio** (sem promoção), setar variável para **true**. Padrão é **false** |

> Sempre que a integração for do tipo **Preço Promocional** o banco padrão é **matriz.FDB**. O id loja é verificado no banco local, mas os dados do banco apontam para o banco matriz.

### Instalar o PM2

~~~
$ npm i -g pm2
~~~

### Criar o banco local

~~~
$ npm run db:migrate
~~~

### Extrair os dados

~~~
$ npm run extract
~~~
> O log ao final do processo agora exibe além do total de produtos a quantidade de produtos com valor maior que R$ 0,00. Essa informação é importante para os clientes de **Preço Promocional**. Se o total for igual ou próximo a zero é possível que tenha ocorrido um erro na configuração do banco. 

### Upload da primeira carga para o Égide

~~~
$ npm run upload
~~~

### Rodar o app

~~~
$ npm start
~~~

### Adicionar ao Iniciar

* Criar um link para o start.bat e renomear para Egide
* Ir no executar e digitar: shell:common startup
* Arrastar o arquivo egide para a pasta de inicialização
