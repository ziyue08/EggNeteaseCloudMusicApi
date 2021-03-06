import { Controller } from 'egg';
import { Default_Offset, Default_Limit } from '../utils/common';

export default class ArtistController extends Controller {
  /**
   * @description 获取专辑动态信息
   */
  public async getAlbumDynamicInfo() {
    const { ctx } = this;
    const { albumId } = ctx.params;

    ctx.body = await ctx.service.album.getAlbumDynamicInfo({
      albumId,
    });
  }

  /**
   * @description 获取最新专辑
   */
  public async getLatestAlbum() {
    const { ctx } = this;

    ctx.body = await ctx.service.album.getLatestAlbum();
  }

  /**
   * @description 收藏｜取消收藏 专辑
   */
  public async postAlbumSub() {
    const { ctx } = this;
    const { albumId, actionType } = ctx.params;

    ctx.body = await ctx.service.album.postAlbumSub({
      albumId,
      actionType,
    });
  }

  /**
   * @description 获取收藏专辑列表
   */
  public async getAlbumSublist() {
    const { ctx } = this;
    const { limit = Default_Limit, offset = Default_Offset } = ctx.query;

    ctx.body = await ctx.service.album.getAlbumSublist({
      offset,
      limit,
    });
  }

  /**
   * @description 获取专辑信息
   */
  public async getAlbumInfo() {
    const { ctx } = this;
    const { albumId } = ctx.params;

    ctx.body = await ctx.service.album.getAlbumInfo({
      albumId,
    });
  }
}
