# Catblocks po-review container

Catrobat [Catblocks](https://github.com/Catrobat/Catblocks) po-review docker conatiner. The container will clone and build the project during start time. On the first look this seems to be silly, but the main idea of your team was, that we can reuse the same Dockerimage for all upcomming po-reviews. Just the entrypoint.sh file will get updated. This file also includes the `COMMITHASH` to fetch. 

Please verify that you bind the `SERVERPORT -p 8080:8080` properly, otherwise the host will not be able to access the webserver inside the container.

# Build
To build the container, please follow the standard docker procedure. Please find all the build options in the offical docker webpage accessable [here](https://docs.docker.com/engine/reference/commandline/build/). 

Catblocks team recommends to flag the container as `po-review`, this is with the `-t` options. It is not mandatory, but within this document we will always refer to it.

```bash
  # change into github action artifact extraction
  docker build -t catblocks:po-review .

  # validate cointainer creation
  docker images
```

# Run
The current version only supports the catblocks share format.
We can either pass programs via params or by mounting a host folder at start time. Alsot he combination is supported, but not separated listed below. 

In case you have already build the `catblocks:po-review` container and you would like to reuse it. You can overwrite the entrypoint.sh file with the `-v /absolute/path/to/entrypoint.sh:/entrypoint.sh` option. Please validate first that the entrypoint.sh file is executable. 

## Single program testing
For single program testing, we recommend the params method. 
Here you just pass either the program url or program hash as params to the container.
Both values can be found by browsing the [share](https://share.catrob.at/app/).

```bash
  # use program url
  docker run --rm -it -p 8080:8080 catblocks:po-review "https://share.catrob.at/app/project/4a20f223-5cbf-11ea-a2ae-000c292a0f49"

  # use program hash 
  docker run --rm -it -p 8080:8080 catblocks:po-review "4a20f223-5cbf-11ea-a2ae-000c292a0f49"
```

It will download the program before bringing up the webserver.

## Bulk program testing
If you would like to perform a bulk test, we recommend to download the program first locally and mount the directory at start time. We support the extracted as also the compressed version of programs.

An example directory listing is shown here:

```bash
catBulkTest/                                              # containing directory
catBulkTest/50ad0425-5c8e-11ea-a2ae-000c292a0f49.catrobat # catroid program format
catBulkTest/29d991a2-c966-4d1f-ba06-7c2afa644177.zip      # zip program format
catBulkTest/51fd7ff4-4631-4257-8d3c-795321614fd3          # extracted program format
catBulkTest/51fd7ff4-4631-4257-8d3c-795321614fd3/code.xml # extracted program format
catBulkTest/51fd7ff4-4631-4257-8d3c-795321614fd3/Scena 1  # extracted program format
```

To test all containing program, we need to mount the `catBulkTest` folder to the `/test/programs/` ones from the container. This can be done via the `-v` option.

```bash
 # mount folder and run bulk test
  docker run --rm -it -v ./catBulkTest:/test/programs/ -p 8080:8080 catblocks:po-review
```