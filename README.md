# Github Auto Approve and Merge Action

This action automatically approves a pull request and merges it.

## Inputs

### `repo-token`

**Required** A github token used to approve the pull request.

## Example usage

```yaml
name: Auto Approve

on:
  pull_request:
    types: [opened, reopened]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Auto Approve on ${{ github.head_ref }}
        # only run on releases/*
        # Note: for some reason limiting the branches in the 'on' above doesn't work
        if: startsWith(github.head_ref, 'releases/')
        uses: adobe-rnd/github-automerge-action@master
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


