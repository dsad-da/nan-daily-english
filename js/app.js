/**
 * NAN每日一句 - 核心应用逻辑
 */

const App = (() => {
    let currentTab = 'home';
    let currentFilter = 'all';
    let currentArticleFilter = 'all';

    // ── 初始化 ──

    function init() {
        updateGreeting();
        loadHomePage();
    }

    function updateGreeting() {
        const h = new Date().getHours();
        let greeting = 'Good morning';
        if (h >= 12 && h < 18) greeting = 'Good afternoon';
        else if (h >= 18) greeting = 'Good evening';
        const el = document.querySelector('.greeting');
        if (el) el.textContent = greeting;
    }

    // ── Tab 切换 ──

    function switchTab(tab) {
        currentTab = tab;
        // 切换页面
        document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
        const page = document.getElementById('page-' + tab);
        if (page) page.classList.add('active');
        // 切换导航高亮
        document.querySelectorAll('.nav-item').forEach(n => {
            n.classList.toggle('active', n.dataset.tab === tab);
        });
        // 加载对应页面数据
        if (tab === 'home') loadHomePage();
        else if (tab === 'sentences') loadSentenceList();
        else if (tab === 'articles') loadArticleList();
        else if (tab === 'profile') loadProfilePage();
    }

    // ── Toast ──

    function showToast(msg, duration) {
        duration = duration || 2500;
        const t = document.getElementById('toast');
        t.textContent = msg;
        t.classList.add('show');
        setTimeout(() => t.classList.remove('show'), duration);
    }

    // ── 首页 ──

    function loadHomePage() {
        // 连续打卡
        document.getElementById('streak-count').textContent = Storage.getStreak();
        // 今日统计
        const stats = Storage.getStats();
        document.getElementById('stat-today-sentences').textContent = stats.todaySentences;
        document.getElementById('stat-today-articles').textContent = stats.todayArticles;
        document.getElementById('stat-vocab').textContent = Storage.getVocabCount().learning;
        // 打卡按钮状态
        const btn = document.getElementById('btn-checkin');
        if (Storage.isCheckedInToday()) {
            btn.textContent = '已打卡';
            btn.classList.add('checked');
        } else {
            btn.textContent = '打卡';
            btn.classList.remove('checked');
        }
        // 每日推荐
        loadDailySentence();
        // 每日一词
        loadDailyWord();
        // 学习小贴士
        loadStudyTip();
    }

    function loadDailySentence() {
        const ids = SENTENCES.map(s => s.id);
        const dailyId = Storage.getDailySentence(ids);
        const s = SENTENCES.find(x => x.id === dailyId) || SENTENCES[0];
        document.getElementById('daily-text').textContent = s.sentence;
        document.getElementById('daily-cn').textContent = s.translation;
        document.getElementById('daily-source').textContent = (s.source || '') + ' · ' + s.level;
    }

    function openDailySentence() {
        const ids = SENTENCES.map(s => s.id);
        const dailyId = Storage.getDailySentence(ids);
        openSentenceDetail(dailyId);
    }

    // ── 每日一词 ──

    function loadDailyWord() {
        if (typeof DAILY_WORDS === 'undefined') return;
        const idx = Storage.getDailyWord(DAILY_WORDS.length);
        const w = DAILY_WORDS[idx] || DAILY_WORDS[0];
        document.getElementById('dw-word').textContent = w.word;
        document.getElementById('dw-phonetic').textContent = w.phonetic;
        document.getElementById('dw-meaning').textContent = w.meaning;
        document.getElementById('dw-example').textContent = '"' + w.example + '"';
    }

    function openDailyWord() {
        if (typeof DAILY_WORDS === 'undefined') return;
        const idx = Storage.getDailyWord(DAILY_WORDS.length);
        const w = DAILY_WORDS[idx] || DAILY_WORDS[0];
        Storage.addWord(w.word, w.meaning, '');
        showToast('已加入生词本：' + w.word);
    }

    // ── 学习小贴士 ──

    function loadStudyTip() {
        if (typeof STUDY_TIPS === 'undefined') return;
        const idx = Math.floor(Math.random() * STUDY_TIPS.length);
        document.getElementById('study-tip-text').textContent = STUDY_TIPS[idx];
    }

    function checkIn() {
        const count = Storage.checkIn();
        document.getElementById('streak-count').textContent = count;
        const btn = document.getElementById('btn-checkin');
        btn.textContent = '已打卡';
        btn.classList.add('checked');
        showToast('&#x1F389; 打卡成功！连续 ' + count + ' 天');
    }

    // ── 长难句列表 ──

    function loadSentenceList() {
        renderSentenceList(SENTENCES);
    }

    function filterSentences(filter) {
        currentFilter = filter;
        // 更新tab样式
        document.querySelectorAll('#sentence-filters .filter-tab').forEach(t => {
            t.classList.toggle('active', t.dataset.filter === filter);
        });
        let list = SENTENCES;
        if (filter === 'fav') {
            const favIds = Storage.getFavoriteSentences();
            list = SENTENCES.filter(s => favIds.includes(s.id));
        } else if (filter !== 'all') {
            list = SENTENCES.filter(s => s.level === filter);
        }
        renderSentenceList(list);
    }

    function renderSentenceList(list) {
        const container = document.getElementById('sentence-list');
        if (list.length === 0) {
            container.innerHTML =
                '<div class="empty-state">' +
                '<div class="empty-state-icon">&#x1F4ED;</div>' +
                '<div class="empty-state-text">暂无内容</div>' +
                '</div>';
            return;
        }
        let html = '';
        list.forEach(s => {
            const isFav = Storage.isFavoriteSentence(s.id);
            const learned = Storage.hasLearnedSentence(s.id);
            html +=
                '<div class="sentence-card" onclick="App.openSentenceDetail(' + s.id + ')">' +
                '  <div class="sentence-card-top">' +
                '    <div class="sentence-card-tags">' +
                '      <span class="tag tag-level">' + s.level + '</span>' +
                (learned ? '<span class="tag tag-success">&#x2713; 已学</span>' : '') +
                '    </div>' +
                '    <button class="fav-btn ' + (isFav ? 'active' : '') + '" onclick="event.stopPropagation();App.toggleFavSentence(' + s.id + ',this)">' +
                (isFav ? '&#x2764;&#xFE0F;' : '&#x1F90D;') +
                '    </button>' +
                '  </div>' +
                '  <div class="sentence-card-text">' + escapeHtml(s.sentence) + '</div>' +
                '  <div class="sentence-card-cn">' + escapeHtml(s.translation) + '</div>' +
                '  <div class="sentence-card-actions">' +
                '    <span class="tag tag-source">' + (s.source || '') + '</span>' +
                '  </div>' +
                '</div>';
        });
        container.innerHTML = html;
    }

    function toggleFavSentence(id, btn) {
        const isFav = Storage.toggleFavoriteSentence(id);
        btn.classList.toggle('active', isFav);
        btn.innerHTML = isFav ? '&#x2764;&#xFE0F;' : '&#x1F90D;';
        showToast(isFav ? '已收藏' : '已取消收藏');
    }

    // ── 句子详情 ──

    function openSentenceDetail(id) {
        const s = SENTENCES.find(x => x.id === id);
        if (!s) return;
        Storage.recordSentence(id);

        const g = s.grammar;
        let html = '';

        // 原句
        html += '<div class="detail-sentence">' + escapeHtml(s.sentence) + '</div>';

        // 翻译
        html += '<div class="detail-translation">' + escapeHtml(s.translation) + '</div>';

        // 朗读按钮
        html += '<div style="margin-bottom:20px;">' +
            '<button class="audio-btn" onclick="App.speak(\'' + escapeJs(s.sentence) + '\')">&#x1F50A; 朗读句子</button>' +
            '</div>';

        // 主干
        if (g && g.main) {
            html += '<div class="grammar-section">' +
                '<h3><span class="grammar-tag grammar-tag-main">主干</span> 句子主干</h3>' +
                '<div class="grammar-block">' +
                '<div class="grammar-block-text">' + escapeHtml(g.main.text || g.main) + '</div>' +
                (g.main.desc ? '<div class="grammar-block-desc">' + escapeHtml(g.main.desc) + '</div>' : '') +
                '</div></div>';
        }

        // 从句
        if (g && g.clauses && g.clauses.length > 0) {
            html += '<div class="grammar-section">' +
                '<h3><span class="grammar-tag grammar-tag-sub">从句</span> 从句分析</h3>';
            g.clauses.forEach(sc => {
                html += '<div class="grammar-block">' +
                    '<div class="grammar-block-title">' + escapeHtml(sc.type) + '</div>' +
                    '<div class="grammar-block-text">' + escapeHtml(sc.text) + '</div>' +
                    (sc.desc ? '<div class="grammar-block-desc">' + escapeHtml(sc.desc) + '</div>' : '') +
                    '</div>';
            });
            html += '</div>';
        }

        // 关键词
        if (g && g.keywords && g.keywords.length > 0) {
            html += '<div class="grammar-section">' +
                '<h3><span class="grammar-tag grammar-tag-key">词汇</span> 关键词</h3>' +
                '<div class="keyword-list">';
            g.keywords.forEach(kw => {
                const word = typeof kw === 'string' ? kw : kw.word;
                const meaning = typeof kw === 'string' ? '' : kw.meaning;
                html += '<div class="keyword-item" onclick="App.addVocabFromDetail(\'' + escapeJs(word) + '\',\'' + escapeJs(meaning) + '\')">' +
                    '<span class="keyword-word">' + escapeHtml(word) + '</span>' +
                    (meaning ? '<span class="keyword-meaning">' + escapeHtml(meaning) + '</span>' : '') +
                    '</div>';
            });
            html += '</div></div>';
        }

        // 语法点
        if (g && g.grammarPoints && g.grammarPoints.length > 0) {
            html += '<div class="grammar-section">' +
                '<h3>&#x1F4D6; 语法要点</h3>' +
                '<div class="grammar-points">';
            g.grammarPoints.forEach(gp => {
                html += '<div class="grammar-point-item">' + escapeHtml(gp) + '</div>';
            });
            html += '</div></div>';
        }

        // 标签
        if (s.tags && s.tags.length > 0) {
            html += '<div style="margin-top:16px;display:flex;gap:6px;flex-wrap:wrap;">';
            s.tags.forEach(t => {
                html += '<span class="tag tag-muted">#' + escapeHtml(t) + '</span>';
            });
            html += '</div>';
        }

        document.getElementById('sentence-modal-body').innerHTML = html;
        document.getElementById('modal-title').textContent = s.level + ' · 句子解析';
        openModal('sentence-modal');
    }

    function addVocabFromDetail(word, meaning) {
        Storage.addWord(word, meaning, '');
        showToast('已加入生词本：' + word);
    }

    // ── 文章列表 ──

    function loadArticleList() {
        renderArticleList(ARTICLES);
    }

    function filterArticles(filter) {
        currentArticleFilter = filter;
        document.querySelectorAll('#article-filters .filter-tab').forEach(t => {
            t.classList.toggle('active', t.dataset.filter === filter);
        });
        let list = ARTICLES;
        if (filter !== 'all') {
            list = ARTICLES.filter(a => a.level === filter);
        }
        renderArticleList(list);
    }

    function renderArticleList(list) {
        const container = document.getElementById('article-list');
        if (list.length === 0) {
            container.innerHTML =
                '<div class="empty-state">' +
                '<div class="empty-state-icon">&#x1F4F0;</div>' +
                '<div class="empty-state-text">暂无文章</div>' +
                '</div>';
            return;
        }
        let html = '';
        list.forEach(a => {
            const isFav = Storage.isFavoriteArticle(a.id);
            const learned = Storage.hasLearnedArticle(a.id);
            html +=
                '<div class="article-card" onclick="App.openArticleDetail(' + a.id + ')">' +
                '  <div class="article-card-header">' +
                '    <div class="article-card-title">' + escapeHtml(a.title) + '</div>' +
                '    <button class="fav-btn ' + (isFav ? 'active' : '') + '" onclick="event.stopPropagation();App.toggleFavArticle(' + a.id + ',this)">' +
                (isFav ? '&#x2764;&#xFE0F;' : '&#x1F90D;') +
                '    </button>' +
                '  </div>' +
                '  <div class="article-card-summary">' + escapeHtml(a.summary) + '</div>' +
                '  <div class="article-card-footer">' +
                '    <div style="display:flex;gap:6px;">' +
                '      <span class="tag tag-level">' + a.level + '</span>' +
                '      <span class="tag tag-source">' + (a.source || '') + '</span>' +
                (learned ? '<span class="tag tag-success">&#x2713;</span>' : '') +
                '    </div>' +
                '  </div>' +
                '</div>';
        });
        container.innerHTML = html;
    }

    function toggleFavArticle(id, btn) {
        const isFav = Storage.toggleFavoriteArticle(id);
        btn.classList.toggle('active', isFav);
        btn.innerHTML = isFav ? '&#x2764;&#xFE0F;' : '&#x1F90D;';
        showToast(isFav ? '已收藏' : '已取消收藏');
    }

    // ── 文章详情 ──

    function openArticleDetail(id) {
        const a = ARTICLES.find(x => x.id === id);
        if (!a) return;
        Storage.recordArticle(id);

        let html = '';

        // 标题和信息
        html += '<div class="article-detail-header">' +
            '<h2 class="article-detail-title">' + escapeHtml(a.title) + '</h2>' +
            '<div class="article-meta">' +
            '<span class="tag tag-level">' + a.level + '</span>' +
            '<span class="tag tag-source">' + (a.source || '') + '</span>' +
            '</div>' +
            '</div>';

        // 工具栏
        html += '<div class="article-toolbar">' +
            '<button class="audio-btn" onclick="App.speakArticle(' + a.id + ')">&#x1F50A; 朗读全文</button>' +
            '<button class="btn btn-sm btn-outline" onclick="App.toggleAllTranslation(' + a.id + ')">&#x1F30D; 显示/隐藏翻译</button>' +
            '</div>';

        // 段落
        html += '<div id="article-paragraphs">';
        a.paragraphs.forEach((p, idx) => {
            // 处理生词高亮
            let enText = escapeHtml(p.en);
            if (p.difficultWords && p.difficultWords.length > 0) {
                p.difficultWords.forEach(w => {
                    const word = typeof w === 'string' ? w : w.word;
                    const def = typeof w === 'string' ? '' : (w.definition || '');
                    const regex = new RegExp('\\b(' + escapeRegex(word) + ')\\b', 'gi');
                    enText = enText.replace(regex,
                        '<span class="word-highlight" data-word="' + escapeAttr(word) + '" data-def="' + escapeAttr(def) + '" onclick="App.showWordTip(this)">$1</span>');
                });
            }
            html += '<div class="article-paragraph">' +
                '<div class="article-paragraph-en" data-para="' + idx + '">' + enText + '</div>' +
                '<div class="article-paragraph-cn" data-para-cn="' + idx + '">' + escapeHtml(p.cn) + '</div>' +
                '</div>';
        });
        html += '</div>';

        // 问答
        if (a.question) {
            html += '<div class="quiz-section" id="quiz-section">' +
                '<h3 style="margin-bottom:12px;">&#x2753; 阅读理解</h3>' +
                '<div class="quiz-question">' + escapeHtml(a.question) + '</div>';
            const labels = ['A', 'B', 'C', 'D'];
            a.options.forEach((opt, idx) => {
                html += '<div class="quiz-option" data-article="' + a.id + '" data-idx="' + idx + '" onclick="App.selectQuizOption(' + a.id + ',' + idx + ')">' +
                    '<span class="quiz-option-label">' + labels[idx] + '.</span>' +
                    '<span>' + escapeHtml(opt) + '</span>' +
                    '</div>';
            });
            html += '<div id="quiz-result"></div></div>';
        }

        document.getElementById('article-modal-body').innerHTML = html;
        document.getElementById('article-modal-title').textContent = a.level + ' · 精读';
        openModal('article-modal');
    }

    function toggleAllTranslation(articleId) {
        const a = ARTICLES.find(x => x.id === articleId);
        if (!a) return;
        a.paragraphs.forEach((p, idx) => {
            const el = document.querySelector('[data-para-cn="' + idx + '"]');
            if (el) el.classList.toggle('show');
        });
    }

    function speakArticle(articleId) {
        const a = ARTICLES.find(x => x.id === articleId);
        if (!a) return;
        const fullText = a.paragraphs.map(p => p.en).join('. ');
        speak(fullText);
    }

    function selectQuizOption(articleId, idx) {
        const a = ARTICLES.find(x => x.id === articleId);
        if (!a) return;
        // 清除之前的选中
        document.querySelectorAll('.quiz-option[data-article="' + articleId + '"]').forEach(el => {
            el.classList.remove('selected', 'correct', 'wrong');
        });
        // 标记选中
        const options = document.querySelectorAll('.quiz-option[data-article="' + articleId + '"]');
        const selected = options[idx];
        selected.classList.add('selected');

        const correct = a.answer;
        const resultEl = document.getElementById('quiz-result');
        if (idx === correct) {
            selected.classList.add('correct');
            resultEl.innerHTML = '<div class="quiz-result correct">&#x2705; 回答正确！</div>';
            Storage.saveArticleProgress(articleId, { answered: true, correct: true });
        } else {
            selected.classList.add('wrong');
            options[correct].classList.add('correct');
            resultEl.innerHTML = '<div class="quiz-result wrong">&#x274C; 回答错误，正确答案是 ' + ['A', 'B', 'C', 'D'][correct] + '</div>';
            Storage.saveArticleProgress(articleId, { answered: true, correct: false });
        }
    }

    // ── 词汇提示 ──

    let tooltipEl = null;

    function showWordTip(el) {
        removeTooltip();
        const word = el.dataset.word;
        const def = el.dataset.def || '';
        // 添加到生词本
        if (def) Storage.addWord(word, def, '');

        tooltipEl = document.createElement('div');
        tooltipEl.className = 'word-tooltip';
        tooltipEl.innerHTML = '<strong>' + escapeHtml(word) + '</strong>' + (def ? ': ' + escapeHtml(def) : ' (点击词典查看)');
        document.body.appendChild(tooltipEl);

        const rect = el.getBoundingClientRect();
        tooltipEl.style.left = (rect.left + rect.width / 2 - tooltipEl.offsetWidth / 2) + 'px';
        tooltipEl.style.top = (rect.top - tooltipEl.offsetHeight - 10) + 'px';

        // 超出屏幕左边
        if (tooltipEl.offsetLeft < 8) tooltipEl.style.left = '8px';
        // 超出屏幕右边
        if (tooltipEl.offsetLeft + tooltipEl.offsetWidth > window.innerWidth - 8) {
            tooltipEl.style.left = (window.innerWidth - tooltipEl.offsetWidth - 8) + 'px';
        }
        // 超出屏幕上边
        if (tooltipEl.offsetTop < 8) {
            tooltipEl.style.top = (rect.bottom + 10) + 'px';
        }

        setTimeout(removeTooltip, 3000);
    }

    function removeTooltip() {
        if (tooltipEl) {
            tooltipEl.remove();
            tooltipEl = null;
        }
    }

    document.addEventListener('click', e => {
        if (tooltipEl && !e.target.closest('.word-highlight')) {
            removeTooltip();
        }
    });

    // ── 收藏夹 ──

    function openFavorites() {
        const favSentIds = Storage.getFavoriteSentences();
        const favArtIds = Storage.getFavoriteArticles();
        const sentences = SENTENCES.filter(s => favSentIds.includes(s.id));
        const articles = ARTICLES.filter(a => favArtIds.includes(a.id));

        let html = '';

        // 收藏的句子
        html += '<h3 style="margin-bottom:12px;">&#x1F4DD; 收藏的句子 (' + sentences.length + ')</h3>';
        if (sentences.length === 0) {
            html += '<div class="empty-state" style="padding:16px;"><div class="empty-state-text">暂无收藏句子</div></div>';
        } else {
            sentences.forEach(s => {
                html += '<div class="sentence-card" onclick="App.closeThenOpen(\'favorites-modal\');App.openSentenceDetail(' + s.id + ')">' +
                    '<div class="sentence-card-text">' + escapeHtml(s.sentence) + '</div>' +
                    '<div class="sentence-card-cn">' + escapeHtml(s.translation) + '</div>' +
                    '</div>';
            });
        }

        // 收藏的文章
        html += '<h3 style="margin:24px 0 12px;">&#x1F4F0; 收藏的文章 (' + articles.length + ')</h3>';
        if (articles.length === 0) {
            html += '<div class="empty-state" style="padding:16px;"><div class="empty-state-text">暂无收藏文章</div></div>';
        } else {
            articles.forEach(a => {
                html += '<div class="article-card" onclick="App.closeThenOpen(\'favorites-modal\');App.openArticleDetail(' + a.id + ')">' +
                    '<div class="article-card-title">' + escapeHtml(a.title) + '</div>' +
                    '<div class="article-card-summary">' + escapeHtml(a.summary) + '</div>' +
                    '</div>';
            });
        }

        document.getElementById('favorites-modal-body').innerHTML = html;
        openModal('favorites-modal');
    }

    function closeThenOpen(closeId) {
        closeModal(closeId);
    }

    // ── 生词本 ──

    function openVocabulary() {
        const vocab = Storage.getVocabulary();
        let html = '';

        if (vocab.length === 0) {
            html = '<div class="empty-state">' +
                '<div class="empty-state-icon">&#x1F4DA;</div>' +
                '<div class="empty-state-text">生词本为空<br>阅读文章时点击生词即可添加</div>' +
                '</div>';
        } else {
            html += '<div style="margin-bottom:16px;display:flex;justify-content:space-between;align-items:center;">' +
                '<span style="font-size:0.875rem;color:var(--text-muted);">共 ' + vocab.length + ' 个词</span>' +
                '<button class="btn btn-sm btn-outline" onclick="App.speakVocabAll()">&#x1F50A; 朗读全部</button>' +
                '</div>';
            vocab.forEach(w => {
                const isMastered = w.mastered;
                html += '<div class="vocab-card">' +
                    '<div>' +
                    '<div class="vocab-word">' + escapeHtml(w.word) +
                    (isMastered ? ' <span class="mastered-badge">已掌握</span>' : '') +
                    '</div>' +
                    '<div class="vocab-def">' + escapeHtml(w.definition) + '</div>' +
                    '<div class="vocab-meta">出现 ' + w.count + ' 次 · ' + w.lastSeen + '</div>' +
                    '</div>' +
                    '<div class="vocab-actions">' +
                    '<button class="btn btn-sm btn-ghost" onclick="App.speak(\'' + escapeJs(w.word) + '\')">&#x1F50A;</button>' +
                    '<button class="btn btn-sm btn-ghost" onclick="App.toggleMasteredVocab(\'' + escapeJs(w.word) + '\')">' + (isMastered ? '&#x1F504;' : '&#x2705;') + '</button>' +
                    '<button class="btn btn-sm btn-ghost" onclick="App.removeVocab(\'' + escapeJs(w.word) + '\')" style="color:var(--danger);">&#x1F5D1;</button>' +
                    '</div>' +
                    '</div>';
            });
        }

        document.getElementById('vocab-modal-body').innerHTML = html;
        openModal('vocab-modal');
    }

    function toggleMasteredVocab(word) {
        Storage.toggleMastered(word);
        openVocabulary();
    }

    function removeVocab(word) {
        Storage.removeWord(word);
        showToast('已移除：' + word);
        openVocabulary();
    }

    function speakVocabAll() {
        const vocab = Storage.getVocabulary();
        const text = vocab.map(w => w.word + '. ' + w.definition).join('. ');
        speak(text);
    }

    // ── 设置 ──

    function openSettings() {
        const settings = Storage.getSettings();
        let html = '<div class="settings-list" style="box-shadow:none;">';

        // 字号
        html += '<div class="settings-item">' +
            '<div class="settings-item-left">' +
            '<span class="settings-item-icon">&#x1F4D6;</span>' +
            '<span class="settings-item-text">字体大小</span>' +
            '</div>' +
            '<select style="border:1px solid var(--border);border-radius:6px;padding:6px 10px;font-size:0.875rem;" ' +
            'onchange="App.updateFontSize(this.value)">' +
            '<option value="small"' + (settings.fontSize === 'small' ? ' selected' : '') + '>小</option>' +
            '<option value="medium"' + (settings.fontSize === 'medium' ? ' selected' : '') + '>中</option>' +
            '<option value="large"' + (settings.fontSize === 'large' ? ' selected' : '') + '>大</option>' +
            '</select>' +
            '</div>';

        // 自动播放
        html += '<div class="settings-item">' +
            '<div class="settings-item-left">' +
            '<span class="settings-item-icon">&#x1F50A;</span>' +
            '<span class="settings-item-text">自动播放语音</span>' +
            '</div>' +
            '<label style="position:relative;display:inline-block;width:48px;height:28px;">' +
            '<input type="checkbox" ' + (settings.autoPlayAudio ? 'checked' : '') +
            ' onchange="App.updateAutoPlay(this.checked)" style="opacity:0;width:0;height:0;">' +
            '<span style="position:absolute;cursor:pointer;inset:0;background:' + (settings.autoPlayAudio ? 'var(--primary)' : '#ccc') + ';border-radius:14px;transition:0.3s;"></span>' +
            '<span style="position:absolute;content:\'\';height:22px;width:22px;left:' + (settings.autoPlayAudio ? '22px' : '3px') + ';bottom:3px;background:white;border-radius:50%;transition:0.3s;"></span>' +
            '</label>' +
            '</div>';

        // 清除数据
        html += '<div class="settings-item" onclick="App.clearAllData()">' +
            '<div class="settings-item-left">' +
            '<span class="settings-item-icon">&#x1F5D1;</span>' +
            '<span class="settings-item-text" style="color:var(--danger);">清除所有数据</span>' +
            '</div>' +
            '<span class="settings-item-arrow">&#x203A;</span>' +
            '</div>';

        html += '</div>';

        // 关于
        html += '<div style="text-align:center;margin-top:24px;color:var(--text-muted);font-size:0.8125rem;">' +
            'NAN每日一句 v1.0<br>英语长难句 & 外刊精读学习工具' +
            '</div>';

        document.getElementById('settings-modal-body').innerHTML = html;
        openModal('settings-modal');
    }

    function updateFontSize(size) {
        Storage.updateSettings({ fontSize: size });
        document.documentElement.style.fontSize = size === 'small' ? '14px' : size === 'large' ? '18px' : '16px';
        showToast('字体大小已更新');
    }

    function updateAutoPlay(val) {
        Storage.updateSettings({ autoPlayAudio: val });
        showToast(val ? '已开启自动播放' : '已关闭自动播放');
        openSettings();
    }

    function clearAllData() {
        if (confirm('确定要清除所有学习数据吗？此操作不可恢复。')) {
            localStorage.clear();
            showToast('数据已清除');
            closeModal('settings-modal');
            loadHomePage();
        }
    }

    // ── 个人页 ──

    function loadProfilePage() {
        const stats = Storage.getStats();
        const vocabCount = Storage.getVocabCount();
        const streak = Storage.getStreak();

        document.getElementById('p-total-sentences').textContent = stats.totalSentences;
        document.getElementById('p-total-articles').textContent = stats.totalArticles;
        document.getElementById('p-vocab-total').textContent = vocabCount.total;
        document.getElementById('p-streak').textContent = streak;

        renderCalendar();
    }

    function renderCalendar() {
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth();
        const today = now.getDate();

        document.getElementById('calendar-month').textContent = year + '年' + (month + 1) + '月';

        const firstDay = new Date(year, month, 1).getDay(); // 0=Sun
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        const calendarData = Storage.getCalendarData();
        const checkedDates = new Set();
        for (const dateStr in calendarData) {
            const d = new Date(dateStr);
            if (d.getFullYear() === year && d.getMonth() === month) {
                checkedDates.add(d.getDate());
            }
        }

        const weekdays = ['日', '一', '二', '三', '四', '五', '六'];
        let html = '';
        weekdays.forEach(w => {
            html += '<div class="calendar-weekday">' + w + '</div>';
        });

        // 空白
        for (let i = 0; i < firstDay; i++) {
            html += '<div class="calendar-day empty"></div>';
        }

        for (let d = 1; d <= daysInMonth; d++) {
            const isToday = d === today;
            const isChecked = checkedDates.has(d);
            let cls = 'calendar-day';
            if (isToday) cls += ' today';
            if (isChecked) cls += ' checked';
            html += '<div class="' + cls + '">' + d + '</div>';
        }

        document.getElementById('calendar-grid').innerHTML = html;
    }

    // ── 语音朗读 ──

    function speak(text) {
        if (!('speechSynthesis' in window)) {
            showToast('浏览器不支持语音朗读');
            return;
        }
        window.speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(text);
        u.lang = 'en-US';
        u.rate = 0.85;
        u.pitch = 1;
        window.speechSynthesis.speak(u);
    }

    // ── Modal ──

    function openModal(id) {
        const el = document.getElementById(id);
        if (el) el.classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    function closeModal(id) {
        const el = document.getElementById(id);
        if (el) el.classList.remove('show');
        // 检查是否还有其他打开的modal
        const anyOpen = document.querySelector('.modal-overlay.show');
        if (!anyOpen) document.body.style.overflow = '';
    }

    // 点击背景关闭
    document.addEventListener('click', e => {
        if (e.target.classList.contains('modal-overlay') && e.target.classList.contains('show')) {
            e.target.classList.remove('show');
            const anyOpen = document.querySelector('.modal-overlay.show');
            if (!anyOpen) document.body.style.overflow = '';
        }
    });

    // ── 工具函数 ──

    function escapeHtml(str) {
        if (!str) return '';
        return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }

    function escapeJs(str) {
        if (!str) return '';
        return str.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/"/g, '\\"');
    }

    function escapeAttr(str) {
        if (!str) return '';
        return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    function escapeRegex(str) {
        return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    // ── 初始化 ──

    document.addEventListener('DOMContentLoaded', init);

    return {
        switchTab,
        checkIn,
        openDailySentence,
        openDailyWord,
        filterSentences,
        openSentenceDetail,
        toggleFavSentence,
        filterArticles,
        openArticleDetail,
        toggleFavArticle,
        toggleAllTranslation,
        speakArticle,
        selectQuizOption,
        showWordTip,
        openFavorites,
        openVocabulary,
        openSettings,
        updateFontSize,
        updateAutoPlay,
        clearAllData,
        speak,
        openModal,
        closeModal,
        closeThenOpen,
        toggleMasteredVocab,
        removeVocab,
        speakVocabAll,
        addVocabFromDetail,
    };
})();
