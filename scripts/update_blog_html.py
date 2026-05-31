import os

with open("blog.html", "r", encoding="utf-8") as f:
    html = f.read()

# 1. Update links in the first 3 blocks
html = html.replace('<a href="single-blog.html" class="blog-grid-image">\n                <img src="images/ai_blog.png" alt="Artificial Intelligence">\n              </a>', '<a href="blog-ai.html" class="blog-grid-image">\n                <img src="images/ai_blog.png" alt="Artificial Intelligence">\n              </a>')
html = html.replace('<a class="category" href="single-blog.html" rel="category tag">\n                      <span>Technology</span></a><a class="category" href="#" rel="category tag">\n                      <span>AI</span></a>', '<a class="category" href="blog-ai.html" rel="category tag">\n                      <span>Technology</span></a><a class="category" href="#" rel="category tag">\n                      <span>AI</span></a>')
html = html.replace('<a href="single-blog.html" >\n                  <h4 class="entry-title">The Future of Artificial Intelligence: Trends and Innovations</h4>\n                </a>', '<a href="blog-ai.html" >\n                  <h4 class="entry-title">The Future of Artificial Intelligence: Trends and Innovations</h4>\n                </a>')

html = html.replace('<a href="single-blog.html" class="blog-grid-image">\n              <img src="images/ml_blog.png" alt="Machine Learning">\n            </a>', '<a href="blog-ml.html" class="blog-grid-image">\n              <img src="images/ml_blog.png" alt="Machine Learning">\n            </a>')
html = html.replace('<a class="category" href="single-blog.html" rel="category tag">\n                    <span>Technology</span></a><a class="category" href="#" rel="category tag">\n                    <span>Machine Learning</span></a>', '<a class="category" href="blog-ml.html" rel="category tag">\n                    <span>Technology</span></a><a class="category" href="#" rel="category tag">\n                    <span>Machine Learning</span></a>')
html = html.replace('<a href="single-blog.html" >\n                <h4 class="entry-title">How Machine Learning is Reshaping Data Analytics</h4>\n              </a>', '<a href="blog-ml.html" >\n                <h4 class="entry-title">How Machine Learning is Reshaping Data Analytics</h4>\n              </a>')

html = html.replace('<a href="single-blog.html" class="blog-grid-image">\n            <img src="images/dl_blog.png" alt="Deep Learning">\n          </a>', '<a href="blog-dl.html" class="blog-grid-image">\n            <img src="images/dl_blog.png" alt="Deep Learning">\n          </a>')
html = html.replace('<a class="category" href="single-blog.html" rel="category tag">\n                  <span>Technology</span></a><a class="category" href="#" rel="category tag">\n                  <span>Deep Learning</span></a>', '<a class="category" href="blog-dl.html" rel="category tag">\n                  <span>Technology</span></a><a class="category" href="#" rel="category tag">\n                  <span>Deep Learning</span></a>')
html = html.replace('<a href="single-blog.html">\n              <h4 class="entry-title">Demystifying Neural Networks and Deep Learning</h4>\n            </a>', '<a href="blog-dl.html">\n              <h4 class="entry-title">Demystifying Neural Networks and Deep Learning</h4>\n            </a>')

# 2. Replace the last 3 blocks
# We know the block starts at data-delay=".5"
start_idx = html.find('<div class="col-xl-4 grid-item classic-animation" data-delay=".5"')
end_idx = html.find('</div>', html.find('</div>', html.find('</div>', html.find('<div class="col-xl-4 grid-item classic-animation" data-delay=".7"'))) + 6) + 6

# Alternatively, just use regex to replace everything from data-delay=".5" up to the closing tags before </div>\n      </div> <!-- page wrapper end -->
import re
# The section starts with <div class="col-xl-4 grid-item classic-animation" data-delay=".5"
pattern = r'<div class="col-xl-4 grid-item classic-animation" data-delay="\.5".*?<!-- page wrapper end -->'

replacement = """<div class="col-xl-4 grid-item classic-animation" data-delay=".5" data-duration="2">
      <div class="blog-grid ">
       <a href="blog-nlp.html" class="blog-grid-image">
          <img src="images/nlp_blog.png" alt="NLP">
        </a>
        <div class="bottom-content">
          <div class="categories">
              <a class="category" href="blog-nlp.html" rel="category tag">
                <span>Technology</span></a><a class="category" href="#" rel="category tag">
                <span>NLP</span></a>                
          </div>
          <a href="blog-nlp.html" >
            <h4 class="entry-title">Unlocking Human Language: The Rise of NLP</h4>
          </a>
          <div class="metas">
              <a class="author" href="#">admin</a>
              <div class="blog-date" > February 15, 2026</div>
          </div>
        </div>
      </div>
    </div>
            
    <div class="col-xl-4 grid-item classic-animation" data-delay=".6" data-duration="2">
      <div class="blog-grid ">
       <a href="blog-cv.html" class="blog-grid-image">
          <img src="images/cv_blog.png" alt="Computer Vision">
        </a>
        <div class="bottom-content">
          <div class="categories">
              <a class="category" href="blog-cv.html" rel="category tag">
                <span>Technology</span></a><a class="category" href="#" rel="category tag">
                <span>Computer Vision</span></a>                
          </div>
          <a href="blog-cv.html" >
            <h4 class="entry-title">Seeing the Unseen: Advances in Computer Vision</h4>
          </a>
          <div class="metas">
              <a class="author" href="#">admin</a>
              <div class="blog-date"> January 28, 2026</div>
          </div>
        </div>
      </div>
    </div>

    <div class="col-xl-4 grid-item classic-animation" data-delay=".7" data-duration="2">
      <div class="blog-grid ">
       <a href="blog-robotics.html" class="blog-grid-image">
          <img src="images/robotics_blog.png" alt="Robotics">
        </a>
        <div class="bottom-content">
          <div class="categories">
              <a class="category" href="blog-robotics.html" rel="category tag">
                <span>Technology</span></a><a class="category" href="#" rel="category tag">
                <span>Robotics</span></a>                
          </div>
          <a href="blog-robotics.html" >
            <h4 class="entry-title">The Dawn of Advanced Robotics and Cybernetics</h4>
          </a>
          <div class="metas">
              <a class="author" href="#">admin</a>
              <div class="blog-date" > December 05, 2025</div>
          </div>
        </div>
      </div>
    </div>
                
  </div>



      </div> <!-- page wrapper end -->"""

html = re.sub(pattern, replacement, html, flags=re.DOTALL)

with open("blog.html", "w", encoding="utf-8") as f:
    f.write(html)
