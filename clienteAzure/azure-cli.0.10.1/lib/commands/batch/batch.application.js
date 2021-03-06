/*** Generated by streamline 0.10.17 (callbacks) - DO NOT EDIT ***/ var __rt=require('streamline/lib/callbacks/runtime').runtime(__filename, false),__func=__rt.__func,__cb=__rt.__cb,__catch=__rt.__catch,__tryCatch=__rt.__tryCatch; var util = require("util");
















var batchUtil = require("./batch.util");
var batchShowUtil = require("./batch.showUtil");
var utils = require("../../util/utils");
var startProgress = batchUtil.startProgress;
var endProgress = batchUtil.endProgress;

var fs = require("fs");
var url = require("url");
var storage = require("azure-storage");

var $ = utils.getLocaleString;




exports.init = function(cli) {


  batchUtil.init(cli);




  var batch = cli.category("batch").description($("Commands to manage your Batch objects"));


  var logger = cli.output;

  var interaction = cli.interaction;

  var application = batch.category("application").description($("Commands to manage your Batch Application"));


  var applicationPkg = application.category("package").description($("Commands to manage your Batch Application Package"));


  application.command("create [resource-group] [account-name] [application-id]").description($("Adds an application to the specified Batch account")).option("--account-name <account-name>", $("the name of the Batch account")).option("--application-id <application-id>", $("the id of the application")).option("--allow-updates <allow-updates>", $("whether packages within the application may be overwritten using the same version string")).option("--display-name <display-name>", $("the disaply name for the application")).appendSubscriptionAndResourceGroupOption().execute(addApplication);








  application.command("set [resource-group] [account-name] [application-id]").description($("Updates an application to the specified Batch account")).option("--account-name <account-name>", $("the name of the Batch account")).option("--application-id <application-id>", $("the id of the application")).option("--allow-updates <allow-updates>", $("whether packages within the application may be overwritten using the same version string")).option("--display-name <display-name>", $("the disaply name for the application")).appendSubscriptionAndResourceGroupOption().execute(updateApplication);








  application.command("delete [resource-group] [account-name] [application-id]").description($("Deletes an application")).option("--account-name <account-name>", $("the name of the Batch account")).option("--application-id <application-id>", $("the id of the application")).option("-q, --quiet", $("delete the specified application without confirmation")).appendSubscriptionAndResourceGroupOption().execute(deleteApplication);







  application.command("show [resource-group] [account-name] [application-id]").description($("Show details of the Batch application")).option("--account-name <account-name>", $("the name of the Batch account")).option("--application-id <application-id>", $("the id of the application")).appendSubscriptionAndResourceGroupOption().execute(showApplication);






  application.command("list [resource-group] [account-name]").description($("Lists all of the applications in the specified account")).option("--account-name <account-name>", $("the name of the Batch account")).appendSubscriptionAndResourceGroupOption().execute(listApplication);





  application.command("list-summary").description($("Lists all of the applications available in the specified account")).appendBatchAccountOption().execute(listApplicationSummary);




  application.command("show-summary [application-id]").description($("Show details of the application in the specified account")).option("--application-id <application-id>", $("the id of the application")).appendBatchAccountOption().execute(showApplicationSummary);





  applicationPkg.command("create [resource-group] [account-name] [application-id] [version] [package-file]").description($("Creates an application package record")).option("--account-name <account-name>", $("the name of the Batch account")).option("--application-id <application-id>", $("the id of the application")).option("--version <version>", $("the version of the application")).option("--package-file <package-file>", $("the application package in zip format")).appendSubscriptionAndResourceGroupOption().execute(addApplicationPkg);








  applicationPkg.command("delete [resource-group] [account-name] [application-id] [version]").description($("Deletes an application package record")).option("--account-name <account-name>", $("the name of the Batch account")).option("--application-id <application-id>", $("the id of the application")).option("--version <version>", $("the version of the application to delete")).option("-q, --quiet", $("delete the specified application package without confirmation")).appendSubscriptionAndResourceGroupOption().execute(deleteApplicationPkg);








  applicationPkg.command("show [resource-group] [account-name] [application-id] [version]").description($("Show details of the Batch application package")).option("--account-name <account-name>", $("the name of the Batch account")).option("--application-id <application-id>", $("the id of the application")).option("--version <version>", $("the version of the application to show")).appendSubscriptionAndResourceGroupOption().execute(showApplicationPkg);







  applicationPkg.command("activate [resource-group] [account-name] [application-id] [version] [format]").description($("Activate an application package")).option("--account-name <account-name>", $("the name of the Batch account")).option("--application-id <application-id>", $("the id of the application")).option("--version <version>", $("the version of the application to activate")).option("--format <format>", $("the format of the application package binary file")).appendSubscriptionAndResourceGroupOption().execute(activateApplicationPkg);












  function validateResourceGroupAndAccountName(resourceGroup, accountName, options, _) { var __frame = { name: "validateResourceGroupAndAccountName", line: 143 }; return __func(_, this, arguments, validateResourceGroupAndAccountName, 3, __frame, function __$validateResourceGroupAndAccountName() {
      if (resourceGroup) {
        options.resourceGroup = resourceGroup; } ;

      return cli.interaction.promptIfNotGiven($("Resource group name: "), options.resourceGroup, __cb(_, __frame, 4, 44, function ___(__0, __1) { options.resourceGroup = __1;

        if (accountName) {
          options.accountName = accountName; } ;

        return cli.interaction.promptIfNotGiven($("Account name: "), options.accountName, __cb(_, __frame, 9, 42, function ___(__0, __2) { options.accountName = __2; _(); }, true)); }, true)); }); };


  function validateResourceGroupAccountApplication(resourceGroup, accountName, applicationId, options, _) { var __frame = { name: "validateResourceGroupAccountApplication", line: 155 }; return __func(_, this, arguments, validateResourceGroupAccountApplication, 4, __frame, function __$validateResourceGroupAccountApplication() {
      return validateResourceGroupAndAccountName(resourceGroup, accountName, options, __cb(_, __frame, 1, 4, function __$validateResourceGroupAccountApplication() {

        if (applicationId) {
          options.applicationId = applicationId; } ;

        return cli.interaction.promptIfNotGiven($("Application Id: "), options.applicationId, __cb(_, __frame, 6, 44, function ___(__0, __1) { options.applicationId = __1; _(); }, true)); }, true)); }); };


  function validateAll(resourceGroup, accountName, applicationId, version, options, _) { var __frame = { name: "validateAll", line: 164 }; return __func(_, this, arguments, validateAll, 5, __frame, function __$validateAll() {
      return validateResourceGroupAccountApplication(resourceGroup, accountName, applicationId, options, __cb(_, __frame, 1, 4, function __$validateAll() {

        if (version) {
          options.version = version; } ;

        return cli.interaction.promptIfNotGiven($("Version: "), options.version, __cb(_, __frame, 6, 38, function ___(__0, __1) { options.version = __1; _(); }, true)); }, true)); }); };







  function addApplication(resourcegroup, accountName, applicationId, options, _) { var service, batchAccount, tips, param; var __frame = { name: "addApplication", line: 178 }; return __func(_, this, arguments, addApplication, 4, __frame, function __$addApplication() {
      service = batchUtil.createBatchManagementClient(options.subscription);

      return validateResourceGroupAccountApplication(resourcegroup, accountName, applicationId, options, __cb(_, __frame, 3, 4, function __$addApplication() {

        return service.account.get(options.resourceGroup, options.accountName, __cb(_, __frame, 5, 39, function ___(__0, __1) { batchAccount = __1;
          if ((!batchAccount.autoStorage || !batchAccount.autoStorage.storageAccountId)) {
            return _(new Error($("The account need has auto-storage enabled"))); } ;


          tips = util.format($("Adding application %s"), applicationId);
          param = { };
          if ((typeof options.allowUpdates !== "undefined")) {
            param.allowUpdates = ((options.allowUpdates === "true")); } ;

          if (options.displayName) {
            param.displayName = options.displayName; } ; return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$addApplication() {



                startProgress(tips);
                return service.applicationOperations.addApplication(options.resourceGroup, options.accountName, options.applicationId, { parameters: param }, __cb(_, __frame, 21, 36, function __$addApplication() { _(null, null, true); }, true)); }); })(function ___(__e, __r, __cont) { (function ___(__then) { __tryCatch(_, function __$addApplication() {

                  endProgress(); __then(); }); })(function ___() { __tryCatch(_, function ___() { if (__cont) { __then(); } else { _(__e, __r); }; }); }); }); })(function ___() { __tryCatch(_, function __$addApplication() {


              logger.verbose(util.format($("Application %s has been added to account %s successfully"), applicationId, accountName)); _(); }); }); }, true)); }, true)); }); };







  function updateApplication(resourcegroup, accountName, applicationId, options, _) { var service, tips, param; var __frame = { name: "updateApplication", line: 212 }; return __func(_, this, arguments, updateApplication, 4, __frame, function __$updateApplication() {
      service = batchUtil.createBatchManagementClient(options.subscription);

      return validateResourceGroupAccountApplication(resourcegroup, accountName, applicationId, options, __cb(_, __frame, 3, 4, function __$updateApplication() {
        if ((!options.allowUpdates && !options.displayName)) {
          return _(new Error($("Please specify at least one of option: allow-updates, display-name"))); } ;


        tips = util.format($("Updating application %s"), applicationId);
        param = { };
        if ((typeof options.allowUpdates !== "undefined")) {
          param.allowUpdates = ((options.allowUpdates === "true")); } ;

        if (options.displayName) {
          param.displayName = options.displayName; } ; return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$updateApplication() {



              startProgress(tips);
              return service.applicationOperations.updateApplication(options.resourceGroup, options.accountName, options.applicationId, param, __cb(_, __frame, 19, 36, function __$updateApplication() { _(null, null, true); }, true)); }); })(function ___(__e, __r, __cont) { (function ___(__then) { __tryCatch(_, function __$updateApplication() {

                endProgress(); __then(); }); })(function ___() { __tryCatch(_, function ___() { if (__cont) { __then(); } else { _(__e, __r); }; }); }); }); })(function ___() { __tryCatch(_, function __$updateApplication() {


            logger.verbose(util.format($("Application %s has been updated at account %s successfully"), applicationId, accountName)); _(); }); }); }, true)); }); };







  function deleteApplication(resourcegroup, accountName, applicationId, options, _) { var service, tips; var __frame = { name: "deleteApplication", line: 244 }; return __func(_, this, arguments, deleteApplication, 4, __frame, function __$deleteApplication() {
      service = batchUtil.createBatchManagementClient(options.subscription);

      return validateResourceGroupAccountApplication(resourcegroup, accountName, applicationId, options, __cb(_, __frame, 3, 4, function __$deleteApplication() { return (function __$deleteApplication(__then) {

          if (!options.quiet) {
            return interaction.confirm(util.format($("Do you want to delete application %s? "), applicationId), __cb(_, __frame, 6, 23, function ___(__0, __2) { var __1 = !__2; return (function __$deleteApplication(__then) { if (__1) { return _(null); } else { __then(); } ; })(__then); }, true)); } else { __then(); } ; })(function __$deleteApplication() {




          tips = util.format($("Deleting application %s"), applicationId); return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$deleteApplication() {

                startProgress(tips);
                return service.applicationOperations.deleteApplication(options.resourceGroup, options.accountName, options.applicationId, __cb(_, __frame, 14, 36, function __$deleteApplication() { _(null, null, true); }, true)); }); })(function ___(__e, __r, __cont) { (function ___(__then) { __tryCatch(_, function __$deleteApplication() {

                  endProgress(); __then(); }); })(function ___() { __tryCatch(_, function ___() { if (__cont) { __then(); } else { _(__e, __r); }; }); }); }); })(function ___() { __tryCatch(_, function __$deleteApplication() {


              logger.verbose(util.format($("Application %s has been deleted from account %s successfully"), applicationId, accountName)); _(); }); }); }); }, true)); }); };







  function showApplication(resourcegroup, accountName, applicationId, options, _) { var service, tips, application; var __frame = { name: "showApplication", line: 271 }; return __func(_, this, arguments, showApplication, 4, __frame, function __$showApplication() {
      service = batchUtil.createBatchManagementClient(options.subscription);

      return validateResourceGroupAccountApplication(resourcegroup, accountName, applicationId, options, __cb(_, __frame, 3, 4, function __$showApplication() {
        tips = $("Getting Batch application information");

        application = null; return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$showApplication() {

              startProgress(tips);
              return service.applicationOperations.getApplication(options.resourceGroup, options.accountName, options.applicationId, __cb(_, __frame, 9, 50, function ___(__0, __1) { application = __1; _(null, null, true); }, true)); }); })(function ___(__e, __r, __cont) { (function ___(__then) { __tryCatch(_, function __$showApplication() {

                endProgress(); __then(); }); })(function ___() { __tryCatch(_, function ___() { if (__cont) { __then(); } else { _(__e, __r); }; }); }); }); })(function ___() { __tryCatch(_, function __$showApplication() {


            batchShowUtil.showApplication(application, cli.output); _(); }); }); }, true)); }); };







  function listApplication(resourcegroup, accountName, options, _) { var service, tips, applications, result, nextLink; var __frame = { name: "listApplication", line: 293 }; return __func(_, this, arguments, listApplication, 3, __frame, function __$listApplication() {
      service = batchUtil.createBatchManagementClient(options.subscription);

      return validateResourceGroupAndAccountName(resourcegroup, accountName, options, __cb(_, __frame, 3, 4, function __$listApplication() {
        tips = $("Listing Batch applications");

        applications = []; return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$listApplication() {

              startProgress(tips);
              return service.applicationOperations.list(options.resourceGroup, options.accountName, __cb(_, __frame, 9, 49, function ___(__0, __1) { result = __1;
                result.forEach(function(app) {
                  applications.push(app); });

                nextLink = result.nextLink; return (function ___(__break) { var __more; var __loop = __cb(_, __frame, 0, 0, function __$listApplication() { __more = false;

                    var __5 = nextLink; if (__5) {
                      return service.applicationOperations.listNext(nextLink, __cb(_, __frame, 16, 47, function ___(__0, __2) { result = __2;
                        result.forEach(function(app) {
                          applications.push(app); });

                        nextLink = result.nextLink; while (__more) { __loop(); }; __more = true; }, true)); } else { __break(); } ; }); do { __loop(); } while (__more); __more = true; })(function __$listApplication() { _(null, null, true); }); }, true)); }); })(function ___(__e, __r, __cont) { (function ___(__then) { __tryCatch(_, function __$listApplication() {


                endProgress(); __then(); }); })(function ___() { __tryCatch(_, function ___() { if (__cont) { __then(); } else { _(__e, __r); }; }); }); }); })(function ___() { __tryCatch(_, function __$listApplication() {


            cli.interaction.formatOutput(applications, function(outputData) {
              if ((outputData.length === 0)) {
                logger.info($("No application found")); }
               else {
                logger.table(outputData, function(row, item) {
                  row.cell($("Id"), item.id);
                  row.cell($("Default Version"), item.defaultVersion);
                  row.cell($("Allow Updates"), item.allowUpdates);
                  if (item.packages) {
                    row.cell($("Version Count"), item.packages.length); } ; }); } ; }); _(); }); }); }, true)); }); };











  function showApplicationSummary(applicationId, options, _) { var client, tips, batchOptions, application; var __frame = { name: "showApplicationSummary", line: 340 }; return __func(_, this, arguments, showApplicationSummary, 2, __frame, function __$showApplicationSummary() {
      client = batchUtil.createBatchServiceClient(options);
      tips = $("Showing Batch application summary");
      batchOptions = { };
      batchOptions.applicationGetOptions = batchUtil.getBatchOperationDefaultOption();

      application = null;
      startProgress(tips); return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$showApplicationSummary() { return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$showApplicationSummary() {


                  return client.application.get(applicationId, batchOptions, __cb(_, __frame, 10, 39, function ___(__0, __1) { application = __1; __then(); }, true)); }); })(function ___(err, __result) { __catch(function __$showApplicationSummary() { if (err) {

                    if (err.message) {
                      if ((typeof err.message === "object")) {
                        err.message = err.message.value; } ; } ;



                    return _(err); } else { _(null, __result); } ; }, _); }); })(function ___() { __tryCatch(_, function __$showApplicationSummary() { _(null, null, true); }); }); }); })(function ___(__e, __r, __cont) { (function ___(__then) { __tryCatch(_, function __$showApplicationSummary() {

              endProgress(); __then(); }); })(function ___() { __tryCatch(_, function ___() { if (__cont) { __then(); } else { _(__e, __r); }; }); }); }); })(function ___() { __tryCatch(_, function __$showApplicationSummary() {


          batchShowUtil.showApplicationSummary(application, cli.output); _(); }); }); }); };







  function listApplicationSummary(options, _) { var client, tips, batchOptions, applications, result, nextLink; var __frame = { name: "listApplicationSummary", line: 371 }; return __func(_, this, arguments, listApplicationSummary, 1, __frame, function __$listApplicationSummary() {
      client = batchUtil.createBatchServiceClient(options);
      tips = $("Listing Batch applications summary");
      batchOptions = { };
      batchOptions.applicationListOptions = batchUtil.getBatchOperationDefaultOption();

      applications = [];
      startProgress(tips); return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$listApplicationSummary() { return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$listApplicationSummary() {


                  return client.application.list(batchOptions, __cb(_, __frame, 10, 38, function ___(__0, __1) { result = __1;
                    result.forEach(function(app) {
                      applications.push(app); });

                    nextLink = result.odatanextLink; return (function ___(__break) { var __more; var __loop = __cb(_, __frame, 0, 0, function __$listApplicationSummary() { __more = false;

                        var __4 = nextLink; if (__4) {
                          batchOptions.applicationListOptions = batchUtil.getBatchOperationDefaultOption();
                          return client.application.listNext(nextLink, batchOptions, __cb(_, __frame, 18, 36, function ___(__0, __2) { result = __2;
                            result.forEach(function(app) {
                              applications.push(app); });

                            nextLink = result.odatanextLink; while (__more) { __loop(); }; __more = true; }, true)); } else { __break(); } ; }); do { __loop(); } while (__more); __more = true; })(__then); }, true)); }); })(function ___(err, __result) { __catch(function __$listApplicationSummary() { if (err) {


                    if (err.message) {
                      if ((typeof err.message === "object")) {
                        err.message = err.message.value; } ; } ;



                    return _(err); } else { _(null, __result); } ; }, _); }); })(function ___() { __tryCatch(_, function __$listApplicationSummary() { _(null, null, true); }); }); }); })(function ___(__e, __r, __cont) { (function ___(__then) { __tryCatch(_, function __$listApplicationSummary() {

              endProgress(); __then(); }); })(function ___() { __tryCatch(_, function ___() { if (__cont) { __then(); } else { _(__e, __r); }; }); }); }); })(function ___() { __tryCatch(_, function __$listApplicationSummary() {


          cli.interaction.formatOutput(applications, function(outputData) {
            if ((outputData.length === 0)) {
              logger.info($("No application found")); }
             else {
              logger.table(outputData, function(row, item) {
                row.cell($("Application Id"), item.id);
                row.cell($("Display Name"), item.displayName);
                row.cell($("Versions"), JSON.stringify(item.versions)); }); } ; }); _(); }); }); }); };





  function uploadAzureBlob(file, urlStr, _) { var uri, blobService, specifiedContainerName, specifiedBlobName, specifiedFileName, fsStatus; var __frame = { name: "uploadAzureBlob", line: 420 }; return __func(_, this, arguments, uploadAzureBlob, 2, __frame, function __$uploadAzureBlob() {

      uri = url.parse(urlStr);
      blobService = storage.createBlobServiceWithSas(uri.hostname, uri.query);
      specifiedContainerName = uri.pathname.split("/")[1];
      specifiedBlobName = uri.pathname.slice((2 + specifiedContainerName.length));
      specifiedFileName = file;

      return utils.fileExists(specifiedFileName, __cb(_, __frame, 8, 15, function ___(__0, __2) { var __1 = !__2; return (function __$uploadAzureBlob(__then) { if (__1) {
            return _(new Error(util.format($("Local file %s doesn't exist"), specifiedFileName))); } else { __then(); } ; })(function __$uploadAzureBlob() {

          return fs.stat(specifiedFileName, __cb(_, __frame, 11, 22, function ___(__0, __3) { fsStatus = __3;
            if (!fsStatus.isFile()) {
              return _(new Error(util.format($("%s is not a file"), specifiedFileName))); } ;


            return blobService.createBlockBlobFromLocalFile(specifiedContainerName, specifiedBlobName, specifiedFileName, __cb(_, __frame, 16, 16, function __$uploadAzureBlob() { _(); }, true)); }, true)); }); }, true)); }); };







  function addApplicationPkg(resourcegroup, accountName, applicationId, version, packageFile, options, _) { var service, tips, response; var __frame = { name: "addApplicationPkg", line: 444 }; return __func(_, this, arguments, addApplicationPkg, 6, __frame, function __$addApplicationPkg() {
      service = batchUtil.createBatchManagementClient(options.subscription);

      return validateAll(resourcegroup, accountName, applicationId, version, options, __cb(_, __frame, 3, 4, function __$addApplicationPkg() {

        tips = util.format($("Adding version %s to application %s"), version, applicationId); return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$addApplicationPkg() {


              startProgress(tips);
              return service.applicationOperations.addApplicationPackage(options.resourceGroup, options.accountName, options.applicationId, options.version, __cb(_, __frame, 9, 51, function ___(__0, __1) { response = __1;
                return uploadAzureBlob(packageFile, response.storageUrl, __cb(_, __frame, 10, 6, function __$addApplicationPkg() { _(null, null, true); }, true)); }, true)); }); })(function ___(__e, __r, __cont) { (function ___(__then) { __tryCatch(_, function __$addApplicationPkg() {

                endProgress(); __then(); }); })(function ___() { __tryCatch(_, function ___() { if (__cont) { __then(); } else { _(__e, __r); }; }); }); }); })(function ___() { __tryCatch(_, function __$addApplicationPkg() {


            logger.verbose(util.format($("Version %s has been added to application %s successfully"), version, applicationId)); _(); }); }); }, true)); }); };







  function activateApplicationPkg(resourcegroup, accountName, applicationId, version, format, options, _) { var service, tips; var __frame = { name: "activateApplicationPkg", line: 467 }; return __func(_, this, arguments, activateApplicationPkg, 6, __frame, function __$activateApplicationPkg() {
      service = batchUtil.createBatchManagementClient(options.subscription);

      return validateAll(resourcegroup, accountName, applicationId, version, options, __cb(_, __frame, 3, 4, function __$activateApplicationPkg() {
        if (!format) {
          format = options.options; } ;

        return cli.interaction.promptIfNotGiven($("Format: "), format, __cb(_, __frame, 7, 29, function ___(__0, __1) { format = __1;

          tips = util.format($("Activate application version %s"), version); return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$activateApplicationPkg() {


                startProgress(tips);
                return service.applicationOperations.activateApplicationPackage(options.resourceGroup, options.accountName, options.applicationId, options.version, format, __cb(_, __frame, 13, 36, function __$activateApplicationPkg() { _(null, null, true); }, true)); }); })(function ___(__e, __r, __cont) { (function ___(__then) { __tryCatch(_, function __$activateApplicationPkg() {

                  endProgress(); __then(); }); })(function ___() { __tryCatch(_, function ___() { if (__cont) { __then(); } else { _(__e, __r); }; }); }); }); })(function ___() { __tryCatch(_, function __$activateApplicationPkg() {


              logger.verbose(util.format($("Version %s has been activated at application %s successfully"), version, applicationId)); _(); }); }); }, true)); }, true)); }); };







  function deleteApplicationPkg(resourcegroup, accountName, applicationId, version, options, _) { var service, tips; var __frame = { name: "deleteApplicationPkg", line: 493 }; return __func(_, this, arguments, deleteApplicationPkg, 5, __frame, function __$deleteApplicationPkg() {
      service = batchUtil.createBatchManagementClient(options.subscription);

      return validateAll(resourcegroup, accountName, applicationId, version, options, __cb(_, __frame, 3, 4, function __$deleteApplicationPkg() { return (function __$deleteApplicationPkg(__then) {

          if (!options.quiet) {
            return interaction.confirm(util.format($("Do you want to delete application version %s? "), version), __cb(_, __frame, 6, 23, function ___(__0, __2) { var __1 = !__2; return (function __$deleteApplicationPkg(__then) { if (__1) { return _(null); } else { __then(); } ; })(__then); }, true)); } else { __then(); } ; })(function __$deleteApplicationPkg() {




          tips = util.format($("Deleting application version %s"), version); return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$deleteApplicationPkg() {

                startProgress(tips);
                return service.applicationOperations.deleteApplicationPackage(options.resourceGroup, options.accountName, options.applicationId, options.version, __cb(_, __frame, 14, 36, function __$deleteApplicationPkg() { _(null, null, true); }, true)); }); })(function ___(__e, __r, __cont) { (function ___(__then) { __tryCatch(_, function __$deleteApplicationPkg() {

                  endProgress(); __then(); }); })(function ___() { __tryCatch(_, function ___() { if (__cont) { __then(); } else { _(__e, __r); }; }); }); }); })(function ___() { __tryCatch(_, function __$deleteApplicationPkg() {


              logger.verbose(util.format($("Version %s has been deleted from application %s successfully"), version, applicationId)); _(); }); }); }); }, true)); }); };







  function showApplicationPkg(resourcegroup, accountName, applicationId, version, options, _) { var service, tips, applicaiton; var __frame = { name: "showApplicationPkg", line: 520 }; return __func(_, this, arguments, showApplicationPkg, 5, __frame, function __$showApplicationPkg() {
      service = batchUtil.createBatchManagementClient(options.subscription);

      return validateAll(resourcegroup, accountName, applicationId, version, options, __cb(_, __frame, 3, 4, function __$showApplicationPkg() {
        tips = $("Getting Batch application package information");

        applicaiton = null; return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$showApplicationPkg() {

              startProgress(tips);
              return service.applicationOperations.getApplicationPackage(options.resourceGroup, options.accountName, options.applicationId, options.version, __cb(_, __frame, 9, 50, function ___(__0, __1) { applicaiton = __1; _(null, null, true); }, true)); }); })(function ___(__e, __r, __cont) { (function ___(__then) { __tryCatch(_, function __$showApplicationPkg() {

                endProgress(); __then(); }); })(function ___() { __tryCatch(_, function ___() { if (__cont) { __then(); } else { _(__e, __r); }; }); }); }); })(function ___() { __tryCatch(_, function __$showApplicationPkg() {


            batchShowUtil.showAppPackage(applicaiton, cli.output); _(); }); }); }, true)); }); };};
