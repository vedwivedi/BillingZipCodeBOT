exports.confirm_rout_task =async function(context, event, callback,RB) {
  try {
    let Listen = false;
    let Remember = {};
    let Collect = false;
    let Tasks = false;
    let Redirect = false;
    let Handoff = false;
    let Say = "";
    // Add your code here.
    let Memory = JSON.parse(event.Memory);
 
    
    console.log("confirm_rout_task");
    
    // if(Memory.question == 'yes_no_task')
    // {
    //   Remember.billingzip = Memory.accountzip;
    //   Remember.zipverifiedyes = 'Yes';
    //   console.log(`validating zip: ${Memory.accountzip}`);
    //   Say = `Thank you for validating zip code  <say-as interpret-as='digits'>${Memory.accountzip}</say-as>`;
    // }

    // else if (Memory.question == 'greeting'){
    //   Remember.billingzip = Memory.accountzip;
    //   Remember.zipverifiedyes = 'Yes';
    //   console.log(`validating zip: ${Memory.accountzip}`);
    //   Say = `Thank you for validating zip code  <say-as interpret-as='digits'>${Memory.accountzip}</say-as>`;
    // }

     if(Memory.question == 'collectzip_task'){
      try{          
            Remember.question = "confirm_rout_task"
            Listen = true;
            Listen =  {
              "voice_digits": {
                "num_digits": 1,
                "finish_on_key": "#",
                "redirects": {
                  1: "task://yes_no_task",
                  2: "task://collectzip_task"
                }
              },
              "tasks": [
                "yes_no_task",
                "agent_transfer_task"
              ]
            } 
        }
      catch{
            console.log("confirm_rout_task catch: "+ Memory.accountzip);
            Redirect = "task://fallback";
        }
    }
    RB(Say, Listen, Remember, Collect, Tasks, Redirect, Handoff, callback);

  } catch (error) {
    console.error(error);
    callback( error);
  }
};