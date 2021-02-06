React + Webpack 5 + ? 演示项目

项目目前正在开发，变动可能会很大，暂时只供研究学习参考

### 特点

1. 基于 Webpack 5

2. 全部使用的是最新的最佳实践

3. 使用配置文件分割项目入口

### 教程

#### 安装

```bash
npm install
```

#### 配置

##### 修改 Hosts
```text
127.0.0.1 www.agile.test
```

#### app.*.config.js 配置说明
可以根据 package.json 文件 scripts 内命令行 APP_CONFIG 参数使用不同配置文件


#### 运行本地开发
修改 app.*.config.js 里面的相关参数

```bash
npm run admin-dev
```

#### 构建生产版本

```bash
npm run admin-build
```

#### 生产版本本地试运行
修改 package.json 里面 admin-serve 相关 host
```bash
npm run admin-serve
```

### 关键目录说明
```
├── dist // 生成的生产环境文件
├── public // 资源目录
├── src // 源代码目录
│   ├── shared // 共享模块
│   └── app // 应用目录
│      └── admin // 管理后台
│      └── mobile // 移动端
```

### 后端配合
Agile Spring Boot

https://github.com/huijiewei/agile-boot

### 说明文件版本更新

Version: 2020-11-27 22:30
