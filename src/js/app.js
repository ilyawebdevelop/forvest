import * as flsFunctions from "./modules/functions.js";
import "./modules/jquery-3.7.1.min.js";
import AirDatepicker from 'air-datepicker';
import { Fancybox } from "./modules/fancybox.esm.js";
import "./modules/inputmask.min.js";
import './components.js';

flsFunctions.isWebp();

Fancybox.bind("[data-fancybox]", {
  closeButton: false,
});

let calendarArray = document.querySelectorAll('.calendar');
calendarArray.forEach(el => {
  // air datepicker
  new AirDatepicker(el, {
    minDate: new Date(),
    autoClose: true,
    position: 'bottom right',
  });

  Inputmask("datetime", {
    inputFormat: "dd.mm.yyyy",
    placeholder: "ДД.ММ.ГГГГ",
    leapday: "29-02-",
    separator: ".",
    alias: "dd/mm/yyyy"
  }).mask(el);
});

// Import swiper
import Swiper, { Navigation, Pagination, Autoplay, Mousewheel, EffectFade, Thumbs, Scrollbar } from 'swiper';
Swiper.use([Navigation, Pagination, Autoplay, Mousewheel, EffectFade, Thumbs, Scrollbar]);

let inputs = document.querySelectorAll('input[type="tel"]');
let im = new Inputmask({
  mask: '+7 (999) 999-99-99',
  onBeforeWrite: function (event, buffer, caretPos, opts) {
    // console.log(caretPos);
    // Проверяем:
    // 1. Позиция каретки (caretPos) равна 5 (вторая цифра в "99")
    // 2. Нажата клавиша "8"
    if (caretPos === 5 && event.key === '8') {
      event.preventDefault(); // Запрещаем ввод     
      // console.log("Ввод 8 в этой позиции запрещен!");
      return {
        refreshFromBuffer: true,
        buffer: [],
        caret: 4
      };
    }
  },
  onBeforePaste: function (pastedValue, opts) {
    // Удаляем всё, кроме цифр
    var processedValue = pastedValue.replace(/\D/g, "");

    // Если первая цифра 7 или 8 и в строке 11 цифр, убираем первую
    if (processedValue.length === 11 && (processedValue[0] === '7' || processedValue[0] === '8')) {
      return processedValue.substring(1);
    }

    return pastedValue;
  }

});

im.mask(inputs);

const mediaQueryMin1200 = window.matchMedia('(min-width: 1200px)');
if (mediaQueryMin1200.matches) {
  // Инициализация слайдера popularSlider
  document.querySelectorAll('.popularSlider').forEach(n => {
    const mySwiperPopular = new Swiper(n, {
      slidesPerView: 5,
      spaceBetween: 10,
      speed: 600,
      autoplay: false,
      breakpoints: {
        0: {
          slidesPerView: 1,
        },
        576: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 3,
        },
        992: {
          slidesPerView: 4,
        },
        1200: {
          slidesPerView: 5,
        },
      },
    });
  });
}

// Инициализация слайдера specialSlider
document.querySelectorAll('.specialSlider').forEach(n => {
  const mySwiperSpecial = new Swiper(n, {
    slidesPerView: 6,
    spaceBetween: 10,
    speed: 600,
    autoplay: {
      delay: 5000, // Задержка между переключениями (в мс), по умолчанию 3000
      disableOnInteraction: false, // НЕ отключать автоплей, если пользователь сам перелистнул слайд
      pauseOnMouseEnter: true, // Поставить на паузу, когда на слайдер навели курсор мыши
    },
    pagination: {
      el: n?.querySelector('.swiper-pagination'),
      clickable: true,
      type: 'bullets',
    },
    breakpoints: {
      0: {
        slidesPerView: 2,
      },
      768: {
        slidesPerView: 3,
      },
      992: {
        slidesPerView: 4,
      },
      1200: {
        slidesPerView: 5,
      },
      1400: {
        slidesPerView: 6,
      },
    },
  });
});

// Инициализация слайдера galSlider
document.querySelectorAll('.galSlider').forEach(n => {
  const mySwiperGal = new Swiper(n, {
    slidesPerView: 4,
    spaceBetween: 10,
    speed: 600,
    autoplay: true,
    navigation: {
      nextEl: n.closest('.sliderW')?.querySelector('.navArrowNext'),
      prevEl: n.closest('.sliderW')?.querySelector('.navArrowPrev'),
    },
    pagination: {
      el: n?.querySelector('.swiper-pagination'),
      clickable: true,
      type: 'bullets',
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
      992: {
        slidesPerView: 3,
      },
      1200: {
        slidesPerView: 4,
      },
    },
  });
});

function map() {
  const contactsMap = document.querySelector("#map");
  if (contactsMap) {
    const center = JSON.parse(contactsMap.dataset.center);
    const zoom = Number(contactsMap.dataset.zoom);
    function init() {
      const htmlMap = new ymaps.Map(contactsMap, {
        center,
        zoom
      });
      const placemark = new ymaps.Placemark(center, {}, {
        iconLayout: "default#image",
        iconImageHref: "./img/icons/marker.svg",
        iconImageSize: [60, 67],
        iconImageOffset: [-30, -33]
      });
      htmlMap.controls.remove("geolocationControl");
      htmlMap.controls.remove("searchControl");
      htmlMap.controls.remove("trafficControl");
      htmlMap.controls.remove("typeSelector");
      htmlMap.controls.remove("fullscreenControl");
      htmlMap.controls.remove("rulerControl");
      htmlMap.behaviors.disable(["scrollZoom"]);
      htmlMap.geoObjects.add(placemark);
    }
    ymaps.ready(init);
  }
}

map();

const introSlider = new Swiper('.introSlider', {
  // Включаем петлю, чтобы слайды листались бесконечно (по желанию)
  loop: true,
  // Подключаем ваши кастомные стрелки
  navigation: {
    nextEl: '.introSlider .navArrowNext',
    prevEl: '.introSlider .navArrowPrev',
  },
  // Настраиваем счетчик (пагинацию фракцией)
  pagination: {
    el: '.sliderCounter',
    type: 'fraction',
    // Кастомизируем внешний вид цифр (делаем через пробелы и слэш)
    renderFraction: function (currentClass, totalClass) {
      return '<span class="' + currentClass + '"></span>' +
        ' / ' +
        '<span class="' + totalClass + '"></span>';
    }
  },
});

// Инициализация слайдера fractionsSlider
document.querySelectorAll('.fractionsSlider').forEach(n => {
  const mySwiperFraction = new Swiper(n, {
    slidesPerView: 4,
    spaceBetween: 10,
    speed: 600,
    autoplay: true,
    breakpoints: {
      576: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
      992: {
        slidesPerView: 3,
      },
      1200: {
        slidesPerView: 4,
      },
    },
  });
});

// Инициализация слайдера prodWhereSlider
document.querySelectorAll('.prodWhereSlider').forEach(n => {
  const mySwiperWhere = new Swiper(n, {
    slidesPerView: 4,
    spaceBetween: 10,
    speed: 600,
    autoplay: true,
    breakpoints: {
      576: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
      992: {
        slidesPerView: 3,
      },
      1200: {
        slidesPerView: 4,
      },
    },
  });
});

// Инициализация слайдера relatedSlider
document.querySelectorAll('.relatedSlider').forEach(n => {
  const mySwiperRelated = new Swiper(n, {
    slidesPerView: 6,
    spaceBetween: 10,
    speed: 600,
    autoplay: true,
    breakpoints: {
      0: {
        slidesPerView: 2,
      },
      576: {
        slidesPerView: 3,
      },
      768: {
        slidesPerView: 4,
      },
      992: {
        slidesPerView: 5,
      },
      1200: {
        slidesPerView: 6,
      },
    },
  });
});

// Инициализация слайдера tasksSlider
document.querySelectorAll('.tasksSlider').forEach(n => {
  const mySwiperTasks = new Swiper(n, {
    slidesPerView: 4,
    spaceBetween: 10,
    speed: 600,
    autoplay: true,
    breakpoints: {
      576: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
      992: {
        slidesPerView: 3,
      },
      1200: {
        slidesPerView: 4,
      },
    },
  });
});

// Инициализация слайдера portfSlider
document.querySelectorAll('.portfSlider').forEach(n => {
  const mySwiperPortf = new Swiper(n, {
    slidesPerView: 4,
    spaceBetween: 20,
    speed: 600,
    autoplay: true,
    breakpoints: {
      576: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
      992: {
        slidesPerView: 3,
      },
      1200: {
        slidesPerView: 4,
      },
    },
  });
});

$('.accordion-header').click(function () {
  // Находим текстовый контент, который идет сразу за кликнутым заголовком
  const currentContent = $(this).next('.accordion-content');

  // Закрываем абсолютно все блоки .accordion-content на странице, кроме текущего
  $('.accordion-content').not(currentContent).slideUp(300);

  // НАХОДИМ ВСЕ заголовки на странице, убираем у них класс active (кроме текущего)
  $('.accordion-header').not(this).removeClass('active');

  // Плавно переключаем видимость текущего контента
  currentContent.slideToggle(300);

  // Переключаем (добавляем/удаляем) класс active на самом кликнутом заголовке
  $(this).toggleClass('active');
});


document.getElementById('copy-btn')?.addEventListener('click', function () {
  const container = document.getElementById('requisites-table');
  // Находим все строки внутри контейнера
  const rows = container.querySelectorAll('.row');
  let textToCopy = '';

  rows.forEach(row => {
    // Находим блок с названием (обычно он имеет класс text--gray)
    const labelEl = row.querySelector('.col.text--gray');
    // Находим блок со значением (вторая колонка .col)
    const valueEl = row.querySelector('.col:not(.text--gray)');

    if (labelEl && valueEl) {
      const label = labelEl.innerText.trim();
      const value = valueEl.innerText.trim();
      textToCopy += `${label}: ${value}\n`;
    }
  });

  // Копируем собранный текст в буфер обмена
  navigator.clipboard.writeText(textToCopy.trim())
    .then(() => {
      // Анимация успешного копирования для кнопки
      const originalText = this.innerText;
      this.innerText = 'Скопировано!';

      // Добавляем класс успешного состояния, если он есть в ваших стилях,
      // либо меняем цвет напрямую:
      const originalBg = this.style.backgroundColor;
      this.style.backgroundColor = '#4CAF50';

      setTimeout(() => {
        this.innerText = originalText;
        this.style.backgroundColor = originalBg;
      }, 2000);
    })
    .catch(err => {
      console.error('Не удалось скопировать: ', err);
      alert('Ошибка при копировании. Выделите текст вручную.');
    });
});