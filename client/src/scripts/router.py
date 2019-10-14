import os
import os.path
from jinja2 import Template
import codecs
router_file="""
import * as React from 'react';
export const {{i}} = () => {
    return(
        <h1>
        {{i}}
        </h1>
    )
    }

"""
url_file="""
export const url_redirect={
    {% for i  in file_list %}

 {{i|lower()}}:"/{{i.replace("_","/")|lower()}}",

{% endfor %}
    }
"""
base_file = """
//<Route path="/manage" component={Manage} />
    import * as React from 'react';
import { render } from 'react-dom';
import 'antd/dist/antd.css';

import {
    BrowserRouter as Router,
    Route
  } from 'react-router-dom'
import Counter from './Counter';
{% for i  in file_list %}
import {
    {{i}}
    } from './router/{{i}}'
{% endfor %}
const Home=()=>{
    return (<div>
     <h1>   大同投票,你身边最好用的投票软件,没有之一</h1>
     <ul>
    {% for i  in file_list %}
    <li>
    <a href="/{{i.replace("_","/")|lower()}}" >{{i}}</a>
    </li>
    {% endfor %}
     </ul>
    </div>)
}


const App=()=>{
    return(
        
        <Router>

<Route exact={true} path="/"  component={Home}/>
    {% for i  in file_list %}
<Route path="/{{i.replace("_","/")|lower()}}" component={
    {{i}}
    } />
{% endfor %}
      <Route path="/counter" component={Counter} />
        </Router>
    )
}
export default App
"""
t = Template(base_file)
t1 = Template(url_file)
t2 =Template(router_file)
print("正在生成app.tsx")

l = []
for i in os.listdir("src/router"):
    l.append(os.path.splitext(i)[0])


message = ''
while message != 'exit':
    message = input("请输入新的路由")
    if message != 'exit':
        with codecs.open("src/router/"+message+".tsx", "w", encoding="utf-8") as fp:
             fp.write(t2.render(i=message))

with codecs.open("src/App.tsx", "w", encoding="utf-8") as fp:
    fp.write(t.render(file_list=l))
with codecs.open("src/utils/url_redirect.tsx","w",encoding="utf-8") as fp:
    fp.write(t1.render(file_list=l))

print(os.listdir("src/router"))

