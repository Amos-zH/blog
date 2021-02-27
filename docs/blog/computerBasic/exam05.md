# exam05 第五次考试（附答案）
1. **打开一个新页面的几种方式（写5种）。**（10分）
    * a 标签跳转
    
    * window.open()
    * window.location.href
    * window.location.assign(url)
    * window.location.replace(url)
    
1. **实现一个函数，在5秒后，在当前页面打开百度，页面宽高都设置为500px。**（8分）
    ```JavaScript
    function openUrl (url) {
        setTimeout(function () {
            window.open(url, '_self', 'width=500,height=500')
        },5000)
    }
    openUrl('https://www.baidu.com')
    ```

1. **pushState和replaceState的作用分别是什么？如何监听？**（6分）
    * history.pushState(state, title[, url])：向当前浏览器会话的历史堆栈中添加一个状态（state）记录
    
    * history.replaceState()：把当前页面在浏览器历史中的记录修改
    
    用popstate监听：
    ```JavaScript
    window.addEventListener('popstate',function() {
        var state = history.state; // 取出state值
    });
    ```

1. **如何获取浏览器的运行环境？**（3分）
    window.navigator.userAgent

1. **如何获取URL中的查询字符串部分？**（3分）
    window.location.search

1. **如何知道浏览器是否支持(启用)cookie？**（3分）
    navigator.cookieEnabled

1. **浏览器如何返回上一页？**（3分）
    * window.history.back()
    * window.history.go(-1)

1. **浏览器有哪些本地存储的方式（3个）？并分别从生命周期、大小、与服务端通信的区别、作用域、应用场景这些方面说说他们的区别。**（14分）
2. **如何实现深拷贝？**（3分）
    ```JavaScript
    JSON.parse(JSON.stringify(obj))
    ```

1. **立即执行的函数表达式是怎么样的？**（5分）
    ```JavaScript
    (function() {
        statements
    })();
    ```

1. **encodeURI 与 encodeURIComponent 的区别是什么？**（6分）
    * encodeURI 编码后还是url，适用于携带参数域名跳转，前后端访问
    
    * encodeURIComponent 编码后不再是url，适用于作为参数传递

1. **实现一个ajax请求，从请求发起到获取响应？**（12分）
    ```JavaScript
    // 创建XMLHttpRequest对象
    let httpRequest = new XMLHttpRequest();
    // 规定请求的类型（get，post）、URL 以及是否异步处理请求 true（异步）或 false（同步）。
    httpRequest.open(method,url,async);
    // 将请求发送到服务器。
    httpRequest.send();
    // 响应处理
    // 每当 readyState 改变时，就会触发 onreadystatechange 事件
    // readyState：0: 请求未初始化；1: 服务器连接已建立；2: 请求已接收；3: 请求处理中；4: 请求已完成，且响应已就绪
    // status：200: "OK"；404: 未找到页面
    httpRequest.onreadystatechange = function() {
        if (httpRequest.readyState==4 && httpRequest.status==200){
            console.log(httpRequest.responseText);
        }
    }
    ```

1. **get 和 post 的区别是什么？**（14分）
    * GET请求在URL中传送的参数是有长度限制的，而POST没有
    * GET比POST更不安全，因为参数直接暴露在URL上，所以不能用来传递敏感信息。而POST数据不会显示在URL中。是放在Request body中
    * 对参数的数据类型，GET只接受ASCII字符，而POST没有限制
    * GET请求参数会被完整保留在浏览器历史记录里；相反，POST请求参数也不会被浏览器保留
    * GET请求只能进行url编码（application/x-www-form-urlencoded），而POST支持多种编码方式
    * GET请求会被浏览器主动缓存，而POST不会，除非手动设置
    * GET在浏览器回退时是无害的，而POST会再次提交请求

1. **http状态码1xx、2xx、3xx、4xx、5xx分别表示什么？**（10分）
    * 1xx(临时响应)：表示临时响应并需要请求者继续执行操作的状态码
    * 2xx (成功)：表示成功处理了请求的状态码
    * 3xx (重定向)：要完成请求，需要进一步操作。通常，这些状态码用来重定向
    * 4xx(请求错误)：这些状态码表示请求可能出错，妨碍了服务器的处理
    * 5xx(服务器错误)：这些状态码表示服务器在处理请求时发生内部错误。这些错误可能是服务器本身的错误，而不是请求出错