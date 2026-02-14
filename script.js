// ===== АНИМАЦИЯ ПОЯВЛЕНИЯ ЭЛЕМЕНТОВ ПРИ ПРОКРУТКЕ =====
document.addEventListener('DOMContentLoaded', () => {
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    fadeElements.forEach(el => {
        observer.observe(el);
    });
    
    // ===== АККОРДЕОН ДЛЯ СТРАНИЦЫ ОСОБЕННОСТЕЙ =====
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const content = item.querySelector('.accordion-content');
            const isActive = header.classList.contains('active');
            
            // Закрываем все открытые
            accordionHeaders.forEach(h => {
                h.classList.remove('active');
                h.parentElement.querySelector('.accordion-content').classList.remove('show');
            });
            
            // Открываем текущий, если не активен
            if (!isActive) {
                header.classList.add('active');
                content.classList.add('show');
            }
        });
    });
    
    // ===== СЛАЙДЕР ДЛЯ СТРАНИЦЫ "АМСТАФ И ЧЕЛОВЕК" =====
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide');
    const dotsContainer = document.querySelector('.slider-nav');
    let currentSlide = 0;
    
    if (slider && slides.length > 0) {
        // Создаем точки навигации
        slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('slider-dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });
        
        const dots = document.querySelectorAll('.slider-dot');
        
        function goToSlide(index) {
            currentSlide = index;
            slider.style.transform = `translateX(-${currentSlide * 100}%)`;
            
            // Обновляем активные точки
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === currentSlide);
            });
        }
        
        // Автопрокрутка каждые 6 секунд
        setInterval(() => {
            currentSlide = (currentSlide + 1) % slides.length;
            goToSlide(currentSlide);
        }, 6000);
        
        // Клик по карточкам разновидностей (модальное окно)
        const varietyCards = document.querySelectorAll('.variety-card');
        varietyCards.forEach(card => {
            card.addEventListener('click', () => {
                const title = card.querySelector('h3').textContent;
                const desc = card.querySelector('p').textContent;
                
                // Простая анимация "лайка"
                card.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    card.style.transform = '';
                    showNotification(`Вы выбрали: ${title}`);
                }, 200);
            });
        });
    }
    
    // ===== УВЕДОМЛЕНИЯ =====
    function showNotification(message) {
        if (document.getElementById('notification')) return;
        
        const notif = document.createElement('div');
        notif.id = 'notification';
        notif.style.cssText = `
            position: fixed;
            bottom: 25px;
            right: 25px;
            background: var(--gold-accent);
            color: white;
            padding: 15px 25px;
            border-radius: 50px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            z-index: 9999;
            font-weight: 500;
            animation: slideIn 0.4s, fadeOut 0.5s 2.5s forwards;
        `;
        notif.textContent = message;
        document.body.appendChild(notif);
        
        setTimeout(() => {
            notif.remove();
        }, 3000);
    }
    
    // Анимация уведомления
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes slideIn {
            from { transform: translateX(200px); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes fadeOut {
            to { opacity: 0; transform: translateX(100px); }
        }
    `;
    document.head.appendChild(style);
    
    // ===== ПЛАВНАЯ ПРОКРУТКА ДЛЯ НАВИГАЦИИ =====
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});