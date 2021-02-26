
exports.yes_no_task = async function (context, event, callback, RB) {
   console.log("Yes No Task");

  try {
    let Say;
    let Prompt = '';
    let Tasks = false;
    let Remember = {};
    let Redirect = true;
    let Listen = false;
    let Collect = false;
    let Handoff = false;
    Remember.zipverifiedyes = "";
    let Memory = JSON.parse(event.Memory);
    let userInput;
    Remember.question = "yes_no_task";
    if (event.CurrentInput === undefined) {
      userInput = "";
    }
    else {
      userInput = event.CurrentInput;
    }


    // const {​​ CurrentInput }​​ = event;

    console.log("userInput: " + userInput);
    
    let YesNo = "";
    if (userInput != "") {
      YesNo = userInput.toLowerCase();
    }

    console.log(event.Field_yes_no_Value);
    console.log("YesNo: " + YesNo);

      Remember.question = "yes_no_task";
    
    //  switch (Memory.question) {
    //    case 'yes_no_task':
        if (event.Field_yes_no_Value === 'Yes' || YesNo === 'yes') {
            Redirect = "task://zip_complet_task";
        } else if (event.Field_yes_no_Value === 'No' || YesNo === 'no') {
          Remember.zipverifiedyes = 'No';
          Redirect = "task://collectzip_task";

        } else {
          Remember.question = "greeting";
          Redirect = 'task://fallback';
        }
    //      break;

    //    default:
    //       Remember.question = "greeting";
    //       Redirect = 'task://fallback';

    //      break;
    //  }
    
    RB(Say, Listen, Remember, Collect, Tasks, Redirect, Handoff, callback);
  } catch (error) {
    console.error(error);
    callback(error);
  }
};

