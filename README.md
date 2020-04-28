# Github Auto Approve Action

This action automatically approves a pull request.

## Inputs

### `repo-token`

**Required** A github token used to approve the pull request.

## Example usage

```yaml
name: Auto approve
on: pull_request

jobs:
  build:
    runs-on: ubuntu-latest
    name: Auto Approve
    steps:
    - uses: adobe-rnd/github-automerge-action@master
      with:
        repo-token: ${{ secrets.GITHUB_TOKEN }}

```

# Development

## build and deploy

```sh-session
$ npm run build
$ git commit -am"...."
$ npm release
```


