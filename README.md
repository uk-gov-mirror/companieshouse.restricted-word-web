# Restricted Word Web (Admin)

## Summary

This web app is for users to administrate restricted words by viewing, searching, adding and deleting them. As part of the ECCT economic crime bill, the web app has been enhanced to add support for categorisation of the words to enable. Each word must be assigned to one or more categories. Any updates to a word's categories will also require a justification/reason to be provided. This also applies to any requests to delete an existing word.

Restricted word matching can be filtered on the categories, which are `Restricted` (existing words that were added before this functionality was introduced will be classed as this), `International organisations and foreign government departments`,  `Names for criminal / fraudulent purposes` and `Names previously subjected to a direction to change them`.

For more information regarding the architecture design and justifications of the enhancements, click [here](https://companieshouse.atlassian.net/wiki/spaces/PS/pages/4260626528/Enhancing+restricted+word+service).

## Description (for branch)

This is an internal system to maintain a list of restricted words, used by a small number of business users.

This application is part of the CHS Beta admin pages so the user needs to be given the CHS role that has permissions to access the page "/admin/restricted-word" (the role itself is names "restricted-word"). For test environments this can be done as documented in [confluence](https://companieshouse.atlassian.net/wiki/spaces/IncVal/pages/1259143327/Restricted+Word+Web+-+High+Level+Design#For-test-environments-(when-you-have-access-to-DB)).

## Environment Variables

The following is a list of mandatory environment variables for the service to run:

| Name                           | Description                | Example Value                            |
|--------------------------------|----------------------------|------------------------------------------|
| RESTRICTED_WORD_ADMIN_WEB_PORT | Application Port           | 3000                                     |
| INTERNAL_API_URL               | URL to Restricted Word Api | http://internalapi.chs-dev.internal:4001 |
| CHS_INTERNAL_API_KEY           | Internal API Key           |                                          |
| RESTRICTED_WORD_WEB_PORT       | Application Port           | 3000                                     |
| CHS_URL                        | URL to Restricted Word web | http://chs.local                         |

## Config variables

| Key           | Example Value        | Description                                  |
|---------------|----------------------|----------------------------------------------|
| CACHE_SERVER  | localhost:6379       | Required for storing values in memory(Redis) |
| CDN_HOST      | http://cdn.chs.local | Used when navigating to the webpage          |
| COOKIE_DOMAIN | chs.local            |                                              |
| COOKIE_NAME   | __SID                |                                              |
| COOKIE_SECRET |                      |                                              |

# Getting Started

## How to Run

For running with Docker:

* Run `chs-dev modules enable word` to enable the module.
* Run `chs-dev development enable restricted-word-web` to enable development of the module.
* Run `chs-dev up` to start.
* Navigate to http://chs.local/admin/restricted-word and sign in to CHS using your CH login identity. e.g. 
jbloggs@companieshouse.gov.uk.

If you encounter the "Page Not Found" error, then you will need to update your local Mongo database to have the 
`"restricted-word"` role assigned.

#### Assignment of the role can be done by following these steps:
* Connect to the Mongo database using a client such as MongoDB Compass or the Mongo shell.
* Inspect the `account.admin_permissions` collection to find the `entra-group-id` for a group that has the 
`/admin/restricted-word` permission. Copy this `entra-group-id` value.
* Navigate to the `account.users` collection in the Mongo database.
* Find the user document corresponding to your CH login identity (e.g. `jbloggs@companieshouse.gov.uk`) and add/update 
the `roles` array to include the `entra-group-id`.
* Be sure to also set/add the `admin_user` field to `true` for your user document.
* You will likely need to restart the `chs-dev` environment for the changes to take effect.

Further information regarding user authentication and MS Entra can be found in the [confluence documentation](https://companieshouse.atlassian.net/wiki/spaces/DEV/pages/5462196391/Migrating+internal+user+authentication+to+Entra+SSO).

Other general information regarding the Restricted Word Web application can be found here [confluence documentation](https://companieshouse.atlassian.net/wiki/spaces/IncVal/pages/1104085245/Development).

### How to Build
* Enable local development by running `chs-dev development enable restricted-word-web`.
* After you make changes to the code, run `chs-dev reload -f restricted-word-web`.

### How to view logs
* Run `chs-dev logs -f restricted-word-web`
* Or use an alternative logs viewer such as Docker Desktop or Dockermon.

## Testing

### Unit Tests
Run `npm run test` or `npm run test:coverage` (to get a coverage report)

### Local

1. Have the restricted word api running on your same machine.
2. In project home directory `npm start`
3. In browser go to http://localhost:3001

### AWS Test

The application is installed via the `restricted-word-web` Concourse pipeline.

## Formatting & Linting

This repo uses ESLint and Prettier for code linting and formatting, and are configured to run automatically via a pre-commit hook.
You can by-pass the pre-commit hook using the `--no-verify` option in the `git` CLI.
