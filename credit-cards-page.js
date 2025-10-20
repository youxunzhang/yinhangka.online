(function () {
  const categories = window.creditCardCategories || [];
  const directoryContainer = document.querySelector('[data-card-directory]');
  const galleryContainer = document.querySelector('[data-card-gallery]');

  if (!directoryContainer || !galleryContainer || !Array.isArray(categories)) {
    return;
  }

  const createIcon = (iconClass) => {
    const icon = document.createElement('i');
    icon.className = iconClass;
    icon.setAttribute('aria-hidden', 'true');
    return icon;
  };

  const buildDirectory = () => {
    categories.forEach((category) => {
      const section = document.createElement('section');
      section.className = 'card-directory-section';

      const header = document.createElement('h3');
      header.className = 'card-directory-title';
      if (category.icon) {
        header.appendChild(createIcon(category.icon));
      }
      const titleText = document.createElement('span');
      titleText.textContent = category.name;
      header.appendChild(titleText);

      section.appendChild(header);

      if (category.description) {
        const description = document.createElement('p');
        description.className = 'card-directory-description';
        description.textContent = category.description;
        section.appendChild(description);
      }

      const list = document.createElement('ul');
      list.className = 'card-directory-list';

      category.cards.forEach((card) => {
        const item = document.createElement('li');
        item.className = 'card-directory-item';

        const link = document.createElement('a');
        link.href = `#${card.slug}`;
        link.className = 'card-directory-link';
        link.textContent = card.name;

        item.appendChild(link);
        list.appendChild(item);
      });

      section.appendChild(list);
      directoryContainer.appendChild(section);
    });
  };

  const buildGallery = () => {
    categories.forEach((category) => {
      const section = document.createElement('section');
      section.className = 'card-category-section';
      section.id = category.id;

      const header = document.createElement('header');
      header.className = 'card-category-header';

      const heading = document.createElement('h3');
      heading.className = 'card-category-title';
      if (category.icon) {
        heading.appendChild(createIcon(category.icon));
      }
      const text = document.createElement('span');
      text.textContent = category.name;
      heading.appendChild(text);

      header.appendChild(heading);

      if (category.description) {
        const description = document.createElement('p');
        description.className = 'card-category-description';
        description.textContent = category.description;
        header.appendChild(description);
      }

      section.appendChild(header);

      const grid = document.createElement('div');
      grid.className = 'card-profile-grid';

      category.cards.forEach((card) => {
        const article = document.createElement('article');
        article.className = 'card-profile';
        article.id = card.slug;

        const visual = document.createElement('div');
        visual.className = 'card-profile-visual';

        const image = document.createElement('img');
        image.className = 'card-profile-image';
        image.src = card.image;
        image.alt = `${card.bank}${card.name}卡面示意图`;
        image.loading = 'lazy';

        visual.appendChild(image);

        const info = document.createElement('div');
        info.className = 'card-profile-info';

        const title = document.createElement('h4');
        title.className = 'card-profile-name';
        title.textContent = card.name;

        const bank = document.createElement('p');
        bank.className = 'card-profile-bank';
        bank.textContent = `发卡行：${card.bank}`;

        const description = document.createElement('p');
        description.className = 'card-profile-description';
        description.textContent = card.description;

        info.appendChild(title);
        info.appendChild(bank);
        info.appendChild(description);

        if (Array.isArray(card.highlights) && card.highlights.length > 0) {
          const highlightTitle = document.createElement('p');
          highlightTitle.className = 'card-profile-highlights-title';
          highlightTitle.textContent = '亮点：';

          const list = document.createElement('ul');
          list.className = 'card-profile-highlights';

          card.highlights.forEach((highlight) => {
            const listItem = document.createElement('li');
            listItem.textContent = highlight;
            list.appendChild(listItem);
          });

          info.appendChild(highlightTitle);
          info.appendChild(list);
        }

        article.appendChild(visual);
        article.appendChild(info);
        grid.appendChild(article);
      });

      section.appendChild(grid);
      galleryContainer.appendChild(section);
    });
  };

  buildDirectory();
  buildGallery();
})();
