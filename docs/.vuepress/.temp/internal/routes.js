export const redirects = JSON.parse("{}")

export const routes = Object.fromEntries([
  ["/", { loader: () => import(/* webpackChunkName: "index.html" */"D:/github/source/docs/.vuepress/.temp/pages/index.html.js"), meta: {"title":""} }],
  ["/programming/program.html", { loader: () => import(/* webpackChunkName: "programming_program.html" */"D:/github/source/docs/.vuepress/.temp/pages/programming/program.html.js"), meta: {"title":""} }],
  ["/programming/java/mod/item/firstitem.html", { loader: () => import(/* webpackChunkName: "programming_java_mod_item_firstitem.html" */"D:/github/source/docs/.vuepress/.temp/pages/programming/java/mod/item/firstitem.html.js"), meta: {"title":"创建第一个物品"} }],
  ["/404.html", { loader: () => import(/* webpackChunkName: "404.html" */"D:/github/source/docs/.vuepress/.temp/pages/404.html.js"), meta: {"title":""} }],
]);
