#!/bin/bash

echo "Starting cleanup..."

# List of files/folders to keep
KEEP_LIST=(".git" ".env" "composer.json" "composer.lock" "package.json" "deploy.sh" "cleaner.sh")

# Loop through all items in the current directory
for item in * .*; do
    # Ignore . and ..
    if [ "$item" == "." ] || [ "$item" == ".." ]; then
        continue
    fi

    # Check if current item is in the keep list
    keep="no"
    for keep_item in "${KEEP_LIST[@]}"; do
        if [ "$item" == "$keep_item" ]; then
            keep="yes"
            break
        fi
    done

    # If not in keep list, remove it
    if [ "$keep" == "no" ]; then
        echo "Removing $item ..."
        rm -rf "$item"
    fi
done

echo "Cleanup complete! ✅ Only core files are kept."
