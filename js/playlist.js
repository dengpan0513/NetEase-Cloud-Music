//初始化
var APP_ID = 'Mugo8DRz0JB2wQoHCfKzI40v-gzGzoHsz';
var APP_KEY = 'vhMJxTzyQviG3EWuuW3QfPbN';
AV.init({
    appId: APP_ID,
    appKey: APP_KEY
});

//批量查询
let plSongs = document.querySelector('.pl-list .pl-songs');
let querySongs = new AV.Query('SongList');
querySongs.ascending('plRank');
querySongs.find().then(function(songs) {
    let docFragment = document.createDocumentFragment();
    for (let i = 0; i < songs.length; i++) {
        let song = songs[i].attributes;
        let songId = songs[i].id;
        let elLi = document.createElement('li');
        if (song.isPlayList) {
            elLi.innerHTML = `
                <a href="./song.html?id=${songId}" class="pl-link">
                    <div class="pl-rank flex-vcenter">${song.plRank}</div>
                    <div class="pl-song">
                        <div class="pl-sintro">
                            <h3 class="pl-title single-ellipsis">
                                    ${song.name}
                                    <span>${song.intro}</span>
                            </h3>
                            <p class="pl-author single-ellipsis">
                                ${song.singer} - ${song.album}
                            </p>
                        </div>
                        <div class="pl-play flex-vcenter">
                            <svg class="icon icon-play" aria-hidden="true">
                                <use xlink:href="#icon-play"></use>
                            </svg>
                        </div>
                    </div>
                </a>
            `;
            docFragment.appendChild(elLi);
            plSongs.appendChild(docFragment);
        }
    }
},function(error) {
    alert('获取新歌曲失败');
});