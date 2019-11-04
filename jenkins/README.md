# Catblocks Docker-image v1

Please see a template **Dockerfile** for [Catblocks](https://github.com/Catrobat/Catblocks) project.
It is build on top of the [Linux Arch](https://www.archlinux.org/).
This image is just for testing, it is properly to big for real use.
 
# Building the image
```
docker build -t catblocks:v1 /home/akarner/tulocal/catrobat/Catblocks/jenkins
```

# Start the image
Please add port or image mapping if needed.
```
docker run -ti catblocks:v1
```

# Jenkinsfile
Please see a template **Jenkins** for [Catblocks](https://github.com/Catrobat/Catblocks) project.
This one was tested with [Jenkins ver. 2.190.2](https://jenkins.io/).