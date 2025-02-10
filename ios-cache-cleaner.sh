#!/bin/bash

# 清理 Xcode DerivedData 文件夹
echo "Cleaning Xcode DerivedData..."
rm -rf ~/Library/Developer/Xcode/DerivedData/*

# 清理 iOS build 文件夹
# 这个貌似不能删，run-ios貌似不能自己生成build文件夹
echo "Cleaning iOS build folder..."
# cd ios && rm -rf build && cd ..

# 清理 Watchman 缓存（可选，如果你遇到缓存问题）
echo "Cleaning Watchman cache..."
# watchman watch-del-all