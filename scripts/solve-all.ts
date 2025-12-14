import { readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { execSync } from 'node:child_process';

const srcDir = join(process.cwd(), 'src');

// Get all day directories
const dayDirs = readdirSync(srcDir)
  .filter(file => file.startsWith('day') && file.match(/^day\d+$/))
  .sort((a, b) => {
    const numA = Number.parseInt(a.replace('day', ''));
    const numB = Number.parseInt(b.replace('day', ''));
    return numA - numB;
  });

console.log('🎄 Running All Advent of Code Solutions 🎄\n');

for (const dayDir of dayDirs) {
  const dayPath = join(srcDir, dayDir);
  const dayNum = dayDir.replace('day', '');
  
  // Check for part01 and part02
  const part1Path = join(dayPath, 'part01.ts');
  const part2Path = join(dayPath, 'part02.ts');
  
  const hasPart1 = existsSync(part1Path);
  const hasPart2 = existsSync(part2Path);
  
  if (!hasPart1 && !hasPart2) {
    continue;
  }
  
  console.log('═'.repeat(60));
  console.log(`📅 Day ${dayNum}`);
  console.log('═'.repeat(60));
  
  if (hasPart1) {
    console.log('\n🌟 Part 1:');
    console.log('─'.repeat(60));
    try {
      execSync(`npx tsx ${part1Path}`, { stdio: 'inherit' });
    } catch (error) {
      console.error(`❌ Error running Day ${dayNum} Part 1:`, error);
    }
  }
  
  if (hasPart2) {
    console.log('\n⭐ Part 2:');
    console.log('─'.repeat(60));
    try {
      execSync(`npx tsx ${part2Path}`, { stdio: 'inherit' });
    } catch (error) {
      console.error(`❌ Error running Day ${dayNum} Part 2:`, error);
    }
  }
  
  console.log('\n');
}

console.log('═'.repeat(60));
console.log('✨ All solutions completed! ✨');
console.log('═'.repeat(60));
