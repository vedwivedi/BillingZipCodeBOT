const { postcodeValidator } = require('postcode-validator');
exports.zip_complet_task = async function (context, event, callback, RB) {
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
    let collect_zip = "";

    console.log("zip_complet_task");

    if (Memory.question == 'greeting') {
      Remember.billingzip = Memory.accountzip;
      console.log(`validating zip: ${Memory.accountzip}`);
      Say = `Thank you for validating zip code.`;
    }
    else if (Memory.question == 'confirm_rout_task') {
      Remember.billingzip = Memory.accountzip;
      console.log(`validating zip: ${Memory.accountzip}`);
      Say = `Thank you for providing the zip code.`;
    }

    else if (Memory.question == 'ques_collectzip') {
      collect_zip = Memory.twilio.collected_data.collect_billing_zip.answers.collectbillingzip.answer;
      console.log("collectzip_task: " + collect_zip);
      const ZipValidate = postcodeValidator(collect_zip, 'US'); // zip code validate
      console.log("ZipValidator: " + ZipValidate); // true and false

      //////////Start validation for Zip code///////////
      if (ZipValidate) {
        Remember.accountzip = collect_zip;
        Listen = false;
        Collect = false;
        Redirect = "task://confirm_rout_task";
      }
      else {
        Say = `You have entered <say-as interpret-as='digits'>${collect_zip}</say-as> ,,`
        Prompt = `That is not a valid zip code.`;
        Say += Prompt;

        console.log("collect_zip.length: " + collect_zip);
        if (Memory.collectzip_task_Counter >= 2)
          Redirect = "task://agent_transfer_task";
        else
          Redirect = 'task://collectzip_task';
      }
      //////////End Zip code validation//////////////////

    }
    RB(Say, Listen, Remember, Collect, Tasks, Redirect, Handoff, callback);

  } catch (error) {
    console.log("error: " + error);
    console.error(error);
    callback(error);
  }
};