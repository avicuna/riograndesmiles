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

document.querySelectorAll('.btn').forEach(button => {
  button.addEventListener('click', () => {
    const description = button.nextElementSibling; // Get the description element
    if (description.style.display === 'block') {
      description.style.display = 'none'; // Hide if currently visible
      button.textContent = 'Learn More'; // Change button text back
    } else {
      description.style.display = 'block'; // Show description
      button.textContent = 'Show Less'; // Change button text
    }
  });
});
