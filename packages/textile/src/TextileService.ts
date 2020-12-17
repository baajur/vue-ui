import { Client, DBInfo, KeyInfo, ThreadID } from '@textile/hub'


/**
 * TextileService
 * @constructor
 * keyInfo from textile (generate using Textile Hub CLI)
 *
 */
export default abstract class TextileService<T> {
  private _keyInfo: KeyInfo | null;
  private _client: Client | null;
  private _dbStore: string = 'bafkqswn7uhcawhc74xne4zlhoebazbnsqa2n7k6yrqdt4sqedugmrsq';
  private _url: string;

  constructor(keyInfo: KeyInfo, url?: string) {
    this._keyInfo = keyInfo;
    this._url = url;
    Client
    .withKeyInfo(keyInfo)
    .then((client) => this._client = client)
    .catch(err => {throw new Error(err.message)})
  }


  get client(): Client {
    return this._client;
  }

  get collectioName(): string {
    return this._url
  }

  private createCollection(schema: T): Promise<void> {
    return this.client.newCollectionFromObject(this.store, schema, { name: this.collectioName })
  }

  protected async addToCollection(object: T) {
    const hasCollection = await this.hasCollection();
    if (!hasCollection) {
      await this.createCollection(object)
    }

    await this.client.create(this.store, this.collectioName, [ object ])
  }

  protected async update(object: T) {
    await this.client.save(this.store, this.collectioName, [ object ])
  }


  private async getInfo(): Promise<DBInfo> {
    return await this.client.getDBInfo(this.store)
  }

  private async joinFromInfo(info: DBInfo) {
    return await this.client.joinFromInfo(info)
  }

  protected async createDB(url: string): Promise<any> {
    this.hasClient();

    this.client.newDB(null, url)
  }

  private hasClient() {
    if (!this.client) {
      throw Error('No Client available')
    }
  }

  get store(): ThreadID {
    return TextileService.threadId(this._dbStore);
  }


  public exists(id: string | string[]): Promise<boolean> {
    return this.client.has(this.store, this.collectioName, Array.isArray(id) ? id : [id])
  }

  public static threadId(id: string): ThreadID {
    return ThreadID.fromString(id)
  }

  getCollection(id: string): Promise<T> {
    return this.client.findByID(this.store, this.collectioName, id)
  }

  getAllCollections(): Promise<T[]> {
    return this.client.find(this.store, this.collectioName, null)
  }

  private async hasCollection(): Promise<boolean> {
    try {
      await this.client.getCollectionInfo(this.store, this.collectioName)
      return true
    } catch(e) {
      return false
    }


  }

}

// let instance: TextileService<T> | null;

// export const getInstance = (): TextileService | null => {
//   return instance
// }

// export const createInstance = (keyInfo: KeyInfo): TextileService => {
//   if (!instance) {
//     instance = new TextileService(keyInfo)
//   }

//   return instance
// }
