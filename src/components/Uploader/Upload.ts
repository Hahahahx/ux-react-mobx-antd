import { UploadFile, UploadFileStatus } from "./UploadFile";

interface UploadConstruct {
    pieceSize: number
    fileList?: UploadFile[]
    onBeforeUpload?: (fileList: UploadFile[]) => boolean
    onAfterUpload?: (fileList: UploadFile[]) => void
    onBeforeFileUpload?: (fileList: UploadFile[], file: UploadFile) => boolean
    onAfterFileUpload?: (fileList: UploadFile[], file: UploadFile) => void
    onBeforeChunkUpload?: (fileList: UploadFile[], file: UploadFile, chunk: ArrayBuffer) => boolean
}

enum UploadStatus {
    Pending,
    Runing,
    Done
}

export class Upload {

    uploadStatus: UploadStatus = UploadStatus.Pending;
    fileList: UploadFile[] = new Array<UploadFile>();
    pieceSize: number = 1 * 1024;
    onBeforeUpload: (fileList: UploadFile[]) => boolean | Promise<boolean> = () => true;
    onAfterUpload: (fileList: UploadFile[]) => void = () => { };
    onBeforeFileUpload: (fileList: UploadFile[], file: UploadFile) => boolean | Promise<boolean> = () => true;
    onAfterFileUpload: (fileList: UploadFile[], file: UploadFile) => void = () => { };
    onBeforeChunkUpload: (fileList: UploadFile[], file: UploadFile, chunk: ArrayBuffer, chunkIndex: number) => boolean | Promise<boolean> = () => true;

    constructor({
        pieceSize,
        fileList,
        onBeforeUpload,
        onBeforeFileUpload,
        onBeforeChunkUpload,
        onAfterUpload,
        onAfterFileUpload
    }: UploadConstruct) {
        onBeforeUpload && (this.onBeforeUpload = onBeforeUpload);
        onAfterUpload && (this.onAfterUpload = onAfterUpload);
        onBeforeFileUpload && (this.onBeforeFileUpload = onBeforeFileUpload);
        onAfterFileUpload && (this.onAfterFileUpload = onAfterFileUpload);
        onBeforeChunkUpload && (this.onBeforeChunkUpload = onBeforeChunkUpload);
        fileList && (this.fileList = fileList);
        pieceSize && (this.pieceSize = pieceSize);
    }

    async start() {
        if (this.uploadStatus === UploadStatus.Done || !await this.onBeforeUpload(this.fileList)) return;

        let fileListCount = 0;
        while (fileListCount < this.fileList.length) {
            const file = this.fileList[fileListCount++];
            console.log(file)
            if ((file.status === UploadFileStatus.OnGoing || file.status === UploadFileStatus.Pending)
                && await this.onBeforeFileUpload(this.fileList, file)
            ) {
                let chunkCount = 0
                while (file.status === UploadFileStatus.OnGoing || file.status === UploadFileStatus.Pending) {
                    // console.log(file.getChunk(chunkCount))
                    if (!await this.onBeforeChunkUpload(this.fileList, file, await file.getChunk(chunkCount), chunkCount)) {
                        file.setStatus(UploadFileStatus.Failure);
                    }
                    if (file.pieceCount === ++chunkCount) {
                        file.setStatus(UploadFileStatus.Success);
                    }
                }
            }
            this.onAfterFileUpload(this.fileList, file)
        }
        this.onAfterUpload(this.fileList)
    }


    appendFile(pid: number) {
        console.log(pid)
        let fileInput: HTMLInputElement = document.createElement('input');
        fileInput.type = 'file';
        fileInput.multiple = true;
        fileInput.click();
        fileInput.onchange = () => {
            const files: FileList = fileInput.files as FileList;
            let count = 0;
            while (count < files.length) {
                const file = files.item(count++) as File;
                const uploadFile = new UploadFile(file, this.pieceSize, pid);
                this.fileList.push(uploadFile);
            }
            if (this.uploadStatus !== UploadStatus.Runing) {
                this.uploadStatus = UploadStatus.Pending;
                this.start();
            }
        }
    }

}