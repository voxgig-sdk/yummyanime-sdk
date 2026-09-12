import { YummyanimeEntityBase } from '../YummyanimeEntityBase';
import type { YummyanimeSDK } from '../YummyanimeSDK';
import type { Control } from '../types';
import type { Anime, AnimeListMatch } from '../YummyanimeTypes';
declare class AnimeEntity extends YummyanimeEntityBase<Anime> {
    constructor(client: YummyanimeSDK, entopts: any);
    make(this: AnimeEntity): AnimeEntity;
    list(this: any, reqmatch?: AnimeListMatch, ctrl?: Control): Promise<AnimeEntity[]>;
}
export { AnimeEntity };
