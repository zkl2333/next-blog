const child = require('child_process');

if (process.env.LEANCLOUD_APP_ID) {
    console.log('leancloud 部署中...')
    child.execSync('next build', { stdio: 'inherit' })
}
