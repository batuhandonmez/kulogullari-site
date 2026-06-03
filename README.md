# Kuloğulları LTD. ŞTİ. Kurumsal Web Sitesi

Next.js, TypeScript, Tailwind CSS, Supabase ve Resend ile hazırlanan kurumsal web sitesi v1.

## Özellikler

- Kurumsal premium ana sayfa
- İnşaat, araç kiralama, emlak ve yeni faaliyet alanları sayfaları
- Sektöre göre değişen çok adımlı talep formu
- Supabase `leads` ve `lead_notes` kayıt altyapısı
- Resend ile yeni talep e-posta bildirimi
- Basit admin paneli: liste, detay, durum güncelleme, takip notu
- Supabase yokken demo modunda çalışan yerel hafıza

## Kurulum

```bash
npm install
cp .env.example .env.local
npm run dev
```

Admin paneli: `/admin`

Demo admin şifresi: `admin12345`

## Supabase

1. Supabase projesi oluşturun.
2. `supabase-schema.sql` içeriğini SQL editor içinde çalıştırın.
3. `.env.local` dosyasına `NEXT_PUBLIC_SUPABASE_URL` ve `SUPABASE_SERVICE_ROLE_KEY` değerlerini girin.

## E-posta

Resend üzerinden `RESEND_API_KEY`, `RESEND_FROM_EMAIL` ve `LEAD_NOTIFICATION_EMAIL` değerlerini doldurun. Değerler boşsa talep kaydı çalışır, yalnızca e-posta gönderimi atlanır.

## Yayın

Vercel üzerinde environment değişkenlerini girip deploy alın. Production için `ADMIN_PASSWORD` ve `ADMIN_SESSION_TOKEN` mutlaka değiştirilmeli.
