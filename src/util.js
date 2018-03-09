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

//检测一个对象/数组是否为空
export function isEmptyObject(obj) {
   for (let key in obj) {
      return false
   }
   return true
}

export function getChatId(userId, targetId) {
   return [userId, targetId].sort().join('_')
}