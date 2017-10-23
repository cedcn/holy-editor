const deploy = require('shipit-deploy')

module.exports = shipit => {
  deploy(shipit)

  shipit.initConfig({
    default: {
      workspace: '/tmp/holy-editor',
      deployTo: '~/holy-editor',
      repositoryUrl: 'https://github.com/Cedcn/holy-editor',
      ignores: ['.git', 'node_modules'],
      keepReleases: 3,
      shallowClone: true
    },
    staging: {
      servers: 'cedcn@cedcn'
    }
  })

  // shipit.task('pwd', () => shipit.remote('pwd'));

  // shipit.on('deployed', () => {
  //   const current = shipit.currentPath
  //   shipit.remote(`cd ${current}; NODE_ENV=production npm run dll && npm run bulid && node ./bin/www`)
  //     .then(res => console.log(res[0].stdout))
  // })
}
