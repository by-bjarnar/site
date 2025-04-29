import * as migration_20250406_015453 from './20250406_015453';
import * as migration_20250429_224301 from './20250429_224301';

export const migrations = [
  {
    up: migration_20250406_015453.up,
    down: migration_20250406_015453.down,
    name: '20250406_015453',
  },
  {
    up: migration_20250429_224301.up,
    down: migration_20250429_224301.down,
    name: '20250429_224301'
  },
];
