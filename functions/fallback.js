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

    //   case 'check_name_task':
    //     if(Memory.check_name_task_counter === undefined)
    //       Remember.check_name_task_counter = 1;
    //     else 
    //       Remember.check_name_task_counter = parseInt(Memory.check_name_task_counter) + 1;
  
    //     if(Memory.check_name_task_counter >= 2) 
    //      Redirect ="task://agent_transfer";  
    //     else{
    //     Say = "I did not understand.";
    //     Redirect ="task://check_name_task";
    //     }
    //   break;  

    //   case 'ZipOrSSN_Task':
    //     if(Memory.ZipOrSSN_Task_counter === undefined)
    //       Remember.ZipOrSSN_Task_counter = 1;
    //     else 
    //        Remember.ZipOrSSN_Task_counter = parseInt(Memory.ZipOrSSN_Task_counter) + 1;
  
    //     if(Memory.ZipOrSSN_Task_counter >= 1) 
    //       Redirect ="task://agent_transfer"; 
    //     else{
    //       Say = "I did not understand.";
    //       Redirect ="task://ZipOrSSN_Taks";
    //     }
    //   break;  
  
      default:
        //Redirect ="task://agent_transfer_task";
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