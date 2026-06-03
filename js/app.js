/**
 * NAN每日一句 - 核心应用逻辑
 */

const App = (() => {
    let currentTab = 'home';
    let currentFilter = 'all';
    let currentArticleFilter = 'all';

    // ── 初始化 ──

    function init() {
        applyTheme();
        loadSavedTheme();
        updateGreeting();
        loadHomePage();
    }

    function applyTheme() {
        const settings = Storage.getSettings();
        document.documentElement.setAttribute('data-theme', settings.theme || 'light');
    }

    function toggleTheme() {
        const settings = Storage.getSettings();
        const newTheme = settings.theme === 'dark' ? 'light' : 'dark';
        Storage.updateSettings({ theme: newTheme });
        document.documentElement.setAttribute('data-theme', newTheme);
        showToast(newTheme === 'dark' ? '已切换暗色模式' : '已切换亮色模式');
        openSettings();
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
        if (!t) return;
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
        // 复习提醒
        loadReviewReminder();
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

    function loadReviewReminder() {
        const dueReviews = Storage.getDueReviews();
        const el = document.getElementById('review-reminder');
        if (dueReviews.length > 0) {
            el.style.display = 'flex';
            document.getElementById('review-reminder-text').textContent = '有 ' + dueReviews.length + ' 个句子需要复习';
        } else {
            el.style.display = 'none';
        }
    }

    function openReview() {
        const dueReviews = Storage.getDueReviews();
        if (dueReviews.length === 0) {
            showToast('暂无待复习内容');
            return;
        }
        const firstId = dueReviews[0].id;
        Storage.markReviewDone(firstId);
        openSentenceDetail(firstId);
        loadReviewReminder();
    }

    // ── 语法专题 ──

    function openGrammarList() {
        if (typeof GRAMMAR_TOPICS === 'undefined') {
            showToast('语法专题数据加载中...');
            return;
        }
        let html = '';
        GRAMMAR_TOPICS.forEach(t => {
            html += '<div class="grammar-topic-card" onclick="App.openGrammarDetail(' + t.id + ')">' +
                '<div class="grammar-topic-icon">' + t.icon + '</div>' +
                '<div class="grammar-topic-info">' +
                '<div class="grammar-topic-title">' + escapeHtml(t.title) + '</div>' +
                '<div class="grammar-topic-summary">' + escapeHtml(t.summary) + '</div>' +
                '</div>' +
                '<span class="settings-item-arrow">&#x203A;</span>' +
                '</div>';
        });
        document.getElementById('grammar-modal-body').innerHTML = html;
        document.getElementById('grammar-modal-title').textContent = '语法专题';
        openModal('grammar-modal');
    }

    function openGrammarDetail(id) {
        const topic = GRAMMAR_TOPICS.find(t => t.id === id);
        if (!topic) return;
        let html = '<div class="grammar-detail-header">' +
            '<div class="grammar-detail-icon">' + topic.icon + '</div>' +
            '<h2>' + escapeHtml(topic.title) + '</h2>' +
            '<p>' + escapeHtml(topic.summary) + '</p>' +
            '</div>';
        topic.points.forEach((p, idx) => {
            html += '<div class="grammar-point-card">' +
                '<div class="grammar-point-rule">' + escapeHtml(p.rule) + '</div>' +
                '<div class="grammar-point-structure"><strong>结构：</strong>' + escapeHtml(p.structure) + '</div>' +
                '<div class="grammar-point-example"><strong>例句：</strong>' + escapeHtml(p.example) + '</div>' +
                '<div class="grammar-point-translation">' + escapeHtml(p.translation) + '</div>' +
                (p.note ? '<div class="grammar-point-note">&#x1F4CC; ' + escapeHtml(p.note) + '</div>' : '') +
                '</div>';
        });
        if (topic.relatedSentences && topic.relatedSentences.length > 0) {
            html += '<div style="margin-top:20px;"><h3>相关句子练习</h3>';
            topic.relatedSentences.forEach(sid => {
                const s = SENTENCES.find(x => x.id === sid);
                if (s) {
                    html += '<div class="sentence-card" onclick="App.closeThenOpen(\'grammar-modal\');App.openSentenceDetail(' + s.id + ')" style="margin-top:8px;">' +
                        '<div class="sentence-card-text" style="font-size:0.875rem;">' + escapeHtml(s.sentence.substring(0, 80)) + '...</div>' +
                        '<div class="sentence-card-cn" style="font-size:0.8125rem;">' + escapeHtml(s.translation.substring(0, 50)) + '...</div>' +
                        '</div>';
                }
            });
            html += '</div>';
        }
        document.getElementById('grammar-modal-body').innerHTML = html;
        document.getElementById('grammar-modal-title').textContent = topic.title;
    }

    // ── 写作模板 ──

    function openWritingList() {
        if (typeof WRITING_TEMPLATES === 'undefined') {
            showToast('写作模板数据加载中...');
            return;
        }
        let html = '';
        WRITING_TEMPLATES.forEach(t => {
            html += '<div class="writing-template-card" onclick="App.openWritingDetail(' + t.id + ')">' +
                '<div class="writing-template-title">' + escapeHtml(t.title) + '</div>' +
                '<div class="writing-template-level"><span class="tag tag-level">' + t.level + '</span></div>' +
                '<span class="settings-item-arrow">&#x203A;</span>' +
                '</div>';
        });
        document.getElementById('writing-modal-body').innerHTML = html;
        document.getElementById('writing-modal-title').textContent = '写作模板';
        openModal('writing-modal');
    }

    function openWritingDetail(id) {
        const template = WRITING_TEMPLATES.find(t => t.id === id);
        if (!template) return;
        let html = '<div class="writing-detail-header">' +
            '<h2>' + escapeHtml(template.title) + '</h2>' +
            '<span class="tag tag-level">' + template.level + '</span>' +
            '</div>';
        html += '<h3 style="margin:20px 0 12px;">文章结构</h3>';
        template.structure.forEach((s, idx) => {
            html += '<div class="writing-structure-item">' +
                '<div class="writing-structure-part">' + escapeHtml(s.part) + '</div>' +
                '<div class="writing-structure-content">' + escapeHtml(s.content) + '</div>' +
                '</div>';
        });
        html += '<h3 style="margin:20px 0 12px;">高分短语</h3>';
        html += '<div class="writing-phrases">';
        template.keyPhrases.forEach(phrase => {
            html += '<span class="writing-phrase">' + escapeHtml(phrase) + '</span>';
        });
        html += '</div>';
        html += '<h3 style="margin:20px 0 12px;">范文示例</h3>';
        html += '<div class="writing-sample">' + escapeHtml(template.sampleEssay) + '</div>';
        html += '<div style="margin-top:16px;text-align:center;">' +
            '<button class="btn btn-primary" onclick="App.speak(\'' + escapeJs(template.sampleEssay) + '\')">&#x1F50A; 朗读范文</button>' +
            '</div>';
        document.getElementById('writing-modal-body').innerHTML = html;
        document.getElementById('writing-modal-title').textContent = template.title;
    }

    // ── 拼写练习 ──

    let spellingState = { words: [], current: 0, score: 0, total: 0 };

    function openSpelling() {
        const vocab = Storage.getVocabulary();
        if (vocab.length < 5) {
            showToast('生词本至少需要5个词才能开始拼写练习');
            return;
        }
        const shuffled = [...vocab].sort(() => Math.random() - 0.5);
        spellingState.words = shuffled.slice(0, Math.min(10, shuffled.length));
        spellingState.current = 0;
        spellingState.score = 0;
        spellingState.total = spellingState.words.length;
        renderSpellingQuestion();
        openModal('spelling-modal');
    }

    function renderSpellingQuestion() {
        if (spellingState.current >= spellingState.total) {
            renderSpellingResult();
            return;
        }
        const w = spellingState.words[spellingState.current];
        const progress = (spellingState.current / spellingState.total * 100).toFixed(0);
        const hint = w.word[0] + '_ '.repeat(w.word.length - 1);

        let html = '<div class="quiz-progress-bar"><div class="quiz-progress-fill" style="width:' + progress + '%"></div></div>';
        html += '<div class="quiz-score">第 ' + (spellingState.current + 1) + ' / ' + spellingState.total + ' 题</div>';
        html += '<div class="spelling-meaning">' + escapeHtml(w.definition) + '</div>';
        html += '<div class="spelling-hint">提示：首字母是 <strong>' + w.word[0].toUpperCase() + '</strong>，共 ' + w.word.length + ' 个字母</div>';
        html += '<div class="spelling-letter-hint">' + hint.toUpperCase() + '</div>';
        html += '<div style="margin:20px 0;">';
        html += '<input type="text" class="spelling-input" id="spelling-input" placeholder="输入英文单词..." autocomplete="off" autocapitalize="none">';
        html += '</div>';
        html += '<div style="text-align:center;">';
        html += '<button class="btn btn-primary" onclick="App.checkSpelling()">提交</button>';
        html += '<button class="btn btn-ghost" onclick="App.skipSpelling()" style="margin-left:8px;">跳过</button>';
        html += '</div>';
        html += '<div id="spelling-feedback"></div>';

        document.getElementById('spelling-modal-body').innerHTML = html;
        setTimeout(() => {
            const input = document.getElementById('spelling-input');
            if (input) input.focus();
        }, 100);
    }

    function checkSpelling() {
        const w = spellingState.words[spellingState.current];
        const input = document.getElementById('spelling-input');
        const userAnswer = input.value.trim().toLowerCase();
        const correctAnswer = w.word.toLowerCase();

        if (!userAnswer) {
            showToast('请输入单词');
            return;
        }

        const isCorrect = userAnswer === correctAnswer;
        if (isCorrect) spellingState.score++;

        input.disabled = true;
        let feedbackHtml = '';
        if (isCorrect) {
            feedbackHtml = '<div class="quiz-result correct" style="margin-top:16px;">&#x2705; 正确！</div>';
        } else {
            feedbackHtml = '<div class="quiz-result wrong" style="margin-top:16px;">&#x274C; 正确答案：' + escapeHtml(w.word) + '</div>';
            // 高亮显示差异
            feedbackHtml += '<div class="spelling-compare">';
            feedbackHtml += '<div>你的输入：<span style="color:var(--danger);">' + escapeHtml(userAnswer) + '</span></div>';
            feedbackHtml += '<div>正确拼写：<span style="color:var(--success);">' + escapeHtml(correctAnswer) + '</span></div>';
            feedbackHtml += '</div>';
        }

        // 添加详细解释
        feedbackHtml += '<div class="spelling-explanation">';
        feedbackHtml += '<div class="spelling-explanation-title">&#x1F4D6; 词汇详解</div>';
        feedbackHtml += '<div class="spelling-word-detail">';
        feedbackHtml += '<div class="spelling-word-title">' + escapeHtml(w.word) + '</div>';
        feedbackHtml += '<div class="spelling-word-meaning">' + escapeHtml(w.definition) + '</div>';
        if (w.source) {
            feedbackHtml += '<div class="spelling-word-source">来源：' + escapeHtml(w.source) + '</div>';
        }
        feedbackHtml += '<div class="spelling-word-meta">出现 ' + w.count + ' 次 · 添加于 ' + w.addedDate + '</div>';
        feedbackHtml += '</div>';

        // 拆分记忆
        feedbackHtml += '<div class="spelling-breakdown">';
        feedbackHtml += '<div class="spelling-breakdown-title">&#x1F9E0; 拆分记忆</div>';
        feedbackHtml += '<div class="spelling-breakdown-text">把 <strong>' + escapeHtml(w.word) + '</strong> 拆分成更小的部分来记忆：</div>';
        const wordLen = w.word.length;
        if (wordLen > 6) {
            const mid = Math.floor(wordLen / 2);
            feedbackHtml += '<div class="spelling-parts">';
            feedbackHtml += '<span class="spelling-part">' + escapeHtml(w.word.slice(0, mid)) + '</span>';
            feedbackHtml += '<span class="spelling-part-sep">+</span>';
            feedbackHtml += '<span class="spelling-part">' + escapeHtml(w.word.slice(mid)) + '</span>';
            feedbackHtml += '</div>';
        } else {
            feedbackHtml += '<div class="spelling-parts">';
            feedbackHtml += '<span class="spelling-part">' + escapeHtml(w.word) + '</span>';
            feedbackHtml += '</div>';
        }
        feedbackHtml += '</div>';

        // 拼写提示
        feedbackHtml += '<div class="spelling-tips">';
        feedbackHtml += '<div class="spelling-tips-title">&#x1F4DD; 拼写提示</div>';
        feedbackHtml += '<ul class="spelling-tips-list">';
        feedbackHtml += '<li>注意双写字母：' + escapeHtml(w.word) + ' 中是否有重复字母</li>';
        feedbackHtml += '<li>注意词尾变化：-ing, -ed, -tion, -sion 等常见后缀</li>';
        feedbackHtml += '<li>多读几遍，根据发音拼写</li>';
        feedbackHtml += '</ul>';
        feedbackHtml += '</div>';

        feedbackHtml += '</div>';

        feedbackHtml += '<div style="text-align:center;margin-top:16px;"><button class="btn btn-primary" onclick="App.nextSpelling()">下一题</button></div>';
        document.getElementById('spelling-feedback').innerHTML = feedbackHtml;
    }

    function skipSpelling() {
        const w = spellingState.words[spellingState.current];
        let feedbackHtml = '<div class="quiz-result wrong" style="margin-top:16px;">&#x23ED;&#xFE0F; 跳过，正确答案：' + escapeHtml(w.word) + '</div>';
        feedbackHtml += '<div style="text-align:center;margin-top:12px;"><button class="btn btn-primary" onclick="App.nextSpelling()">下一题</button></div>';
        document.getElementById('spelling-feedback').innerHTML = feedbackHtml;
        document.getElementById('spelling-input').disabled = true;
    }

    function nextSpelling() {
        spellingState.current++;
        renderSpellingQuestion();
    }

    function renderSpellingResult() {
        const percent = Math.round(spellingState.score / spellingState.total * 100);
        let emoji = '&#x1F389;';
        let msg = '拼写完成！';
        if (percent < 60) { emoji = '&#x1F4AA;'; msg = '继续加油！'; }
        else if (percent < 80) { emoji = '&#x1F44D;'; msg = '不错！'; }
        let html = '<div class="quiz-result-screen">' +
            '<div class="quiz-result-emoji">' + emoji + '</div>' +
            '<div class="quiz-result-msg">' + msg + '</div>' +
            '<div class="quiz-result-score">' + spellingState.score + ' / ' + spellingState.total + '</div>' +
            '<div class="quiz-result-percent">正确率 ' + percent + '%</div>' +
            '<button class="btn btn-primary" onclick="App.openSpelling()" style="margin-top:20px;">再来一轮</button>' +
            '</div>';
        document.getElementById('spelling-modal-body').innerHTML = html;
    }

    // ── 每日挑战 ──

    let challengeState = { questions: [], current: 0, score: 0, total: 5, timeLeft: 0, timer: null };

    function openChallenge() {
        // 检查今天是否已完成挑战
        const today = new Date().toISOString().slice(0, 10);
        const challengeDate = localStorage.getItem('nan_challenge_date');
        if (challengeDate === today) {
            showToast('今天的挑战已完成，明天再来！');
            return;
        }

        // 生成混合题目（词汇测验 + 填空 + 拼写）
        const vocab = Storage.getVocabulary();
        if (vocab.length < 4) {
            showToast('生词本至少需要4个词才能开始挑战');
            return;
        }

        const questions = [];
        const shuffled = [...vocab].sort(() => Math.random() - 0.5);

        // 2道词汇测验题
        for (let i = 0; i < 2 && i < shuffled.length; i++) {
            const w = shuffled[i];
            const wrongAnswers = vocab.filter(v => v.word !== w.word)
                .sort(() => Math.random() - 0.5)
                .slice(0, 3)
                .map(v => v.definition);
            const options = [w.definition, ...wrongAnswers].sort(() => Math.random() - 0.5);
            questions.push({
                type: 'quiz',
                word: w.word,
                options,
                correct: options.indexOf(w.definition)
            });
        }

        // 2道填空题
        const learned = [];
        for (let i = 0; i < SENTENCES.length; i++) {
            if (Storage.hasLearnedSentence(SENTENCES[i].id)) learned.push(SENTENCES[i]);
        }
        if (learned.length >= 2) {
            const sentShuffled = learned.sort(() => Math.random() - 0.5);
            for (let i = 0; i < 2 && i < sentShuffled.length; i++) {
                const s = sentShuffled[i];
                const words = s.sentence.split(/\s+/);
                const blankIdx = Math.floor(words.length / 2);
                const correctWord = words[blankIdx].replace(/[^a-zA-Z'-]/g, '');
                const otherWords = words.filter((w, idx) => idx !== blankIdx && w.replace(/[^a-zA-Z'-]/g, '').length > 3);
                const distractors = otherWords.sort(() => Math.random() - 0.5).slice(0, 3);
                const options = [correctWord, ...distractors.map(w => w.replace(/[^a-zA-Z'-]/g, ''))].sort(() => Math.random() - 0.5);
                questions.push({
                    type: 'cloze',
                    sentence: s.sentence,
                    blankIndex: blankIdx,
                    words,
                    options,
                    correct: options.indexOf(correctWord)
                });
            }
        }

        // 1道拼写题
        if (shuffled.length > 2) {
            questions.push({
                type: 'spelling',
                word: shuffled[2].word,
                meaning: shuffled[2].definition
            });
        }

        challengeState.questions = questions;
        challengeState.current = 0;
        challengeState.score = 0;
        challengeState.total = questions.length;
        challengeState.timeLeft = 120; // 2分钟
        renderChallengeQuestion();
        startChallengeTimer();
        openModal('challenge-modal');
    }

    function startChallengeTimer() {
        if (challengeState.timer) clearInterval(challengeState.timer);
        challengeState.timer = setInterval(() => {
            challengeState.timeLeft--;
            const timerEl = document.getElementById('challenge-timer');
            if (timerEl) {
                const min = Math.floor(challengeState.timeLeft / 60);
                const sec = challengeState.timeLeft % 60;
                timerEl.textContent = min + ':' + (sec < 10 ? '0' : '') + sec;
                if (challengeState.timeLeft <= 30) {
                    timerEl.style.color = 'var(--danger)';
                }
            }
            if (challengeState.timeLeft <= 0) {
                clearInterval(challengeState.timer);
                renderChallengeResult();
            }
        }, 1000);
    }

    function renderChallengeQuestion() {
        if (challengeState.current >= challengeState.total) {
            clearInterval(challengeState.timer);
            renderChallengeResult();
            return;
        }
        const q = challengeState.questions[challengeState.current];
        const progress = (challengeState.current / challengeState.total * 100).toFixed(0);

        let html = '<div class="challenge-header">';
        html += '<div class="challenge-timer" id="challenge-timer">2:00</div>';
        html += '<div class="challenge-progress-text">' + (challengeState.current + 1) + '/' + challengeState.total + '</div>';
        html += '</div>';
        html += '<div class="quiz-progress-bar"><div class="quiz-progress-fill" style="width:' + progress + '%"></div></div>';

        if (q.type === 'quiz') {
            html += '<div class="challenge-type">&#x1F3AF; 词汇选择</div>';
            html += '<div class="quiz-word-display">' + escapeHtml(q.word) + '</div>';
            html += '<div class="quiz-hint">选择正确的释义：</div>';
            const labels = ['A', 'B', 'C', 'D'];
            q.options.forEach((opt, idx) => {
                html += '<div class="quiz-option" onclick="App.answerChallenge(' + idx + ')">' +
                    '<span class="quiz-option-label">' + labels[idx] + '.</span>' +
                    '<span>' + escapeHtml(opt) + '</span></div>';
            });
        } else if (q.type === 'cloze') {
            html += '<div class="challenge-type">&#x270D;&#xFE0F; 填空</div>';
            html += '<div class="cloze-sentence">';
            q.words.forEach((w, idx) => {
                if (idx === q.blankIndex) {
                    html += '<span class="cloze-blank" id="cloze-blank">____</span> ';
                } else {
                    html += escapeHtml(w) + ' ';
                }
            });
            html += '</div>';
            html += '<div class="cloze-options">';
            q.options.forEach((opt, idx) => {
                html += '<button class="cloze-option-btn" onclick="App.answerChallenge(' + idx + ')">' + escapeHtml(opt) + '</button>';
            });
            html += '</div>';
        } else if (q.type === 'spelling') {
            html += '<div class="challenge-type">&#x1F4DD; 拼写</div>';
            html += '<div class="spelling-meaning">' + escapeHtml(q.meaning) + '</div>';
            html += '<div class="spelling-hint">首字母：<strong>' + q.word[0].toUpperCase() + '</strong>，共 ' + q.word.length + ' 个字母</div>';
            html += '<input type="text" class="spelling-input" id="challenge-spelling-input" placeholder="输入英文单词..." autocomplete="off" autocapitalize="none">';
            html += '<div style="text-align:center;margin-top:12px;">';
            html += '<button class="btn btn-primary" onclick="App.answerChallengeSpelling()">提交</button>';
            html += '</div>';
        }

        html += '<div id="challenge-feedback"></div>';
        document.getElementById('challenge-modal-body').innerHTML = html;

        if (q.type === 'spelling') {
            setTimeout(() => {
                const input = document.getElementById('challenge-spelling-input');
                if (input) input.focus();
            }, 100);
        }
    }

    function answerChallenge(idx) {
        const q = challengeState.questions[challengeState.current];
        const options = document.querySelectorAll('#challenge-modal-body .quiz-option, #challenge-modal-body .cloze-option-btn');
        options.forEach(el => el.style.pointerEvents = 'none');

        if (idx === q.correct) {
            challengeState.score++;
            if (options[idx]) {
                options[idx].classList.add('correct');
                if (options[idx].tagName === 'BUTTON') {
                    options[idx].style.background = 'var(--success)';
                    options[idx].style.color = 'white';
                }
            }
            document.getElementById('challenge-feedback').innerHTML = '<div class="quiz-result correct" style="margin-top:12px;">&#x2705; 正确！</div>';
        } else {
            if (options[idx]) {
                options[idx].classList.add('wrong');
                if (options[idx].tagName === 'BUTTON') {
                    options[idx].style.background = 'var(--danger)';
                    options[idx].style.color = 'white';
                }
            }
            if (options[q.correct]) {
                options[q.correct].classList.add('correct');
                if (options[q.correct].tagName === 'BUTTON') {
                    options[q.correct].style.background = 'var(--success)';
                    options[q.correct].style.color = 'white';
                }
            }
            document.getElementById('challenge-feedback').innerHTML = '<div class="quiz-result wrong" style="margin-top:12px;">&#x274C; 错误！</div>';
        }

        setTimeout(() => {
            challengeState.current++;
            renderChallengeQuestion();
        }, 1000);
    }

    function answerChallengeSpelling() {
        const q = challengeState.questions[challengeState.current];
        const input = document.getElementById('challenge-spelling-input');
        const userAnswer = input.value.trim().toLowerCase();

        if (!userAnswer) {
            showToast('请输入单词');
            return;
        }

        input.disabled = true;
        if (userAnswer === q.word.toLowerCase()) {
            challengeState.score++;
            document.getElementById('challenge-feedback').innerHTML = '<div class="quiz-result correct" style="margin-top:12px;">&#x2705; 正确！</div>';
        } else {
            document.getElementById('challenge-feedback').innerHTML = '<div class="quiz-result wrong" style="margin-top:12px;">&#x274C; 正确答案：' + escapeHtml(q.word) + '</div>';
        }

        setTimeout(() => {
            challengeState.current++;
            renderChallengeQuestion();
        }, 1500);
    }

    function renderChallengeResult() {
        if (challengeState.timer) clearInterval(challengeState.timer);
        const today = new Date().toISOString().slice(0, 10);
        localStorage.setItem('nan_challenge_date', today);

        const percent = Math.round(challengeState.score / challengeState.total * 100);
        let emoji = '&#x1F389;';
        let msg = '挑战完成！';
        if (percent < 60) { emoji = '&#x1F4AA;'; msg = '明天继续加油！'; }
        else if (percent < 100) { emoji = '&#x1F44D;'; msg = '表现不错！'; }
        else { emoji = '&#x1F31F;'; msg = '完美通关！'; }

        let html = '<div class="quiz-result-screen">';
        html += '<div class="quiz-result-emoji">' + emoji + '</div>';
        html += '<div class="quiz-result-msg">' + msg + '</div>';
        html += '<div class="quiz-result-score">' + challengeState.score + ' / ' + challengeState.total + '</div>';
        html += '<div class="quiz-result-percent">得分 ' + percent + '%</div>';
        if (percent === 100) {
            html += '<div style="margin-top:12px;font-size:1.5rem;">&#x1F3C6; &#x2B50; &#x1F389;</div>';
        }
        html += '</div>';
        document.getElementById('challenge-modal-body').innerHTML = html;
    }

    // ── 分享卡片 ──

    function generateShareCard(sentenceId) {
        const s = SENTENCES.find(x => x.id === sentenceId);
        if (!s) return;

        const canvas = document.createElement('canvas');
        canvas.width = 750;
        canvas.height = 1000;
        const ctx = canvas.getContext('2d');

        // 背景渐变
        const gradient = ctx.createLinearGradient(0, 0, 750, 1000);
        gradient.addColorStop(0, '#9B3B3B');
        gradient.addColorStop(0.4, '#C04851');
        gradient.addColorStop(1, '#D4A853');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 750, 1000);

        // 装饰圆
        ctx.globalAlpha = 0.08;
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(650, 150, 200, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(100, 850, 150, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;

        // 品牌标识
        ctx.fillStyle = 'rgba(255,255,255,0.7)';
        ctx.font = '16px sans-serif';
        ctx.fillText('NAN每日一句', 40, 50);

        // 引号装饰
        ctx.fillStyle = 'rgba(255,255,255,0.15)';
        ctx.font = '200px Georgia, serif';
        ctx.fillText('"', 520, 200);

        // 英文句子 - 自动换行
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 28px sans-serif';
        const lines = wrapText(ctx, s.sentence, 670, 32);
        let y = 180;
        lines.forEach(line => {
            ctx.fillText(line, 40, y);
            y += 42;
        });

        // 分隔线
        y += 20;
        ctx.strokeStyle = 'rgba(255,255,255,0.3)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(40, y);
        ctx.lineTo(200, y);
        ctx.stroke();
        y += 30;

        // 中文翻译
        ctx.fillStyle = 'rgba(255,255,255,0.9)';
        ctx.font = '22px sans-serif';
        const cnLines = wrapText(ctx, s.translation, 670, 28);
        cnLines.forEach(line => {
            ctx.fillText(line, 40, y);
            y += 34;
        });

        // 底部信息
        ctx.fillStyle = 'rgba(255,255,255,0.6)';
        ctx.font = '16px sans-serif';
        ctx.fillText(s.source + ' · ' + s.level, 40, 920);

        ctx.fillStyle = 'rgba(255,255,255,0.5)';
        ctx.font = '14px sans-serif';
        ctx.fillText('长按识别，一起学英语', 40, 960);

        // 转为图片
        const dataUrl = canvas.toDataURL('image/png');
        let html = '<div style="text-align:center;">';
        html += '<img src="' + dataUrl + '" style="max-width:100%;border-radius:12px;box-shadow:var(--shadow-lg);" />';
        html += '<p style="margin-top:12px;font-size:0.875rem;color:var(--text-muted);">长按图片保存，分享到朋友圈</p>';
        html += '</div>';
        document.getElementById('share-modal-body').innerHTML = html;
        openModal('share-modal');
    }

    function wrapText(ctx, text, maxWidth, fontSize) {
        const words = text.split('');
        const lines = [];
        let currentLine = '';
        for (let i = 0; i < words.length; i++) {
            const testLine = currentLine + words[i];
            const metrics = ctx.measureText(testLine);
            if (metrics.width > maxWidth && currentLine !== '') {
                lines.push(currentLine);
                currentLine = words[i];
            } else {
                currentLine = testLine;
            }
        }
        if (currentLine) lines.push(currentLine);
        return lines;
    }

    // ── 成就系统 ──

    const ACHIEVEMENTS = [
        { id: 'first_sentence', icon: '&#x1F331;', title: '初学者', desc: '学习第1个句子', check: () => Storage.getStats().totalSentences >= 1 },
        { id: 'ten_sentences', icon: '&#x1F33F;', title: '小有成就', desc: '学习10个句子', check: () => Storage.getStats().totalSentences >= 10 },
        { id: 'fifty_sentences', icon: '&#x1F33E;', title: '句海拾贝', desc: '学习50个句子', check: () => Storage.getStats().totalSentences >= 50 },
        { id: 'first_article', icon: '&#x1F4F0;', title: '外刊入门', desc: '阅读第1篇文章', check: () => Storage.getStats().totalArticles >= 1 },
        { id: 'ten_articles', icon: '&#x1F4DA;', title: '博览群书', desc: '阅读10篇文章', check: () => Storage.getStats().totalArticles >= 10 },
        { id: 'streak_7', icon: '&#x1F525;', title: '坚持不懈', desc: '连续打卡7天', check: () => Storage.getStreak() >= 7 },
        { id: 'streak_30', icon: '&#x1F31F;', title: '月度之星', desc: '连续打卡30天', check: () => Storage.getStreak() >= 30 },
        { id: 'vocab_50', icon: '&#x1F4D6;', title: '词汇达人', desc: '积累50个生词', check: () => Storage.getVocabCount().total >= 50 },
        { id: 'quiz_master', icon: '&#x1F3AF;', title: '测验高手', desc: '完成5次词汇测验', check: () => Storage.getQuizCount() >= 5 },
        { id: 'no_mistakes', icon: '&#x2705;', title: '零失误', desc: '错题本为空', check: () => Storage.getMistakeCount() === 0 && Storage.getStats().totalSentences >= 5 },
    ];

    function openAchievements() {
        let unlocked = 0;
        let html = '<div class="achievement-grid">';
        ACHIEVEMENTS.forEach(a => {
            const isUnlocked = a.check();
            if (isUnlocked) unlocked++;
            html += '<div class="achievement-card ' + (isUnlocked ? 'unlocked' : 'locked') + '">' +
                '<div class="achievement-icon">' + a.icon + '</div>' +
                '<div class="achievement-title">' + escapeHtml(a.title) + '</div>' +
                '<div class="achievement-desc">' + escapeHtml(a.desc) + '</div>' +
                (isUnlocked ? '<div class="achievement-badge">&#x2705;</div>' : '<div class="achievement-badge">&#x1F512;</div>') +
                '</div>';
        });
        html += '</div>';
        html = '<div class="achievement-summary">已解锁 ' + unlocked + ' / ' + ACHIEVEMENTS.length + ' 个成就</div>' + html;
        document.getElementById('achievement-modal-body').innerHTML = html;
        openModal('achievement-modal');
    }

    // ── 数据备份 ──

    function exportData() {
        const data = {
            streak: localStorage.getItem('nan_streak'),
            learning_history: localStorage.getItem('nan_learning_history'),
            favorites: localStorage.getItem('nan_favorites'),
            vocabulary: localStorage.getItem('nan_vocabulary'),
            settings: localStorage.getItem('nan_settings'),
            review_schedule: localStorage.getItem('nan_review_schedule'),
            mistakes: localStorage.getItem('nan_mistakes'),
            quiz_count: localStorage.getItem('nan_quiz_count'),
            exportDate: new Date().toISOString(),
        };
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'NAN每日一句_备份_' + new Date().toISOString().slice(0, 10) + '.json';
        a.click();
        URL.revokeObjectURL(url);
        showToast('数据已导出');
    }

    // ── 学习报告 ──

    function openReport() {
        const stats = Storage.getStats();
        const vocabCount = Storage.getVocabCount();
        const streak = Storage.getStreak();
        const calendarData = Storage.getCalendarData();
        const mistakesCount = Storage.getMistakeCount();

        // 计算近7天学习数据
        const last7Days = [];
        const today = new Date();
        for (let i = 6; i >= 0; i--) {
            const d = new Date(today);
            d.setDate(d.getDate() - i);
            const dateStr = d.toISOString().slice(0, 10);
            const dayData = calendarData[dateStr] || { sentences: 0, articles: 0 };
            last7Days.push({
                date: d.toLocaleDateString('zh-CN', { weekday: 'short' }),
                count: dayData.sentences + dayData.articles
            });
        }
        const maxCount = Math.max(...last7Days.map(d => d.count), 1);

        let html = '';

        // 总览卡片
        html += '<div class="report-overview">' +
            '<div class="report-stat">' +
            '<div class="report-stat-value">' + stats.totalSentences + '</div>' +
            '<div class="report-stat-label">已学句子</div>' +
            '</div>' +
            '<div class="report-stat">' +
            '<div class="report-stat-value">' + stats.totalArticles + '</div>' +
            '<div class="report-stat-label">已读文章</div>' +
            '</div>' +
            '<div class="report-stat">' +
            '<div class="report-stat-value">' + vocabCount.total + '</div>' +
            '<div class="report-stat-label">生词积累</div>' +
            '</div>' +
            '<div class="report-stat">' +
            '<div class="report-stat-value">' + streak + '</div>' +
            '<div class="report-stat-label">连续天数</div>' +
            '</div>' +
            '</div>';

        // 近7天柱状图
        html += '<h3 style="margin:24px 0 12px;">近7天学习量</h3>';
        html += '<div class="report-chart">';
        last7Days.forEach(d => {
            const height = Math.round(d.count / maxCount * 100);
            html += '<div class="report-bar-group">' +
                '<div class="report-bar" style="height:' + Math.max(height, 4) + '%;">' +
                (d.count > 0 ? '<span class="report-bar-value">' + d.count + '</span>' : '') +
                '</div>' +
                '<div class="report-bar-label">' + d.date + '</div>' +
                '</div>';
        });
        html += '</div>';

        // 学习建议
        html += '<h3 style="margin:24px 0 12px;">学习建议</h3>';
        html += '<div class="report-tips">';
        if (stats.totalSentences < 10) {
            html += '<div class="report-tip">&#x1F4A1; 刚刚开始学习，每天坚持学2-3个句子，养成习惯最重要！</div>';
        } else if (stats.totalSentences < 30) {
            html += '<div class="report-tip">&#x1F4A1; 已经有不错的基础了！可以开始尝试听写和填空练习。</div>';
        } else if (stats.totalSentences < 50) {
            html += '<div class="report-tip">&#x1F4A1; 学习进展很好！建议定期使用错题本复习薄弱环节。</div>';
        } else {
            html += '<div class="report-tip">&#x1F4A1; 太棒了！可以挑战更高难度的句子和写作模板了。</div>';
        }
        if (vocabCount.total > 0 && vocabCount.mastered < vocabCount.total * 0.5) {
            html += '<div class="report-tip">&#x1F4DA; 生词本有 ' + vocabCount.learning + ' 个词待掌握，建议每天复习5-10个。</div>';
        }
        if (mistakesCount > 0) {
            html += '<div class="report-tip">&#x2757; 错题本有 ' + mistakesCount + ' 道题，抽时间回顾一下吧。</div>';
        }
        html += '</div>';

        document.getElementById('report-modal-body').innerHTML = html;
        openModal('report-modal');
    }

    function checkIn() {
        const count = Storage.checkIn();
        document.getElementById('streak-count').textContent = count;
        const btn = document.getElementById('btn-checkin');
        btn.textContent = '已打卡';
        btn.classList.add('checked');
        showToast('🎉 打卡成功！连续 ' + count + ' 天');
        showFireworks();
    }

    function showFireworks() {
        const container = document.createElement('div');
        container.className = 'firework-container';
        document.body.appendChild(container);

        const colors = ['#C04851', '#D4A853', '#5B8C6F', '#2B5B8A', '#7B4A7D', '#E8C97A'];
        const emojis = ['&#x2B50;', '&#x1F389;', '&#x1F388;', '&#x2728;', '&#x1F4AB;'];

        // 创建粒子
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.className = 'firework-particle';
            const angle = (Math.random() * 360) * Math.PI / 180;
            const distance = 60 + Math.random() * 100;
            const tx = Math.cos(angle) * distance;
            const ty = Math.sin(angle) * distance;
            particle.style.cssText =
                'left:' + (50 + Math.random() * 20 - 10) + '%;' +
                'top:' + (40 + Math.random() * 20 - 10) + '%;' +
                'background:' + colors[Math.floor(Math.random() * colors.length)] + ';' +
                '--tx:' + tx + 'px;--ty:' + ty + 'px;' +
                'animation-delay:' + (Math.random() * 0.3) + 's;';
            container.appendChild(particle);
        }

        // 创建表情
        for (let i = 0; i < 8; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'firework-sparkle';
            sparkle.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
            sparkle.style.cssText =
                'left:' + (20 + Math.random() * 60) + '%;' +
                'top:' + (30 + Math.random() * 30) + '%;' +
                'animation-delay:' + (Math.random() * 0.5) + 's;';
            container.appendChild(sparkle);
        }

        setTimeout(() => container.remove(), 2000);
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

    // ── 搜索功能 ──

    function searchSentences(keyword) {
        const clearBtn = document.getElementById('sentence-search-clear');
        if (clearBtn) clearBtn.style.display = keyword ? 'flex' : 'none';
        if (!keyword.trim()) {
            filterSentences(currentFilter);
            return;
        }
        const kw = keyword.toLowerCase().trim();
        let list = SENTENCES;
        if (currentFilter === 'fav') {
            const favIds = Storage.getFavoriteSentences();
            list = SENTENCES.filter(s => favIds.includes(s.id));
        } else if (currentFilter !== 'all') {
            list = SENTENCES.filter(s => s.level === currentFilter);
        }
        list = list.filter(s =>
            s.sentence.toLowerCase().includes(kw) ||
            s.translation.toLowerCase().includes(kw) ||
            (s.source && s.source.toLowerCase().includes(kw)) ||
            (s.tags && s.tags.some(t => t.toLowerCase().includes(kw)))
        );
        renderSentenceList(list);
    }

    function clearSentenceSearch() {
        document.getElementById('sentence-search').value = '';
        document.getElementById('sentence-search-clear').style.display = 'none';
        filterSentences(currentFilter);
    }

    function searchArticles(keyword) {
        const clearBtn = document.getElementById('article-search-clear');
        if (clearBtn) clearBtn.style.display = keyword ? 'flex' : 'none';
        if (!keyword.trim()) {
            filterArticles(currentArticleFilter);
            return;
        }
        const kw = keyword.toLowerCase().trim();
        let list = ARTICLES;
        if (currentArticleFilter !== 'all') {
            list = ARTICLES.filter(a => a.level === currentArticleFilter);
        }
        list = list.filter(a =>
            a.title.toLowerCase().includes(kw) ||
            a.summary.toLowerCase().includes(kw) ||
            (a.source && a.source.toLowerCase().includes(kw)) ||
            a.paragraphs.some(p => p.en.toLowerCase().includes(kw) || p.cn.toLowerCase().includes(kw))
        );
        renderArticleList(list);
    }

    function clearArticleSearch() {
        document.getElementById('article-search').value = '';
        document.getElementById('article-search-clear').style.display = 'none';
        filterArticles(currentArticleFilter);
    }

    // ── 词汇测验 ──

    let quizState = { questions: [], current: 0, score: 0, total: 0 };

    function openQuiz() {
        const vocab = Storage.getVocabulary();
        if (vocab.length < 4) {
            showToast('生词本至少需要4个词才能开始测验');
            return;
        }
        generateQuizQuestions(vocab);
        quizState.current = 0;
        quizState.score = 0;
        renderQuizQuestion();
        openModal('quiz-modal');
    }

    function generateQuizQuestions(vocab) {
        const shuffled = [...vocab].sort(() => Math.random() - 0.5);
        const count = Math.min(10, shuffled.length);
        quizState.total = count;
        quizState.questions = shuffled.slice(0, count).map(w => {
            const wrongItems = vocab
                .filter(v => v.word !== w.word)
                .sort(() => Math.random() - 0.5)
                .slice(0, 3);
            const allItems = [{ word: w.word, definition: w.definition, isCorrect: true },
                ...wrongItems.map(v => ({ word: v.word, definition: v.definition, isCorrect: false }))
            ].sort(() => Math.random() - 0.5);
            const options = allItems.map(i => i.definition);
            const optionWords = allItems.map(i => i.word);
            const correctIdx = options.indexOf(w.definition);
            // 为每个选项生成解释
            const explanations = allItems.map(i => {
                if (i.isCorrect) {
                    return '✅ 这是 <strong>' + escapeHtml(w.word) + '</strong> 的正确释义。' + escapeHtml(w.word) + ' 意为「' + escapeHtml(w.definition) + '」';
                } else {
                    return '❌ 这是 <strong>' + escapeHtml(i.word) + '</strong> 的释义，不是 ' + escapeHtml(w.word) + '。';
                }
            });
            return { word: w.word, options, optionWords, correct: correctIdx, explanations };
        });
    }

    function renderQuizQuestion() {
        const q = quizState.questions[quizState.current];
        if (!q) {
            renderQuizResult();
            return;
        }
        const progress = ((quizState.current) / quizState.total * 100).toFixed(0);
        let html = '<div class="quiz-progress-bar"><div class="quiz-progress-fill" style="width:' + progress + '%"></div></div>';
        html += '<div class="quiz-score">第 ' + (quizState.current + 1) + ' / ' + quizState.total + ' 题</div>';
        html += '<div class="quiz-word-display">' + escapeHtml(q.word) + '</div>';
        html += '<div class="quiz-hint">选择正确的释义：</div>';
        const labels = ['A', 'B', 'C', 'D'];
        q.options.forEach((opt, idx) => {
            html += '<div class="quiz-option" onclick="App.answerQuiz(' + idx + ')">' +
                '<span class="quiz-option-label">' + labels[idx] + '.</span>' +
                '<span>' + escapeHtml(opt) + '</span></div>';
        });
        html += '<div id="quiz-feedback"></div>';
        document.getElementById('quiz-modal-body').innerHTML = html;
    }

    function answerQuiz(idx) {
        const q = quizState.questions[quizState.current];
        const options = document.querySelectorAll('#quiz-modal-body .quiz-option');
        const labels = ['A', 'B', 'C', 'D'];
        options.forEach(el => el.style.pointerEvents = 'none');

        // 获取词汇详细信息
        const vocab = Storage.getVocabulary();
        const wordInfo = vocab.find(w => w.word.toLowerCase() === q.word.toLowerCase());

        const isCorrect = idx === q.correct;
        if (isCorrect) quizState.score++;

        // 标记正确/错误选项样式
        options[idx].classList.add(isCorrect ? 'correct' : 'wrong');
        if (!isCorrect) options[q.correct].classList.add('correct');

        // 构建反馈
        let feedback = '';
        feedback += '<div class="quiz-result ' + (isCorrect ? 'correct' : 'wrong') + '">';
        feedback += isCorrect ? '&#x2705; 正确！' : '&#x274C; 错误！正确答案是 ' + labels[q.correct];
        feedback += '</div>';

        // 词汇详情
        feedback += '<div class="quiz-explanation">';
        feedback += '<div class="quiz-word-detail">';
        feedback += '<div class="quiz-word-title">' + escapeHtml(q.word) + '</div>';
        feedback += '<div class="quiz-word-meaning">' + escapeHtml(q.options[q.correct]) + '</div>';
        if (!isCorrect) {
            feedback += '<div class="quiz-word-your-answer">你的选择：' + escapeHtml(q.options[idx]) + '</div>';
        }
        if (wordInfo) {
            feedback += '<div class="quiz-word-meta">出现 ' + wordInfo.count + ' 次 · ' + (wordInfo.mastered ? '已掌握' : '学习中') + '</div>';
        }
        feedback += '</div>';

        // 每个选项的解释
        feedback += '<div class="quiz-options-review">';
        feedback += '<div class="quiz-options-review-title">&#x1F4D6; 选项解析</div>';
        q.options.forEach((opt, i) => {
            let optCls = 'quiz-option-review';
            let badge = '';
            if (i === q.correct) {
                optCls += ' quiz-option-review-correct';
                badge = '<span class="quiz-option-badge quiz-option-badge-correct">✓ 正确</span>';
            } else if (i === idx) {
                optCls += ' quiz-option-review-wrong';
                badge = '<span class="quiz-option-badge quiz-option-badge-wrong">✗ 你的选择</span>';
            }
            feedback += '<div class="' + optCls + '">';
            feedback += '<div class="quiz-option-review-header">';
            feedback += '<span class="quiz-option-review-label">' + labels[i] + '.</span>';
            feedback += '<span class="quiz-option-review-word">' + escapeHtml(q.options[i]) + '</span>';
            feedback += badge;
            feedback += '</div>';
            feedback += '<div class="quiz-option-review-explain">' + q.explanations[i] + '</div>';
            feedback += '</div>';
        });
        feedback += '</div>';

        feedback += '</div>';

        // 举一反三
        feedback += '<div id="quiz-similar-area"></div>';

        document.getElementById('quiz-feedback').innerHTML = feedback;

        // 添加举一反三
        setTimeout(() => {
            generateSimilarQuiz(q.word);
        }, 500);
    }

    function generateSimilarQuiz(word) {
        const vocab = Storage.getVocabulary();
        const currentWord = vocab.find(w => w.word.toLowerCase() === word.toLowerCase());
        if (!currentWord) return;

        // 找相似的词（同词性或相近含义）
        const similarWords = vocab.filter(w =>
            w.word.toLowerCase() !== word.toLowerCase() &&
            w.definition.includes(currentWord.definition.slice(0, 2))
        ).slice(0, 2);

        if (similarWords.length === 0) return;

        let html = '<div class="quiz-similar">';
        html += '<div class="quiz-similar-title">&#x1F504; 举一反三</div>';
        html += '<div class="quiz-similar-desc">看看这些相关的词：</div>';

        similarWords.forEach(w => {
            html += '<div class="quiz-similar-item">';
            html += '<div class="quiz-similar-word">' + escapeHtml(w.word) + '</div>';
            html += '<div class="quiz-similar-meaning">' + escapeHtml(w.definition) + '</div>';
            html += '</div>';
        });

        html += '</div>';
        var similarArea = document.getElementById('quiz-similar-area');
        if (similarArea) similarArea.innerHTML = html;
    }

    function renderQuizResult() {
        Storage.incrementQuizCount();
        const percent = Math.round(quizState.score / quizState.total * 100);
        let emoji = '&#x1F389;';
        let msg = '太棒了！';
        if (percent < 60) { emoji = '&#x1F4AA;'; msg = '继续加油！'; }
        else if (percent < 80) { emoji = '&#x1F44D;'; msg = '不错！'; }
        let html = '<div class="quiz-result-screen">' +
            '<div class="quiz-result-emoji">' + emoji + '</div>' +
            '<div class="quiz-result-msg">' + msg + '</div>' +
            '<div class="quiz-result-score">' + quizState.score + ' / ' + quizState.total + '</div>' +
            '<div class="quiz-result-percent">正确率 ' + percent + '%</div>' +
            '<button class="btn btn-primary" onclick="App.openQuiz()" style="margin-top:20px;">再来一轮</button>' +
            '</div>';
        document.getElementById('quiz-modal-body').innerHTML = html;
    }

    // ── 听写模式 ──

    let dictationState = { sentences: [], current: 0, score: 0, total: 0 };

    function openDictation() {
        const learned = Storage.getStats().totalSentences;
        if (learned < 3) {
            showToast('至少需要学习3个句子才能开始听写');
            return;
        }
        const learnedIds = [];
        for (let i = 0; i < SENTENCES.length; i++) {
            if (Storage.hasLearnedSentence(SENTENCES[i].id)) learnedIds.push(SENTENCES[i]);
        }
        const shuffled = learnedIds.sort(() => Math.random() - 0.5);
        dictationState.sentences = shuffled.slice(0, Math.min(5, shuffled.length));
        dictationState.current = 0;
        dictationState.score = 0;
        dictationState.total = dictationState.sentences.length;
        renderDictationQuestion();
        openModal('dictation-modal');
    }

    function renderDictationQuestion() {
        if (dictationState.current >= dictationState.total) {
            renderDictationResult();
            return;
        }
        const s = dictationState.sentences[dictationState.current];
        const progress = (dictationState.current / dictationState.total * 100).toFixed(0);
        let html = '<div class="quiz-progress-bar"><div class="quiz-progress-fill" style="width:' + progress + '%"></div></div>';
        html += '<div class="quiz-score">第 ' + (dictationState.current + 1) + ' / ' + dictationState.total + ' 题</div>';
        html += '<div style="text-align:center;margin-bottom:16px;">' +
            '<button class="btn btn-primary" onclick="App.playDictationAudio()">&#x1F50A; 播放句子</button>' +
            '</div>';
        html += '<div style="margin-bottom:12px;font-size:0.875rem;color:var(--text-muted);">请听录音，输入你听到的句子：</div>';
        html += '<textarea id="dictation-input" class="dictation-input" rows="4" placeholder="在这里输入..."></textarea>';
        html += '<div id="dictation-hint" style="margin-top:8px;font-size:0.8125rem;color:var(--text-muted);">提示：点击上方按钮可重复播放</div>';
        html += '<div style="margin-top:16px;text-align:center;">' +
            '<button class="btn btn-primary" onclick="App.checkDictation()">提交答案</button>' +
            '</div>';
        html += '<div id="dictation-result"></div>';
        document.getElementById('dictation-modal-body').innerHTML = html;
    }

    function playDictationAudio() {
        const s = dictationState.sentences[dictationState.current];
        speak(s.sentence);
    }

    function checkDictation() {
        const s = dictationState.sentences[dictationState.current];
        const input = document.getElementById('dictation-input').value.trim();
        if (!input) {
            showToast('请输入你听到的句子');
            return;
        }
        const correct = s.sentence.toLowerCase().replace(/[.,!?;:'"]/g, '').trim();
        const user = input.toLowerCase().replace(/[.,!?;:'"]/g, '').trim();
        const similarity = calculateSimilarity(user, correct);
        const isCorrect = similarity > 0.8;
        if (isCorrect) dictationState.score++;

        let html = '<div style="margin-top:16px;">';
        html += '<div class="dictation-compare">';
        html += '<div class="dictation-label">正确答案：</div>';
        html += '<div class="dictation-correct">' + escapeHtml(s.sentence) + '</div>';
        html += '<div class="dictation-label" style="margin-top:12px;">你的答案：</div>';
        html += '<div class="dictation-user">' + highlightDiff(input, s.sentence) + '</div>';
        html += '</div>';

        // 详细解释
        html += '<div class="dictation-explanation">';
        html += '<div class="dictation-explanation-title">&#x1F4D6; 句子解析</div>';
        html += '<div class="dictation-translation"><strong>翻译：</strong>' + escapeHtml(s.translation) + '</div>';

        // 语法分析
        if (s.grammar) {
            if (s.grammar.main) {
                html += '<div class="dictation-grammar">';
                html += '<div class="dictation-grammar-label">句子主干</div>';
                html += '<div class="dictation-grammar-text">' + escapeHtml(s.grammar.main.text) + '</div>';
                html += '<div class="dictation-grammar-desc">' + escapeHtml(s.grammar.main.desc) + '</div>';
                html += '</div>';
            }

            if (s.grammar.clauses && s.grammar.clauses.length > 0) {
                html += '<div class="dictation-grammar">';
                html += '<div class="dictation-grammar-label">从句分析</div>';
                s.grammar.clauses.forEach(clause => {
                    html += '<div class="dictation-clause">';
                    html += '<div class="dictation-clause-type">' + escapeHtml(clause.type) + '</div>';
                    html += '<div class="dictation-clause-text">' + escapeHtml(clause.text) + '</div>';
                    html += '<div class="dictation-clause-desc">' + escapeHtml(clause.desc) + '</div>';
                    html += '</div>';
                });
                html += '</div>';
            }

            // 关键词
            if (s.grammar.keywords && s.grammar.keywords.length > 0) {
                html += '<div class="dictation-keywords">';
                html += '<div class="dictation-grammar-label">关键词</div>';
                html += '<div class="dictation-keyword-list">';
                s.grammar.keywords.forEach(kw => {
                    const word = typeof kw === 'string' ? kw : kw.word;
                    html += '<span class="dictation-keyword">' + escapeHtml(word) + '</span>';
                });
                html += '</div></div>';
            }

            // 语法点
            if (s.grammar.grammarPoints && s.grammar.grammarPoints.length > 0) {
                html += '<div class="dictation-grammar-points">';
                html += '<div class="dictation-grammar-label">&#x1F4DA; 语法要点</div>';
                s.grammar.grammarPoints.forEach(gp => {
                    html += '<div class="dictation-grammar-point">' + escapeHtml(gp) + '</div>';
                });
                html += '</div>';
            }
        }

        // 听力技巧
        html += '<div class="dictation-tip">';
        html += '<div class="dictation-tip-title">&#x1F442; 听力技巧</div>';
        html += '<div class="dictation-tip-text">注意连读、弱读和重音。多听几遍，先抓住主干词汇，再补充细节。</div>';
        html += '</div>';

        html += '</div>';

        html += '<div style="text-align:center;margin-top:16px;">';
        if (isCorrect) {
            html += '<div class="quiz-result correct">&#x2705; 正确！相似度 ' + Math.round(similarity * 100) + '%</div>';
        } else {
            html += '<div class="quiz-result wrong">&#x274C; 需要改进！相似度 ' + Math.round(similarity * 100) + '%</div>';
        }
        html += '<button class="btn btn-primary" style="margin-top:12px;" onclick="App.nextDictation()">下一题</button>';
        html += '</div></div>';
        document.getElementById('dictation-result').innerHTML = html;
        document.getElementById('dictation-input').disabled = true;
    }

    function nextDictation() {
        dictationState.current++;
        renderDictationQuestion();
    }

    function highlightDiff(user, correct) {
        const userWords = user.toLowerCase().replace(/[.,!?;:'"]/g, '').split(/\s+/);
        const correctWords = correct.toLowerCase().replace(/[.,!?;:'"]/g, '').split(/\s+/);
        let result = [];
        for (let i = 0; i < correctWords.length; i++) {
            if (i < userWords.length && userWords[i] === correctWords[i]) {
                result.push('<span style="color:var(--success);">' + escapeHtml(correctWords[i]) + '</span>');
            } else {
                result.push('<span style="color:var(--danger);text-decoration:underline;">' + escapeHtml(correctWords[i]) + '</span>');
            }
        }
        return result.join(' ');
    }

    function calculateSimilarity(s1, s2) {
        const longer = s1.length > s2.length ? s1 : s2;
        const shorter = s1.length > s2.length ? s2 : s1;
        if (longer.length === 0) return 1.0;
        const costs = [];
        for (let i = 0; i <= shorter.length; i++) {
            let lastValue = i;
            for (let j = 0; j <= longer.length; j++) {
                if (i === 0) costs[j] = j;
                else if (j > 0) {
                    let newValue = costs[j - 1];
                    if (shorter[i - 1] !== longer[j - 1]) newValue = Math.min(newValue, lastValue, costs[j]) + 1;
                    costs[j - 1] = lastValue;
                    lastValue = newValue;
                }
            }
            if (i > 0) costs[longer.length] = lastValue;
        }
        return (longer.length - costs[longer.length]) / longer.length;
    }

    function renderDictationResult() {
        const percent = Math.round(dictationState.score / dictationState.total * 100);
        let emoji = '&#x1F389;';
        let msg = '听写完成！';
        if (percent < 60) { emoji = '&#x1F4AA;'; msg = '多听多练！'; }
        else if (percent < 80) { emoji = '&#x1F44D;'; msg = '不错！'; }
        let html = '<div class="quiz-result-screen">' +
            '<div class="quiz-result-emoji">' + emoji + '</div>' +
            '<div class="quiz-result-msg">' + msg + '</div>' +
            '<div class="quiz-result-score">' + dictationState.score + ' / ' + dictationState.total + '</div>' +
            '<div class="quiz-result-percent">正确率 ' + percent + '%</div>' +
            '<button class="btn btn-primary" onclick="App.openDictation()" style="margin-top:20px;">再来一轮</button>' +
            '</div>';
        document.getElementById('dictation-modal-body').innerHTML = html;
    }

    // ── 填空练习 ──

    let clozeState = { questions: [], current: 0, score: 0, total: 0 };

    function openCloze() {
        const learned = Storage.getStats().totalSentences;
        if (learned < 3) {
            showToast('至少需要学习3个句子才能开始填空练习');
            return;
        }
        const learnedIds = [];
        for (let i = 0; i < SENTENCES.length; i++) {
            if (Storage.hasLearnedSentence(SENTENCES[i].id)) learnedIds.push(SENTENCES[i]);
        }
        const shuffled = learnedIds.sort(() => Math.random() - 0.5);
        const selected = shuffled.slice(0, Math.min(5, shuffled.length));
        clozeState.questions = selected.map(s => generateClozeQuestion(s));
        clozeState.current = 0;
        clozeState.score = 0;
        clozeState.total = clozeState.questions.length;
        renderClozeQuestion();
        openModal('cloze-modal');
    }

    function generateClozeQuestion(sentence) {
        const words = sentence.sentence.split(/\s+/);
        const keywords = [];
        if (sentence.grammar && sentence.grammar.keywords) {
            sentence.grammar.keywords.forEach(kw => {
                const word = typeof kw === 'string' ? kw : kw.word;
                keywords.push(word.toLowerCase());
            });
        }
        const blankIndices = [];
        words.forEach((w, idx) => {
            const clean = w.toLowerCase().replace(/[^a-z]/g, '');
            if (keywords.includes(clean) && clean.length > 3) blankIndices.push(idx);
        });
        if (blankIndices.length === 0) {
            const mid = Math.floor(words.length / 2);
            blankIndices.push(mid);
        }
        const blankIdx = blankIndices[Math.floor(Math.random() * blankIndices.length)];
        const correctWord = words[blankIdx].replace(/[^a-zA-Z'-]/g, '');
        const otherWords = words.filter((w, i) => i !== blankIdx && w.replace(/[^a-zA-Z'-]/g, '').length > 3);
        const distractors = otherWords.sort(() => Math.random() - 0.5).slice(0, 3);
        const options = [correctWord, ...distractors.map(w => w.replace(/[^a-zA-Z'-]/g, ''))].sort(() => Math.random() - 0.5);
        return {
            sentence: sentence.sentence,
            translation: sentence.translation,
            blankIndex: blankIdx,
            correctWord,
            options,
            words
        };
    }

    function renderClozeQuestion() {
        if (clozeState.current >= clozeState.total) {
            renderClozeResult();
            return;
        }
        const q = clozeState.questions[clozeState.current];
        const progress = (clozeState.current / clozeState.total * 100).toFixed(0);
        let html = '<div class="quiz-progress-bar"><div class="quiz-progress-fill" style="width:' + progress + '%"></div></div>';
        html += '<div class="quiz-score">第 ' + (clozeState.current + 1) + ' / ' + clozeState.total + ' 题</div>';
        html += '<div class="cloze-sentence">';
        q.words.forEach((w, idx) => {
            if (idx === q.blankIndex) {
                html += '<span class="cloze-blank" id="cloze-blank">____</span> ';
            } else {
                html += escapeHtml(w) + ' ';
            }
        });
        html += '</div>';
        html += '<div class="cloze-translation">' + escapeHtml(q.translation) + '</div>';
        html += '<div class="cloze-hint">选择正确的单词填入空白处：</div>';
        html += '<div class="cloze-options">';
        q.options.forEach((opt, idx) => {
            html += '<button class="cloze-option-btn" onclick="App.selectClozeOption(this,\'' + escapeJs(opt) + '\',\'' + escapeJs(q.correctWord) + '\')">' + escapeHtml(opt) + '</button>';
        });
        html += '</div>';
        html += '<div id="cloze-feedback"></div>';
        document.getElementById('cloze-modal-body').innerHTML = html;
    }

    function selectClozeOption(btn, selected, correct) {
        const options = document.querySelectorAll('.cloze-option-btn');
        options.forEach(el => el.disabled = true);
        const blank = document.getElementById('cloze-blank');

        // 获取当前句子信息
        const q = clozeState.questions[clozeState.current];
        const sentence = SENTENCES.find(s => s.sentence === q.sentence);

        if (selected.toLowerCase() === correct.toLowerCase()) {
            clozeState.score++;
            blank.innerHTML = escapeHtml(correct);
            blank.style.color = 'var(--success)';
            blank.style.borderBottomColor = 'var(--success)';
            btn.style.background = 'var(--success)';
            btn.style.color = 'white';
            let feedback = '<div class="quiz-result correct" style="margin-top:12px;">&#x2705; 正确！</div>';

            // 添加详细解释
            if (sentence) {
                feedback += '<div class="cloze-explanation">';
                feedback += '<div class="cloze-explanation-title">&#x1F4D6; 解析</div>';
                feedback += '<div class="cloze-full-sentence"><strong>完整句子：</strong>' + escapeHtml(sentence.sentence) + '</div>';
                feedback += '<div class="cloze-translation"><strong>翻译：</strong>' + escapeHtml(sentence.translation) + '</div>';

                // 语法分析
                if (sentence.grammar && sentence.grammar.grammarPoints) {
                    feedback += '<div class="cloze-grammar">';
                    feedback += '<div class="cloze-grammar-label">&#x1F4DA; 涉及语法</div>';
                    sentence.grammar.grammarPoints.forEach(gp => {
                        feedback += '<div class="cloze-grammar-point">' + escapeHtml(gp) + '</div>';
                    });
                    feedback += '</div>';
                }

                feedback += '<div class="cloze-tip">&#x1F4A1; 理解句子结构有助于快速选词填空</div>';
                feedback += '</div>';
            }

            document.getElementById('cloze-feedback').innerHTML = feedback;
        } else {
            blank.innerHTML = escapeHtml(correct);
            blank.style.color = 'var(--danger)';
            blank.style.borderBottomColor = 'var(--danger)';
            btn.style.background = 'var(--danger)';
            btn.style.color = 'white';
            options.forEach(el => {
                if (el.textContent === correct) {
                    el.style.background = 'var(--success)';
                    el.style.color = 'white';
                }
            });
            let feedback = '<div class="quiz-result wrong" style="margin-top:12px;">&#x274C; 正确答案是 ' + escapeHtml(correct) + '</div>';

            // 添加详细解释
            if (sentence) {
                feedback += '<div class="cloze-explanation">';
                feedback += '<div class="cloze-explanation-title">&#x1F4D6; 解析</div>';
                feedback += '<div class="cloze-full-sentence"><strong>完整句子：</strong>' + escapeHtml(sentence.sentence) + '</div>';
                feedback += '<div class="cloze-translation"><strong>翻译：</strong>' + escapeHtml(sentence.translation) + '</div>';
                feedback += '<div class="cloze-your-answer">你的选择：' + escapeHtml(selected) + '</div>';

                // 语法分析
                if (sentence.grammar && sentence.grammar.grammarPoints) {
                    feedback += '<div class="cloze-grammar">';
                    feedback += '<div class="cloze-grammar-label">&#x1F4DA; 涉及语法</div>';
                    sentence.grammar.grammarPoints.forEach(gp => {
                        feedback += '<div class="cloze-grammar-point">' + escapeHtml(gp) + '</div>';
                    });
                    feedback += '</div>';
                }

                // 关键词提示
                if (sentence.grammar && sentence.grammar.keywords) {
                    feedback += '<div class="cloze-keywords">';
                    feedback += '<div class="cloze-grammar-label">&#x1F511; 关键词</div>';
                    feedback += '<div class="cloze-keyword-list">';
                    sentence.grammar.keywords.forEach(kw => {
                        const word = typeof kw === 'string' ? kw : kw.word;
                        feedback += '<span class="cloze-keyword">' + escapeHtml(word) + '</span>';
                    });
                    feedback += '</div></div>';
                }

                feedback += '<div class="cloze-tip">&#x1F4A1; 仔细分析句子成分，找出缺失的词性</div>';
                feedback += '</div>';
            }

            document.getElementById('cloze-feedback').innerHTML = feedback;
        }
        setTimeout(() => {
            clozeState.current++;
            renderClozeQuestion();
        }, 3000);
    }

    function renderClozeResult() {
        const percent = Math.round(clozeState.score / clozeState.total * 100);
        let emoji = '&#x1F389;';
        let msg = '填空完成！';
        if (percent < 60) { emoji = '&#x1F4AA;'; msg = '继续加油！'; }
        else if (percent < 80) { emoji = '&#x1F44D;'; msg = '不错！'; }
        let html = '<div class="quiz-result-screen">' +
            '<div class="quiz-result-emoji">' + emoji + '</div>' +
            '<div class="quiz-result-msg">' + msg + '</div>' +
            '<div class="quiz-result-score">' + clozeState.score + ' / ' + clozeState.total + '</div>' +
            '<div class="quiz-result-percent">正确率 ' + percent + '%</div>' +
            '<button class="btn btn-primary" onclick="App.openCloze()" style="margin-top:20px;">再来一轮</button>' +
            '</div>';
        document.getElementById('cloze-modal-body').innerHTML = html;
    }

    // ── 错题本 ──

    function openMistakes() {
        const mistakes = Storage.getMistakes();
        let html = '';
        if (mistakes.length === 0) {
            html = '<div class="empty-state">' +
                '<div class="empty-state-icon">&#x2705;</div>' +
                '<div class="empty-state-text">暂无错题<br>继续保持！</div>' +
                '</div>';
        } else {
            html += '<div style="margin-bottom:16px;display:flex;justify-content:space-between;align-items:center;">' +
                '<span style="font-size:0.875rem;color:var(--text-muted);">共 ' + mistakes.length + ' 道错题</span>' +
                '<button class="btn btn-sm btn-outline" onclick="App.clearAllMistakes()" style="color:var(--danger);border-color:var(--danger);">清空</button>' +
                '</div>';
            mistakes.forEach((m, idx) => {
                const typeLabel = m.type === 'quiz' ? '&#x1F3AF; 词汇' : m.type === 'dictation' ? '&#x1F3A4; 听写' : '&#x270D;&#xFE0F; 填空';
                html += '<div class="mistake-card">' +
                    '<div class="mistake-type">' + typeLabel + '</div>' +
                    '<div class="mistake-question">' + escapeHtml(m.question) + '</div>' +
                    '<div class="mistake-answers">' +
                    '<div class="mistake-your-answer">&#x274C; 你的答案：' + escapeHtml(m.answer) + '</div>' +
                    '<div class="mistake-correct-answer">&#x2705; 正确答案：' + escapeHtml(m.correctAnswer) + '</div>' +
                    '</div>' +
                    '<div class="mistake-meta">错误 ' + m.count + ' 次 · ' + m.addedDate + '</div>' +
                    '<button class="btn btn-sm btn-ghost" onclick="App.removeMistake(' + idx + ')" style="color:var(--text-muted);margin-top:8px;">&#x1F5D1; 移除</button>' +
                    '</div>';
            });
        }
        document.getElementById('mistakes-modal-body').innerHTML = html;
        openModal('mistakes-modal');
    }

    function removeMistake(idx) {
        Storage.removeMistake(idx);
        openMistakes();
        showToast('已移除');
    }

    function clearAllMistakes() {
        if (confirm('确定清空所有错题吗？')) {
            Storage.clearMistakes();
            openMistakes();
            showToast('错题已清空');
        }
    }

    // ── 句子详情 ──

    function openSentenceDetail(id) {
        const s = SENTENCES.find(x => x.id === id);
        if (!s) return;
        Storage.recordSentence(id);
        Storage.scheduleReview(id);

        const g = s.grammar;
        let html = '';

        // 原句
        html += '<div class="detail-sentence">' + escapeHtml(s.sentence) + '</div>';

        // 翻译
        html += '<div class="detail-translation">' + escapeHtml(s.translation) + '</div>';

        // 朗读和分享按钮
        html += '<div style="margin-bottom:20px;display:flex;gap:8px;">' +
            '<button class="audio-btn" onclick="App.speak(\'' + escapeJs(s.sentence) + '\')">&#x1F50A; 朗读句子</button>' +
            '<button class="audio-btn" onclick="App.generateShareCard(' + s.id + ')" style="background:var(--accent);">&#x1F4F7; 生成卡片</button>' +
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

            // 计算阅读时间（约200词/分钟）
            let totalWords = 0;
            a.paragraphs.forEach(p => {
                totalWords += p.en.split(/\s+/).length;
            });
            const readTime = Math.max(1, Math.ceil(totalWords / 200));

            // 难度标识
            let difficultyIcon = '&#x1F4D6;';
            let difficultyText = '入门';
            if (a.level === '六级' || a.level === '考研') {
                difficultyIcon = '&#x1F4DA;';
                difficultyText = '进阶';
            } else if (a.level === '雅思' || a.level === '托福') {
                difficultyIcon = '&#x1F393;';
                difficultyText = '高级';
            }

            html +=
                '<div class="article-card" onclick="App.openArticleDetail(' + a.id + ')">' +
                '  <div class="article-card-header">' +
                '    <div class="article-card-title">' + escapeHtml(a.title) + '</div>' +
                '    <button class="fav-btn ' + (isFav ? 'active' : '') + '" onclick="event.stopPropagation();App.toggleFavArticle(' + a.id + ',this)">' +
                (isFav ? '&#x2764;&#xFE0F;' : '&#x1F90D;') +
                '    </button>' +
                '  </div>' +
                '  <div class="article-card-summary">' + escapeHtml(a.summary) + '</div>' +
                '  <div class="article-card-meta">' +
                '    <span class="article-read-time">&#x23F1; ' + readTime + '分钟</span>' +
                '    <span class="article-difficulty">' + difficultyIcon + ' ' + difficultyText + '</span>' +
                '  </div>' +
                '  <div class="article-card-footer">' +
                '    <div style="display:flex;gap:6px;flex-wrap:wrap;">' +
                '      <span class="tag tag-level">' + a.level + '</span>' +
                '      <span class="tag tag-source">' + (a.source || '') + '</span>' +
                (learned ? '<span class="tag tag-success">&#x2713; 已读</span>' : '') +
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
        tooltipEl.style.visibility = 'hidden';
        document.body.appendChild(tooltipEl);

        const rect = el.getBoundingClientRect();
        const tw = tooltipEl.offsetWidth;
        const th = tooltipEl.offsetHeight;
        tooltipEl.style.left = (rect.left + rect.width / 2 - tw / 2) + 'px';
        tooltipEl.style.top = (rect.top - th - 10) + 'px';
        tooltipEl.style.visibility = '';

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
                '<div style="display:flex;gap:8px;">' +
                '<button class="btn btn-sm btn-outline" onclick="App.closeThenOpen(\'vocab-modal\');App.openQuiz()">&#x1F3AF; 测验</button>' +
                '<button class="btn btn-sm btn-outline" onclick="App.speakVocabAll()">&#x1F50A; 朗读</button>' +
                '</div>' +
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

    // ── 主题库 ──

    const PRESET_THEMES = [
        {
            id: 'default',
            name: '朱砂红（默认）',
            icon: '&#x1F33F;',
            colors: {
                primary: '#C04851',
                primaryLight: '#D4696E',
                accent: '#D4A853',
                bg: '#F5F1EB',
                card: 'rgba(255, 255, 255, 0.75)'
            },
            bgImage: ''
        },
        {
            id: 'ocean',
            name: '靛青海洋',
            icon: '&#x1F30A;',
            colors: {
                primary: '#2B5B8A',
                primaryLight: '#4A8BC2',
                accent: '#5B8C6F',
                bg: '#EDF2F7',
                card: 'rgba(255, 255, 255, 0.8)'
            },
            bgImage: ''
        },
        {
            id: 'forest',
            name: '青玉森林',
            icon: '&#x1F332;',
            colors: {
                primary: '#5B8C6F',
                primaryLight: '#7BAF8F',
                accent: '#D4A853',
                bg: '#F0F5EE',
                card: 'rgba(255, 255, 255, 0.8)'
            },
            bgImage: ''
        },
        {
            id: 'sunset',
            name: '琥珀日落',
            icon: '&#x1F305;',
            colors: {
                primary: '#D4883A',
                primaryLight: '#E8A85A',
                accent: '#C04851',
                bg: '#FDF6EC',
                card: 'rgba(255, 255, 255, 0.8)'
            },
            bgImage: ''
        },
        {
            id: 'plum',
            name: '梅紫雅韵',
            icon: '&#x1F338;',
            colors: {
                primary: '#7B4A7D',
                primaryLight: '#9A6A9C',
                accent: '#D4A853',
                bg: '#F5F0F5',
                card: 'rgba(255, 255, 255, 0.8)'
            },
            bgImage: ''
        },
        {
            id: 'ink',
            name: '水墨丹青',
            icon: '&#x1F3AD;',
            colors: {
                primary: '#3B3B3B',
                primaryLight: '#5A5A5A',
                accent: '#C04851',
                bg: '#F5F3F0',
                card: 'rgba(255, 255, 255, 0.85)'
            },
            bgImage: ''
        },
        {
            id: 'cherry',
            name: '樱花粉',
            icon: '&#x1F339;',
            colors: {
                primary: '#D4698A',
                primaryLight: '#E88AA0',
                accent: '#D4A853',
                bg: '#FDF2F5',
                card: 'rgba(255, 255, 255, 0.8)'
            },
            bgImage: ''
        },
        {
            id: 'tea',
            name: '茶道清雅',
            icon: '&#x1F375;',
            colors: {
                primary: '#8B7355',
                primaryLight: '#A89070',
                accent: '#5B8C6F',
                bg: '#F8F5F0',
                card: 'rgba(255, 255, 255, 0.8)'
            },
            bgImage: ''
        }
    ];

    function openThemeLibrary() {
        const currentTheme = Storage.getCustomTheme();
        let html = '';

        // 当前主题预览
        html += '<div class="theme-current">';
        html += '<div class="theme-current-label">当前主题</div>';
        html += '<div class="theme-current-preview" id="theme-preview">';
        html += '<div class="theme-preview-bg"></div>';
        html += '<div class="theme-preview-card"></div>';
        html += '<div class="theme-preview-accent"></div>';
        html += '</div>';
        html += '</div>';

        // 预设主题
        html += '<h3 style="margin:20px 0 12px;">&#x1F3A8; 预设主题</h3>';
        html += '<div class="theme-grid">';
        PRESET_THEMES.forEach(theme => {
            const isActive = currentTheme && currentTheme.id === theme.id;
            html += '<div class="theme-card ' + (isActive ? 'active' : '') + '" onclick="App.applyPresetTheme(\'' + theme.id + '\')">';
            html += '<div class="theme-card-preview">';
            html += '<div class="theme-preview-strip" style="background:' + theme.colors.primary + ';"></div>';
            html += '<div class="theme-preview-strip" style="background:' + theme.colors.accent + ';"></div>';
            html += '<div class="theme-preview-strip" style="background:' + theme.colors.bg + ';"></div>';
            html += '</div>';
            html += '<div class="theme-card-name">' + theme.icon + ' ' + theme.name + '</div>';
            if (isActive) html += '<div class="theme-card-check">&#x2713;</div>';
            html += '</div>';
        });
        html += '</div>';

        // 自定义颜色
        html += '<h3 style="margin:24px 0 12px;">&#x1F308; 自定义颜色</h3>';
        html += '<div class="theme-custom">';
        html += '<div class="theme-color-row">';
        html += '<label>主色调</label>';
        html += '<input type="color" id="custom-primary" value="' + (currentTheme ? currentTheme.colors.primary : '#C04851') + '" onchange="App.previewCustomTheme()">';
        html += '</div>';
        html += '<div class="theme-color-row">';
        html += '<label>辅助色</label>';
        html += '<input type="color" id="custom-accent" value="' + (currentTheme ? currentTheme.colors.accent : '#D4A853') + '" onchange="App.previewCustomTheme()">';
        html += '</div>';
        html += '<div class="theme-color-row">';
        html += '<label>背景色</label>';
        html += '<input type="color" id="custom-bg" value="' + (currentTheme ? currentTheme.colors.bg : '#F5F1EB') + '" onchange="App.previewCustomTheme()">';
        html += '</div>';
        html += '<button class="btn btn-primary" style="width:100%;margin-top:12px;" onclick="App.applyCustomTheme()">应用自定义主题</button>';
        html += '</div>';

        // 背景图片
        html += '<h3 style="margin:24px 0 12px;">&#x1F5BC; 背景图片</h3>';
        html += '<div class="theme-bg-section">';
        html += '<div class="theme-bg-row">';
        html += '<input type="text" id="bg-image-url" placeholder="输入图片URL地址..." value="' + (currentTheme && currentTheme.bgImage ? currentTheme.bgImage : '') + '">';
        html += '</div>';
        html += '<div class="theme-bg-row">';
        html += '<button class="btn btn-outline" style="width:100%;" onclick="App.applyBgImage()">应用背景图片</button>';
        html += '</div>';
        html += '<div class="theme-bg-row">';
        html += '<button class="btn btn-ghost" style="width:100%;color:var(--danger);" onclick="App.clearBgImage()">清除背景图片</button>';
        html += '</div>';
        html += '<div class="theme-bg-tip">提示：输入图片URL后点击应用，支持jpg/png格式</div>';
        html += '</div>';

        // 重置按钮
        html += '<div style="margin-top:24px;">';
        html += '<button class="btn btn-ghost" style="width:100%;" onclick="App.resetTheme()">恢复默认主题</button>';
        html += '</div>';

        document.getElementById('theme-modal-body').innerHTML = html;
        openModal('theme-modal');
        updateThemePreview();
    }

    function updateThemePreview() {
        const preview = document.getElementById('theme-preview');
        if (!preview) return;
        const primary = document.getElementById('custom-primary');
        const accent = document.getElementById('custom-accent');
        const bg = document.getElementById('custom-bg');
        if (primary) preview.style.setProperty('--preview-primary', primary.value);
        if (accent) preview.style.setProperty('--preview-accent', accent.value);
        if (bg) preview.style.setProperty('--preview-bg', bg.value);
    }

    function applyPresetTheme(themeId) {
        const theme = PRESET_THEMES.find(t => t.id === themeId);
        if (!theme) return;
        Storage.saveCustomTheme(theme);
        applyThemeColors(theme.colors);
        showToast('已应用主题：' + theme.name);
        openThemeLibrary();
    }

    function previewCustomTheme() {
        updateThemePreview();
    }

    function applyCustomTheme() {
        const primary = document.getElementById('custom-primary').value;
        const accent = document.getElementById('custom-accent').value;
        const bg = document.getElementById('custom-bg').value;
        const theme = {
            id: 'custom',
            name: '自定义主题',
            icon: '&#x1F308;',
            colors: { primary, accent, bg },
            bgImage: ''
        };
        Storage.saveCustomTheme(theme);
        applyThemeColors(theme.colors);
        showToast('已应用自定义主题');
    }

    function applyBgImage() {
        const url = document.getElementById('bg-image-url').value.trim();
        if (!url) {
            showToast('请输入图片URL');
            return;
        }
        const currentTheme = Storage.getCustomTheme() || { id: 'custom', name: '自定义', icon: '&#x1F308;', colors: { primary: '#C04851', accent: '#D4A853', bg: '#F5F1EB' } };
        currentTheme.bgImage = url;
        Storage.saveCustomTheme(currentTheme);
        document.body.style.backgroundImage = 'url(' + url + ')';
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundPosition = 'center';
        document.body.style.backgroundAttachment = 'fixed';
        showToast('已应用背景图片');
    }

    function clearBgImage() {
        document.body.style.backgroundImage = '';
        const currentTheme = Storage.getCustomTheme();
        if (currentTheme) {
            currentTheme.bgImage = '';
            Storage.saveCustomTheme(currentTheme);
        }
        showToast('已清除背景图片');
    }

    function resetTheme() {
        Storage.clearCustomTheme();
        document.documentElement.style.removeProperty('--primary');
        document.documentElement.style.removeProperty('--primary-light');
        document.documentElement.style.removeProperty('--accent');
        document.documentElement.style.removeProperty('--bg');
        document.body.style.backgroundImage = '';
        showToast('已恢复默认主题');
        openThemeLibrary();
    }

    function applyThemeColors(colors) {
        if (colors.primary) {
            document.documentElement.style.setProperty('--primary', colors.primary);
            // 计算浅色版本
            const r = parseInt(colors.primary.slice(1, 3), 16);
            const g = parseInt(colors.primary.slice(3, 5), 16);
            const b = parseInt(colors.primary.slice(5, 7), 16);
            const lightR = Math.min(255, r + 30);
            const lightG = Math.min(255, g + 30);
            const lightB = Math.min(255, b + 30);
            document.documentElement.style.setProperty('--primary-light', '#' + lightR.toString(16) + lightG.toString(16) + lightB.toString(16));
        }
        if (colors.accent) {
            document.documentElement.style.setProperty('--accent', colors.accent);
        }
        if (colors.bg) {
            document.body.style.background = colors.bg;
        }
    }

    function loadSavedTheme() {
        const theme = Storage.getCustomTheme();
        if (theme && theme.colors) {
            applyThemeColors(theme.colors);
        }
        if (theme && theme.bgImage) {
            document.body.style.backgroundImage = 'url(' + theme.bgImage + ')';
            document.body.style.backgroundSize = 'cover';
            document.body.style.backgroundPosition = 'center';
            document.body.style.backgroundAttachment = 'fixed';
        }
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

        // 暗色模式
        const isDark = settings.theme === 'dark';
        html += '<div class="settings-item" onclick="App.toggleTheme()">' +
            '<div class="settings-item-left">' +
            '<span class="settings-item-icon">' + (isDark ? '&#x1F319;' : '&#x2600;&#xFE0F;') + '</span>' +
            '<span class="settings-item-text">暗色模式</span>' +
            '</div>' +
            '<span style="font-size:0.8125rem;color:var(--text-muted);">' + (isDark ? '已开启' : '已关闭') + '</span>' +
            '</div>';

        // 主题库
        html += '<div class="settings-item" onclick="App.closeThenOpen(\'settings-modal\');App.openThemeLibrary()">' +
            '<div class="settings-item-left">' +
            '<span class="settings-item-icon">&#x1F3A8;</span>' +
            '<span class="settings-item-text">主题库</span>' +
            '</div>' +
            '<span class="settings-item-arrow">&#x203A;</span>' +
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
            // 只清除本应用的数据，不影响其他存储
            const appKeys = [
                'nan_streak', 'nan_learning_history', 'nan_favorites',
                'nan_vocabulary', 'nan_settings', 'nan_last_visit',
                'nan_daily_sentence', 'nan_daily_date', 'nan_daily_word',
                'nan_daily_word_date', 'nan_article_progress', 'nan_mistakes',
                'nan_review_schedule', 'nan_challenge_date', 'nan_quiz_count'
            ];
            appKeys.forEach(key => localStorage.removeItem(key));
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
        // 关闭挑战弹窗时停止计时器
        if (id === 'challenge-modal' && challengeState.timer) {
            clearInterval(challengeState.timer);
            challengeState.timer = null;
        }
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

    // 阅读进度条
    const articleModal = document.getElementById('article-modal');
    if (articleModal) {
        const modalContent = articleModal.querySelector('.modal-content');
        if (modalContent) {
            modalContent.addEventListener('scroll', () => {
                const scrollTop = modalContent.scrollTop;
                const scrollHeight = modalContent.scrollHeight - modalContent.clientHeight;
                const progress = scrollHeight > 0 ? (scrollTop / scrollHeight * 100).toFixed(1) : 0;
                const fill = document.getElementById('reading-progress-fill');
                if (fill) fill.style.width = progress + '%';
            });
        }
    }

    // ── 工具函数 ──

    function escapeHtml(str) {
        if (!str) return '';
        return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
    }

    function escapeJs(str) {
        if (!str) return '';
        return str
            .replace(/\\/g, '\\\\')
            .replace(/'/g, "\\'")
            .replace(/"/g, '\\"')
            .replace(/\n/g, '\\n')
            .replace(/\r/g, '\\r')
            .replace(/\t/g, '\\t')
            .replace(/`/g, '\\`');
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
        toggleTheme,
        searchSentences,
        clearSentenceSearch,
        searchArticles,
        clearArticleSearch,
        openQuiz,
        answerQuiz,
        openDictation,
        playDictationAudio,
        checkDictation,
        nextDictation,
        openCloze,
        selectClozeOption,
        openMistakes,
        removeMistake,
        clearAllMistakes,
        openReview,
        openSpelling,
        checkSpelling,
        skipSpelling,
        nextSpelling,
        openChallenge,
        answerChallenge,
        answerChallengeSpelling,
        openGrammarList,
        openGrammarDetail,
        openWritingList,
        openWritingDetail,
        openReport,
        generateShareCard,
        openAchievements,
        exportData,
        openThemeLibrary,
        applyPresetTheme,
        previewCustomTheme,
        applyCustomTheme,
        applyBgImage,
        clearBgImage,
        resetTheme,
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
