﻿param([string]$rg = "rg-003", [string]$cnn = "2", [string]$cname = "hpc")
$vmTemplate="https://raw.githubusercontent.com/JuanJoseGarciaUCLM/AzureHPC/master/azure-quickstart-templates/create-hpc-cluster-linux-hn-cn-70-open/azuredeploy.json"
Login-AzureRmAccount
New-AzureRmResourceGroup -Location "North Europe" -Name $rg
New-AzureRmResourceGroupDeployment -ResourceGroupName $rg -TemplateUri $vmTemplate -computeNodeNumber $cnn -clusterName $cname