import codecs
import os
from jinja2 import Template
context = ""
os.chdir("../../")
base_template="""

import {  base_info } from './info';
import {status_enum} from "../../../common_enum"



export interface base_info {
    message: string,
    status: status_enum
    [propName: string]: any

}
{% for i  in l %}

export const {{i[0]}}:base_info={
message:"{{i[1]}}",
    status:status_enum.{{i[0]}}
}
{% endfor %}
"""
l=[]
t=Template(base_template)

with codecs.open("common_enum.ts",encoding="utf-8") as fp:
    context=fp.readlines()
for i in context[1:-1]:
    status,message=(i.split(",//"))
    l.append([status.strip(),message[:-1]])
print(t.render(l=l))
os.chdir("server/src/utils")
