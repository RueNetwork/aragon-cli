#!/usr/bin/env node
const { writeJson } = require('fs-extra')
const path = require('path')

const getAppNPMPackage = appName => `@aragon/apps-${appName}`

const knownApps = ['voting', 'token-manager', 'vault', 'finance', 'agent']

const getAppRoles = app => {
  const arapp = require(`${getAppNPMPackage(app)}/arapp`)
  const roles = arapp.roles || []
  return roles.map(({ name, id }) => ({ name, id }))
}

const flatten = list =>
  list.reduce((a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), [])

const aOSRoles = [
  { id: 'CREATE_PERMISSIONS_ROLE', name: 'Create new permissions' },
  { id: 'APP_MANAGER_ROLE', name: 'Manage DAO apps' },
]

// TODO: Add support for user apps
const rolesForDefaultApps = () => {
  const allRoles = flatten(knownApps.map(app => getAppRoles(app))).concat(
    aOSRoles
  )

  return allRoles
}

writeJson(path.resolve('.', 'src/knownRoles.json'), rolesForDefaultApps(), {
  spaces: '\t',
})
