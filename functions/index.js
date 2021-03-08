const functions = Runtime.getFunctions();
const greetingTaskHandler = require(functions['greeting'].path);
 const collectzip_taskHandler = require(functions['collectzip_task'].path);
 const zip_complet_taskHandler = require(functions['zip_complet_task'].path);
 const confirm_rout_taskHandler = require(functions['confirm_rout_task'].path);
 const yes_noTaksHandler = require(functions['yes_no_task'].path);   
 const agent_transfer_TaskHandler = require(functions['agent_transfer_task'].path);
 const FallbackTaskHandler = require(functions['fallback'].path);
const responseBuilder = require(functions['response_builder'].path);

exports.handler = async (context, event, callback) => {
console.log("index");
   const { CurrentTask } = event;
   const { CurrentTaskConfidence } = event;
   let CurrentConfidencevalue = Number(CurrentTaskConfidence);
   console.log("CurrentTask : "+ CurrentTask +" ,Confidence: " + CurrentTaskConfidence + '\n');
   //if (CurrentConfidencevalue === 1 || CurrentConfidencevalue === 0) {
  //calling task handlers
  switch (CurrentTask) {
      case 'greeting':
      await greetingTaskHandler.greeting(context, event, callback,responseBuilder.RB);
      break;

      case 'yes_no_task':
      console.log("index page case yes_no:");
      await yes_noTaksHandler.yes_no_task(context, event, callback,responseBuilder.RB);
      break;

      case 'collectzip_task':
      await collectzip_taskHandler.collectzip_task(context, event, callback,responseBuilder.RB);
      break;

      case 'zip_complet_task':
      await zip_complet_taskHandler.zip_complet_task(context, event, callback,responseBuilder.RB);
      break;

      case 'confirm_rout_task':
      await confirm_rout_taskHandler.confirm_rout_task(context, event, callback,responseBuilder.RB);
      break;

      case 'agent_transfer_task':
      await agent_transfer_TaskHandler.agent_transfer_task(context, event, callback,responseBuilder.RB);
      break;

    case 'fallback':
      await FallbackTaskHandler.fallback(context, event, callback,responseBuilder.RB);
      break;

  default:
    await FallbackTaskHandler.fallback(context, event, callback,responseBuilder.RB);
    break;
  }
 //}
//  else{
//     console.log("else fallback");
//     await FallbackTaskHandler.fallback(
//     context,
//     event,
//     callback,
//     responseBuilder.RB
//   );}

};