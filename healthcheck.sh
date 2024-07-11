#!/bin/sh
if curl -f http://127.0.0.1:4000; then
  exit 0
else
  echo "Health check failed"
  exit 1
fi
