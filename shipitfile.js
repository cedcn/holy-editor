const deploy = require('shipit-deploy')

module.exports = shipit => {
  deploy(shipit)

  shipit.initConfig({
    default: {
      workspace: '/tmp/holy-editor',
      deployTo: '~/demo/holy-editor',
      repositoryUrl: 'https://github.com/Cedcn/holy-editor',
      ignores: ['.git', 'node_modules'],
      keepReleases: 2,
      shallowClone: true
    },
    staging: {
      servers: 'cedcn@cedcn'
    }
  })
}
