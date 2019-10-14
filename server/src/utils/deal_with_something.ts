import * as Path from "path"
export function get_file_name(file:string):string{
    console.log(Path.basename(file,".ts"))
    return Path.basename(file, ".ts")
}

