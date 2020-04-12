import {isRef, Ref, ref} from 'vue'
import {stringifyQuery} from 'vue-router'

let token: Ref<string>

/**
 * 获取用户信息
 *
 * @param username - 用户名或用户 ID
 */
function getUser (username: string | number): Promise<User> {
  return fetch(`/api/user/${username}`).then(res => res.json())
}

/**
 * 获取用户收藏
 *
 * @param username      - 用户名或用户 ID
 * @param cat           - 收藏类型（watching = 在看的动画与三次元条目；all_watching = ……及书籍条目）
 * @param ids           - 收藏条目 ID（用于批量查询收藏状态；需要将条目 ID 以半角逗号分隔，如：1,2,4,6）
 * @param responseGroup - 返回数据大小（small 不包含条目详细信息）
 */
function getUserCollection (username: string | number, cat: 'watching' | 'all_watching', ids?: string | null, responseGroup?: 'medium'): Promise<UserCollectionMedium[]>
function getUserCollection (username: string | number, cat: 'watching' | 'all_watching', ids?: string | null, responseGroup?: 'small'): Promise<UserCollectionSmall[]>
function getUserCollection (username: string | number, cat: 'watching' | 'all_watching', ids: string | null = null, responseGroup: 'small' | 'medium' = 'medium'): Promise<UserCollectionSmall[] | UserCollectionMedium[]> {
  const query = stringifyQuery({
    cat,
    ...ids && {ids},
    responseGroup,
  })
  return fetch(`/api/user/${username}/collection?${query}`).then(res => res.json())
}

export default function useBgmApi (accessToken?: string | Ref<string>) {
  if (accessToken) {
    token = isRef(accessToken) ? accessToken : ref(accessToken)
  }

  return {
    getUser,
    getUserCollection,
  }
}
