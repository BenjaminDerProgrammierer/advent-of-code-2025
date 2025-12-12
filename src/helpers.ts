import fs from 'node:fs';
import path from 'node:path';

export function getInput(day: number, isTest: boolean = false): string {
  // helpers.ts -> .. -> data -> dayXX -> dayXX[.test].in
  const inputFileUrl = path.join(import.meta.dirname, '..', 'data', `day${day.toString().padStart(2, "0")}`, `day${day.toString().padStart(2, "0")}${isTest ? '.test' : ''}.in`);

  if (fs.existsSync(inputFileUrl)) {
    const file = fs.readFileSync(inputFileUrl).toString()
    console.log(`Loaded file ${inputFileUrl} with ${file.split("\n").length} lines.`)
    return file;
  } else {
    throw new FileNotFoundError(`Input file ${inputFileUrl} does not exist`);
  }
}

class FileNotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "FileNotFoundError";
  }
}