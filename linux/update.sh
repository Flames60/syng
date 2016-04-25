mkdir /tmp/syng/
cp -p /opt/syng/resources/app/src/db/syng/bookmarks /tmp/syng/bookmarks
echo "Created Bookmarks Backup"
[ -e /opt/syng/ ] && rm -rf /opt/syng/* || mkdir /opt/syng
mv syng/* /opt/syng/
mv Syng.desktop /usr/share/applications
rm -rf /opt/syng/resources/app/src/db/syng/bookmarks
mv /tmp/syng/bookmarks /opt/syng/resources/app/src/db/syng/
echo "Restored Bookmarks Backup"
echo "Installed Syng Beta to /opt/"
