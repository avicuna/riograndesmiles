// JavaScript for FAQ Dropdown (scripts.js)

document.querySelectorAll('.faq-question').forEach(item => {
  item.addEventListener('click', () => {
    const content = item.nextElementSibling;

    // Close other open items
    document.querySelectorAll('.faq-content').forEach(content => {
      if (content !== item.nextElementSibling) {
        content.style.display = 'none';
      }
    });

    // Toggle current item
    content.style.display = content.style.display === 'block' ? 'none' : 'block';
  });
});

