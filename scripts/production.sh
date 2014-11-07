#!/usr/bin/env bash
echo
echo "Building for production..."
echo
NODE_ENV=production
webpack --config config/webpack -vcp --optimize-minimize --optimize-occurence-order --optimize-dedupe
