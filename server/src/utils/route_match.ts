import * as Fs from "fs"
import * as Path from "path"
import {get_file_name} from "./deal_with_something"

export function route_match_control(path: string, router: any) {
  const control_set = Path.join(__dirname, `../control/${path}`)
  const files = Fs.readdirSync(control_set)
  files.forEach(
    (file) => {
      console.log("sss",__dirname)
      const file_entity = require(Path.join(__dirname, `../control/${path}`, file))

      if (file_entity.method === "POST") {

        router.post(`/${get_file_name(file)}`, file_entity.function())
      }
      else {
        router.get(`/${get_file_name(file)}`, file_entity.function())
      }

    }

  )
  return router
}
export function base_route_match(files: string[], Router: any) {
  //TODO 过滤
  files.filter((file) => {
    if (file.search(/.*\.ts$/) === 0)
      return true
    else return false
  }).
    forEach((file: any) => {
      console.log(file)
      const file_name = get_file_name(file);

      if (file_name !== 'base_router') {
        const file_entity = require(Path.join(__dirname,"./../router/", file));
        Router.use(`/${file_name}`, file_entity.routes(), file_entity.allowedMethods())
      }
    })
  return Router
}
