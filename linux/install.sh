mkdir /opt/syng
mv syng/* /opt/syng
mv Syng.desktop /usr/share/applications
echo "### Added by Syng" >> ~/.bash_aliases
echo "alias syng='/opt/syng/Syng'" >> ~/.bash_aliases
echo "Installed Syng beta to /opt/"
