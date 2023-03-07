import { env } from 'process';
import { DataSource, DataSourceOptions } from 'typeorm';

const baseConfig: DataSourceOptions = {
  type: 'mongodb',
  entities: [],
  appname: 'NodeJS',
  synchronize: true,
};

export class Database {
  static readonly connection: DataSource = new DataSource(baseConfig);
  private db = Database.connection;
  private url: string = env.DATABASE_URI;
  async init(isTesting?: boolean): Promise<void> {
    this.db.setOptions({
    //   applicationName: 'Chat RPG',
      connectionTimeout: isTesting ? 1500 : undefined,
      url: this.url,
    });
    await this.db.initialize();
  }
}
