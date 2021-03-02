const { postcodeValidator} = require('postcode-validator');
exports.zip_complet_task =async function(context, event, callback,RB) {
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
    let collect_zip = "";
    
    console.log("zip_complet_task");
    
    if(Memory.question == 'yes_no_task')
    {
      Remember.billingzip = Memory.accountzip;
      Remember.zipverifiedyes = 'Yes';
      console.log(`validating zip: ${Memory.accountzip}`);
      Say = `Thank you for validating zip code  <say-as interpret-as='digits'>${Memory.accountzip}</say-as>`;
    }

    else if (Memory.question == 'greeting'){
      Remember.billingzip = Memory.accountzip;
      Remember.zipverifiedyes = 'Yes';
      console.log(`validating zip: ${Memory.accountzip}`);
      Say = `Thank you for validating zip code  <say-as interpret-as='digits'>${Memory.accountzip}</say-as>`;
    }

    else if(Memory.question == 'collectzip_task'){
      try{
          Remember.question = "collectzip_task";
          collect_zip = Memory.twilio.collected_data.collect_zip.answers.collect_zip.answer;
          console.log("collectzip_task: "+collect_zip);
         const ZipValidate = postcodeValidator(collect_zip, 'US'); // zip code validate
          console.log("ZipValidator: " + ZipValidate); // true and false

          //////////Start validation for Zip code///////////
          if( ZipValidate ){
            Remember.accountzip = collect_zip;
            Say = `You have entered <say-as interpret-as='digits'>${collect_zip}</say-as> , ,  Is that the correct billing zip code? Say yes or no, you can also press 1 for yes or 2 for no`;
            Redirect = "task://confirm_rout_task";
          }
          else{
            Say = `You have entered <say-as interpret-as='digits'>${collect_zip}</say-as>, , its not correct.`;
            console.log("collect_zip.length: "+collect_zip);
              if(Memory.collectzip_task_Counter >= 2)
                  Redirect = "task://agent_transfer_task"; 
              else
                  Redirect = 'task://collectzip_task';
            }
          //////////End Zip code validation//////////////////
        }
      catch{
            Remember.accountzip = collect_zip;
            console.log("collectzip_task catch: "+collect_zip);
            Redirect = "task://fallback";
        }
    }
    RB(Say, Listen, Remember, Collect, Tasks, Redirect, Handoff, callback);

  } catch (error) {
    console.error(error);
    callback( error);
  }
};