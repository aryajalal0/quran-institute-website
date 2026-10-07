import { spawn } from 'node:child_process';
const vite = spawn(process.execPath, ['node_modules/vite/bin/vite.js'], { stdio:'inherit', shell:false });
const api = spawn(process.execPath, ['server/server.mjs'], { stdio:'inherit', shell:false });
const stop=()=>{vite.kill('SIGTERM');api.kill('SIGTERM');};
process.on('SIGINT',stop);process.on('SIGTERM',stop);process.on('exit',stop);
