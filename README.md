# BaijiaJiangtan

## react-native

版本，`0.72.17`，release -> 2024/08/19

## 分页

采用`ChatGPT`的建议，避免混淆，

```java
private List<T> records; // 当前页的数据
private int currentPage; // 当前页数
private int totalPages;  // 总页数
private int totalItems;  // 总数据条数
private boolean hasNextPage; // 是否有下一页
```

## 打包

### Android

```bash
ENVFILE=.env.dev ./gradlew assembleDebug
ENVFILE=.env.alpha ./gradlew assembleRelease
ENVFILE=.env.bate ./gradlew assembleRelease
ENVFILE=.env.rc ./gradlew assembleRelease
ENVFILE=.env.stable ./gradlew assembleRelease
```

### 版本

```js
Dev -> 开发版本
Alpha -> Bate启用前，验证SQL脚本，模拟线上功能是否正常
Bate -> 目前个人在使用的版本
RC -> 用户达到一千人时候，启用的版本
Stable -> 用户达到一万人的时候，启用的版本
```

### 清除缓存

```sh
cd android && ./gradlew clean && ./gradlew --stop && rm -r ~/.gradle/caches
```
