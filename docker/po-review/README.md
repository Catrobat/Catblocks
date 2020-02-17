# PO-Review Dockerimage

Please use this Dockerfile and entrypoint.sh file for the po review.

```
  # extract
  unzip DockerCatblocks.zip -d catblocksPO/
  cd catblocksPO/
  chmod +x ./entrypoint.sh

  # build
  docker build -t catblocks:po .

  # run
  docker run --rm -it -p 8080:8080 catblocks:po
````

The current version does all the repository checkout in the entrypoint.sh script.
So there is no need to rebuild the entire container for every po review.
Instead you can reuse the existing one and just overwrite the new entrypoint.sh file via
```
  docker run --rm -it -p 8080:8080 -v ./entrypoint.sh:/entrypoint.sh catblocks:po
```