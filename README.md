# Helm Chart AppVersion Promoter

This action promotes a Helm Charts AppVersion based on external webhook.

## Example Request

```sh
curl -L \
  -X POST \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer <YOUR-TOKEN>"\
  -H "X-GitHub-Api-Version: 2022-11-28" \
  https://api.github.com/repos/OWNER/REPO/dispatches \
  -d '{"event_type":"bump_appversion","client_payload":{"appversion":0.0.8}}'
```

Docs about this endpoint: https://docs.github.com/en/rest/repos/repos?apiVersion=2022-11-28#create-a-repository-dispatch-event

## Example usage in jobs

```yaml
steps:
- name: Checkout
  uses: actions/checkout@v3
- name: Helm Chart Bump AppVersion
  uses: ./ # Uses an action in the root directory
  id: appversionbump
  with:
    appversion: ${{ github.event.client_payload.appversion }}
- name: Output
  run: echo "${{ steps.appversionbump.outputs.result }}"
- uses: stefanzweifel/git-auto-commit-action@v4
```
