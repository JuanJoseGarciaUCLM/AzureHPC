/*** Generated by streamline 0.10.17 (callbacks) - DO NOT EDIT ***/ "use strict"; var __rt=require('streamline/lib/callbacks/runtime').runtime(__filename, false),__func=__rt.__func,__cb=__rt.__cb; var utils = require("../../../util/utils");

















var insightsUtils = require("./insights.utils");
var $ = utils.getLocaleString;

exports.init = function(cli) {
  var log = cli.output;
  var insightsDiagnosticCommand = cli.category("insights").category("logprofile").description($("Configure log profiles")).command("get").description($("Get the log profile.")).usage("[options]").option("-n, --name <name>", $("name of the log profile.")).execute(function __1(options, _) { var __frame = { name: "__1", line: 30 }; return __func(_, this, arguments, __1, 1, __frame, function __$__1() {






      return insightsDiagnosticCommand._prepareAndExecute(options, __cb(_, __frame, 1, 34, function __$__1() { _(); }, true)); }); });


  insightsDiagnosticCommand._prepareAndExecute = function insightsDiagnosticCommand__prepareAndExecute__2(options, _) { var client, __this = this; var __frame = { name: "insightsDiagnosticCommand__prepareAndExecute__2", line: 34 }; return __func(_, this, arguments, insightsDiagnosticCommand__prepareAndExecute__2, 1, __frame, function __$insightsDiagnosticCommand__prepareAndExecute__2() {
      client = insightsUtils.createInsightsManagementClient(log, options);
      return __this._executeCmd(client, cli, log, options, __cb(_, __frame, 2, 9, function __$insightsDiagnosticCommand__prepareAndExecute__2() { _(); }, true)); }); };


  insightsDiagnosticCommand._executeCmd = function insightsDiagnosticCommand__executeCmd__3(client, cli, log, options, _) { var getResponse, properties; var __frame = { name: "insightsDiagnosticCommand__executeCmd__3", line: 39 }; return __func(_, this, arguments, insightsDiagnosticCommand__executeCmd__3, 4, __frame, function __$insightsDiagnosticCommand__executeCmd__3() {
      return client.logProfilesOperations.get(options.name, __cb(_, __frame, 1, 51, function ___(__0, __1) { getResponse = __1;
        properties = getResponse.properties;

        properties.id = getResponse.id;
        properties.name = getResponse.name;

        insightsUtils.formatOutput(cli, log, options, properties); _(); }, true)); }); };};
