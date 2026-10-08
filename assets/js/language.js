(function () {
  function setLanguage(language) {
    var isChinese = language === 'zh';
    document.documentElement.lang = isChinese ? 'zh-CN' : 'en';

    document.querySelectorAll('[data-lang-en][data-lang-zh]').forEach(function (element) {
      element.innerHTML = isChinese ? element.getAttribute('data-lang-zh') : element.getAttribute('data-lang-en');
    });

    document.querySelectorAll('.pub-badge--status').forEach(function (element) {
      var labels = isChinese
        ? { Preprint: '预印本', Published: '已发表', Manuscript: '手稿', 'Under review': '审稿中' }
        : { 预印本: 'Preprint', 已发表: 'Published', 手稿: 'Manuscript', 审稿中: 'Under review' };
      element.textContent = labels[element.textContent.trim()] || element.textContent;
    });

    document.querySelectorAll('.pub-venue').forEach(function (element) {
      var value = element.textContent;
      if (isChinese) {
        value = value.replace('Submitted to:', '投稿至：').replace('Preprint / under review', '预印本 / 审稿中').replace('Target venue:', '目标会议：').replace('Preprint / manuscript', '预印本 / 手稿').replace('Main Conference', '主会').replace('Poster', '海报');
      } else {
        value = value.replace('投稿至：', 'Submitted to:').replace('预印本 / 审稿中', 'Preprint / under review').replace('目标会议：', 'Target venue:').replace('预印本 / 手稿', 'Preprint / manuscript').replace('主会', 'Main Conference').replace('海报', 'Poster');
      }
      element.textContent = value;
    });

    document.querySelectorAll('.pub-entry__venue').forEach(function (element) {
      var value = element.textContent;
      value = isChinese
        ? value.replace('Third author', '第三作者').replace('Fifth author', '第五作者').replace('Co-first author', '共同第一作者').replace('Main Conference', '主会').replace('Poster', '海报').replace('Findings', 'Findings')
        : value.replace('第三作者', 'Third author').replace('第五作者', 'Fifth author').replace('共同第一作者', 'Co-first author').replace('主会', 'Main Conference').replace('海报', 'Poster');
      element.textContent = value;
    });

    var toggle = document.getElementById('language-toggle');
    if (toggle) {
      toggle.textContent = isChinese ? 'English' : '中文';
      toggle.setAttribute('aria-pressed', String(isChinese));
      toggle.setAttribute('aria-label', isChinese ? 'Switch to English' : '切换为中文');
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    var toggle = document.getElementById('language-toggle');
    if (!toggle) return;
    document.querySelectorAll('.pub-card--collapsible').forEach(function (card) {
      card.open = true;
    });
    setLanguage('zh');
    toggle.addEventListener('click', function () {
      setLanguage(toggle.getAttribute('aria-pressed') === 'true' ? 'en' : 'zh');
    });
  });
})();
