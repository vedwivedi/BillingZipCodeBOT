exports.confirm_rout_task = async function (context, event, callback, RB) {
  try {
    let Listen = false;
    let Remember = {};
    let Collect = false;
    let Tasks = false;
    let Redirect = false;
    let Handoff = false;
    let Prompt = false;
    let Say = "";
    // Add your code here.
    let Memory = JSON.parse(event.Memory);

    console.log("confirm_rout_task");
    if (Memory.confirm_rout_Counter === undefined) {
      Remember.collectzip_task_Counter = 0; // need to reset counter for collect zip code task because user first time say no or press 2 then reset 
      Remember.confirm_rout_Counter = 0;
    }
    else
      Remember.confirm_rout_Counter = Number(Memory.confirm_rout_Counter) + 1;

    if (Remember.confirm_rout_Counter <= 2) {
      Remember.question = "confirm_rout_task";
      Say = `You have entered <say-as interpret-as='digits'>${Memory.accountzip}</say-as> ,,`;
      Prompt = `Is that the correct billing zip code? Say yes or no, you can also press 1 for yes or 2 for no`;
      Say += Prompt;
      Listen = {
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
    }
    else {
      Listen = false;
      Redirect = "task://fallback";
    }
    RB(Say, Listen, Remember, Collect, Tasks, Redirect, Handoff, callback);

  } catch (error) {
    console.log("error: " + error);
    console.error(error);
    callback(error);
  }
};