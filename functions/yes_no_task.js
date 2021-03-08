
exports.yes_no_task = async function (context, event, callback, RB) {
  console.log("Yes No Task");

  try {
    let Say;
    let Prompt = '';
    let Tasks = false;
    let Remember = {};
    let Redirect = false;
    let Listen = false;
    let Collect = false;
    let Handoff = false;

    let Memory = JSON.parse(event.Memory);
    let userInput;
    if (event.CurrentInput === undefined) {
      userInput = "";
    }
    else {
      userInput = event.CurrentInput;
    }
    console.log("userInput: " + userInput);
    let YesNo = "";
    if (userInput != "") {
      YesNo = CheckYesNoInput(userInput.toLowerCase());
    }
    console.log(event.Field_yes_no_Value);
    console.log("YesNo: " + YesNo);
    //Remember.question = "yes_no_task";
    switch (Memory.question) {
      case 'greeting':
        if (event.Field_yes_no_Value === 'Yes' || YesNo === 'yes') {
          Remember.billingzip = Memory.accountzip;
          console.log(`greeting validating zip: ${Memory.accountzip}`);
          Say = `Thank you for validating zip code.`;
          
        } else if (event.Field_yes_no_Value === 'No' || YesNo === 'no') {
          Redirect = "task://collectzip_task";
        } else {
          Remember.question = "greeting";
          Redirect = 'task://fallback';
        }
        break;
      case 'confirm_rout_task':
        console.log("yes_no_task case confirm_rout_task");
        if (event.Field_yes_no_Value === 'Yes' || YesNo === 'yes') {
          Remember.billingzip = Memory.accountzip;
          Remember.question = "yes_no_task_exit"; // need to change question
          Say = `Thank you for providing the zip code.`;

        } else if (event.Field_yes_no_Value === 'No' || YesNo === 'no') {
          Redirect = "task://collectzip_task";
        } else {
          Remember.question = "ques_collectzip";
          Redirect = 'task://fallback';
        }
        break;
      default:
        Remember.question = "ques_collectzip";
        Redirect = 'task://fallback';
        break;
    }
    RB(Say, Listen, Remember, Collect, Tasks, Redirect, Handoff, callback);
  } catch (error) {
    console.log("error: " + error);
    console.error(error);
    callback(error);
  }
};

function CheckYesNoInput(x) {
  let sYesNo = '';

  if (x.includes('not')) sYesNo = 'No';
  if (x.includes('not my')) sYesNo = 'No';
  if (x.includes('wrong')) sYesNo = 'No';
  if (x.includes('it is wrong')) sYesNo = 'No';
  if (x.includes('noway')) sYesNo = 'No';
  if (x.includes('nah')) sYesNo = 'No';
  if (x.includes('negative')) sYesNo = 'No';
  if (x.includes('it is not true')) sYesNo = 'No';
  if (x.includes('thats not my zip code')) sYesNo = 'No';
  if (x.includes("that's not my zip code")) sYesNo = 'No';
  if (x.includes('that is not my zip code')) sYesNo = 'No';

  if (x.includes('correct')) sYesNo = 'Yes';
  if (x.includes("that's me")) sYesNo = 'Yes';
  if (x.includes('that is my zip code')) sYesNo = 'Yes';
  if (x.includes('it is correct')) sYesNo = 'Yes';
  if (x.includes("it's correct")) sYesNo = 'Yes';
  if (x.includes('its my')) sYesNo = 'Yes';
  if (x.includes('it is my')) sYesNo = 'Yes';
  if (x.includes('right')) sYesNo = 'Yes';
  if (x.includes("it's right")) sYesNo = 'Yes';
  if (x.includes('okay')) sYesNo = 'Yes';
  if (x.includes('ok')) sYesNo = 'Yes';
  if (x.includes('agree')) sYesNo = 'Yes';
  if (x.includes('yup')) sYesNo = 'Yes';
  if (x.includes('It is true')) sYesNo = 'Yes';
  console.log("sYesNo: " + sYesNo);

  return sYesNo.toLowerCase();
}

