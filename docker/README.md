# Catblocks container

# Run the container
Currently we only support rendering multiple programs.
So please pass a folder with the extracted project to /test/programs/ folder.
Further please expose port 8080 for reporting purpose.

```
  # build
  cd Catblocks/docker/
  docker build -t catblocks .

  # run
  docker run --rm -it -v localDir:/test/programs/ -p 8080:8080 catblocks
```

The entrypoint script validates if the local repository inside the container is on the same state as the remote one.
If not, it will pull the remote repository.

If you would like to disable the validation, please define the system variable SKIP_REPO_CHECK to "1"