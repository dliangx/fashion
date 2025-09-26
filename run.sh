#!/bin/bash

# 用法: ./run.sh build|run

set -e

if [ "$1" = "build" ]; then
    echo "==== 构建前端 ===="
    cd frontend
    npm install
    npm run build
    cd ..
    echo "==== 构建后端 ===="
    cd backend
    cargo build --release
    cd ..
    echo "==== 构建完成 ===="
elif [ "$1" = "run" ]; then
    echo "==== 启动后端 ===="
    cd backend
    cargo run &
    BACKEND_PID=$!
    cd ..
    echo "==== 启动前端 ===="
    cd frontend
    npm run dev &
    FRONTEND_PID=$!
    cd ..
    echo "前端和后端已启动。"
    echo "后端PID: $BACKEND_PID, 前端PID: $FRONTEND_PID"
    wait $BACKEND_PID $FRONTEND_PID
else
    echo "用法: $0 build|run"
    exit 1
fi
