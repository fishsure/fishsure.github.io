// Global variables
let allPublications = [];
let allProjects = [];
let showingSelectedPublications = true;
let showingSelectedProjects = true;
let currentLanguage = localStorage.getItem('language') || 'en';

// Author name mapping (English to Chinese)
const authorNames = {
  'Shuo Yu': '于硕',
  'Qi Liu': '刘淇',
  'Mingyue Cheng': '程明月',
  'Daoyu Wang': '王道宇',
  'Tingyue Pan': '潘廷岳',
  'Jie Ouyang': '欧阳杰',
  'Qingchuan Li': '李晴川',
  'Qingyang Mao': '毛清扬',
  'Zirui Liu': '刘子瑞',
  'Mingfan Pan': '潘铭凡',
  'Xiaoyu Tao': '陶小玉',
  'Yuqian Wang': '王雨乾',
  'Yu Duan': '段誉',
  'Mingkang Long': '龙明康',
  'Enhong Chen': '陈恩红',
  'Jiqian Yang': '杨纪千',
  'Yucong Luo': '罗彧淙',
  'Huijie Liu': '刘慧杰',
  'Li Li': '李莉',
  'Ruiran Yan': '晏瑞然',
  'Tian Gao': '高天',
  'Ze Guo': '郭泽',
  'Chengzhong Chu': '储诚中',
  'Yitong Zhou': '周奕同'
};

// Get author name based on current language
function getAuthorName(author) {
  // Handle "et al." translation
  if (author.toLowerCase() === 'et al.' || author === 'et al.') {
    return currentLanguage === 'zh' ? '等' : author;
  }
  
  if (currentLanguage === 'zh' && authorNames[author]) {
    return authorNames[author];
  }
  return author;
}

// Translation texts
const translations = {
  en: {
    'subtitle': 'AI & Data Science Master Student • University of Science and Technology of China',
    'about': 'Hi! This is Shuo Yu, a Master student in Artificial Intelligence and Data Science at University of Science and Technology of China (USTC). I am from the State Key Laboratory of Cognitive Intelligence. I am advised by Prof. <a href="http://staff.ustc.edu.cn/~qiliuql/">Qi Liu</a> and Associate Researcher <a href="https://mingyue-cheng.github.io/">Mingyue Cheng</a>.',
    'research-interest-title': 'Research Interest',
    'research-interest-intro': 'My research focuses on <strong>large language models and their applications</strong>, with particular emphasis on:',
    'research-llm-memory-title': 'LLM Memory',
    'research-llm-memory-desc': 'Developing memory mechanisms for large language models',
    'research-agent-title': 'Agent',
    'research-agent-desc': 'Developing AI agents including reinforcement learning-based training and workflow construction.',
    'research-rag-title': 'Retrieval-Augmented Generation (RAG)',
    'research-rag-desc': 'Enhancing LLMs with external knowledge retrieval',
    'publications-selected': 'Selected Publications',
    'publications-summary': 'My research focuses on LLM Memory, AI Agents, and RAG systems. I have published papers on hierarchical memory mechanisms for personalized generation (WWW 2026), uncertainty-aware programmatic agents for table reasoning (TableMind++), deep research agents for commercial report synthesis, and knowledge pruning for retrieval-augmented generation (CIKM 2025).',
    'projects-selected': 'Selected Projects and Competitions',
    'projects-summary': 'I have contributed to several impactful open-source projects and competitions, including winning a Silver Medal in Meta KDD Cup 2024 CRAG Benchmark, developing Agent-R1 for training LLM agents with reinforcement learning, building Science-Star for scientific agent platforms, developing Claw-R1 for agentic RL training of general agents, and TabClaw for interactive table analysis agents.',
    'show-all': 'Show All',
    'show-selected': 'Show Selected',
    'all-publications': 'All Publications',
    'all-projects': 'All Projects and Competitions',
    'awards-title': 'Awards',
    'award-national-scholarship': 'National Scholarship',
    'award-outstanding-graduate-anhui': 'Outstanding Graduate of Anhui Province',
    'award-outstanding-graduate-ustc': 'Outstanding Graduate, USTC',
    'award-kdd-cup': 'Meta KDD Cup 2024 CRAG Benchmark Silver Medal (Task 2 & 3)',
    'experiences-title': 'Experiences',
    'exp-master-title': 'Master in Artificial Intelligence and Data Science',
    'exp-master-school': 'School of Artificial Intelligence and Data Science',
    'exp-advisor': 'Advisors:',
    'exp-advisors-list': 'Prof. <a href="http://staff.ustc.edu.cn/~qiliuql/">Qi Liu</a> and <a href="https://mingyue-cheng.github.io/">Associate Researcher Mingyue Cheng</a>',
    'exp-intern-title': 'Algorithm Engineer Intern',
    'exp-intern-team': 'AIGC Team, Fulfillment Platform, Local Commerce',
    'exp-intern-desc': 'Optimized the RAG system on the Rider Assistant APP',
    'exp-bachelor-title': 'Bachelor in Computer Science',
    'exp-bachelor-school': 'School of Computer Science and Technology',
    'ustc-name': 'University of Science and Technology of China',
    'meituan-name': 'Meituan',
    'footer-updated': 'Last updated: October 2025. Design and source code from <a href="https://github.com/yuhui-zh15/Minimal-Academic-Website">Minimal-Academic-Website</a>.',
    'footer-acknowledgments': 'Acknowledgments:',
    'footer-acknowledgments-text': 'Special thanks to my classmate <a href="https://melmaphother.github.io/">Daoyu Wang</a> for his valuable assistance and support.'
  },
  zh: {
    'subtitle': '人工智能与数据科学专业硕士研究生 • 中国科学技术大学',
    'about': '你好！我是于硕，中国科学技术大学人工智能与数据科学专业硕士研究生，来自认知智能全国重点实验室，导师是<a href="http://staff.ustc.edu.cn/~qiliuql/">刘淇教授</a>和<a href="https://mingyue-cheng.github.io/">程明月副研究员</a>。',
    'research-interest-title': '研究方向',
    'research-interest-intro': '我的研究聚焦于<strong>大语言模型及其应用</strong>，特别关注以下方面：',
    'research-llm-memory-title': '大语言模型记忆',
    'research-llm-memory-desc': '开发大语言模型的记忆机制',
    'research-agent-title': '智能体',
    'research-agent-desc': '开发包括基于强化学习训练和工作流构建的AI智能体。',
    'research-rag-title': '检索增强生成（RAG）',
    'research-rag-desc': '通过外部知识检索增强大语言模型',
    'publications-selected': '代表性论文',
    'publications-summary': '我的研究聚焦于大语言模型记忆、AI智能体和RAG系统。我在个性化生成的层次化记忆机制（WWW 2026）、面向表格推理的不确定性感知程序化智能体（TableMind++）、商业报告合成的深度研究智能体、以及检索增强生成的知识剪枝（CIKM 2025）等方面发表了论文。',
    'projects-selected': '代表性项目与竞赛',
    'projects-summary': '我参与并贡献了多个有影响力的开源项目和竞赛，包括获得Meta KDD Cup 2024 CRAG比赛银牌，开发了用于强化学习训练LLM智能体的Agent-R1，构建了科学智能体平台Science-Star，开发了面向通用智能体的Agentic RL训练框架Claw-R1，以及面向表格分析的交互式智能体TabClaw。',
    'show-all': '显示全部',
    'show-selected': '显示代表性',
    'all-publications': '全部论文',
    'all-projects': '全部项目与竞赛',
    'awards-title': '获奖情况',
    'award-national-scholarship': '国家奖学金',
    'award-outstanding-graduate-anhui': '安徽省优秀毕业生',
    'award-outstanding-graduate-ustc': '中国科学技术大学优秀毕业生',
    'award-kdd-cup': 'Meta KDD Cup 2024 CRAG比赛银牌（任务2和3）',
    'experiences-title': '经历',
    'exp-master-title': '人工智能与数据科学专业硕士研究生',
    'exp-master-school': '人工智能与数据科学学院',
    'exp-advisor': '导师：',
    'exp-advisors-list': '<a href="http://staff.ustc.edu.cn/~qiliuql/">刘淇教授</a>、<a href="https://mingyue-cheng.github.io/">程明月副研究员</a>',
    'exp-intern-title': '大模型算法实习生',
    'exp-intern-team': '核心本地商业/履约平台技术部/AIGC 与数字化组',
    'exp-intern-desc': '优化了骑手助手APP上的RAG系统',
    'exp-bachelor-title': '计算机科学学士',
    'exp-bachelor-school': '计算机科学与技术学院',
    'ustc-name': '中国科学技术大学',
    'meituan-name': '美团',
    'footer-updated': '最后更新：2025年10月。设计和源代码来自<a href="https://github.com/yuhui-zh15/Minimal-Academic-Website">Minimal-Academic-Website</a>。',
    'footer-acknowledgments': '致谢：',
    'footer-acknowledgments-text': '特别感谢我的同学<a href="https://melmaphother.github.io/">王道宇</a>的宝贵帮助和支持。'
  }
};

// Translate page content
function translatePage(lang) {
  currentLanguage = lang;
  localStorage.setItem('language', lang);
  document.documentElement.lang = lang;
  
  // Update all elements with data-i18n attribute
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    if (translations[lang] && translations[lang][key]) {
      element.innerHTML = translations[lang][key];
    }
  });
  
  // Update language switch button text
  const langSwitch = document.getElementById('lang-switch');
  const langText = document.getElementById('lang-text');
  if (langSwitch && langText) {
    langText.textContent = lang === 'en' ? '中文' : 'English';
  }
  
  // Update toggle button texts
  updateToggleButtonTexts();
  
  // Re-render publications and projects to update author names
  renderPublications(showingSelectedPublications);
  renderProjects(showingSelectedProjects);
}

// Update toggle button texts based on current language
function updateToggleButtonTexts() {
  const togglePublicationsButton = document.getElementById('toggle-publications');
  const toggleProjectsButton = document.getElementById('toggle-projects');
  const toggleHeader = document.getElementById('toggle-header');
  const projectsToggleHeader = document.getElementById('projects-toggle-header');
  
  if (togglePublicationsButton) {
    togglePublicationsButton.textContent = showingSelectedPublications 
      ? translations[currentLanguage]['show-all']
      : translations[currentLanguage]['show-selected'];
  }
  
  if (toggleProjectsButton) {
    toggleProjectsButton.textContent = showingSelectedProjects 
      ? translations[currentLanguage]['show-all']
      : translations[currentLanguage]['show-selected'];
  }
  
  if (toggleHeader) {
    toggleHeader.textContent = showingSelectedPublications 
      ? translations[currentLanguage]['publications-selected']
      : translations[currentLanguage]['all-publications'];
  }
  
  if (projectsToggleHeader) {
    projectsToggleHeader.textContent = showingSelectedProjects 
      ? translations[currentLanguage]['projects-selected']
      : translations[currentLanguage]['all-projects'];
  }
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
  // Initialize language
  translatePage(currentLanguage);
  
  // Load publications and projects data
  loadPublications();
  loadProjects();
  
  // Load Google Scholar citations
  loadScholarCitations();
  
  // Initialize animation delays for sections
  const sections = document.querySelectorAll('section');
  sections.forEach((section, index) => {
    section.style.animationDelay = `${index * 0.1}s`;
  });
  
  // Add event listener for toggle buttons
  const togglePublicationsButton = document.getElementById('toggle-publications');
  if (togglePublicationsButton) {
    togglePublicationsButton.addEventListener('click', togglePublications);
  }
  
  const toggleProjectsButton = document.getElementById('toggle-projects');
  if (toggleProjectsButton) {
    toggleProjectsButton.addEventListener('click', toggleProjects);
  }
  
  // Add event listener for language switch
  const langSwitch = document.getElementById('lang-switch');
  if (langSwitch) {
    langSwitch.addEventListener('click', function() {
      const newLang = currentLanguage === 'en' ? 'zh' : 'en';
      translatePage(newLang);
    });
  }
});

// Load Google Scholar citations
function loadScholarCitations() {
  const scholarId = 'S-cZqlAAAAAJ';
  const citationsElement = document.getElementById('scholar-citations');
  
  if (!citationsElement) return;
  
  // Try multiple methods to get citation count
  // Method 1: Use CORS proxy to fetch Google Scholar page
  const scholarUrl = `https://scholar.google.com/citations?hl=en&user=${scholarId}`;
  const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(scholarUrl)}`;
  
  fetch(proxyUrl)
    .then(response => {
      if (!response.ok) throw new Error('Network response was not ok');
      return response.json();
    })
    .then(data => {
      try {
        const htmlContent = data.contents;
        // Parse HTML to find total citation count
        // Google Scholar shows total citations in format: "Cited by X" or in a table
        let citations = null;
        
        // Try to find citation count in various formats
        const patterns = [
          /<td[^>]*>Cited by<\/td>\s*<td[^>]*>(\d+)<\/td>/i,
          /Cited by\s+(\d+)/i,
          /Citations[^0-9]*(\d+)/i,
          /gsc_rsb_st">(\d+)</i,
          /"gsc_rsb_std">(\d+)</i
        ];
        
        for (const pattern of patterns) {
          const match = htmlContent.match(pattern);
          if (match && match[1]) {
            citations = parseInt(match[1]);
            break;
          }
        }
        
        if (citations !== null && citations > 0) {
          citationsElement.textContent = `Citations: ${citations.toLocaleString()}`;
          // Store in localStorage for caching
          localStorage.setItem('scholar_citations', JSON.stringify({
            count: citations,
            timestamp: Date.now()
          }));
        } else {
          // Try to load from cache
          const cached = localStorage.getItem('scholar_citations');
          if (cached) {
            const cachedData = JSON.parse(cached);
            // Use cache if less than 24 hours old
            if (Date.now() - cachedData.timestamp < 24 * 60 * 60 * 1000) {
              citationsElement.textContent = `Citations: ${cachedData.count.toLocaleString()} (cached)`;
              return;
            }
          }
          citationsElement.textContent = 'Citations: N/A';
        }
      } catch (error) {
        console.error('Error parsing Scholar data:', error);
        // Try to load from cache
        const cached = localStorage.getItem('scholar_citations');
        if (cached) {
          const cachedData = JSON.parse(cached);
          citationsElement.textContent = `Citations: ${cachedData.count.toLocaleString()} (cached)`;
        } else {
          citationsElement.textContent = 'Citations: Error';
        }
      }
    })
    .catch(error => {
      console.error('Error fetching Scholar citations:', error);
      // Try to load from cache
      const cached = localStorage.getItem('scholar_citations');
      if (cached) {
        const cachedData = JSON.parse(cached);
        citationsElement.textContent = `Citations: ${cachedData.count.toLocaleString()} (cached)`;
      } else {
        citationsElement.textContent = 'Citations: Unavailable';
      }
    });
}

// Load publications from JSON file
function loadPublications() {
  fetch('publications.json')
    .then(response => {
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log("Publications loaded successfully:", data);
      allPublications = data.publications;
      renderPublications(true);
    })
    .catch(error => {
      console.error('Error loading publications:', error);
      // Create fallback publications display if JSON loading fails
      displayFallbackPublications();
    });
}

// Fallback if JSON loading fails
function displayFallbackPublications() {
  const container = document.getElementById('publications-container');
  container.innerHTML = `Error loading publications.`;
}

// Toggle between showing all or selected publications
function togglePublications() {
  showingSelectedPublications = !showingSelectedPublications;
  renderPublications(showingSelectedPublications);
  updateToggleButtonTexts();
}

// Render publications based on selection state
function renderPublications(selectedOnly) {
  const publicationsContainer = document.getElementById('publications-container');
  publicationsContainer.innerHTML = '';
  
  const pubsToShow = selectedOnly ? 
    allPublications.filter(pub => pub.selected === 1) : 
    allPublications;
  
  pubsToShow.forEach(publication => {
    const pubElement = createPublicationElement(publication);
    publicationsContainer.appendChild(pubElement);
  });
}

// Create HTML element for a publication
function createPublicationElement(publication) {
  const pubItem = document.createElement('div');
  pubItem.className = 'publication-item';
  
  // Create thumbnail
  const thumbnail = document.createElement('div');
  thumbnail.className = 'pub-thumbnail';
  thumbnail.onclick = () => openModal(publication.thumbnail);
  
  const thumbnailImg = document.createElement('img');
  thumbnailImg.src = publication.thumbnail;
  thumbnailImg.alt = `${publication.title} thumbnail`;
  thumbnail.appendChild(thumbnailImg);
  
  // Create content container
  const content = document.createElement('div');
  content.className = 'pub-content';
  
  // Add title as link
  const title = document.createElement('div');
  title.className = 'pub-title';
  if (publication.links && publication.links.pdf) {
    const titleLink = document.createElement('a');
    titleLink.href = publication.links.pdf;
    titleLink.textContent = publication.title;
    titleLink.target = '_blank';
    titleLink.rel = 'noopener noreferrer';
    title.appendChild(titleLink);
  } else {
    title.textContent = publication.title;
  }
  content.appendChild(title);
  
  // Add authors with highlight
  const authors = document.createElement('div');
  authors.className = 'pub-authors';
  
  // Format authors with highlighting
  let authorsHTML = '';
  publication.authors.forEach((author, index) => {
    const displayName = getAuthorName(author);
    if (author.includes('Shuo Yu')) {
      authorsHTML += `<span class="highlight-name">${displayName}</span>`;
    } else if (author.includes('Qi Liu') || author.includes('Mingyue Cheng')) {
      authorsHTML += `<span class="highlight-advisor">${displayName}</span>`;
    } else {
      authorsHTML += displayName;
    }
    
    if (index < publication.authors.length - 1) {
      authorsHTML += ', ';
    }
  });
  
  authors.innerHTML = authorsHTML;
  content.appendChild(authors);
  
  // Add venue with award if present
  const venueContainer = document.createElement('div');
  venueContainer.className = 'pub-venue-container';
  
  const venue = document.createElement('div');
  venue.className = 'pub-venue';
  venue.textContent = publication.venue;
  venueContainer.appendChild(venue);
  
  // Add award if it exists
  if (publication.award && publication.award.length > 0) {
    const award = document.createElement('div');
    award.className = 'pub-award';
    award.textContent = publication.award;
    venueContainer.appendChild(award);
  }
  
  content.appendChild(venueContainer);
  
  // Add links if they exist
  if (publication.links) {
    const links = document.createElement('div');
    links.className = 'pub-links';
    
    if (publication.links.pdf) {
      const pdfLink = document.createElement('a');
      pdfLink.href = publication.links.pdf;
      pdfLink.textContent = '[Paper]';
      links.appendChild(pdfLink);
    }
    
    if (publication.links.code) {
      const codeLink = document.createElement('a');
      codeLink.href = publication.links.code;
      codeLink.textContent = '[Code]';
      links.appendChild(codeLink);
    }
    
    if (publication.links.project) {
      const projectLink = document.createElement('a');
      projectLink.href = publication.links.project;
      projectLink.textContent = '[Project Page]';
      links.appendChild(projectLink);
    }
    
    content.appendChild(links);
  }
  
  // Assemble the publication item
  pubItem.appendChild(thumbnail);
  pubItem.appendChild(content);
  
  return pubItem;
}

// Modal functionality for viewing original images
function openModal(imageSrc) {
  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImage');
  modal.style.display = "block";
  setTimeout(() => {
    modal.classList.add('show');
  }, 10);
  modalImg.src = imageSrc;
}

function closeModal() {
  const modal = document.getElementById('imageModal');
  modal.classList.remove('show');
  setTimeout(() => {
    modal.style.display = "none";
  }, 300);
}

// Close modal when clicking outside the image
window.onclick = function(event) {
  const modal = document.getElementById('imageModal');
  if (event.target == modal) {
    closeModal();
  }
}

// Load projects from JSON file
function loadProjects() {
  fetch('projects.json')
    .then(response => {
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log("Projects loaded successfully:", data);
      allProjects = data.projects;
      renderProjects(true);
    })
    .catch(error => {
      console.error('Error loading projects:', error);
      displayFallbackProjects();
    });
}

// Fallback if projects JSON loading fails
function displayFallbackProjects() {
  const container = document.getElementById('projects-container');
  container.innerHTML = `Error loading projects.`;
}

// Toggle between showing all or selected projects
function toggleProjects() {
  showingSelectedProjects = !showingSelectedProjects;
  renderProjects(showingSelectedProjects);
  updateToggleButtonTexts();
}

// Render projects based on selection state
function renderProjects(selectedOnly) {
  const projectsContainer = document.getElementById('projects-container');
  projectsContainer.innerHTML = '';
  
  const projectsToShow = selectedOnly ? 
    allProjects.filter(proj => proj.selected === 1) : 
    allProjects;
  
  projectsToShow.forEach(project => {
    const projectElement = createProjectElement(project);
    projectsContainer.appendChild(projectElement);
  });
}

// Format star count: 1342 -> "1.3k", 700 -> "700"
function formatStars(count) {
  if (count >= 1000) {
    return (count / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
  }
  return count.toString();
}

// Fetch GitHub star count, with 1-hour localStorage cache
async function fetchGitHubStars(codeUrl) {
  if (!codeUrl || !codeUrl.includes('github.com')) return null;

  const match = codeUrl.match(/github\.com\/([^\/]+\/[^\/\s]+)/);
  if (!match) return null;

  const repo = match[1].replace(/\/$/, '');
  const cacheKey = `github_stars_${repo}`;

  const cached = localStorage.getItem(cacheKey);
  if (cached) {
    const { stars, timestamp } = JSON.parse(cached);
    if (Date.now() - timestamp < 60 * 60 * 1000) return stars;
  }

  try {
    const response = await fetch(`https://api.github.com/repos/${repo}`);
    if (!response.ok) return null;
    const data = await response.json();
    const stars = data.stargazers_count;
    localStorage.setItem(cacheKey, JSON.stringify({ stars, timestamp: Date.now() }));
    return stars;
  } catch {
    return null;
  }
}

// Create HTML element for a project (similar to publication)
function createProjectElement(project) {
  const projectItem = document.createElement('div');
  projectItem.className = 'publication-item'; // Reuse publication styles
  
  // Create thumbnail
  const thumbnail = document.createElement('div');
  thumbnail.className = 'pub-thumbnail';
  thumbnail.onclick = () => openModal(project.thumbnail);
  
  const thumbnailImg = document.createElement('img');
  thumbnailImg.src = project.thumbnail;
  thumbnailImg.alt = `${project.title} thumbnail`;
  thumbnail.appendChild(thumbnailImg);
  
  // Create content container
  const content = document.createElement('div');
  content.className = 'pub-content';
  
  // Add title as link
  const title = document.createElement('div');
  title.className = 'pub-title';
  if (project.links && (project.links.pdf || project.links.code || project.links.project)) {
    const titleLink = document.createElement('a');
    // Prefer PDF, then project page, then code
    titleLink.href = project.links.pdf || project.links.project || project.links.code;
    titleLink.textContent = project.title;
    titleLink.target = '_blank';
    titleLink.rel = 'noopener noreferrer';
    title.appendChild(titleLink);
  } else {
    title.textContent = project.title;
  }
  content.appendChild(title);
  
  // Add authors with highlight
  const authors = document.createElement('div');
  authors.className = 'pub-authors';
  
  // Format authors with highlighting
  let authorsHTML = '';
  project.authors.forEach((author, index) => {
    const displayName = getAuthorName(author);
    if (author.includes('Shuo Yu')) {
      authorsHTML += `<span class="highlight-name">${displayName}</span>`;
    } else if (author.includes('Qi Liu') || author.includes('Mingyue Cheng')) {
      authorsHTML += `<span class="highlight-advisor">${displayName}</span>`;
    } else {
      authorsHTML += displayName;
    }
    
    if (index < project.authors.length - 1) {
      authorsHTML += ', ';
    }
  });
  
  authors.innerHTML = authorsHTML;
  content.appendChild(authors);
  
  // Add venue with award if present
  const venueContainer = document.createElement('div');
  venueContainer.className = 'pub-venue-container';
  
  const venue = document.createElement('div');
  venue.className = 'pub-venue';
  venue.textContent = project.venue;
  venueContainer.appendChild(venue);
  
  // Add award if it exists
  if (project.award && project.award.length > 0) {
    const award = document.createElement('div');
    award.className = 'pub-award';
    award.textContent = project.award;
    venueContainer.appendChild(award);
  }

  // Add live GitHub stars badge if code link is a GitHub URL
  if (project.links && project.links.code && project.links.code.includes('github.com')) {
    const starsBadge = document.createElement('div');
    starsBadge.className = 'pub-award';
    starsBadge.textContent = '★ ...';
    venueContainer.appendChild(starsBadge);

    fetchGitHubStars(project.links.code).then(stars => {
      if (stars !== null) {
        starsBadge.textContent = `★ ${formatStars(stars)}`;
      } else {
        starsBadge.remove();
      }
    });
  }
  
  content.appendChild(venueContainer);
  
  // Add links if they exist
  if (project.links && Object.keys(project.links).length > 0) {
    const links = document.createElement('div');
    links.className = 'pub-links';
    
    if (project.links.pdf) {
      const pdfLink = document.createElement('a');
      pdfLink.href = project.links.pdf;
      pdfLink.textContent = '[Paper]';
      links.appendChild(pdfLink);
    }
    
    if (project.links.code) {
      const codeLink = document.createElement('a');
      codeLink.href = project.links.code;
      codeLink.textContent = '[Code]';
      links.appendChild(codeLink);
    }
    
    if (project.links.project) {
      const projectLink = document.createElement('a');
      projectLink.href = project.links.project;
      projectLink.textContent = '[Project Page]';
      links.appendChild(projectLink);
    }
    
    content.appendChild(links);
  }
  
  // Assemble the project item
  projectItem.appendChild(thumbnail);
  projectItem.appendChild(content);
  
  return projectItem;
}
