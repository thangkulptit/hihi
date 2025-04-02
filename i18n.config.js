import { createI18n } from 'vue-i18n-lite';

const localeFiles = import.meta.glob('@/cores/locales/*.json', { eager: true });
const messages = {};

Object.entries(localeFiles).forEach(([path, module]) => {
  const fileName = path.split('/').pop().replace('.json', '');
  messages[fileName] = module.default;
});

const i18n = createI18n({
  locale: 'vi',
  fallbackLocale: 'vi',
  messages,
});

export default i18n;