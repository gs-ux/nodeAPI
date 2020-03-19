# nodeAPI
这一篇博客介绍一下**构建用node作为后端，https形式的接口。**

我以前学**node**的时候，了解了接口的含义，并懂得了使用**express**包，可以快速搭建后端接口。

但是那个时候都是借助本机`localhost`，就算用服务器也只是**http**形式的。

**但是微信小程序对于http格式的域名是禁止发送请求的，所以我们得学会搭建https的后端接口。**

首先我们得先把我们域名升级为https，可以参考我以前的两篇文章：

[安装nginx](https://www.gaosong.site/2020/03/17/%E5%AE%89%E8%A3%85nginx/) 和 [nginx服务器http转https](https://www.gaosong.site/2020/03/17/nginx%E6%9C%8D%E5%8A%A1%E5%99%A8http%E8%BD%AChttps/)

我们还需要将https的那两个**ssl.key**和**ssl.pem**文件放到我们的这个文件下面。

创建一个app.js文件，内容如下：

```javascript
const express = require("express");
const https = require("https");
const fs = require("fs");
const path = require('path')

const httpsOption = {
    key : fs.readFileSync(path.join(__dirname, 'ssl.key')),
    cert: fs.readFileSync(path.join(__dirname, 'ssl.pem'))
}

let app = express();
app.get('/test', (req, res) => {
  res.send('hello')
})
https.createServer(httpsOption, app).listen(4000);
console.log('running')
```

我们需要上面四个包：

1. `express`：这个包需要我们`npm install`下载，使用express可以帮助我们快速设置路由，少些很多代码。
2. `https`：这个是node里面自带的包，关于**https**。
3. `fs`：也是node里面自带的包，关于**文件读取**。
4. `path`：也是node里面自带的包，关于**文件路径**。

我们还需使用`node app.js`或者`nohup node app.js &`运行app.js文件。

`nohup node app.js &`是一直在服务器运行这个文件，不过要注意我们退出服务器的时候要敲`exit`退出。

这样我们就创建了一个node后端接口，**我们访问服务区的4000端口下的test路径，**浏览器会给我们返回个**hello**字符串。

![](https://www.gaosong.site/2020/03/19/%E4%BD%BF%E7%94%A8https%E7%9A%84node%E6%8E%A5%E5%8F%A3/20200319pic4.jpg)

**我的项目结构如下所示：**

![](https://www.gaosong.site/2020/03/19/%E4%BD%BF%E7%94%A8https%E7%9A%84node%E6%8E%A5%E5%8F%A3/20200319pic5.jpg)

**我们用的时候注意把ssl.key和ssl.pem文件放到项目中，并且安装npm相关包（`npm install`）。**