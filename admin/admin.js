const form = document.querySelector('#content-form');
const status = document.querySelector('#save-status');
const resetButton = document.querySelector('#reset-button');
const fields = [...form.querySelectorAll('[name]')];

const fillForm = (content) => {
  fields.forEach((field) => {
    field.value = content[field.name] ?? '';
  });
};

const readForm = () => Object.fromEntries(fields.map((field) => [field.name, field.value.trim()]));

const showStatus = (message, isError = false) => {
  status.textContent = message;
  status.className = isError ? 'is-error' : 'is-success';
  window.setTimeout(() => {
    status.textContent = '';
    status.className = '';
  }, 3200);
};

fillForm(window.MapleSiteConfig.load());

form.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  window.MapleSiteConfig.save(readForm());
  showStatus('已保存，打开首页即可查看。');
});

resetButton.addEventListener('click', () => {
  if (!window.confirm('确定恢复为默认内容吗？')) return;
  const defaults = window.MapleSiteConfig.reset();
  fillForm(defaults);
  showStatus('已恢复默认内容。');
});
