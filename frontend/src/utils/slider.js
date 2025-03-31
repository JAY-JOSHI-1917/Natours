document.addEventListener("DOMContentLoaded", () => {
    const slider = document.querySelector(".slider .list");
    const items = document.querySelectorAll(".slider .item");
    const indicators = document.querySelectorAll(".indicators li");
    let currentIndex = 0;
    const totalItems = items.length;
    const slideInterval = 3000; // 3 seconds
  
    const updateSlider = () => {
      slider.style.transform = `translateX(-${currentIndex * 100}%)`;
      indicators.forEach((indicator, index) => {
        indicator.classList.toggle("active", index === currentIndex);
      });
    };
  
    const nextSlide = () => {
      currentIndex = (currentIndex + 1) % totalItems;
      updateSlider();
    };
  
    const prevSlide = () => {
      currentIndex = (currentIndex - 1 + totalItems) % totalItems;
      updateSlider();
    };
  
    // Auto-slide
    let autoSlide = setInterval(nextSlide, slideInterval);
  
    // Pause on hover
    slider.addEventListener("mouseenter", () => clearInterval(autoSlide));
    slider.addEventListener("mouseleave", () => {
      autoSlide = setInterval(nextSlide, slideInterval);
    });
  
    // Indicator click
    indicators.forEach((indicator, index) => {
      indicator.addEventListener("click", () => {
        currentIndex = index;
        updateSlider();
      });
    });
  });