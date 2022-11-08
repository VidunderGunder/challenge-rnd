import fs from "node:fs/promises";
import { exec } from "node:child_process";

/**
 * Delete file or folder with everything in it at a given path
 *
 * Returns true if the file or folder was deleted, false if it didn't exist
 */
export async function deleteAll(path: string) {
  if (await isFile(path)) {
    await fs.unlink(path);
  } else if (await isFolder(path)) {
    const files = await fs.readdir(path);
    await Promise.all(files.map((file) => deleteAll(`${path}/${file}`)));
    await fs.rmdir(path);
  }
}

export async function isFile(path: string) {
  try {
    const stats = await fs.stat(path);
    return stats.isFile();
  } catch (error) {
    return false;
  }
}

export async function isFolder(path: string) {
  try {
    const stats = await fs.stat(path);
    return stats.isDirectory();
  } catch (error) {
    return false;
  }
}

export async function fileOrFolderExists(path: string) {
  try {
    const stats = await fs.stat(path);
    if (!(stats?.isFile() || stats?.isDirectory())) return false;
  } catch (error) {
    return false;
  }
  return true;
}

export async function runCommand(command: string) {
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  });
}
