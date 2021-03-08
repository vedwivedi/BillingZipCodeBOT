exports.agent_transfer_task = async function (context, event, callback, RB) {
    try {
        let Listen = false;
        let Remember = {};
        let Collect = false;
        let Tasks = false;
        let Redirect = false;
        let Handoff = false;
        let Say = "";

        Remember.question = "agent_transfer_task";
        console.log("Agent transfer");
        Remember.Agent = true;
        Say = " ";
        RB(Say, Listen, Remember, Collect, Tasks, Redirect, Handoff, callback);

    } catch (error) {
        console.log("error: " + error);
        console.error(error);
        callback(error);
    }
};