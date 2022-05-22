// Supports ES6
import { create, Whatsapp } from 'venom-bot';
const { NlpManager } = require('node-nlp');

const manager = new NlpManager({ languages: ['pt'], forceNER: true });
// Adds the utterances and intents for the NLP

//Treino de saldacao
manager.addDocument('pt', 'bom dia', 'SAUDACAO');
manager.addDocument('pt', 'boa tarde', 'SAUDACAO');
manager.addDocument('pt', 'boa noite', 'SAUDACAO');
manager.addDocument('pt', 'e ae, tudo bem', 'SAUDACAO');
manager.addDocument('pt', 'ola', 'SAUDACAO');
manager.addDocument('pt', 'oi', 'SAUDACAO');
manager.addDocument('pt', 'tudo bom', 'SAUDACAO');

//Treino de localizacao
manager.addDocument('pt', 'fatura', 'FATURA');
manager.addDocument('pt', 'FATURA', 'FATURA');
manager.addDocument('pt', '2 via fatura', 'FATURA');
manager.addDocument('pt', 'via fatura', 'FATURA');

//Teste interno
manager.addDocument('pt', 'TESTEDEBOT', 'TESTEINTERNO');

//Mala Direta
manager.addDocument('pt', 'Olá!Vim pela correspondencia que recebi.Gostaria de mais informções sobre os seus serviços.', 'MALADIRETA');

//Treino Pedido de orçamento
manager.addDocument('pt', 'Gostaria de fazer um site', 'SITE');
manager.addDocument('pt', 'quero fazer um site', 'SITE');
manager.addDocument('pt', 'desejo iniciar um website', 'SITE');

//Fila de espera
manager.addDocument('pt', 'OK', 'ESPERA');
manager.addDocument('pt', 'Ok', 'ESPERA');
manager.addDocument('pt', 'oK', 'ESPERA');





manager.addDocument('pt', 'Gostaria de fazer um cartão de visita', 'CVISITA');
manager.addDocument('pt', 'quero fazer um cartão de visita', 'CVISITA');
manager.addDocument('pt', 'quero fazer um cartao de visita', 'CVISITA');
manager.addDocument('pt', 'desejo fazer um cartao de visita', 'CVISITA');

manager.addDocument('pt', 'Gostaria de fazer uma logomarca', 'LOGOMARCA');
manager.addDocument('pt', 'quero fazer uma logomarca', 'LOGOMARCA');
manager.addDocument('pt', 'quero fazer uma logomarca', 'LOGOMARCA');
manager.addDocument('pt', 'desejo fazer uma logomarca', 'LOGOMARCA');

manager.addDocument('pt', 'quero contratar gerenciamento de redes sociais', 'GRS1');

manager.addDocument('pt', 'quero criar uma marca', 'MARCA');

manager.addDocument('pt', 'desejo iniciar um projeto', 'ORCAMENTO');
manager.addDocument('pt', 'preciso de uma ideia para minha empresa', 'ORCAMENTO');
manager.addDocument('pt', 'não sei oque minha empresa precisa no momento, preciso de ajuda', 'ORCAMENTO');





// Train also the NLG

manager.addAnswer(
    'pt',
    'SITE',
    'Que tipo de WebSite o senhor(a) tem em mente?');
manager.addAnswer(
    'pt',
    'SITE',
    'Já teria alguma ideia?De como gostaria que ficasse seu site?');
manager.addAnswer(
    'pt',
    'SITE',
    'Nossa que legal, Como o senhor(a) quer que fique sua pagina na internet, no caso seu website :)');
manager.addAnswer(
    'pt',
    'CVISITA',
    'Nossa que legal que o senhor tem interesse, Já teria alguma logomarca base?');    
manager.addAnswer(
    'pt',
    'CVISITA',
    'Interressante o senhor(a) já tem uma logo, para usarmos no cartão?');
manager.addAnswer(
    'pt',
    'CVISITA',
    'Primeiro obrigado por escolher a onlynk, Segundo sua empresa ja tem uma logomarca para usarmos como base na criação?');

manager.addAnswer(
  'pt',
  'CVISITA',
  'Olhaa que legal fique feliz:).O senhor teria prefêrencia de cores?Ja teria um exemplo?');

manager.addAnswer(
  'pt',
  'GRD1',
  'Opa Claro. O senhor ja tem  Conta/Pagina criada?Se sim. Me mande o link da Rede Social.');
manager.addAnswer(
  'pt',
  'LOGOMARCA',
  'Uma marca é muito importe para um empre se estabelecer no mercado em que ela atua, então é muito bom o senhor ter interesse em criar uma marca para sua empresa, Vou te passar para uns de nossos atendentes. Aguarde uns instantes.');
manager.addAnswer(
  'pt',
   'SAUDACAO',
    'Olá, sou LYNK assistente virtual. Como posso ajudar?.'
);
manager.addAnswer(
  'pt',
   'SAUDACAO',
    'Olá, sou LYNK, Como posso ajuda-lo(a) hoje?'
);
manager.addAnswer(
  'pt',
   'SAUDACAO',
    'Olá, Meu nome é LYNK. Posso te ajudar?');

manager.addAnswer('pt', 'FATURA', 'Entendi. Já irei enviar sua fatura aguarde um momento.');
manager.addAnswer('pt', 'FATURA', 'Certo, vou conferir aqui e ja te envio');

manager.addAnswer('pt', 'ESPERA', '*O SENHOR(A) ESTÁ AGORA NA FILA DE ESPERA VIRTUAL ONLYNK - (TEMPO MÉDIO DE = 30MINUTOS)');
 


manager.addAnswer(
  'pt',
   'TESTEINTERNO',
    'ESTOU CONECTADA E PRONTA :)');

manager.addAnswer(
    'pt',
    'MALADIRETA',
    'Oie. Meu nome é lynk, Tudo Bom?Que bom que se interessou, Vou Colocar uns de nossos vendedores para falar com o senhor(a). *ENVIE UM ~OK~ PARA CONFIRMAR SEU ATENDIMENTO*');



// Train and save the model.
(async() => {
    await manager.train();
    manager.save();

    create(`LYNK`)
  .then((client) => {
  //EVENTO
    client.onMessage(async(message) => {
    if (message.isGroupMsg === false) {
      const response = await manager.process('pt', message.body.toLowerCase()
      );
      if (response.intent === 'None') {
        client.sendImage(message.from,'C:\Users\gabri\Desktop\BOT-ZAPINT-LYNK\teste.png')
      } else {
        client.sendText(message.from,response.answer)
      }
      console.log('Intencão:',response.intent);
      console.log('Precisão:',response.score);
      
    }
  });
})
  .catch((erro) => {
    console.log(erro);
  });
})();

