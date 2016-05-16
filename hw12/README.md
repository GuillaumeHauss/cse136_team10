# cse136_team10
Here is our GitHub Repository on which we will develop our web applications. 
Make sure that you pull/push your files correctly in order not to erase the previous work of others, or lost your work on your machines ! 



## Setting Up Vagrant + VirtualBox + Apache2 On OSX
shout out to ```alex-gain`` on slack for walking me through setting all of this up, I got the 000-default and Vagrantfile setup from him.

- *Step 1 (Setting up Vagrant and VirtualBox) :*
  Follow instructions on this page: 
  ```
  https://www.vagrantup.com/docs/installation/
  ```
  to set up Vagrant and VirtualBox. Remember to set up vagrant in ```/``` in a directory called ```vagrant``` so your directory structure should look like this with the Vagrantfile:
  ```
  /vagrant/Vagrantfile
  ```
  
  Note: I personally used the default values for RAM allocation and seem to have no problems.
  
- *Step 2 (Setting up apache2) :*
  Open terminal and type ```vagrant up``` if your vagrant server is not running already and if it is already running type ```vagrant ssh``` to connect to your vagrant instance. You need to install apache 2 with ```sudo apt-get install apache2```. Now install vim with ```sudo apt-get install vim```. Next type ```cd /ect/apache2/sites-enabled/``` and now type ```sudo vim 000-default``` and copy in this:
  ```
  <VirtualHost *:80>
    ServerAdmin webmaster@localhost
    DocumentRoot /vagrant/home
    <Directory />
        Options FollowSymLinks
        AllowOverride None
    </Directory>
    <Directory /vagrant/home/>
                Options Indexes FollowSymLinks MultiViews +ExecCGI
                AddHandler cgi-script .pl .cgi
                AllowOverride None
                Order allow,deny
                allow from all
        </Directory>
    ScriptAlias /cgi-bin/ /usr/lib/cgi-bin/
    <Directory "/usr/lib/cgi-bin">
        AllowOverride None
        Options +ExecCGI -MultiViews +SymLinksIfOwnerMatch
        Order allow,deny
        Allow from all
    </Directory>
    ErrorLog ${APACHE_LOG_DIR}/error.log
    # Possible values include: debug, info, notice, warn, error, crit,
    # alert, emerg.
    LogLevel warn
    CustomLog ${APACHE_LOG_DIR}/access.log combined
    Alias /doc/ "/usr/share/doc/"
    <Directory "/usr/share/doc/">
        Options Indexes MultiViews FollowSymLinks
        AllowOverride None
        Order deny,allow
        Deny from all
        Allow from 127.0.0.0/255.0.0.0 ::1/128
    </Directory>
</VirtualHost>
  ```
  Now you need to go back to your machine and change the ```Vagrantfile``` to be:
  ```
  # -*- mode: ruby -*-
# vi: set ft=ruby :

# All Vagrant configuration is done below. The "2" in Vagrant.configure
# configures the configuration version (we support older styles for
# backwards compatibility). Please don't change it unless you know what
# you're doing.
Vagrant.configure(2) do |config|
  # The most common configuration options are documented and commented below.
  # For a complete reference, please see the online documentation at
  # https://docs.vagrantup.com.

  # Every Vagrant development environment requires a box. You can search for
  # boxes at https://atlas.hashicorp.com/search.
  config.vm.box = "hashicorp/precise64"

  # Disable automatic box update checking. If you disable this, then
  # boxes will only be checked for updates when the user runs
  # `vagrant box outdated`. This is not recommended.
  # config.vm.box_check_update = false

  # Create a forwarded port mapping which allows access to a specific port
  # within the machine from a port on the host machine. In the example below,
  # accessing "localhost:8080" will access port 80 on the guest machine.
  config.vm.network "forwarded_port", guest: 80, host: 9000

  # Create a private network, which allows host-only access to the machine
  # using a specific IP.
  # config.vm.network "private_network", ip: "192.168.33.10"

  # Create a public network, which generally matched to bridged network.
  # Bridged networks make the machine appear as another physical device on
  # your network.
  # config.vm.network "public_network"

  # Share an additional folder to the guest VM. The first argument is
  # the path on the host to the actual folder. The second argument is
  # the path on the guest to mount the folder. And the optional third
  # argument is a set of non-required options.
  # config.vm.synced_folder "../data", "/vagrant_data"

  # Provider-specific configuration so you can fine-tune various
  # backing providers for Vagrant. These expose provider-specific options.
  # Example for VirtualBox:
  #
  # config.vm.provider "virtualbox" do |vb|
  #   # Display the VirtualBox GUI when booting the machine
  #   vb.gui = true
  #
  #   # Customize the amount of memory on the VM:
  #   vb.memory = "1024"
  # end
  #
  # View the documentation for the provider you are using for more
  # information on available options.

  # Define a Vagrant Push strategy for pushing to Atlas. Other push strategies
  # such as FTP and Heroku are also available. See the documentation at
  # https://docs.vagrantup.com/v2/push/atlas.html for more information.
  # config.push.define "atlas" do |push|
  #   push.app = "YOUR_ATLAS_USERNAME/YOUR_APPLICATION_NAME"
  # end

  # Enable provisioning with a shell script. Additional provisioners such as
  # Puppet, Chef, Ansible, Salt, and Docker are also available. Please see the
  # documentation for more information about their specific syntax and use.
  # config.vm.provision "shell", inline: <<-SHELL
  #   sudo apt-get update
  #   sudo apt-get install -y apache2
  # SHELL
end
```
  Now go back to the Vagrant ssh session and type ```sudo service apache2 restart```

- *Step 3 (Setting up directory structure) :*
  Here is the beauty of Vagrant, make a directory called ```home``` in the ```/vagrant``` directory so it should look like this ```/vagrant/home/```. You should also make a ```/home``` directory in your vagrant ssh session. All of the files you want to serve on the localhost will be placed in the ```/vagrant/home``` directory on your own machine. Now it is important to note some apache server commands
  ```
  __________________________________________________________________________________________________________________
  Command                                   | What does it do?
  ------------------------------------------------------------------------------------------------------------------
  sudo apachectl start                      | Starts the server on (port 9000) on your localhost (with my setup)
  sudo apachectl stop                       | Stops the server
  sudo apachectl restart                    | Restarts the server
  sudo service apache2 restart              | Reloads the 000-default file and restarts the server (I'm pretty sure)
  -------------------------------------------------------------------------------------------------------------------
  Note: You do all of these commands in a vagrant ssh session
  ```
  Whenever the server is up and you go to ```localhost:9000``` on your browser you are you are now in ```/vagrant/home/``` so for example if I wanted to access ```/vagrant/home/test.html``` I would go to ```localhost:9000/test.html```. Also Vagrant is pretty cool because since ```/vagrant/home/``` is on your own machine you can use whatever editor/ide you normally use to code with it.
