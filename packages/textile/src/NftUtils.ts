import { hexToString, isHex } from '@polkadot/util';
import { RmrkAction, RmrkInteraction, RMRK } from './types';

class NFTUtils {
  public static decode(value: string) {
    return decodeURIComponent(value);
  }

  public static decodeRmrk(rmrkString: string): string {
    return NFTUtils.decode(
      isHex(rmrkString) ? hexToString(rmrkString) : rmrkString
    );
  }

  public static convert(rmrkString: string): RMRK {
    try {
      return {
        interaction: NFTUtils.getAction(rmrkString),
        view: NFTUtils.unwrap(rmrkString)
      }
    } catch(e) {
      throw e
    }


  }

  public static getAction = (rmrkString: string): RmrkInteraction  => {
    if (RmrkActionRegex.MINT.test(rmrkString)) {
      return RmrkInteraction.MINT
    }

    if (RmrkActionRegex.MINTNFT.test(rmrkString)) {
      return RmrkInteraction.MINTNFT
    }

    throw new EvalError('Unable to get action from string');

  }

  public static unwrap(rmrkString: string): Object | null {
    const rr: RegExp = /{.*}/
    const match = rmrkString.match(rr)

    if (!match) {
      return null
    }

    return JSON.parse(match[0])

  }


}

class RmrkActionRegex {
  static MINTNFT = /^rmrk::MINTNFT::/;
  static MINT = /^rmrk::MINT::/;
}


export default NFTUtils
