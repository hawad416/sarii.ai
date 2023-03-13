import { spawn } from 'child_process';
import { join } from 'path';
import { createServer } from 'http';

export default function handler(req, res) {
  const pythonProcess = spawn('python', [join(process.cwd(), '../custom-training/model/ask.py')]);

  pythonProcess.stdout.on('data', (data) => {
    const result = JSON.parse(data.toString());
    res.status(200).json(result);
  });
}