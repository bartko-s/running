module.exports = {
    apps : [
        {
            name: "app",
            script: "./build/app.js",
            exec_mode: "cluster",
            instances: "max",
            env: {
                "NODE_ENV": "production",
            }
        }
    ]
};
