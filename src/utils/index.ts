/**
 * 判断是否是外部链接
 *
 * @param {string} path
 * @returns {Boolean}
 */
// 返回true，表示是外链
export function isExternal(path: string) {
  const isExternal = /^(https?:|http?:|mailto:|tel:)/.test(path)
  return isExternal
}
