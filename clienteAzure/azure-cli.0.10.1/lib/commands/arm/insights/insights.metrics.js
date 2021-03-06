/*** Generated by streamline 0.10.17 (callbacks) - DO NOT EDIT ***/ "use strict"; var __rt=require('streamline/lib/callbacks/runtime').runtime(__filename, false),__func=__rt.__func,__cb=__rt.__cb,__tryCatch=__rt.__tryCatch; var __ = require("underscore");

















var util = require("util");
var utils = require("../../../util/utils");
var insightsUtils = require("./insights.utils");

var $ = utils.getLocaleString;

exports.init = function(cli) {
  var log = cli.output;
  var insightsCommand = cli.category("insights");

  var insightsMetricsCommand = insightsCommand.category("metrics").description($("Retrieve metrics values resource")).command("list <resourceId> <timeGrain>").description($("List metric values for a resource.")).usage("[options] <resourceId> <timeGrain>").option("-i --resourceId <resourceId>", $("The resource Id.")).option("-t --timeGrain <timeGrain>", $("The time grain. Expected format hh:mm:ss.")).option("-b --startTime <startTime>", $("The start time of the query.")).option("-e --endTime <endTime>", $("The end time of the query.")).option("-n --metricNames <metricNames>", $("The list of metric names.")).option("-s --subscription <subscription>", $("The subscription identifier.")).execute(function __1(resourceId, timeGrain, options, _) { var __frame = { name: "__1", line: 40 }; return __func(_, this, arguments, __1, 3, __frame, function __$__1() {











      return insightsMetricsCommand._prepareAndExecute(resourceId, timeGrain, options, __cb(_, __frame, 1, 31, function __$__1() { _(); }, true)); }); });


  insightsMetricsCommand._processGeneralParameters = function(startTime, endTime, timeGrain, metricNames) {
    var clauses = [];
    var nameClauses = insightsUtils.addMetricNamesFilter(metricNames);

    if ((__.isString(nameClauses) && (nameClauses !== ""))) {
      clauses.push(nameClauses); } ;


    log.silly(timeGrain);
    if (__.isString(timeGrain)) {
      clauses.push(util.format("timeGrain eq duration'%s'", insightsUtils.validateTimeSpan(timeGrain).toISOString())); } ;


    clauses.push(insightsUtils.validateDateTimeRangeAndAddDefaultsMetrics(startTime, endTime));

    return clauses.join(" and "); };


  insightsMetricsCommand._validateResourceType = function(resourceId) {
    var tempResourceId = resourceId.trim();
    if (((tempResourceId.length > 0) && (tempResourceId.charAt((tempResourceId.length - 1)) === "/"))) {
      tempResourceId = tempResourceId.substring(0, (tempResourceId.length - 2)); } ;


    var sections = tempResourceId.split("/");
    log.silly(("Sections: " + util.inspect(sections)));

    for (var i = 0; (i < (sections.length - 1)); i++) {
      if ((sections[i].toLowerCase() === "providers")) {
        var resourceType = sections[(i + 1)].trim().toLowerCase();


        if ((((resourceType === "microsoft.web") || (resourceType === "microsoft.sql")) || (resourceType === "microsoft.documentdb"))) {
          return true; } ;


        log.info($("Cli can retrieve metrics for microsoft.web, microsoft.sql, and microsoft.documentdb. PowerShell can retrieve for any resource type."));
        break; } ; };



    return false; };


  insightsMetricsCommand._prepareAndExecute = function insightsMetricsCommand__prepareAndExecute__2(resourceId, timeGrain, options, _) { var client, queryFilter, __this = this; var __frame = { name: "insightsMetricsCommand__prepareAndExecute__2", line: 88 }; return __func(_, this, arguments, insightsMetricsCommand__prepareAndExecute__2, 3, __frame, function __$insightsMetricsCommand__prepareAndExecute__2() {
      log.silly(util.format("Parameters: resourceId=%s, timeGrain=%s, startTime=%s, endTime=%s, metricNames=%s", resourceId, timeGrain, options.startTime, options.endTime, options.metricNames));

      if ((__.isNull(resourceId) || __.isUndefined(resourceId))) {
        return _(null, cli.missingArgument("resourceId")); } ;


      if (((!__.isString(resourceId) || (resourceId.trim() === "")) || !insightsMetricsCommand._validateResourceType(resourceId))) {
        return _(new Error(util.format($("Invalid resourceId: \"%s\""), resourceId))); } ;


      if (!__.isString(timeGrain)) {
        return _(null, cli.missingArgument("timeGrain")); } ;


      client = insightsUtils.createInsightsClient(log, options);
      queryFilter = __this._processGeneralParameters(options.startTime, options.endTime, timeGrain, options.metricNames);

      return __this._executeCmd(client, resourceId, queryFilter, insightsUtils.passAllFilter, options, __cb(_, __frame, 18, 16, _, true)); }); };


  insightsMetricsCommand._executeCmd = function insightsMetricsCommand__executeCmd__3(client, resourceId, queryFilter, keepTheRecord, options, _) { var progress, result, response; var __frame = { name: "insightsMetricsCommand__executeCmd__3", line: 109 }; return __func(_, this, arguments, insightsMetricsCommand__executeCmd__3, 5, __frame, function __$insightsMetricsCommand__executeCmd__3() {
      progress = cli.interaction.progress(util.format($("Querying \"%s\""), queryFilter));
      result = []; return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$insightsMetricsCommand__executeCmd__3() {

            return client.metricOperations.getMetrics(resourceId, queryFilter, __cb(_, __frame, 4, 45, function ___(__0, __1) { response = __1;

              log.silly((response ? util.inspect(response) : "nothing in response"));
              log.silly(((response && response.metricCollection) ? util.inspect(response.metricCollection) : "nothing in metricCollection"));

              __.each(response.metricCollection.value, function(element) { if (keepTheRecord(element)) { result.push(element); } ; }); _(null, null, true); }, true)); }); })(function ___(__e, __r, __cont) { (function ___(__then) { __tryCatch(_, function __$insightsMetricsCommand__executeCmd__3() {

              progress.end(); __then(); }); })(function ___() { __tryCatch(_, function ___() { if (__cont) { __then(); } else { _(__e, __r); }; }); }); }); })(function ___() { __tryCatch(_, function __$insightsMetricsCommand__executeCmd__3() {


          insightsUtils.formatOutputList(cli, log, options, result); _(); }); }); }); };};
