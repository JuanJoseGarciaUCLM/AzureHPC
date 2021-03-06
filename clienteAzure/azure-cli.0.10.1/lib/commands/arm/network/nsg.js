/*** Generated by streamline 0.10.17 (callbacks) - DO NOT EDIT ***/ var __rt=require('streamline/lib/callbacks/runtime').runtime(__filename, false),__func=__rt.__func,__cb=__rt.__cb,__catch=__rt.__catch,__tryCatch=__rt.__tryCatch; var __ = require("underscore");















var util = require("util");
var utils = require("../../../util/utils");
var validation = require("../../../util/validation");
var $ = utils.getLocaleString;
var constants = require("./constants");
var tagUtils = require("../tag/tagUtils");
var resourceUtils = require("../resource/resourceUtils");

function Nsg(cli, networkManagementClient) {
  this.networkManagementClient = networkManagementClient;
  this.output = cli.output;
  this.interaction = cli.interaction;};


__.extend(Nsg.prototype, {



  create: function create__1(resourceGroupName, nsgName, location, options, _) { var self, nsg, progress, __this = this; var __frame = { name: "create__1", line: 35 }; return __func(_, this, arguments, create__1, 4, __frame, function __$create__1() { self = __this;

      return self.get(resourceGroupName, nsgName, __cb(_, __frame, 2, 19, function ___(__0, __1) { nsg = __1;

        if (nsg) {
          return _(new Error(util.format($("A network security group with name \"%s\" already exists in the resource group \"%s\""), nsgName, resourceGroupName))); } ;


        nsg = {
          name: nsgName,
          location: location };

        nsg = self._parseSecurityGroup(nsg, options);

        progress = self.interaction.progress(util.format($("Creating a network security group \"%s\""), nsgName)); return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$create__1() {

              return self.networkManagementClient.networkSecurityGroups.createOrUpdate(resourceGroupName, nsgName, nsg, __cb(_, __frame, 16, 63, function ___(__0, __2) { nsg = __2; _(null, null, true); }, true)); }); })(function ___(__e, __r, __cont) { (function ___(__then) { __tryCatch(_, function __$create__1() {

                progress.end(); __then(); }); })(function ___() { __tryCatch(_, function ___() { if (__cont) { __then(); } else { _(__e, __r); }; }); }); }); })(function ___() { __tryCatch(_, function __$create__1() {

            self._showSecurityGroup(nsg, resourceGroupName, nsgName); _(); }); }); }, true)); }); },


  set: function set__2(resourceGroupName, nsgName, options, _) { var self, nsg, progress, __this = this; var __frame = { name: "set__2", line: 58 }; return __func(_, this, arguments, set__2, 3, __frame, function __$set__2() { self = __this;

      return self.get(resourceGroupName, nsgName, __cb(_, __frame, 2, 19, function ___(__0, __1) { nsg = __1;

        if (!nsg) {
          return _(new Error(util.format($("A network security group with name \"%s\" not found in the resource group \"%s\""), nsgName, resourceGroupName))); } ;


        nsg = self._parseSecurityGroup(nsg, options);

        progress = self.interaction.progress(util.format($("Setting a network security group \"%s\""), nsgName)); return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$set__2() {

              return self.networkManagementClient.networkSecurityGroups.createOrUpdate(resourceGroupName, nsgName, nsg, __cb(_, __frame, 12, 63, function ___(__0, __2) { nsg = __2; _(null, null, true); }, true)); }); })(function ___(__e, __r, __cont) { (function ___(__then) { __tryCatch(_, function __$set__2() {

                progress.end(); __then(); }); })(function ___() { __tryCatch(_, function ___() { if (__cont) { __then(); } else { _(__e, __r); }; }); }); }); })(function ___() { __tryCatch(_, function __$set__2() {

            self._showSecurityGroup(nsg, resourceGroupName, nsgName); _(); }); }); }, true)); }); },


  list: function list__3(options, _) { var self, groups, progress, __this = this; var __frame = { name: "list__3", line: 77 }; return __func(_, this, arguments, list__3, 1, __frame, function __$list__3() { self = __this;


      groups = null;
      progress = self.interaction.progress($("Getting the network security groups")); return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$list__3() { return (function __$list__3(__then) {


              if (options.resourceGroup) {
                return self.networkManagementClient.networkSecurityGroups.list(options.resourceGroup, __cb(_, __frame, 8, 68, function ___(__0, __1) { groups = __1; __then(); }, true)); } else {

                return self.networkManagementClient.networkSecurityGroups.listAll(__cb(_, __frame, 10, 68, function ___(__0, __2) { groups = __2; __then(); }, true)); } ; })(function __$list__3() { _(null, null, true); }); }); })(function ___(__e, __r, __cont) { (function ___(__then) { __tryCatch(_, function __$list__3() {


              progress.end(); __then(); }); })(function ___() { __tryCatch(_, function ___() { if (__cont) { __then(); } else { _(__e, __r); }; }); }); }); })(function ___() { __tryCatch(_, function __$list__3() {


          self.interaction.formatOutput(groups, function(groups) {
            if ((groups.length === 0)) {
              self.output.warn($("No network security groups found")); }
             else {
              self.output.table(groups, function(row, nsg) {
                row.cell($("Name"), nsg.name);
                row.cell($("Location"), nsg.location);
                var resInfo = resourceUtils.getResourceInformation(nsg.id);
                row.cell($("Resource group"), resInfo.resourceGroup);
                row.cell($("Provisioning state"), nsg.provisioningState);
                row.cell($("Rules number"), (nsg.defaultSecurityRules.length + nsg.securityRules.length)); }); } ; }); _(); }); }); }); },





  show: function show__4(resourceGroupName, nsgName, options, _) { var self, nsg, __this = this; var __frame = { name: "show__4", line: 109 }; return __func(_, this, arguments, show__4, 3, __frame, function __$show__4() { self = __this;

      return self.get(resourceGroupName, nsgName, __cb(_, __frame, 2, 19, function ___(__0, __1) { nsg = __1;

        self._showSecurityGroup(nsg, resourceGroupName, nsgName); _(); }, true)); }); },


  delete: function delete__5(resourceGroupName, nsgName, options, _) { var self, nsg, progress, __this = this; var __frame = { name: "delete__5", line: 116 }; return __func(_, this, arguments, delete__5, 3, __frame, function __$delete__5() { self = __this;

      return self.get(resourceGroupName, nsgName, __cb(_, __frame, 2, 19, function ___(__0, __2) { nsg = __2;
        if (!nsg) {
          return _(new Error(util.format($("A network security group with name \"%s\" not found in the resource group \"%s\""), nsgName, resourceGroupName))); } ; return (function __$delete__5(_) {


          var __1 = !options.quiet; if (!__1) { return _(null, __1); } ; return self.interaction.confirm(util.format($("Delete network security group \"%s\"? [y/n] "), nsgName), __cb(_, __frame, 7, 44, function ___(__0, __3) { var __2 = !__3; return _(null, __2); }, true)); })(__cb(_, __frame, -115, 17, function ___(__0, __3) { return (function __$delete__5(__then) { if (__3) { return _(null); } else { __then(); } ; })(function __$delete__5() {



            progress = self.interaction.progress(util.format($("Deleting network security group \"%s\""), nsgName)); return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$delete__5() {

                  return self.networkManagementClient.networkSecurityGroups.deleteMethod(resourceGroupName, nsgName, __cb(_, __frame, 13, 57, function __$delete__5() { _(null, null, true); }, true)); }); })(function ___(__e, __r, __cont) { (function ___(__then) { __tryCatch(_, function __$delete__5() {

                    progress.end(); __then(); }); })(function ___() { __tryCatch(_, function ___() { if (__cont) { __then(); } else { _(__e, __r); }; }); }); }); })(function ___() { __tryCatch(_, function __$delete__5() { _(); }); }); }); }, true)); }, true)); }); },



  get: function get__6(resourceGroupName, nsgName, _) { var self, progress, nsg, __this = this; var __frame = { name: "get__6", line: 135 }; return __func(_, this, arguments, get__6, 2, __frame, function __$get__6() { self = __this;

      progress = self.interaction.progress(util.format($("Looking up the network security group \"%s\""), nsgName)); return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$get__6() { return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$get__6() {

                  return self.networkManagementClient.networkSecurityGroups.get(resourceGroupName, nsgName, null, __cb(_, __frame, 4, 67, function ___(__0, __1) { nsg = __1;
                    return _(null, nsg); }, true)); }); })(function ___(e, __result) { __catch(function __$get__6() { if (e) {

                    if ((e.statusCode === 404)) {
                      return _(null, null); } ;

                    return _(e); } else { _(null, __result); } ; }, _); }); })(function ___() { __tryCatch(_, function __$get__6() { _(null, null, true); }); }); }); })(function ___(__e, __r, __cont) { (function ___(__then) { __tryCatch(_, function __$get__6() {

              progress.end(); __then(); }); })(function ___() { __tryCatch(_, function ___() { if (__cont) { __then(); } else { _(__e, __r); }; }); }); }); })(function ___() { __tryCatch(_, function __$get__6() { _(); }); }); }); },






  createRule: function createRule__7(resourceGroupName, nsgName, ruleName, options, _) { var self, parameters, nsg, rule, progress, __this = this; var __frame = { name: "createRule__7", line: 154 }; return __func(_, this, arguments, createRule__7, 4, __frame, function __$createRule__7() { self = __this;


      parameters = { };
      parameters = self._parseSecurityRule(parameters, options, true);

      return self.get(resourceGroupName, nsgName, __cb(_, __frame, 6, 19, function ___(__0, __1) { nsg = __1;
        if (!nsg) {
          return _(new Error(util.format($("A network security group with name \"%s\" not found in the resource group \"%s\""), ruleName, resourceGroupName))); } ;


        return self.getRule(resourceGroupName, nsgName, ruleName, __cb(_, __frame, 11, 20, function ___(__0, __2) { rule = __2;
          if (rule) {
            return _(new Error(util.format($("A network security rule with name \"%s\" already exists in the network security group \"%s\""), ruleName, nsgName))); } ;


          progress = self.interaction.progress(util.format($("Creating a network security rule \"%s\""), ruleName)); return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$createRule__7() {

                return self.networkManagementClient.securityRules.createOrUpdate(resourceGroupName, nsgName, ruleName, parameters, __cb(_, __frame, 18, 56, function ___(__0, __3) { rule = __3; _(null, null, true); }, true)); }); })(function ___(__e, __r, __cont) { (function ___(__then) { __tryCatch(_, function __$createRule__7() {

                  progress.end(); __then(); }); })(function ___() { __tryCatch(_, function ___() { if (__cont) { __then(); } else { _(__e, __r); }; }); }); }); })(function ___() { __tryCatch(_, function __$createRule__7() {

              self._showSecurityRule(rule); _(); }); }); }, true)); }, true)); }); },


  setRule: function setRule__8(resourceGroupName, nsgName, ruleName, options, _) { var self, nsg, rule, progress, __this = this; var __frame = { name: "setRule__8", line: 179 }; return __func(_, this, arguments, setRule__8, 4, __frame, function __$setRule__8() { self = __this;


      return self.get(resourceGroupName, nsgName, __cb(_, __frame, 3, 19, function ___(__0, __1) { nsg = __1;
        if (!nsg) {
          return _(new Error(util.format($("A network security group with name \"%s\" not found in the resource group \"%s\""), ruleName, resourceGroupName))); } ;


        return self.getRule(resourceGroupName, nsgName, ruleName, __cb(_, __frame, 8, 20, function ___(__0, __2) { rule = __2;
          if (!rule) {
            return _(new Error(util.format($("A network security rule with name \"%s\" not found in the network security group \"%s\""), ruleName, nsgName))); } ;


          rule = self._parseSecurityRule(rule, options, false);

          progress = self.interaction.progress(util.format($("Updating network security rule \"%s\""), ruleName)); return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$setRule__8() {

                return self.networkManagementClient.securityRules.createOrUpdate(resourceGroupName, nsgName, ruleName, rule, __cb(_, __frame, 17, 56, function ___(__0, __3) { rule = __3; _(null, null, true); }, true)); }); })(function ___(__e, __r, __cont) { (function ___(__then) { __tryCatch(_, function __$setRule__8() {

                  progress.end(); __then(); }); })(function ___() { __tryCatch(_, function ___() { if (__cont) { __then(); } else { _(__e, __r); }; }); }); }); })(function ___() { __tryCatch(_, function __$setRule__8() {

              self._showSecurityRule(rule); _(); }); }); }, true)); }, true)); }); },


  listRules: function listRules__9(resourceGroupName, nsgName, options, _) { var self, nsg, rules, __this = this; var __frame = { name: "listRules__9", line: 203 }; return __func(_, this, arguments, listRules__9, 3, __frame, function __$listRules__9() { self = __this;


      return self.get(resourceGroupName, nsgName, __cb(_, __frame, 3, 19, function ___(__0, __1) { nsg = __1;
        if (!nsg) {
          return _(new Error(util.format($("A network security group with name \"%s\" not found in the resource group \"%s\""), nsgName, resourceGroupName))); } ;


        rules = self._getAllRules(nsg);
        self.interaction.formatOutput(rules, function(rules) {
          if ((rules.length === 0)) {
            self.output.warn($("No rules found")); }
           else {
            self._listRules(rules); } ; }); _(); }, true)); }); },




  showRule: function showRule__10(resourceGroupName, nsgName, ruleName, options, _) { var self, nsg, rule, __this = this; var __frame = { name: "showRule__10", line: 221 }; return __func(_, this, arguments, showRule__10, 4, __frame, function __$showRule__10() { self = __this;

      return self.get(resourceGroupName, nsgName, __cb(_, __frame, 2, 19, function ___(__0, __1) { nsg = __1;

        if (!nsg) {
          return _(new Error(util.format($("A network security group with name \"%s\" not found in the resource group \"%s\""), nsgName, resourceGroupName))); } ;


        rule = self._findSecurityRule(nsg, ruleName);
        if (!rule) {
          rule = self._findDefaultRule(nsg, ruleName); } ;


        self.interaction.formatOutput(rule, function(rule) {
          if ((rule === null)) {
            self.output.warn(util.format($("A network security rule with name \"%s\" not found in the security group \"%s\""), ruleName, nsgName)); }
           else {
            self._showSecurityRule(rule); } ; }); _(); }, true)); }); },




  deleteRule: function deleteRule__11(resourceGroupName, nsgName, ruleName, options, _) { var self, nsg, rule, progress, __this = this; var __frame = { name: "deleteRule__11", line: 243 }; return __func(_, this, arguments, deleteRule__11, 4, __frame, function __$deleteRule__11() { self = __this;


      return self.get(resourceGroupName, nsgName, __cb(_, __frame, 3, 19, function ___(__0, __2) { nsg = __2;
        if (!nsg) {
          return _(new Error(util.format($("A network security group with name \"%s\" not found in the resource group \"%s\""), ruleName, resourceGroupName))); } ;


        return self.getRule(resourceGroupName, nsgName, ruleName, __cb(_, __frame, 8, 20, function ___(__0, __3) { rule = __3;
          if (!rule) {
            return _(new Error(util.format($("A network security rule with name \"%s\" not found in the network security group \"%s\""), ruleName, nsgName))); } ; return (function __$deleteRule__11(_) {


            var __1 = !options.quiet; if (!__1) { return _(null, __1); } ; return self.interaction.confirm(util.format($("Delete network security rule \"%s\"? [y/n] "), ruleName), __cb(_, __frame, 13, 44, function ___(__0, __3) { var __2 = !__3; return _(null, __2); }, true)); })(__cb(_, __frame, -242, 17, function ___(__0, __4) { return (function __$deleteRule__11(__then) { if (__4) { return _(null); } else { __then(); } ; })(function __$deleteRule__11() {



              progress = self.interaction.progress(util.format($("Deleting network security rule \"%s\""), ruleName)); return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$deleteRule__11() {

                    return self.networkManagementClient.securityRules.deleteMethod(resourceGroupName, nsgName, ruleName, __cb(_, __frame, 19, 49, function __$deleteRule__11() { _(null, null, true); }, true)); }); })(function ___(__e, __r, __cont) { (function ___(__then) { __tryCatch(_, function __$deleteRule__11() {

                      progress.end(); __then(); }); })(function ___() { __tryCatch(_, function ___() { if (__cont) { __then(); } else { _(__e, __r); }; }); }); }); })(function ___() { __tryCatch(_, function __$deleteRule__11() { _(); }); }); }); }, true)); }, true)); }, true)); }); },



  getRule: function getRule__12(resourceGroupName, nsgName, ruleName, _) { var self, progress, rule, __this = this; var __frame = { name: "getRule__12", line: 268 }; return __func(_, this, arguments, getRule__12, 3, __frame, function __$getRule__12() { self = __this;

      progress = self.interaction.progress(util.format($("Looking up the network security rule \"%s\""), ruleName)); return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$getRule__12() { return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$getRule__12() {

                  return self.networkManagementClient.securityRules.get(resourceGroupName, nsgName, ruleName, __cb(_, __frame, 4, 60, function ___(__0, __1) { rule = __1;
                    return _(null, rule); }, true)); }); })(function ___(e, __result) { __catch(function __$getRule__12() { if (e) {

                    if ((e.statusCode === 404)) {
                      return _(null, null); } ;

                    return _(e); } else { _(null, __result); } ; }, _); }); })(function ___() { __tryCatch(_, function __$getRule__12() { _(null, null, true); }); }); }); })(function ___(__e, __r, __cont) { (function ___(__then) { __tryCatch(_, function __$getRule__12() {

              progress.end(); __then(); }); })(function ___() { __tryCatch(_, function ___() { if (__cont) { __then(); } else { _(__e, __r); }; }); }); }); })(function ___() { __tryCatch(_, function __$getRule__12() { _(); }); }); }); },






  _parseSecurityGroup: function(nsg, options) {
    if (options.tags) {
      if (utils.argHasValue(options.tags)) {
        tagUtils.appendTags(nsg, options); }
       else {
        nsg.tags = { }; } ; } ;



    return nsg; },


  _parseSecurityRule: function(rule, options, useDefaults) {
    var self = this;

    if (options.description) {
      rule.description = validation.isLength(options.description, constants.nsg.description, "--description"); } ;


    if (options.protocol) {
      rule.protocol = validation.isIn(options.protocol, constants.nsg.protocols, "--protocol"); }
     else if (useDefaults) {
      rule.protocol = utils.takeDefault(self.output, constants.nsg.protocols[2], "--protocol"); }  ;


    if (options.sourcePortRange) {
      rule.sourcePortRange = self._isPortRange(options.sourcePortRange, "--source-port-range"); }
     else if (useDefaults) {
      rule.sourcePortRange = utils.takeDefault(self.output, constants.nsg.prefixDef, "--source-port-range"); }  ;


    if (options.destinationPortRange) {
      rule.destinationPortRange = self._isPortRange(options.destinationPortRange, "--destination-port-range"); }
     else if (useDefaults) {
      rule.destinationPortRange = utils.takeDefault(self.output, constants.nsg.portDef.toString(), "--destination-port-range"); }  ;


    if (options.sourceAddressPrefix) {
      rule.sourceAddressPrefix = self._isAddressPrefix(options.sourceAddressPrefix, "--source-address-prefix"); }
     else if (useDefaults) {
      rule.sourceAddressPrefix = utils.takeDefault(self.output, constants.nsg.prefixDef, "--source-address-prefix"); }  ;


    if (options.destinationAddressPrefix) {
      rule.destinationAddressPrefix = self._isAddressPrefix(options.destinationAddressPrefix, "--destination-address-prefix"); }
     else if (useDefaults) {
      rule.destinationAddressPrefix = utils.takeDefault(self.output, constants.nsg.prefixDef, "--destination-address-prefix"); }  ;


    if (options.access) {
      rule.access = validation.isIn(options.access, constants.nsg.access, "--access"); }
     else if (useDefaults) {
      rule.access = utils.takeDefault(self.output, constants.nsg.access[0], "--access"); }  ;


    if (options.priority) {
      rule.priority = validation.isInt(options.priority, constants.nsg.priority, "--priority"); }
     else if (useDefaults) {
      rule.priority = utils.takeDefault(self.output, constants.nsg.priority.min, "--priority"); }  ;


    if (options.direction) {
      rule.direction = validation.isIn(options.direction, constants.nsg.direction, "--direction"); }
     else if (useDefaults) {
      rule.direction = utils.takeDefault(self.output, constants.nsg.direction[0], "--direction"); }  ;


    return rule; },


  _showSecurityGroup: function(nsg, resourceGroupName, nsgName) {
    var self = this;

    self.interaction.formatOutput(nsg, function(nsg) {
      if ((nsg === null)) {
        self.output.warn(util.format($("A network security group with name \"%s\" not found in the resource group \"%s\""), nsgName, resourceGroupName));
        return; } ;


      self.output.nameValue($("Id"), nsg.id);
      self.output.nameValue($("Name"), nsg.name);
      self.output.nameValue($("Type"), nsg.type);
      self.output.nameValue($("Location"), nsg.location);
      self.output.nameValue($("Provisioning state"), nsg.provisioningState);
      self.output.nameValue($("Tags"), tagUtils.getTagsInfo(nsg.tags));

      var rules = self._getAllRules(nsg);
      self._listRules(rules); }); },



  _showSecurityRule: function(rule) {
    var self = this;
    self.interaction.formatOutput(rule, function(rule) {
      self.output.nameValue($("Id"), rule.id);
      self.output.nameValue($("Name"), rule.name);
      var resInfo = resourceUtils.getResourceInformation(rule.id);
      self.output.nameValue($("Type"), resInfo.resourceType);
      self.output.nameValue($("Provisioning state"), rule.provisioningState);
      self.output.nameValue($("Description"), rule.description);
      self.output.nameValue($("Source IP"), rule.sourceAddressPrefix);
      self.output.nameValue($("Source Port"), rule.sourcePortRange);
      self.output.nameValue($("Destination IP"), rule.destinationAddressPrefix);
      self.output.nameValue($("Destination Port"), rule.destinationPortRange);
      self.output.nameValue($("Protocol"), rule.protocol);
      self.output.nameValue($("Direction"), rule.direction);
      self.output.nameValue($("Access"), rule.access);
      self.output.nameValue($("Priority"), rule.priority); }); },



  _isPortRange: function(port, paramName) {
    if ((((port === "*") || (port === "\"*\"")) || !isNaN(port))) {
      return port; } ;

    try {
      return validation.isRange(port, paramName);
    } catch (e) {
      throw new Error(util.format($("%s parameter must be a valid port or port range between %s and %s. Asterisk can be used also. Example: 80, 80-81, *"), paramName, constants.nsg.portMin, constants.nsg.portMax)); }; },




  _isAddressPrefix: function(prefix, paramName) {
    if (((prefix === "*") || (prefix === "\"*\""))) {
      return prefix; } ;

    try {
      return validation.isIn(prefix, constants.nsg.prefix, paramName);
    } catch (e) {
      try {
        return validation.isCIDR(prefix, paramName);
      } catch (e) {
        throw new Error(util.format($("%s must be in CIDR format. Asterisk, Internet, VirtualNetwork, AzureLoadBalancer can be used also."), paramName)); }; }; },




  _getAllRules: function(nsg) {
    var rules = nsg.defaultSecurityRules.concat(nsg.securityRules);
    var groups = __.groupBy(rules, function(o) {
      return o.direction; });

    groups.Inbound = __.sortBy(groups.Inbound, function(o) {
      return o.priority; });

    groups.Outbound = __.sortBy(groups.Outbound, function(o) {
      return o.priority; });

    rules = groups.Inbound.concat(groups.Outbound);
    return rules; },


  _listRules: function(rules) {
    var self = this;
    if ((rules.length > 0)) {
      self.output.header($("Security rules"));
      self.output.table(rules, function(row, rule) {
        row.cell($("Name"), rule.name);

        row.cell($("Source IP"), rule.sourceAddressPrefix);
        row.cell($("Source Port"), rule.sourcePortRange);
        row.cell($("Destination IP"), rule.destinationAddressPrefix);
        row.cell($("Destination Port"), rule.destinationPortRange);
        row.cell($("Protocol"), rule.protocol);
        row.cell($("Direction"), rule.direction);
        row.cell($("Access"), rule.access);
        row.cell($("Priority"), rule.priority); }); } ; },




  _findDefaultRule: function(nsg, ruleName) {
    return utils.findFirstCaseIgnore(nsg.defaultSecurityRules, { name: ruleName }); },


  _findSecurityRule: function(nsg, ruleName) {
    return utils.findFirstCaseIgnore(nsg.securityRules, { name: ruleName }); }});



module.exports = Nsg;
