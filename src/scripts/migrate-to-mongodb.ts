import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { FramedataService } from '../framedata/framedata.service';
import * as fs from 'fs';
import * as path from 'path';
import { FrameData } from 'src/__types/frameData';

async function migrateData() {
  console.log('Starting migration...');
  const app = await NestFactory.create(AppModule);
  console.log('Created NestJS app');

  const framedataService = app.get(FramedataService);
  console.log('Got FramedataService');

  const gameDirs = ['tekken7', 'tekken8'];
  console.log('Processing game directories:', gameDirs);

  for (const gameDir of gameDirs) {
    const gamePath = path.join(__dirname, '../../src/__data', gameDir);
    console.log('Processing game directory:', gamePath);

    if (!fs.existsSync(gamePath)) {
      console.error(`Game directory ${gamePath} does not exist`);
      continue;
    }

    const files = fs
      .readdirSync(gamePath)
      .filter((file) => file.endsWith('.json'));
    console.log(`Found ${files.length} JSON files in ${gameDir}`);

    for (const file of files) {
      const filePath = path.join(gamePath, file);
      console.log('Reading file:', filePath);

      const content = fs.readFileSync(filePath, 'utf-8');
      const rawFrameData = JSON.parse(content);
      console.log(
        `Parsed JSON data from ${file}, found ${rawFrameData.length} moves`,
      );

      const characterName = path.basename(file, '.json');
      console.log('Processing character:', characterName);

      try {
        const frameData = rawFrameData.map((move: FrameData) => ({
          input: move.input == '' ? ' ' : move.input,
          hit_level: move.hit_level == '' ? ' ' : move.hit_level,
          counter: move.counter == '' ? ' ' : move.counter,
          hit: move.hit == '' ? ' ' : move.hit,
          block: move.block == '' ? ' ' : move.block,
          startup: move.startup == '' ? ' ' : move.startup,
          damage: move.damage == '' ? ' ' : move.damage,
          name: move.name == '' ? ' ' : move.name,
          alternateInputs: move.alternateInputs || [],
          categories: move.categories || [],
          notes: move.notes || [],
        }));

        await framedataService.saveCharacterFrameData(
          characterName,
          gameDir,
          frameData,
        );
        console.log(`Successfully migrated data for ${characterName}`);
      } catch (error) {
        console.error(`Error migrating data for ${characterName}:`, error);
      }
    }
  }

  await app.close();
  console.log('Migration completed');
}

migrateData().catch(console.error);
