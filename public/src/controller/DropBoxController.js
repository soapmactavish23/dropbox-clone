class DropBoxController {

    constructor() {

        this.btnSendFileEl = document.querySelector('#btn-send-file');
        this.inputFilesEl = document.querySelector('#files');
        this.snackModelEl = document.querySelector('#react-snackbar-root');
        this.progressBarEl = this.snackModelEl.querySelector('.mc-progress-bar-fg');
        this.filenameEl = this.snackModelEl.querySelector('.filename');
        this.timeleftEl = this.snackModelEl.querySelector('.timeleft');

        this.initEvents();

    }

    initEvents() {

        this.btnSendFileEl.addEventListener('click', event => {

            this.inputFilesEl.click();

        });

        this.inputFilesEl.addEventListener('change', event => {

            this.uploadTask(event.target.files);

            this.modalShow();

            this.inputFilesEl.value = '';

        });

    }

    modalShow(show = true) {
        this.snackModelEl.style.display = show ? 'block' : 'none';
    }

    uploadTask(files) {

        let promises = [];

        [...files].forEach(file => {

            promises.push(new Promise((resolve, reject) => {

                let ajax = new XMLHttpRequest();

                ajax.open('POST', '/upload');

                ajax.onload = event => {
                    this.modalShow(false);
                    try {
                        console.log(ajax.responseText)
                        resolve(JSON.parse(ajax.responseText));
                    } catch (e) {
                        reject(e);
                    }

                };

                ajax.onerror = event => {

                    this.modalShow(false);
                    reject(event);

                }

                ajax.upload.onprogress = event => {

                    this.uploadProgress(event, file);

                };

                let formData = new FormData();

                formData.append('input-file', file);

                this.startUploadTime = Date.now();

                ajax.send(formData);

            }));

        });

        return Promise.all(files);

    }

    uploadProgress(event, file) {

        let timespend = Date.now() - this.startUploadTime;
        let loaded = event.loaded;
        let total = event.total;
        let porcent = parseInt((loaded / total) * 1000);
        let timeleft = ((100 - porcent) * timespend) / porcent;

        this.progressBarEl.style.width = `${porcent}px`;

        this.filenameEl.innerHTML = file.name;
        this.timeleftEl.innerHTML = this.formatTimeToHuman(timeleft);


    }

    formatTimeToHuman(durantion) {

        let seconds = parseInt((durantion / 1000) % 60);
        let minutes = parseInt((durantion / (1000 * 60)) % 60);
        let hours = parseInt((durantion / (1000 * 60 * 60)) % 24);

        if (hours > 0) {
            return `${hours} horas, ${minutes} minutos e ${seconds} segundos`;
        }

        if (minutes > 0) {
            return `${minutes} minutos e ${seconds} segundos`;
        }

        if (seconds > 0) {
            return `${seconds} segundos`;
        }

        return '';

    }

}