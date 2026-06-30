# 饮食星球在线发布说明

这个项目的主游戏是静态网页，可以直接部署到静态网站服务。

## 已整理的发布目录

发布目录：

```text
publish/web/
```

里面只保留在线体验需要的文件：

- `index.html`
- `style.css`
- `game.js`
- `riskConfig.js`
- `data/`
- `assets/`
- `planet-atlas/`

不需要上传：

- `.git/`
- `.agents/`
- `docs/`
- `outputs/`
- `planet-editor/`

## 推荐发布方式

### 方式 1：Netlify

1. 打开 Netlify。
2. 选择手动上传或导入 GitHub 仓库。
3. 如果手动上传，把 `publish/web/` 整个文件夹里的内容上传。
4. 不需要 build command。
5. Publish directory 设为项目根目录，或直接上传 `publish/web/` 内容。

### 方式 2：Vercel

1. 导入 GitHub 仓库。
2. Framework 选择 `Other`。
3. Build Command 留空。
4. Output Directory 如果部署整个仓库，填 `publish/web`。
5. 如果只上传 `publish/web/`，Output Directory 留空。

### 方式 3：GitHub Pages

1. 把 `publish/web/` 内容放到一个 GitHub 仓库。
2. 在仓库 Settings -> Pages 中启用。
3. Source 选择主分支。
4. 打开 Pages 给出的链接。

## 注意事项

- 不能让用户直接打开本地 `index.html`，必须通过 `http` 或 `https` 访问。
- `planet-atlas` 使用线上 CDN 加载 Three.js、D3、GSAP，所以用户需要能访问这些 CDN。
- 主游戏和 `planet-atlas/index.html` 要保持同一个域名下，否则 iframe 消息通信可能受影响。
