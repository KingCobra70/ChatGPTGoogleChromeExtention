function createFileButton() {
  const containers = document.querySelectorAll('.flex.items-center.relative.text-gray-200.bg-gray-800.px-4.py-2.text-xs.font-sans.justify-between.rounded-t-md');

  containers.forEach(container => {
    if (!container.querySelector('#update-vscode-btn')) {
      const copyCodeButton = container.querySelector('.flex.ml-auto.gap-2');
      const programmingLanguageSpan = container.querySelector('span');
      const programmingLanguage = programmingLanguageSpan ? programmingLanguageSpan.innerText.toLowerCase() : '';

      const createFileButton = document.createElement('button');
      createFileButton.textContent = 'Create File';
      createFileButton.id = 'update-vscode-btn';
      createFileButton.style.padding = '2px 10px';
      createFileButton.style.border = 'none';
      createFileButton.style.borderRadius = '20px';
      createFileButton.style.color = '#fff';
      createFileButton.style.backgroundColor = '#28a745';
      createFileButton.style.fontWeight = '300';
      createFileButton.style.marginRight = '200px';

      createFileButton.addEventListener('click', async () => {
        copyCodeButton.click();
        let fileExtension = '.txt';

        switch (programmingLanguage) {
          case 'javascript':
            fileExtension = '.js';
            break;
          case 'html':
            fileExtension = '.html';
            break;
          case 'css':
            fileExtension = '.css';
            break;
          case 'python':
            fileExtension = '.py';
            break;
          default:
            fileExtension = '.txt';
        }

        const fileName = `code-snippet${fileExtension}`;
        const codeSnippet = await navigator.clipboard.readText();
        const file = new Blob([codeSnippet], { type: 'text/plain' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(file);
        a.download = fileName;
        a.click();
      });

      container.appendChild(createFileButton);
    }
  });
}

function addContinueButton() {
  const button = document.createElement('button');
  button.textContent = 'Continue';
  button.id = 'request-code-btn';
  button.style.padding = '2px';
  button.style.border = 'none';
  button.style.borderRadius = '20px';
  button.style.color = '#fff';
  button.style.backgroundColor = '#6e6e80';
  button.style.fontSize = '10px';
  button.style.fontWeight = '150';
  button.style.marginBottom = '10px';
  button.style.width = '80px';

  button.addEventListener('click', () => {
    const textarea = document.querySelector('textarea[tabindex="0"]');
    const textValue = textarea.value.trim();

    if (textValue === '') {
      textarea.value = 'Continue';
    }

    // Replace with the correct selector for the clickElement
    const clickElement = document.querySelector('.absolute.p-1.rounded-md.text-gray-500.bottom-1.5.md\\:bottom-2.5.hover\\:bg-gray-100.enabled\\:dark\\:hover\\:text-gray-400.dark\\:hover\\:bg-gray-900.disabled\\:hover\\:bg-transparent.dark\\:disabled\\:hover\\:bg-transparent.right-1.md\\:right-2.disabled\\:opacity-40');
    clickElement.click();

    const flexElement = document.querySelector('.flex.flex-col.items-end.px-2.pb-2');
    flexElement.querySelector('textarea').value = textarea.value;

    const option = document.createElement('option');
    option.value = textarea.value;
    const formControl = document.querySelector('.form-control.py-1');
    formControl.appendChild(option);

    textarea.value = '';
  });

  // Replace with the correct selector for the insertionPoint
  const insertionPoint = document.querySelector('.flex.flex-col.w-full.py-2.flex-grow.md\\:py-3.md\\:pl-4.relative.border.border-black\\/10.bg-white.dark\\:border-gray-900\\/50');
  if (insertionPoint) {
    insertionPoint.parentNode.insertBefore(button, insertionPoint);
  }
}

function addButton() {
  createFileButton();
  addContinueButton();
}

const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.type === 'childList') {
      const requestCodeButton = document.querySelector('#request-code-btn');
      const updateVSCodeButton = document.querySelector('#update-vscode-btn');

      if (!requestCodeButton && !updateVSCodeButton) {
        addButton();
      }
    }
  });
});

observer.observe(document.body, { childList: true, subtree: true });

// Check for new containers every 3 seconds
setInterval(createFileButton, 3000);





