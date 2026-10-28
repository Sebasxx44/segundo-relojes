# SEGUNDO — El tiempo, a tu manera

Concepto de tienda editorial de relojes por Sebastián Sánchez. Todo el contenido visible está en español. Vite + TypeScript sin framework de cliente: catálogo con búsqueda, filtros y orden; carrusel manual de tres fotografías; detalles, favoritos y bolsa persistentes; simulación de pedido sin cobros ni datos personales.

```sh
npm install
npm run dev
npm run build
npm run typecheck
npm test
```

Componentes `TA`, lógica separada por responsabilidad y alias `@/`. Diálogos nativos, navegación por teclado, foco conservado al actualizar la bolsa, movimiento reducido y diseño adaptable. JavaScript servido ~10 KB gzip. Fotografías WebP locales en 360/640/1200px con `srcset`, carga diferida y preload de la imagen inicial. Syne variable e IBM Plex Sans se sirven como WOFF2 locales con `font-display: swap`.

## Referencias y licencias

- Dirección visual original inspirada en la referencia editorial suministrada por el usuario; no se utiliza la captura como recurso del sitio.
- Fotografías de [Unsplash](https://unsplash.com/license), bajo su licencia: [esfera marfil](https://images.unsplash.com/photo-1524805444758-089113d48a6d), [perfil acero](https://images.unsplash.com/photo-1547996160-81dfa63595aa), [trazo negro](https://images.unsplash.com/photo-1434056886845-dac89ffe9b56), [acento dorado](https://images.unsplash.com/photo-1508057198894-247b23fe5ade), [hora azul](https://images.unsplash.com/photo-1533139502658-0198f920d8e8), [punto tierra](https://images.unsplash.com/photo-1495856458515-0637185db551). Recortadas y optimizadas localmente; no se han eliminado marcas.
- [Syne](https://fontsource.org/fonts/syne) e [IBM Plex Sans](https://fontsource.org/fonts/ibm-plex-sans), SIL Open Font License. Licencias incluidas en `public/fonts/`.

SEGUNDO no fabrica relojes ni está afiliado a las marcas de las fotografías. Los nombres son descriptores visuales; precios en COP exclusivamente ilustrativos. No se afirman materiales, movimientos, garantías, disponibilidad ni certificaciones. Los datos de bolsa y favoritos se guardan solo en este navegador. La confirmación simula un pedido y vacía la bolsa; no produce una transacción ni envía información.
