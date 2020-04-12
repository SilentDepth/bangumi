/**
 * 收藏状态 ID
 *
 * 1 = wish    = 想做
 * 2 = collect = 做过
 * 3 = do      = 在做
 * 4 = on_hold = 搁置
 * 5 = dropped = 抛弃
 */
type CollectionStatusId = 1 | 2 | 3 | 4 | 5

/**
 * 收藏状态类型
 */
type CollectionStatusType = 'wish' | 'collect' | 'do' | 'on_hold' | 'dropped'

/**
 * 收藏状态名称
 */
type CollectionStatusName = '想做' | '做过' | '在做' | '搁置' | '抛弃'

// 收藏状态
interface CollectionStatus {
  id: CollectionStatusId
  type: CollectionStatusType
  name: CollectionStatusName
}

/**
 * 章节状态 ID
 *
 * 1 = queue   = 想看
 * 2 = watched = 看过
 * 3 = drop    = 抛弃
 * ? = remove  = 撤销
 */
type EpStatusId = 1 | 2 | 3

/**
 * 章节状态类型
 */
type EpStatusType = 'queue' | 'watched' | 'drop' | 'remove'

/**
 * 章节状态名称
 */
type EpStatusName = '想看' | '看过' | '抛弃' | '撤销'

/**
 * 章节状态
 */
interface EpStatus {
  id: EpStatusId
  type: EpStatusType
  name: EpStatusName
}

/**
 * 返回数据大小
 */
type ResponseGroup = 'small' | 'medium' | 'large'

/**
 * 条目类型
 *
 * 1 = book
 * 2 = anime
 * 3 = music
 * 4 = game
 * 6 = real
 */
type SubjectType = 1 | 2 | 3 | 4 | 6

/**
 * 条目类型名称
 */
type SubjectTypeName = 'book' | 'anime' | 'music' | 'game' | 'real'

/**
 * 收藏人数
 */
interface SubjectCollection {
  /**
   * 想做
   * @example 608
   */
  wish: number
  /**
   * 做过
   * @example 2010
   */
  collect: number
  /**
   * 在做
   * @example 103
   */
  doing: number
  /**
   * 搁置
   * @example 284
   */
  on_hold
  /**
   * 抛弃
   * @example 86
   */
  dropped
}

/**
 * 用户信息
 */
interface User {
  /**
   * 用户 ID
   * @example 1
   */
  id: number
  /**
   * 用户主页地址
   * @example "http://bgm.tv/user/sai"
   */
  url: string
  /**
   * 用户名
   * @example "sai"
   */
  username: string
  /**
   * 昵称
   * @example "Sai"
   */
  nickname: string
  /**
   * 头像地址
   */
  avatar: {
    /** @example "http://lain.bgm.tv/pic/user/l/000/00/00/1.jpg?r=1391790456" */
    large: string
    /** @example "http://lain.bgm.tv/pic/user/m/000/00/00/1.jpg?r=1391790456" */
    medium: string
    /** @example "http://lain.bgm.tv/pic/user/s/000/00/00/1.jpg?r=1391790456" */
    small: string
  }
  /**
   * 签名
   * @example "Awesome!"
   */
  sign: string
  /**
   * 用户组
   * @example 11
   */
  usergroup: UserGroup
}

/**
 * 用户收藏（small 尺寸基础信息）
 */
interface UserCollectionBasicInfo {
  /**
   * 番剧标题
   */
  name: string
  /**
   * 章节 ID
   */
  subject_id: number
  /**
   * 上次更新时间
   */
  lasttouch: number
}

/**
 * 用户收藏（medium 尺寸扩展信息）
 */
interface UserCollectionMediumInfo extends UserCollectionBasicInfo {
  /**
   * 条目信息
   */
  subject: {
    /**
     * 条目 ID
     * @example 12
     */
    id: number
    /**
     * 条目地址
     * @example "http://bgm.tv/subject/12"
     */
    url: string
    /**
     * 条目类型
     * @example 2
     */
    type: SubjectType
    /**
     * 条目名称
     * @example "ちょびっツ"
     */
    name: string
    /**
     * 条目中文名称
     * @example "人形电脑天使心"
     */
    name_cn?: string
    /**
     * 剧情简介
     * @example "在不久的将来,电子技术飞速发展,电脑成为人们生活中不可缺少的一部分……"
     */
    summary: string
    /**
     * 放送开始日期
     * @example "2002-04-02"
     */
    air_date: string
    /**
     * 放送星期
     * @example 2
     */
    air_weekday: number
    /**
     * 封面
     */
    images: {
      /** @example: "http://lain.bgm.tv/pic/cover/l/c2/0a/12_24O6L.jpg" */
      large: string
      /** @example: "http://lain.bgm.tv/pic/cover/c/c2/0a/12_24O6L.jpg" */
      common: string
      /** @example: "http://lain.bgm.tv/pic/cover/m/c2/0a/12_24O6L.jpg" */
      medium: string
      /** @example: "http://lain.bgm.tv/pic/cover/s/c2/0a/12_24O6L.jpg" */
      small: string
      /** @example: "http://lain.bgm.tv/pic/cover/g/c2/0a/12_24O6L.jpg" */
      grid: string
    }
    /**
     * 话数
     * @example 27
     */
    eps: number
    /**
     * 话数
     * @example 27
     */
    eps_count: number
    /**
     * 收藏人数
     */
    collection: SubjectCollection
  }
}

/**
 * 用户收藏（动画或三次元条目信息）
 */
interface UserCollectionVideoInfo {
  /**
   * 完成话数
   */
  ep_status: number
}

/**
 * 用户收藏（动画或三次元条目，small 尺寸）
 */
type UserVideoCollectionSmall = UserCollectionBasicInfo & UserCollectionVideoInfo

/**
 * 用户收藏（动画或三次元条目，medium 尺寸）
 */
type UserVideoCollectionMedium = UserCollectionMediumInfo & UserCollectionVideoInfo

/**
 * 用户收藏（书籍条目）
 */
interface UserCollectionBookInfo {
  /**
   * 完成卷数
   */
  vol_status: number
}

/**
 * 用户收藏（书籍条目，small 尺寸）
 */
type UserBookCollectionSmall = UserCollectionBasicInfo & UserCollectionBookInfo

/**
 * 用户收藏（书籍条目，medium 尺寸）
 */
type UserBookCollectionMedium = UserCollectionMediumInfo & UserCollectionBookInfo

/**
 * 用户收藏（small 尺寸）
 */
type UserCollectionSmall = UserVideoCollectionSmall | UserBookCollectionSmall

/**
 * 用户收藏（medium 尺寸）
 */
type UserCollectionMedium = UserVideoCollectionMedium | UserBookCollectionMedium

/**
 * 用户组
 *
 *  1 = 管理员
 *  2 = Bangumi 管理猿
 *  3 = 天窗管理猿
 *  4 = 禁言用户
 *  5 = 禁止访问用户
 *  8 = 人物管理猿
 *  9 = 维基条目管理猿
 * 10 = 用户
 * 11 = 维基人
 */
type UserGroup = 1 | 2 | 3 | 4 | 5 | 8 | 9 | 10 | 11
