import os

files = [
    "blog-ai.html",
    "blog-cv.html",
    "blog-dl.html",
    "blog-ml.html",
    "blog-nlp.html",
    "blog-robotics.html",
    "blog.html",
    "index.html",
    "resume.html",
    "onepage.html",
    "projects.html",
    "contact.html"
]

for file_name in files:
    if os.path.exists(file_name):
        with open(file_name, "r", encoding="utf-8") as f:
            content = f.read()
        
        new_content = content.replace("<p>Copyright 2022 - All right reserved</p>", "<p>Copyright 2026 - All right reserved</p>")
        
        if new_content != content:
            with open(file_name, "w", encoding="utf-8") as f:
                f.write(new_content)
            print(f"Updated {file_name}")
        else:
            print(f"No change needed for {file_name}")
    else:
        print(f"File {file_name} not found")
