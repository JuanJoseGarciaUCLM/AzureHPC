#! /bin/bash
# Las líneas que empiezan por "#" son comentarios
# La primera línea o #! /bin/bash asegura que se interpreta como
# un script de bash, aunque se ejecute desde otro shell.
var1=$1
var2=4
vmname=$2
var0=0
var00=00
user=$3

# Disable firewall
systemctl disable firewalld
systemctl stop firewalld

# Add hosts names
cd /home
for ((i=0;i<var1;i+=1));
do
if [ "$i" -lt 10 ] ; then
    echo "$vmname$var00$i" >> hosts
else
        if [ "$i" -lt 100 ] ; then
                echo "$vmname$var0$i" >> hosts
        else
                echo "$vmname$i" >> hosts
        fi
fi
done

# Create dir .ssh and public ssh key
mkdir /home/$user/.ssh
chmod 777 .ssh
ssh-keygen -t rsa -N "" -f /home/$user/.ssh/id_rsa

# Install NFS server packages
yum clean all
yum install nfs-utils nfs-utils-lib -y
service rpcbind start
service nfs start

# Add host to export NFS, IP and name to hosts file and host to known_host for SSH
cd /etc
for ((i=0;i<var1;i+=1));
do
var2=$((var2 + 1))
echo "/home           10.0.0.$var2(rw,sync,no_root_squash,no_subtree_check)" >> exports
if [ "$i" -lt 10 ] ; then
    echo "10.0.0.$var2 $vmname$var00$i" >> hosts
else
        if [ "$i" -lt 100 ] ; then
                echo "10.0.0.$var2 $vmname$var0$i" >> hosts
        else
                echo "10.0.0.$var2 $vmname$i" >> hosts
        fi
fi
ssh-keyscan -H 10.0.0.$var2 >> /home/$user/.ssh/known_hosts
done

exportfs -a

# Finally install GCC (c++ and fortran) and OPEN_MPI
yum install make gcc gcc-c++ gcc-gfortran -y
yum -y install openmpi openmpi-devel -y
