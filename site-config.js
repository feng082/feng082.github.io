(() => {
  const STORAGE_KEY = 'maple082-site-content-v1';
  const DEFAULTS = Object.freeze({
    name: '周丹枫',
    role: '通信工程师',
    intro: '在国企设计院做通信工程，用严谨的脑子画图纸、算链路、跑现场，把每一处通信基础设施做得稳稳当当。',
    availability: '现可接洽',
    heroCta: '直接联系我',
    contactCta: '一起联系我',
    email: 'hello@maple082.com',
    unit: '国企设计院',
    position: '通信工程师',
    timezone: 'GMT+8',
    languages: '中 · EN',
    contactHandle: 'maple082 ↗',
    resumeText: 'PDF · 2.4MB ↗',
    projectText: '通信工程实践 ↗'
  });

  const normalize = (value) => ({ ...DEFAULTS, ...(value && typeof value === 'object' ? value : {}) });

  const load = () => {
    try {
      return normalize(JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '{}'));
    } catch {
      return normalize();
    }
  };

  const save = (value) => {
    const next = normalize(value);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    return next;
  };

  const reset = () => {
    window.localStorage.removeItem(STORAGE_KEY);
    return normalize();
  };

  window.MapleSiteConfig = { STORAGE_KEY, DEFAULTS, load, save, reset };
})();
