const axios = require('axios');
exports.collectzip_task =async function(context, event, callback,RB) {
  console.log("fallback2");
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
  Remember.question = "collectzip_task";

  if(Memory.collectzip_task_Counter === undefined)
      Remember.collectzip_task_Counter = 0;
   else
      Remember.collectzip_task_Counter = Number(Memory.collectzip_task_Counter) + 1;

   ////////////////////////
   if(Remember.collectzip_task_Counter <= 2){
    let sQues = `Please enter the 5 digit billing zip code.`;
    //Collect = true;
    Collect = {
        "name": "collect_zip",
        "questions": [
          {
            "question": `${sQues}`,
            "voice_digits": {
                "num_digits":5,
              "finish_on_key": "#"
            },
            "name": "collect_zip",
            "type": "Twilio.NUMBER_SEQUENCE"
          }
        ],
        "on_complete": {
          "redirect": "task://zip_complet_task"
        }
      };
    }
    else{
      Collect = false;
       Redirect = "task://agent_transfer_task";
    }
    
   RB(Say, Listen, Remember, Collect, Tasks, Redirect, Handoff, callback);
  } catch (error) {
  console.error(error);
  callback( error);
  }
};