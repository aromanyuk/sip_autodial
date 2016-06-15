Vagrant.configure(2) do |config|
  config.vm.box = "centos/7"
  config.vm.network "private_network", ip: "192.168.3.3"
  config.vm.provision "shell", inline: <<-SHELL
    sudo yum -y update
  SHELL
end