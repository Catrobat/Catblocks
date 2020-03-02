# Catblocks container
Catrobat [Catblocks](https://github.com/Catrobat/Catblocks) testing docker conatiner. The container will clone and build the project during build time. This enables fast testing ability with a high security aspect. To guarantee that new features are still included, the container checks before rendering the remote repo for updates. On version difference, it will pull and rebuild the fresh `develop` branch. This behavoir can be disabled at build or at run time. 

Please verify that you bind the `SERVERPORT -p 8080:8080` properly, otherwise the host will not be able to access the webserver inside the container.

# Build
To build the container, please follow the standard docker procedure. Please find all the build options in the offical docker webpage accessable [here](https://docs.docker.com/engine/reference/commandline/build/). 

Catblocks team recommends to flag the container as `testing`, this is with the `-t` options. It is not mandatory, but within this document we will always refer to it.

```
  # change into the repository home directory
  cd ./docker/testing/
  docker build -t catblocks:testing .

  # validate cointainer creation
  docker images
```

In case you would like to skip the repository version testing for all runs, please activate the environment variable definition `ENV SKIP_REPO_CHECK 1` inside the Dockerfile.

# Run
The current version only supports the catblocks share format.
We can either pass programs via params or by mounting a host folder at start time. Alsot he combination is supported, but not separated listed below. 

In case you would like to disable the version control for the current run, please set the system variable `SKIP_REPO_CHECK` via `-e` option.

## Single program testing
For single program testing, we recommend the params method. 
Here you just pass either the program url or program hash as params to the container.
Both values can be found by browsing the [share](https://share.catrob.at/app/).

```
  # use program url
  docker run --rm -it -p 8080:8080 catblocks:testing "https://share.catrob.at/app/project/4a20f223-5cbf-11ea-a2ae-000c292a0f49"

  # use program hash 
  docker run --rm -it -p 8080:8080 catblocks:testing "4a20f223-5cbf-11ea-a2ae-000c292a0f49"

  # use program hash and skip version control
  docker run --rm -it -e SKIP_REPO_CHECK=1 -p 8080:8080 catblocks:testing "4a20f223-5cbf-11ea-a2ae-000c292a0f49"
```

It will download the program before bringing up the webserver.

## Bulk program testing
If you would like to perform a bulk test, we recommend to download the program first locally and mount the directory at start time. We support the extracted as also the compressed version of programs.

An example directory listing is shown here:

```
catBulkTest/                                              # containing directory
catBulkTest/50ad0425-5c8e-11ea-a2ae-000c292a0f49.catrobat # catroid program format
catBulkTest/29d991a2-c966-4d1f-ba06-7c2afa644177.zip      # zip program format
catBulkTest/51fd7ff4-4631-4257-8d3c-795321614fd3          # extracted program format
catBulkTest/51fd7ff4-4631-4257-8d3c-795321614fd3/code.xml # extracted program format
catBulkTest/51fd7ff4-4631-4257-8d3c-795321614fd3/Scena 1  # extracted program format
```

To test all containing program, we need to mount the `catBulkTest` folder to the `/test/programs/` ones from the container. This can be done via the `-v` option.

``` 
 # mount folder and run bulk test
  docker run --rm -it -v ./catBulkTest:/test/programs/ -p 8080:8080 catblocks:testing
```