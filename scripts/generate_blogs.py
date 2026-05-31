import os
import re

# Read the template
with open("single-blog.html", "r", encoding="utf-8") as f:
    template = f.read()

# Details for the 6 blogs
blogs = [
    {
        "id": "ai",
        "title": "The Future of Artificial Intelligence: Trends and Innovations",
        "date": "May 8, 2026",
        "category": "AI",
        "image": "images/ai_blog.png",
        "content": "<p>Artificial Intelligence (AI) is no longer a futuristic concept; it is a reality that is rapidly reshaping industries. From generative models capable of creating art and code to intelligent systems optimizing supply chains, the applications are boundless. In this deep dive, we explore the core components of modern AI architectures, discuss the ethical implications of autonomous decision-making, and look ahead at what artificial general intelligence (AGI) might mean for humanity.</p><br><p>One of the most profound shifts has been the transition from rule-based systems to learning systems. Deep neural networks, inspired by the human brain, have demonstrated unprecedented performance in tasks ranging from natural language understanding to game playing. However, with this power comes the need for responsible AI development, ensuring fairness, transparency, and accountability in algorithmic models.</p><blockquote><p>\"The real question is not whether machines think but whether men do. The mystery which surrounds a thinking machine already surrounds a thinking man.\" - B.F. Skinner</p></blockquote><p>As we move forward, the synergy between human creativity and machine efficiency will define the next industrial revolution. Embracing AI responsibly requires continuous education, robust regulatory frameworks, and a commitment to utilizing technology for the greater good.</p>"
    },
    {
        "id": "ml",
        "title": "How Machine Learning is Reshaping Data Analytics",
        "date": "April 22, 2026",
        "category": "Machine Learning",
        "image": "images/ml_blog.png",
        "content": "<p>Machine Learning (ML) has become the cornerstone of modern data analytics. By empowering systems to learn from data without being explicitly programmed, ML unlocks patterns and insights that would be impossible for human analysts to detect manually. In sectors like healthcare, finance, and marketing, predictive modeling is transforming raw data into actionable strategies.</p><br><p>Techniques such as supervised learning, unsupervised learning, and reinforcement learning offer versatile tools for different analytical challenges. For example, clustering algorithms can segment customers based on purchasing behavior, while regression models can forecast future market trends with remarkable accuracy. The true magic of ML lies in its ability to improve over time as more data becomes available.</p><blockquote><p>\"Data is the new oil. It’s valuable, but if unrefined it cannot really be used. It has to be changed into gas, plastic, chemicals, etc. to create a valuable entity that drives profitable activity.\" - Clive Humby</p></blockquote><p>The future of analytics is inherently tied to the evolution of ML algorithms. As computing power grows and data generation accelerates, we will witness even more sophisticated models capable of real-time analysis, driving smarter and faster business decisions across the globe.</p>"
    },
    {
        "id": "dl",
        "title": "Demystifying Neural Networks and Deep Learning",
        "date": "March 10, 2026",
        "category": "Deep Learning",
        "image": "images/dl_blog.png",
        "content": "<p>Deep Learning, a specialized subset of Machine Learning, utilizes multi-layered neural networks to model complex abstractions in data. These deep networks are the driving force behind recent breakthroughs in image recognition, natural language processing, and autonomous vehicles. But what exactly goes on inside these hidden layers?</p><br><p>At its core, a neural network consists of interconnected nodes (neurons) organized into layers. Each connection has a weight that is adjusted during the training process using backpropagation. As data flows from the input layer through the hidden layers to the output layer, the network learns to extract increasingly abstract features. For instance, in facial recognition, early layers might detect edges, while deeper layers recognize complex shapes like eyes or noses.</p><blockquote><p>\"I think people need to understand that deep learning is making a lot of things, behind-the-scenes, much better. Deep learning is already working in Google search and in image search; it allows you to image search a term like ‘hug’.\" - Geoffrey Hinton</p></blockquote><p>Despite its successes, Deep Learning is notoriously data-hungry and computationally expensive. The \"black box\" nature of these models also poses challenges for interpretability. Nevertheless, ongoing research into explainable AI (XAI) and more efficient training techniques promises to make Deep Learning more accessible and transparent in the years to come.</p>"
    },
    {
        "id": "nlp",
        "title": "Unlocking Human Language: The Rise of NLP",
        "date": "February 15, 2026",
        "category": "NLP",
        "image": "images/nlp_blog.png",
        "content": "<p>Natural Language Processing (NLP) bridges the gap between human communication and computer understanding. From virtual assistants like Siri and Alexa to sophisticated translation services, NLP is omnipresent. The recent surge in large language models (LLMs) has catapulted NLP into the spotlight, showcasing the profound capabilities of machines to generate coherent and contextually relevant text.</p><br><p>The evolution of NLP has been marked by the shift from statistical methods to transformer-based architectures. Transformers allow models to process entire sequences of words simultaneously, capturing long-range dependencies and subtle nuances in meaning. This has led to dramatic improvements in tasks such as sentiment analysis, summarization, and question answering.</p><blockquote><p>\"Language is the most massive and inclusive art we know, a mountainous and anonymous work of unconscious generations.\" - Edward Sapir</p></blockquote><p>As NLP technology continues to mature, its impact will be felt across diverse domains, including customer service, content creation, and accessibility. The challenge now lies in mitigating biases inherent in training data and ensuring that these models understand the diverse tapestry of global languages and dialects.</p>"
    },
    {
        "id": "cv",
        "title": "Seeing the Unseen: Advances in Computer Vision",
        "date": "January 28, 2026",
        "category": "Computer Vision",
        "image": "images/cv_blog.png",
        "content": "<p>Computer Vision enables machines to interpret and understand the visual world. By analyzing digital images and videos, systems can accurately identify objects, classify scenes, and even infer the emotions of individuals. This technology is foundational to innovations ranging from augmented reality (AR) to medical image analysis.</p><br><p>Convolutional Neural Networks (CNNs) have long been the workhorses of Computer Vision, excelling at capturing spatial hierarchies in images. More recently, Vision Transformers (ViTs) have emerged as powerful alternatives, applying the principles of NLP to visual tasks. These advancements have drastically reduced error rates in complex scenarios like tumor detection in radiology and pedestrian tracking for self-driving cars.</p><blockquote><p>\"Vision is the art of seeing what is invisible to others.\" - Jonathan Swift</p></blockquote><p>The integration of Computer Vision into everyday devices is accelerating. As edge computing becomes more prevalent, we can expect real-time visual processing to occur directly on smartphones and IoT devices, ushering in a new era of interactive and context-aware applications that seamlessly blend the digital and physical worlds.</p>"
    },
    {
        "id": "robotics",
        "title": "The Dawn of Advanced Robotics and Cybernetics",
        "date": "December 05, 2025",
        "category": "Robotics",
        "image": "images/robotics_blog.png",
        "content": "<p>Robotics is undergoing a paradigm shift, transitioning from rigid industrial machines to adaptable, intelligent systems capable of operating alongside humans. The integration of advanced AI, lightweight materials, and high-fidelity sensors has given rise to robots that can navigate complex environments, perform delicate surgical procedures, and assist in disaster recovery.</p><br><p>A key area of development is Reinforcement Learning (RL), which allows robots to learn optimal behaviors through trial and error. This enables them to adapt to unforeseen circumstances and refine their motor skills dynamically. Furthermore, the field of cybernetics is pushing the boundaries of human-machine interaction, with brain-computer interfaces (BCIs) offering the potential to control robotic prosthetics with thought alone.</p><blockquote><p>\"We are survival machines—robot vehicles blindly programmed to preserve the selfish molecules known as genes.\" - Richard Dawkins</p></blockquote><p>As robots become more autonomous and capable, society must grapple with the economic and ethical implications of automation. Establishing safety standards and ensuring that the benefits of robotics are distributed equitably will be paramount as we forge a future where humans and machines collaborate more closely than ever before.</p>"
    }
]

for blog in blogs:
    new_page = template
    new_page = re.sub(r'<div class="blog-date">\s*December 31, 2021\s*</div>', f'<div class="blog-date"> {blog["date"]}</div>', new_page)
    new_page = re.sub(r'<span data-hover="Uncategorized">Uncategorized</span>', f'<span data-hover="{blog["category"]}">{blog["category"]}</span>', new_page)
    new_page = re.sub(r'<h1 class="big-title">Hello world!</h1>', f'<h1 class="big-title">{blog["title"]}</h1>', new_page)
    new_page = re.sub(r'<img src="images/blog-1.jpg" alt="">', f'<img src="{blog["image"]}" alt="{blog["category"]}">', new_page)
    
    content_start = new_page.find('<div class="blog-entry scale-animation" data-delay="1" data-duration="2">') + len('<div class="blog-entry scale-animation" data-delay="1" data-duration="2">')
    content_end = new_page.find('</div>\n        </div>\n\n        <!-- tags -->', content_start)
    if content_start != -1 and content_end != -1:
        new_page = new_page[:content_start] + '\n            ' + blog["content"] + '\n          ' + new_page[content_end:]
    
    with open(f"blog-{blog['id']}.html", "w", encoding="utf-8") as f:
        f.write(new_page)
