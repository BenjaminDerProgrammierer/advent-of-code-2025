import fs from 'node:fs/promises'
import path from 'node:path'

const YEAR = 2025

function pad(n: number) {
    return String(n).padStart(2, '0')
}

async function readSessionFromFile(): Promise<string | null> {
    const candidates = ['.aoc_session', '.session', '.env']
    for (const name of candidates) {
        try {
            const p = path.resolve(process.cwd(), name)
            const txt = await fs.readFile(p, 'utf8')
            const match = txt.match(/session=(\S+)/)
            if (match) return match[1].trim()
            const raw = txt.trim()
            if (raw) return raw.split('\n')[0].trim()
        } catch { }
    }
    return null
}

const envSession = process.env.AOC_SESSION || process.env.SESSION || process.env.SESSION_COOKIE
const session = envSession || (await readSessionFromFile())
if (!session) {
    console.error('No session cookie found. Set AOC_SESSION env var or create .aoc_session file with the session value.')
    process.exit(1)
}

const argv = process.argv.slice(2)
if (argv.length === 0) {
    let i = 1;
    while (true) {
        if (!await fetchDayInput(i)) {
            break;
        }
        i++;
    }
} else {
    await fetchDayInput(Number(argv[0]));
}

async function fetchDayInput(day: number) {
    if (!Number.isInteger(day) || day < 1 || day > 25) {
        console.error('Day must be an integer between 1 and 25')
        process.exit(1)
    }

    const url = `https://adventofcode.com/${YEAR}/day/${day}/input`

    const headers: Record<string, string> = {
        Cookie: `session=${session}`,
        'User-Agent': 'advent-of-code-fetcher/1.0 (+https://github.com)'
    }

    console.log(`Fetching ${url}`)
    const res = await fetch(url, { headers })
    if (res.status !== 200) {
        console.error(`Unexpected response ${res.status} ${res.statusText}`)
        const body = await res.text().catch(() => '')
        if (body) console.error(body.slice(0, 200))
        return false;
    }

    const text = await res.text()

    const outDir = path.join(process.cwd(), 'data', `day${pad(day)}`)
    await fs.mkdir(outDir, { recursive: true })
    const outFile = path.join(outDir, `day${pad(day)}.in`)
    await fs.writeFile(outFile, text, 'utf8')
    console.log(`Saved input to ${outFile}`)

    return true;
}