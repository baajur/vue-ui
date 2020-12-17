interface Astronaut {
  name: string
  missions: number
  _id: string
}

export interface Attribute {
  display_type: DisplayType;
  trait_type: string;
  value: number | string;
}

export enum DisplayType {
  null,
  "boost_number",
  "number",
  "boost_percentage",
}

export interface State {
  getAllCollections(): Promise<Collection[]>;
  getNFTsForCollection(id: string): Promise<NFT[]>;
  getNFT(id: string): Promise<NFT>;
  getCollection(id: string): Promise<Collection>;
  getNFTsForAccount(account: string): Promise<NFT[]>;
  getLastSyncedBlock(): Promise<number>;
  refresh(): Promise<State>;
}

export class rmkNFT {
  readonly collection: Collection;
  readonly name: string;
  readonly instance: string;
  readonly transferable: number;
  readonly sn: string;
  readonly metadata: NFTMetadata;
  static mintnft(): rmkNFT {
    return new rmkNFT();
  }
  id(): string {
    return `${this.collection.id}-${this.instance}-${this.sn}`;
  }
  send(): rmkNFT {
    return this;
  }
  consume(): rmkNFT {
    return this;
  }
  list(): rmkNFT {
    return this;
  }
  buy(): rmkNFT {
    return this;
  }
}

export interface NFTMetadata {
  external_url?: string;
  image?: string;
  image_data?: string;
  description?: string;
  name?: string;
  attributes: Attribute[];
  background_color?: string;
  animation_url?: string;
  youtube_url?: string;
}

export class rmkCollection {
  readonly version: string;
  readonly name: string;
  readonly max: number;
  private issuer: string;
  readonly symbol: string;
  readonly id: string;
  readonly metadata: CollectionMetadata;
  static mint(): rmkCollection {
    return new rmkCollection();
  }
  change_issuer(): rmkCollection {
    return this;
  }
}

export interface CollectionMetadata {
  description?: string;
  attributes: Attribute[];
  external_url?: string;
  image?: string;
  image_data?: string;
}

export interface Collection {
   version: string;
   name: string;
   max: number;
   issuer: string;
   symbol: string;
   id: string;
   _id: string;
   metadata: CollectionMetadata;
   items: NFT[];
}

export interface NFT {
   name: string;
   instance: string;
   transferable: number;
   sn: string;
   _id: string;
   metadata: NFTMetadata;
   currentOwner: string;
}
