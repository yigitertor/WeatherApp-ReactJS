# TypeWeather 🌦️

TypeWeather, kullanıcıların hava durumu tahminlerini kolayca görmelerini sağlayan bir web uygulamasıdır. Kullanıcılar, hava durumunu öğrenmek istedikleri bir şehri arayabilir veya konumlarını kullanarak otomatik olarak hava durumunu alabilirler.

![TypeWeather Logo](./public/icons/logo.png)

## Özellikler

- **Şehir Arama ve Otomatik Tamamlama**: Kullanıcılar, istedikleri bir şehri arama kutusuna yazarken, otomatik tamamlama özelliği sayesinde [GeoDB Cities API](https://rapidapi.com/wirefreethought/api/geodb-cities) kullanılarak şehir isimlerini hızlıca bulabilirler.
- **Konum Tabanlı Hava Durumu**: Kullanıcılar, konum izni verdiklerinde, tarayıcı tarafında bulunan [Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation) kullanılarak otomatik olarak bulundukları konumun hava durumu tahminlerini alabilirler.
- **Dinamik Arka Planlar**: Hava durumuna göre arka plan rengi değişir.
- **Hava Durumu İkonları**: Hava durumu tahminlerinde ilgili hava durumu ikonları gösterilir.

## Kullanılan Teknolojiler

- **React**: Kullanıcı arayüzü için React kullanılmıştır.
- **Styled Components**: CSS stil dosyalarını daha modüler ve okunabilir hale getirmek için kullanılmıştır.
- **Axios**: HTTP istekleri yapmak için Axios kullanılmıştır.

## API ve Konum Özelliği Detayları

- **Hava Durumu API'si**: Hava durumu verileri almak için [OpenWeatherMap API](https://openweathermap.org/api) kullanılmıştır. Bu API, hava durumu tahminleri ve ilgili ikonları sağlar.
- **GeoDB Cities API**: Otomatik tamamlama özelliği için kullanılan [GeoDB Cities API](https://rapidapi.com/wirefreethought/api/geodb-cities), şehir verilerini sağlar ve kullanıcıların hızlıca şehirlerini bulmasını sağlar.
- **Konum İzni**: Kullanıcının konumunu almak için tarayıcı tarafında bulunan [Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation) kullanılmıştır. Kullanıcı izin verdiğinde, cihazın GPS verileri kullanılarak konum bilgisi alınır.

## Kurulum

1. Bu deposunu klonlayın: `git clone https://github.com/example/type-weather.git`
2. Proje dizinine gidin: `cd type-weather`
3. Gerekli paketleri yükleyin: `npm install`
4. Uygulamayı başlatın: `npm start`

## Katkıda Bulunma

1. Bu depoyu çatallayın (fork).
2. Yeni bir dal (branch) oluşturun: `git checkout -b yeni-ozellik`
3. Değişikliklerinizi yapın ve bunları kaydedin (commit): `git commit -am 'Yeni özellik ekle'`
4. Dalınıza (branch) itiş yapın: `git push origin yeni-ozellik`
5. Bir birleştirme isteği (pull request) gönderin.

## Lisans

Bu proje MIT Lisansı altında lisanslanmıştır. Daha fazla bilgi için [LICENSE](LICENSE) dosyasına bakabilirsiniz.

