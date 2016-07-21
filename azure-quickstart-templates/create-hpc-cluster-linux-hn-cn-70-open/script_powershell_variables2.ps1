﻿param([string]$rg = "rg-003", [string]$vmsize = "Standard_A2", [string]$cnn = "1", [string]$cname = "hpcf")
$vmTemplate="https://raw.githubusercontent.com/JuanJoseGarciaUCLM/AzureHPC/master/azure-quickstart-templates/create-hpc-cluster-linux-hn-cn-70-open/azuredeploy.json"
Login-AzureRmAccount
New-AzureRmResourceGroup -Location "North Europe" -Name $rg
New-AzureRmResourceGroupDeployment -ResourceGroupName $rg -TemplateUri $vmTemplate -headNodeVMSize $vmsize -computeNodeVMSize $vmsize -computeNodeNumber $cnn -clusterName $cname 