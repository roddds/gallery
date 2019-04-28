#! /usr/bin/env python
import sys
import os
import re
import glob

pattern = r"static/.*?/.*?/.*?.jpg"


def fsize(size):
    for unit in ["", "KB", "MB", "GB", "TB"]:
        if size < 1024.0:
            break
        size /= 1024.0
    return f"{size:.2f}{unit}"


if __name__ == "__main__":
    images = glob.glob("public/static/**/**.jpg", recursive=True)
    json_files = glob.glob("public/static/d/**/**.json", recursive=True)

    json_content = ""

    for file in json_files:
        with open(file) as f:
            json_content += f.read()

    images_in_use = list("public/" + x for x in set(re.findall(pattern, json_content)))

    staged_images = []
    saved_size = 0

    for image in images:
        if image not in images_in_use:
            saved_size += os.path.getsize(image)
            staged_images.append(image)
    print(
        (
            "This will remove {unused_images} unused "
            "images out of {images_in_use}, saving {saved_size}."
        ).format(
            unused_images=len(staged_images),
            saved_size=fsize(saved_size),
            images_in_use=len(images),
        )
    )

    go_ahead = input("Continue? [y/n] ")

    if go_ahead.lower() != "y":
      sys.exit()

    for image in staged_images:
        os.remove(image)

    staged_directories = []

    for dirpath, dirnames, files in os.walk("./public"):
        if not (files or dirnames):
            staged_directories.append(dirpath)

    for directory in staged_directories:
        os.rmdir(directory)

    print(
        "Also removed {empty_directories} empty directories.".format(
            empty_directories=len(staged_directories)
        )
    )
