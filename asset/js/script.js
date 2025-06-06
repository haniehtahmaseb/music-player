
    const player = document.querySelector('main>div>.player')
    const playSong = document.querySelector('main>div>.player>.playSong')
    const btnPre = document.querySelector('#btnPre')
    const btnPlay = document.querySelector('#btnPlay')
    const btnFor = document.querySelector('#btnFor')
    const song = document.querySelector('.playSong>audio')
    const lbl = document.querySelector('#lbl')
    const figcaption = document.querySelectorAll('.playSong>figcaption>span')
    const bar = document.querySelector('.bar')
    const thumb = document.getElementById('thumb')
    const duration = document.getElementById('duration')
    const time = document.getElementById('time')
    const three = document.querySelector('main>.row>div:last-of-type>div:first-of-type')
    const two = document.querySelector('.song>div')
    const _volume = document.querySelector('#range')
    const _volumeIcon = document.querySelector('label')


    console.log(_volumeIcon);








    flag = 0

    const songs = [
        {
            title: 'rotab',
            artist: 'shahrokh',
            src: 'asset/music/shahrokhrotab.mp3',
            img: 'asset/img/Shahrokh-Rotab.webp',
        },
        {
            title: 'chera rafti?',
            artist: 'homayoun shajarian',
            src: 'asset/music/CheraRaftiHomayounShajarian.mp3',
            img: 'asset/img/cherarafti.jpg',
        },
        {
            title: 'bad az to',
            artist: 'mohsen chavoshi',
            src: 'asset/music/mohsenchavoshibadazTo.mp3',
            img: 'asset/img/Mohsen-Chavoshi-Bad-Az-To-1.webp',
        },
        {
            title: 'taghdir',
            artist: 'shadmehr aghili',
            src: 'asset/music/TaghdirShadmehrAghili.mp3',
            img: 'asset/img/thaghdir.jpg'
        },
        {
            title: 'jan maryam',
            artist: 'mohammad noori',
            src: 'asset/music/JaneMaryamMohammadNori.mp3',
            img: 'asset/img/janemaryam.jpg'
        },
        {
            title: 'khali',
            artist: 'ebi',
            src: 'asset/music/ebiKhali.mp3',
            img: 'asset/img/khali.webp'
        },
        {
            title: 'shekanjegar',
            artist: 'dariush',
            src: 'asset/music/ShekanjegarDariush.mp3',
            img: 'asset/img/shekanjegar.jpg'
        },
        {
            title: 'saatdivari',
            artist: 'mohsen chavoshi',
            src: 'asset/music/SaateDivariMohsenChavoshi.mp3',
            img: 'asset/img/saatdivari.jpg'
        },
        {
            title: 'dard',
            artist: 'ehaam',
            src: 'asset/music/DardEhaam.mp3',
            img: 'asset/img/dard.jpg'
        },
        {
            title: 'khial khosh',
            artist: 'alireza ghorbani',
            src: 'asset/music/KhialeKhoshAlirezaGhorbani.mp3',
            img: 'asset/img/KhialeKhosh.jpg'
        }

    ]

    // play  

    song.dataset.status = 'off'
    btnPlay.addEventListener('click', () => {
        play()
    })

    // pre and for

    btnFor.addEventListener('click', () => {
        if (flag < songs.length - 1) {
            flag++
            changeSong()
        }
    })
    btnPre.addEventListener('click', () => {
        if (flag > 0) {
            flag--
            changeSong()

        }
    })
    // pre and for
    function changeSong() {
        song.setAttribute('src', songs[flag].src)
        lbl.setAttribute('src', songs[flag].img)
        figcaption[0].innerText = songs[flag].title
        figcaption[1].innerText = songs[flag].artist
        song.play()
        btnPlay.innerText = 'pause'
        song.dataset.status = 'on'
        lbl.classList.remove('spinner')
        setTimeout(() => {
            lbl.classList.add('spinner')
        }, 500);
    }
    // pre and for

    // play
    function play() {
        if (song.getAttribute('data-status') == 'off') {
            song.play()
            song.dataset.status = 'on'
            btnPlay.innerText = 'pause'
            setTimeout(() => {
                lbl.classList.add('spinner')
            }, 500);
            lbl.style.animationPlayState = 'running'

        } else {
            song.pause()
            song.dataset.status = 'off'
            btnPlay.innerText = 'play_arrow'
            lbl.style.animationPlayState = 'paused'
        }
    }
    // play
    // next play 
    song.addEventListener('ended', () => {
        flag++;
        changeSong()
    });
    // next play 
    // progress bar
    let barW = bar.clientWidth

    bar.addEventListener('click', (e) => {
        let clickX = e.offsetX
        let percent = clickX / barW
        song.currentTime = percent * (song.duration)
        thumb.style.left = (percent * 100) + '%'
    })

    song.addEventListener('timeupdate', () => {
        let percent = (song.currentTime / song.duration) * 100;
        thumb.style.left = percent + '%';
        let min = Math.floor((song.duration - song.currentTime) / 60)
        let sec = Math.floor((song.duration - song.currentTime) % 60)
        seconds = min + ':' + sec.toString().padStart(2, "0")
        duration.innerText = seconds
        let min1 = Math.floor((song.currentTime) / 60)
        let sec1 = Math.floor((song.currentTime) % 60)
        seconds1 = min1 + ':' + sec1.toString().padStart(2, "0")
        time.innerText = seconds1


    });


    // progress bar
    // drag
    thumb.addEventListener('mousedown', () => {
        document.addEventListener('mousemove', drag);

    });
    thumb.addEventListener('mouseup', () => {
        document.removeEventListener('mousemove', drag);

    });
    function drag(e) {
        let thumbPos = e.clientX
        let x = Math.max(0, barW)
        if (thumbPos < x) {
            thumb.style.left = thumbPos + 'px'
        }
    }
    // drag
    //load data
    let item = 0
    songs.map(() => {

        if (item < songs.length) {
            const _div = document.createElement('div')
            _div.innerHTML = `
                <audio src="${songs[item].src}"></audio>
                <figure class="row" id="topPlay">
                    <img src="${songs[item].img}" alt="">
                    <i class="material-symbols-outlined">play_arrow</i>
                </figure>
                <figcaption>
                    <div class="row" >
                        <span>${songs[item].artist}</span>
                        <span>${songs[item].title}</span>
                    </div>
                    <span></span>
                </figcaption>
        `
            three.appendChild(_div)
            // /////////////////
            const audio = _div.querySelector('audio');
            const durationSpan = _div.querySelector('figcaption>span');


            audio.addEventListener('loadedmetadata', () => {
                durationSpan.innerText = (Math.floor(audio.duration / 60)) + ':' + (Math.floor(audio.duration % 60).toString().padStart(2, '0'));
            });
            // play div ///

            _div.addEventListener('click', () => {
                song.setAttribute('src', _div.children[0].src)
                lbl.setAttribute('src', _div.children[1].children[0].src)
                figcaption[0].innerText = _div.children[2].children[0].children[0].innerText
                figcaption[1].innerText = _div.children[2].children[0].children[1].innerText
                song.setAttribute('data-status', 'off')
                play()

            })
            // play div ///

            // ////////////////

            const _div1 = document.createElement('div')
            _div1.classList.add('box')
            _div1.innerHTML = `
            <figure>
                <img src="${songs[item].img}" alt="">
            </figure>
            <figcaption>
                <span>${songs[item].artist}</span>
                <span>${songs[item].title}</span>
            </figcaption>
        `
            two.appendChild(_div1)
        }
        item++
    })

    //load data
    console.log(song.volume);


    // volume ///
    song.addEventListener('play', () => {
        _volume.addEventListener('input', () => {
            let volumeValue = parseFloat(_volume.value)
            song.volume = volumeValue
            if (volumeValue === 0) {
                _volumeIcon.innerText = 'volume_mute'
            } else if (volumeValue > 0 && volumeValue < 0.5) {
                _volumeIcon.innerText = 'volume_down'
            } else {
                _volumeIcon.innerText = 'volume_up'
            }
        })
    })

    let x = 0
    _volumeIcon.addEventListener('click', () => {
        if (x == 0) {
            _volumeIcon.innerText = 'volume_mute'
            _volume.value = '0'
            x = 1
        } else {
            _volume.value = '1'
            _volumeIcon.innerText = 'volume_up'
            x = 0
        }
        song.volume = _volume.value

    })

    // volume ///





