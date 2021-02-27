---
title: class01 前端三剑客之HTML
date: 2017-12-28
categories:
 - 前端课程
tags:
 - HTML
---
# class01 前端三剑客之HTML
## 课堂目标
* 使同学们掌握html基本页面开发

* 掌握样式，脚本的书写，引入方式的区别
* 掌握各种标签的使用
* 掌握元素类型的区别与转换

## 资源
开发工具：vscode
推荐安装的相关插件：https://www.yuque.com/docs/share/5a6600e5-22ce-4b9b-82b2-f44b889326b0?# 《VSCode插件》
前端课程知识点：https://www.processon.com/view/link/5f6874047d9c087da1ba166e

看完记得点个稻谷和点赞哦!!!
## 知识要点
### 页面结构
```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Document</title>
    </head>
    <body>
    </body>
</html>
```

#### 样式的引入及加载优先级
样式有三种方式引入：
* 外链的方式：`<link rel="stylesheet" href="">`
* 头部style标签内定义
* 行内style属性定义

优先级：行内style > 头部style标签 > 外链

#### 脚本引入的方式区别
script标签可以头部引入也可以在body后引入，但是有一些区别：
* 因为页面是从上而下执行的，所以如果有些和页面有关的脚本会阻塞页面渲染，甚至报错
* 一般外部引用的插件会放在头部引用，和页面有关的都会放在页面底部去加载

### 重要标签的作用
1. `<!DOCTYPE html>`的作用
    1. DOCTYPE是document type(文档类型)的简写，告诉浏览器以什么样的文档类型来解析解析文档
    2. DOCTYPE的声明必须是 HTML 文档的第一行

2. `lang="en"`申明页面语言
3. meta标签的作用：可参考：https://blog.csdn.net/yc123h/article/details/51356143
4. a标签的各种使用方式
    ```html
    <a href="">刷新页面</a><!-- 刷新页面 -->
    <a href="#">#top 跳转</a><!-- 默认 #top -->
    <a href="#anchor">锚点跳转</a><!-- 跳转指定id的锚点 -->
    <a href="javascript:void(0)">无反应</a><!-- 没有任何反应 -->
    <a href="javascript:void(console.log('123'))">void：表达式计算</a>
    <a href="javascript:void(openPage())">void：方法调用</a>
    <a onclick="openPage()">链接</a>
    <a href="https://www.baidu.com" target="_blank">跳转新页面</a>
    <a href="https://www.baidu.com" target="_self">本页面跳转</a>
    ```
5. 表单内各种标签的使用
    ```html
    <form>
        <label for="radio1">单选框1</label>
        <input name="radio" type="radio" id="radio1" value="" />
        <label for="radio2">单选框2</label>
        <input name="radio" type="radio" id="radio2" value="" />
        <br />
        <label for="checkbox1">复选框1</label>
        <input name="checkbox" type="checkbox" id="checkbox1" value="">
        <label for="checkbox2">复选框2</label>
        <input name="checkbox" type="checkbox" id="checkbox2" value="">
        <br />
        <select name="select" multiple>
            <option>---请选择---</option>
            <option value="1">选项1</option>
            <option value="2" disabled>选项2</option>
            <option value="3" selected>选项3</option>
        </select>
        <br />
        <label for="text">输入框</label>
        <input name="text" type="text" id="text" value="" />
        <input type="file" accept=".jpg" multiple>
        <br />
        <button onclick="submitForm()">提交</button>
    </form>
    ```

1. 自闭和标签
    `<br />`,`<hr/ >`,`<img />`,`<input />`,`<meta />`
2. 注释标签
    `<!-- 注释标签 -->`
3. p标签的注意点
    p标签内无法包裹块级元素
4. 一些有趣的h5新增标签
    ```html
    <mark>用来展示高亮的文字</mark>
    <!-- 下载进度 -->
    <progress value="82" max="100"></progress>
    <!-- 显示度量值 -->
    <meter value="3" min="0" max="10">3/10</meter>
    <!-- 描述文档或文档某个部分的细节 -->
    <details>
        <summary style="outline: none">summary标签</summary>
        包含details元素的标题
    </details>
    <!-- 选项列表。请与 input 元素配合使用该元素，来定义 input 可能的值 -->
    <input list="cars" />
    <datalist id="cars">
        <option value="BMW">
        <option value="Ford">
        <option value="Volvo">
    </datalist>
    ```

### 标签类型及特点
#### 块级元素
特点：自动换行， 可设置高宽
常见元素：div，p，h1-h6，ul，ol，li，form，table
#### 行内元素
特点：无法自动换行，无法设置宽高
常见元素：a，span，i（斜体），em（强调），sub(下标)，sup(下标)，label
#### 行内块元素
特点：拥有内在尺寸，可设置高宽，不会自动换行
常见元素：button, input，textarea, select, img
#### 元素之间转换
可通过display设置：
* 将元素变为块级元素：display: block;
* 将元素变为行级元素：display: inline;
* 将元素变为行级块元素：display: inline-block;

## 作业
1. 了解各种标签的使用，不要求熟记，但必须有个印象
2. 视频课程学习：（9月23日-9月25日完成）
    * 前端第一阶段 Web前端技术基础 1.0（html+css web前端开发实战详解）1-9节
    * 前端第二阶段 数据交互及页面交互 1.0（html5与css3快速入门与应用）1-8节