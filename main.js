const {app,BrowserWindow,Tray,Menu,nativeImage}=require('electron');
const path=require('path');
let win,tray,quitting=false;
app.setName('Homework Tracker'); // shown as the sender of notifications

if(!app.requestSingleInstanceLock())app.quit();
app.on('second-instance',()=>win&&(win.show(),win.focus()));

function show(){win.show();win.focus()}

app.whenReady().then(()=>{
  const icon=nativeImage.createFromPath(path.join(__dirname,'icon.png'));
  win=new BrowserWindow({width:1100,height:800,icon,transparent:true,backgroundColor:'#00000000',title:'Homework Tracker',autoHideMenuBar:true,
    webPreferences:{backgroundThrottling:false}}); // keep reminder timers running while hidden
  win.loadFile('index.html');
  if(process.argv.includes('--hidden'))win.hide(); // autostart: begin in the tray
  // closing hides to tray so reminders keep firing; quit from the tray menu
  app.on('before-quit',()=>{quitting=true}); // any quit path (Ctrl+Q, session end, SIGTERM) must really exit
  for(const s of ['SIGTERM','SIGINT'])process.on(s,()=>app.quit());
  win.on('close',e=>{if(!quitting){e.preventDefault();win.hide()}});
  tray=new Tray(icon.resize({width:22,height:22}));
  tray.setToolTip('Homework Tracker');
  tray.setContextMenu(Menu.buildFromTemplate([{label:'Open',click:show},{label:'Quit',click:()=>{quitting=true;app.quit()}}]));
  tray.on('click',show);
  win.webContents.on('render-process-gone',()=>win.reload()); // recover from a renderer crash instead of a blank window
});
