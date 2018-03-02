/**
 * Created by Mrzou on 2018-3-1.
 */
export function getReadireactPath({type,avatar}) {
  //根据用户信息 返回跳转地址
  // user.type boss || genius
  // user.avatar /bossinfo /geniusinfo
  let url = (type === 'boss') ? '/boss' : '/genius'
  if (!avatar) {
    url += 'info'
  }
  return url
}