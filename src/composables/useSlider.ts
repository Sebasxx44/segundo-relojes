import { products } from '@/data/products';
import { ImageTA } from '@/components/ImageTA';
export const useSlider = (): void => {
  const slides = [
    { product: products[0], caption: 'El clásico, visto de cerca.' },
    { product: products[1], caption: 'La fuerza de una línea simple.' },
    { product: products[2], caption: 'Menos ruido. Más carácter.' },
  ];
  let index = 0;
  const image = document.getElementById('hero-slide-image');
  const slider = document.getElementById('hero-slider');
  const render = (next: number) => {
    index = (next + slides.length) % slides.length;
    const slide = slides[index];
    if (image) { image.innerHTML = ImageTA(slide.product.image, `Fotografía de referencia de ${slide.product.name}`, '', true, '(max-width: 760px) 90vw, 48vw'); image.classList.remove('slide-enter'); void image.offsetWidth; image.classList.add('slide-enter'); }
    const count = document.getElementById('slide-number');
    const caption = document.getElementById('slide-caption');
    const announcement = document.getElementById('slide-announcement');
    if (count) count.textContent = `0${index + 1}`;
    if (caption) caption.textContent = slide.caption;
    if (announcement) announcement.textContent = `Reloj ${index + 1} de 3: ${slide.product.name}`;
    const quick = document.getElementById('hero-quickview');
    if (quick) { quick.dataset.id = slide.product.id; quick.setAttribute('aria-label', `Ver detalle de ${slide.product.name}`); }
    document.querySelectorAll<HTMLButtonElement>('[data-slide]').forEach((button) => { const selected = Number(button.dataset.slide) === index; button.classList.toggle('is-current', selected); if (selected) button.setAttribute('aria-current', 'true'); else button.removeAttribute('aria-current'); });
  };
  document.querySelectorAll<HTMLButtonElement>('[data-slide]').forEach((button) => button.addEventListener('click', () => render(Number(button.dataset.slide))));
  document.querySelectorAll<HTMLButtonElement>('[data-slide-direction]').forEach((button) => button.addEventListener('click', () => render(index + Number(button.dataset.slideDirection))));
  slider?.addEventListener('keydown', (event) => { if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') { event.preventDefault(); render(index + (event.key === 'ArrowRight' ? 1 : -1)); } });
  let start = 0;
  slider?.addEventListener('touchstart', (event) => { start = event.changedTouches[0].clientX; }, { passive: true });
  slider?.addEventListener('touchend', (event) => { const difference = event.changedTouches[0].clientX - start; if (Math.abs(difference) > 65) render(index + (difference < 0 ? 1 : -1)); }, { passive: true });
};
