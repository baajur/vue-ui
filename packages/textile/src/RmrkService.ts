import { KeyInfo } from '@textile/hub';
import { Collection, NFT, State } from './scheme'
import TextileService from './TextileService';
import { RmrkInteraction, RMRK } from './types'
import NFTUtils from './NftUtils'

class RmrkService extends TextileService<Collection> implements State {


  constructor(keyInfo: KeyInfo, url: string) {
    super(keyInfo, url)
  }

  getNFTsForCollection(id: string): Promise<NFT[]> {
    throw new Error('Method not implemented.');
  }
  getNFT(id: string): Promise<NFT> {
    throw new Error('Method not implemented.');
  }
  getNFTsForAccount(account: string): Promise<NFT[]> {
    throw new Error('Method not implemented.');
  }
  getLastSyncedBlock(): Promise<number> {
    throw new Error('Method not implemented.');
  }
  refresh(): Promise<State> {
    throw new Error('Method not implemented.');
  }

  public resolve(rmrkString: string): Promise<Collection> {
    const resolved: RMRK = NFTUtils.convert(rmrkString)
    switch (resolved.interaction) {
      case RmrkInteraction.MINT:
        return this.addCollection(resolved.view)
      case RmrkInteraction.MINTNFT:
        return this.addItemToCollection(resolved.view)
      // case RmrkInteraction.SEND:
      //   return this.addCollection(resolved.view)
      default:
        throw new EvalError(`Unable to evaluate following string, ${rmrkString}`)
    }
  }

  private async addCollection(view: Object): Promise<Collection> {
    const collection = (view as Collection);
    await this.addToCollection(collection)
    return collection;
  }

  private async addItemToCollection(view: Object): Promise<Collection> {
    const item = (view as NFT);
    const exitsts = await this.exists(item._id)
    if (!exitsts) {
      throw new ReferenceError(`Unable to find collection ${item._id}`)
    }
    const collection = await this.getCollection(item._id)
    collection.items = [ ...(collection.items || []), item ]
    await this.update(collection);
    return collection
  }


}


let instance: RmrkService | null;

export const getInstance = (): RmrkService | null => {
  return instance
}

export const createInstance = (keyInfo: KeyInfo, url: string): RmrkService => {
  if (!instance) {
    instance = new RmrkService(keyInfo, url)
  }

  return instance
}
