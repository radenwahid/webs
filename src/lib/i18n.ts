export type Lang = 'id' | 'en';

export const translations = {
  id: {
    nav_services: 'Services',
    nav_testimonials: 'Testimoni',
    nav_contact: 'Kontak',
    nav_gallery: 'Galeri',
    hero_badge: '✦ Tersedia untuk project',
    hero_desc: 'Butuh bantuan coding? Dari tugas kuliah, skripsi, web, sampai mobile app — gue handle semuanya. Cepat, rapi, dan profesional.',
    hero_cta: 'Hubungi Saya →',
    hero_cta2: 'Lihat Services',
    services_label: '✦ Yang Gue Kerjain',
    services_title: 'SERVICES',
    testi_label: '✦ Kata Mereka',
    testi_title: 'TESTIMONI',
    contact_label: '✦ Ayo Kerja Sama',
    contact_title: 'LANGSUNG\nHUBUNGI\nSAYA',
    contact_note: 'Harga menyesuaikan kebutuhan project kamu. Ceritain dulu aja, nggak ada yang terlalu susah.',
    contact_wa: 'WhatsApp Sekarang',
    gallery_label: '✦ Portfolio',
    gallery_title: 'GALERI PROJECT',
    gallery_visit: 'Lihat Project →',
    footer_copy: '© 2025 Joki Coding by Raden. All rights reserved.',
  },
  en: {
    nav_services: 'Services',
    nav_testimonials: 'Testimonials',
    nav_contact: 'Contact',
    nav_gallery: 'Gallery',
    hero_badge: '✦ Available for projects',
    hero_desc: 'Need coding help? From college assignments, thesis, web, to mobile apps — I handle it all. Fast, clean, and professional.',
    hero_cta: 'Contact Me →',
    hero_cta2: 'View Services',
    services_label: '✦ What I Do',
    services_title: 'SERVICES',
    testi_label: '✦ What They Say',
    testi_title: 'TESTIMONIALS',
    contact_label: '✦ Let\'s Work Together',
    contact_title: 'CONTACT\nME\nDIRECTLY',
    contact_note: 'Pricing depends on your project needs. Just tell me about it — nothing is too hard.',
    contact_wa: 'WhatsApp Now',
    gallery_label: '✦ Portfolio',
    gallery_title: 'PROJECT GALLERY',
    gallery_visit: 'View Project →',
    footer_copy: '© 2025 Joki Coding by Raden. All rights reserved.',
  },
} as const;

export function t(lang: Lang, key: keyof typeof translations['id']): string {
  return translations[lang][key];
}
