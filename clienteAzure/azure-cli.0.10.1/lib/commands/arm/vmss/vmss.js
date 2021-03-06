/*** Generated by streamline 0.10.17 (callbacks) - DO NOT EDIT ***/ "use strict"; var __rt=require('streamline/lib/callbacks/runtime').runtime(__filename, false),__func=__rt.__func,__cb=__rt.__cb,__catch=__rt.__catch,__tryCatch=__rt.__tryCatch; var fs = require("fs");

















var util = require("util");

var networkNic = require("../vm/networkNic");
var profile = require("../../../util/profile");
var utils = require("../../../util/utils");
var certUtils = require("../../../util/certUtils");
var VMClient = require("../vm/vmClient");

var $ = utils.getLocaleString;

function normalizeString(str) {
  return str.replace(/[^a-zA-Z0-9]+/g, "").slice(0, 24).toLowerCase();};


function getResourceId(subId, rgName, provider, type, name, subType, subName) {
  var format = "/subscriptions/%s/resourceGroups/%s/providers/%s/%s/%s";
  var resourceId = util.format(format, subId, rgName, provider, type, name);

  var subFormat = "/%s/%s";
  if ((subType || subName)) {
    resourceId += util.format(subFormat, subType, subName); } ;


  return resourceId;};


function getContainerAndVhdUri(storageName, containerAndVhdName) {
  if (containerAndVhdName) {
    var format = "https://%s.blob.core.windows.net/%s";
    var containerUri = util.format(format, storageName, containerAndVhdName);
    return containerUri; }

   else {
    return null; } ;};



function getLinuxConfiguration(adminUsername, adminPassword, sshPublicKeyFile) {
  if (utils.stringIsNullOrEmpty(adminUsername)) {
    throw new Error($("Admin user name cannot be empty or null.")); } ;


  if ((utils.stringIsNullOrEmpty(adminPassword) && utils.stringIsNullOrEmpty(sshPublicKeyFile))) {
    throw new Error($("Must specify password and/or SSH public key file.")); } ;


  var linuxConfiguration = null;
  if (!utils.stringIsNullOrEmpty(sshPublicKeyFile)) {

    var sshPublickey = fs.readFileSync(sshPublicKeyFile);
    var sshPublickeyPemStr = sshPublickey.toString();

    if (certUtils.isOpenSshRSAPub(sshPublickeyPemStr)) {
      sshPublickeyPemStr = certUtils.openSshRSAPubToX509CertPEM(sshPublickeyPemStr); }

     else if (!certUtils.isX509CertPEM(sshPublickeyPemStr)) {
      throw new Error($("Specified SSH certificate is not in PEM or SSH RSA format")); }  ;


    var sshPublickeyPemDataBase64 = certUtils.extractBase64X509CertFromPEM(sshPublickeyPemStr);


    linuxConfiguration = {
      disablePasswordAuthentication: (!utils.stringIsNullOrEmpty(adminPassword) ? null : true) };


    linuxConfiguration.ssh = {
      publicKeys: [{

        keyData: sshPublickeyPemDataBase64,
        path: (("/home/" + adminUsername) + "/.ssh/authorized_keys") },] }; } ;





  return linuxConfiguration;};


function createGroupIfNotExists(resourceManagementClient, resourceGroupName, location, _) { var __frame = { name: "createGroupIfNotExists", line: 98 }; return __func(_, this, arguments, createGroupIfNotExists, 3, __frame, function __$createGroupIfNotExists() { return (function ___(__then) { (function ___(_) { __tryCatch(_, function __$createGroupIfNotExists() {

          return resourceManagementClient.resourceGroups.get(resourceGroupName, __cb(_, __frame, 2, 44, __then, true)); }); })(function ___(e, __result) { __catch(function __$createGroupIfNotExists() { if (e) { return (function __$createGroupIfNotExists(__then) {


              if ((e.statusCode === 404)) {
                return resourceManagementClient.resourceGroups.createOrUpdate(resourceGroupName, { location: location }, __cb(_, __frame, 6, 46, __then, true)); } else {


                return _(e); } ; })(__then); } else { _(null, __result); } ; }, _); }); })(function ___() { __tryCatch(_, function __$createGroupIfNotExists() { _(); }); }); });};




function createStorageAccount(storageManagementClient, resourceGroupName, name, storageType, location, _) { var stoParams, account; var __frame = { name: "createStorageAccount", line: 112 }; return __func(_, this, arguments, createStorageAccount, 5, __frame, function __$createStorageAccount() {
    stoParams = { };
    stoParams.name = name;
    stoParams.location = location;
    stoParams.sku = { name: storageType };
    stoParams.kind = "Storage";
    return storageManagementClient.storageAccounts.create(resourceGroupName, stoParams.name, stoParams, __cb(_, __frame, 6, 56, function ___(__0, __1) { account = __1;
      return _(null, account); }, true)); });};


function createStorageResources(cli, vmClient, storageManagementClient, resourceGroupName, namePrefix, storageType, hash, location, capacity, _) { var generateNewStorageAccountName, stoNames, i, stoName, createdAccount; var __frame = { name: "createStorageResources", line: 122 }; return __func(_, this, arguments, createStorageResources, 9, __frame, function __$createStorageResources() {
    cli.output.verbose("Creating Storage Resources");
    cli.output.verbose((("namePrefix = '" + namePrefix) + "'"));
    cli.output.verbose((("storageType = '" + storageType) + "'"));
    cli.output.verbose((("location = '" + location) + "'"));
    cli.output.verbose((("capacity = '" + capacity) + "'"));

    generateNewStorageAccountName = function(str) {
      if ((str && (str.length > 20))) {
        str = str.slice(0, 20); } ;


      return normalizeString((str + hash)); };


    stoNames = [];
    i = 0; var __4 = false; return (function ___(__break) { var __more; var __loop = __cb(_, __frame, 0, 0, function __$createStorageResources() { __more = false; if (__4) { i++; } else { __4 = true; } ; var __3 = (i < capacity); if (__3) {
          stoName = generateNewStorageAccountName(((namePrefix + "sto") + i.toString())); return (function __$createStorageResources(__then) {
            if ((i === 0)) { return (function __$createStorageResources(_) {
                var __1 = storageType; if (__1) { return _(null, null); } ; return vmClient.tryCreatePremiumStorageAccount(storageManagementClient, location, resourceGroupName, stoName, __cb(_, __frame, 19, 57, _, true)); })(__cb(_, __frame, -121, 17, function ___(__0, __2) { createdAccount = __2; return (function __$createStorageResources(__then) {
                  if (createdAccount) {
                    storageType = "Premium_LRS"; __then(); } else {


                    storageType = (storageType ? storageType : "Standard_GRS");
                    return createStorageAccount(storageManagementClient, resourceGroupName, stoName, storageType, location, __cb(_, __frame, 25, 8, __then, true)); } ; })(function __$createStorageResources() {

                  cli.output.verbose((("storageType (reconciled) = '" + storageType) + "'"));
                  cli.output.verbose((("stoName (reconciled) = '" + stoName) + "'")); __then(); }); }, true)); } else {


              return createStorageAccount(storageManagementClient, resourceGroupName, stoName, storageType, location, __cb(_, __frame, 31, 6, __then, true)); } ; })(function __$createStorageResources() {


            stoNames.push(stoName); while (__more) { __loop(); }; __more = true; }); } else { __break(); } ; }); do { __loop(); } while (__more); __more = true; })(function __$createStorageResources() {


      return _(null, stoNames); }); });};








var newLineSpacesForHelpMessage = new Array(10).join(" ");

exports.init = function(cli) {
  var vmssQuickCreate = cli.category("vmss");
  vmssQuickCreate.command("quick-create [resource-group-name] [name] [location] [image-urn] [capacity] [admin-username] [admin-password]").description($((("Commands to create a virtual machine scale set with default resources in a group.\n" + newLineSpacesForHelpMessage) + "For 'image-urn' refer the following command: $ azure vm image list (Example: $ azure vm image list westus canonical)"))).usage("[options] [resource-group-name] [name] [location] [image-urn] [capacity] [admin-username] [admin-password]").option("-g, --resource-group-name <resource-group-name>", $("the resource group name")).option("-n, --name <name>", $("the virtual machine name prefix")).option("-l, --location <location>", $("the location")).option("-Q, --image-urn <image-urn>", $(((("the image reference, e.g. \"publisher:offer:skus:version\"\n  " + "                                               URN Aliases:\n") + "                                                 ") + (utils.getImageAliasList().join("\n                                                 "))))).option("-u, --admin-username <admin-username>", $("the user name")).option("-p, --admin-password <admin-password>", $("the password")).option("-z, --vm-size <vm-size>", $("Optional, the virtual machine size, by default [Standard_DS1]")).option("-C, --capacity <capacity>", $("the virtual machine scale set capacity, i.e. number of instances (5 by default)")).option("-M, --ssh-public-key-file <ssh-public-key-file>", $(("the path to public key file for SSH authentication,\n" + "                                                 & this parameter is valid only when os-type is Linux."))).option("-a, --storage-type <storage-type>", $("Optional, the storage type, by default [Premium_LRS]")).option("-s, --subscription <subscription>", $("the subscription identifier")).execute(function __1(resourceGroupName, name, location, imageUrn, capacity, adminUsername, adminPassword, options, _) { var imageUrnParts, hash, removeAllSpace, resourceNamePrefix, resourceName, vmClient, subscription, resourceManagementClient, params, networkResourceProviderClient, netNic, pip2Parameters, lbName, beName, natName, lbParameters, storageManagementClient, stoNames, parametersObj, computeManagementClient, result; var __frame = { name: "__1", line: 190 }; return __func(_, this, arguments, __1, 8, __frame, function __$__1() {



















      return cli.interaction.promptIfNotGiven($("resource-group-name: "), resourceGroupName, __cb(_, __frame, 2, 68, function ___(__0, __2) { options.resourceGroupName = resourceGroupName = __2;
        return cli.interaction.promptIfNotGiven($("name: "), name, __cb(_, __frame, 3, 42, function ___(__0, __3) { options.name = name = __3;
          return cli.interaction.promptIfNotGiven($("capacity: "), capacity, __cb(_, __frame, 4, 50, function ___(__0, __4) { options.capacity = capacity = __4;
            return cli.interaction.promptIfNotGiven($("location: "), location, __cb(_, __frame, 5, 50, function ___(__0, __5) { options.location = location = __5;
              options.location = location = utils.toLowerCaseAndRemoveSpace(location); return (function __$__1(__then) {


                if (!options.sshPublicKeyFile) {
                  return cli.interaction.promptIfNotGiven($("admin-username: "), adminUsername, __cb(_, __frame, 10, 38, function ___(__0, __6) { adminUsername = __6;
                    return cli.interaction.promptPasswordIfNotGiven($("admin-password: "), adminPassword, __cb(_, __frame, 11, 38, function ___(__0, __7) { adminPassword = __7; __then(); }, true)); }, true)); } else { __then(); } ; })(function __$__1() {


                options.adminUsername = adminUsername;
                options.adminPassword = adminPassword;


                return cli.interaction.promptIfNotGiven($("ImageURN (format: \"publisherName:offer:skus:version\"): "), imageUrn, __cb(_, __frame, 18, 31, function ___(__0, __8) { imageUrn = __8;
                  if ((imageUrn.indexOf(":") === -1)) {
                    imageUrn = utils.getImageAliasUrn(imageUrn); } ;

                  imageUrnParts = imageUrn.split(":");
                  if ((imageUrnParts.length !== 4)) {
                    return _(new Error($("--image-urn must be in the form \"publisherName:offer:skus:version\""))); } ;


                  options.imageReferencePublisher = imageUrnParts[0];
                  options.imageReferenceOffer = imageUrnParts[1];
                  options.imageReferenceSku = imageUrnParts[2];
                  options.imageReferenceVersion = imageUrnParts[3];


                  hash = utils.getHash((((resourceGroupName + name) + location) + imageUrn));

                  removeAllSpace = function(str) {
                    return (str.replace(/[\(\)\{\}\[\]\.\,\;\:\"\ ']/g, "").toLowerCase()); };



                  resourceNamePrefix = ((((removeAllSpace(name).slice(0, 5) + "-") + removeAllSpace(location).slice(0, 5)) + "-") + hash);

                  resourceName = function(postFix) {
                    return ((resourceNamePrefix + "-") + postFix); };



                  options.linuxConfiguration = getLinuxConfiguration(options.adminUsername, options.adminPassword, options.sshPublicKeyFile);


                  vmClient = new VMClient(cli, options.subscription);
                  options.skuCapacity = (options.capacity ? parseInt(options.capacity) : 5); return (function __$__1(_) {
                    var __1 = options.vmSize; if (__1) { return _(null, __1); } ; return vmClient.getDefaultVmSize(location, __cb(_, __frame, 52, 49, _, true)); })(__cb(_, __frame, -189, 17, function ___(__0, __9) { options.skuName = __9;
                    options.skuTier = "Standard";
                    options.upgradePolicyMode = "Manual";
                    options.computerNamePrefix = (options.linuxConfiguration ? name : name.substring(0, 9));
                    options.virtualHardDiskContainer = resourceName("disk-container");
                    options.osDiskCaching = "ReadOnly";
                    options.osDiskCreateOption = "FromImage";
                    options.osDiskName = resourceName("os-disk");


                    subscription = profile.current.getSubscription(options.subscription);


                    resourceManagementClient = utils.createResourceClient(subscription);
                    return createGroupIfNotExists(resourceManagementClient, resourceGroupName, location, __cb(_, __frame, 66, 4, function __$__1() {


                      params = { };
                      params.nicName = resourceName("nic");
                      params.publicipName = resourceName("pip");
                      params.publicipDomainName = resourceName("pip");
                      params.publicipName2 = resourceName("pip2");
                      params.publicipDomainName2 = resourceName("pip2");
                      params.vnetName = resourceName("vnet");
                      params.vnetAddressPrefix = "10.0.0.0/16";
                      params.vnetSubnetName = resourceName("snet");
                      params.vnetSubnetAddressprefix = "10.0.1.0/24";
                      params.location = location;
                      networkResourceProviderClient = utils.createNetworkManagementClient(subscription);
                      netNic = new networkNic(cli, networkResourceProviderClient, resourceGroupName, params);
                      return netNic.createOrUpdateNICIfRequired(__cb(_, __frame, 82, 11, function __$__1() {
                        options.networkInterfaceConfigurationName = params.nicName;
                        options.ipConfigurationName = params.publicipName;
                        options.virtualNetworkName = params.vnetName;
                        options.ipConfigurationSubnet = params.vnetSubnetName;

                        pip2Parameters = {
                          dnsSettings: {
                            domainNameLabel: params.publicipDomainName2 },

                          publicIpAllocationMethod: "Dynamic",
                          location: params.location };

                        return networkResourceProviderClient.publicIPAddresses.createOrUpdate(resourceGroupName, params.publicipName2, pip2Parameters, __cb(_, __frame, 95, 52, function __$__1() {

                          lbName = resourceName("lb");
                          beName = resourceName("be");
                          natName = resourceName("nat");
                          lbParameters = {
                            location: location,
                            frontendIPConfigurations: [{

                              name: "loadBalancerFrontEnd",
                              publicIPAddress: {
                                id: getResourceId(subscription.id, resourceGroupName, "Microsoft.Network", "publicIPAddresses", params.publicipName2) } },],



                            backendAddressPools: [{

                              name: beName },],


                            inboundNatPools: [{

                              name: natName,
                              frontendIPConfiguration: {
                                id: getResourceId(subscription.id, resourceGroupName, "Microsoft.Network", "loadBalancers", lbName, "frontendIPConfigurations", "loadBalancerFrontEnd") },

                              protocol: "Tcp",
                              frontendPortRangeStart: 50000,
                              frontendPortRangeEnd: 50099,
                              backendPort: 22 },] };



                          return networkResourceProviderClient.loadBalancers.createOrUpdate(resourceGroupName, lbName, lbParameters, __cb(_, __frame, 128, 48, function __$__1() {


                            storageManagementClient = utils.createStorageResourceProviderClient(subscription);
                            return createStorageResources(cli, vmClient, storageManagementClient, resourceGroupName, name, options.storageType, hash, location, 5, __cb(_, __frame, 132, 19, function ___(__0, __10) { stoNames = __10;


                              parametersObj = {
                                name: options.name,
                                location: options.location,
                                overProvision: false,
                                sku: {
                                  capacity: options.skuCapacity,
                                  name: options.skuName,
                                  tier: options.skuTier },

                                upgradePolicy: {
                                  mode: options.upgradePolicyMode },

                                virtualMachineProfile: {
                                  networkProfile: {
                                    networkInterfaceConfigurations: [{

                                      name: options.networkInterfaceConfigurationName,
                                      primary: true,
                                      ipConfigurations: [{

                                        name: options.ipConfigurationName,
                                        subnet: {
                                          id: getResourceId(subscription.id, options.resourceGroupName, "Microsoft.Network", "virtualNetworks", options.virtualNetworkName, "subnets", options.ipConfigurationSubnet) },

                                        loadBalancerBackendAddressPools: [{

                                          id: getResourceId(subscription.id, options.resourceGroupName, "Microsoft.Network", "loadBalancers", lbName, "backendAddressPools", beName) },],


                                        loadBalancerInboundNatPools: [{

                                          id: getResourceId(subscription.id, options.resourceGroupName, "Microsoft.Network", "loadBalancers", lbName, "inboundNatPools", natName) },] },] },] },







                                  osProfile: {
                                    computerNamePrefix: options.computerNamePrefix,
                                    adminPassword: options.adminPassword,
                                    adminUsername: options.adminUsername,
                                    linuxConfiguration: options.linuxConfiguration },

                                  storageProfile: {
                                    imageReference: {
                                      offer: options.imageReferenceOffer,
                                      publisher: options.imageReferencePublisher,
                                      sku: options.imageReferenceSku,
                                      version: options.imageReferenceVersion },

                                    osDisk: {
                                      caching: options.osDiskCaching,
                                      createOption: options.osDiskCreateOption,
                                      name: options.osDiskName,
                                      vhdContainers: [getContainerAndVhdUri(stoNames[0], options.virtualHardDiskContainer),getContainerAndVhdUri(stoNames[1], options.virtualHardDiskContainer),getContainerAndVhdUri(stoNames[2], options.virtualHardDiskContainer),getContainerAndVhdUri(stoNames[3], options.virtualHardDiskContainer),getContainerAndVhdUri(stoNames[4], options.virtualHardDiskContainer),] } } } };










                              computeManagementClient = utils.createComputeManagementClient(subscription);
                              return computeManagementClient.virtualMachineScaleSets.createOrUpdate(options.resourceGroupName, parametersObj.name, parametersObj, __cb(_, __frame, 203, 65, function ___(__0, __11) { result = __11;
                                cli.output.json(result); _(); }, true)); }, true)); }, true)); }, true)); }, true)); }, true)); }, true)); }, true)); }); }, true)); }, true)); }, true)); }, true)); }); });


  var virtualMachineScaleSetsScale = cli.category("vmss").description($("Commands to manage your virtual machine scale sets.  "));

  virtualMachineScaleSetsScale.command("scale [resource-group] [name] [new-capacity]").description($("The operation to scale virtual machine scale set")).usage("[options] <resource-group> <name> <new-capacity>").option("-g, --resource-group <resource-group>", $("resource-group")).option("-n, --name <name>", $("name")).option("-C, --new-capacity <new-capacity>", $("the new capacity value")).option("-s, --subscription <subscription>", $("The subscription identifier")).execute(function __2(resourceGroup, name, newCapacity, options, _) { var subscription, computeManagementClient, vmss, result; var __frame = { name: "__2", line: 406 }; return __func(_, this, arguments, __2, 4, __frame, function __$__2() { return (function __$__2(__then) {







        if (!resourceGroup) {
          return cli.interaction.promptIfNotGiven($("resource-group : "), resourceGroup, __cb(_, __frame, 2, 38, function ___(__0, __1) { resourceGroup = __1; __then(); }, true)); } else { __then(); } ; })(function __$__2() {


        cli.output.verbose(("resourceGroup = " + resourceGroup)); return (function __$__2(__then) {
          if (!name) {
            return cli.interaction.promptIfNotGiven($("name : "), name, __cb(_, __frame, 7, 29, function ___(__0, __2) { name = __2; __then(); }, true)); } else { __then(); } ; })(function __$__2() {


          cli.output.verbose(("name = " + name)); return (function __$__2(__then) {
            if (!newCapacity) {
              return cli.interaction.promptIfNotGiven($("New capacity value : "), newCapacity, __cb(_, __frame, 12, 36, function ___(__0, __3) { newCapacity = __3; __then(); }, true)); } else { __then(); } ; })(function __$__2() {


            cli.output.verbose(("New capacity value = " + newCapacity));
            subscription = profile.current.getSubscription(options.subscription);
            computeManagementClient = utils.createComputeManagementClient(subscription);
            return computeManagementClient.virtualMachineScaleSets.get(resourceGroup, name, __cb(_, __frame, 18, 63, function ___(__0, __4) { vmss = __4;
              if ((newCapacity == vmss.sku.capacity)) {
                return _(new Error("New capacity value should not be the same as the existing capacity.")); } ;

              vmss.sku.capacity = parseInt(newCapacity);
              return computeManagementClient.virtualMachineScaleSets.createOrUpdate(resourceGroup, name, vmss, __cb(_, __frame, 23, 65, function ___(__0, __5) { result = __5;
                if (result) {
                  cli.output.json(result); } ; _(); }, true)); }, true)); }); }); }); }); });};
