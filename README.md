# Tap Protector
[![CI][CI]][CI-status]
[![GitHub Marketplace][MarketPlace]][MarketPlace-status]
[![Mergify Status][mergify-status]][mergify]

A GitHub Action that deletes the tag if a tag that doesn't follow the rule is pushed.
If you release with tag push, there might be many tags that didn't trigger the release workflow and kind of make your repo messy.

You can also select wether as tag push of malform format will fail the workflow or not.

This action extract the number from a pull request which has triggered this by default. You don't need to specify the pull request number by `${{ github.event.pull_request.number }}`.

## Usage

```yml
      - name: Reject tags
        uses: KeisukeYamashita/tag-protector@v1
        rule: v[0-9]{1,}.[0-9]{1,}-[0-9]{1,}
```

### Trigger by `pull_request` event with custom check

This is just an example to show one way in which this action can be used.

```yml
on: pull_request
jobs:
  auto-merge:
    - name: Reject tags
      uses: KeisukeYamashita/tag-protector@v1
      with:
        rule: v[0-9]{1,}.[0-9]{1,}-[0-9]{1,}
```

### Action inputs

| Name | Description | Default |
| --- | --- | --- |
| `deleteTag` | Delete the tag that doesn't follow the rule or not' | `true` |
| `rule` | Regex of the tag format should be | -(Required) |
| `failWorkflow` | Failed the workflow or not | `false` 
| `repostiory` | The GitHub repository containing the pull request | Current repository | 
| `token` | `GITHUB_TOKEN` or a `repo` scoped [PAT](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token). | `GITHUB_TOKEN` |

### Action outputs

| Name | Description | 
| --- | --- | 
| `ref` | Tag. It doesn't contain `/ref/tags` prefix. | 
## License

[MIT](LICENSE)

<!-- Badge links -->
[CI]: https://github.com/KeisukeYamashita/tag-protector/workflows/build-test/badge.svg
[CI-status]: https://github.com/KeisukeYamashita/tag-protector/actions?query=workflow%3Abuild-test

[MarketPlace]: https://img.shields.io/badge/Marketplace-Tap%20Protector-blue.svg?colorA=24292e&colorB=0366d6&style=flat&longCache=true&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAM6wAADOsB5dZE0gAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAERSURBVCiRhZG/SsMxFEZPfsVJ61jbxaF0cRQRcRJ9hlYn30IHN/+9iquDCOIsblIrOjqKgy5aKoJQj4O3EEtbPwhJbr6Te28CmdSKeqzeqr0YbfVIrTBKakvtOl5dtTkK+v4HfA9PEyBFCY9AGVgCBLaBp1jPAyfAJ/AAdIEG0dNAiyP7+K1qIfMdonZic6+WJoBJvQlvuwDqcXadUuqPA1NKAlexbRTAIMvMOCjTbMwl1LtI/6KWJ5Q6rT6Ht1MA58AX8Apcqqt5r2qhrgAXQC3CZ6i1+KMd9TRu3MvA3aH/fFPnBodb6oe6HM8+lYHrGdRXW8M9bMZtPXUji69lmf5Cmamq7quNLFZXD9Rq7v0Bpc1o/tp0fisAAAAASUVORK5CYII=
[MarketPlace-status]: https://github.com/marketplace/actions/tag-protector

[mergify]: https://mergify.io
[mergify-status]: https://img.shields.io/endpoint.svg?url=https://gh.mergify.io/badges/KeisukeYamashita/tag-protector&style=flat
