# Jest Testing Action

This action is designed to work with the [Catrobat/Catblocks](https://github.com/Catrobat/Catblocks) repository only.
First it builds a docker container based on the ./Dockerfile.
Inside this container, it executes the `entrypoint.sh` script, which checkout the triggered branch and builds it.

After all jest tests have finished, we upload the report to your [Reporting Website](https://developer.catrobat.org/Catblocks/index.html).

## Example usage

```yaml
uses: ./jest-testing-action/ # Use local repository action
id: jestTest
with:
  github-token: ${{ secrets.GITHUB_TOKEN }}
```
