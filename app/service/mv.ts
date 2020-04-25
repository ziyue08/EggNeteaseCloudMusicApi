import { Service } from 'egg';

import createRequest from '../utils/createRequest';

import {
  iGetMvList,
  MvArea,
  MvOrder,
  MvType,
  iMvId,
  iPageParams,
  iGetLatestMv,
  iPostMvSub,
  iGetMvUrl,
} from './types/mv';

/**
 * Mv Service
 */
export default class Mv extends Service {
  /**
   * @description 获取mv列表
   * @param area
   * @param type
   * @param order
   * @param page
   * @param pageSize
   */
  public async getMvList({
    area = 0,
    type = 0,
    order = 1,
    page,
    pageSize,
  }: iGetMvList): Promise<any> {
    const { ctx } = this;
    const query = ctx.request.query;

    return createRequest(
      'POST',
      `https://interface.music.163.com/api/mv/all`,
      {
        tags: JSON.stringify({
          地区: MvArea[area],
          类型: MvType[type],
          排序: MvOrder[order],
        }),
        offset: page,
        limit: pageSize,
        total: 'true',
      },
      { crypto: 'weapi', cookie: query.cookie, proxy: query.proxy }
    );
  }

  /**
   * @description 获取mv详情
   * @param mvId
   */
  public async getMvDetail({ mvId }: iMvId): Promise<any> {
    const { ctx } = this;
    const query = ctx.request.query;

    return createRequest(
      'POST',
      `https://music.163.com/weapi/mv/detail`,
      {
        id: mvId,
      },
      { crypto: 'weapi', cookie: query.cookie, proxy: query.proxy }
    );
  }

  /**
   * @description 获取网易出品mv
   * @param page
   * @param pageSize
   */
  public async getWyMv({ page, pageSize }: iPageParams): Promise<any> {
    const { ctx } = this;
    const query = ctx.request.query;

    return createRequest(
      'POST',
      `https://interface.music.163.com/api/mv/exclusive/rcmd`,
      {
        offset: page,
        limit: pageSize,
      },
      { crypto: 'weapi', cookie: query.cookie, proxy: query.proxy }
    );
  }

  /**
   * @description 获取网易出品mv
   * @param page
   * @param pageSize
   */
  public async getLatestMv({ area = 0, pageSize }: iGetLatestMv): Promise<any> {
    const { ctx } = this;
    const query = ctx.request.query;

    return createRequest(
      'POST',
      `https://interface.music.163.com/weapi/mv/first`,
      {
        area: area === 0 ? '' : MvArea[area],
        limit: pageSize,
        total: true,
      },
      { crypto: 'weapi', cookie: query.cookie, proxy: query.proxy }
    );
  }

  /**
   * @description 收藏 ｜ 取消收藏 Mv
   * @param mvId
   * @param actionType
   */
  public async postMvSub({ mvId, actionType }: iPostMvSub): Promise<any> {
    const { ctx } = this;
    const query = ctx.request.query;

    return createRequest(
      'POST',
      `https://music.163.com/weapi/mv/${actionType}`,
      {
        mvId: mvId,
        mvIds: '["' + mvId + '"]',
      },
      { crypto: 'weapi', cookie: query.cookie, proxy: query.proxy }
    );
  }

  /**
   * @description 获取mv收藏列表
   * @param page
   * @param pageSize
   */
  public async getMvSublist({ page, pageSize }: iPageParams): Promise<any> {
    const { ctx } = this;
    const query = ctx.request.query;

    return createRequest(
      'POST',
      `https://music.163.com/weapi/cloudvideo/allvideo/sublist`,
      {
        offset: page,
        limit: pageSize,
        total: true,
      },
      { crypto: 'weapi', cookie: query.cookie, proxy: query.proxy }
    );
  }

  /**
   * @description 获取mv Url
   * @param mvId
   * @param resolution
   */
  public async getMvUrl({ mvId, resolution }: iGetMvUrl): Promise<any> {
    const { ctx } = this;
    const query = ctx.request.query;

    return createRequest(
      'POST',
      `https://music.163.com/weapi/song/enhance/play/mv/url`,
      {
        id: mvId,
        r: resolution,
      },
      { crypto: 'weapi', cookie: query.cookie, proxy: query.proxy }
    );
  }
}