const remote = require('electron').remote;
var ipc = require('electron').ipcRenderer;
const Menu = remote.Menu;
const MenuItem = remote.MenuItem;

window.addEventListener('contextmenu', function (e) {
  e.preventDefault();
  menu.popup(remote.getCurrentWindow());
}, false);

var template = [
  {
    label: 'Bookmarks',
    submenu: [
      {
         label: 'Show Bookmarks',
         accelerator: 'CmdOrCtrl+B',
         click: function() {
            ipc.send("refresh-bookmarks-window");
            ipc.send("open-bookmarks-window");
         }
      },
      {
        label: 'Import',
        click: function() {
          ipc.send('start-bookmarks-import');
        }
      },
      {
        label: 'Export',
        click: function() {
          ipc.send('bookmarks-export-data');
        }
      },
      {
         label: 'Refresh Listing',
         //accelerator: 'CmdOrCtrl+Shift+R',
         click: function() {
            ipc.send('refresh-bookmarks-window');
         }
      }
   ]
  },
  {
    label: 'Study',
    submenu: [
      {
         label: "Generate Flashcards",
         accelerator: "CmdOrCtrl+L",
         click: function() {
            ipc.send("generate-flashcards");
         }
      },
      {
         label: "Generate Test",
         accelerator: "CmdOrCtrl+T",
         click: function() {
            ipc.send("generate-test");
            alert("This feature is not yet supported.");
         }
      }
   ]
  },
  {
    label: 'Tools',
    submenu: [
      {
        label: 'Convert Simplified and Traditional',
        click: function() {
          ipc.send('open-character-convert-window');
        }
      },
      {
        label: 'Prettify Pinyin',
        click: function() {
          ipc.send('open-pinyin-convert-window');
        }
      }
    ]
  },
  {
	 label: 'Help',
	 submenu: [
     {
       label: 'About Syng',
       click: function() {
          ipc.send("open-about-window");
        }
     },
     {
       type: 'separator'
     },
		{
		  label: 'Report Bug',
		  //accelerator: 'CmdOrCtrl+R',
		  click: function() { require('electron').shell.openExternal('https://github.com/sotch-pr35mac/syng/issues') }
		},
      {
         type: 'separator'
      },
      {
         label: 'View Syng License',
         click: function() { require('electron').shell.openExternal('https://github.com/sotch-pr35mac/syng/blob/master/LICENSE.md') }
      },
      {
         label: 'View CC-CEDICT License',
         click: function() { require('electron').shell.openExternal('https://github.com/sotch-pr35mac/syng/blob/master/License-CC-CEDICT.md') }
      },
      {
         label: 'View Node-CC-CEDICT License',
         click: function() { require('electron').shell.openExternal('https://github.com/sotch-pr35mac/syng/blob/master/License-Node-CC-CEDICT.md') }
      }
	 ]
  }
];

if (process.platform == 'darwin') {
  var name = require('electron').remote.app.getName();
  template.unshift({
	 label: name,
	 submenu: [
		{
		  label: 'About ' + name,
		  role: 'about'
		},
		{
		  type: 'separator'
		},
		{
		  label: 'Services',
		  role: 'services',
		  submenu: []
		},
		{
		  type: 'separator'
		},
		{
		  label: 'Hide ' + name,
		  accelerator: 'Command+H',
		  role: 'hide'
		},
		{
		  label: 'Hide Others',
		  accelerator: 'Command+Alt+H',
		  role: 'hideothers'
		},
		{
		  label: 'Show All',
		  role: 'unhide'
		},
		{
		  type: 'separator'
		},
		{
		  label: 'Quit',
		  accelerator: 'Command+Q',
		  click: function() { app.quit(); }
		},
	 ]
  });
  // Window menu.
  template[3].submenu.push(
	 {
		type: 'separator'
	 },
	 {
		label: 'Bring All to Front',
		role: 'front'
	 }
  );
}

var menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);
