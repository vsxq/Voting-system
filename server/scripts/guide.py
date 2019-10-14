import codecs
from jinja2 import Template
import os

context = ""
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
with codecs.open("../common_enum.ts",encoding="utf-8") as fp:
    context=fp.readlines()
    
for i in context[2:-1]:
    print(i)
    status,message=(i.split(",//"))
    l.append([status.strip(),message[:-1]])
print(t.render(l=l))
with codecs.open("src/utils/info.ts","w",encoding="utf-8") as fp:
    fp.write(t.render(l=l))
