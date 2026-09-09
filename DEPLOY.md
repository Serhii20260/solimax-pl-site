# Деплой solimax.pl

Сайт обслуговується nginx: `server_name solimax.pl`, root `/var/www/solimax.pl`,
SPA лежить у `/var/www/solimax.pl/pl/`, API проксюється з `/pl-api/` на
`127.0.0.1:4010` (сервіс `solimax-pl-site-backend`, база
`/home/solimax-pl-backend-site/prisma/dev.db`).

## Збірка й викладка

```bash
cd /home/solimax-pl-site
npm ci
npm run build

# копія поточного стану — робити ЗАВЖДИ
cp -a /var/www/solimax.pl /root/www-backup-$(date +%Y%m%d)

# атомарна підміна: спершу поруч, потім mv
rm -rf /var/www/solimax.pl/pl.new
cp -a dist /var/www/solimax.pl/pl.new

# ОБОВʼЯЗКОВО: перенести старі чанки вперед, не перезаписуючи нові.
# Чому — див. розділ «Старі чанки» нижче. Прапорець -n критичний:
# без нього старі файли затруть нову збірку.
cp -an /var/www/solimax.pl/pl/assets/. /var/www/solimax.pl/pl.new/assets/

chown -R www-data:www-data /var/www/solimax.pl/pl.new
find /var/www/solimax.pl/pl.new -type d -exec chmod 755 {} \;
find /var/www/solimax.pl/pl.new -type f -exec chmod 644 {} \;
mv /var/www/solimax.pl/pl /var/www/solimax.pl/pl.old
mv /var/www/solimax.pl/pl.new /var/www/solimax.pl/pl
```

## Старі чанки — крок постійний, не разовий

Імена файлів у `assets/` містять хеш вмісту, і кожен чанк усередині
посилається на спільний `index-*.js` по імені. Тому досить змінити один
рядок у `App.tsx` — і хеш головного чанка змінюється, а за ним
перейменовуються майже всі інші, хоч їхній код лишається побайтово тим
самим. У викладці 2026-09-09 так змінилось 20 імен із 25.

Наслідок: у клієнта, який тримав вкладку відкритою до викладки, старий
`index-*.js` уже завантажений у памʼять і проситиме СТАРІ імена. Якщо їх
у `/pl/assets/` немає — перехід на іншу сторінку падає на лінивому
завантаженні. Оновлення сторінки лікує (`index.html` іде з `no-cache`),
але клієнт про це не знає й бачить зламаний сайт.

Тому `cp -an` вище переносить попереднє покоління файлів у нову викладку.
Конфлікту бути не може: імена містять хеш, однакове імʼя означає однаковий
вміст. Старі вкладки доживають на старих файлах, нові відвідувачі беруть
нові. Ціна — кілька сотень кілобайт.

Набір накопичується від викладки до викладки. Раз на кілька місяців його
можна почистити — але тільки свідомо і не одразу після викладки, бо саме
тоді старі вкладки ще живі.

## Відкат

```bash
rm -rf /var/www/solimax.pl && cp -a /root/www-backup-YYYYMMDD/solimax.pl /var/www/ && systemctl reload nginx
```

## Перевірка після викладки

```bash
for r in / /dom /biznes /pompy-ciepla /finansowanie /kontakt /o-nas /anker /carport \
         /propozycje /calculator /admin/packages; do
  echo -n "$r "; curl -s -o /dev/null -w "%{http_code}\n" "https://solimax.pl/pl$r"
done
curl -sI https://solimax.pl/pl/uploads/  # аліас має працювати, не SPA-фолбек
```

## Чого не робити

- Не класти резервні копії конфігів у `/etc/nginx/sites-enabled/` — `nginx.conf`
  робить `include sites-enabled/*`, і копія підхопиться як робочий конфіг.
- Не міняти `location ^~ /pl/uploads/` на звичайний prefix: regex-локація для
  картинок перехопить його й віддасть SPA-фолбек замість файлу.
- `index.html` не кешувати (`no-cache`), інакше клієнти застрягнуть на старих
  іменах чанків.
