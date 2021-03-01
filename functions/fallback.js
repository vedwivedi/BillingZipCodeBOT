const axios = require('axios');
// This is your new function. To start, set the name and path on the left.

exports.fallback =async function(context, event, callback,RB) {
  try {
  let Listen = false;
  let Remember = {};
  let Collect = false;
  let Tasks = false;
  let Redirect = false;
  let Handoff = false;
  let Say = "";
    const Memory = JSON.parse(event.Memory);

    console.log("Question:" +Memory.question);
    switch ( Memory.question ) {
      case 'greeting':
        if(Memory.greeting_Counter >= 2) {
          Redirect = "task://agent_transfer_task";  
        }
        else{
            Say = "I did not understand.";
            Redirect = "task://greeting";
        }
      break;
      case 'collectzip_task':
        if(Memory.collectzip_task_Counter >= 2) {
          Redirect = "task://agent_transfer_task";  
        }
        else{
            
            Say = "I did not understand.";
            Redirect = "task://collectzip_task";
        }
      break;

      default:
        if(Memory.greeting_Counter >= 2) {
          Redirect = "task://agent_transfer_task";  
        }
        else{
            Say = "I did not understand.";
            Redirect = "task://greeting";
        }
    break;
    }

   RB(Say, Listen, Remember, Collect, Tasks, Redirect, Handoff, callback);
  
} catch (error) {
  console.error(error);
  callback( error);
  }
};