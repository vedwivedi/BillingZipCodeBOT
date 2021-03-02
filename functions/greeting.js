exports.greeting = async function(context, event, callback,RB) {
  try {
    console.log('greeting_task');
    let Listen = false;
    let Remember = {};
    let Collect = false;
    let Tasks = false;
    let Redirect = false;
    let Handoff = false;
    let Say = "";
    // Add your code here.
    let Memory = JSON.parse(event.Memory);
    let ZipCode = "";
    let sQues = "";
    Remember.accountzip = "";
    Remember.billingzip = "";

    if (Memory.ZipCode === undefined) 
        ZipCode = "12345";
    else 
        ZipCode = Memory.ZipCode;
    
    Remember.accountzip = ZipCode;

    if(Memory.greeting_Counter === undefined)
        Remember.greeting_Counter = 0;
    else
        Remember.greeting_Counter = parseInt(Memory.greeting_Counter) + 1;

    /////////////////////////////////////////////////////////////////

    sQues = `Is <say-as interpret-as='digits'>${ZipCode}</say-as> , ,  the billing zip code. Say yes or no, you can also press 1 for yes and 2 for no `;
    console.log(sQues);
      Say = `${sQues}`;
      Listen = true;
      Listen =  {
        "voice_digits": {
          "num_digits": 1,
          "finish_on_key": "#",
          "redirects": {
            1: "task://zip_complet_task",
            2: "task://collectzip_task"
          }
        },
        "tasks": [
          "yes_no_task",
          "agent_transfer_task"
        ]
      } 
      Remember.question = "greeting";
     RB(Say, Listen, Remember, Collect, Tasks, Redirect, Handoff, callback);
    
  } catch (error) {
    console.error(error);
    callback( error);
  }
};