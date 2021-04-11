![GitHub](https://img.shields.io/github/license/huijiewei/agile-react)
![GitHub package.json version](https://img.shields.io/github/package-json/v/huijiewei/agile-react)
![GitHub package.json dynamic](https://img.shields.io/github/package-json/keywords/huijiewei/agile-react)


![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/huijiewei/agile-react)
![GitHub top language](https://img.shields.io/github/languages/top/huijiewei/agile-react)

![GitHub commit activity](https://img.shields.io/github/commit-activity/w/huijiewei/agile-react)
![GitHub last commit](https://img.shields.io/github/last-commit/huijiewei/agile-react)

![GitHub package.json dependency version (prod)](https://img.shields.io/github/package-json/dependency-version/huijiewei/agile-react/react)
![GitHub package.json dependency version (prod)](https://img.shields.io/github/package-json/dependency-version/huijiewei/agile-react/@chakra-ui/react)
![GitHub package.json dependency version (prod)](https://img.shields.io/github/package-json/dependency-version/huijiewei/agile-react/react-hook-form)

![Website](https://img.shields.io/website?url=https%3A%2F%2Fagile.huijiewei.com%2Fadmin)
![Security Headers](https://img.shields.io/security-headers?url=https%3A%2F%2Fagile.huijiewei.com%2Fadmin)

React + TypeScript + Chakra UI + Webpack 5 演示项目

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

#### app.\*.config.js 配置说明

可以根据 package.json 文件 scripts 内命令行 APP_CONFIG 参数使用不同配置文件

#### 运行本地开发

修改 app.\*.config.js 里面的相关参数

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
