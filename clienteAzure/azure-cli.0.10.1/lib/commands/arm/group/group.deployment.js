/*** Generated by streamline 0.10.17 (callbacks) - DO NOT EDIT ***/ "use strict"; var __rt=require('streamline/lib/callbacks/runtime').runtime(__filename, false),__func=__rt.__func,__cb=__rt.__cb,__catch=__rt.__catch,__tryCatch=__rt.__tryCatch; var util = require("util");


















var profile = require("../../../util/profile");
var utils = require("../../../util/utils");

var groupUtils = require("./groupUtils");

var $ = utils.getLocaleString;
var fs = require("fs");
var path = require("path");

exports.init = function(cli) {
  var log = cli.output;

  var group = cli.category("group");
  var deployment = group.category("deployment").description($("Commands to manage your deployment in a resource group"));

  var template = deployment.category("template").description($("Commands to manager your deployment template in a resource group"));


  deployment.command("create [resource-group] [name]").description($("Creates a deployment")).option("-g --resource-group <resource-group>", $("the name of the resource group")).option("-n --name <name>", $("the name of the deployment")).fileRelatedOption("-f --template-file <template-file>", $("the path to the template file in the file system")).option("--template-uri <template-uri>", $("the uri to the remote template file")).option("--template-version <template-version>", $("the content version of the template")).option("-p --parameters <parameters>", $("a JSON-formatted string containing parameters")).fileRelatedOption("-e --parameters-file <parametersFile>", $("a file containing parameters")).option("-m --mode <mode>", $("the deployment mode: specify one of Incremental or Complete. If no mode is specified, Incremental is used as default. When Complete mode is used, all the resources in the specified resource group, which are not included in the template, will be deleted.")).option("-d --debug-setting <debugSetting>", $("the debug setting for deployment logs. Valid values include RequestContent, ResponseContent, All or None. None is the default value. When All is specified, both request content and response content will be logged, which will be visible in deployment operations.")).option("-q --quiet", $("quiet mode (when complete mode is specified, do not ask for deployment confirmation)")).option("--nowait", $("does not wait for the deployment to complete. Returns as soon as the deployment is created")).option("--subscription <subscription>", $("the subscription identifier")).execute(function __1(resourceGroup, name, options, _) { var deployment, subscription, client; var __frame = { name: "__1", line: 52 }; return __func(_, this, arguments, __1, 3, __frame, function __$__1() {














      if (!resourceGroup) {
        return _(null, cli.missingArgument("resourceGroup")); } ;


      if (((options.mode && !utils.ignoreCaseEquals(options.mode, "complete")) && !utils.ignoreCaseEquals(options.mode, "incremental"))) {
        return _(new Error("Please provide a valid deployment mode: Complete or Incremental.")); } ;


      if (((((options.debugSetting && !utils.ignoreCaseEquals(options.debugSetting, "all")) && !utils.ignoreCaseEquals(options.debugSetting, "requestcontent")) && !utils.ignoreCaseEquals(options.debugSetting, "responsecontent")) && !utils.ignoreCaseEquals(options.debugSetting, "none"))) {



        return _(new Error("Please provide a valid debug setting: RequestContent, ResponseContent, All or None. Default will be None.")); } ; return (function __$__1(_) {


        var __2 = (!options.quiet && utils.ignoreCaseEquals(options.mode, "complete")); if (!__2) { return _(null, __2); } ;
        return cli.interaction.confirm(util.format($("Are you sure you want to use the Complete deployment mode? Resources in resource group %s, which are not included in the template will be deleted. [y/n] "), resourceGroup), __cb(_, __frame, 17, 25, function ___(__0, __4) { var __3 = !__4; return _(null, __3); }, true)); })(__cb(_, __frame, -51, 17, function ___(__0, __3) { return (function __$__1(__then) { if (__3) { return _(null); } else { __then(); } ; })(function __$__1() {



          return groupUtils.createDeployment(cli, resourceGroup, name, options, __cb(_, __frame, 21, 34, function ___(__0, __4) { deployment = __4;
            subscription = profile.current.getSubscription(options.subscription);
            client = utils.createResourceClient(subscription); return (function __$__1(__then) {

              if (!options.nowait) {
                return cli.interaction.withProgress($("Waiting for deployment to complete"), function __1(log, _) { var operations, operationsIncludingNested, failedOperations; var __frame = { name: "__1", line: 79 }; return __func(_, this, arguments, __1, 1, __frame, function __$__1() { var __1 = true; return (function ___(__break) { var __more; var __loop = __cb(_, __frame, 0, 0, function __$__1() { __more = false;










                        var __6 = (__1 || ((deployment.properties.provisioningState === "Running") || (deployment.properties.provisioningState === "Accepted"))); if (__6) { __1 = false; return client.deployments.get(resourceGroup, deployment.name, __cb(_, __frame, 2, 44, function ___(__0, __2) { deployment = __2; return getDeploymentOperations(client, resourceGroup, deployment.name, __cb(_, __frame, 4, 29, function ___(__0, __3) { operations = __3; return getNestedOperations(client, resourceGroup, operations, __cb(_, __frame, 5, 44, function ___(__0, __4) { operationsIncludingNested = __4; removeDuplicateOperations(operationsIncludingNested, operationsEqual); return displayDeploymentStatusMessage(cli, operationsIncludingNested, log, __cb(_, __frame, 7, 12, function __$__1() { return setTimeout(__cb(_, __frame, 9, 12, function __$__1() { while (__more) { __loop(); }; __more = true; }, true), 5000); }, true)); }, true)); }, true)); }, true)); } else { __break(); } ; }); do { __loop(); } while (__more); __more = true; })(function __$__1() { return (function __$__1(__then) {

                        if ((deployment.properties.provisioningState !== "Succeeded")) {
                          log.error("Deployment provisioning state was not successful");


                          return groupUtils.getFailedDeploymentOperations(options.subscription, resourceGroup, deployment.name, __cb(_, __frame, 16, 46, function ___(__0, __5) { failedOperations = __5;

                            failedOperations.forEach(function(operation) {

                              if ((operation.properties.statusMessage && operation.properties.statusMessage.Message)) {
                                log.error(operation.properties.statusMessage.Message); } ;


                              if (operation.properties.statusMessage.error) {
                                log.error(operation.properties.statusMessage.error.message);

                                if (operation.properties.statusMessage.error.details) {
                                  displayDetailedErrorMessage(operation.properties.statusMessage.error.details, log); } ; } ; }); __then(); }, true)); } else { __then(); } ; })(_); }); }); }, __cb(_, __frame, 26, 24, __then, true)); } else { __then(); } ; })(function __$__1() {








              if (deployment) {
                cli.interaction.formatOutput(deployment, function(data) {
                  if (data) {
                    displayDeployment(data, resourceGroup, true, log); } ; }); } ; _(); }); }, true)); }); }, true)); }); });





  deployment.command("list [resource-group] [state]").usage("[options] <resource-group> [state]").description($("Gets deployments")).option("-g --resource-group <resourceGroup>", $("the name of the resource group.")).option("--state <state>", $(("filter the deployments by provisioning state (valid " + "values are Accepted, Running, Failed, and Succeeded)"))).option("--subscription <subscription>", $("subscription containing deployments to list (optional)")).execute(function __2(resourceGroup, state, options, _) { var subscription, client, progress, allDeployments; var __frame = { name: "__2", line: 132 }; return __func(_, this, arguments, __2, 3, __frame, function __$__2() {







      if (!resourceGroup) {
        return _(null, cli.missingArgument("resourceGroup")); } ;

      subscription = profile.current.getSubscription(options.subscription);
      client = utils.createResourceClient(subscription);
      progress = cli.interaction.progress($("Listing deployments")); return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$__2() {


            return retrieveDeployments(client, resourceGroup, state, __cb(_, __frame, 9, 25, function ___(__0, __1) { allDeployments = __1; _(null, null, true); }, true)); }); })(function ___(__e, __r, __cont) { (function ___(__then) { __tryCatch(_, function __$__2() {

              progress.end(); __then(); }); })(function ___() { __tryCatch(_, function ___() { if (__cont) { __then(); } else { _(__e, __r); }; }); }); }); })(function ___() { __tryCatch(_, function __$__2() {


          cli.interaction.formatOutput(allDeployments, function(outputData) {
            if (outputData) {
              for (var i = 0; (i < outputData.length); i++) {
                var deployment = outputData[i];
                displayDeployment(deployment, resourceGroup, false, log);
                if ((i !== (outputData.length - 1))) {

                  log.data($("")); } ; }; } ; }); _(); }); }); }); });






  deployment.command("show [resource-group] [name]").usage("[options] <resource-group> [deployment-name]").description($("Shows a deployment")).option("-g --resource-group <resourceGroup>", $("the name of the resource group.")).option("-n --name <name>", $("the name of the deployment (if not specified, the most recent deployment is shown)")).option("--subscription <subscription>", $("subscription containing the deployment to display (optional)")).execute(function __3(resourceGroup, name, options, _) { var subscription, client, progress, deployment, allDeployments; var __frame = { name: "__3", line: 166 }; return __func(_, this, arguments, __3, 3, __frame, function __$__3() {






      if (!resourceGroup) {
        return _(null, cli.missingArgument("resourceGroup")); } ;

      subscription = profile.current.getSubscription(options.subscription);
      client = utils.createResourceClient(subscription);
      progress = cli.interaction.progress($("Getting deployments")); return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$__3() { return (function __$__3(__then) {


              if (name) {
                return client.deployments.get(resourceGroup, name, __cb(_, __frame, 10, 42, function ___(__0, __1) { deployment = __1; __then(); }, true)); } else {



                return retrieveDeployments(client, resourceGroup, "", __cb(_, __frame, 14, 31, function ___(__0, __2) { allDeployments = __2;
                  if ((allDeployments && (allDeployments.length > 0))) {
                    allDeployments.sort(function(a, b) {
                      return (Date.parse(a.properties.timestamp) < Date.parse(b.properties.timestamp)); });

                    deployment = allDeployments[0]; } ; __then(); }, true)); } ; })(function __$__3() { _(null, null, true); }); }); })(function ___(__e, __r, __cont) { (function ___(__then) { __tryCatch(_, function __$__3() {



              progress.end(); __then(); }); })(function ___() { __tryCatch(_, function ___() { if (__cont) { __then(); } else { _(__e, __r); }; }); }); }); })(function ___() { __tryCatch(_, function __$__3() {


          if (deployment) {
            cli.interaction.formatOutput(deployment, function(data) {
              if (data) {
                displayDeployment(data, resourceGroup, true, log); } ; }); } ; _(); }); }); }); });





  deployment.command("stop [resource-group] [name]").usage("[options] <resource-group> [deployment-name]").description($("Stops a deployment")).option("-g --resource-group <resourceGroup>", $("the name of the resource group")).option("-q --quiet", $("quiet mode (do not ask for stop deployment confirmation)")).option("-n --name <name>", $("the name of the deployment (if not specified, the currently running deployment is stopped)")).option("--subscription <subscription>", $("the subscription identifier")).execute(function __4(resourceGroup, name, options, _) { var subscription, client, deploymentToStop, progress; var __frame = { name: "__4", line: 208 }; return __func(_, this, arguments, __4, 3, __frame, function __$__4() {







      if (!resourceGroup) {
        return _(null, cli.missingArgument("resourceGroup")); } ;

      subscription = profile.current.getSubscription(options.subscription);
      client = utils.createResourceClient(subscription);
      deploymentToStop = name; return (function __$__4(__then) {

        if (!name) {
          return cli.interaction.withProgress($("Looking for \"Running\" or \"Accepted\" deployment"), function __1(log, _) { var allAcceptedDeployments, allRunningDeployments, allCancellableDeployments; var __frame = { name: "__1", line: 218 }; return __func(_, this, arguments, __1, 1, __frame, function __$__1() {



              return retrieveDeployments(client, resourceGroup, "Accepted", __cb(_, __frame, 3, 41, function ___(__0, __1) { allAcceptedDeployments = __1;
                return retrieveDeployments(client, resourceGroup, "Running", __cb(_, __frame, 4, 40, function ___(__0, __2) { allRunningDeployments = __2;
                  allCancellableDeployments = allAcceptedDeployments;
                  if (!allCancellableDeployments) {
                    allCancellableDeployments = allRunningDeployments; }
                   else {
                    allCancellableDeployments = allCancellableDeployments.concat(allRunningDeployments); } ;


                  if ((allCancellableDeployments && (allCancellableDeployments.length > 0))) {
                    if ((allCancellableDeployments.length > 1)) {
                      return _(new Error($("There are more than 1 deployment in either \"Running\" or \"Accepted\" state, please name one."))); } ;

                    deploymentToStop = allCancellableDeployments[0].name;
                    log.info(util.format($("Found a deployment: %s"), deploymentToStop)); }

                   else {
                    log.info($("There is no deployment to stop.")); } ; _(); }, true)); }, true)); }); }, __cb(_, __frame, 9, 24, __then, true)); } else { __then(); } ; })(function __$__4() { return (function __$__4(__then) {




          if (deploymentToStop) { return (function __$__4(_) {
              var __2 = !options.quiet; if (!__2) { return _(null, __2); } ;
              return cli.interaction.confirm(util.format($("Stop deployment %s? [y/n]: "), deploymentToStop), __cb(_, __frame, 37, 29, function ___(__0, __4) { var __3 = !__4; return _(null, __3); }, true)); })(__cb(_, __frame, -207, 17, function ___(__0, __3) { return (function __$__4(__then) { if (__3) { return _(null); } else { __then(); } ; })(function __$__4() {



                progress = cli.interaction.progress($("Stopping deployment")); return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$__4() {


                      return client.deployments.cancel(resourceGroup, deploymentToStop, __cb(_, __frame, 44, 29, function __$__4() { _(null, null, true); }, true)); }); })(function ___(__e, __r, __cont) { (function ___(__then) { __tryCatch(_, function __$__4() {

                        progress.end(); __then(); }); })(function ___() { __tryCatch(_, function ___() { if (__cont) { __then(); } else { _(__e, __r); }; }); }); }); })(function ___() { __tryCatch(_, __then); }); }); }, true)); } else { __then(); } ; })(_); }); }); });




  deployment.command("delete [resource-group] [name]").usage("[options] <resource-group> <deployment-name>").description($("Deletes a deployment")).option("-g --resource-group <resourceGroup>", $("the name of the resource group.")).option("-n --name <name>", $("the name of the deployment.")).option("-q, --quiet", $("quiet mode (do not ask for delete confirmation)")).option("--subscription <subscription>", $("subscription containing the deployment to display (optional)")).execute(function __5(resourceGroup, name, options, _) { var subscription, client, progress; var __frame = { name: "__5", line: 266 }; return __func(_, this, arguments, __5, 3, __frame, function __$__5() {







      if (!resourceGroup) {
        return _(null, cli.missingArgument("resourceGroup")); } ;

      if (!name) {
        return _(null, cli.missingArgument("name")); } ; return (function __$__5(_) {

        var __1 = !options.quiet; if (!__1) { return _(null, __1); } ; return cli.interaction.confirm(util.format($("Delete deployment %s? [y/n] "), name), __cb(_, __frame, 7, 45, function ___(__0, __3) { var __2 = !__3; return _(null, __2); }, true)); })(__cb(_, __frame, -265, 17, function ___(__0, __2) { return (function __$__5(__then) { if (__2) { return _(null); } else { __then(); } ; })(function __$__5() {


          subscription = profile.current.getSubscription(options.subscription);
          client = utils.createResourceClient(subscription); return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$__5() {

                return client.deployments.checkExistence(resourceGroup, name, __cb(_, __frame, 13, 27, __then, true)); }); })(function ___(err, __result) { __catch(function __$__5() { if (err) {


                  return _(new Error($("The deployment does not exist."))); } else { _(null, __result); } ; }, _); }); })(function ___() { __tryCatch(_, function __$__5() {


              progress = cli.interaction.progress($("Deleting deployment")); return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$__5() {

                    return client.deployments.deleteMethod(resourceGroup, name, __cb(_, __frame, 21, 27, function __$__5() { _(null, null, true); }, true)); }); })(function ___(__e, __r, __cont) { (function ___(__then) { __tryCatch(_, function __$__5() {


                      progress.end(); __then(); }); })(function ___() { __tryCatch(_, function ___() { if (__cont) { __then(); } else { _(__e, __r); }; }); }); }); })(function ___() { __tryCatch(_, function __$__5() { _(); }); }); }); }); }); }, true)); }); });



  template.command("download [resource-group] [name] [directory]").description($("Downloads a resource group deployment template")).usage("[options] [resource-group] [name] [directory]").option("-g --resource-group <resourceGroup>", $("the name of the resource group.")).option("-n --name <name>", $("the name of the deployment to download")).option("-d --directory <directory>", $("the name of the destination directory. If not specified, template file will be saved in the current directory.")).option("-q --quiet", $("quiet mode (do not prompt for overwrite if output file exists)")).option("--subscription <subscription>", $("subscription containing the deployment to display (optional)")).execute(function __6(resourceGroup, name, directory, options, _) { var subscription, client, confirm, result, template, fileName; var __frame = { name: "__6", line: 302 }; return __func(_, this, arguments, __6, 4, __frame, function __$__6() {








      if (!resourceGroup) {
        return _(null, cli.missingArgument("resourceGroup")); } ;

      if (!name) {
        return _(null, cli.missingArgument("name")); } ;


      subscription = profile.current.getSubscription(options.subscription);
      client = utils.createResourceClient(subscription); return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$__6() {

            return client.deployments.checkExistence(resourceGroup, name, __cb(_, __frame, 11, 27, __then, true)); }); })(function ___(err, __result) { __catch(function __$__6() { if (err) {


              return _(new Error(util.format($("Deployment %s does not exist in resource group %s"), name, resourceGroup))); } else { _(null, __result); } ; }, _); }); })(function ___() { __tryCatch(_, function __$__6() {


          confirm = cli.interaction.confirm.bind(cli.interaction);
          return cli.interaction.withProgress(util.format($("Getting resource group deployment template %s"), name), function __1(log, _) { var __frame = { name: "__1", line: 322 }; return __func(_, this, arguments, __1, 1, __frame, function __$__1() {


              return client.deployments.exportTemplate(resourceGroup, name, __cb(_, __frame, 1, 36, _, true)); }); }, __cb(_, __frame, 18, 35, function ___(__0, __2) { result = __2;


            template = result.template;
            fileName = (directory ? path.join(directory, (name + ".json")) : path.join(process.cwd(), (name + ".json")));
            return groupUtils.normalizeDownloadFileName(fileName, options.quiet, confirm, __cb(_, __frame, 26, 28, function ___(__0, __3) { fileName = __3;
              if (fileName) {
                fs.writeFileSync(fileName, JSON.stringify(template, null, 2));
                log.info(util.format($("Deployment template downloaded to %s"), fileName)); } ; _(); }, true)); }, true)); }); }); }); });};




function retrieveDeployments(client, resourceGroup, state, _) { var parameters, response, allDeployments, nextLink; var __frame = { name: "retrieveDeployments", line: 336 }; return __func(_, this, arguments, retrieveDeployments, 3, __frame, function __$retrieveDeployments() {
    parameters = { };
    if (state) {
      parameters.filter = (("provisioningState eq '" + state) + "'"); } ;

    return client.deployments.list(resourceGroup, parameters, __cb(_, __frame, 5, 36, function ___(__0, __1) { response = __1;
      allDeployments = response;
      nextLink = response.nextLink; return (function ___(__break) { var __more; var __loop = __cb(_, __frame, 0, 0, function __$retrieveDeployments() { __more = false;

          var __4 = nextLink; if (__4) {
            return client.deployments.listNext(nextLink, __cb(_, __frame, 10, 34, function ___(__0, __2) { response = __2;
              allDeployments = allDeployments.concat(response);
              nextLink = response.nextLink; while (__more) { __loop(); }; __more = true; }, true)); } else { __break(); } ; }); do { __loop(); } while (__more); __more = true; })(function __$retrieveDeployments() {


        return _(null, allDeployments); }); }, true)); });};


function displayDeployment(deployment, resourceGroup, showDetail, log) {
  log.data($("DeploymentName     :"), (deployment.name || deployment.deploymentName));
  log.data($("ResourceGroupName  :"), resourceGroup);
  log.data($("ProvisioningState  :"), deployment.properties.provisioningState);
  log.data($("Timestamp          :"), deployment.properties.timestamp);
  log.data($("Mode               :"), deployment.properties.mode);
  log.data($("CorrelationId      :"), deployment.properties.correlationId);
  if (showDetail) {
    if (deployment.properties.templateLink) {
      log.data($("TemplateLink       :"), deployment.properties.templateLink.uri);
      log.data($("ContentVersion     :"), deployment.properties.templateLink.contentVersion); } ;

    if ((deployment.properties.parameters && (Object.keys(deployment.properties.parameters).length > 0))) {
      log.data($("DeploymentParameters :"));
      log.table(deployment.properties.parameters, function(row, item) {
        row.cell($("Name"), item);
        row.cell($("Type"), deployment.properties.parameters[item].type);
        row.cell($("Value"), deployment.properties.parameters[item].value); }); } ; } ;



  if ((deployment.properties.outputs && (Object.keys(deployment.properties.outputs).length > 0))) {
    log.data($("Outputs            :"));
    log.table(deployment.properties.outputs, function(row, item) {
      row.cell($("Name"), item);
      row.cell($("Type"), deployment.properties.outputs[item].type);
      row.cell($("Value"), deployment.properties.outputs[item].value); }); } ;


  if ((deployment.properties.debugSetting && deployment.properties.debugSetting.detailLevel)) {
    log.data($("DebugSetting       :"), deployment.properties.debugSetting.detailLevel); } ;};



function displayDetailedErrorMessage(details, log) {
  details.forEach(function(detail) {
    if (detail.message) {
      log.error(detail.message); } ;

    if (detail.details) {
      displayDetailedErrorMessage(detail.details, log); } ; });};




function getDeploymentOperations(client, resourceGroup, deploymentName, _) { var allOperations, operations; var __frame = { name: "getDeploymentOperations", line: 399 }; return __func(_, this, arguments, getDeploymentOperations, 3, __frame, function __$getDeploymentOperations() {
    allOperations = [];
    return client.deploymentOperations.list(resourceGroup, deploymentName, __cb(_, __frame, 2, 47, function ___(__0, __1) { operations = __1;
      allOperations = allOperations.concat(operations); return (function ___(__break) { var __more; var __loop = __cb(_, __frame, 0, 0, function __$getDeploymentOperations() { __more = false;

          var __4 = operations.nextLink; if (__4) {
            return client.deploymentOperations.listNext(operations.nextLink, __cb(_, __frame, 6, 45, function ___(__0, __2) { operations = __2;
              allOperations = allOperations.concat(operations); while (__more) { __loop(); }; __more = true; }, true)); } else { __break(); } ; }); do { __loop(); } while (__more); __more = true; })(function __$getDeploymentOperations() {

        return _(null, allOperations); }); }, true)); });};


function getNestedOperations(client, resourceGroup, currentOperations, _) { var newOperations; var __frame = { name: "getNestedOperations", line: 411 }; return __func(_, this, arguments, getNestedOperations, 3, __frame, function __$getNestedOperations() {
    newOperations = [];
    return currentOperations.forEach_(__cb(_, __frame, 2, 20, function __$getNestedOperations() {











      return _(null, newOperations); }, true), 1, function __1(_, operation) { var nestedDeployment, nestedOperations, newNestedOperations; var __frame = { name: "__1", line: 413 }; return __func(_, this, arguments, __1, 0, __frame, function __$__1() { newOperations.push(operation); return (function __$__1(__then) { if ((operation.properties.targetResource && (operation.properties.targetResource.id.indexOf("Microsoft.Resources/deployments") !== -1))) { nestedDeployment = operation.properties.targetResource.resourceName; return client.deployments.checkExistence(resourceGroup, nestedDeployment, __cb(_, __frame, 5, 29, function ___(__0, __1) { return (function __$__1(__then) { if (__1) { return getDeploymentOperations(client, resourceGroup, nestedDeployment, __cb(_, __frame, 6, 31, function ___(__0, __2) { nestedOperations = __2; return getNestedOperations(client, resourceGroup, nestedOperations, __cb(_, __frame, 7, 34, function ___(__0, __3) { newNestedOperations = __3; newOperations = newOperations.concat(newNestedOperations); __then(); }, true)); }, true)); } else { __then(); } ; })(__then); }, true)); } else { __then(); } ; })(_); }); }); });};


function displayDeploymentStatusMessage(cli, operations, log, _) { var __frame = { name: "displayDeploymentStatusMessage", line: 428 }; return __func(_, this, arguments, displayDeploymentStatusMessage, 3, __frame, function __$displayDeploymentStatusMessage() {
    return cli.interaction.withProgress($(""), function __1(log, _) { var __frame = { name: "__1", line: 430 }; return __func(_, this, arguments, __1, 1, __frame, function __$__1() { return (function __$__1(__then) {

          if (operations) {
            return operations.forEach_(__cb(_, __frame, 2, 19, __then, true), 1, function __1(_, operation) { var __frame = { name: "__1", line: 432 }; return __func(_, this, arguments, __1, 0, __frame, function __$__1() {
                if ((operation.properties.provisioningState !== "Failed")) {
                  if (operation.properties.targetResource) {
                    log.info(util.format($("Resource '%s' of type '%s' provisioning status is %s"), operation.properties.targetResource.resourceName, operation.properties.targetResource.resourceType, operation.properties.provisioningState)); } ; } ; _(); }); }); } else { __then(); } ; })(_); }); }, __cb(_, __frame, 1, 18, function __$displayDeploymentStatusMessage() { _(); }, true)); });};







function isOperationPresent(operations, op, equals) {
  var i = operations.length;
  while (i--) {
    if (equals(operations[i], op)) {
      return true; } ; };


  return false;};


function removeDuplicateOperations(operations, equals) {
  var originalOperations = operations.slice(0);
  var i, len, op;
  operations.length = 0;

  for (i = 0, len = originalOperations.length; (i < len); ++i) {
    op = originalOperations[i];
    if (!isOperationPresent(operations, op, equals)) {
      operations.push(op); } ; };};




function operationsEqual(operation1, operation2) {
  if ((operation1.properties.targetResource && operation2.properties.targetResource)) {
    return utils.ignoreCaseEquals(operation1.properties.targetResource.id, operation2.properties.targetResource.id); } ;

  return false;};
