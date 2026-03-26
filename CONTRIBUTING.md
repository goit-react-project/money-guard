# MoneyGuard'a Katkıda Bulunma Rehberi

MoneyGuard, kişisel gelir-gider takibine yönelik bir React uygulamasıdır. Bu rehber, projeye nasıl katkıda bulunacağını adım adım açıklamaktadır.

---

## İçindekiler

- [Genel Kurallar](#genel-kurallar)
- [İş Akışı](#iş-akışı)
- [Issue Açma](#issue-açma)
- [Branch Oluşturma](#branch-oluşturma)
- [Commit Mesajları](#commit-mesajları)
- [Pull Request Açma](#pull-request-açma)
- [Code Review Süreci](#code-review-süreci)

---

## Genel Kurallar

- `main` branch'ine **direkt push yapamazsın**. Tüm değişiklikler PR üzerinden yapılır.
- PR'lar **takım lideri tarafından** incelenir ve merge edilir.
- Her görev için ayrı bir **issue** ve **branch** açılır.
- Commit mesajları Türkçe veya İngilizce olabilir, ancak **açıklayıcı** olmalıdır.

---

## İş Akışı

```
Issue aç → Branch oluştur → Kodu yaz → Push et → PR aç → İnceleme → Merge
```

---

## Issue Açma

1. GitHub'da **Issues** sekmesine git
2. **New issue** butonuna tıkla
3. Başlık ve açıklamayı doldur
4. Uygun **label** ekle:
   - `feature` → Yeni özellik
   - `bug` → Hata düzeltme
   - `refactor` → Kod iyileştirme
   - `docs` → Dokümantasyon
5. **Assignee** kısmından kendini ata
6. Issue'yu kaydet ve **numarasını not al** (branch adında kullanacaksın)

---

## Branch Oluşturma

Branch adları şu formatta olmalıdır:

```
tip/issue-numarası-kısa-açıklama
```

### Örnekler

| Durum | Branch Adı |
|---|---|
| Yeni özellik | `feature/3-gelir-ekleme-ekrani` |
| Bug düzeltme | `fix/7-grafik-hatasi` |
| Kod iyileştirme | `refactor/12-api-servisi` |
| Dokümantasyon | `docs/2-readme-guncelleme` |

### VS Code'da Branch Oluşturma

**Terminal ile:**
```bash
git checkout main
git pull origin main
git checkout -b feature/3-gelir-ekleme-ekrani
```

**VS Code arayüzü ile:**
1. Sol alt köşede `main` yazan yere tıkla
2. **Create new branch** seç
3. Branch adını yaz

---

## Commit Mesajları

Commit mesajları ne yapıldığını açıkça belirtmelidir.

### Format

```
tip: kısa açıklama
```

### Örnekler

```
feat: gelir ekleme formu tamamlandı
fix: tarih seçici mobil hatası giderildi
refactor: transaction servisi yeniden düzenlendi
docs: kurulum adımları güncellendi
style: buton renkleri düzenlendi
```

### Commit Tipleri

| Tip | Ne Zaman |
|---|---|
| `feat` | Yeni özellik |
| `fix` | Bug düzeltme |
| `refactor` | Kod iyileştirme |
| `docs` | Dokümantasyon |
| `style` | Sadece görsel değişiklik |
| `chore` | Bağımlılık, config güncellemeleri |

---

## Pull Request Açma

Kodunu yazdıktan sonra:

1. Değişikliklerini branch'ine push et:
```bash
git push origin feature/3-gelir-ekleme-ekrani
```

2. GitHub'da **Compare & pull request** butonuna tıkla

3. PR başlığını ve açıklamasını doldur. Açıklamaya şunu ekle:
```
Closes #3
```
Bu sayede PR merge edilince issue otomatik kapanır.

4. **Reviewers** kısmına takım liderini ekle

5. **Create pull request** ile gönder

### PR Açıklaması Şablonu

```
## Ne Yaptım?
Gelir ekleme ekranı oluşturuldu.

## Nasıl Test Edilir?
1. Uygulamayı çalıştır
2. "Gelir Ekle" butonuna tıkla
3. Formu doldur ve kaydet

## İlgili Issue
Closes #3
```

---

## Code Review Süreci

1. PR açtıktan sonra takım liderinin incelemesini bekle
2. Değişiklik istenirse yorumlara göre düzenle ve yeni commit at
3. Onay verildikten sonra takım lideri merge eder
4. Merge sonrası branch silinebilir

---

> Herhangi bir konuda takılırsan takım liderine sor.
