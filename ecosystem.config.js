module.exports = {
  apps: [
    {
      name: "beiwanglu-dev",
      script: "npm",
      args: "run dev",       // PM2 将会执行 `npm run dev`
      watch: true,           // 自动重启监控
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      }
    }
  ]
};

