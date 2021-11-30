React + TypeScript + React-Router + Chakra UI + Webpack 5

项目目前正在开发，变动可能会很大，暂时只供研究学习参考


[![Intel](https://img.shields.io/badge/Intel-Core_i5_9600K-0071C5?style=flat&logo=intel&logoColor=white)](https://www.intel.com/content/www/us/en/products/sku/134896/intel-core-i59600k-processor-9m-cache-up-to-4-60-ghz/specifications.html)
[![Asrock](https://img.shields.io/badge/Z390M--ITX/ac-000.svg?style=flat&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii00NSAtMTIuOTYgMzkwIDc3Ljc2MyI+PGcgZmlsbD0iIzg1YzIyNiIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMjUyLjA0NyAxMy4wNzVWMjIuM2gtNi4zNDJjLTMuMDcxIDAtNS42MjIuMjIyLTcuNjgxLjY3NS0yLjAzNS40NDgtMy44NzcgMS4xNzYtNS40OTggMi4yMDQtMy4wODEgMS45MjgtNC42NDMgNC4zMDYtNC42NDMgNy4xNDEgMCAyLjY1NyAxLjQ4NSA0Ljk1MyA0LjQ1IDYuODcyIDEuNzQ2IDEuMTIzIDMuNjg1IDEuOTA1IDUuODIgMi4zNjggMi4xMjcuNDU4IDQuODkuNjkgOC4yOS42OWg1LjYwNHY5LjIyOWgtOC40NTRjLTcuNjA0IDAtMTMuODUtLjg3OC0xOC43LTIuNjY3LTYuMTM0LTIuMjYyLTEwLjQzNi01LjUzNi0xMi45NTMtOS43OTktMS4yNzgtMi4xNS0xLjkyOS00LjM1OS0xLjkyOS02LjYwNiAwLTIuOTU2IDEuMDcxLTUuODEgMy4yMDctOC41ODggMS42NDUtMi4xMTcgMy43NjYtMy45ODQgNi40MzMtNS41NyAzLjg4Mi0yLjMxIDguNTE2LTMuODA1IDEzLjg3My00LjUyOCAzLjE1OS0uNDM0IDYuNzI3LS42NDYgMTAuNzEtLjY0NnpNMjY5LjU5NiAwdjIyLjE4MmwuMTI2LjQ0OWM1Ljc1My43MzcgMTEuOTU0LS42OCAxNC44MjgtNS44NiAxLjQ5LTIuMTcgMS44NDItMy42OTggMS44NTctMy42OThoMTIuNzAyYzIuMjM3IDYuNTg3LTMuNDM0IDEyLjM2OS05LjEyIDE0LjY0NSA5LjE0OCA2LjAzMiAxMC4zMyAxMi42MDUgOS45NDkgMjMuNzU5aC0xNS4wOWMuMjMtOC45MzYtMS4xNzctMTkuMzQ3LTE1LjI3My0xOC40OTNsLjAyIDE4LjQ5M2gtMTUuODMxVjBoMTUuODN6TTYzLjQ5NSA1MS44NEg5Mi40N2wyLjMxLS4wNjZjOS42Mi0uMjg1IDE2LjA3Ny03Ljg0NiAxNi4xNTQtMTYuMTA2LjA4My05LjIwMS04LjM2MS0xNC44ODItMTguMDY0LTE0Ljg4Mkg3NS42NzVjLTIuNjI4IDAtNC4zOTMtMi4yMzItNC41NDMtNC40NjUtLjE2NC0yLjU2NSAxLjkxNS01LjI4IDQuOTM4LTUuMjhoMzIuMTZWLjA4SDc1LjUxNGMtMTIuNDk5IDAtMTcuODMyIDYuOTY4LTE4LjA3MyAxNS4zNTktLjIzNiA4LjE4OCA2LjQ1MiAxNi4yMzYgMTYuMDgyIDE2LjIzNmgxNy44MjhsMS45OTYuMTRjMi4zODIuMTU5IDMuOTE2IDIuMDMgNC4wNTUgNC4wNTUuMTc5IDIuNTc1LTIuMzg3IDQuOTQzLTUuNDEgNC45NDNsLTM1LjU1LjE0LjI0Mi00MC45NEwzNC44My4wMDJjLTYuODQ4LS4xMDItMTAuNDE2IDQuMDYtMTIuOTY3IDkuODZMMCA1MS43MDRsMS4yNDQuMDcxIDE2LjE4My0uMTQ0YTM0NjcyLjg0MSAzNDY3Mi44NDEgMCAwIDAgMTcuMTM4LTM1LjU2YzIuMTgtMy43OCAzLjQxLTQuMzQgNy4zNjQtMy45MWwtLjAwOCAzOS42ODJoMjEuNTc0em02MS42MzEtMzEuODY2aDExLjYzNmMyLjc2OCAwIDQuNDIyLS41MjYgNS4yNTEtMS4zOC42OC0uNjg5IDEuMDA4LTEuNjQ0IDEuMDA4LTIuNTY1IDAtMS4yNDktLjQ2OC0yLjE3NC0xLjM4NC0yLjc3Mi0uOTMtLjYwMy0yLjQ5My0xLjA0Mi00LjQ5LTEuMDQybC0xMi4wMi4wMXY3Ljc1ek0xMzcuNTMzIDBjNC4yMTkuMTMgNy41MzItLjI1IDEwLjI2MS41NiA1LjgzNSAxLjYyNSA4Ljk4IDQuMjEgMTAuNTA4IDcuMzczLjg2MyAxLjc0NiAxLjE1MiAzLjU5NyAxLjE1MiA1LjU0IDAgMy41Ni0xLjA1NiA2LjYwMi0zLjQzMyA4Ljg3OC0xLjA5NSAxLjA0Mi0yLjE4NSAxLjg1Mi0zLjQ5MSAyLjQxNmEyOC44MjIgMjguODIyIDAgMCAxLTUuNjkgMS43MTJjOS41MDQgNS4zIDExLjk5NyAxMS4xNzggMTEuOTk3IDI0Ljg3M2gtMTYuNDkyYy0uMDI3LTEzLjkwNy01LjU0NS0xOS4zNTYtMTcuMjItMTkuMjIxdjE5LjM0NmgtMTIuMzZWMHptNDYuMzEzIDI0LjE3N2M0LjgwMyAwIDguNzIzIDMuNjM1IDguNzIzIDguMSAwIDQuNDYxLTMuOTIgOC4wOTctOC43MjMgOC4wOTctNC43OTMgMC04LjcxOS0zLjYzNi04LjcxOS04LjA5NiAwLTQuNDY2IDMuOTI2LTguMTAxIDguNzE5LTguMTAxIi8+PHBhdGggZD0iTTE4My44NDYgMjEuNDZjNi40MTMgMCAxMS42NDUgNC44NiAxMS42NDUgMTAuODIgMCA1Ljk1MS01LjIzMiAxMC44MTctMTEuNjQ1IDEwLjgxNy02LjQwOSAwLTExLjYzNi00Ljg2Ni0xMS42MzYtMTAuODE2IDAtNS45NiA1LjIyNy0xMC44MjEgMTEuNjM2LTEwLjgyMW0wLTguMzg2YzEzLjk1NSAwIDI1LjM0IDguNjI3IDI1LjM0IDE5LjIwNyAwIDEwLjU3LTExLjM4NSAxOS4xOTctMjUuMzQgMTkuMTk3UzE1OC41MSA0Mi44NSAxNTguNTEgMzIuMjhjMC0xMC41OCAxMS4zOC0xOS4yMDcgMjUuMzM2LTE5LjIwN00yOTMgMS41OThhNC4xNjcgNC4xNjcgMCAwIDEgNC4xNjEgNC4xNTdBNC4xNjQgNC4xNjQgMCAwIDEgMjkzIDkuOTEyYTQuMTYyIDQuMTYyIDAgMCAxLTQuMTUyLTQuMTU3QTQuMTY1IDQuMTY1IDAgMCAxIDI5MyAxLjU5OG0wIC44MDFhMy4zNjcgMy4zNjcgMCAwIDEgMy4zNjYgMy4zNTZBMy4zNjUgMy4zNjUgMCAwIDEgMjkzIDkuMTE2YTMuMzY3IDMuMzY3IDAgMCAxLTMuMzYxLTMuMzYgMy4zNyAzLjM3IDAgMCAxIDMuMzYtMy4zNTciLz48cGF0aCBkPSJNMjkyLjE2OCA1LjQzMmguNjM3Yy40MSAwIC42Ny0uMDE1Ljc3Mi0uMDUzYS40NjQuNDY0IDAgMCAwIC4yNC0uMTg0LjU3Mi41NzIgMCAwIDAgLjA4My0uMzEzLjUwNy41MDcgMCAwIDAtLjExNi0uMzUyLjU0OC41NDggMCAwIDAtLjMyMy0uMTY5Yy0uMDcyIDAtLjI3NS0uMDEtLjYyMi0uMDFoLS42N3YxLjA4em0tLjg1OCAyLjQ1VjMuNjMyaDEuODA5Yy40NDggMCAuNzc2LjAzOS45ODguMTExLjIwMy4wODIuMzY2LjIxNy40OTIuNDEuMTI1LjE5OC4xODMuNDI0LjE4My42NzUgMCAuMzEzLS4wOTIuNTc0LS4yOC43ODYtLjE4My4yMTItLjQ2My4zMzgtLjgzOS4zOS4xODQuMTEyLjMzOC4yMzIuNDU4LjM1OC4xMi4xMzUuMjg1LjM2MS40ODcuNjk0bC41MjEuODI0aC0xLjAyN2wtLjYxNy0uOTI1YTYuMzAzIDYuMzAzIDAgMCAwLS40NTMtLjYyMi42MzcuNjM3IDAgMCAwLS4yNTYtLjE3NCAxLjU4IDEuNTggMCAwIDAtLjQzOS0uMDUzaC0uMTY4djEuNzc1aC0uODU5eiIvPjwvZz48L3N2Zz4=&labelColor=333&label=Asrock&color=green)](https://www.asrock.com/mb/Intel/Z390M-ITXac/index.asp)
[![AMD](https://img.shields.io/badge/AMD-Radeon_RX_5500XT-ED1C24?style=flat&logo=amd&logoColor=white)](https://www.amd.com/en/products/graphics/amd-radeon-rx-5500-xt)
[![Dell](https://img.shields.io/badge/Dell-P2415Q-007DB8?style=flat&logo=dell&logoColor=white)](https://www.dell.com)



[![macOS](https://img.shields.io/badge/macOS-000000?style=flat&logo=apple&logoColor=white&color=2e118a)](https://www.apple.com/macos)
[![WebStorm](https://img.shields.io/badge/webstorm-143?style=flat&logo=webstorm)](https://jb.gg/OpenSourceSupport)
[![Git](https://img.shields.io/badge/Git-F05032?style=flat&logo=git&logoColor=white)](https://git-scm.com/)
[![Sourcetree](https://img.shields.io/badge/Sourcetree-0052CC?style=flat&logo=Sourcetree&logoColor=white)](https://sourcetreeapp.com)
[![Sourcetree](https://img.shields.io/badge/npm-CB3837?style=flat&logo=npm&logoColor=white)](https://www.npmjs.com)


[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![React](https://img.shields.io/badge/Webpack-8DD6F9?style=flat&logo=Webpack&logoColor=white)](https://webpack.js.org/)
[![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)](https://reactjs.org)
[![React](https://img.shields.io/badge/Chakra--UI-319795?style=flat&logo=chakra-ui&logoColor=white)](https://chakra-ui.com)


[![GitHub](https://img.shields.io/badge/GitHub-100000?style=flat&logo=github&logoColor=white)](https://github.com)
[![GitHub license](https://img.shields.io/github/license/huijiewei/agile-react)](https://github.com/huijiewei/agile-react)
[![GitHub issues](https://img.shields.io/github/issues/huijiewei/agile-react)](https://GitHub.com/huijiewei/agile-react/issues)


## 特点

1. 基于 Webpack 5

2. 保证最佳实践

3. 尽力最新技术

4. 使用配置文件分割项目入口

## 在线演示
https://agile.huijiewei.com/admin-react
账号：13098761234
密码：123456

## 教程

### 安装

```bash
npm install
```

### 配置

#### 配置文件

可以根据 package.json 文件 scripts 内命令行 APP_CONFIG 参数使用不同配置文件

### 运行本地开发

修改 config 目录内 *.config.js 文件内相关参数

```bash
npm run admin-dev
```

### 构建生产版本

```bash
npm run admin-build
```

### 生产版本本地试运行

```bash
npm run admin-serve
```

## 关键目录说明

```
├── config // 配置文件
├── dist   // 生成的生产环境文件
├── public // 资源目录
├── src    // 源代码目录
│   ├── shared // 共享模块
│   └── app    // 应用目录
│      └── admin   // 管理后台
│      └── mobile  // 移动端
```

## 后端配合

Agile Spring Boot

https://github.com/huijiewei/agile-boot

## 说明文件版本更新

Version: 2021-05-05 11:35
