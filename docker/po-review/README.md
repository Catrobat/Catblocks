# Catblocks PO-Review Container

[CATBLOCKS](https://github.com/Catrobat/Catblocks) PO-Review docker container

The container clones and builds the project during startup. This allows docker image-reusevfor all upcoming PO-Reviews.
Only the entrypoint.sh file needs to be updated. This file also includes the `COMMITHASH` to fetch. 

When not able to access the webserver: verify that you bind the `SERVERPORT -p 8080:8080` properly, otherwise the host 
will not be able to.

# Build
The container buildes, using standard docker procedure. All build options are available
[here](https://docs.docker.com/engine/reference/commandline/build/). 

We recommend the use of a `po-review` flag, using the `-t` option, to not conflict with existing ones.

```bash
  # change into github action artifact extraction
  docker build -t catblocks:po-review .

  # validate cointainer creation
  docker images
```

# Run
The current version only supports the CATBLOCKS Share format.
Programs can be passed via parameter or by mounting a host folder at startup. 
A combination of both is supported as well, but not separatly listed below. 

In case you have already built the `catblocks:po-review` container and you would like to reuse it. You can overwrite the
 entrypoint.sh file using the `-v /absolute/path/to/entrypoint.sh:/entrypoint.sh` option. Please validate that the 
 entrypoint.sh file is executable. 

## Single program testing
For single program testing use the paramater method. 
Here you just pass, either the program URL or the program hash, as paramaters to the container.
Both values can be found on the [share](https://share.catrob.at/app/).

```bash
  # use program url
  docker run --rm -it -p 8080:8080 catblocks:po-review "https://share.catrob.at/app/project/4a20f223-5cbf-11ea-a2ae-000c292a0f49"

  # use program hash 
  docker run --rm -it -p 8080:8080 catblocks:po-review "4a20f223-5cbf-11ea-a2ae-000c292a0f49"
```

This will download the program before launching the webserver.

## Bulk program testing
To perform a bulk test download the programs locally and mount the directory at startup. We support the 
extracted as well as the compressed versions of programs.

An example directory listing:

```bash
catBulkTest/                                              # containing directory
catBulkTest/50ad0425-5c8e-11ea-a2ae-000c292a0f49.catrobat # catroid program format
catBulkTest/29d991a2-c966-4d1f-ba06-7c2afa644177.zip      # zip program format
catBulkTest/51fd7ff4-4631-4257-8d3c-795321614fd3          # extracted program format
catBulkTest/51fd7ff4-4631-4257-8d3c-795321614fd3/code.xml # extracted program format
catBulkTest/51fd7ff4-4631-4257-8d3c-795321614fd3/Scena 1  # extracted program format
```

To test all containing programs, mount the `catBulkTest` folder to the `/test/programs/` one from the container. This
can be done using the `-v` option.

```bash
 # mount folder and run bulk test
  docker run --rm -it -v ./catBulkTest:/test/programs/ -p 8080:8080 catblocks:po-review
```