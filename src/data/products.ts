import type { Product } from '@/types';
export const products: Product[] = [
  { id: 'esfera-marfil', name: 'Esfera Marfil', category: 'Clásicos', subtitle: 'Contrastes que permanecen.', image: 'negro', price: 680000, color: '#9c654b', description: 'Una composición de esfera clara, acentos oscuros y una correa de tono cálido. El gesto clásico, visto de cerca.' },
  { id: 'perfil-acero', name: 'Perfil Acero', category: 'Clásicos', subtitle: 'Una forma de ir a lo esencial.', image: 'acero', price: 890000, color: '#92928e', description: 'Tonos plateados, líneas definidas y una esfera oscura. Una exploración visual del contraste y la geometría.' },
  { id: 'trazo-negro', name: 'Trazo Negro', category: 'Sobrios', subtitle: 'Menos ruido. Más carácter.', image: 'cuero', price: 420000, color: '#252728', description: 'Una esfera negra, detalles mínimos y un pequeño acento de color. El equilibrio está en lo que eliges dejar fuera.' },
  { id: 'acento-dorado', name: 'Acento Dorado', category: 'Deportivos', subtitle: 'Un detalle cambia el ritmo.', image: 'noche', price: 360000, color: '#b6a46c', description: 'Un diálogo entre tonos dorados, una esfera oscura y una correa textil. Una mirada informal al reloj cotidiano.' },
  { id: 'hora-azul', name: 'Hora Azul', category: 'Sobrios', subtitle: 'Cuando el día baja el volumen.', image: 'claro', price: 510000, color: '#3b5260', description: 'Una esfera azul fotografiada ante el mar. El color del último momento del día, llevado a una composición editorial.' },
  { id: 'punto-tierra', name: 'Punto Tierra', category: 'Deportivos', subtitle: 'Para salir de lo de siempre.', image: 'linea', price: 395000, color: '#9c6a32', description: 'Contraste entre una correa cálida y un entorno abierto. Una propuesta visual para quienes prefieren un ritmo propio.' },
];
export const money = (amount: number): string => new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(amount);
export const findProduct = (id: string): Product | undefined => products.find((product) => product.id === id);
