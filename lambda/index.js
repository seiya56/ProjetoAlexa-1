/* *
 * This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
 * Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
 * session persistence, api calls, and more.
 * */
const Alexa = require('ask-sdk-core');

const LaunchRequestHandler = {

    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest'
    },
    
    handle(handlerInput) {
        const speakOutput = 'Universidade Rodrigues. Compromisso para a vida toda. Você poderá acessar o seu calendário de aulas, o boletim de notas, horário do seu coordenador e mais. O que você gostaria?';
        
        return handlerInput.responseBuilder
        .speak(speakOutput)
        .reprompt(speakOutput)
        .getResponse();
    
    }
};


const AulaIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AulasIntent';
    },
    
    handle(handlerInput) {
       
        const parDiaSemana =handlerInput.requestEnvelope.request.intent.slots.diaSemana.value;
        let speakOutput = 'não entendi. pode repitir?';
       
        switch(parDiaSemana){
            
            case "hoje":
                speakOutput = "Hoje você tem aula de Orientação a Objeto, das 18:30 às 22:10";
            break;
            
            case "ontem": 
                speakOutput = "Ontem você teve aula de gerênciaamento de software, das 18:45 às 22 horas";
            break;
            
            case "amanhã":
                speakOutput= "Amanhã você terá aula de arquitetura e infraestrutura em núvem";
            break;

            case "2ª":case"2.ª-feira":
                speakOutput = "Segunda você terá aula de matemática das 18 às 22 horas";
            break;
            
            case "3ª":case "3.ª feira": case"terça": case"terça feira":
                 speakOutput = "terça você terá aula de web design das 19 às 22 horas";
            break;
            
            case "4ª": case "4.ª feira":
                speakOutput = "quarta você terá aula de infraestrutura de rede das 17 ás 20 horas";
            break;
                
            case "5ª": case"5.ª feira":
                speakOutput = "quinta você terá aula de excel das 18 às 20:30 horas";
            break;
                
            case "6ª": case "6.ª":case"6.ª feira":
            speakOutput="sexta você terá aula de lógica das 15 às 19 horas";
            break;
            
            case "sábado": case "domingo":
            speakOutput="você não possue aulas marcadas neste dia";
            break; 
        }
    
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
    
};



const NotasIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'NotasIntent';
    },
    handle(handlerInput) {
        const notaAva = Math.floor(Math.random() * 11);;
        const notaProv = Math.floor(Math.random() * 11);;
        const notaProj = Math.floor(Math.random() * 11);;
        
        const notaFinal = (notaAva+notaProv+notaProj)/3;

        const speakOutput = `As notas são definidas das seguinte forma: avaliações, provas e projeto somadas e divididas por três totalizando a sua nota final. Sua nota de avaliação é ${notaAva}, Sua nota de prova é ${notaProv}, Sua nota de Projeto é de ${notaProj}. Sua nota final e de ${notaFinal.toFixed(2)} `;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const HorarioCoordenadorIntentHandler = {
    canHandle(handlerInput){
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
        && Alexa.getIntentName(handlerInput.requestEnvelope) === 'HorarioCoordenadorIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Seu coordenador está disponível de segunda a quinta, a partir das 15:00 horas na unidade Maracanã';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};



const HelloWorldIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'HelloWorldIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Hello World!';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt(speakOutput)
            .getResponse();
    }
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'You can say hello to me! How can I help?';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = 'Goodbye!';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
/* *
 * FallbackIntent triggers when a customer says something that doesn’t map to any intents in your skill
 * It must also be defined in the language model (if the locale supports it)
 * This handler can be safely added but will be ingnored in locales that do not support it yet 
 * */
const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Sorry, I don\'t know about that. Please try again.';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
/* *
 * SessionEndedRequest notifies that a session was ended. This handler will be triggered when a currently open 
 * session is closed for one of the following reasons: 1) The user says "exit" or "quit". 2) The user does not 
 * respond or says something that does not match an intent defined in your voice model. 3) An error occurs 
 * */
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`);
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse(); // notice we send an empty response
    }
};
/* *
 * The intent reflector is used for interaction model testing and debugging.
 * It will simply repeat the intent the user said. You can create custom handlers for your intents 
 * by defining them above, then also adding them to the request handler chain below 
 * */
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};
/**
 * Generic error handling to capture any syntax or routing errors. If you receive an error
 * stating the request handler chain is not found, you have not implemented a handler for
 * the intent being invoked or included it in the skill builder below 
 * */
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        const speakOutput = 'Sorry, I had trouble doing what you asked. Please try again.';
        console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

/**
 * This handler acts as the entry point for your skill, routing all request and response
 * payloads to the handlers above. Make sure any new handlers or interceptors you've
 * defined are included below. The order matters - they're processed top to bottom 
 * */
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        HelloWorldIntentHandler,
        AulaIntentHandler,
        NotasIntentHandler,
        HorarioCoordenadorIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler)
    .addErrorHandlers(
        ErrorHandler)
    .withCustomUserAgent('sample/hello-world/v1.2')
    .lambda();