/**
 * 获取assets文件夹下的静态图片资源
 * @param url // 文件路径
 */
const getAssetsFile = (url) => new URL(`../assets/images/${url}`, import.meta.url).href

export { getAssetsFile }
