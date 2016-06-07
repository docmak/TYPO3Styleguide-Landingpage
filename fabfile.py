from __future__ import with_statement
from fabric.api import *
from fabric.contrib.console import confirm

env.use_ssh_config = True
env.shell = '/usr/local/bin/bash -l -c'

@task
def deploy():
	'''
	Deploy to typo3.org server
	'''
	local("rsync --delete -avP --rsh=\"ssh\" Public/ styleguidetypo3org@srv105.typo3.org:/var/www/vhosts/styleguide.typo3.org/www")


