/*** Generated by streamline 0.10.17 (callbacks) - DO NOT EDIT ***/ var __rt=require('streamline/lib/callbacks/runtime').runtime(__filename, false),__func=__rt.__func,__cb=__rt.__cb; var utils = require("../../util/utils");
















var batchUtil = require("./batch.util");

var $ = utils.getLocaleString;

exports.init = function(cli) {
  var log = cli.output;

  var batch = cli.category("batch");

  var batchSubscription = batch.category("subscription").description($("Commands to manage Batch options at the subscription level"));


  function listQuotas(batchClient, location, options, _) { var quotas; var __frame = { name: "listQuotas", line: 30 }; return __func(_, this, arguments, listQuotas, 3, __frame, function __$listQuotas() {
      return batchClient.subscription.getSubscriptionQuotas(location, options, __cb(_, __frame, 1, 42, function ___(__0, __1) { quotas = __1;
        return _(null, quotas); }, true)); }); };


  batchSubscription.listQuotasCommand = function batchSubscription_listQuotasCommand__1(location, options, _) { var batchClient, quotas; var __frame = { name: "batchSubscription_listQuotasCommand__1", line: 35 }; return __func(_, this, arguments, batchSubscription_listQuotasCommand__1, 2, __frame, function __$batchSubscription_listQuotasCommand__1() {
      batchClient = batchUtil.createBatchManagementClient(options.subscription);

      return listQuotas(batchClient, location, options, __cb(_, __frame, 3, 17, function ___(__0, __1) { quotas = __1;

        if (quotas) {
          cli.interaction.formatOutput(quotas, function(outputData) {
            log.data($("Account Quota:"), outputData.accountQuota); }); }

         else {
          log.info($("No quotas retrieved")); } ; _(); }, true)); }); };




  batchSubscription.command("list-quotas <location>").description($("List the subscription level Batch quotas in the specified region")).option("-s, --subscription <id>", $("the subscription id")).execute(batchSubscription.listQuotasCommand);};
