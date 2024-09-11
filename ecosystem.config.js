module.exports = {
  apps: [
      {
          name: "wedding_invitation",
          script: "node_modules/next/dist/bin/next",
          args: "start -p PORT",
          cwd: "./",
          instances: 0,
          autorestart: true,
          exec_mode: "fork",
          listen_timeout: 50000,
          kill_timeout: 5000,
      },
  ],
};