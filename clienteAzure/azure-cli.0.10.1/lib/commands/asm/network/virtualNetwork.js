/*** Generated by streamline 0.10.17 (callbacks) - DO NOT EDIT ***/ var __rt=require('streamline/lib/callbacks/runtime').runtime(__filename, false),__func=__rt.__func,__cb=__rt.__cb,__catch=__rt.__catch,__tryCatch=__rt.__tryCatch; var __ = require("underscore");















var crypto = require("crypto");
var util = require("util");
var utils = require("../../../util/utils");
var $ = utils.getLocaleString;
var VNetUtil = require("./../../../util/vnet.util");
var NetworkConfig = require("./networkConfig");

function VirtualNetwork(cli, managementClient, networkManagementClient) {
  this.managementClient = managementClient;
  this.networkManagementClient = networkManagementClient;
  this.networkConfig = new NetworkConfig(cli, networkManagementClient);
  this.vnetUtil = new VNetUtil();
  this.output = cli.output;
  this.interaction = cli.interaction;};


__.extend(VirtualNetwork.prototype, {
  create: function create__1(vnetName, options, _) { var self, vnetProfile, networkConfig, vnetConfig, dnsServerNameIps, j, dnsServer, k, groupResult, vnetSite, __this = this; var __frame = { name: "create__1", line: 34 }; return __func(_, this, arguments, create__1, 2, __frame, function __$create__1() { self = __this;

      vnetProfile = self._parseVirtualNetwork(vnetName, options);

      return self.networkConfig.get(__cb(_, __frame, 4, 43, function ___(__0, __1) { networkConfig = __1;
        if (!networkConfig.VirtualNetworkConfiguration) {
          networkConfig.VirtualNetworkConfiguration = { }; } ;

        vnetConfig = networkConfig.VirtualNetworkConfiguration;

        if (utils.findFirstCaseIgnore(vnetConfig.VirtualNetworkSites, { Name: vnetProfile.name })) {
          return _(new Error(util.format($("A virtual network with name \"%s\" already exists"), vnetProfile.name))); } ;


        if (options.dnsServerId) {
          dnsServerNameIps = [];
          for (j = 0; (j < vnetConfig.Dns.DnsServers.length); j++) {
            dnsServer = vnetConfig.Dns.DnsServers[j];
            if (utils.ignoreCaseEquals(dnsServer.Name, options.dnsServerId)) {
              vnetProfile.dnsServerId = dnsServer.Name;
              self.output.info(util.format($("Using DNS server %s (%s)"), dnsServer.Name, dnsServer.IPAddress));
              break; } ;

            dnsServerNameIps.push(util.format($("%s (%s)"), dnsServer.Name, dnsServer.IPAddress)); };


          if (!vnetProfile.dnsServerId) {
            self.output.error(util.format($("A DNS server with name identifier \"%s\" not found"), options.dnsServerId));
            if ((dnsServerNameIps.length > 0)) {
              self.output.help($("You have following DNS servers registered:"));
              for (k = 0; (k < dnsServerNameIps.length); k++) {
                self.output.help(dnsServerNameIps[k]); }; } ;



            self.output.help($("To register a new DNS server please use command \"azure network dns-server register\""));
            return _(new Error($("DNS server with the name identifier not found"))); } ; } ;



        return self._getOrCreateAffinityGroup(options, __cb(_, __frame, 40, 27, function ___(__0, __2) { groupResult = __2;
          if (groupResult.affinityGroup) {
            self.output.info(util.format($("Using affinity group %s"), groupResult.affinityGroup));
            vnetProfile.affinityGroup = groupResult.affinityGroup; }
           else {
            vnetProfile.location = groupResult.location; } ;


          vnetSite = self._convertProfileToSite(vnetProfile);
          if (!vnetConfig.VirtualNetworkSites) {
            vnetConfig.VirtualNetworkSites = []; } ;


          vnetConfig.VirtualNetworkSites.push(vnetSite);
          return self.networkConfig.set(networkConfig, __cb(_, __frame, 54, 23, function __$create__1() { _(); }, true)); }, true)); }, true)); }); },


  list: function list__2(options, _) { var self, vnetSites, __this = this; var __frame = { name: "list__2", line: 91 }; return __func(_, this, arguments, list__2, 1, __frame, function __$list__2() { self = __this;


      return self._getSites(__cb(_, __frame, 3, 25, function ___(__0, __1) { vnetSites = __1;
        self.interaction.formatOutput(vnetSites, function(data) {
          if ((data.length === 0)) {
            self.output.warn($("No virtual networks found")); }
           else {
            self.output.table(data, function(row, vnet) {
              row.cell($("Name"), vnet.name);
              row.cell($("Location"), (vnet.location || ""));
              row.cell($("Affinity group"), (vnet.affinityGroup || ""));
              row.cell($("State"), vnet.state);
              row.cell($("Address space"), vnet.addressSpace.addressPrefixes[0]);
              row.cell($("Subnets count"), vnet.subnets.length);
              var vpnGatewayAddress = "";
              if ((vnet.gateway && (vnet.gateway.sites.length > 0))) {
                vpnGatewayAddress = vnet.gateway.sites[0].vpnGatewayAddress;
                if ((vnet.gateway.sites.length > 1)) { vpnGatewayAddress += ", ..."; }; } ;

              row.cell($("VPN Gateway address"), vpnGatewayAddress); }); } ; }); _(); }, true)); }); },





  show: function show__3(vnetName, options, _) { var self, vnetSites, vnet, __this = this; var __frame = { name: "show__3", line: 117 }; return __func(_, this, arguments, show__3, 2, __frame, function __$show__3() { self = __this;


      return self._getSites(__cb(_, __frame, 3, 25, function ___(__0, __1) { vnetSites = __1;
        if (vnetSites) {
          vnet = utils.findFirstCaseIgnore(vnetSites, { name: vnetName });
          if (vnet) {
            self.interaction.formatOutput(vnet, function(vnet) {
              self.output.nameValue($("Name"), vnet.name);
              self.output.nameValue($("Location"), vnet.location);
              self.output.nameValue($("Affinity group"), vnet.affinityGroup);
              self.output.nameValue($("State"), vnet.state);
              self.output.nameValue($("Address space"), vnet.addressSpace.addressPrefixes[0]);

              self.output.header("Subnets");
              vnet.subnets.forEach(function(subnet) {
                self.output.nameValue($("Name"), subnet.name, 2);
                self.output.nameValue($("Address prefix"), subnet.addressPrefix, 2);
                self.output.data(""); });


              if ((vnet.dnsServers.length > 0)) {
                self.output.header("DNS Servers");
                vnet.dnsServers.forEach(function(dns) {
                  self.output.nameValue($("Name"), dns.name, 2);
                  self.output.nameValue($("Address"), dns.address, 2);
                  self.output.data(""); }); } ;



              if (vnet.gateway) {
                self.output.header("Gateway");
                self.output.nameValue($("Profile"), vnet.gateway.profile, 2);
                self.output.header("Sites", 2);
                vnet.gateway.sites.forEach(function(site) {
                  self.output.nameValue($("Name"), site.name, 4);
                  self.output.nameValue($("VPN Gateway address"), site.vpnGatewayAddress, 4);
                  self.output.nameValue($("Connection"), site.connections[0].type, 4);
                  self.output.nameValue($("Address space"), site.addressSpace.addressPrefixes[0], 4);
                  self.output.data(""); }); } ; }); }



           else {
            if (self.output.format().json) {
              self.output.json({ }); }
             else {
              self.output.warn(util.format($("A virtual network with name \"%s\" not found"), vnetName)); } ; } ; }


         else {
          if (self.output.format().json) {
            self.output.json({ }); }
           else {
            self.output.warn(util.format($("A virtual network with name \"%s\" not found"), vnetName)); } ; } ; _(); }, true)); }); },




  delete: function delete__4(vnetName, options, _) { var self, networkConfig, vnetConfig, index, __this = this; var __frame = { name: "delete__4", line: 176 }; return __func(_, this, arguments, delete__4, 2, __frame, function __$delete__4() { self = __this;


      return self.networkConfig.get(__cb(_, __frame, 3, 43, function ___(__0, __2) { networkConfig = __2;
        vnetConfig = networkConfig.VirtualNetworkConfiguration;

        index = utils.indexOfCaseIgnore(vnetConfig.VirtualNetworkSites, { Name: vnetName }); return (function __$delete__4(__then) {
          if ((index !== -1)) { return (function __$delete__4(_) {
              var __1 = !options.quiet; if (!__1) { return _(null, __1); } ; return self.interaction.confirm(util.format($("Delete a virtual network \"%s\"? [y/n] "), vnetName), __cb(_, __frame, 8, 46, function ___(__0, __3) { var __2 = !__3; return _(null, __2); }, true)); })(__cb(_, __frame, -175, 17, function ___(__0, __3) { return (function __$delete__4(__then) { if (__3) { return _(null); } else { __then(); } ; })(function __$delete__4() {


                vnetConfig.VirtualNetworkSites.splice(index, 1);
                return self.networkConfig.set(networkConfig, __cb(_, __frame, 12, 25, __then, true)); }); }, true)); } else {

            self.output.error(util.format($("A virtual network with name \"%s\" not found"), vnetName)); __then(); } ; })(_); }, true)); }); },



  _getSites: function _getSites__5(_) { var self, progress, response, __this = this; var __frame = { name: "_getSites__5", line: 194 }; return __func(_, this, arguments, _getSites__5, 0, __frame, function __$_getSites__5() { self = __this;

      progress = self.interaction.progress($("Looking up the virtual network sites")); return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$_getSites__5() {

            return self.networkManagementClient.networks.list(__cb(_, __frame, 4, 59, function ___(__0, __1) { response = __1;
              return _(null, response.virtualNetworkSites); }, true)); }); })(function ___(__e, __r, __cont) { (function ___(__then) { __tryCatch(_, function __$_getSites__5() {

              progress.end(); __then(); }); })(function ___() { __tryCatch(_, function ___() { if (__cont) { __then(); } else { _(__e, __r); }; }); }); }); })(function ___() { __tryCatch(_, function __$_getSites__5() { _(); }); }); }); },



  _getLocations: function _getLocations__6(_) { var self, progress, response, __this = this; var __frame = { name: "_getLocations__6", line: 205 }; return __func(_, this, arguments, _getLocations__6, 0, __frame, function __$_getLocations__6() { self = __this;

      progress = self.interaction.progress($("Looking up locations")); return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$_getLocations__6() { return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$_getLocations__6() {

                  return self.managementClient.locations.list(__cb(_, __frame, 4, 53, function ___(__0, __1) { response = __1;
                    return _(null, response.locations); }, true)); }); })(function ___(e, __result) { __catch(function __$_getLocations__6() { if (e) {

                    return _(null, null); } else { _(null, __result); } ; }, _); }); })(function ___() { __tryCatch(_, function __$_getLocations__6() { _(null, null, true); }); }); }); })(function ___(__e, __r, __cont) { (function ___(__then) { __tryCatch(_, function __$_getLocations__6() {

              progress.end(); __then(); }); })(function ___() { __tryCatch(_, function ___() { if (__cont) { __then(); } else { _(__e, __r); }; }); }); }); })(function ___() { __tryCatch(_, function __$_getLocations__6() { _(); }); }); }); },



  _getAffinityGroups: function _getAffinityGroups__7(_) { var self, progress, response, __this = this; var __frame = { name: "_getAffinityGroups__7", line: 218 }; return __func(_, this, arguments, _getAffinityGroups__7, 0, __frame, function __$_getAffinityGroups__7() { self = __this;

      progress = self.interaction.progress($("Looking up affinity groups")); return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$_getAffinityGroups__7() {

            return self.managementClient.affinityGroups.list(__cb(_, __frame, 4, 58, function ___(__0, __1) { response = __1;
              return _(null, response.affinityGroups); }, true)); }); })(function ___(__e, __r, __cont) { (function ___(__then) { __tryCatch(_, function __$_getAffinityGroups__7() {

              progress.end(); __then(); }); })(function ___() { __tryCatch(_, function ___() { if (__cont) { __then(); } else { _(__e, __r); }; }); }); }); })(function ___() { __tryCatch(_, function __$_getAffinityGroups__7() { _(); }); }); }); },



  _isAffinityGroupSupportsPersistentVMRole: function(affinityGroup) {
    if ((affinityGroup.capabilities.length === 0)) {
      return false; } ;

    for (var i = 0; (i < affinityGroup.capabilities.length); i++) {
      if ((affinityGroup.capabilities[i] === "PersistentVMRole")) {
        return true; } ; };


    return false; },


  _isLocationSupportsPersistentVMRole: function(location) {
    if ((location.availableServices.length === 0)) {
      return false; } ;

    for (var i = 0; (i < location.availableServices.length); i++) {
      if ((location.availableServices[i] === "PersistentVMRole")) {
        return true; } ; };


    return false; },


  _showVNetHostHelp: function() {
    self.output.help($("You can either create a \"regional VNet\" using --location (recommended) or \"affinity group specific VNet\" using --location and --create-new-affinity-group (deprecated)")); },


  _convertProfileToSite: function(vnetProfile) {
    var site = {
      Name: vnetProfile.name,
      AddressSpace: [],
      Subnets: [],
      DnsServersRef: [] };


    if (vnetProfile.affinityGroup) {
      site.AffinityGroup = vnetProfile.affinityGroup; }
     else {
      site.Location = vnetProfile.location; } ;


    site.AddressSpace.push(((vnetProfile.addressSpaceStartIP + "/") + vnetProfile.cidr));
    site.Subnets.push({
      AddressPrefix: ((vnetProfile.subnetStartIP + "/") + vnetProfile.subnetCidr),
      Name: vnetProfile.subnetName });


    if (vnetProfile.dnsServerId) {
      site.DnsServersRef.push({
        Name: vnetProfile.dnsServerId }); } ;



    return site; },


  _parseVirtualNetwork: function(vnetName, options) {
    var self = this;

    if ((!options.location && !options.affinityGroup)) {
      options.location = "West US";
      self.output.warn($("Using default location: West US")); }
     else if ((options.location && options.affinityGroup)) {
      throw new Error($("Either --location or --affinity-group must be present not both")); }  ;


    if ((options.createNewAffinityGroup && options.affinityGroup)) {
      throw new Error($("--create-new-affinity-group can be used only with --location")); } ;


    if ((options.cidr && options.maxVmCount)) {
      throw new Error($("Both optional parameters --cidr and --max-vm-count cannot be specified together")); } ;


    if ((options.subnetCidr && options.subnetVmCount)) {
      throw new Error($("Both optional parameters --subnet-cidr and --subnet-vm-count cannot be specified together")); } ;



    var requiredOptCheckResult = self.vnetUtil.ensureRequiredParams(options.cidr, "cidr", {


    "address-space": options.addressSpace });


    if (requiredOptCheckResult.error) {
      throw new Error(requiredOptCheckResult.error); } ;



    requiredOptCheckResult = self.vnetUtil.ensureRequiredParams(options.maxVmCount, "max-vm-count", {


    "address-space": options.addressSpace });


    if (requiredOptCheckResult.error) {
      throw new Error(requiredOptCheckResult.error); } ;




    requiredOptCheckResult = self.vnetUtil.ensureRequiredParams(options.subnetStartIp, "subnet-start-ip", {


    "address-space": options.addressSpace,
      mvccidr: {
      "max-vm-count": options.maxVmCount,
        cidr: options.cidr } });



    if (requiredOptCheckResult.error) {
      throw new Error(requiredOptCheckResult.error); } ;




    requiredOptCheckResult = self.vnetUtil.ensureRequiredParams(options.subnetCidr, "subnet-cidr", {


    "address-space": options.addressSpace,
      mvccidr: {
      "max-vm-count": options.maxVmCount,
        cidr: options.cidr },

    "subnet-start-ip": options.subnetStartIp });


    if (requiredOptCheckResult.error) {
      throw new Error(requiredOptCheckResult.error); } ;




    requiredOptCheckResult = self.vnetUtil.ensureRequiredParams(options.subnetVmCount, "subnet-vm-count", {


    "address-space": options.addressSpace,
      mvccidr: {
      "max-vm-count": options.maxVmCount,
        cidr: options.cidr },

    "subnet-start-ip": options.subnetStartIp });


    if (requiredOptCheckResult.error) {
      throw new Error(requiredOptCheckResult.error); } ;


    var vnetProfile = {

      name: null,

      affinityGroup: null,

      addressSpaceStartIP: null,
      addressSpaceStartIPOctects: null,

      addressSpaceInfo: null,

      cidr: null,

      addressSpaceNetworkMask: null,

      addressSpaceRange: null,

      subnetName: null,

      subnetStartIPOctects: null,
      subnetStartIP: null,

      subnetCidr: null,

      dnsServerId: null };


    var namePattern = /^[a-z0-9][a-z0-9\-]{0,62}$/i;
    if (options.subnetName) {
      if ((namePattern.test(options.subnetName) === false)) {
        throw new Error($("The --subnet-name can contain only letters, numbers and hyphens with no more than 63 characters. It must start with a letter or number")); } ;

      vnetProfile.subnetName = options.subnetName; }
     else {
      vnetProfile.subnetName = "Subnet-1"; } ;


    if ((namePattern.test(vnetName) === false)) {
      throw new Error($("The name can contain only letters, numbers and hyphens with no more than 63 characters. It must start with a letter or number")); } ;

    vnetProfile.name = vnetName;


    var addressSpaceStartIP = null;
    if (!options.addressSpace) {

      addressSpaceStartIP = self.vnetUtil.defaultAddressSpaceInfo().ipv4Start;
      self.output.info(util.format($("Using default address space start IP: %s"), addressSpaceStartIP)); }
     else {
      addressSpaceStartIP = options.addressSpace; } ;



    var parsedAddressSpaceStartIP = self.vnetUtil.parseIPv4(addressSpaceStartIP, "--address-space");

    if (parsedAddressSpaceStartIP.error) {
      throw new Error(parsedAddressSpaceStartIP.error); } ;



    addressSpaceStartIP = self.vnetUtil.octectsToString(parsedAddressSpaceStartIP.octects);





    var addressSpaceInfoForAddressSpace = self.vnetUtil.getPrivateAddressSpaceInfo(parsedAddressSpaceStartIP.octects);

    if (!addressSpaceInfoForAddressSpace) {
      self.output.error(util.format($("The given --address-space %s is not a valid private address"), addressSpaceStartIP));
      self.output.help($("The valid address space ranges are:"));
      for (var key in self.vnetUtil.privateAddressSpacesInfo) {
        var addressSpaceInfo = self.vnetUtil.privateAddressSpacesInfo[key];
        self.output.help((((((addressSpaceInfo.ipv4Cidr + "  [") + addressSpaceInfo.ipv4Start) + ", ") + addressSpaceInfo.ipv4End) + "]")); };



      throw new Error($("Invalid --address-space value")); } ;


    vnetProfile.addressSpaceStartIP = addressSpaceStartIP;
    vnetProfile.addressSpaceStartIPOctects = parsedAddressSpaceStartIP.octects;
    vnetProfile.addressSpaceInfo = addressSpaceInfoForAddressSpace;


    var cidr = null;
    if (options.maxVmCount) {
      var maxVmCount = parseInt(options.maxVmCount, 10);
      if (isNaN(maxVmCount)) {
        throw new Error($("--vm-count should be an integer value")); } ;


      cidr = self.vnetUtil.getCIDRFromHostsCount(maxVmCount);
      self.output.info(util.format($("The cidr calculated for the given --max-vm-count %s is %s"), maxVmCount, cidr)); }
     else if (options.cidr) {
      cidr = parseInt(options.cidr, 10); }
     else {
      cidr = vnetProfile.addressSpaceInfo.startCidr;
      self.output.info(util.format($("Using default address space cidr: %s"), cidr)); }  ;




    var verifyCidrResult = self.vnetUtil.verfiyCIDR(cidr, {
      start: vnetProfile.addressSpaceInfo.startCidr,
      end: vnetProfile.addressSpaceInfo.endCidr

    }, (options.cidr ? "--cidr" : null));


    if (verifyCidrResult.error) {
      throw new Error(verifyCidrResult.error); } ;


    vnetProfile.cidr = cidr;
    vnetProfile.addressSpaceNetworkMask = self.vnetUtil.getNetworkMaskFromCIDR(vnetProfile.cidr).octects;




    vnetProfile.addressSpaceRange = self.vnetUtil.getIPRange(vnetProfile.addressSpaceStartIPOctects, vnetProfile.addressSpaceNetworkMask);



    if (!options.subnetStartIp) {
      vnetProfile.subnetStartIPOctects = vnetProfile.addressSpaceRange.start;
      vnetProfile.subnetStartIP = self.vnetUtil.octectsToString(vnetProfile.subnetStartIPOctects);

      self.output.info(util.format($("Using default subnet start IP: %s"), vnetProfile.subnetStartIP)); }
     else {
      var parsedSubnetStartIP = self.vnetUtil.parseIPv4(options.subnetStartIp, "--subnet-start-ip");
      if (parsedSubnetStartIP.error) {
        throw new Error(parsedSubnetStartIP.error); } ;


      vnetProfile.subnetStartIPOctects = parsedSubnetStartIP.octects;
      vnetProfile.subnetStartIP = self.vnetUtil.octectsToString(vnetProfile.subnetStartIPOctects); } ;



    var isSubnetInRange = self.vnetUtil.isIPInRange(vnetProfile.addressSpaceRange.start, vnetProfile.addressSpaceRange.end, vnetProfile.subnetStartIPOctects);





    if (!isSubnetInRange) {
      var addressSpaceRange = (((((((vnetProfile.addressSpaceStartIP + "/") + vnetProfile.cidr) + " [") + self.vnetUtil.octectsToString(vnetProfile.addressSpaceRange.start)) + ", ") + self.vnetUtil.octectsToString(vnetProfile.addressSpaceRange.end)) + "]");



      self.output.help(util.format($("The given subnet (--subnet-start-ip) should belongs to the address space %s"), addressSpaceRange));

      throw new Error($("The subnet is not in the address space")); } ;



    var subnetCidr = null;
    if (options.subnetVmCount) {
      var subnetVmCount = parseInt(options.subnetVmCount, 10);
      if (isNaN(subnetVmCount)) {
        throw new Error($("--subnet-vm-count should be an integer value")); } ;


      subnetCidr = self.vnetUtil.getCIDRFromHostsCount(subnetVmCount);
      self.output.info(util.format($("The cidr calculated for the given --subnet-vm-count %s is %s"), subnetVmCount, subnetCidr)); }


     else if (options.subnetCidr) {
      subnetCidr = parseInt(options.subnetCidr, 10); }
     else {
      subnetCidr = self.vnetUtil.getDefaultSubnetCIDRFromAddressSpaceCIDR(vnetProfile.cidr);
      self.output.info(util.format($("Using default subnet cidr: %s"), subnetCidr)); }  ;


    verifyCidrResult = self.vnetUtil.verfiyCIDR(subnetCidr, {
      start: vnetProfile.cidr,
      end: vnetProfile.addressSpaceInfo.endCidr

    }, (options.subnetCidr ? "--subnet-cidr" : "calculated from --subnet-vm-count"));


    if (verifyCidrResult.error) {
      throw new Error(verifyCidrResult.error); } ;


    vnetProfile.subnetCidr = subnetCidr;

    self.output.verbose(util.format($("Address Space [Starting IP/CIDR (Max VM Count)]: %s/%s (%s)"), vnetProfile.addressSpaceStartIP, vnetProfile.cidr, self.vnetUtil.getHostsCountForCIDR(vnetProfile.cidr).hostsCount));




    self.output.verbose(util.format($("Subnet [Starting IP/CIDR (Max VM Count)]: %s/%s (%s)"), vnetProfile.subnetStartIP, vnetProfile.subnetCidr, self.vnetUtil.getHostsCountForCIDR(vnetProfile.subnetCidr).hostsCount));




    return vnetProfile; },


  _getOrCreateAffinityGroup: function _getOrCreateAffinityGroup__8(options, _) { var self, result, supportsVmRole, affinityGroups, group, vmroleSupportedAffinityGroupNames, i, locations, location, groupName, vmroleSupportedLocationNames, j, __this = this; var __frame = { name: "_getOrCreateAffinityGroup__8", line: 581 }; return __func(_, this, arguments, _getOrCreateAffinityGroup__8, 1, __frame, function __$_getOrCreateAffinityGroup__8() { self = __this;

      result = {
        affinityGroup: "",
        location: "" };


      supportsVmRole = false; return (function __$_getOrCreateAffinityGroup__8(__then) {
        if (options.affinityGroup) {
          return self._getAffinityGroups(__cb(_, __frame, 9, 32, function ___(__0, __1) { affinityGroups = __1;
            group = utils.findFirstCaseIgnore(affinityGroups, { name: options.affinityGroup });
            if (group) {
              supportsVmRole = self._isAffinityGroupSupportsPersistentVMRole(group);
              if (supportsVmRole) {
                result = {
                  affinityGroup: group.name,
                  location: group.location };

                return _(null, result); }
               else {
                self.output.error(util.format($("The given affinity group \"%s\" does not support PersistentVMRole service"), options.affinityGroup));
                self.output.help($("You should create virtual network in an affinity group that support PersistentVMRole service"));
                self._showVNetHostHelp();

                vmroleSupportedAffinityGroupNames = [];
                for (i = 0; (i < affinityGroups.length); i++) {
                  if (self._isAffinityGroupSupportsPersistentVMRole(affinityGroups[i])) {
                    vmroleSupportedAffinityGroupNames.push((((affinityGroups[i].name + " (") + affinityGroups[i].location) + ")")); } ; };



                if ((vmroleSupportedAffinityGroupNames.length > 0)) {
                  self.output.help($("Following affinity groups in your subscription supports PersistentVMRole service:"));
                  vmroleSupportedAffinityGroupNames.forEach(function(groupName) {
                    self.output.help(groupName); }); }

                 else {
                  self.output.help($("There is no affinity groups in your subscription that supports PersistentVMRole service")); } ;


                self._showVNetHostHelp();
                return _(new Error(util.format($("Affinity group with name \"%s\" does not support PersistentVMRole service"), options.affinityGroup))); } ; }

             else {
              self._showVNetHostHelp();
              return _(new Error($(util.format($("Affinity group with name \"%s\" not found"), options.affinityGroup)))); } ; __then(); }, true)); } else {


          return self._getLocations(__cb(_, __frame, 48, 27, function ___(__0, __2) { locations = __2;
            location = utils.findFirstCaseIgnore(locations, { name: options.location }); return (function __$_getOrCreateAffinityGroup__8(__then) {
              if (location) {
                supportsVmRole = self._isLocationSupportsPersistentVMRole(location); return (function __$_getOrCreateAffinityGroup__8(__then) {
                  if (supportsVmRole) { return (function __$_getOrCreateAffinityGroup__8(__then) {
                      if (options.createNewAffinityGroup) {
                        return self._createAffinityGroup(location, __cb(_, __frame, 54, 33, function ___(__0, __3) { groupName = __3;
                          result = {
                            affinityGroup: groupName,
                            location: location.name };

                          return _(null, result); }, true)); } else {

                        result = {
                          affinityGroup: null,
                          location: location.name };

                        return _(null, result); } ; })(__then); } else {


                    self.output.error(util.format($("The given location \"%s\" does not support PersistentVMRole service"), options.location));
                    self.output.help($("You should create virtual network in a location that supports PersistentVMRole service"));

                    vmroleSupportedLocationNames = [];
                    for (j = 0; (j < locations.length); j++) {
                      if (self._isLocationSupportsPersistentVMRole(locations[j])) {
                        vmroleSupportedLocationNames.push(locations[j].name); } ; };



                    if ((vmroleSupportedLocationNames.length > 0)) {
                      self.output.help($("Following locations supports PersistentVMRole service:"));
                      vmroleSupportedLocationNames.forEach(function(locationName) {
                        self.output.help(locationName); }); } ;


                    return _(new Error($(util.format($("Location \"%s\" does not support PersistentVMRole service"), options.location)))); } ; })(__then); } else {


                return _(new Error($(util.format($("Location group with name \"%s\" not found"), options.location)))); } ; })(__then); }, true)); } ; })(_); }); },




  _createAffinityGroup: function _createAffinityGroup__9(location, _) { var self, groupName, groupProfile, progress, __this = this; var __frame = { name: "_createAffinityGroup__9", line: 673 }; return __func(_, this, arguments, _createAffinityGroup__9, 1, __frame, function __$_createAffinityGroup__9() { self = __this;


      groupName = ("AG-CLI-" + crypto.randomBytes(8).toString("hex"));
      groupProfile = {
        name: groupName,
        location: location.name,
        label: ((groupName + "_") + location.name) };


      progress = self.interaction.progress(util.format($("Creating new affinity group with name \"%s\""), groupName)); return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$_createAffinityGroup__9() {

            return self.managementClient.affinityGroups.create(groupProfile, __cb(_, __frame, 12, 43, function __$_createAffinityGroup__9() { _(null, null, true); }, true)); }); })(function ___(__e, __r, __cont) { (function ___(__then) { __tryCatch(_, function __$_createAffinityGroup__9() {

              progress.end(); __then(); }); })(function ___() { __tryCatch(_, function ___() { if (__cont) { __then(); } else { _(__e, __r); }; }); }); }); })(function ___() { __tryCatch(_, function __$_createAffinityGroup__9() {

          return _(null, groupName); }); }); }); }});




module.exports = VirtualNetwork;