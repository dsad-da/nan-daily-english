/**
 * NAN每日一句 - 本地存储管理模块
 * 使用 localStorage 持久化用户数据
 */

const Storage = (() => {
    const KEYS = {
        STREAK: 'nan_streak',
        LEARNING_HISTORY: 'nan_learning_history',
        FAVORITES: 'nan_favorites',
        VOCABULARY: 'nan_vocabulary',
        SETTINGS: 'nan_settings',
        LAST_VISIT: 'nan_last_visit',
        DAILY_SENTENCE: 'nan_daily_sentence',
        DAILY_DATE: 'nan_daily_date',
        DAILY_WORD: 'nan_daily_word',
        DAILY_WORD_DATE: 'nan_daily_word_date',
        ARTICLE_PROGRESS: 'nan_article_progress',
        MISTAKES: 'nan_mistakes',
        REVIEW_SCHEDULE: 'nan_review_schedule',
    };

    // ── 工具函数 ──

    function _get(key, fallback) {
        try {
            const raw = localStorage.getItem(key);
            return raw ? JSON.parse(raw) : fallback;
        } catch {
            return fallback;
        }
    }

    function _set(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
            console.warn('Storage write failed:', e);
        }
    }

    function _today() {
        return new Date().toISOString().slice(0, 10);
    }

    function _daysBetween(d1, d2) {
        const a = new Date(d1);
        const b = new Date(d2);
        return Math.round((b - a) / 86400000);
    }

    // ── 打卡连续天数 ──

    function getStreak() {
        const streak = _get(KEYS.STREAK, { count: 0, lastDate: null });
        const today = _today();
        if (streak.lastDate === today) return streak.count;
        // 断签：超过1天没来，重置
        if (streak.lastDate && _daysBetween(streak.lastDate, today) > 1) {
            return 0;
        }
        return streak.count;
    }

    function checkIn() {
        const today = _today();
        const streak = _get(KEYS.STREAK, { count: 0, lastDate: null });
        if (streak.lastDate === today) return streak.count; // 今天已打卡
        if (streak.lastDate && _daysBetween(streak.lastDate, today) > 1) {
            streak.count = 0; // 断签重置
        }
        streak.count += 1;
        streak.lastDate = today;
        _set(KEYS.STREAK, streak);
        return streak.count;
    }

    function isCheckedInToday() {
        const streak = _get(KEYS.STREAK, { count: 0, lastDate: null });
        return streak.lastDate === _today();
    }

    // ── 学习记录 ──

    function _getHistory() {
        return _get(KEYS.LEARNING_HISTORY, { sentences: [], articles: [], dates: {} });
    }

    function recordSentence(sentenceId) {
        const h = _getHistory();
        if (!h.sentences.includes(sentenceId)) {
            h.sentences.push(sentenceId);
        }
        const today = _today();
        h.dates[today] = h.dates[today] || { sentences: 0, articles: 0 };
        h.dates[today].sentences += 1;
        _set(KEYS.LEARNING_HISTORY, h);
    }

    function recordArticle(articleId) {
        const h = _getHistory();
        if (!h.articles.includes(articleId)) {
            h.articles.push(articleId);
        }
        const today = _today();
        h.dates[today] = h.dates[today] || { sentences: 0, articles: 0 };
        h.dates[today].articles += 1;
        _set(KEYS.LEARNING_HISTORY, h);
    }

    function getStats() {
        const h = _getHistory();
        return {
            totalSentences: h.sentences.length,
            totalArticles: h.articles.length,
            todaySentences: (h.dates[_today()] || {}).sentences || 0,
            todayArticles: (h.dates[_today()] || {}).articles || 0,
        };
    }

    function getCalendarData() {
        const h = _getHistory();
        return h.dates || {};
    }

    function hasLearnedSentence(id) {
        return _getHistory().sentences.includes(id);
    }

    function hasLearnedArticle(id) {
        return _getHistory().articles.includes(id);
    }

    // ── 收藏夹 ──

    function _getFavorites() {
        return _get(KEYS.FAVORITES, { sentences: [], articles: [] });
    }

    function toggleFavoriteSentence(sentenceId) {
        const fav = _getFavorites();
        const idx = fav.sentences.indexOf(sentenceId);
        if (idx === -1) {
            fav.sentences.push(sentenceId);
        } else {
            fav.sentences.splice(idx, 1);
        }
        _set(KEYS.FAVORITES, fav);
        return fav.sentences.includes(sentenceId);
    }

    function toggleFavoriteArticle(articleId) {
        const fav = _getFavorites();
        const idx = fav.articles.indexOf(articleId);
        if (idx === -1) {
            fav.articles.push(articleId);
        } else {
            fav.articles.splice(idx, 1);
        }
        _set(KEYS.FAVORITES, fav);
        return fav.articles.includes(articleId);
    }

    function isFavoriteSentence(id) {
        return _getFavorites().sentences.includes(id);
    }

    function isFavoriteArticle(id) {
        return _getFavorites().articles.includes(id);
    }

    function getFavoriteSentences() {
        return _getFavorites().sentences;
    }

    function getFavoriteArticles() {
        return _getFavorites().articles;
    }

    // ── 生词本 ──

    function _getVocab() {
        return _get(KEYS.VOCABULARY, []);
    }

    function addWord(word, definition, source) {
        const vocab = _getVocab();
        const existing = vocab.find(w => w.word.toLowerCase() === word.toLowerCase());
        if (existing) {
            existing.count = (existing.count || 1) + 1;
            existing.lastSeen = _today();
        } else {
            vocab.push({
                word,
                definition,
                source: source || '',
                addedDate: _today(),
                lastSeen: _today(),
                count: 1,
                mastered: false,
            });
        }
        _set(KEYS.VOCABULARY, vocab);
    }

    function removeWord(word) {
        const vocab = _getVocab().filter(w => w.word.toLowerCase() !== word.toLowerCase());
        _set(KEYS.VOCABULARY, vocab);
    }

    function toggleMastered(word) {
        const vocab = _getVocab();
        const item = vocab.find(w => w.word.toLowerCase() === word.toLowerCase());
        if (item) {
            item.mastered = !item.mastered;
            _set(KEYS.VOCABULARY, vocab);
        }
    }

    function getVocabulary() {
        return _getVocab();
    }

    function getVocabCount() {
        const vocab = _getVocab();
        return {
            total: vocab.length,
            mastered: vocab.filter(w => w.mastered).length,
            learning: vocab.filter(w => !w.mastered).length,
        };
    }

    // ── 文章阅读进度 ──

    function getArticleProgress(articleId) {
        const all = _get(KEYS.ARTICLE_PROGRESS, {});
        return all[articleId] || { paragraphIndex: 0, answered: false, correct: null };
    }

    function saveArticleProgress(articleId, progress) {
        const all = _get(KEYS.ARTICLE_PROGRESS, {});
        all[articleId] = { ...all[articleId], ...progress };
        _set(KEYS.ARTICLE_PROGRESS, all);
    }

    // ── 每日推荐 ──

    function getDailySentence(allSentenceIds) {
        const today = _today();
        const saved = _get(KEYS.DAILY_SENTENCE, null);
        const savedDate = _get(KEYS.DAILY_DATE, null);
        if (saved && savedDate === today) return saved;
        // 随机选一个
        const idx = Math.floor(Math.random() * allSentenceIds.length);
        const id = allSentenceIds[idx];
        _set(KEYS.DAILY_SENTENCE, id);
        _set(KEYS.DAILY_DATE, today);
        return id;
    }

    // ── 错题本 ──

    function _getMistakes() {
        return _get(KEYS.MISTAKES, []);
    }

    function addMistake(type, question, answer, correctAnswer) {
        const mistakes = _getMistakes();
        const existing = mistakes.find(m => m.question === question && m.type === type);
        if (existing) {
            existing.count = (existing.count || 1) + 1;
            existing.lastSeen = _today();
        } else {
            mistakes.push({
                type, question, answer, correctAnswer,
                addedDate: _today(),
                lastSeen: _today(),
                count: 1,
                reviewed: false,
            });
        }
        _set(KEYS.MISTAKES, mistakes);
    }

    function getMistakes() {
        return _getMistakes();
    }

    function removeMistake(index) {
        const mistakes = _getMistakes();
        mistakes.splice(index, 1);
        _set(KEYS.MISTAKES, mistakes);
    }

    function clearMistakes() {
        _set(KEYS.MISTAKES, []);
    }

    function getMistakeCount() {
        return _getMistakes().length;
    }

    // ── 艾宾浩斯复习 ──

    function _getReviewSchedule() {
        return _get(KEYS.REVIEW_SCHEDULE, {});
    }

    function scheduleReview(sentenceId) {
        const schedule = _getReviewSchedule();
        const today = new Date();
        const intervals = [1, 2, 4, 7, 15]; // 艾宾浩斯间隔（天）
        schedule[sentenceId] = {
            addedDate: _today(),
            reviews: intervals.map(days => {
                const d = new Date(today);
                d.setDate(d.getDate() + days);
                return d.toISOString().slice(0, 10);
            }),
            completed: [],
        };
        _set(KEYS.REVIEW_SCHEDULE, schedule);
    }

    function getDueReviews() {
        const schedule = _getReviewSchedule();
        const today = _today();
        const due = [];
        for (const id in schedule) {
            const s = schedule[id];
            const pendingReviews = s.reviews.filter(r => r <= today && !s.completed.includes(r));
            if (pendingReviews.length > 0) {
                due.push({ id: parseInt(id), pendingCount: pendingReviews.length });
            }
        }
        return due;
    }

    function markReviewDone(sentenceId) {
        const schedule = _getReviewSchedule();
        const today = _today();
        if (schedule[sentenceId]) {
            const nextReview = schedule[sentenceId].reviews.find(r => r <= today && !schedule[sentenceId].completed.includes(r));
            if (nextReview) {
                schedule[sentenceId].completed.push(nextReview);
                _set(KEYS.REVIEW_SCHEDULE, schedule);
            }
        }
    }

    // ── 每日一词 ──

    function getDailyWord(allWordCount) {
        const today = _today();
        const saved = _get(KEYS.DAILY_WORD, null);
        const savedDate = _get(KEYS.DAILY_WORD_DATE, null);
        if (saved !== null && savedDate === today) return saved;
        const idx = Math.floor(Math.random() * allWordCount);
        _set(KEYS.DAILY_WORD, idx);
        _set(KEYS.DAILY_WORD_DATE, today);
        return idx;
    }

    // ── 设置 ──

    function getSettings() {
        return _get(KEYS.SETTINGS, {
            fontSize: 'medium', // small / medium / large
            autoPlayAudio: false,
            theme: 'light',
        });
    }

    function updateSettings(partial) {
        const current = getSettings();
        _set(KEYS.SETTINGS, { ...current, ...partial });
    }

    // ── 初始化 ──

    function init() {
        // 记录访问
        _set(KEYS.LAST_VISIT, _today());
    }

    return {
        init,
        // 打卡
        getStreak,
        checkIn,
        isCheckedInToday,
        // 学习记录
        recordSentence,
        recordArticle,
        getStats,
        getCalendarData,
        hasLearnedSentence,
        hasLearnedArticle,
        // 收藏
        toggleFavoriteSentence,
        toggleFavoriteArticle,
        isFavoriteSentence,
        isFavoriteArticle,
        getFavoriteSentences,
        getFavoriteArticles,
        // 生词本
        addWord,
        removeWord,
        toggleMastered,
        getVocabulary,
        getVocabCount,
        // 文章进度
        getArticleProgress,
        saveArticleProgress,
        // 每日推荐
        getDailySentence,
        getDailyWord,
        // 错题本
        addMistake,
        getMistakes,
        removeMistake,
        clearMistakes,
        getMistakeCount,
        // 艾宾浩斯复习
        scheduleReview,
        getDueReviews,
        markReviewDone,
        // 设置
        getSettings,
        updateSettings,
    };
})();

Storage.init();
