<script setup>
    import Heading from './Heading.vue'
</script>

<style scoped lang="postcss">
    h1, h2, h3, h4, h5, h6 {
        &[class^='h'] {
            @apply mt-0;
            font-weight: inherit;
        }
    }

    h2 {
        &[class^='h'] {
            @apply m-0 p-0 border-b-0;
        }
    }
</style>

# Heading

## Usage

Komponen <strong>Heading</strong> memiliki elemen dari <strong>h1</strong> sampai dengan <strong>h6</strong>. Heading digunakan sebagai judul setiap bagian utama suatu halaman.

<Heading element="h1">Heading 1</Heading>
<Heading element="h2">Heading 2</Heading>

## Rules
- Heading dengan elemen h1 dan h2 hanya digunakan untuk halaman landing
- Heading h1 bisa digunakan untuk site-title, namun hanya pada halaman home saja
- Selain itu h1 dan h2 dapat juga digunakan sebagai page-title.
- Apabila page-title menggunakan elemen h1, setiap halaman hanya boleh memiliki sebuah element h1 saja.
- Jika landing page bertipe one-page website, setiap judul pada section-nya bisa menggunakan elemen h2.
- Heading dengan elemen h3 sampai h6 digunakan untuk halaman dashboard.

