/*** Generated by streamline 0.10.17 (callbacks) - DO NOT EDIT ***/ var __rt=require('streamline/lib/callbacks/runtime').runtime(__filename, false),__func=__rt.__func,__cb=__rt.__cb; var util = require("util");

















var profile = require("../../util/profile");
var utils = require("../../util/utils");

var connectionStringParser = require("azure-common").ConnectionStringParser;
var WebsitesClient = require("./websites/websitesclient");

var $ = utils.getLocaleString;

exports.init = function(cli) {
  var log = cli.output;
  var site = cli.category("site");
  var siteAppsettings = site.category("appsetting").description($("Commands to manage your Web Site application settings"));


  siteAppsettings.listCommand = function siteAppsettings_listCommand__1(name, options, _) { var parsedSiteName, context, siteConfigurations; var __frame = { name: "siteAppsettings_listCommand__1", line: 33 }; return __func(_, this, arguments, siteAppsettings_listCommand__1, 2, __frame, function __$siteAppsettings_listCommand__1() {
      parsedSiteName = WebsitesClient.parseSiteName(name);
      context = {
        subscription: profile.current.getSubscription(options.subscription).id,
        site: {
          name: parsedSiteName.name,
          slot: (options.slot ? options.slot : parsedSiteName.slot) } };



      return site.lookupSiteNameAndWebSpace(context, __cb(_, __frame, 10, 11, function __$siteAppsettings_listCommand__1() {

        return site.doSiteConfigGet(context, __cb(_, __frame, 12, 36, function ___(__0, __1) { siteConfigurations = __1;
          siteConfigurations.appSettings = getSettings(siteConfigurations.appSettings);

          cli.interaction.formatOutput(siteConfigurations.appSettings, function(data) {
            if ((data.length > 0)) {
              log.table(data, function(row, item) {
                row.cell($("Name"), item.name);
                row.cell($("Value"), item.value); }); }

             else {
              log.info($("No app settings defined yet")); } ; }); _(); }, true)); }, true)); }); };




  siteAppsettings.addCommand = function siteAppsettings_addCommand__2(keyvaluepair, name, options, _) { var parsedSiteName, context, settings, siteConfigurations, setting; var __frame = { name: "siteAppsettings_addCommand__2", line: 60 }; return __func(_, this, arguments, siteAppsettings_addCommand__2, 3, __frame, function __$siteAppsettings_addCommand__2() {
      parsedSiteName = WebsitesClient.parseSiteName(name);
      context = {
        subscription: profile.current.getSubscription(options.subscription).id,
        site: {
          name: parsedSiteName.name,
          slot: (options.slot ? options.slot : parsedSiteName.slot) },

        keyvaluepair: keyvaluepair };


      settings = connectionStringParser.parse(context.keyvaluepair, { skipLowerCase: true });

      return site.lookupSiteNameAndWebSpace(context, __cb(_, __frame, 13, 9, function __$siteAppsettings_addCommand__2() {
        return site.doSiteConfigGet(context, __cb(_, __frame, 14, 34, function ___(__0, __1) { siteConfigurations = __1;

          if ((Object.keys(settings).length > 0)) {

            for (setting in settings) {
              if (settings.hasOwnProperty(setting)) {
                if (Object.keys(siteConfigurations.appSettings).some(function(kvp) {
                  return utils.ignoreCaseEquals(kvp, setting);
                })) {

                  return _(new Error(util.format($("Application setting with key \"%s\" already exists"), setting))); } ;


                siteConfigurations.appSettings[setting] = settings[setting]; } ; }; } ;




          return site.doSiteConfigPUT(siteConfigurations, context, __cb(_, __frame, 32, 9, function __$siteAppsettings_addCommand__2() { _(); }, true)); }, true)); }, true)); }); };


  siteAppsettings.deleteCommand = function siteAppsettings_deleteCommand__3(key, name, options, _) { var parsedSiteName, context, siteConfigurations, found; var __frame = { name: "siteAppsettings_deleteCommand__3", line: 95 }; return __func(_, this, arguments, siteAppsettings_deleteCommand__3, 3, __frame, function __$siteAppsettings_deleteCommand__3() {
      parsedSiteName = WebsitesClient.parseSiteName(name);
      context = {
        subscription: profile.current.getSubscription(options.subscription).id,
        site: {
          name: parsedSiteName.name,
          slot: (options.slot ? options.slot : parsedSiteName.slot) },

        key: key };


      return site.lookupSiteNameAndWebSpace(context, __cb(_, __frame, 11, 9, function __$siteAppsettings_deleteCommand__3() {
        return site.doSiteConfigGet(context, __cb(_, __frame, 12, 34, function ___(__0, __2) { siteConfigurations = __2;

          found = false; return (function __$siteAppsettings_deleteCommand__3(__then) {
            if (siteConfigurations.appSettings) {
              Object.keys(siteConfigurations.appSettings).forEach(function(currentKey) {
                if (utils.ignoreCaseEquals(currentKey, key)) {
                  delete siteConfigurations.appSettings[currentKey];
                  found = true; } ; }); return (function __$siteAppsettings_deleteCommand__3(__then) {



                if (found) { return (function __$siteAppsettings_deleteCommand__3(_) {
                    var __1 = !options.quiet; if (!__1) { return _(null, __1); } ; return cli.interaction.confirm(util.format($("Delete application setting %s? [y/n] "), key), __cb(_, __frame, 24, 47, function ___(__0, __3) { var __2 = !__3; return _(null, __2); }, true)); })(__cb(_, __frame, -94, 18, function ___(__0, __3) { return (function __$siteAppsettings_deleteCommand__3(__then) { if (__3) { return _(null); } else { __then(); } ; })(function __$siteAppsettings_deleteCommand__3() {



                      return site.doSiteConfigPUT(siteConfigurations, context, __cb(_, __frame, 28, 13, __then, true)); }); }, true)); } else { __then(); } ; })(__then); } else { __then(); } ; })(function __$siteAppsettings_deleteCommand__3() {



            if (!found) {
              return _(new Error(util.format($("Application setting with key \"%s\" does not exist"), key))); } ; _(); }); }, true)); }, true)); }); };



  siteAppsettings.showCommand = function siteAppsettings_showCommand__4(key, name, options, _) { var parsedSiteName, context, siteConfigurations, found; var __frame = { name: "siteAppsettings_showCommand__4", line: 132 }; return __func(_, this, arguments, siteAppsettings_showCommand__4, 3, __frame, function __$siteAppsettings_showCommand__4() {
      parsedSiteName = WebsitesClient.parseSiteName(name);
      context = {
        subscription: profile.current.getSubscription(options.subscription).id,
        site: {
          name: parsedSiteName.name,
          slot: (options.slot ? options.slot : parsedSiteName.slot) },

        key: key };


      return site.lookupSiteNameAndWebSpace(context, __cb(_, __frame, 11, 9, function __$siteAppsettings_showCommand__4() {
        return site.doSiteConfigGet(context, __cb(_, __frame, 12, 34, function ___(__0, __1) { siteConfigurations = __1;

          found = false;
          if (siteConfigurations.appSettings) {
            Object.keys(siteConfigurations.appSettings).forEach(function(currentKey) {
              if (utils.ignoreCaseEquals(currentKey, key)) {
                log.data($("Value: "), siteConfigurations.appSettings[currentKey]);
                found = true;
                return; } ; }); } ;




          if (!found) {
            return _(new Error(util.format($("Application setting with key \"%s\" does not exist"), key))); } ; _(); }, true)); }, true)); }); };



  function getSettings(appSettings) {
    var settings = [];

    if (appSettings) {
      for (var setting in appSettings) {
        settings.push({
          name: setting,
          value: appSettings[setting] }); }; } ;




    return settings; };


  siteAppsettings.command("list [name]").usage("[options] [name]").description($("Show your site application settings")).option("--slot <slot>", $("the name of the slot")).option("-s, --subscription <id>", $("the subscription id")).execute(siteAppsettings.listCommand);






  siteAppsettings.command("add <keyvaluepair> [name]").usage("[options] <keyvaluepair> [name]").description($("Add an application setting for your site (for values containing the character ';', use quotes in the format of \"\\\"value\\\"\". e.g. SB_CONN=\"\\\"Endpoint=sb://namespace.servicebus.windows.net/;SharedSecretIssuer=owner\"\\\")")).option("--slot <slot>", $("the name of the slot")).option("-s, --subscription <id>", $("the subscription id")).execute(siteAppsettings.addCommand);






  siteAppsettings.command("delete <key> [name]").usage("[options] <key> [name]").description($("Delete an application setting for your site")).option("--slot <slot>", $("the name of the slot")).option("-q, --quiet", $("quiet mode, do not ask for delete confirmation")).option("-s, --subscription <id>", $("the subscription id")).execute(siteAppsettings.deleteCommand);







  siteAppsettings.command("show <key> [name]").usage("[options] <key> [name]").description($("Show an application setting for your site")).option("--slot <slot>", $("the name of the slot")).option("-s, --subscription <id>", $("the subscription id")).execute(siteAppsettings.showCommand);};
